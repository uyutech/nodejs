/**
 * Created by army8735 on 2017/11/19.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Profile from './Profile.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

let loading;
let loadEnd;
let take = 10;
let skip = take;

class User extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let $window = $(window);
      loadEnd = $CONFIG.userPost.Size <= take;
      if(loadEnd) {
        self.ref.hotPost.message = '已经到底了';
      }
      else {
        $window.on('scroll', function() {
          self.checkMore($window);
        });
      }
    });
  }
  checkMore($window) {
    if(loading || loadEnd) {
      return;
    }
    let self = this;
    let WIN_HEIGHT = $window.height();
    let HEIGHT = $(document.body).height();
    let bool;
    bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
    if(bool) {
      self.load();
    }
  }
  load() {
    let self = this;
    if(loading) {
      return;
    }
    loading = true;
    let hotPost = self.ref.hotPost;
    hotPost.message = '正在加载...';
    net.postJSON('/api/user/postList', { userID: $CONFIG.userInfo.UID, skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPost.appendData(res.data.data);
        if(skip >= data.Size) {
          loadEnd = true;
          hotPost.message = '已经到底了';
        }
        else {
          hotPost.message = '';
        }
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
    return <div class="user">
      <Profile userInfo={ this.props.userInfo } followState={ this.props.followState }/>
      <h4>TA画的圈</h4>
      <HotPost ref="hotPost" data={ this.props.userPost.data }/>
    </div>;
  }
}

export default User;
