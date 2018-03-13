/**
 * Created by army8735 on 2017/9/18.
 */

import net from '../../d/common/net';
import MLogin from '../component/mlogin/MLogin.jsx';
import Share from '../../d/component/share/Share.jsx';

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

let b = document.querySelector('#gTop b');
let ul = document.querySelector('#gTop ul');
b.addEventListener('click', function(e) {
  e.stopPropagation();
  ul.classList.remove('fn-hide');
});
document.body.addEventListener('click', function() {
  ul.classList.add('fn-hide');
});

document.addEventListener('DOMContentLoaded', function() {
  net.postJSON('/api/count/index');
});
