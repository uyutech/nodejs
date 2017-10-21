/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import Work from './Work.jsx';
import AuthorComment from './AuthorComment.jsx';
import SubCmt from '../component/subcmt/SubCmt.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let authorComment = self.ref.authorComment;
      let comment = self.ref.authorComment.ref.comment;
      let subCmt = self.ref.subCmt;
      subCmt.on('submit', function(content) {
        subCmt.isCommentSending = true;
        let rootID = authorComment.rootID;
        let parentID = authorComment.parentID;
        net.postJSON('/api/author/addComment', {
          parentID: parentID,
          rootID: rootID,
          authorID: authorComment.authorID,
          content,
        }, function(res) {
          if(res.success) {
            subCmt.value = '';
            subCmt.hasCommentContent = false;
            if(rootID === -1) {
              comment.prependData(res.data);
              comment.message = '';
            }
            else {
              comment.prependChild(res.data);
            }
          }
          else if(res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          subCmt.isCommentSending = false;
        }, function(res) {
          alert(res.message || util.ERROR_MESSAGE);
          subCmt.isCommentSending = false;
        });
      });
      comment.on('chooseSubComment', function(rid, cid, name) {
        subCmt.to = name;
      });
      comment.on('closeSubComment', function() {
        subCmt.to = '';
      });
      // self.ref.home.hide();
      // self.ref.works.show();
    });
  }
  clickType(e, vd ,tvd) {
    let $li = $(tvd.element);
    if($li.hasClass('cur')) {
      return;
    }
    $(vd.element).find('.cur').removeClass('cur');
    $li.addClass('cur');
    let self = this;
    let home = self.ref.home;
    let works = self.ref.works;
    let authorComment = self.ref.authorComment;
    home.hide();
    // works.hide();
    authorComment.hide();
    let rel = tvd.props.rel;
    switch(rel) {
      case '0':
        home.show();
        break;
      // case '1':
      //   works.show();
      //   break;
      case '2':
        authorComment.show();
        break;
    }
  }
  render() {
    return <div class="author">
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail } uid={ this.props.uid }/>
      <ul class="type fn-clear" onClick={ { li: this.clickType } }>
        {
          this.props.authorDetail.ISSettled
            ? <li class="home cur" rel="0">主页</li>
            : ''
        }
        {/*<li class="home cur" rel="0">主页</li>*/}
        {/*<li class="works" rel="1">作品</li>*/}
        <li class={ 'comments' + (this.props.authorDetail.ISSettled ? '' : ' cur') } rel="2">留言</li>
      </ul>
      {
        this.props.authorDetail.ISSettled
          ? <Home ref="home" authorID={ this.props.authorID } homeDetail={ this.props.homeDetail } playList={ this.props.playList.data }/>
          : ''
      }
      {/*<Work ref="works" authorID={ this.props.authorID } tags={ this.props.tags } playList={ this.props.playList } playList2={ this.props.playList2 }/>*/}
      <AuthorComment
        ref="authorComment"
        show={ !this.props.authorDetail.ISSettled }
        isLogin={ !!this.props.uid }
        authorID={ this.props.authorID }
        commentData={ this.props.commentData }/>
      <SubCmt ref="subCmt"
              originTo={ this.props.authorDetail.AuthorName }
              placeholder={ '给' + this.props.authorDetail.AuthorName + '留个言吧' }/>
    </div>;
  }
}

export default Author;
