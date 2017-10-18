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
    self.name = self.props.userInfo.NickName;
    self.on(migi.Event.DOM, function() {
      let name = self.ref.name;
      let input = self.ref.input;
    });
  }
  @bind head
  @bind name
  click(e) {
    e.preventDefault();
    let self = this;
    $(self.ref.name.element).addClass('fn-hide');
    $(self.ref.edit.element).addClass('fn-hide');
    $(self.ref.input.element).removeClass('fn-hide').focus().val(self.name);
  }
  blur() {
    let self = this;
    $(self.ref.name.element).removeClass('fn-hide');
    $(self.ref.input.element).addClass('fn-hide');
    let $edit = $(self.ref.edit.element);
    let newName = $(self.ref.input.element).val().trim();
    if(newName !== self.name) {
      net.postJSON('/api/user/updateNickName', { nickName: newName }, function(res) {
        if(res.success) {
          self.name = newName;
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
  }
  change(e) {
    if(window.FileReader) {
      let self = this;
      let file = e.target.files[0];
      let size = file.size;
      if(size && size !== 0 && size < 1024 * 300) {
        let $upload = $(self.ref.upload.element);
        $upload.addClass('fn-hide');
        let fileReader = new FileReader();
        fileReader.onload = function() {
          net.postJSON('/api/user/uploadHead', { img: fileReader.result }, function(res) {
            if(res.success) {
              self.head = util.autoSsl(util.img144_144(res.url));
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
        alert('图片尺寸太大啦！不能超过300k');
      }
    }
    else {
      alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器。');
    }
  }
  render() {
    return <div class="profile fn-clear">
      <div class="pic">
        <img src={ this.head || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
        <div class="upload" ref="upload">
          <input type="file" onChange={ this.change } accept="image/gif, image/jpeg, image/png"/>
        </div>
      </div>
      <div class="txt">
        <strong ref="name">{ this.name }</strong>
        <input ref="input" type="text" class="fn-hide" value="" onBlur={ this.blur }/>
        <b class="edit" ref="edit" onClick={ this.click }/>
      </div>
    </div>;
  }
}

export default Profile;
