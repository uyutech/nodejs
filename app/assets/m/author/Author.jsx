/**
 * Created by army8735 on 2017/9/18.
 */

import net from '../../d/common/net';
import util from '../../d/common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import AuthorComment from './AuthorComment.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let authorComment = self.ref.authorComment;
      let comment = authorComment.ref.comment;
      let subCmt = self.ref.subCmt;
      comment.on('chooseSubComment', function(rid, cid, name, n) {
        // subCmt.to = name;
        // subCmt.focus();
        if(!n || n === '0') {
          location.href = '/subComment?type=2&id=' + self.props.authorID + '&cid=' + cid + '&rid=' + rid;
        }
      });
      comment.on('closeSubComment', function() {
        // subCmt.to = '';
      });
      subCmt.on('focus', function() {
        location.href = '/subComment?type=2&id=' + self.props.authorID;
      });
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
    // let works = self.ref.works;
    let authorComment = self.ref.authorComment;
    home.hide();
    // works.hide();
    authorComment.hide();
    let rel = tvd.props.rel;
    switch(rel) {
      case 'home':
        home.show();
        history.replaceState(null, '', '?tag=home');
        break;
      // case '1':
      //   works.show();
      //   break;
      case 'comment':
        authorComment.show();
        history.replaceState(null, '', '?tag=comment');
        break;
    }
  }
  render() {
    if(!this.props.authorDetail.ISSettled) {
      return <div class="author">
        <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail }/>
        <ul class="type fn-clear" ref="type">
          <li class="comments cur" rel="2">留言</li>
        </ul>
        <AuthorComment
          ref="authorComment"
          isLogin={ this.props.isLogin }
          authorID={ this.props.authorID }
          commentData={ this.props.commentData }/>
        <SubCmt ref="subCmt"
                originTo={ this.props.authorDetail.AuthorName }
                subText="发送"
                tipText="-${n}"
                placeholder={ '给' + this.props.authorDetail.AuthorName + '留个言吧' }/>
      </div>;
    }
    return <div class="author">
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail }/>
      <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
        {
          this.props.authorDetail.ISSettled
            ? <li class={ 'home' + (this.props.tag !== 'comment' ? ' cur' : '') } rel="home">主页</li>
            : ''
        }
        <li class={ 'comments' + (this.props.tag === 'comment' ? ' cur' : '') } rel="comment">留言</li>
      </ul>
      <Home ref="home" authorID={ this.props.authorID } homeDetail={ this.props.homeDetail }
            hidden={ this.props.tag === 'comment' }
            album={ this.props.album }/>
      <AuthorComment
        ref="authorComment"
        hidden={ this.props.tag !== 'comment' }
        isLogin={ this.props.isLogin }
        authorID={ this.props.authorID }
        commentData={ this.props.commentData }/>
      <SubCmt ref="subCmt"
              originTo={ this.props.authorDetail.AuthorName }
              subText="发送"
              tipText="-${n}"
              placeholder={ '给' + this.props.authorDetail.AuthorName + '留个言吧' }/>
    </div>;
  }
}

export default Author;
