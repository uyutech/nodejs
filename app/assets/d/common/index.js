/**
 * Created by army on 2017/3/19.
 * For my goddess.
 */

'use strict';

import 'migi-es6-shim';
import 'migi';
import $ from './jquery-3.2.1';
import cookie from './cookie';
import './global.jsx';

import './index.less';
import net from "./net";

cookie($);

window.requestAnimationFrame = function() {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function(callback) {
      window.setTimeout(callback, 16.7);
    };
}();

window.$ = $;

net.postJSON('/api/count/index');

if(!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
