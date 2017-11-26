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
    self.sname = self.props.userInfo.NickName;
    self.sign = self.props.userInfo.User_Sign || '';
    self.address = self.props.userInfo.address;
    self.updateNickNameTimeDiff = self.props.updateNickNameTimeDiff || 0;
    self.updateHeadTimeDiff = self.props.updateHeadTimeDiff || 0;
  }
  @bind head
  @bind sname
  @bind sign
  @bind address
  @bind updateNickNameTimeDiff
  @bind updateHeadTimeDiff
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
      if(size && size !== 0 && size <= 1024 * 500) {
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
  render() {
    return <div class="profile fn-clear">
      <div class="pic" onClick={ this.clickPic }>
        <img src={ util.autoSsl(util.img220_220_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
        <div class="upload" ref="upload">
          <input ref="file" type="file" onChange={ this.change } onClick={ this.clickHead } accept="image/gif, image/jpeg, image/png"/>
        </div>
      </div>
      <div class="txt">
        <label>昵称：</label>
        <strong ref="sname">{ this.sname }</strong>
        <input ref="input" type="text" class="fn-hide" value="" onBlur={ this.blur } maxlength="8" placeholder="请输入昵称"/>
        <b class="edit" ref="edit" onClick={ this.click }/>
        <br/>
        <label>签名：</label>
        <p ref="sign" class={ this.sign ? 'sign' : 'sign empty' }>{ this.sign || '暂无签名' }</p>
        <input ref="input2" type="text" class="input2 fn-hide" value="" onBlur={ this.blur2 } maxlength="16" placeholder="请输入签名"/>
        <b class="edit edit2" ref="edit2" onClick={ this.click2 }/>
      </div>
    </div>;
  }
}

export default Profile;
