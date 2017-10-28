/**
 * Created by army8735 on 2017/9/18.
 */

import net from '../../d/common/net';
import util from '../../d/common/util';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import Work from './Work.jsx';
import AuthorComment from './AuthorComment.jsx';
import SubCmt from '../../d/component/subcmt/SubCmt.jsx';

class Author extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
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
      <Nav ref="nav" authorID={ this.props.authorID } authorDetail={ this.props.authorDetail }/>
      <ul class="type fn-clear" ref="type" onClick={ { li: this.clickType } }>
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
      {/*<Work ref="work" authorID={ this.props.authorID } tags={ this.props.tags } playList={ this.props.playList}/>*/}
      <AuthorComment
        ref="authorComment"
        show={ !this.props.authorDetail.ISSettled }
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
