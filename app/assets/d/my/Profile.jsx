/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';

class Profile extends migi.Component {
  constructor(...data) {
    super(...data);
    this.userInfo = this.props.userInfo;
  }
  @bind userInfo = {}
  click(e) {
    e.preventDefault();
    let self = this;
    let name = window.prompt('请输入想要修改的昵称', $CONFIG.userName).trim();
    if(name !== $CONFIG.userName) {
      net.postJSON('api/users/UpdateNickName', { NickName: name }, function(res) {
        if(res.success) {
          self.userName = name;
        }
        else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      });
    }
  }
  render() {
    return <div class="profile fn-clear">
      <div class="pic">
        <img src={ this.userInfo.Head_Url || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png' }/>
      </div>
      <div class="txt">
        <strong>{ this.userInfo.NickName }</strong>
      </div>
    </div>;
  }
}

export default Profile;
