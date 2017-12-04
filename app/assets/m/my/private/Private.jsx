/**
 * Created by army8735 on 2017/12/4.
 */

'use strict';

import util from "../../../d/common/util";
import net from "../../../d/common/net";

class Private extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.realName = self.props.privateInfo.Name;
    self.phone = self.props.privateInfo.Phone;
    self.address = self.props.privateInfo.Address;
  }
  @bind realName
  @bind phone
  @bind address
  click3() {
    let self = this;
    $(self.ref.realName.element).addClass('fn-hide');
    $(self.ref.edit3.element).addClass('fn-hide');
    $(self.ref.input3.element).removeClass('fn-hide').focus().val(self.realName);
    $(self.ref.ok3.element).removeClass('fn-hide')
  }
  clickOk3() {
    let self = this;
    $(self.ref.realName.element).removeClass('fn-hide');
    $(self.ref.input3.element).addClass('fn-hide');
    $(self.ref.ok3.element).addClass('fn-hide');
    let $edit = $(self.ref.edit3.element);
    let realName = $(self.ref.input3.element).val().trim();
    if(realName !== self.realName) {
      net.postJSON('/api/my/updatePrivate', { realName, phone: self.phone, address: self.address }, function(res) {
        if(res.success) {
          self.realName = realName;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $edit.removeClass('fn-hide');
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        $edit.removeClass('fn-hide');
      });
    }
    else {
      $edit.removeClass('fn-hide');
    }
  }
  click4() {
    let self = this;
    $(self.ref.phone.element).addClass('fn-hide');
    $(self.ref.edit4.element).addClass('fn-hide');
    $(self.ref.input4.element).removeClass('fn-hide').focus().val(self.phone);
    $(self.ref.ok4.element).removeClass('fn-hide')
  }
  clickOk4() {
    let self = this;
    $(self.ref.phone.element).removeClass('fn-hide');
    $(self.ref.input4.element).addClass('fn-hide');
    $(self.ref.ok4.element).addClass('fn-hide');
    let $edit = $(self.ref.edit4.element);
    let phone = $(self.ref.input4.element).val().trim();
    if(phone && !/^1\d{10}$/.test(phone)) {
      alert('手机号码不合法~');
      $edit.removeClass('fn-hide');
      return;
    }
    if(phone !== self.phone) {
      net.postJSON('/api/my/updatePrivate', { realName: self.realName, phone, address: self.address }, function(res) {
        if(res.success) {
          self.phone = phone;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $edit.removeClass('fn-hide');
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        $edit.removeClass('fn-hide');
      });
    }
    else {
      $edit.removeClass('fn-hide');
    }
  }
  click5() {
    let self = this;
    $(self.ref.address.element).addClass('fn-hide');
    $(self.ref.edit5.element).addClass('fn-hide');
    $(self.ref.input5.element).removeClass('fn-hide').focus().val(self.address);
    $(self.ref.ok5.element).removeClass('fn-hide')
  }
  clickOk5() {
    let self = this;
    $(self.ref.address.element).removeClass('fn-hide');
    $(self.ref.input5.element).addClass('fn-hide');
    $(self.ref.ok5.element).addClass('fn-hide');
    let $edit = $(self.ref.edit5.element);
    let address = $(self.ref.input5.element).val().trim();
    if(address !== self.address) {
      net.postJSON('/api/my/updatePrivate', { realName: self.realName, phone: self.phone, address }, function(res) {
        if(res.success) {
          self.address = address;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
        $edit.removeClass('fn-hide');
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        $edit.removeClass('fn-hide');
      });
    }
    else {
      $edit.removeClass('fn-hide');
    }
  }
  render() {
    return <div class="private">
      <label>收件人：</label>
      <span ref="realName">{ this.realName }</span>
      <input ref="input3" type="text" class="input2 fn-hide" value="" maxlength="8" placeholder="请输入姓名"/>
      <b class="edit" ref="edit3" onClick={ this.click3 }/>
      <button class="fn-hide" ref="ok3" onClick={ this.clickOk3 }>确定</button>
      <br/>
      <label>联系手机：</label>
      <span ref="phone">{ this.phone }</span>
      <input ref="input4" type="text" class="input2 fn-hide" value="" maxlength="11" placeholder="请输入手机号"/>
      <b class="edit" ref="edit4" onClick={ this.click4 }/>
      <button class="fn-hide" ref="ok4" onClick={ this.clickOk4 }>确定</button>
      <br/>
      <label>收货地址：</label>
      <span ref="address">{ this.address }</span>
      <b class="edit" ref="edit5" onClick={ this.click5 }/>
      <button class="fn-hide" ref="ok5" onClick={ this.clickOk5 }>确定</button>
      <textarea ref="input5" class="fn-hide" placeholder="请输入地址"/>
    </div>;
  }
}

export default Private;
