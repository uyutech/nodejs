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
      <Profile userInfo={ this.props.userInfo }
               updateNickNameTimeDiff={ this.props.updateNickNameTimeDiff }
               updateHeadTimeDiff={ this.props.updateHeadTimeDiff }/>
      <div class="warn">
        <div class="t fn-clear">
          <img class="pic" src="//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"/>
          <div class="txt">
            <div>
              <span class="name">圈儿</span>
              <small class="time">刚刚</small>
            </div>
          </div>
        </div>
        <div class="c">
          <pre>未来在这里还会解锁各种信息哒！然而需要实现的功能太多，程序员小哥哥们需要一点一点搭建转圈的世界哦！
请耐心等待，我们会努力做得更好=3=</pre>
          <b class="arrow"/>
        </div>
      </div>
      <div class="c">
        <Follow ref="follow" list={ this.props.follows }/>
        {/*<Favor ref="favor" list={ this.props.favors }/>*/}
      </div>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
