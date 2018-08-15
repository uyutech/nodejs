/**
 * Created by army8735 on 2018/7/10.
 */

'use strict';

import 'migi-es6-shim';
import 'migi';
import $ from '../../d/common/jquery-3.2.1';
import cookie from '../../d/common/cookie';

import './index.less';

cookie($);

window.requestAnimationFrame = function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) {
      window.setTimeout(callback, 16.7);
    };
}();

if(!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

let IS_MOBILE = false;

if(/iP(hone|od|ad)/.test(navigator.userAgent)) {
  IS_MOBILE = true;
  document.documentElement.classList.add('mobile');
  let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
    version = parseInt(v[1], 10);
  if(version >= 8){
    document.documentElement.classList.add('hairlines');
  }
}
if(/Android|MZBrowser/.test(navigator.userAgent)) {
  IS_MOBILE = true;
  document.documentElement.classList.add('mobile');
}

window.$ = $;
