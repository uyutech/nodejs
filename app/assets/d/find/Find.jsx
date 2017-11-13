/**
 * Created by army8735 on 2017/9/21.
 */

import net from '../common/net';
import util from '../common/util';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
// import HotPhotoAlbum from '../component/hotphotoalbum/HotPhotoAlbum.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotCircle from '../component/hotcircle/HotCircle.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';
import HotPlayList from '../component/hotplaylist/HotPlayList.jsx';
import Page from '../component/page/Page.jsx';

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
  }
  render() {
    return <div class="find">
      <Banner/>
      <div class="hot">
        <HotCircle ref="hotCircle" title="推荐圈子" dataList={ this.props.hotCircleList }/>
        <HotWork ref="hotWork" title="热门作品" dataList={ this.props.hotWorkList }/>
        <HotMusicAlbum ref="hotMusicAlbum" title="热门专辑" dataList={ this.props.hotMusicAlbumList }/>
        {/*<HotPhotoAlbum ref="hotPhotoAlbum" title="推荐相册" dataList={ this.props.hotPhotoAlbumList }/>*/}
        <HotAuthor ref="hotAuthor" title="入驻作者" dataList={ this.props.hotAuthorList }/>
      </div>
      <div class="hot2 fn-clear">
        <div class="post">
          {/*<Page ref="page" total={ Math.ceil(this.props.hotPostList.Size / 10) }/>*/}
          <HotPost ref="hotPost" datas={ { Size: this.props.hotPostList.length, data: this.props.hotPostList } }/>
          {/*<Page ref="page2" total={ Math.ceil(this.props.hotPostList.Size / 10) }/>*/}
        </div>
        <HotPlayList ref="hostPlayList" dataList={ this.props.hotPlayList.data }/>
      </div>
    </div>;
  }
}

export default Find;
