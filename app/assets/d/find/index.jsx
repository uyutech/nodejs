/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import util from '../common/util';
import Find from './Find.jsx';

let find = migi.preExist(<Find
  hotWorkList={ $CONFIG.hotWorkList }
  hotAuthorList={ $CONFIG.hotAuthorList }
  hotMusicAlbumList={ $CONFIG.hotMusicAlbumList }
  hotPhotoAlbumList={ $CONFIG.hotPhotoAlbumList }
  hotPostList={ $CONFIG.hotPostList }
  hotCircleList={ $CONFIG.hotCircleList }
  hotPlayList={ $CONFIG.hotPlayList }
  banner={ $CONFIG.banner }
  myCircleList={ $CONFIG.myCircleList }/>);
