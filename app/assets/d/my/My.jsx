/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Profile from './Profile.jsx';
import Follow from './Follow.jsx';
// import Favor from './Favor.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import Page from '../component/page/Page.jsx';

let loading;
let take = 10;
let skip = take;

class My extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        page2.index = i;
        self.load(i);
      });
      page2.on('page', function(i) {
        page.index = i;
        self.load(i);
      });
    });
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
  load(i) {
    let self = this;
    if(loading) {
      return;
    }
    loading = true;
    skip = (i - 1) * take;
    net.postJSON('/api/user/myPost', { skip, take }, function(res) {
      if(res.success) {
        self.ref.hotPost.setData(res.data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading = false;
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
        <h4>我画的圈</h4>
        <Page ref="page" total={ Math.ceil(this.props.myPost.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.myPost.data }/>
        <Page ref="page2" total={ Math.ceil(this.props.myPost.Size / take) }/>
        {/*<Favor ref="favor" list={ this.props.favors }/>*/}
      </div>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
    </div>;
  }
}

export default My;
