/**
 * Created by army8735 on 2017/12/26.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import config from '../../config';

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
let timeout;

class SubPost extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.to = self.props.to ? self.props.to.slice(0) : undefined;
    self.placeholder = self.props.placeholder;
    self.activityLabel = self.props.activityLabel;
    self.tagList = (self.props.tagList || []).concat(self.activityLabel || []);
    if(self.props.circleID && self.props.tagList) {
      tagHash[self.props.circleID] = self.props.tagList;
    }
    if(self.to && self.to.length && self.props.circleID !== undefined) {
      let has = false;
      self.to.forEach(function(item) {
        if(item.CirclingID.toString() === (self.props.circleID || '').toString()) {
          has = true;
        }
      });
      if(has) {
        migi.sort(self.to, function(a, b) {
          if(a.CirclingID.toString() === (self.props.circleID || '').toString()) {
            return false;
          }
          else if(b.CirclingID.toString() === (self.props.circleID || '').toString()) {
            return true;
          }
        });
      }
      else {
        self.to.unshift({
          CirclingID: self.props.circleID,
          CirclingName: self.props.circleDetail.TagName,
        });
      }
    }
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
  @bind invalid = true
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
    self.num = $vd.val().trim().length;
    let content = $vd.val().trim();
    self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
    self.warnLength = content.length > MAX_TEXT_LENGTH;
    let key2 = self.getContentKey();
    localStorage[key2] = content;
  }
  focus() {
    this.ref.form.element.scrollIntoView(true);
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
      net.postJSON('/api/subPost/sub', { content: self.value, imgs, widths, heights, circleID: circleID.join(',') }, function(res) {
        if(res.success) {
          self.value = '';
          self.invalid = true;
          self.num = 0;
          self.list = [];
          self.clearCache();
          location.href = '/post/' + res.data.ID;
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
          self.list[i + self.imgNum].url = /^data:image\/(\w+);base64,/.test(fileReader.result) ? fileReader.result : 'data:image/jpeg;base64,' + fileReader.result;
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
    let key2 = self.getContentKey();
    localStorage[key2] = '';
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
  clickClose(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this.ref.pop.element).addClass('fn-hide');
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
            let tags = tagHash[$o.attr('rel')];
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
  clickTip(e, vd) {
    let $tip = $(vd.element);
    if($tip.text()) {
      $tip.removeClass('fn-hide');
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function() {
        $tip.addClass('fn-hide');
      }, 3000);
    }
  }
  render() {
    return <form class="mod-sub" ref="form" onSubmit={ this.submit }>
      <div class="circle">
        <label>圈子</label>
        <ul onClick={ { li: this.clickCircle } } ref="circle">
          {
            (this.to || []).map(function(item) {
              return <li rel={ item.CirclingID } class={ item.CirclingID.toString() === (this.props.circleID || '').toString() ? 'on' : '' }>{ item.CirclingName }圈</li>;
            }.bind(this))
          }
        </ul>
      </div>
      <div class="tag">
        <label>话题</label>
        <ul onClick={ { li: this.clickTag } }>
          {
            (this.tagList || []).map(function(item, i) {
              return <li class={ item.more ? 'more' : '' }
                         i={ i }
                         rel={ item.value || ('#' + item.TagName + '#') }
                         desc={ item.Describe || '' }>{ item.TagName }</li>;
            }.bind(this))
          }
        </ul>
      </div>
      <div class="c">
        <textarea class="text" ref="input" placeholder={ this.placeholder || '夸夸这个圈子吧' }
                  onInput={ this.input }>{ this.value }</textarea>
        <div class={ 'limit' + (this.warnLength ? ' warn' : '') }><strong>{ this.num }</strong> / { MAX_TEXT_LENGTH }</div>
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
      <ul class="btn">
        <li class="back" onClick={ this.clickClose }/>
        <li class="sub">
          <input type="submit"
                 class={ 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '') }
                 value={ this.value.trim().length
                   ? this.value.trim().length < 3
                     ? '-${n}'.replace('${n}', (3 - this.value.trim().length))
                     : '发送'
                   : '发送' }/>
        </li>
        <li class="tip">
          <div ref="tip" class="fn-hide" onClick={ this.clickTip }/>
        </li>
        <li class="pic">
          <input type="file" ref="file" class="file" onChange={ this.change } disabled={ !!this.disableUpload }
                 multiple="multiple" accept="image/gif, image/jpeg, image/png"/>
        </li>
      </ul>
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
    </form>;
  }
}

export default SubPost;
