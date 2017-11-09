/**
 * Created by army8735 on 2017/11/9.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

const STATE = {
  LOADING: 0,
  LOADED: 1,
  ERROR: 2,
};
const TEXT = {
  0: '上传中...',
  1: '',
  2: '加载失败',
};

class SubPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.value = self.props.value || '';
    self.invalid = self.value.trim().length < 3;
    self.maxlength = self.props.maxlength;
    self.subText = self.props.subText;
    self.tipText = self.props.tipText;
    self.placeholder = self.props.placeholder;
    self.originTo = self.props.originTo;
    self.on(migi.Event.DOM, function() {
      if($CONFIG.isLogin) {
        let key = $CONFIG.uid + '_circle_img';
        let cache = localStorage[key];
        if(cache) {
          cache = JSON.parse(cache);
          let temp = [];
          cache.forEach(function(item) {
            temp.push({
              state: STATE.LOADED,
              url: item,
            });
          });
          self.list = temp;
          self.imgNum = temp.length;
        }
        let key2 = $CONFIG.uid + '_circle_content';
        let cache2 = localStorage[key2];
        if(cache2) {
          self.value = cache2.trim();
          self.input(null, self.ref.input);
        }
      }
    });
  }
  @bind maxlength
  @bind placeholder
  @bind subText
  @bind tipText
  @bind value = ''
  @bind to
  @bind originTo
  @bind invalid = true
  @bind expand
  @bind num = 0
  @bind disableUpload
  @bind list = []
  @bind imgNum = 0
  @bind warnLength
  @bind sending
  input(e, vd) {
    let self = this;
    let $vd = $(vd.element);
    self.num = $vd.val().length;
    if(!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      self.num = $vd.val().trim().length;
      let content = $vd.val().trim();
      self.invalid = content.length < 3 || content.length > 256;
      self.warnLength = content.length > 256;
      let key2 = $CONFIG.uid + '_circle_content';
      localStorage[key2] = content;
    }
  }
  focus() {this.expand = true;return;
    if(!window.$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
    else {
      this.expand = true;
    }
  }
  submit(e) {
    e.preventDefault();
    let self = this;
    if(!self.sending && !self.invalid && !self.disableUpload) {
      let imgs = self.list.map(function(item) {
        return item.url;
      });
      self.sending = true;
      net.postJSON('/api/circle/add', { content: self.value, imgs, circleID: self.props.circleID }, function(res) {
        if(res.success) {
          self.value = '';
          self.list = [];
          let key = $CONFIG.uid + '_circle_img';
          localStorage[key] = '';
          let key2 = $CONFIG.uid + '_circle_content';
          localStorage[key2] = '';
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.sending = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.sending = false;
      });
    }
  }
  blur() {
    // this.expand = false;
  }
  change(e) {
    let self = this;
    if(window.FileReader) {
      let files = e.target.files;
      let res = [];
      for(let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let size = file.size;
        if(size && size !== 0 && size <= 1024 * 1024 * 3) {
          res.push(file);
        }
      }
      if(files.length !== res.length) {
        alert('图片最大不能超过3M哦，超过的将自动过滤。');
      }
      if(!res.length) {
        return;
      }
      self.disableUpload = true;
      let num = res.length;
      let count = 0;
      res.forEach(function(file, i) {
        let fileReader = new FileReader();
        fileReader.onload = function() {
          self.list.push({
            state: STATE.LOADING,
            url: fileReader.result,
          });
          net.postJSON('/api/user/uploadPic', { img: fileReader.result }, function(res) {
            if(res.success) {
              self.list[i + self.imgNum].state = STATE.LOADED;
              self.list[i + self.imgNum].url = res.data;
              self.list = self.list;
              self.addCache(res.data);
              count++;
              if(count === num) {
                self.disableUpload = false;
              }
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
            count++;
            if(count === num) {
              self.disableUpload = false;
            }
          });
        };
        fileReader.readAsDataURL(file);
      });
    }
    else {
      alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器或者极速模式。');
    }
  }
  addCache(url) {
    let key = $CONFIG.uid + '_circle';
    let cache = localStorage[key];
    if(cache) {
      cache = JSON.parse(cache);
    }
    else {
      cache = [];
    }
    cache.push(url);
    localStorage[key] = JSON.stringify(cache);
  }
  delCache(url) {
    let key = $CONFIG.uid + '_circle';
    let cache = localStorage[key];
    if(cache) {
      cache = JSON.parse(cache);
      let i = cache.indexOf(url);
      if(i > -1) {
        cache.splice(i, 1);
        localStorage[key] = JSON.stringify(cache);
      }
    }
  }
  clearCache() {
    let key = $CONFIG.uid + '_circle';
    localStorage[key] = '';
  }
  clickImg(e, vd, tvd) {
    this.delCache(tvd.props.rel);
    this.list.splice(tvd.props.idx, 1);
  }
  render() {
    return <div class={ 'mod-sub' + (this.expand ? ' expand' : ' expand') }>
      <div class="c">
        <form class={ 'fn-clear' + (this.to || this.originTo ? ' to' : '') } ref="form" onSubmit={ this.submit }>
          <div class="wrap">
            <label>TO: { this.to || this.originTo }</label>
            <textarea class="text" ref="input"
                      placeholder={ this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个圈子吧' }
                      onInput={ this.input } onFocus={ this.focus }
                      onBlur={ this.blur }>{ this.value }</textarea>
            <span class={ 'limit' + (this.warnLength ? ' warn' : '') }><strong>{ this.num }</strong> / { this.maxlength || 256 }</span>
            <div class={ 'upload' + (this.disableUpload ? ' dis' : '') }>
              添加图片
              <input type="file" class="file" onChange={ this.change } disabled={ !!this.disableUpload }
                     multiple="multiple" accept="image/gif, image/jpeg, image/png"/>
            </div>
            <input type="submit"
                   class={ 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '') }
                   value={ this.value.trim().length
                     ? this.value.trim().length < 3
                       ? this.tipText
                         ? this.tipText.replace('${n}', (3 - this.value.trim().length))
                         : '还少' + (3 - this.value.trim().length) + '个字哦'
                       : this.subText || '发送'
                     : this.subText || '发送' }/>
            <input type='hidden' id='afs_scene' name='afs_scene'/>
            <input type='hidden' id='afs_token' name='afs_token'/>
          </div>
          <ul class="list fn-clear" onClick={ this.clickImg }>
            {
              (this.list || []).map(function(item, i) {
                return <li class={ 's' + item.state } idx={ i } rel={ item.url }
                           style={ 'background-image:url(' + util.autoSsl(util.img60_60_80(item.url)) + ')' }>
                  <span>{ TEXT[item.state] }</span>
                </li>;
              })
            }
          </ul>
        </form>
      </div>
    </div>;
  }
}

export default SubPost;
