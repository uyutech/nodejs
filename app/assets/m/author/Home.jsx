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
      <HotWork ref="hotWork" title="主打作品" dataList={ this.props.homeDetail.Hot_Works_Items }/>
      <HotMusicAlbum ref="hotCollection" title="专辑" dataList={ this.props.album }/>
      <h4>合作关系</h4>
      <HotAuthor ref="hotAuthor" dataList={ this.props.homeDetail.AuthorToAuthor }/>
    </div>;
  }
}

export default Home;
