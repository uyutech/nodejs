/**
 * Created by army8735 on 2017/9/22.
 */

import net from '../common/net';
import util from '../common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import Work from './Work.jsx';
import AuthorComment from './AuthorComment.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    // let self = this;
    // self.on(migi.Event.DOM, function() {
    //   let tags = self.ref.tags;
    //   let home = self.ref.home;
    //   let work = self.ref.work;
    //   let authorComment = self.ref.authorComment;
    //   tags.on('change', function(i) {
    //     home && home.hide();
    //     work && work.hide();
    //     authorComment && authorComment.hide();
    //     switch (i) {
    //       case '0':
    //         home.show();
    //         break;
    //       case '1':
    //         work.show();
    //         work.ref.doubleCheck.autoWidth();
    //         work.ref.doubleCheck.autoWidth2();
    //         break;
    //       case '2':
    //         authorComment.show();
    //         break;
    //     }
    //   });
    //   // setTimeout(function() {
    //   //   tags.emit('change', '2');
    //   // }, 100);
    // });
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
    works.hide();
    authorComment.hide();
    let rel = tvd.props.rel;
    switch(rel) {
      case '0':
        home.show();
        break;
      case '1':
        works.show();
        break;
      case '2':
        authorComment.show();
        break;
    }
  }
  render() {
    return <div class="author">
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail }/>
      <ul class="type fn-clear" onClick={ { li: this.clickType } }>
        <li class="home cur" rel="0">主页</li>
        <li class="works" rel="1">作品</li>
        <li class="comments" rel="2">留言</li>
      </ul>
      <Home ref="home" authorID={ this.props.authorID } homeDetail={ this.props.homeDetail } playList={ this.props.playList.data }/>
      <Work ref="works" authorID={ this.props.authorID } tags={ this.props.tags } playList={ this.props.playList } playList2={ this.props.playList2 }/>
      <AuthorComment
        ref="authorComment"
        isLogin={ this.props.isLogin }
        authorID={ this.props.authorID }
        commentData={ this.props.commentData }/>
    </div>;
  }
}

export default Author;
