/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import Profile from './Profile.jsx';
import Follow from './Follow.jsx';
import Favor from './Favor.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickOut(e) {
    e.preventDefault();
    net.postJSON('/api/login/loginOut', function(res) {
      if(window.parent && window.parent !== window) {
        window.parent.location.reload(true);
      }
      else {
        location.reload(true);
      }
    });
  }
  render() {
    return <div class="my">
      <Profile userInfo={ this.props.userInfo }/>
      <Follow ref="follow" list={ this.props.follows }/>
      <Favor ref="favor" list={ this.props.favors }/>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
