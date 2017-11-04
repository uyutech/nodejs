/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Profile from './Profile.jsx';
import Follow from './Follow.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickOut(e) {
    e.preventDefault();
    net.postJSON('/api/login/loginOut', function(res) {
      location.href = '/login';
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="my">
      <Profile userInfo={ this.props.userInfo }
               updateNickNameTimeDiff={ this.props.updateNickNameTimeDiff }
               updateHeadTimeDiff={ this.props.updateHeadTimeDiff }/>
      <Follow ref="follow" list={ this.props.follows }/>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
