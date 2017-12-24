/**
 * Created by army8735 on 2017/9/18.
 */

import net from '../../d/common/net';
import util from '../../d/common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import MAList from './MAList.jsx';
import PicList from './PicList.jsx';
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
        subCmt.to = name;
        self.rid = rid;
        self.cid = cid;
        if(!n || n === '0') {
          location.href = '/subComment?type=2&id=' + self.props.authorID + '&cid=' + cid + '&rid=' + rid;
        }
      });
      comment.on('closeSubComment', function() {
        subCmt.to = '';
      });
      subCmt.on('focus', function() {
        if(subCmt.to) {
          location.href = '/subComment?type=2&id=' + self.props.authorID + '&cid=' + self.cid + '&rid=' + self.rid;
        }
        else {
          location.href = '/subComment?type=2&id=' + self.props.authorID;
        }
      });
    });
  }
  @bind rid
  @bind cid
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
    let picList = self.ref.picList;
    let authorComment = self.ref.authorComment;
    home && home.hide();
    maList && maList.hide();
    picList && picList.hide();
    authorComment && authorComment.hide();
    let rel = tvd.props.rel;
    switch(rel) {
      case 'home':
        home.show();
        history.replaceState(null, '', '?tag=home');
        break;
      case 'ma':
        maList.show();
        history.replaceState(null, '', '?tag=ma');
        break;
      case 'pic':
        picList.show();
        history.replaceState(null, '', '?tag=pic');
        break;
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
        <ul class="type fn-clear">
          <li class="comments cur">留言</li>
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
    let emptyHome = !this.props.album.length
      && !this.props.homeDetail.Hot_Works_Items.length
      && !this.props.homeDetail.AuthorToAuthor.length;
    let emptyMA = !this.props.hotPlayList.Size;
    let emptyPic = !this.props.hotPicList.Size;
    return <div class="author">
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail }/>
      <ul class="type fn-clear" onClick={ { li: this.clickType } }>
        {
          emptyHome
            ? ''
            : <li class={ 'home'
            + (this.props.tag !== 'comment' && this.props.tag !== 'ma' && this.props.tag !== 'pic' ? ' cur' : '') }
                  rel="home">主页</li>
        }
        {
          emptyMA
            ? ''
            : <li class={ 'ma' + (this.props.tag === 'ma' ? ' cur' : '') } rel="ma">音乐</li>
        }
        {
          emptyPic
            ? ''
            : <li class={ 'pic' + (this.props.tag === 'pic' ? ' cur' : '') } rel="pic">图片</li>
        }
        <li class={ 'comments' + (this.props.tag === 'comment' ? ' cur' : '') } rel="comment">留言</li>
      </ul>
      {
        emptyHome
          ? ''
          : <Home ref="home" authorID={ this.props.authorID } homeDetail={ this.props.homeDetail }
                  hidden={ this.props.tag === 'comment' || this.props.tag === 'ma' || this.props.tag === 'pic' }
                  album={ this.props.album }/>
      }
      {
        emptyMA
          ? ''
          : <MAList ref="maList" authorID={ this.props.authorID }
                    dataList={ this.props.hotPlayList } hidden={ this.props.tag !== 'ma' }/>
      }
      {
        emptyPic
          ? ''
          : <PicList ref="picList" authorID={ this.props.authorID }
                     dataList={ this.props.hotPicList } hidden={ this.props.tag !== 'pic' }/>
      }
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
      <a class="app" href="http://circling.net.cn/android/circling-0.2.9.apk" target="_blank"/>
    </div>;
  }
}

export default Author;
