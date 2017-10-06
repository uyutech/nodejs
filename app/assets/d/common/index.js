/**
 * Created by army on 2017/3/19.
 * For my goddess.
 */

import 'migi-es6-shim';
import 'migi';
import $ from './jquery-3.2.1';
import cookie from './cookie';
import './global.jsx';

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

window.$ = $;
