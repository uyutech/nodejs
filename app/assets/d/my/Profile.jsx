/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';

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
    // let name = window.prompt('请输入想要修改的昵称', $CONFIG.userName).trim();
    // if(name !== $CONFIG.userName) {
    //   net.postJSON('api/users/UpdateNickName', { NickName: name }, function(res) {
    //     if(res.success) {
    //       self.userName = name;
    //     }
    //     else {
    //       alert(res.message || util.ERROR_MESSAGE);
    //     }
    //   });
    // }
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
  render() {
    return <div class="profile fn-clear">
      <div class="pic">
        <img src={ this.head || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
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
