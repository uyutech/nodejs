(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 106);
/******/ })
/************************************************************************/
/******/ ({

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  return '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n  <meta charset="utf-8"/>\n  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n  <meta name="renderer" content="webkit"/>\n  <meta name="apple-mobile-web-app-capable" content="yes"/>\n  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>\n  <meta name="format-detection" content="telephone=no"/>\n  <meta name="format-detection" content="email=no"/>\n  <meta name="wap-font-scale" content="no"/>\n  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">\n  <title>\u5F02\u4E16\u8C23</title>\n  <link rel="icon" href="//zhuanquan.xin/img/ba2257a30816928629e0b47f9e6f7b38.png" type="image/x-icon">\n  <link rel="stylesheet" href="/public/rcommon.css?2"/>\n  <link rel="stylesheet" href="/public/rsingle.css?2"/>\n</head>\n<body>\n<script>\n  var IS_LOGIN = ' + JSON.stringify(data.isLogin) + ';\n  var uid = ' + JSON.stringify(data.uid) + ';\n  var LOGIN_URL = \'https://api.weibo.com/oauth2/authorize?client_id=' + data.helper.rhymeAppKey + '&redirect_uri=' + data.helper.rhymeRedirect + '\';\n  var FOLLOW = ' + JSON.stringify(data.follows) + ';\n  var FOLLOW_HETU = \'0\';\n  var FOLLOW_SIXIA = \'0\';\n  var FOLLOW_MUHAN = \'0\';\n  var FOLLOW_MI = \'0\';\n  var FOLLOW_JIEMENG = \'0\';\n  var HETU_ID = \'2017000000000001\';\n  var SIXIA_ID = \'2017000000000004\';\n  var MUHAN_ID = \'2017000000000007\';\n  var MI_ID = \'2017000000000012\';\n  var JIEMENG_ID = \'2017000000000002\';\n</script>\n<div id="page" class="page"></div>\n<script src="/public/rcommon.js?2"></script>\n<script src="/public/rsingle.js?2"></script>\n<div style="display:none"><script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1266706529\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1266706529\' type=\'text/javascript\'%3E%3C/script%3E"));</script></div>\n</body>\n</html>';
};

;

/***/ })

/******/ })));