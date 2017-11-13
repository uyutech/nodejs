/**
 * Created by army8735 on 2017/11/11.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';

const STATE = {
  LOADING: 0,
  SENDING: 1,
  LOADED: 2,
  ERROR: 3,
};
const TEXT = {
  0: '读取中...',
  1: '上传中...',
  2: '',
  3: '加载失败',
};
const MAX_IMG_NUM = 10;
const MAX_TEXT_LENGTH = 512;

class SubPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.originTo = self.props.circleDetail.TagName;
    self.placeholder = self.props.placeholder;
    self.on(migi.Event.DOM, function() {
      let key = self.getImgKey();
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
      let key2 = self.getContentKey();
      let cache2 = localStorage[key2];
      if(cache2) {
        self.value = cache2.trim();
        self.input(null, self.ref.input);
        let length = self.value.trim().length;
        self.invalid = length < 3 || length > MAX_TEXT_LENGTH;
      }
    });
  }
  @bind placeholder
  @bind value = ''
  @bind to
  @bind originTo
  @bind invalid = true
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
    self.num = $vd.val().trim().length;
    let content = $vd.val().trim();
    self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
    self.warnLength = content.length > MAX_TEXT_LENGTH;
    let key2 = self.getContentKey();
    localStorage[key2] = content;
  }
  focus() {
    this.ref.form.element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  submit(e) {
    e.preventDefault();
    let self = this;
    if(!self.sending && !self.invalid && !self.disableUpload) {
      let imgs = [];
      self.list.forEach(function(item) {
        if(item.state === STATE.LOADED) {
          imgs.push(item.url);
        }
      });
      if(self.list.length > imgs.length) {
        if(!window.confirm('尚有未上传成功的图片，继续提交吗？')) {
          return;
        }
      }
      self.sending = true;
      net.postJSON('/api/circle/add', { content: self.value, imgs, circleID: self.props.circleID }, function(res) {
        if(res.success) {
          self.value = '';
          self.invalid = true;
          self.num = 0;
          self.list = [];
          let key = self.getImgKey();
          localStorage[key] = '';
          let key2 = self.getContentKey();
          localStorage[key2] = '';
          location.href = '/circle/' + self.props.circleID;
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
  change(e) {
    let self = this;
    if(window.FileReader) {
      let files = e.target.files;
      let res = [];
      let sizeLimit;
      let spliceLimit;
      for(let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let size = file.size;
        if(size && size !== 0 && size < 1024 * 1024 * 15) {
          res.push(file);
        }
        else {
          sizeLimit = true;
        }
      }
      if(res.length + self.imgNum > MAX_IMG_NUM) {
        res.splice(MAX_IMG_NUM - self.imgNum);
        spliceLimit = true;
      }
      if(files.length !== res.length) {
        if(sizeLimit && spliceLimit) {
          alert('图片最大不能超过3M哦，超过的将自动过滤。图片最多不能超过' + MAX_IMG_NUM + '张哦，超过的将自动忽略。');
        }
        else if(spliceLimit) {
          alert('图片最多不能超过' + MAX_IMG_NUM + '张哦，超过的将自动忽略。');
        }
        else if(sizeLimit) {
          alert('图片最大不能超过3M哦，超过的将自动过滤。');
        }
      }
      if(!res.length) {
        return;
      }
      self.disableUpload = true;
      let num = res.length;
      let count = 0;
      let hasUpload;
      res.forEach(function(file, i) {
        self.list.push({
          state: STATE.LOADING,
          url: '',
        });
        let fileReader = new FileReader();
        fileReader.onload = function() {
          self.list[i + self.imgNum].state = STATE.SENDING;
          self.list[i + self.imgNum].url = fileReader.result;
          net.postJSON('/api/user/uploadPic', { img: fileReader.result }, function(res) {
            if(res.success) {
              let url = res.data;
              let has;
              self.list.forEach(function(item) {
                if(item.url === url) {
                  hasUpload = has = true;
                }
              });
              if(!has) {
                self.list[i + self.imgNum].state = STATE.LOADED;
                self.list[i + self.imgNum].url = url;
                self.addCache(url);
              }
              else {
                self.list[i + self.imgNum].state = STATE.ERROR;
              }
            }
            else {
              self.list[i + self.imgNum] = null;
            }
            self.list = self.list;
            count++;
            if(count === num) {
              self.disableUpload = false;
              for(let j = self.list.length - 1; j >= 0; j--) {
                if(self.list[j] === null) {
                  self.list.splice(j, 1);
                }
              }
              self.imgNum = self.list.length;
              if(hasUpload) {
                alert('有图片已经重复上传过啦，已自动忽略。');
              }
            }
          }, function(res) {
            self.list[i + self.imgNum].state = STATE.ERROR;
            self.list = self.list;
            count++;
            if(count === num) {
              self.disableUpload = false;
              for(let j = self.list.length - 1; j >= 0; j--) {
                if(self.list[j] === null) {
                  self.list.splice(j, 1);
                }
              }
              self.imgNum = self.list.length;
              if(hasUpload) {
                alert('有图片已经重复上传过啦，已自动忽略。');
              }
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
  getImgKey() {
    return $CONFIG.uid + '_circle_img';
  }
  getContentKey() {
    return $CONFIG.uid + '_circle_content';
  }
  addCache(url) {
    let self = this;
    let key = self.getImgKey();
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
    let self = this;
    let key = self.getImgKey();
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
    let self = this;
    let key = self.getImgKey();
    localStorage[key] = '';
  }
  clickImg(e, vd, tvd) {
    let self = this;
    let i = tvd.props.idx;
    if(self.list[i].state === STATE.LOADED || self.list[i].state === STATE.ERROR) {
      self.delCache(tvd.props.rel);
      self.list.splice(i, 1);
      self.imgNum = self.list.length;
    }
  }
  render() {
    return <form class="mod-sub" ref="form" onSubmit={ this.submit }>
      <div class="ti">
        <a href={ '/circle/' + this.props.circleID } class="close" title="返回"/>
        {
          this.props.isPublic
            ? <img src={ this.props.head }/>
            : ''
        }
        <span class={ 'limit' + (this.warnLength ? ' warn' : '') }><strong>{ this.num }</strong> / { MAX_TEXT_LENGTH }</span>
        <input type="submit"
               class={ 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '') }
               value={ this.value.trim().length
                 ? this.value.trim().length < 3
                   ? '-${n}'.replace('${n}', (3 - this.value.trim().length))
                   : '发送'
                 : '发送' }/>
      </div>
      <div class="ti2">
        <label class="cur">{ this.to || this.originTo }圈</label>
        <div class={ 'upload' + (this.disableUpload ? ' dis' : '') }>
          图片
          <input type="file" ref="file" class="file" onChange={ this.change } disabled={ !!this.disableUpload }
                 multiple="multiple" accept="image/gif, image/jpeg, image/png"/>
        </div>
      </div>
      <div class="c">
        <textarea class="text" ref="input" placeholder={ this.placeholder || '夸夸这个圈子吧' }
                  onInput={ this.input } onFocus={ this.focus }>{ this.value }</textarea>
      </div>
      <ul class="list" onClick={ { li: this.clickImg } }>
        {
          (this.list || []).map(function(item, i) {
            return <li class={ 's' + item.state } idx={ i } rel={ item.url }
                       style={ 'background-image:url(' + util.autoSsl(util.img120_120_80(item.url)) + ')' }>
              <span>{ TEXT[item.state] }</span>
            </li>;
          })
        }
      </ul>
    </form>;
  }
}

export default SubPost;
