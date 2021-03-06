/**
 * Created by army8735 on 2017/11/9.
 */

'use strict';

import net from '../../common/net';
import util from '../../common/util';
import config from '../../../config';

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
const MAX_TEXT_LENGTH = 4096;

let tagHash = {};

class SubPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.hidden = self.props.hidden;
    self.value = self.props.value || '';
    self.to = self.props.to ? self.props.to.slice(0) : undefined;
    self.invalid = self.value.trim().length < 3;
    self.maxlength = self.props.maxlength;
    self.subText = self.props.subText;
    self.tipText = self.props.tipText;
    self.placeholder = self.props.placeholder;
    self.activityLabel = self.props.activityLabel;
    self.tagList = (self.props.tagList || []).concat(self.activityLabel || []);
    if(self.to && self.to.length && self.props.circleID !== undefined) {
      tagHash[self.props.circleID] = self.props.tagList;
      let has = false;
      self.to.forEach(function(item) {
        if(item.CirclingID === self.props.circleID) {
          has = true;
        }
      });
      if(has) {
        migi.sort(self.to, function(a, b) {
          if(a.CirclingID === self.props.circleID) {
            return false;
          }
          else if(b.CirclingID === self.props.circleID) {
            return true;
          }
        });
      }
      else {
        self.to.unshift({
          CirclingID: self.props.circleID,
          CirclingName: self.props.circleName,
        });
      }
    }
    self.on(migi.Event.DOM, function() {
      if($CONFIG.isLogin) {
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
      }
      let $body = $(document.body);
      $body.on('click', function(e) {
        if(self.expand) {
          let $target = $(e.target);
          if(!$target.closest('.mod-sub')[0] && (!$target.hasClass('s1') || $target.hasClass('s2'))) {
            self.expand = false;
          }
        }
      });
    });
  }
  @bind hidden
  @bind placeholder
  @bind subText
  @bind tipText
  @bind value = ''
  @bind to
  @bind invalid = true
  @bind expand
  @bind num = 0
  @bind disableUpload
  @bind list = []
  @bind imgNum = 0
  @bind warnLength
  @bind sending
  @bind tagList = []
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
      self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
      self.warnLength = content.length > MAX_TEXT_LENGTH;
      let key2 = self.getContentKey();
      localStorage[key2] = content;
    }
  }
  focus() {
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
      let imgs = [];
      let widths = [];
      let heights = [];
      self.list.forEach(function(item) {
        if(item.state === STATE.LOADED) {
          imgs.push(item.url);
          widths.push(item.width || 0);
          heights.push(item.height || 0);
        }
      });
      if(self.list.length > imgs.length) {
        if(!window.confirm('尚有未上传成功的图片，继续提交吗？')) {
          return;
        }
      }
      self.sending = true;
      let circleID = [];
      $(self.ref.circle.element).find('.on').each(function(i, li) {
        circleID.push($(li).attr('rel'));
      });
      net.postJSON('/api/circle/post', {
        content: self.value,
        imgs,
        widths,
        heights,
        circleID: circleID.join(',')
      }, function(res) {
        if(res.success) {
          self.value = '';
          self.invalid = true;
          self.num = 0;
          self.list = [];
          let key = self.getImgKey();
          localStorage[key] = '';
          let key2 = self.getContentKey();
          localStorage[key2] = '';
          self.expand = false;
          self.emit('add_post', res.data);
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
      let sizeLimit;
      let spliceLimit;
      for(let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let size = file.size;
        if(size && size !== 0 && size <= 1024 * 1024 * 15) {
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
          self.list = self.list;
          let img = fileReader.result;
          let node = document.createElement('img');
          node.style.position = 'absolute';
          node.style.left = '-9999rem';
          node.style.top = '-9999rem';
          node.src = img;
          node.onload = function() {
            self.list[i + self.imgNum].width = node.width;
            self.list[i + self.imgNum].height = node.height;
            document.body.removeChild(node);
          };
          document.body.appendChild(node);
          net.postJSON('/api/user/uploadPic', { img }, function(res) {
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
                self.list[i + self.imgNum] = null;
              }
            }
            else {
              self.list[i + self.imgNum].state = STATE.ERROR;
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
          }, 1000 * 60 * 10);
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
    let i = tvd.props.idx;
    if(this.list[i].state === STATE.LOADED || this.list[i].state === STATE.ERROR) {
      this.delCache(tvd.props.rel);
      this.list.splice(i, 1);
      this.imgNum = this.list.length;
    }
  }
  clickCircle(e, vd, tvd) {
    let self = this;
    let circleID = tvd.props.rel;
    let $ul = $(vd.element);
    let $li = $(tvd.element);
    let $lis = $ul.find('.on');
    let len = $lis.length;
    if(!$li.hasClass('on') && len >= 3) {
      alert('最多只能选择3个圈子哦~');
      return;
    }
    let on = $li.hasClass('on');
    $li.toggleClass('on');
    let temp = self.activityLabel;
    if(on) {
      $ul.find('.on').each(function(i, o) {
        let $o = $(o);
        let tags = tagHash[$o.attr('rel')];
        temp = temp.concat(tags);
      });
      self.tagList = temp;
    }
    else if(tagHash[circleID]) {
      $lis.each(function(i, o) {
        let $o = $(o);
        let id = $o.attr('rel');
        if(id === circleID) {
          return;
        }
        let tags = tagHash[$o.attr('rel')];
        temp = temp.concat(tags);
      });
      self.tagList = tagHash[circleID].concat(temp);
    }
    else {
      net.postJSON('/api/subPost/tag', { circleID }, function(res) {
        if(res.success) {
          tagHash[circleID] = res.data || [];
          $lis.each(function(i, o) {
            let $o = $(o);
            let id = $o.attr('rel');
            if(id === circleID) {
              return;
            }
            let tags = tagHash[id];
            temp = temp.concat(tags);
          });
          self.tagList = tagHash[circleID].concat(temp);
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }
  clickTag(e, vd, tvd) {
    let self = this;
    if(tvd.props.class === 'more') {
      $(self.ref.pop.element).removeClass('fn-hide');
    }
    else {
      self.value += tvd.props.rel;
      self.input(null, self.ref.input);
    }
  }
  clickTag2(e, vd, tvd) {
    let self = this;
    self.value += tvd.props.rel;
    $(self.ref.pop.element).addClass('fn-hide');
    self.input(null, self.ref.input);
  }
  clickClose(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this.ref.pop.element).addClass('fn-hide');
  }
  render() {
    return <div class={ 'mod-sub' + (this.expand ? ' expand' : '') + (!this.hidden ? '' : ' fn-hide') }>
      <div class="c">
        <form class={ this.to ? ' to' : '' } ref="form" onSubmit={ this.submit }>
          <div class="wrap">
            <dl class="circle fn-clear" ref="circle" onClick={ { dd: this.clickCircle } }>
              <dt>画个圈</dt>
              {
                (this.to || []).map(function(item) {
                  return <dd rel={ item.CirclingID }
                             class={ item.CirclingID === this.props.circleID ? 'on' : '' }>{ item.CirclingName }圈</dd>;
                }.bind(this))
              }
            </dl>
            <ul class={ 'ti3' + (this.tagList.length ? '' : ' fn-hide') } onClick={ { li: this.clickTag }}>
              {
                this.tagList.map(function(item, i) {
                  return <li class={ item.more ? 'more' : '' }
                             i={ i }
                             rel={ item.value || ('#' + item.TagName + '#') }
                             desc={ item.Describe || '' }>{ item.TagName }</li>;
                }.bind(this))
              }
            </ul>
            <textarea class={ 'text' + (this.sending ? ' dis' : '') } ref="input" disabled={ !!this.sending }
                      placeholder={ this.placeholder } onInput={ this.input } onFocus={ this.focus }
                      onBlur={ this.blur }>{ this.value }</textarea>
            <span class={ 'limit' + (this.warnLength ? ' warn' : '') }>
              <strong>{ this.num }</strong> / { MAX_TEXT_LENGTH }</span>
            <div class={ 'upload' + (this.disableUpload ? ' dis' : '') }>
              添加图片
              <input type="file" ref="file" class="file" onChange={ this.change }
                     disabled={ !!this.disableUpload }
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
          </div>
          <ul class="list fn-clear" onClick={ { li: this.clickImg } }>
            {
              (this.list || []).map(function(item, i) {
                return <li class={ 's' + item.state } idx={ i } rel={ item.url }
                           style={ 'background-image:url(' + util.autoSsl(util.img120_120_80(item.url)) + ')' }>
                  <span>{ TEXT[item.state] }</span>
                </li>;
              })
            }
          </ul>
        </form>
      </div>
      <div class="pop fn-hide" ref="pop">
        <div class="c" onClick={ { dd: this.clickTag2 } }>
          <h3>选择标签</h3>
          {
            (this.props.tags || []).map(function(item) {
              return <dl class="fn-clear">
                <dt>{ item.name }</dt>
                {
                  (item.value || []).map(function(item2) {
                    return <dd rel={ item2.value || item2.key }>{ item2.key }</dd>
                  })
                }
              </dl>;
            })
          }
          <span class="close" onClick={ this.clickClose }/>
        </div>
      </div>
    </div>;
  }
}

export default SubPost;
