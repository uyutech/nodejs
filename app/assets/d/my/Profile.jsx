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
    self.updateNickNameTimeDiff = self.props.updateNickNameTimeDiff || 0;
    self.updateHeadTimeDiff = self.props.updateHeadTimeDiff || 0;
  }
  @bind head
  @bind sname
  @bind updateNickNameTimeDiff
  @bind updateHeadTimeDiff
  click(e) {
    e.preventDefault();
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
      net.postJSON('/api/user/updateNickName', { nickName: newName }, function(res) {
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
          net.postJSON('/api/user/uploadHead', { img: fileReader.result }, function(res) {
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
  render() {
    return <div class="profile fn-clear">
      <div class="pic" onClick={ this.clickPic }>
        <img src={ util.autoSsl(util.img220_220_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png' }/>
        <div class="upload" ref="upload">
          <input ref="file" type="file" onChange={ this.change } onClick={ this.clickHead } accept="image/gif, image/jpeg, image/png"/>
        </div>
      </div>
      <div class="txt">
        <strong ref="sname">{ this.sname }</strong>
        <input ref="input" type="text" class="fn-hide" value="" onBlur={ this.blur } maxlength="8"/>
        <b class="edit" ref="edit" onClick={ this.click }/>
      </div>
    </div>;
  }
}

export default Profile;
