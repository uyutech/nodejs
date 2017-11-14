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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army on 2017/5/20.
 */

let util = {
  goto: function(url) {
    location.href = url;
  },
  autoSsl: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url.replace(/\.(\w+)-\d+_\d*/, '.$1') : url;
  },
  img1296_1296_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-1296_1296_80' : url;
  },
  img1200__80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-1200__80' : url;
  },
  img980_980_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-980_980_80' : url;
  },
  img750_750_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-750_750_80' : url;
  },
  img720__80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-720__80' : url;
  },
  img600_600_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600_600_80' : url;
  },
  img600__80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600__80' : url;
  },
  img480_480_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-480_480_80' : url;
  },
  img288__80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288__80' : url;
  },
  img288_288_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288_288_80' : url;
  },
  img240_240_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img220_220_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img200_200: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200' : url;
  },
  img200_200_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200_80' : url;
  },
  img192_192: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
  },
  img150_150_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-150_150_80' : url;
  },
  img144_: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_' : url;
  },
  img144_144: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144' : url;
  },
  img144_144_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144_80' : url;
  },
  img128_128_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img120_120: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120' : url;
  },
  img120_120_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img100_100: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img96_96_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img90_90: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img64_64_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-64_64_80' : url;
  },
  img60_60: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60' : url;
  },
  img60_60_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60_80' : url;
  },
  img__60: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
  },
  img48_48_80: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-48_48_80' : url;
  },
  decode: function(str) {
    return str.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  },
  formatPost: function(str) {},
  formatTime: function(time) {
    if(!time) {
      return '00:00';
    }
    let res = '';
    if(time >= 1000 * 60 * 60) {
      let hour = Math.floor(time / (1000 * 60 * 60));
      time -= 1000 * 60 * 60 * hour;
      res += hour + ':';
    }
    if(time >= 1000 * 60) {
      let minute = Math.floor(time / (1000 * 60));
      time -= 1000 * 60 * minute;
      if(minute < 10) {
        minute = '0' + minute;
      }
      res += minute + ':';
    }
    else {
      res += '00:';
    }
    let second = Math.floor(time / 1000);
    if(second < 10) {
      second = '0' + second;
    }
    res += second;
    return res;
  },
  formatDate: function(time) {
    time = new Date(time);
    let now = Date.now();
    let diff = now - time;
    if(diff >= 1000 * 60 * 60 * 24 * 365) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) + '年前';
    }
    if(diff >= 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }
    if(diff >= 1000 * 60 * 60 * 24) {
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前';
    }
    if(diff >= 1000 * 60 * 60) {
      return Math.floor(diff / (1000 * 60 * 60)) + '小时前';
    }
    if(diff >= 1000 * 60) {
      return Math.floor(diff / (1000 * 60)) + '分钟前';
    }
    return '刚刚';
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

/* harmony default export */ __webpack_exports__["default"] = (util);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/10/6.
 */



let net = {
  ajax: function(url, data, success, error, type, timeout) {
    let csrfToken = $.cookie('csrfToken');
    Object.keys(data).forEach(function(k) {
      if(data[k] === undefined || data[k] === null) {
        delete data[k];
      }
    });
    if(url.indexOf('?') === -1) {
      url += '?_=' + Date.now();
    }
    else {
      url += '&_=' + Date.now();
    }
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        crossDomain: true,
        timeout: timeout || 30000,
        type: type || 'get',
        headers: {
          'x-csrf-token': csrfToken,
        },
        // ajax 跨域设置必须加上
        beforeSend: function (xhr) {
          xhr.withCredentials = true;
        },
        success: function (data, state, xhr) {
          success(data, state, xhr);
        },
        error: function (data) {
          if(!error.__hasExec) {
            error.__hasExec = true;
            error(data || {});
          }
        }
      });
    }
    return load();
  },
  getJSON: function(url, data, success, error, timeout) {
    if(typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if(typeof success !== 'function') {
      success = function() {};
      timeout = error;
      error = success;
    }
    if(typeof error !== 'function') {
      timeout = error;
      error = function() {};
    }
    return net.ajax(url, data, success, error, 'GET', timeout);
  },
  postJSON: function(url, data, success, error, timeout) {
    if(typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if(typeof success !== 'function') {
      success = function() {};
      timeout = error;
      error = success;
    }
    if(typeof error !== 'function') {
      timeout = error;
      error = function() {};
    }
    return net.ajax(url, data, success, error, 'POST', timeout);
  },
};

/* harmony default export */ __webpack_exports__["default"] = (net);


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPE = {
  111: '演唱',
  112: '和声',
  113: '伴唱',
  114: '戏腔',
  121: '作曲',
  122: '编曲',
  123: '和声编写',
  131: '混音',
  132: '母带',
  133: '录音',
  134: '修音',
  135: '剧情混音',
  141: '乐器实录',
  151: '配音',
  211: '视频',
  212: '合成',
  213: '压制',
  311: '立绘',
  312: 'CG',
  313: '场景',
  314: 'logo设计',
  315: '线稿',
  316: '上色',
  317: '手绘',
  321: '3D建模',
  322: '打光',
  323: '动画',
  324: '骨骼绑定',
  331: '设计',
  332: '海报',
  333: 'logo',
  334: '分镜',
  341: '漫画',
  411: '作词',
  421: '文案',
  422: '剧本',
  423: '小说'
};

var CODE = {
  '演唱': 111
};

exports.default = {
  TYPE: TYPE,
  CODE: CODE
};

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _AuthorType = __webpack_require__(5);

var _AuthorType2 = _interopRequireDefault(_AuthorType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotWork = function (_migi$Component) {
  _inherits(HotWork, _migi$Component);

  function HotWork() {
    var _ref;

    _classCallCheck(this, HotWork);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotWork.__proto__ || Object.getPrototypeOf(HotWork)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function () {
      self.autoWidth();
    });
    return _this;
  }

  _createClass(HotWork, [{
    key: 'autoWidth',
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.css('width', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotwork"]], [migi.createVd("h4", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img200_200_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']]), migi.createVd("span", [["class", "type"]], ["音乐"]), migi.createVd("span", [["class", "num"]], [item.Popular])]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "txt"]], [migi.createVd("span", [], [item.Title]), migi.createVd("span", [["class", "author"]], [(item.SingerName || []).join(' ')])])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotWork;
}(migi.Component);

migi.name(HotWork, "HotWork");exports.default = HotWork;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotAuthor = function (_migi$Component) {
  _inherits(HotAuthor, _migi$Component);

  function HotAuthor() {
    var _ref;

    _classCallCheck(this, HotAuthor);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotAuthor.__proto__ || Object.getPrototypeOf(HotAuthor)).call.apply(_ref, [this].concat(data)));

    _this.dataList = _this.props.dataList;
    _this.on(migi.Event.DOM, function () {
      this.autoWidth();
    });
    return _this;
  }

  _createClass(HotAuthor, [{
    key: "autoWidth",
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.css('width', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotauthor"]], [migi.createVd("h4", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          var types = item.WorksType || [];
          return migi.createVd("li", [], [migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img120_120_80(item.Head_url || '//zhuanquan.xin/img/head/8fd9055b7f033087e6337e37c8959d3e.png'))]])]), migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.AuthorName]), migi.createVd("span", [["class", "fans"]], [item.FansNumber || 0]), migi.createVd("span", [["class", "comment"]], [item.Popular || 0])]), migi.createVd("div", [["class", "info"]], ["合作", item.CooperationTimes, "次"])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      return this.__getBind("dataList");
    }
  }]);

  return HotAuthor;
}(migi.Component);

migi.name(HotAuthor, "HotAuthor");exports.default = HotAuthor;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotMusicAlbum = function (_migi$Component) {
  _inherits(HotMusicAlbum, _migi$Component);

  function HotMusicAlbum() {
    var _ref;

    _classCallCheck(this, HotMusicAlbum);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotMusicAlbum.__proto__ || Object.getPrototypeOf(HotMusicAlbum)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function () {
      self.autoWidth();
    });
    return _this;
  }

  _createClass(HotMusicAlbum, [{
    key: 'autoWidth',
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.css('width', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotmusicalbum"]], [migi.createVd("h4", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          var url = item.WorkType === 5 ? '/musicalbum/' + item.WorksID : '/works/' + item.WorksID;
          return migi.createVd("li", [], [migi.createVd("b", [["class", "bg"]]), migi.createVd("a", [["href", url], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img200_200_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']]), migi.createVd("span", [["class", "num"]], [item.Popular || 0])]), migi.createVd("a", [["href", url], ["class", "txt"]], [migi.createVd("span", [], [item.Title]), migi.createVd("span", [["class", "author"]], [(item.SingerName || []).join(' ')])])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotMusicAlbum;
}(migi.Component);

migi.name(HotMusicAlbum, "HotMusicAlbum");exports.default = HotMusicAlbum;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var take = 20;
var skip = take;

var PostList = function (_migi$Component) {
  _inherits(PostList, _migi$Component);

  function PostList() {
    var _ref;

    _classCallCheck(this, PostList);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = PostList.__proto__ || Object.getPrototypeOf(PostList)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.take) {
      take = self.props.take;
      if (self.props.skip) {
        skip = self.props.skip;
      } else {
        skip = take;
      }
    } else if (self.props.skip) {
      skip = self.props.skip;
    }
    if (self.props.datas && self.props.datas.data) {
      if (self.props.take) {
        if (self.props.skip) {
          skip = self.props.skip;
        } else {
          skip = self.props.datas.data.length;
        }
      }
      var html = '';
      self.props.datas.data.forEach(function (item) {
        html += self.genItem(item);
      });
      self.html = html;
      self.on(migi.Event.DOM, function () {
        var $list = $(this.ref.list.element);
        $list.on('click', '.con a', function (e) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        });
        $list.on('click', '.like', function () {
          var $li = $(this);
          if ($li.hasClass('loading')) {
            return;
          }
          $li.addClass('loading');
          var postID = $li.attr('rel');
          _net2.default.postJSON('/api/post/like', { postID: postID }, function (res) {
            if (res.success) {
              var _data = res.data;
              if (_data.ISLike) {
                $li.addClass('has');
              } else {
                $li.removeClass('has');
              }
              $li.text(_data.LikeCount);
            } else {
              alert(res.message || _util2.default.ERROR_MESSAGE);
            }
            $li.removeClass('loading');
          }, function () {
            alert(res.message || _util2.default.ERROR_MESSAGE);
            $li.removeClass('loading');
          });
        });
        $list.on('click', '.con,.imgs', function () {
          location.href = $(this).closest('li').find('.more').attr('href');
        });
        $list.on('click', '.comment', function () {
          location.href = $(this).closest('.wrap').find('.more').attr('href');
        });
        $list.on('click', '.del', function () {
          if (window.confirm('确认删除吗？')) {
            var postID = $(this).attr('rel');
            var $li = $(this).closest('.wrap').closest('li');
            _net2.default.postJSON('/api/post/del', { postID: postID }, function (res) {
              if (res.success) {
                $li.remove();
              } else {
                alert(res.message || _util2.default.ERROR_MESSAGE);
              }
            }, function (res) {
              alert(res.message || _util2.default.ERROR_MESSAGE);
            });
          }
        });

        var $window = $(window);
        $window.on('scroll', function () {
          self.checkMore($window);
        });
      });
    }
    return _this;
  }

  _createClass(PostList, [{
    key: 'genItem',
    value: function genItem(item) {
      var len = item.Content.length;
      var id = item.ID;
      var maxLen = 144;
      var imgLen = item.Image_Post.length;
      var html = len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content;
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/#(\S.*?)#/g, '<strong>#$1#</strong>').replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "name"]], [item.SendUserNickName]), migi.createVd("a", [["class", "time"], ["href", '/post/' + item.ID]], [_util2.default.formatDate(item.Createtime)])]), migi.createVd("ul", [["class", "circle"]], [(item.Taglist || []).map(function (item) {
          return migi.createVd("li", [], [item.TagName, "圈"]);
        })])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + item.ID], ["class", "t"]], [item.Title]) : '', migi.createVd("p", [["class", "con"], ["dangerouslySetInnerHTML", html]], [len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content, migi.createVd("a", [["href", '/post/' + item.ID], ["class", 'more' + (len > maxLen ? '' : ' fn-hide')]], ["查看全部"])]), item.Image_Post ? migi.createVd("ul", [["class", "imgs fn-clear"]], [item.Image_Post.map(function (item) {
          return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img120_120_80(item.FileUrl)) + ')']]);
        })]) : '', migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", item.ID]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", item.ID]], [item.CommentCount]), item.IsOwn ? migi.createVd("li", [["class", "del"], ["rel", item.ID]]) : '']), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.SendUserNickName]), migi.createVd("a", [["class", "time"], ["href", '/post/' + item.ID]], [_util2.default.formatDate(item.Createtime)])]), migi.createVd("ul", [["class", "circle"]], [(item.Taglist || []).map(function (item) {
        return migi.createVd("li", [], [item.TagName, "圈"]);
      })])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + item.ID], ["class", "t"]], [item.Title]) : '', migi.createVd("pre", [["class", "con"]], [len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content, migi.createVd("a", [["href", '/post/' + item.ID], ["class", 'more' + (len > maxLen ? '' : ' fn-hide')]], ["查看全部"])]), item.Image_Post ? migi.createVd("ul", [["class", "imgs fn-clear"]], [item.Image_Post.map(function (item) {
        return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img120_120_80(item.FileUrl)) + ')']]);
      })]) : '', migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", item.ID]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", item.ID]], [item.CommentCount]), item.IsOwn ? migi.createVd("li", [["class", "del"], ["rel", item.ID]]) : '']), migi.createVd("b", [["class", "arrow"]])])]);
    }
  }, {
    key: 'checkMore',
    value: function checkMore($window) {
      var self = this;
      var WIN_HEIGHT = $window.height();
      var HEIGHT = $(document.body).height();
      var bool = void 0;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if (!self.loading && !self.loadEnd && bool) {
        self.load();
      }
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      self.loading = true;
      self.message = '正在加载...';
      _net2.default.postJSON(self.props.url || '/api/circle/list', { circleID: $CONFIG.circleID, skip: skip, take: take }, function (res) {
        if (res.success) {
          var data = res.data;
          skip += take;
          self.setData(data.data);
          if (!data.data.length || data.data.length < take) {
            self.loadEnd = true;
            self.message = '已经到底了';
          }
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
        self.loading = false;
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
        self.loading = false;
      });
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var self = this;
      var html = '';
      data.forEach(function (item) {
        html += self.genItem(item);
      });
      $(self.ref.list.element).append(html);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotpost"]], [this.props.datas.Size ? migi.createVd("ol", [["class", "list"], ["ref", "list"], ["dangerouslySetInnerHTML", this.html]]) : migi.createVd("div", [["class", "empty"]], ["暂无内容"]), migi.createVd("div", [["class", "message"]], [new migi.Obj("message", this, function () {
        return this.message;
      })])]);
    }
  }, {
    key: 'loading',
    set: function set(v) {
      this.__setBind("loading", v);this.__data("loading");
    },
    get: function get() {
      return this.__getBind("loading");
    }
  }, {
    key: 'loadEnd',
    set: function set(v) {
      this.__setBind("loadEnd", v);this.__data("loadEnd");
    },
    get: function get() {
      return this.__getBind("loadEnd");
    }
  }, {
    key: 'message',
    set: function set(v) {
      this.__setBind("message", v);this.__data("message");
    },
    get: function get() {
      return this.__getBind("message");
    }
  }]);

  return PostList;
}(migi.Component);

migi.name(PostList, "PostList");exports.default = PostList;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var hotWorkList = data.hotWorkList;
  var hotAuthorList = data.hotAuthorList;
  var hotMusicAlbumList = data.hotMusicAlbumList;
  var hotPhotoAlbumList = data.hotPhotoAlbumList;
  var hotCircleList = data.hotCircleList;
  var hotPostList = data.hotPostList;
  var hotPlayList = data.hotPlayList;

  var find = migi.preRender(migi.createCp(_Find2.default, [["hotWorkList", hotWorkList], ["hotAuthorList", hotAuthorList], ["hotMusicAlbumList", hotMusicAlbumList], ["hotPhotoAlbumList", hotPhotoAlbumList], ["hotCircleList", hotCircleList], ["hotPostList", hotPostList], ["hotPlayList", hotPlayList]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getMHead({ title: '发现' }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mfind.css') + '"/>\n</head>\n<body>\n<div id="page">' + find + '</div>\n' + data.helper.getMTopNav() + '\n' + data.helper.getMBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.hotWorkList = ' + data.helper.stringify(hotWorkList) + ';\n  $CONFIG.hotAuthorList = ' + data.helper.stringify(hotAuthorList) + ';\n  $CONFIG.hotMusicAlbumList = ' + data.helper.stringify(hotMusicAlbumList) + ';\n  $CONFIG.hotPhotoAlbumList = ' + data.helper.stringify(hotPhotoAlbumList) + ';\n  $CONFIG.hotCircleList = ' + data.helper.stringify(hotCircleList) + ';\n  $CONFIG.hotPostList = ' + data.helper.stringify(hotPostList) + ';\n  $CONFIG.hotPlayList = ' + data.helper.stringify(hotPlayList) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/mcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/mfind.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Find = __webpack_require__(28);

var _Find2 = _interopRequireDefault(_Find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _Banner = __webpack_require__(29);

var _Banner2 = _interopRequireDefault(_Banner);

var _HotWork = __webpack_require__(9);

var _HotWork2 = _interopRequireDefault(_HotWork);

var _HotPhotoAlbum = __webpack_require__(30);

var _HotPhotoAlbum2 = _interopRequireDefault(_HotPhotoAlbum);

var _HotAuthor = __webpack_require__(10);

var _HotAuthor2 = _interopRequireDefault(_HotAuthor);

var _HotMusicAlbum = __webpack_require__(11);

var _HotMusicAlbum2 = _interopRequireDefault(_HotMusicAlbum);

var _HotCircle = __webpack_require__(31);

var _HotCircle2 = _interopRequireDefault(_HotCircle);

var _HotPost = __webpack_require__(12);

var _HotPost2 = _interopRequireDefault(_HotPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Find = function (_migi$Component) {
  _inherits(Find, _migi$Component);

  function Find() {
    var _ref;

    _classCallCheck(this, Find);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Find.__proto__ || Object.getPrototypeOf(Find)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {});
    return _this;
  }

  _createClass(Find, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "find"]], [migi.createCp(_Banner2.default, []), migi.createCp(_HotCircle2.default, [["ref", "HotCircle"], ["title", "推荐圈子"], ["dataList", this.props.hotCircleList]]), migi.createCp(_HotWork2.default, [["ref", "hotWork"], ["title", "热门作品"], ["dataList", this.props.hotWorkList]]), migi.createCp(_HotMusicAlbum2.default, [["ref", "hotMusicAlbum"], ["title", "热门专辑"], ["dataList", this.props.hotMusicAlbumList]]), migi.createCp(_HotAuthor2.default, [["ref", "hotAuthor"], ["title", "入驻作者"], ["dataList", this.props.hotAuthorList]]),, /*<HotPhotoAlbum ref="hotPhotoAlbum" title="推荐相册" dataList={ this.props.hotPhotoAlbumList}/>*/
      migi.createVd("div", [["class", "post"]], [migi.createVd("h4", [], ["转圈"]), migi.createCp(_HotPost2.default, [["ref", "hotPost"], ["take", 20], ["url", '/api/find/hotPostList'], ["datas", { Size: this.props.hotPostList.length, data: this.props.hotPostList }]])])]);
    }
  }]);

  return Find;
}(migi.Component);

migi.name(Find, "Find");exports.default = Find;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var interval = void 0;

var Banner = function (_migi$Component) {
  _inherits(Banner, _migi$Component);

  function Banner() {
    var _ref;

    _classCallCheck(this, Banner);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Banner.__proto__ || Object.getPrototypeOf(Banner)).call.apply(_ref, [this].concat(data)));

    _this.on(migi.Event.DOM, function () {
      this.addInterval();
    });
    return _this;
  }

  _createClass(Banner, [{
    key: "clickTag",
    value: function clickTag(e, vd, tvd) {
      this.index = tvd.props.rel;
      this.setOffset(Math.floor(this.index * $(window).width()));
      this.addInterval();
    }
  }, {
    key: "setOffset",
    value: function setOffset(x) {
      var $list = $(this.ref.list.element);
      $list.css('-moz-transform', 'translateX(-' + x + 'px)');
      $list.css('-webkit-transform', 'translateX(-' + x + 'px)');
      $list.css('transform', 'translateX(-' + x + 'px)');
    }
  }, {
    key: "addInterval",
    value: function addInterval() {
      if (interval) {
        clearInterval(interval);
      }
      var self = this;
      interval = setInterval(function () {
        self.index++;
        if (self.index >= 4) {
          self.index = 0;
        }
        self.setOffset(self.index * $(window).width());
      }, 5000);
    }
  }, {
    key: "left",
    value: function left() {
      this.index++;
      if (this.index > 3) {
        this.index = 3;
      }
      this.setOffset(Math.floor(this.index * $(window).width()));
      this.addInterval();
    }
  }, {
    key: "right",
    value: function right() {
      this.index--;
      if (this.index < 0) {
        this.index = 0;
      }
      this.setOffset(Math.floor(this.index * $(window).width()));
      this.addInterval();
    }
  }, {
    key: "render",
    value: function render() {
      var datas = [{
        url: '/works/2015000000001368',
        pic: '//zhuanquan.xin/pic/379af10b78315ded5948e813d2e64a69.jpg-750_'
      }, {
        url: '/works/2015000000000001',
        pic: '//zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_'
      }, {
        url: '/works/2015000000000002',
        pic: '//zhuanquan.xin/pic/b1284084f38e8cac0c35eddd60948af1.jpg-750_'
      }, {
        url: 'http://weibo.com/6284548625/FrrsUbDyo',
        pic: '//zhuanquan.xin/pic/7dc30aca98d4975fd6c3a5b23d1abf8d.jpg-750_'
      }];
      return migi.createVd("div", [["class", "banner"], ["onSwipeLeft", new migi.Cb(this, this.left)], ["onSwipeRight", new migi.Cb(this, this.right)]], [migi.createVd("ul", [["class", "list fn-clear"], ["ref", "list"]], [datas.map(function (item) {
        return migi.createVd("li", [], [migi.createVd("a", [["href", item.url], ["target", "_blank"]], [migi.createVd("img", [["src", item.pic]])])]);
      })]), migi.createVd("ul", [["class", "tags"], ["ref", "tags"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickTag)]]]], [new migi.Obj("index", this, function () {
        return (this.index, datas).map(function (item, index) {
          return migi.createVd("li", [["class", index === this.index ? 'cur' : ''], ["rel", index]], [index + 1]);
        }.bind(this));
      })])]);
    }
  }, {
    key: "index",
    set: function set(v) {
      this.__setBind("index", v);this.__data("index");
    },
    get: function get() {
      if (this.__initBind("index")) this.__setBind("index", 0);return this.__getBind("index");
    }
  }]);

  return Banner;
}(migi.Component);

migi.name(Banner, "Banner");exports.default = Banner;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotPhotoAlbum = function (_migi$Component) {
  _inherits(HotPhotoAlbum, _migi$Component);

  function HotPhotoAlbum() {
    var _ref;

    _classCallCheck(this, HotPhotoAlbum);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotPhotoAlbum.__proto__ || Object.getPrototypeOf(HotPhotoAlbum)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function () {
      self.autoWidth();
    });
    return _this;
  }

  _createClass(HotPhotoAlbum, [{
    key: 'autoWidth',
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.width('css', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotphotoalbum"]], [migi.createVd("h4", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("b", [["class", "bg"]]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img200_200_80(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotPhotoAlbum;
}(migi.Component);

migi.name(HotPhotoAlbum, "HotPhotoAlbum");exports.default = HotPhotoAlbum;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotPost = function (_migi$Component) {
  _inherits(HotPost, _migi$Component);

  function HotPost() {
    var _ref;

    _classCallCheck(this, HotPost);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotPost.__proto__ || Object.getPrototypeOf(HotPost)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    self.on(migi.Event.DOM, function () {
      self.autoWidth();
    });
    return _this;
  }

  _createClass(HotPost, [{
    key: 'autoWidth',
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.css('width', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotpost"]], [migi.createVd("h4", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/circle/' + item.TagID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img288_288_80(item.TagCover)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", '/circle/' + item.TagID], ["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.TagName]), migi.createVd("span", [["class", "fans"]], [item.FansNumber || 0]), migi.createVd("span", [["class", "comment"]], [item.Popular || 0])])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: 'dataList',
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotPost;
}(migi.Component);

migi.name(HotPost, "HotPost");exports.default = HotPost;

/***/ })
/******/ ])));