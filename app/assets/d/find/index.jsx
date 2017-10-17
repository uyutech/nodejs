/**
 * Created by army8735 on 2017/9/21.
 */

import './index.less';

import Find from './Find.jsx';

let find = migi.preExist(<Find
  hotWorkList={ $CONFIG.hotWorkList }
  hotAuthorList={ $CONFIG.hotAuthorList }
  hotAlbumList={ $CONFIG.hotAlbumList }
  tags={ $CONFIG.tags }
  playList={ $CONFIG.playList }
  playList2={ $CONFIG.playList2 }/>);
