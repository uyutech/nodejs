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
    this.ref.hotWork.autoWidth();
    this.ref.hotCollection.autoWidth();
    this.ref.hotAuthor.autoWidth();
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class={ 'home' + (this.props.hidden ? ' fn-hide' : '' ) }>
      <h4>主打作品</h4>
      <HotWork ref="hotWork" dataList={ this.props.homeDetail.Hot_Works_Items }/>
      <h4>专辑</h4>
      <HotMusicAlbum ref="hotCollection" dataList={ this.props.album }/>
      <h4>合作关系</h4>
      <HotAuthor ref="hotAuthor" dataList={ this.props.homeDetail.AuthorToAuthor }/>
    </div>;
  }
}

export default Home;
