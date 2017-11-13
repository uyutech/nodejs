/**
 * Created by army on 2017/6/18.
 */

import util from '../../d/common/util';
import net from '../../d/common/net';
import Banner from './Banner.jsx';
import HotWork from '../component/hotwork/HotWork.jsx';
import HotPhotoAlbum from '../component/hotphotoalbum/HotPhotoAlbum.jsx';
import HotAuthor from '../component/hotauthor/HotAuthor.jsx';
import HotMusicAlbum from '../component/hotmusicalbum/HotMusicAlbum.jsx';
import HotCircle from '../component/hotcircle/HotCircle.jsx';
import HotPost from '../component/hotpost/HotPost.jsx';

class Find extends migi.Component {
  constructor(...data) {
    super(...data);
    let self = this;
    self.on(migi.Event.DOM, function() {
    });
  }
  show() {
    $(this.element).removeClass('fn-hide');
  }
  hide() {
    $(this.element).addClass('fn-hide');
  }
  render() {
    return <div class="find">
      <Banner/>
      <HotCircle ref="HotCircle" title="推荐圈子" dataList={ this.props.hotCircleList }/>
      <HotWork ref="hotWork" title="热门作品" dataList={ this.props.hotWorkList }/>
      <HotMusicAlbum ref="hotMusicAlbum" title="热门专辑" dataList={ this.props.hotMusicAlbumList }/>
      <HotAuthor ref="hotAuthor" title="入驻作者" dataList={ this.props.hotAuthorList }/>
      {/*<HotPhotoAlbum ref="hotPhotoAlbum" title="推荐相册" dataList={ this.props.hotPhotoAlbumList}/>*/}
      <div class="post">
        <h4>转圈</h4>
        <HotPost ref="hotPost" take={ 20 } url={ '/api/find/hotPostList' }
                 datas={ { Size: this.props.hotPostList.length, data: this.props.hotPostList} }/>
      </div>
    </div>;
  }
}

export default Find;
