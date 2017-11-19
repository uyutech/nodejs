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
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var isLogin = !!data.ctx.session.uid;
  var circleID = data.circleID;
  var circleDetail = data.circleDetail;
  var postList = data.postList;

  var circle = migi.preRender(migi.createCp(_Circle2.default, [["circleDetail", circleDetail], ["postList", postList]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead({
    title: circleDetail.TagName
  }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcircle.css') + '"/>\n</head>\n<body>\n<div id="page">' + circle + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.circleID = ' + data.helper.stringify(circleID) + ';\n  $CONFIG.circleDetail = ' + data.helper.stringify(circleDetail) + ';\n  $CONFIG.postList = ' + data.helper.stringify(postList) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dcircle.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Circle = __webpack_require__(116);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 116:
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

var _Title = __webpack_require__(117);

var _Title2 = _interopRequireDefault(_Title);

var _SubPost = __webpack_require__(118);

var _SubPost2 = _interopRequireDefault(_SubPost);

var _Page = __webpack_require__(3);

var _Page2 = _interopRequireDefault(_Page);

var _HotPost = __webpack_require__(7);

var _HotPost2 = _interopRequireDefault(_HotPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var skip = 0;
var take = 20;
var loading = void 0;

var Circle = function (_migi$Component) {
  _inherits(Circle, _migi$Component);

  function Circle() {
    var _ref;

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (_ref = Circle.__proto__ || Object.getPrototypeOf(Circle)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      var page2 = self.ref.page2;
      page.on('page', function (i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      page2.on('page', function (i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
      });
      self.ref.subPost.on('add_post', function (data) {
        self.ref.hotPost.addData(data);
      });
    });
    return _this;
  }

  _createClass(Circle, [{
    key: 'loadPage',
    value: function loadPage() {
      if (loading) {
        return;
      }
      loading = true;
      var self = this;
      _net2.default.postJSON('/api/circle/list', { circleID: $CONFIG.circleID, skip: skip, take: take }, function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.hotPost.setData(data.data);
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
        loading = false;
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
        loading = false;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "circle fn-clear"]], [migi.createCp(_Title2.default, [["circleDetail", this.props.circleDetail]]), migi.createVd("div", [["class", "main"]], [migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.postList.Size / take)]]), migi.createCp(_HotPost2.default, [["ref", "hotPost"], ["data", this.props.postList.data]]), migi.createCp(_Page2.default, [["ref", "page2"], ["total", Math.ceil(this.props.postList.Size / take)]])]), migi.createCp(_SubPost2.default, [["ref", "subPost"], ["placeholder", '在' + this.props.circleDetail.TagName + '圈画个圈吧'], ["circleID", this.props.circleDetail.TagID], ["originTo", this.props.circleDetail.TagName + '圈']])]);
    }
  }]);

  return Circle;
}(migi.Component);

migi.name(Circle, "Circle");exports.default = Circle;

/***/ }),

/***/ 117:
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

var Title = function (_migi$Component) {
  _inherits(Title, _migi$Component);

  function Title() {
    var _ref;

    _classCallCheck(this, Title);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Title.__proto__ || Object.getPrototypeOf(Title)).call.apply(_ref, [this].concat(data)));

    _this.joined = !!_this.props.circleDetail.ISLike;
    _this.count = _this.props.circleDetail.FansNumber;
    return _this;
  }

  _createClass(Title, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      _net2.default.postJSON('/api/circle/join', { circleID: this.props.circleDetail.TagID, state: self.joined }, function (res) {
        if (res.success) {
          self.joined = !!res.data.ISLike;
          self.count = res.data.UserCount;
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "title fn-clear"]], [migi.createVd("div", [["class", "bg"]]), migi.createVd("div", [["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img288_288_80(this.props.circleDetail.TagCover || '//zhuanquan.xin/img/c370ff3fa46f4273d0f73147459a43d8.png'))]])]), migi.createVd("div", [["class", "txt"]], [migi.createVd("h1", [], [this.props.circleDetail.TagName]), migi.createVd("div", [["class", "rel"]], [migi.createVd("span", [["class", "count"]], [new migi.Obj("count", this, function () {
        return this.count || 0;
      })]), migi.createVd("a", [["href", "#"], ["class", new migi.Obj("joined", this, function () {
        return 'join' + (this.joined ? ' joined' : '');
      })], ["onClick", new migi.Cb(this, this.click)]], [new migi.Obj("joined", this, function () {
        return this.joined ? '已经加入' : '加入圈子';
      })])]), migi.createVd("pre", [["class", "intro"]], [this.props.circleDetail.Describe])])]);
    }
  }, {
    key: 'joined',
    set: function set(v) {
      this.__setBind("joined", v);this.__data("joined");
    },
    get: function get() {
      return this.__getBind("joined");
    }
  }, {
    key: 'count',
    set: function set(v) {
      this.__setBind("count", v);this.__data("count");
    },
    get: function get() {
      return this.__getBind("count");
    }
  }, {
    key: 'loading',
    set: function set(v) {
      this.__setBind("loading", v);this.__data("loading");
    },
    get: function get() {
      return this.__getBind("loading");
    }
  }]);

  return Title;
}(migi.Component);

migi.name(Title, "Title");exports.default = Title;

/***/ }),

/***/ 118:
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

var STATE = {
  LOADING: 0,
  SENDING: 1,
  LOADED: 2,
  ERROR: 3
};
var TEXT = {
  0: '读取中...',
  1: '上传中...',
  2: '',
  3: '加载失败'
};
var MAX_IMG_NUM = 10;
var MAX_TEXT_LENGTH = 512;

var SubPost = function (_migi$Component) {
  _inherits(SubPost, _migi$Component);

  function SubPost() {
    var _ref;

    _classCallCheck(this, SubPost);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = SubPost.__proto__ || Object.getPrototypeOf(SubPost)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.value = self.props.value || '';
    self.invalid = self.value.trim().length < 3;
    self.maxlength = self.props.maxlength;
    self.subText = self.props.subText;
    self.tipText = self.props.tipText;
    self.placeholder = self.props.placeholder;
    self.originTo = self.props.originTo;
    self.on(migi.Event.DOM, function () {
      if ($CONFIG.isLogin) {
        var key = self.getImgKey();
        var cache = localStorage[key];
        if (cache) {
          cache = JSON.parse(cache);
          var temp = [];
          cache.forEach(function (item) {
            temp.push({
              state: STATE.LOADED,
              url: item
            });
          });
          self.list = temp;
          self.imgNum = temp.length;
        }
        var key2 = self.getContentKey();
        var cache2 = localStorage[key2];
        if (cache2) {
          self.value = cache2.trim();
          self.input(null, self.ref.input);
          var length = self.value.trim().length;
          self.invalid = length < 3 || length > MAX_TEXT_LENGTH;
        }
      }
      var $body = $(document.body);
      $body.on('click', function (e) {
        if (self.expand) {
          var $target = $(e.target);
          if (!$target.closest('.mod-sub')[0] && (!$target.hasClass('s1') || $target.hasClass('s2'))) {
            self.expand = false;
          }
        }
      });
    });
    return _this;
  }

  _createClass(SubPost, [{
    key: 'input',
    value: function input(e, vd) {
      var self = this;
      var $vd = $(vd.element);
      self.num = $vd.val().length;
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        self.num = $vd.val().trim().length;
        var content = $vd.val().trim();
        self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
        self.warnLength = content.length > MAX_TEXT_LENGTH;
        var key2 = self.getContentKey();
        localStorage[key2] = content;
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        this.expand = true;
      }
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var self = this;
      if (!self.sending && !self.invalid && !self.disableUpload) {
        var imgs = [];
        self.list.forEach(function (item) {
          if (item.state === STATE.LOADED) {
            imgs.push(item.url);
          }
        });
        if (self.list.length > imgs.length) {
          if (!window.confirm('尚有未上传成功的图片，继续提交吗？')) {
            return;
          }
        }
        self.sending = true;
        _net2.default.postJSON('/api/circle/add', { content: self.value, imgs: imgs, circleID: self.props.circleID }, function (res) {
          if (res.success) {
            self.value = '';
            self.invalid = true;
            self.num = 0;
            self.list = [];
            var key = self.getImgKey();
            localStorage[key] = '';
            var key2 = self.getContentKey();
            localStorage[key2] = '';
            self.expand = false;
            self.emit('add_post', res.data);
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.sending = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          self.sending = false;
        });
      }
    }
  }, {
    key: 'blur',
    value: function blur() {
      // this.expand = false;
    }
  }, {
    key: 'change',
    value: function change(e) {
      var self = this;
      if (window.FileReader) {
        var files = e.target.files;
        var res = [];
        var sizeLimit = void 0;
        var spliceLimit = void 0;
        for (var i = 0, len = files.length; i < len; i++) {
          var file = files[i];
          var size = file.size;
          if (size && size !== 0 && size <= 1024 * 1024 * 15) {
            res.push(file);
          } else {
            sizeLimit = true;
          }
        }
        if (res.length + self.imgNum > MAX_IMG_NUM) {
          res.splice(MAX_IMG_NUM - self.imgNum);
          spliceLimit = true;
        }
        if (files.length !== res.length) {
          if (sizeLimit && spliceLimit) {
            alert('图片最大不能超过3M哦，超过的将自动过滤。图片最多不能超过' + MAX_IMG_NUM + '张哦，超过的将自动忽略。');
          } else if (spliceLimit) {
            alert('图片最多不能超过' + MAX_IMG_NUM + '张哦，超过的将自动忽略。');
          } else if (sizeLimit) {
            alert('图片最大不能超过3M哦，超过的将自动过滤。');
          }
        }
        if (!res.length) {
          return;
        }
        self.disableUpload = true;
        var num = res.length;
        var count = 0;
        var hasUpload = void 0;
        res.forEach(function (file, i) {
          self.list.push({
            state: STATE.LOADING,
            url: ''
          });
          var fileReader = new FileReader();
          fileReader.onload = function () {
            self.list[i + self.imgNum].state = STATE.SENDING;
            self.list[i + self.imgNum].url = fileReader.result;
            self.list = self.list;
            _net2.default.postJSON('/api/user/uploadPic', { img: fileReader.result }, function (res) {
              if (res.success) {
                var url = res.data;
                var has = void 0;
                self.list.forEach(function (item) {
                  if (item.url === url) {
                    hasUpload = has = true;
                  }
                });
                if (!has) {
                  self.list[i + self.imgNum].state = STATE.LOADED;
                  self.list[i + self.imgNum].url = url;
                  self.addCache(url);
                } else {
                  self.list[i + self.imgNum] = null;
                }
              } else {
                self.list[i + self.imgNum].state = STATE.ERROR;
              }
              self.list = self.list;
              count++;
              if (count === num) {
                self.disableUpload = false;
                for (var j = self.list.length - 1; j >= 0; j--) {
                  if (self.list[j] === null) {
                    self.list.splice(j, 1);
                  }
                }
                self.imgNum = self.list.length;
                if (hasUpload) {
                  alert('有图片已经重复上传过啦，已自动忽略。');
                }
              }
            }, function (res) {
              self.list[i + self.imgNum].state = STATE.ERROR;
              self.list = self.list;
              count++;
              if (count === num) {
                self.disableUpload = false;
                for (var j = self.list.length - 1; j >= 0; j--) {
                  if (self.list[j] === null) {
                    self.list.splice(j, 1);
                  }
                }
                self.imgNum = self.list.length;
                if (hasUpload) {
                  alert('有图片已经重复上传过啦，已自动忽略。');
                }
              }
            }, 1000 * 60 * 10);
          };
          fileReader.readAsDataURL(file);
        });
      } else {
        alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器或者极速模式。');
      }
    }
  }, {
    key: 'getImgKey',
    value: function getImgKey() {
      return $CONFIG.uid + '_circle_img';
    }
  }, {
    key: 'getContentKey',
    value: function getContentKey() {
      return $CONFIG.uid + '_circle_content';
    }
  }, {
    key: 'addCache',
    value: function addCache(url) {
      var self = this;
      var key = self.getImgKey();
      var cache = localStorage[key];
      if (cache) {
        cache = JSON.parse(cache);
      } else {
        cache = [];
      }
      cache.push(url);
      localStorage[key] = JSON.stringify(cache);
    }
  }, {
    key: 'delCache',
    value: function delCache(url) {
      var self = this;
      var key = self.getImgKey();
      var cache = localStorage[key];
      if (cache) {
        cache = JSON.parse(cache);
        var i = cache.indexOf(url);
        if (i > -1) {
          cache.splice(i, 1);
          localStorage[key] = JSON.stringify(cache);
        }
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      var self = this;
      var key = self.getImgKey();
      localStorage[key] = '';
    }
  }, {
    key: 'clickImg',
    value: function clickImg(e, vd, tvd) {
      var i = tvd.props.idx;
      if (this.list[i].state === STATE.LOADED || this.list[i].state === STATE.ERROR) {
        this.delCache(tvd.props.rel);
        this.list.splice(i, 1);
        this.imgNum = this.list.length;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", new migi.Obj("expand", this, function () {
        return 'mod-sub' + (this.expand ? ' expand' : '');
      })]], [migi.createVd("div", [["class", "c"]], [migi.createVd("form", [["class", new migi.Obj(["to", "originTo"], this, function () {
        return 'fn-clear' + (this.to || this.originTo ? ' to' : '');
      })], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("div", [["class", "wrap"]], [migi.createVd("label", [], [new migi.Obj(["to", "originTo"], this, function () {
        return this.to || this.originTo;
      })]), migi.createVd("textarea", [["class", new migi.Obj("sending", this, function () {
        return 'text' + (this.sending ? ' dis' : '');
      })], ["ref", "input"], ["disabled", new migi.Obj("sending", this, function () {
        return !!this.sending;
      })], ["placeholder", new migi.Obj(["to", "placeholder"], this, function () {
        return this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个圈子吧';
      })], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)], ["onBlur", new migi.Cb(this, this.blur)]], [new migi.Obj("value", this, function () {
        return this.value;
      })]), migi.createVd("span", [["class", new migi.Obj("warnLength", this, function () {
        return 'limit' + (this.warnLength ? ' warn' : '');
      })]], [migi.createVd("strong", [], [new migi.Obj("num", this, function () {
        return this.num;
      })]), " / ", MAX_TEXT_LENGTH]), migi.createVd("div", [["class", new migi.Obj("disableUpload", this, function () {
        return 'upload' + (this.disableUpload ? ' dis' : '');
      })]], ["\n\
              添加图片\n\
              ", migi.createVd("input", [["type", "file"], ["ref", "file"], ["class", "file"], ["onChange", new migi.Cb(this, this.change)], ["disabled", new migi.Obj("disableUpload", this, function () {
        return !!this.disableUpload;
      })], ["multiple", "multiple"], ["accept", "image/gif, image/jpeg, image/png"]])]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj(["sending", "invalid", "disableUpload"], this, function () {
        return 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '');
      })], ["value", new migi.Obj(["value", "tipText", "subText"], this, function () {
        return this.value.trim().length ? this.value.trim().length < 3 ? this.tipText ? this.tipText.replace('${n}', 3 - this.value.trim().length) : '还少' + (3 - this.value.trim().length) + '个字哦' : this.subText || '发送' : this.subText || '发送';
      })]])]), migi.createVd("ul", [["class", "list fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickImg)]]]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item, i) {
          return migi.createVd("li", [["class", 's' + item.state], ["idx", i], ["rel", item.url], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img120_120_80(item.url)) + ')']], [migi.createVd("span", [], [TEXT[item.state]])]);
        });
      })])])])]);
    }
  }, {
    key: 'placeholder',
    set: function set(v) {
      this.__setBind("placeholder", v);this.__data("placeholder");
    },
    get: function get() {
      return this.__getBind("placeholder");
    }
  }, {
    key: 'subText',
    set: function set(v) {
      this.__setBind("subText", v);this.__data("subText");
    },
    get: function get() {
      return this.__getBind("subText");
    }
  }, {
    key: 'tipText',
    set: function set(v) {
      this.__setBind("tipText", v);this.__data("tipText");
    },
    get: function get() {
      return this.__getBind("tipText");
    }
  }, {
    key: 'value',
    set: function set(v) {
      this.__setBind("value", v);this.__data("value");
    },
    get: function get() {
      if (this.__initBind("value")) this.__setBind("value", '');return this.__getBind("value");
    }
  }, {
    key: 'to',
    set: function set(v) {
      this.__setBind("to", v);this.__data("to");
    },
    get: function get() {
      return this.__getBind("to");
    }
  }, {
    key: 'originTo',
    set: function set(v) {
      this.__setBind("originTo", v);this.__data("originTo");
    },
    get: function get() {
      return this.__getBind("originTo");
    }
  }, {
    key: 'invalid',
    set: function set(v) {
      this.__setBind("invalid", v);this.__data("invalid");
    },
    get: function get() {
      if (this.__initBind("invalid")) this.__setBind("invalid", true);return this.__getBind("invalid");
    }
  }, {
    key: 'expand',
    set: function set(v) {
      this.__setBind("expand", v);this.__data("expand");
    },
    get: function get() {
      return this.__getBind("expand");
    }
  }, {
    key: 'num',
    set: function set(v) {
      this.__setBind("num", v);this.__data("num");
    },
    get: function get() {
      if (this.__initBind("num")) this.__setBind("num", 0);return this.__getBind("num");
    }
  }, {
    key: 'disableUpload',
    set: function set(v) {
      this.__setBind("disableUpload", v);this.__data("disableUpload");
    },
    get: function get() {
      return this.__getBind("disableUpload");
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      if (this.__initBind("list")) this.__setBind("list", []);return this.__getBind("list");
    }
  }, {
    key: 'imgNum',
    set: function set(v) {
      this.__setBind("imgNum", v);this.__data("imgNum");
    },
    get: function get() {
      if (this.__initBind("imgNum")) this.__setBind("imgNum", 0);return this.__getBind("imgNum");
    }
  }, {
    key: 'warnLength',
    set: function set(v) {
      this.__setBind("warnLength", v);this.__data("warnLength");
    },
    get: function get() {
      return this.__getBind("warnLength");
    }
  }, {
    key: 'sending',
    set: function set(v) {
      this.__setBind("sending", v);this.__data("sending");
    },
    get: function get() {
      return this.__getBind("sending");
    }
  }]);

  return SubPost;
}(migi.Component);

migi.name(SubPost, "SubPost");exports.default = SubPost;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_migi$Component) {
  _inherits(Page, _migi$Component);

  function Page() {
    var _ref;

    _classCallCheck(this, Page);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Page.__proto__ || Object.getPrototypeOf(Page)).call.apply(_ref, [this].concat(data)));

    _this._index = _this.props.index;
    _this._total = _this.props.total;
    _this.update();
    return _this;
  }

  _createClass(Page, [{
    key: "update",
    value: function update() {
      var list = [];
      list.push(migi.createVd("li", [], [this.index == 1 ? migi.createVd("span", [], ["1"]) : migi.createVd("a", [["href", "#"]], ["1"])]));
      if (this.total > 1) {
        if (this.index > 4) {
          list.push(migi.createVd("li", [], ["..."]));
        }
        for (var i = Math.max(2, this.index - 2); i < this.index; i++) {
          list.push(migi.createVd("li", [], [this.index == i ? migi.createVd("span", [], [i]) : migi.createVd("a", [["href", "#"]], [i])]));
        }
        if (this.index > 1) {
          list.push(migi.createVd("li", [], [migi.createVd("span", [], [this.index])]));
        }
        for (var i = this.index + 1; i < Math.min(this.total, this.index + 3); i++) {
          list.push(migi.createVd("li", [], [this.index == i ? migi.createVd("span", [], [i]) : migi.createVd("a", [["href", "#"]], [i])]));
        }
        if (this.index < this.total - 3) {
          list.push(migi.createVd("li", [], ["..."]));
        }
        if (this.index < this.total) {
          list.push(migi.createVd("li", [], [migi.createVd("a", [["href", "#"]], [this.total])]));
        }
      }
      this.list = list;
    }
  }, {
    key: "submit",
    value: function submit(e) {
      e.preventDefault();
      var index = parseInt(this.num) || 1;
      if (index < 1) {
        index = 1;
      } else if (index > this.total) {
        index = this.total;
      }
      this.num = index;
      if (index && index != this.index) {
        this.index = index;
        this.emit('page', this.index);
      }
    }
  }, {
    key: "click",
    value: function click(e) {
      e.preventDefault();
      var index = e.target.innerHTML;
      if (index && index != this.index) {
        this.index = parseInt(index);
        this.emit('page', this.index);
      }
    }
  }, {
    key: "prev",
    value: function prev(e) {
      e.preventDefault();
      if (this.index > 1) {
        this.index--;
        this.emit('page', this.index);
      }
    }
  }, {
    key: "next",
    value: function next(e) {
      e.preventDefault();
      if (this.index < this.total) {
        this.index++;
        this.emit('page', this.index);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("form", [["class", "cp-page"], ["onSubmit", new migi.Cb(this, this.submit)], ["onSwipeLeft", new migi.Cb(this, this.prev)], ["onSwipeRight", new migi.Cb(this, this.next)]], [migi.createVd("a", [["href", "#"], ["class", new migi.Obj("index", this, function () {
        return this.index == 1 ? 'prev dis' : 'prev';
      })], ["onClick", new migi.Cb(this, this.prev)]], [migi.createVd("b", [], []), "上一页"]), migi.createVd("ol", [["onClick", [[{ "a": { "_v": true } }, new migi.Cb(this, this.click)]]]], [new migi.Obj("list", this, function () {
        return this.list;
      })]), migi.createVd("a", [["href", "#"], ["class", new migi.Obj(["index", "total"], this, function () {
        return this.index == this.total ? 'next dis' : 'next';
      })], ["onClick", new migi.Cb(this, this.next)]], ["下一页", migi.createVd("b", [], [])]), migi.createVd("span", [], [new migi.Obj("index", this, function () {
        return this.index;
      }), "/", new migi.Obj("total", this, function () {
        return this.total;
      }), " 页"]), migi.createVd("input", [["type", "number"], ["class", "num"], ["name", "page"], ["value", new migi.Obj("num", this, function () {
        return this.num;
      })], ["min", "1"], ["max", new migi.Obj("total", this, function () {
        return this.total;
      })]]), migi.createVd("input", [["type", "submit"], ["class", "sub"], ["value", "跳转"]])]);
    }
  }, {
    key: "index",
    get: function get() {
      return this._index || 1;
    },
    set: function set(v) {
      this._index = v;
      this.update();
      ;this.__array("index", v);this.__data("index");
    }
  }, {
    key: "total",
    get: function get() {
      return this._total || 1;
    },
    set: function set(v) {
      this._total = v;
      this.index = 1;
      ;this.__array("total", v);this.__data("total");
    }
  }, {
    key: "list",
    get: function get() {
      return this._list || [];
    },
    set: function set(v) {
      this._list = v;
      ;this.__array("list", v);this.__data("list");
    }
  }, {
    key: "num",
    get: function get() {
      return this._num;
    },
    set: function set(v) {
      this._num = v;
      ;this.__array("num", v);this.__data("num");
    }
  }]);

  return Page;
}(migi.Component);

migi.name(Page, "Page");exports.default = Page;

/***/ }),

/***/ 7:
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
    if (self.props.data && self.props.data.length) {
      var html = '';
      self.props.data.forEach(function (item) {
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
          if (!$CONFIG.isLogin) {
            migi.eventBus.emit('NEED_LOGIN');
            return;
          }
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
        $list.on('click', '.comment', function () {
          var postID = $(this).attr('rel');
          if (parent && parent.setHash) {
            parent.setHash('/post/' + postID);
          } else {
            location.href = '/post/' + postID;
          }
        });
        $list.on('click', '.con,.imgs', function () {
          $(this).closest('li').find('.comment').click();
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
      });
    }
    return _this;
  }

  _createClass(HotPost, [{
    key: 'genItem',
    value: function genItem(item) {
      var len = item.Content.length;
      var id = item.ID;
      var maxLen = 256;
      var imgLen = item.Image_Post.length;
      var html = len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content;
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/#(\S.*?)#/g, '<strong>#$1#</strong>').replace(/(http(?:s)?:\/\/[\w-]+\.[\w]+\S*)/gi, '<a href="$1" target="_blank">$1</a>');
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "name"]], [item.SendUserNickName]), migi.createVd("a", [["class", "time"], ["href", '/post/' + id]], [_util2.default.formatDate(item.Createtime)])]), migi.createVd("ul", [["class", "circle"]], [(item.Taglist || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/circle/' + item.TagID]], [item.TagName, "圈"])]);
        })])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + id], ["class", "t"]], [item.Title]) : '', migi.createVd("p", [["class", "con"], ["dangerouslySetInnerHTML", html]]), item.Image_Post && imgLen ? migi.createVd("ul", [["class", 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : ' n' + item.Image_Post.length)]], [item.Image_Post.length > 4 ? item.Image_Post.slice(0, 4).map(function (item, i) {
          if (i === 3) {
            return migi.createVd("li", [["class", "all"], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']], [migi.createVd("a", [["href", '/post/' + id]], ["查看全部"])]);
          }
          return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']]);
        }) : item.Image_Post.map(function (item) {
          return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']]);
        })]) : '', migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", id]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", id]], [item.CommentCount]), item.IsOwn ? migi.createVd("li", [["class", "del"], ["rel", id]]) : '']), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.SendUserNickName]), migi.createVd("a", [["class", "time"], ["href", '/post/' + id]], [_util2.default.formatDate(item.Createtime)])]), migi.createVd("ul", [["class", "circle"]], [(item.Taglist || []).map(function (item) {
        return migi.createVd("li", [], [migi.createVd("a", [["href", '/circle/' + item.TagID]], [item.TagName, "圈"])]);
      })])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + id], ["class", "t"]], [item.Title]) : '', migi.createVd("p", [["class", "con"], ["dangerouslySetInnerHTML", html]]), item.Image_Post && imgLen ? migi.createVd("ul", [["class", 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : ' n' + item.Image_Post.length)]], [item.Image_Post.length > 4 ? item.Image_Post.slice(0, 4).map(function (item, i) {
        if (i === 3) {
          return migi.createVd("li", [["class", "all"], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']], [migi.createVd("a", [["href", '/post/' + id]], ["查看全部"])]);
        }
        return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']]);
      }) : item.Image_Post.map(function (item) {
        return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']]);
      })]) : '', migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", id]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", id]], [item.CommentCount]), item.IsOwn ? migi.createVd("li", [["class", "del"], ["rel", id]]) : '']), migi.createVd("b", [["class", "arrow"]])])]);
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var self = this;
      var html = '';
      data.forEach(function (item) {
        html += self.genItem(item);
      });
      $(self.ref.list.element).html(html);
    }
  }, {
    key: 'addData',
    value: function addData(data) {
      var self = this;
      var html = self.genItem(data);
      $(self.ref.list.element).prepend(html.toString());
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotpost"]], [this.props.data && this.props.data.length ? migi.createVd("ol", [["class", "list"], ["ref", "list"], ["dangerouslySetInnerHTML", this.html]]) : migi.createVd("div", [["class", "empty"]], ["暂无内容"])]);
    }
  }]);

  return HotPost;
}(migi.Component);

migi.name(HotPost, "HotPost");exports.default = HotPost;

/***/ })

/******/ })));