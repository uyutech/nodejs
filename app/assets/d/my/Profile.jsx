/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
// import Spark from 'spark-md5';

class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.head = self.props.userInfo.Head_Url;
    self.userId = self.props.userInfo.UID;
    self.sname = self.props.userInfo.NickName;
    self.sign = self.props.userInfo.User_Sign || '';
    self.address = self.props.userInfo.address;
    self.updateNickNameTimeDiff = self.props.updateNickNameTimeDiff || 0;
    self.updateHeadTimeDiff = self.props.updateHeadTimeDiff || 0;
    self.realName = self.props.privateInfo.Name;
    self.phone = self.props.privateInfo.Phone;
    self.address = self.props.privateInfo.Address;
  }
  @bind head
  @bind userId
  @bind sname
  @bind sign
  @bind address
  @bind updateNickNameTimeDiff
  @bind updateHeadTimeDiff
  @bind realName
  @bind phone
  @bind address
  click() {
    let self = this;
    if(self.updateNickNameTimeDiff < 24 * 60 * 60 * 1000) {
      alert('昵称一天只能修改一次哦~');
      return;
    }
    $(self.ref.sname.element).addClass('fn-hide');
    $(self.ref.edit.element).addClass('fn-hide');
    $(self.ref.input.element).removeClass('fn-hide').focus().val(self.sname);
  }
  blur() {
    let self = this;
    $(self.ref.sname.element).removeClass('fn-hide');
    $(self.ref.input.element).addClass('fn-hide');
    let $edit = $(self.ref.edit.element);
    let newName = $(self.ref.input.element).val().trim();
    let length = newName.length;
    if(length < 4 || length > 8) {
      alert('昵称长度需要在4~8个字之间哦~');
      $edit.removeClass('fn-hide');
      return;
    }
    if(newName !== self.sname) {
      net.postJSON('/api/my/updateNickName', { nickName: newName }, function(res) {
        if(res.success) {
          self.sname = newName;
          self.updateNickNameTimeDiff = 0;
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
  clickHead(e) {
    let self = this;
    if(self.updateHeadTimeDiff < 24 * 60 * 60 * 1000) {
      e.preventDefault();
      alert('头像一天只能修改一次哦~');
    }
  }
  change(e) {
    let self = this;
    if(self.updateHeadTimeDiff < 24 * 60 * 60 * 1000) {
      e.preventDefault();
      alert('头像一天只能修改一次哦~');
      return;
    }
    if(window.FileReader) {
      let file = e.target.files[0];
      let size = file.size;
      if(size && size !== 0 && size <= 2048 * 500) {
        let $upload = $(self.ref.upload.element);
        $upload.addClass('fn-hide');
        let fileReader = new FileReader();
        fileReader.onload = function() {
          net.postJSON('/api/my/uploadHead', { img: fileReader.result }, function(res) {
            if(res.success) {
              self.head = res.url;
              self.updateHeadTimeDiff = 0;
            }
            else {
              alert(res.message || util.ERROR_MESSAGE);
            }
            $upload.removeClass('fn-hide');
          }, function(res) {
            alert(res.message || util.ERROR_MESSAGE);
            $upload.removeClass('fn-hide');
          });
        };
        fileReader.readAsDataURL(file);
      }
      else {
        alert('图片体积太大啦，不能超过500k！');
      }
    }
    else {
      alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器或者极速模式。');
    }
  }
  clickPic(e, vd, tvd) {
    if(tvd.name === 'img') {
      $(this.ref.file.element).click();
    }
  }
  click2() {
    let self = this;
    $(self.ref.sign.element).addClass('fn-hide');
    $(self.ref.edit2.element).addClass('fn-hide');
    $(self.ref.input2.element).removeClass('fn-hide').focus().val(self.sign);
  }
  click3() {
    let self = this;
    $(self.ref.address.element).addClass('fn-hide');
    $(self.ref.edit3.element).addClass('fn-hide');
    $(self.ref.input3.element).removeClass('fn-hide').focus().val(self.address);
  }
  blur2() {
    let self = this;
    $(self.ref.sign.element).removeClass('fn-hide');
    $(self.ref.input2.element).addClass('fn-hide');
    let $edit = $(self.ref.edit2.element);
    let newSign = $(self.ref.input2.element).val().trim();
    let length = newSign.length;
    if(length > 16) {
      alert('签名长度不能超过16个字哦~');
      $edit.removeClass('fn-hide');
      return;
    }
    if(newSign !== self.sign) {
      net.postJSON('/api/my/updateSign', { sign: newSign }, function(res) {
        if(res.success) {
          self.sign = newSign;
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
  blur3() {
    let self = this;
    $(self.ref.address.element).removeClass('fn-hide');
    $(self.ref.input3.element).addClass('fn-hide');
    let $edit = $(self.ref.edit3.element);
    let newAddress = $(self.ref.input3.element).val().trim();
    let length = newAddress.length;
    if(length > 256) {
      alert('地址长度不能超过256个字哦~');
      $edit.removeClass('fn-hide');
      return;
    }
    if(newAddress !== self.address) {
      net.postJSON('/api/my/updateAddress', { address: newAddress }, function(res) {
        if(res.success) {
          self.address = newAddress;
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
    if(phone && !/^1\d{10}$/.test(phone) && !/^09\d{8}$/.test(phone)) {
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
    return <div class="profile">
      <div class="fn-clear">
        <div class="pic" onClick={ this.clickPic }>
          <img src={ util.autoSsl(util.img220_220_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
          <div class="upload" ref="upload">
            <input ref="file" type="file" onChange={ this.change } onClick={ this.clickHead } accept="image/gif, image/jpeg, image/png"/>
          </div>
        </div>
        <div class="txt">
          <label>uid：</label>
          <span>{ this.userId.toString().replace(/^20180*/, '') }</span>
          <br/>
          <label>昵称：</label>
          <strong ref="sname">{ this.sname }</strong>
          <input ref="input" type="text" class="fn-hide" value="" onBlur={ this.blur } maxlength="8" placeholder="请输入昵称"/>
          <b class="edit" ref="edit" onClick={ this.click }/>
          <br/>
          <label>签名：</label>
          <p ref="sign" class={ this.sign ? 'sign' : 'sign empty' }>{ this.sign || '大家一起来转圈~' }</p>
          <input ref="input2" type="text" class="input2 fn-hide" value="" onBlur={ this.blur2 } maxlength="16" placeholder="请输入签名"/>
          <b class="edit edit2" ref="edit2" onClick={ this.click2 }/>
        </div>
      </div>
      <div class="private">
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
        <textarea ref="input5" class="fn-hide" placeholder="请输入地址"></textarea>
      </div>
    </div>;
  }
}

export default Profile;
