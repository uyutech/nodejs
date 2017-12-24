/**
 * Created by army8735 on 2017/10/27.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Profile from './Profile.jsx';

class My extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  clickOut(e) {
    e.preventDefault();
    net.postJSON('/api/login/loginOut', function() {
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
      <ul class="list">
        <li><a href="/mall" class="mall">圈商城<small>（我的圈币：{ this.props.coins.Coins || 0 }）</small></a></li>
        <li><a href="/my/relation" class="relation">圈关系</a></li>
        <li><a href="/my/message" class="message">圈消息</a></li>
        <li><a href="/my/post" class="post">我画的圈</a></li>
        <li><a href="/my/favor" class="favor">我的收藏</a></li>
      </ul>
      <a href="http://circling.cc/#/post/91255" class="help">
        <img class="pic" src={ util.autoSsl(util.img60_60_80('//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg')) }/>
        <span>帮助中心</span>
      </a>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
