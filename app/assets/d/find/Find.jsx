/**
 * Created by army8735 on 2017/9/21.
 */

import net from '../common/net';
import util from '../common/util';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotCircle from '../component/hotcircle/HotCircle.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import HotPlayList from '../component/hotplaylist/HotPlayList.jsx';
import Page from '../component/page/Page.jsx';
import SubPost from '../component/subpost/SubPost.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';

let loading;
let take = 30;
let skip = take;

class Find extends migi.Component {
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
  @bind rootID = -1
  @bind parentID = -1
  load(i) {
    let self = this;
    if(loading) {
      return;
    }
    loading = true;
    skip = (i - 1) * take;
    util.scrollTop($(self.ref.hot2.element).offset().top);
    net.postJSON('/api/find/hotPostList', { skip, take }, function(res) {
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
  clickChangeWork() {
    let self = this;
    net.postJSON('/api/find/hotWorkList', function(res) {
      if(res.success) {
        self.ref.hotWork.setData(res.data);
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
    return <div class="find">
      <Banner/>
      <div class="hot" ref="hot">
        <HotCircle ref="hotCircle" title="推荐圈子" dataList={ this.props.hotCircleList }/>
        <h4>
          <span>热门作品</span>
          <small>{ '未来会根据你的口味进行精准智能的推送！>3<' }</small>
          <span class="fn" onClick={ this.clickChangeWork }>换一换</span>
        </h4>
        <HotWork ref="hotWork" title="热门作品" dataList={ this.props.hotWorkList }/>
        <HotMusicAlbum ref="hotMusicAlbum" title="热门专辑" dataList={ this.props.hotMusicAlbumList }/>
        <h4>
          <span>入驻作者</span>
          <small>{ '我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3<' }</small>
        </h4>
        <HotAuthor ref="hotAuthor" dataList={ this.props.hotAuthorList }/>
      </div>
      <div class="hot2 fn-clear" ref="hot2">
        <div class="post">
          <Page ref="page" total={ Math.ceil(this.props.hotPostList.Size / take) }/>
          <HotPost ref="hotPost" data={ this.props.hotPostList.data }/>
          <Page ref="page2" total={ Math.ceil(this.props.hotPostList.Size / take) }/>
        </div>
        <HotPlayList ref="hostPlayList" dataList={ this.props.hotPlayList.data }/>
      </div>
      <SubPost ref="subPost" placeholder={ '小小的提示：现在可以把一个圈画在好几个圈子里哦！' }
               to={ this.props.hotCircleList }/>
      <SubCmt ref="subCmt"
              hidden={ true }
              subText="回复"
              placeholder="交流一下吧~"/>
    </div>;
  }
}

export default Find;
