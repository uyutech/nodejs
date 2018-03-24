/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import MAList from './MAList.jsx';
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
      let page = self.ref.authorComment.ref.page;
      subCmt.on('submit', function(content) {
        subCmt.invalid = true;
        let rootID = authorComment.rootID;
        let parentID = authorComment.parentID;
        if(rootID === '-1') {
          rootID = parentID;
        }
        net.postJSON('/api/author/addComment', {
          parentID: parentID,
          rootID: rootID,
          authorID: authorComment.authorID,
          content,
        }, function(res) {
          if(res.success) {
            let data = res.data;
            subCmt.value = '';
            if(rootID === -1) {
              comment.prependData(data);
            }
            else {
              comment.prependChild(data, parentID);
            }
            let $tag = $(self.ref.type.element).find('.comments');
            if(!$tag.hasClass('cur')) {
              $tag.click();
            }
            migi.eventBus.emit('COMMENT', 'work');
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
      comment.on('chooseSubComment', function(rid, cid, name) {
        subCmt.to = name;
        subCmt.focus();
      });
      comment.on('closeSubComment', function() {
        subCmt.to = '';
      });
      page.on('page', function() {
        subCmt.to = '';
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
    let maList = self.ref.maList;
    let authorComment = self.ref.authorComment;
    home && home.hide();
    maList && maList.hide();
    authorComment && authorComment.hide();
    let rel = tvd.props.rel;
    switch(rel) {
      case 'home':
        home.show();
        break;
      case 'ma':
        maList.show();
        break;
      case 'comment':
        authorComment.show();
        break;
    }
  }
  render() {
    let empty = !this.props.album.length
      && !this.props.homeDetail.Hot_Works_Items.length
      && !this.props.homeDetail.AuthorToAuthor.length;
    if(!this.props.authorDetail.ISSettled) {
      return <div class="author">
        <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail } uid={ this.props.uid }/>
        <ul class="type fn-clear" onClick={ { li: this.clickType } }>
          <li class="comments cur" rel="2">留言</li>
        </ul>
        <AuthorComment
          ref="authorComment"
          show={ true }
          isLogin={ !!this.props.uid }
          authorID={ this.props.authorID }
          commentData={ this.props.commentData }/>
        <SubCmt ref="subCmt"
                originTo={ this.props.authorDetail.AuthorName }
                placeholder={ '给' + this.props.authorDetail.AuthorName + '留个言吧' }/>
      </div>;
    }
    if(empty) {
      return <div class="author">
        <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail } uid={ this.props.uid }/>
        <ul class="type fn-clear" onClick={ { li: this.clickType } }>
          <li class="ma cur" rel="ma">音乐</li>
          <li class="comments" rel="comment">留言</li>
        </ul>
        <MAList ref="maList" authorID={ this.props.authorID } first={ true }
                dataList={ this.props.hotPlayList }/>
        <AuthorComment
          ref="authorComment"
          isLogin={ !!this.props.uid }
          authorID={ this.props.authorID }
          commentData={ this.props.commentData }/>
        <SubCmt ref="subCmt"
                originTo={ this.props.authorDetail.AuthorName }
                placeholder={ '给' + this.props.authorDetail.AuthorName + '留个言吧' }/>
      </div>;
    }
    return <div class="author">
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail } uid={ this.props.uid }/>
      <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
        <li class="home cur" rel="home">主页</li>
        <li class="ma" rel="ma">音乐</li>
        <li class="comments" rel="comment">留言</li>
      </ul>
      <Home ref="home" authorID={ this.props.authorID } homeDetail={ this.props.homeDetail }
            album={ this.props.album }/>
      <MAList ref="maList" authorID={ this.props.authorID }
              dataList={ this.props.hotPlayList } hidden={ true }/>
      <AuthorComment
        ref="authorComment"
        show={ false }
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
