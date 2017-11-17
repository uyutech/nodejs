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

let loading;
let take = 10;
let skip = take;

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
      let page = self.ref.page;
      let page2 = self.ref.page2;
      page.on('page', function(i) {
        page2.index = i;
        self.load(i);
      });
      page2.on('page', function(i) {
        page.index = i;
        self.load(i);
      });
    });
  }
  load(i) {
    let self = this;
    if(loading) {
      return;
    }
    loading = true;
    skip = (i - 1) * take;
    net.postJSON('/api/find/hotPostList', { skip, take }, function(res) {
      if(res.success) {
        self.ref.hotPost.setData(res.data.data);
      }
      else {
        alert(res.message || util.ERROR_MESSAGE);
      }
      loading = false;
    }, function(res) {
      alert(res.message || util.ERROR_MESSAGE);
      loading = false;
    });
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
          <Page ref="page" total={ Math.ceil(this.props.hotPostList.Size / 10) }/>
          <HotPost ref="hotPost" data={ this.props.hotPostList.data }/>
          <Page ref="page2" total={ Math.ceil(this.props.hotPostList.Size / 10) }/>
        </div>
        <HotPlayList ref="hostPlayList" dataList={ this.props.hotPlayList.data }/>
      </div>
    </div>;
  }
}

export default Find;
