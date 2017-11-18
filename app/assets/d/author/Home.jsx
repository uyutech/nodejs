/**
 * Created by army on 2017/6/24.
 */

import HotWork from '../component/hotwork/HotWork.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import Dynamic from '../component/dynamic/Dynamic.jsx';

class Home extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="home">
      <h4>
        <span>主打作品</span>
        <small>{ '未来会根据你的口味进行精准智能的推送！>3<' }</small>
      </h4>
      <HotWork ref="hotWork" dataList={ this.props.homeDetail.Hot_Works_Items }/>
      <HotMusicAlbum ref="hotCollection" title="专辑"/>
      <HotAuthor ref="hotAuthor" title="合作关系" dataList={ this.props.homeDetail.AuthorToAuthor }/>
      <Dynamic title="全网动态"/>
    </div>;
  }
}

export default Home;
