/**
 * Created by army8735 on 2017/9/18.
 */

'use strict';

import uuidv4 from 'uuid/v4';
import net from './net';
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

migi.eventBus.on('SET_VOLUME', function(v) {
  let uid = window.$CONFIG ? $CONFIG.uid : '';
  let key = uid + 'volume';
  localStorage[key] = v;
});

let login = document.querySelector('#gTop .login');
login && login.addEventListener('click', function(e) {
  e.preventDefault();
  migi.eventBus.emit('NEED_LOGIN');
});
let loginOut = document.querySelector('#gTop .out');
loginOut && loginOut.addEventListener('click', function(e) {
  e.preventDefault();
  net.postJSON('/api/login/loginOut', function() {
    location.reload(true);
  });
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
  img.src = '/api/count/index?platform=1'
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
