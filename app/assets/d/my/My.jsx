/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Profile from './Profile.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import Page from '../component/page/Page.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';
import ImageView from '../find/ImageView.jsx';

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
    net.postJSON('/api/my/postList', { skip, take }, function(res) {
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
               updateHeadTimeDiff={ this.props.updateHeadTimeDiff }
               privateInfo={ this.props.privateInfo || {} }/>
      <ul class="list fn-clear">
        <li><a href="/mall" class="mall">圈商城<small>（我的圈币：{ this.props.coins.Coins || 0 }）</small></a></li>
        <li><a href="/my/message" class="message">圈消息</a></li>
      </ul>
      <a href="http://circling.cc/#/post/91255" class="help">
        <img class="pic" src={ util.autoSsl(util.img60_60_80('//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg')) }/>
        <span>帮助中心</span>
      </a>
      <div class="c">
        <h4>我画的圈</h4>
        <Page ref="page" total={ Math.ceil(this.props.myPost.Size / take) }/>
        <HotPost ref="hotPost" data={ this.props.myPost.data }/>
        {
          this.props.myPost.Size > take
            ? <Page ref="page2" total={ Math.ceil(this.props.myPost.Size / take) }/>
            : ''
        }
      </div>
      <a href="#" class="loginout" onClick={ this.clickOut }>退出登录</a>
      <SubCmt ref="subCmt"
              hidden={ true }
              subText="回复"
              placeholder="交流一下吧~"/>
      <ImageView ref="imageView"/>
    </div>;
  }
}

export default My;
