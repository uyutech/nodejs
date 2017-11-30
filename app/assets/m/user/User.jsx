/**
 * Created by army8735 on 2017/11/19.
 */

'use strict';

import net from '../../d/common/net';
import util from '../../d/common/util';
import Profile from './Profile.jsx';
import HotPost from '../../d/component/hotpost/HotPost.jsx';
import Page from '../../d/component/page/Page.jsx';

let loading;
let take = 10;
let skip = take;

class User extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
        }
        self.load(i);
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          self.load(i);
        });
      }
    });
  }
  load(i) {
    let self = this;
    if(loading) {
      return;
    }
    loading = true;
    skip = (i - 1) * take;
    net.postJSON('/api/user/postList', { userID: $CONFIG.userInfo.UID, skip, take }, function(res) {
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
    return <div class="user">
      <Profile userInfo={ this.props.userInfo } followState={ this.props.followState }/>
      <h4>TA画的圈</h4>
      <Page ref="page" total={ Math.ceil(this.props.userPost.Size / take) }/>
      <HotPost ref="hotPost" data={ this.props.userPost.data }/>
      {
        this.props.userPost.Size > take
          ? <Page ref="page2" total={ Math.ceil(this.props.userPost.Size / take) }/>
          : ''
      }
    </div>;
  }
}

export default User;
