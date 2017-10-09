/**
 * Created by army8735 on 2017/9/18.
 */

import './iframe';
import MLogin from '../component/mlogin/MLogin.jsx';
import Share from '../component/share/Share.jsx';

let mlogin;
migi.eventBus.on('NEED_LOGIN', function() {
  if(!mlogin) {
    mlogin = migi.render(
      <MLogin/>,
      document.body
    );
  }
  mlogin.show();
});

let share;
migi.eventBus.on('SHARE', function(url) {
  if(!share) {
    share = migi.render(
      <Share/>,
      document.body
    );
  }
  share.url = url;
  share.show();
});

migi.eventBus.on('SET_VOLUME', function(v) {
  let uid = window.$CONFIG ? $CONFIG.uid : '';
  let key = uid + 'volume';
  localStorage[key] = v;
});
