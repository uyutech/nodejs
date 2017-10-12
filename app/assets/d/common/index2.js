/**
 * Created by army8735 on 2017/10/11.
 */

'use strict';

import 'migi-es6-shim';
import 'migi';
import $ from './jquery-3.2.1';
import cookie from './cookie';
import './global2.jsx';

import './index2.less';

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
