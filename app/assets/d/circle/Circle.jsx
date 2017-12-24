/**
 * Created by army8735 on 2017/11/5.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';

import Title from './Title.jsx';
import SubPost from '../component/subpost/SubPost.jsx';
import Page from '../component/page/Page.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';

let skip = 0;
let take = 30;
let loading;

class Circle extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      page2.on('page', function(i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      let stick = self.ref.stick;
      let hotPost = self.ref.hotPost;
      let subPost = self.ref.subPost;
      subPost.on('add_post', function(data) {
        hotPost.addData(data);
        util.scrollTop($(self.ref.main.element).offset().top);
      });
      let subCmt = self.ref.subCmt;
      if(stick) {
        stick.on('openComment', function(postID, name, comment) {
          self.postID = postID;
          self.comment = comment;
          subPost.hidden = true;
          subCmt.to = null;
          subCmt.originTo = name;
          subCmt.hidden = false;
          self.rootID = -1;
          self.parentID = -1;
        });
        stick.on('closeComment', function() {
          subCmt.to = null;
          subCmt.hidden = true;
          subPost.hidden = false;
        });
        stick.on('chooseSubComment', function(rid, cid, name) {
          self.rootID = rid;
          self.parentID = cid;
          subCmt.to = name;
        });
        stick.on('closeSubComment', function() {
          self.rootID = -1;
          self.parentID = -1;
          subCmt.to = null;
        });
      }
      hotPost.on('openComment', function(postID, name, comment) {
        self.postID = postID;
        self.comment = comment;
        subPost.hidden = true;
        subCmt.to = null;
        subCmt.originTo = name;
        subCmt.hidden = false;
        self.rootID = -1;
        self.parentID = -1;
      });
      hotPost.on('closeComment', function() {
        subCmt.to = null;
        subCmt.hidden = true;
        subPost.hidden = false;
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
  @bind rootID = -1
  @bind parentID = -1
  loadPage() {
    if(loading) {
      return;
    }
    loading = true;
    let self = this;
    net.postJSON('/api/circle/list', { circleID: $CONFIG.circleID, skip, take }, function(res) {
      if(res.success) {
        if(skip === 0) {
          self.ref.stick && self.ref.stick.show();
        }
        else {
          self.ref.stick && self.ref.stick.hide();
        }
        let data = res.data;
        self.ref.hotPost.setData(data.data);
        util.scrollTop($(self.ref.main.element).offset().top);
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
    return <div class="circle fn-clear">
      <Title circleDetail={ this.props.circleDetail } ref="title"/>
      <div class="main" ref="main">
        <Page ref="page" total={ Math.ceil(this.props.postList.Size / take) }/>
        {
          this.props.stick && this.props.stick.length
            ? <HotPost ref="stick" data={ this.props.stick }/>
            : ''
        }
        <HotPost ref="hotPost" data={ this.props.postList.data }/>
        <Page ref="page2" total={ Math.ceil(this.props.postList.Size / take) }/>
      </div>
      <SubPost ref="subPost" placeholder={ '在' + this.props.circleDetail.TagName +'圈画个圈吧。小小的提示：现在可以把一个圈画在好几个圈子里哦！' }
               circleID={ this.props.circleDetail.TagID } circleName={ this.props.circleDetail.TagName }
               to={ this.props.hotCircleList }/>
      <SubCmt ref="subCmt"
              hidden={ true }
              subText="回复"
              placeholder="交流一下吧~"/>
    </div>;
  }
}

export default Circle;
