/**
 * Created by army8735 on 2017/11/29.
 */

'use strict';

import net from '../common/net';
import util from '../common/util';
import HotPost from '../component/hotpost/HotPost.jsx';
import Page from '../component/page/Page.jsx';
import SubPost from '../component/subpost/SubPost.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';
import ImageView from '../find/ImageView.jsx';

let take = 30;
let skip = take;
let ajax;

class Circling extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        if(page2) {
          page2.index = i;
          skip = (i - 1) * take;
          self.load();
        }
      });
      if(page2) {
        page2.on('page', function(i) {
          page.index = i;
          skip = (i - 1) * take;
          self.load();
        });
      }
      let subPost = self.ref.subPost;
      subPost.on('add_post', function(data) {
        if(parent && parent.setHash) {
          parent.setHash('/post/' + data.ID);
        }
        else {
          location.href = '/post/' + data.ID;
        }
      });
      let hotPost = self.ref.hotPost;
      let subCmt = self.ref.subCmt;
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
  @bind loading
  @bind loadEnd
  @bind circleID
  load() {
    let self = this;
    if(self.loading) {
      return;
    }
    let hotPost = self.ref.hotPost;
    self.loading = true;
    if(ajax) {
      ajax.abort();
    }
    ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
      if(res.success) {
        let data = res.data;
        skip += take;
        hotPost.setData(data.data);
        if(!data.data.length || data.data.length < take) {
          self.loadEnd = true;
          hotPost.message = '已经到底了';
        }
        else {
          hotPost.message = '';
        }
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      self.loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      self.loading = false;
    });
  }
  clickTag(e, vd, tvd) {
    let $li = $(tvd.element);
    if(!$li.hasClass('cur')) {
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      let self = this;
      let hotPost = self.ref.hotPost;
      self.circleID = tvd.props.rel;
      skip = 0;
      self.loading = true;
      if(ajax) {
        ajax.abort();
      }
      skip = 0;
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.index = 1;
      if(page2) {
        page2.index = 1;
      }
      ajax = net.postJSON(self.circleID ? '/api/circle/list' : '/api/circling/list', { skip, take, circleID: self.circleID }, function(res) {
        if(res.success) {
          let data = res.data;
          skip += take;
          hotPost.setData(data.data);
          if(data.Size <= take) {
            self.loadEnd = true;
            hotPost.message = '已经到底了';
          }
          else {
            self.loadEnd = false;
            hotPost.message = '';
          }
          page.total = Math.ceil(data.Size / take);
          if(page2) {
            page2.total = Math.ceil(data.Size / take);
          }
        }
        else {
          hotPost.setData();
          alert(res.message || util.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function(res) {
        alert(res.message || util.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }
  render() {
    return <div class="circling">
      <ul class="circles" ref="circles" onClick={ { li: this.clickTag } }>
        <li class="cur">全部</li>
        {
          (this.props.myCircleList.data || []).map(function(item) {
            return <li rel={ item.CirclingID }>{ item.CirclingName }</li>;
          }.bind(this))
        }
      </ul>
      <p class="cinfo">↑未来，这里将可以复选多个圈子一起逛哦↑</p>
      <div class="main">
        <Page ref="page" total={ Math.ceil(this.props.postList.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.postList.data }/>
        <Page ref="page2" total={ Math.ceil(this.props.postList.Size / take) }/>
      </div>
      <SubPost ref="subPost" placeholder={ '小小的提示：现在可以把一个圈画在好几个圈子里哦！' }
               to={ this.props.myCircleList.data }/>
      <SubCmt ref="subCmt"
              hidden={ true }
              subText="回复"
              placeholder="交流一下吧~"/>
      <ImageView ref="imageView"/>
    </div>;
  }
}

export default Circling;
