/**
 * Created by army8735 on 2017/11/19.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Profile from './Profile.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import Page from '../component/page/Page.jsx';

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
      let hotPost = self.ref.hotPost;
      let subCmt = self.ref.subCmt;
      hotPost.on('openComment', function(postID, name, comment) {
        self.postID = postID;
        self.comment = comment;
        subCmt.to = null;
        subCmt.originTo = name;
        subCmt.hidden = false;
        self.rootID = -1;
        self.parentID = -1;
      });
      hotPost.on('closeComment', function() {
        subCmt.to = null;
        subCmt.hidden = true;
      });
      hotPost.on('chooseSubComment', function(rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      hotPost.on('closeSubComment', function() {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = null;
      });
      subCmt.on('submit', function(content) {
        subCmt.invalid = true;
        let postID = self.postID;
        let rootID = self.rootID;
        let parentID = self.parentID;
        let comment = self.comment;
        net.postJSON('/api/post/addComment', {
          parentID,
          rootID,
          postID,
          content,
        }, function(res) {
          if(res.success) {
            subCmt.value = '';
            if(rootID === -1) {
              comment.prependData(res.data);
              comment.message = '';
            }
            else {
              comment.prependChild(res.data, parentID);
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
            subCmt.invalid = false;
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
            subCmt.invalid = false;
          }
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.invalid = false;
        });
      });
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
      <div class="c">
        <h4>TA画的圈</h4>
        <Page ref="page" total={ Math.ceil(this.props.userPost.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.userPost.data }/>
        {
          this.props.userPost.Size > take
            ? <Page ref="page2" total={ Math.ceil(this.props.userPost.Size / take) }/>
            : ''
        }
      </div>
      <SubCmt ref="subCmt"
              hidden={ true }
              subText="回复"
              placeholder="交流一下吧~"/>
      <ImageView ref="imageView"/>
    </div>;
  }
}

export default User;
