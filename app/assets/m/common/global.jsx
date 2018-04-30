/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

import uuidv4 from 'uuid/v4';
import MLogin from '../component/mlogin/MLogin.jsx';

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

document.addEventListener('DOMContentLoaded', function() {
  let UUID = localStorage['UUID'];
  let first = !UUID;
  if(first) {
    UUID = uuidv4().replace(/-/g, '');
    localStorage['UUID'] = UUID;
  }
  let img = new Image();
  img.style.position = 'absolute';
  img.style.display = 'none';
  img.src = '/api/count/index?platform=2'
    + '&url=' + encodeURIComponent(location.pathname.replace(/^\//, ''))
    + '&search=' + encodeURIComponent(location.search.replace(/^\?/, ''))
    + '&uuid=' + UUID
    + '&first=' + first
    + '&_=' + Date.now() + Math.random();
  img.onload = function() {
    document.removeChild(img);
  };
  document.body.appendChild(img);
});
