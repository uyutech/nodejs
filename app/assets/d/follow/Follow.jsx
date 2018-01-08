/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import Page from '../component/page/Page.jsx';
import HotUser from '../component/hotuser/HotUser.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';
import ImageView from '../find/ImageView.jsx';

let take = 10;
let skip = take;
let loading;
let ajax;

class Follow extends migi.Component {
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
        skip = (i - 1) * take;
        self.load();
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          skip = (i - 1) * take;
          self.load();
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
  load() {
    let self = this;
    if(ajax) {
      ajax.abort();
    }
    let hotPost = self.ref.hotPost;
    ajax = net.postJSON('/api/follow/postList', { skip, take }, function(res) {
      if(res.success) {
        let data = res.data;
        hotPost.setData(data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
    });
  }
  render() {
    return <div class="follow">
      <div class="c">
        <h4>关注话题</h4>
        <ul class="circles" onClick={ { li: this.clickTag } }>
          {
            (this.props.hotCircle || []).map(function(item) {
              return <li rel={ item.Cid }><a href={ '/circle/' + item.Cid }>{ item.CirclingName }</a></li>;
            }.bind(this))
          }
        </ul>
        <h4>关注作者</h4>
        <HotAuthor ref="hotAuthor" dataList={ this.props.follows.data }/>
        <h4>关注圈er</h4>
        <HotUser ref="userFollow" dataList={ this.props.userFollows.data }/>
        <h4>关注我的</h4>
        <HotUser ref="userFans" dataList={ this.props.userFans.data }/>
        <h4>Ta们画的圈</h4>
        <Page ref="page" total={ Math.ceil(this.props.postList.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.postList.data }/>
        {
          this.props.postList.Size > take
            ? <Page ref="page2" total={ Math.ceil(this.props.postList.Size / take) }/>
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

export default Follow;
