/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Profile from './Profile.jsx';
import Follow from './Follow.jsx';
// import Favor from './Favor.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickOut(e) {
    e.preventDefault();
    net.postJSON('/api/login/loginOut', function(res) {
      if(parent && parent !== window && parent.goto) {
        parent.goto('/login');
      }
      else {
        location.href = '/login';
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="my">
      <Profile userInfo={ this.props.userInfo } updateNickNameTimeDiff={ this.props.updateNickNameTimeDiff }/>
      <div class="c">
        <Follow ref="follow" list={ this.props.follows }/>
        {/*<Favor ref="favor" list={ this.props.favors }/>*/}
      </div>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
