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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
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

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var userInfo = data.userInfo;
  var follows = data.follows;
  var favors = data.favors;
  var myPost = data.myPost;
  var now = Date.now();
  var lastUpdateNickNameTime = data.lastUpdateNickNameTime;
  if (lastUpdateNickNameTime) {
    lastUpdateNickNameTime = new Date(lastUpdateNickNameTime);
  } else {
    lastUpdateNickNameTime = 0;
  }
  var updateNickNameTimeDiff = now - lastUpdateNickNameTime;
  var lastUpdateHeadTime = data.lastUpdateHeadTime;
  if (lastUpdateHeadTime) {
    lastUpdateHeadTime = new Date(lastUpdateHeadTime);
  } else {
    lastUpdateHeadTime = 0;
  }
  var updateHeadTimeDiff = now - lastUpdateHeadTime;

  var my = migi.preRender(migi.createCp(_My2.default, [["userInfo", userInfo], ["follows", follows], ["favors", favors], ["myPost", myPost], ["updateNickNameTimeDiff", updateNickNameTimeDiff], ["updateHeadTimeDiff", updateHeadTimeDiff]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getMHead({ title: '我的' }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mmy.css') + '"/>\n</head>\n<body>\n<div id="page">' + my + '</div>\n' + data.helper.getMTopNav() + '\n' + data.helper.getMBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.userInfo = ' + data.helper.stringify(userInfo) + ';\n  $CONFIG.follows = ' + data.helper.stringify(data.follows) + ';\n  $CONFIG.favors = ' + data.helper.stringify(favors) + ';\n  $CONFIG.myPost = ' + data.helper.stringify(myPost) + ';\n  $CONFIG.updateNickNameTimeDiff = ' + data.helper.stringify(updateNickNameTimeDiff) + ';\n  $CONFIG.updateHeadTimeDiff = ' + data.helper.stringify(updateHeadTimeDiff) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/mcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/mmy.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _My = __webpack_require__(54);

var _My2 = _interopRequireDefault(_My);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 54:
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

var _Profile = __webpack_require__(55);

var _Profile2 = _interopRequireDefault(_Profile);

var _Follow = __webpack_require__(56);

var _Follow2 = _interopRequireDefault(_Follow);

var _HotPost = __webpack_require__(7);

var _HotPost2 = _interopRequireDefault(_HotPost);

var _Page = __webpack_require__(3);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loading = void 0;
var take = 10;
var skip = take;

var My = function (_migi$Component) {
  _inherits(My, _migi$Component);

  function My() {
    var _ref;

    _classCallCheck(this, My);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = My.__proto__ || Object.getPrototypeOf(My)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      var page2 = self.ref.page2;
      page.on('page', function (i) {
        page2.index = i;
        self.load(i);
      });
      page2.on('page', function (i) {
        page.index = i;
        self.load(i);
      });
    });
    return _this;
  }

  _createClass(My, [{
    key: 'clickOut',
    value: function clickOut(e) {
      e.preventDefault();
      _net2.default.postJSON('/api/login/loginOut', function (res) {
        location.href = '/login';
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'load',
    value: function load(i) {
      var self = this;
      if (loading) {
        return;
      }
      loading = true;
      skip = (i - 1) * take;
      _net2.default.postJSON('/api/user/myPost', { skip: skip, take: take }, function (res) {
        if (res.success) {
          self.ref.hotPost.setData(res.data.data);
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
      return migi.createVd("div", [["class", "my"]], [migi.createCp(_Profile2.default, [["userInfo", this.props.userInfo], ["updateNickNameTimeDiff", this.props.updateNickNameTimeDiff], ["updateHeadTimeDiff", this.props.updateHeadTimeDiff]]), migi.createVd("div", [["class", "warn"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", "//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], ["圈儿"]), migi.createVd("small", [["class", "time"]], ["刚刚"])])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], ["未来在这里还会解锁各种信息哒！然而需要实现的功能太多，程序员小哥哥们需要一点一点搭建转圈的世界哦！\n\
请耐心等待，我们会努力做得更好=3="]), migi.createVd("b", [["class", "arrow"]])])]), migi.createCp(_Follow2.default, [["ref", "follow"], ["list", this.props.follows]]), migi.createVd("h4", [], ["我画的圈"]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.myPost.Size / take)]]), migi.createCp(_HotPost2.default, [["ref", "hotPost"], ["data", this.props.myPost.data]]), migi.createCp(_Page2.default, [["ref", "page2"], ["total", Math.ceil(this.props.myPost.Size / take)]]), migi.createVd("a", [["href", "#"], ["class", "loginout"], ["onClick", new migi.Cb(this, this.clickOut)]], ["退出登录"])]);
    }
  }]);

  return My;
}(migi.Component);

migi.name(My, "My");exports.default = My;

/***/ }),

/***/ 55:
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

var Profile = function (_migi$Component) {
  _inherits(Profile, _migi$Component);

  function Profile() {
    var _ref;

    _classCallCheck(this, Profile);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Profile.__proto__ || Object.getPrototypeOf(Profile)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.head = self.props.userInfo.Head_Url;
    self.sname = self.props.userInfo.NickName;
    self.updateNickNameTimeDiff = self.props.updateNickNameTimeDiff || 0;
    self.updateHeadTimeDiff = self.props.updateHeadTimeDiff || 0;
    return _this;
  }

  _createClass(Profile, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      if (self.updateNickNameTimeDiff < 24 * 60 * 60 * 1000) {
        alert('昵称一天只能修改一次哦~');
        return;
      }
      $(self.ref.sname.element).addClass('fn-hide');
      $(self.ref.edit.element).addClass('fn-hide');
      $(self.ref.input.element).removeClass('fn-hide').focus().val(self.sname);
      $(self.ref.ok.element).removeClass('fn-hide');
    }
  }, {
    key: 'clickOk',
    value: function clickOk() {
      var self = this;
      $(self.ref.sname.element).removeClass('fn-hide');
      $(self.ref.input.element).addClass('fn-hide');
      $(self.ref.ok.element).addClass('fn-hide');
      var $edit = $(self.ref.edit.element);
      var newName = $(self.ref.input.element).val().trim();
      var length = newName.length;
      if (length < 4 || length > 8) {
        alert('昵称长度需要在4~8个字之间哦~');
        $edit.removeClass('fn-hide');
        return;
      }
      if (newName !== self.sname) {
        _net2.default.postJSON('/api/user/updateNickName', { nickName: newName }, function (res) {
          if (res.success) {
            self.sname = newName;
            self.updateNickNameTimeDiff = 0;
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $edit.removeClass('fn-hide');
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $edit.removeClass('fn-hide');
        });
      } else {
        $edit.removeClass('fn-hide');
      }
    }
  }, {
    key: 'clickHead',
    value: function clickHead(e) {
      var self = this;
      if (self.updateHeadTimeDiff < 24 * 60 * 60 * 1000) {
        e.preventDefault();
        alert('头像一天只能修改一次哦~');
      }
    }
  }, {
    key: 'change',
    value: function change(e) {
      var self = this;
      if (self.updateHeadTimeDiff < 24 * 60 * 60 * 1000) {
        e.preventDefault();
        alert('头像一天只能修改一次哦~');
        return;
      }
      if (window.FileReader) {
        var file = e.target.files[0];
        var size = file.size;
        if (size && size !== 0 && size <= 1024 * 500) {
          var $upload = $(self.ref.upload.element);
          $upload.addClass('fn-hide');
          var fileReader = new FileReader();
          fileReader.onload = function () {
            _net2.default.postJSON('/api/user/uploadHead', { img: fileReader.result }, function (res) {
              if (res.success) {
                self.head = res.url;
              } else {
                alert(res.message || _util2.default.ERROR_MESSAGE);
              }
              $upload.removeClass('fn-hide');
            }, function (res) {
              alert(res.message || _util2.default.ERROR_MESSAGE);
              $upload.removeClass('fn-hide');
            });
          };
          fileReader.readAsDataURL(file);
        } else {
          alert('图片体积太大啦，不能超过500k！');
        }
      } else {
        alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器。');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("h4", [], ["我的资料"]), migi.createVd("div", [["class", "pic"], ["onClick", new migi.Cb(this, this.clickPic)]], [migi.createVd("img", [["src", new migi.Obj("head", this, function () {
        return _util2.default.autoSsl(_util2.default.img200_200_80(this.head)) || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png';
      })]]), migi.createVd("div", [["class", "upload"], ["ref", "upload"]], [migi.createVd("input", [["ref", "file"], ["type", "file"], ["onChange", new migi.Cb(this, this.change)], ["onClick", new migi.Cb(this, this.clickHead)], ["accept", "image/gif, image/jpeg, image/png"]])])]), migi.createVd("div", [["class", "txt"]], [migi.createVd("strong", [["ref", "sname"]], [new migi.Obj("sname", this, function () {
        return this.sname;
      })]), migi.createVd("input", [["ref", "input"], ["type", "text"], ["class", "fn-hide"], ["value", ""], ["maxlength", "8"]]), migi.createVd("b", [["class", "edit"], ["ref", "edit"], ["onClick", new migi.Cb(this, this.click)]]), migi.createVd("button", [["class", "fn-hide"], ["ref", "ok"], ["onClick", new migi.Cb(this, this.clickOk)]], ["确定"])])]);
    }
  }, {
    key: 'head',
    set: function set(v) {
      this.__setBind("head", v);this.__data("head");
    },
    get: function get() {
      return this.__getBind("head");
    }
  }, {
    key: 'sname',
    set: function set(v) {
      this.__setBind("sname", v);this.__data("sname");
    },
    get: function get() {
      return this.__getBind("sname");
    }
  }, {
    key: 'updateNickNameTimeDiff',
    set: function set(v) {
      this.__setBind("updateNickNameTimeDiff", v);this.__data("updateNickNameTimeDiff");
    },
    get: function get() {
      return this.__getBind("updateNickNameTimeDiff");
    }
  }, {
    key: 'updateHeadTimeDiff',
    set: function set(v) {
      this.__setBind("updateHeadTimeDiff", v);this.__data("updateHeadTimeDiff");
    },
    get: function get() {
      return this.__getBind("updateHeadTimeDiff");
    }
  }]);

  return Profile;
}(migi.Component);

migi.name(Profile, "Profile");exports.default = Profile;

/***/ }),

/***/ 56:
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

var Follow = function (_migi$Component) {
  _inherits(Follow, _migi$Component);

  function Follow() {
    var _ref;

    _classCallCheck(this, Follow);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Follow.__proto__ || Object.getPrototypeOf(Follow)).call.apply(_ref, [this].concat(data)));

    _this.list = _this.props.list;
    _this.on(migi.Event.DOM, function () {
      this.autoWidth();
    });
    return _this;
  }

  _createClass(Follow, [{
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
      return migi.createVd("div", [["class", "cp-hotauthor follow"]], [migi.createVd("h4", [], ["我的关注"]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img120_120_80(item.Head_url)) || '//zhuanquan.xin/head/0d90e4f2e6f7ef48992df6b49f54cf40.png']])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.AuthorName])]), migi.createVd("div", [["class", "info"]], [item.FansNumber, "粉丝"])]);
        });
      })])])])]);
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      return this.__getBind("list");
    }
  }]);

  return Follow;
}(migi.Component);

migi.name(Follow, "Follow");exports.default = Follow;

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
          return migi.createVd("li", [], [item.TagName, "圈"]);
        })])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + id], ["class", "t"]], [item.Title]) : '', migi.createVd("p", [["class", "con"], ["dangerouslySetInnerHTML", html]]), item.Image_Post && imgLen ? migi.createVd("ul", [["class", 'imgs fn-clear' + (item.Image_Post.length > 4 ? '' : ' n' + item.Image_Post.length)]], [item.Image_Post.length > 4 ? item.Image_Post.slice(0, 4).map(function (item, i) {
          if (i === 3) {
            return migi.createVd("li", [["class", "all"], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']], [migi.createVd("a", [["href", '/post/' + id]], ["查看全部"])]);
          }
          return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img480_480_80(item.FileUrl)) + ')']]);
        }) : item.Image_Post.map(function (item) {
          return migi.createVd("li", [["style", 'background-image:url(' + _util2.default.autoSsl(imgLen === 1 ? _util2.default.img980_980_80(item.FileUrl) : _util2.default.img480_480_80(item.FileUrl)) + ')']]);
        })]) : '', migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", id]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", id]], [item.CommentCount]), item.IsOwn ? migi.createVd("li", [["class", "del"], ["rel", id]]) : '']), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.SendUserNickName]), migi.createVd("a", [["class", "time"], ["href", '/post/' + id]], [_util2.default.formatDate(item.Createtime)])]), migi.createVd("ul", [["class", "circle"]], [(item.Taglist || []).map(function (item) {
        return migi.createVd("li", [], [item.TagName, "圈"]);
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