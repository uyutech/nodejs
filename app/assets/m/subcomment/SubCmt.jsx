/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import util from "../../d/common/util";
import net from "../../d/common/net";

const MAX_TEXT_LENGTH = 1024;

class SubCmt extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
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
  @bind num = 0
  @bind invalid = true
  @bind warnLength
  @bind sending
  getContentKey() {
    return $CONFIG.uid + '_subcmt_content';
  }
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
    if(!self.sending && !self.invalid) {
      self.sending = true;
      net.postJSON('/api/subComment', {
        content: self.value,
        id: self.props.id,
        type: self.props.type,
        cid: self.props.cid,
        rid: self.props.rid
      }, function(res) {
        if(res.success) {
          let key2 = self.getContentKey();
          localStorage[key2] = '';
          switch(self.props.type) {
            case '1':
              location.href = '/post/' + self.props.id + '#comment';
              break;
            case '2':
              location.href = '/author/' + self.props.id + '?tag=comment';
              break;
            case '3':
              location.href = '/works/' + self.props.id + '?tag=comment';
              break;
            default:
              location.href = '/';
              break;
          }
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
  clickClose(e) {
    let ref = document.referrer;
    if(ref && ref.indexOf(location.origin) > -1) {
      e.preventDefault();
      history.back();
    }
  }
  render() {
    return <form class="sub-cmt" ref="form" onSubmit={ this.submit }>
      <div class="ti">
        <a onClick={ this.clickClose } class="close" title="返回"
           href={ this.props.circleID ? ('/circle/' + this.props.circleID) : '/' }/>
        <span class={ 'limit' + (this.warnLength ? ' warn' : '') }><strong>{ this.num }</strong> / { MAX_TEXT_LENGTH }</span>
        <input type="submit"
               class={ 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '') }
               value={ this.value.trim().length
                 ? this.value.trim().length < 3
                   ? '-${n}'.replace('${n}', (3 - this.value.trim().length))
                   : '发送'
                 : '发送' }/>
      </div>
      <div class="c">
        <textarea class="text" ref="input" placeholder={ this.placeholder || '请输入评论' }
                  onInput={ this.input } onFocus={ this.focus } maxLength={ MAX_TEXT_LENGTH }>{ this.value }</textarea>
      </div>
    </form>;
  }
}

export default SubCmt;
