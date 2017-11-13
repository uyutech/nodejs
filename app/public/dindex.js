/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 155);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by army on 2017/5/20.
 */

var util = {
  goto: function goto(url) {
    location.href = url;
  },
  autoSsl: function autoSsl(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function img(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url.replace(/\.(\w+)-\d+_\d*/, '.$1') : url;
  },
  img1296_1296_80: function img1296_1296_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-1296_1296_80' : url;
  },
  img980_980_80: function img980_980_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-980_980_80' : url;
  },
  img750_750_80: function img750_750_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-750_750_80' : url;
  },
  img600_600_80: function img600_600_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600_600_80' : url;
  },
  img480_480_80: function img480_480_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-480_480_80' : url;
  },
  img288__80: function img288__80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288__80' : url;
  },
  img288_288_80: function img288_288_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288_288_80' : url;
  },
  img240_240_80: function img240_240_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img220_220_80: function img220_220_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img200_200: function img200_200(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200' : url;
  },
  img200_200_80: function img200_200_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200_80' : url;
  },
  img192_192: function img192_192(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
  },
  img150_150_80: function img150_150_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-150_150_80' : url;
  },
  img144_: function img144_(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_' : url;
  },
  img144_144: function img144_144(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144' : url;
  },
  img144_144_80: function img144_144_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144_80' : url;
  },
  img128_128_80: function img128_128_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img120_120: function img120_120(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120' : url;
  },
  img120_120_80: function img120_120_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img100_100: function img100_100(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img96_96_80: function img96_96_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img90_90: function img90_90(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img64_64_80: function img64_64_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-64_64_80' : url;
  },
  img60_60: function img60_60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60' : url;
  },
  img60_60_80: function img60_60_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60_80' : url;
  },
  img__60: function img__60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
  },
  img48_48_80: function img48_48_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-48_48_80' : url;
  },
  decode: function decode(str) {
    return str.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  },
  formatTime: function formatTime(time) {
    if (!time) {
      return '00:00';
    }
    var res = '';
    if (time >= 1000 * 60 * 60) {
      var hour = Math.floor(time / (1000 * 60 * 60));
      time -= 1000 * 60 * 60 * hour;
      res += hour + ':';
    }
    if (time >= 1000 * 60) {
      var minute = Math.floor(time / (1000 * 60));
      time -= 1000 * 60 * minute;
      if (minute < 10) {
        minute = '0' + minute;
      }
      res += minute + ':';
    } else {
      res += '00:';
    }
    var second = Math.floor(time / 1000);
    if (second < 10) {
      second = '0' + second;
    }
    res += second;
    return res;
  },
  formatDate: function formatDate(time) {
    time = new Date(time);
    var now = Date.now();
    var diff = now - time;
    if (diff >= 1000 * 60 * 60 * 24 * 365) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365)) + '年前';
    }
    if (diff >= 1000 * 60 * 60 * 24 * 30) {
      return Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }
    if (diff >= 1000 * 60 * 60 * 24) {
      return Math.floor(diff / (1000 * 60 * 60 * 24)) + '天前';
    }
    if (diff >= 1000 * 60 * 60) {
      return Math.floor(diff / (1000 * 60 * 60)) + '小时前';
    }
    if (diff >= 1000 * 60) {
      return Math.floor(diff / (1000 * 60)) + '分钟前';
    }
    return '刚刚';
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

exports.default = util;

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by army8735 on 2017/10/6.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
var net = {
  ajax: function ajax(url, data, _success, _error, type) {
    var csrfToken = $.cookie('csrfToken');
    Object.keys(data).forEach(function (k) {
      if (data[k] === undefined || data[k] === null) {
        delete data[k];
      }
    });
    if (url.indexOf('?') === -1) {
      url += '?_=' + Date.now();
    } else {
      url += '&_=' + Date.now();
    }
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        crossDomain: true,
        timeout: 6000,
        type: type || 'get',
        headers: {
          'x-csrf-token': csrfToken
        },
        // ajax 跨域设置必须加上
        beforeSend: function beforeSend(xhr) {
          xhr.withCredentials = true;
        },
        success: function success(data, state, xhr) {
          _success(data, state, xhr);
        },
        error: function error(data) {
          if (!_error.__hasExec) {
            _error.__hasExec = true;
            _error(data || {});
          }
        }
      });
    }
    return load();
  },
  getJSON: function getJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function () {};
    return net.ajax(url, data, success, error);
  },
  postJSON: function postJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    success = success || function () {};
    error = error || function () {};
    return net.ajax(url, data, success, error, 'post');
  }
};

exports.default = net;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(156);

var _TopNav = __webpack_require__(157);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _CIframe = __webpack_require__(158);

var _CIframe2 = _interopRequireDefault(_CIframe);

var _QuanNiang = __webpack_require__(159);

var _QuanNiang2 = _interopRequireDefault(_QuanNiang);

var _Welcome = __webpack_require__(160);

var _Welcome2 = _interopRequireDefault(_Welcome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topNav = migi.preExist(migi.createCp(_TopNav2.default, [["userInfo", $CONFIG.userInfo], ["authorInfo", $CONFIG.authorInfo], ["isLogin", $CONFIG.isLogin], ["isAuthor", $CONFIG.isAuthor]]));

var cIframe = void 0;
var url = void 0;

var quanNiang = migi.render(migi.createCp(_QuanNiang2.default, []), document.body);

migi.render(migi.createVd("div", [["class", "info"]]), document.body);

if ($CONFIG.isLogin && $CONFIG.userInfo.User_Reg_Stat !== 99 && $CONFIG.userInfo.User_Reg_Stat !== 100) {
  migi.render(migi.createCp(_Welcome2.default, [["userInfo", $CONFIG.userInfo], ["authorInfo", $CONFIG.authorInfo]]), document.body);
}

window.setHash = function (hash, noRedirect) {
  iframeGoto(hash, noRedirect);
  location.hash = hash;
};
window.goto = function (url) {
  location.href = url;
};
window.setWidth = function (width) {
  var diff = document.documentElement.clientWidth - width;
  if (diff > 0) {
    topNav.setMarginRight(diff);
  }
};
window.upZIndex = function () {
  $(cIframe.element).addClass('up');
};
window.downZIndex = function () {
  $(cIframe.element).removeClass('up');
};
var commentType = {};
window.comment = function (type) {
  commentType[type] = commentType[type] || [];
  var list = commentType[type];
  var now = Date.now();
  if (list.length) {
    var last = list[list.length - 1];
    if (now - last < 1000 * 60) {
      quanNiang.message = '为了方便其他小伙伴和大大们阅读，请尽量将每次想说的话在一条留言中发布哦~\n将一句留言在短时间内拆成多条发送，所获得的积分并没有作为一条完整留言发送所获得的积分多哦˵ •́ o •̀ ˵';
      quanNiang.show();
    }
  }
  list.push(now);
};

function iframeGoto(hash, noRedirect) {
  hash = hash || '';
  hash = hash.replace(/^#/, '');
  // 兼容
  if (hash.indexOf('/musicalbum/') === 0) {
    location.hash = '#/works/' + hash.slice(12);
    return;
  }
  if (!hash || hash === '/') {
    hash = '/find';
  }
  if (url === hash) {
    return;
  }
  url = hash;
  if (noRedirect) {
    return;
  }
  if (cIframe) {
    cIframe.clean();
  }
  cIframe = migi.render(migi.createCp(_CIframe2.default, []), document.body);
  cIframe.element.contentWindow.location.href = hash;
}

window.addEventListener('hashchange', function () {
  iframeGoto(location.hash);
});

iframeGoto(location.hash);

topNav.on('search', function (kw) {
  location.hash = '/search/' + kw;
});

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 157:
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

var TopNav = function (_migi$Component) {
  _inherits(TopNav, _migi$Component);

  function TopNav() {
    var _ref;

    _classCallCheck(this, TopNav);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call.apply(_ref, [this].concat(data)));

    _this.isPublic = !!_this.props.userInfo.ISOpen;
    return _this;
  }

  _createClass(TopNav, [{
    key: 'setMarginRight',
    value: function setMarginRight(right) {
      $(this.element).css('margin-right', right);
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var v = this.ref.input.element.value.trim();
      if (v) {
        this.emit('search', v);
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        location.hash = '/my';
      }
    }
  }, {
    key: 'clickPublic',
    value: function clickPublic() {
      var self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      var isPublic = self.isPublic;
      _net2.default.postJSON('/api/user/altSettle', { public: !isPublic }, function (res) {
        if (res.success) {
          self.isPublic = !isPublic;
          $CONFIG.isPublic = !isPublic;
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
      var userInfo = this.props.userInfo || {};
      return migi.createVd("div", [["class", "cp-topnav"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("a", [["class", "logo"], ["href", "#/"]], ["转圈还在测试中，感谢您的关注和包涵！我们会努力做得更好！"]),,,, /*<form class="search" onSubmit={ this.submit }>*/
      /*<input type="text" ref="input" maxlength="16" placeholder="弱弱的初级搜索功能QAQ"/>*/
      /*</form>*/
      migi.createVd("div", [["class", "user fn-clear"]], [this.props.isLogin && this.props.isAuthor ? migi.createVd("span", [["class", "public"], ["onClick", new migi.Cb(this, this.clickPublic)]], ["[", new migi.Obj("isPublic", this, function () {
        return this.isPublic ? '切换到马甲' : '切换到作者身份';
      }), "]"]) : '', migi.createVd("span", [["class", new migi.Obj("isPublic", this, function () {
        return 'name' + (this.isPublic ? ' public' : '');
      })], ["onClick", new migi.Cb(this, this.click)]], [new migi.Obj("isPublic", this, function () {
        return (this.isPublic ? userInfo.AuthorName : userInfo.NickName) || '登陆/注册';
      })]), migi.createVd("img", [["onClick", new migi.Cb(this, this.click)], ["src", userInfo.Head_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png']])])])]);
    }
  }, {
    key: 'isPublic',
    set: function set(v) {
      this.__setBind("isPublic", v);this.__data("isPublic");
    },
    get: function get() {
      return this.__getBind("isPublic");
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

  return TopNav;
}(migi.Component);

migi.name(TopNav, "TopNav");exports.default = TopNav;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CIframe = function (_migi$Component) {
  _inherits(CIframe, _migi$Component);

  function CIframe() {
    var _ref;

    _classCallCheck(this, CIframe);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = CIframe.__proto__ || Object.getPrototypeOf(CIframe)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(CIframe, [{
    key: "render",
    value: function render() {
      return migi.createVd("iframe", [["class", "cp-ciframe"], ["src", "about:blank"], ["frameBorder", "0"], ["scrolling", "auto"], ["allowfullscreen", "allowfullscreen"]]);
    }
  }]);

  return CIframe;
}(migi.Component);

migi.name(CIframe, "CIframe");exports.default = CIframe;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var timeout = void 0;

var QuanNiang = function (_migi$Component) {
  _inherits(QuanNiang, _migi$Component);

  function QuanNiang() {
    var _ref;

    _classCallCheck(this, QuanNiang);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = QuanNiang.__proto__ || Object.getPrototypeOf(QuanNiang)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(QuanNiang, [{
    key: "click",
    value: function click(e) {
      e.preventDefault();
      this.show();
    }
  }, {
    key: "clickClose",
    value: function clickClose(e) {
      e.preventDefault();
      $(this.ref.txt.element).addClass('fn-hide');
    }
  }, {
    key: "show",
    value: function show() {
      var $txt = $(this.ref.txt.element);
      $txt.removeClass('fn-hide');
      // timeout = setTimeout(function() {
      //   $txt.addClass('fn-hide');
      // }, 3000);
    }
  }, {
    key: "enter",
    value: function enter() {
      // if(timeout) {
      //   clearTimeout(timeout);
      // }
    }
  }, {
    key: "leave",
    value: function leave() {
      // if(timeout) {
      //   clearTimeout(timeout);
      // }
      // let $txt = $(this.ref.txt.element);
      // timeout = setTimeout(function() {
      //   $txt.addClass('fn-hide');
      // }, 3000);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "quaniang"]], [migi.createVd("a", [["href", "#"], ["class", "pic"], ["onClick", new migi.Cb(this, this.click)]]), migi.createVd("div", [["class", "txt fn-hide"], ["ref", "txt"], ["onMouseEnter", new migi.Cb(this, this.enter)], ["onMouseLeave", new migi.Cb(this, this.leave)]], [migi.createVd("h5", [], ["圈儿："]), migi.createVd("pre", [], [new migi.Obj("message", this, function () {
        return this.message || '感谢参与转圈内测，现在我们还只有最基础的功能，程序员小哥哥们还在加班加点进行建设。\n欢迎随处逛逛，也欢迎给我们提出宝贵建议！我们一定会做得更好=3=';
      })]), migi.createVd("p", [], ["欢迎点击右侧给我们留言！", migi.createVd("a", [["href", "http://weibo.com/u/6259241863"], ["target", "_blank"]], ["@转圈circling"])]), migi.createVd("a", [["class", "close"], ["href", "#"], ["onClick", new migi.Cb(this, this.clickClose)]], ["好的"])])]);
    }
  }, {
    key: "message",
    set: function set(v) {
      this.__setBind("message", v);this.__data("message");
    },
    get: function get() {
      return this.__getBind("message");
    }
  }]);

  return QuanNiang;
}(migi.Component);

migi.name(QuanNiang, "QuanNiang");exports.default = QuanNiang;

/***/ }),

/***/ 160:
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

var Welcome = function (_migi$Component) {
  _inherits(Welcome, _migi$Component);

  function Welcome() {
    var _ref;

    _classCallCheck(this, Welcome);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.step = self.props.userInfo.User_Reg_Stat;
    self.on(migi.Event.DOM, function () {
      if (self.step === 10) {
        self.load();
      }
      var $tags = $(self.ref.tags.element);
      $tags.on('click', 'li', function (e) {
        var $li = $(this);
        $li.toggleClass('cur');
      });
      var $authors = $(self.ref.authors.element);
      $authors.on('click', 'li', function (e) {
        var $li = $(this);
        $li.toggleClass('cur');
      });
    });
    return _this;
  }

  _createClass(Welcome, [{
    key: 'clickEnterPublic',
    value: function clickEnterPublic(e) {
      var self = this;
      _net2.default.postJSON('/api/user/settle', { settle: true, public: true }, function (res) {
        if (res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
          self.load();
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'clickEnterShadow',
    value: function clickEnterShadow(e) {
      var self = this;
      _net2.default.postJSON('/api/user/settle', { settle: true, public: false }, function (res) {
        if (res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 1;
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'clickNotEnter',
    value: function clickNotEnter(e) {
      var self = this;
      _net2.default.postJSON('/api/user/settle', { settle: false }, function (res) {
        if (res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
          self.load();
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'clickNickName',
    value: function clickNickName(e) {
      var self = this;
      var nickName = $(self.ref.name.element).val().trim();
      var length = nickName.length;
      if (length < 4 || length > 8) {
        alert('昵称长度需要在4~8个字之间哦！');
        return;
      }
      _net2.default.postJSON('/api/user/settleShadowName', { nickName: nickName }, function (res) {
        if (res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
          $CONFIG.userInfo.userName = nickName;
          self.load();
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'clickNickName2',
    value: function clickNickName2(e) {
      var self = this;
      _net2.default.postJSON('/api/user/settleShadow', function (res) {
        if (res.success) {
          self.step = $CONFIG.userInfo.User_Reg_Stat = 10;
          self.load();
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      _net2.default.postJSON('/api/user/guideSuggest', function (res) {
        if (res.success) {
          var data = res.data;
          self.tags = data.tags.data;
          self.authors = data.authors.data;
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'change',
    value: function change(e) {
      this.dis = !e.target.checked;
    }
  }, {
    key: 'clickOK',
    value: function clickOK(e, vd) {
      var self = this;
      if (!self.dis) {
        var $tags = $(self.ref.tags.element);
        var $authors = $(self.ref.authors.element);
        var tags = [];
        var authors = [];
        $tags.find('li.cur').each(function (i, o) {
          tags.push($(o).attr('rel'));
        });
        $authors.find('li.cur').each(function (i, o) {
          authors.push($(o).attr('rel'));
        });
        _net2.default.postJSON('/api/user/guideSave', { tags: tags, authors: authors, isAuthor: $CONFIG.isAuthor }, function (res) {
          if (res.success) {
            self.step = $CONFIG.userInfo.User_Reg_Stat = $CONFIG.isAuthor ? 100 : 99;
            self.hide();
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        });
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: 'render',
    value: function render() {
      var userInfo = this.props.userInfo;
      var authorInfo = this.props.authorInfo;
      if ($CONFIG.isAuthor) {
        var authorTip = '\u554A\u2026\u2026\u5708\u513F\u773C\u62D9\uFF0C\u624D\u53D1\u73B0\u60A8\u5C31\u662F\u4F20\u8BF4\u4E2D\u7684<strong>' + userInfo.AuthorName + '</strong>!<br/>';
        if (authorInfo.Hot_Works_Items && authorInfo.Hot_Works_Items.length) {
          authorTip += '\u4F5C\u4E3A\u4E00\u53EA\u7ACB\u5FD7\u6210\u4E3A\u521B\u4F5C\u5708\u767E\u79D1\u5168\u4E66\u7684\u5154\uFF0C\u5708\u513F\u6B23\u8D4F\u8FC7\u60A8\u53C2\u4E0E\u521B\u4F5C\u7684';
          authorTip += authorInfo.Hot_Works_Items.map(function (item) {
            return migi.createVd("strong", [], [item.Title]);
          });
          authorTip += '等作品！<br/>';
        }
        if (authorInfo.AuthorToAuthor && authorInfo.AuthorToAuthor.length) {
          authorTip += '\u60A8\u5408\u4F5C\u8FC7\u7684';
          authorTip += authorInfo.AuthorToAuthor.map(function (item) {
            return migi.createVd("strong", [], [item.AuthorName]);
          });
          authorTip += '等作者也入驻了转圈哦。<br/>';
        }
        authorTip += '\u4E0D\u77E5\u60A8\u662F\u5426\u613F\u610F\u5728\u8F6C\u5708\u5165\u9A7B\uFF1F<br/>\n\u5165\u9A7B\u4E4B\u540E\u5C06\u5F00\u542F\u60A8\u7684\u4E2A\u4EBA\u4F5C\u8005\u9875\u9762\uFF0C\u4E4B\u540E\u60A8\u5C06\u53EF\u4EE5\u4E0A\u4F20\u3001\u7F16\u8F91\u3001\u60A8\u7684\u4F5C\u54C1\uFF0C\u672A\u6765\u8FD8\u4F1A\u6709\u4E00\u7CFB\u5217\u7C89\u4E1D\u4E92\u52A8\u53CA\u7EA6\u7A3F\u63A5\u7A3F\u529F\u80FD\uFF01';
        return migi.createVd("div", [["class", "welcome"]], [migi.createVd("div", [["class", new migi.Obj("step", this, function () {
          return 'c step' + this.step;
        })]], [migi.createVd("h3", [], [migi.createVd("img", [["src", "//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"]]), "圈儿"]), migi.createVd("div", [["class", "step step0"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("p", [["dangerouslySetInnerHTML", authorTip]]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.clickEnterPublic)]], ["我要公开入驻"]), migi.createVd("br", []), migi.createVd("button", [["onClick", new migi.Cb(this, this.clickEnterShadow)]], ["我要入驻，但是我想披个马甲"]), migi.createVd("br", []), migi.createVd("small", [], ["（您依然可以进行作者相关的操作，但将以普通用户的身份进行评论等互动，别人不会知道你就是", userInfo.AuthorName, "）"]), migi.createVd("br", []), migi.createVd("button", [["onClick", new migi.Cb(this, this.clickNotEnter)]], ["我放弃入驻"])]), migi.createVd("div", [["class", "step step1"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("p", [], ["给马甲想个名字吧！", migi.createVd("br", []), "当前的名字是", migi.createVd("strong", [], [$CONFIG.userInfo.NickName])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("input", [["ref", "name"], ["class", "name"], ["type", "text"], ["placeholder", "请输入昵称"], ["maxLength", "8"]]), migi.createVd("button", [["onClick", new migi.Cb(this, this.clickNickName)]], ["改好提交"]), migi.createVd("button", [["onClick", new migi.Cb(this, this.clickNickName2)]], ["不改了就用", $CONFIG.userInfo.NickName])]), migi.createVd("div", [["class", "step step10"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("pre", [], ["欢迎来到转圈！我是圈娘~\n\
“转圈”是一款仍在开发中的平台，感谢您参与我们的内测活动，我们联合各位大大为您准备了各种福利，活动详情在活动详情页中查看哦！也欢迎随时在转圈右下角和圈儿互动！\n\
\n\
下面的内容中不知可有您喜欢的呢？\n\
勾选喜欢的标签和作者可以帮助圈儿更好的了解你哦~"]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("h4", [], ["风格"]), migi.createVd("ul", [["class", "tags fn-clear"], ["ref", "tags"]], [new migi.Obj("tags", this, function () {
          return (this.tags || []).map(function (item) {
            return migi.createVd("li", [["rel", item.ID]], [item.Tag_Name]);
          });
        })]), migi.createVd("h4", [], ["作者"]), migi.createVd("ul", [["class", "tags fn-clear"], ["ref", "authors"]], [new migi.Obj("authors", this, function () {
          return (this.authors || []).map(function (item) {
            return migi.createVd("li", [["rel", item.AuthorID], ["class", item.ISlike ? 'cur' : '']], [item.AuthorName]);
          });
        })]), migi.createVd("label", [], [migi.createVd("input", [["type", "checkbox"], ["checked", "checked"], ["onChange", new migi.Cb(this, this.change)]]), "我已阅读并同意", migi.createVd("a", [["href", "http://zhuanquan.xyz/temp/d3a4c4114dd2ded956b0d6876bd745eb.html"], ["target", "_blank"]], ["《转圈用户规约》"])]), migi.createVd("button", [["class", new migi.Obj("dis", this, function () {
          return 'center' + (this.dis ? ' dis' : '');
        })], ["onClick", new migi.Cb(this, this.clickOK)]], ["好的~我要开始转圈啦！"])])])]);
      }

      // 非作者初始情况转换为10，0为初始值，1为作者改昵称，有可能在1的时候变为非作者
      if (this.step === 0 || this.step === 1) {
        this.step = 10;
      }
      return migi.createVd("div", [["class", "welcome"]], [migi.createVd("div", [["class", new migi.Obj("step", this, function () {
        return 'c step' + this.step;
      })]], [migi.createVd("h3", [], [migi.createVd("img", [["src", "//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"]]), "圈儿"]), migi.createVd("div", [["class", "step step10"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("pre", [], ["欢迎来到转圈！我是圈娘~\n\
“转圈”是一款仍在开发中的平台，感谢您参与我们的内测活动，我们联合各位大大为您准备了各种福利，活动详情在活动详情页中查看哦！也欢迎随时在转圈右下角和圈儿互动！\n\
\n\
下面的内容中不知可有您喜欢的呢？\n\
勾选喜欢的标签和作者可以帮助圈儿更好的了解你哦~"]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("h4", [], ["风格"]), migi.createVd("ul", [["class", "tags fn-clear"], ["ref", "tags"]], [new migi.Obj("tags", this, function () {
        return (this.tags || []).map(function (item) {
          return migi.createVd("li", [["rel", item.ID]], [item.Tag_Name]);
        });
      })]), migi.createVd("h4", [], ["作者"]), migi.createVd("ul", [["class", "tags fn-clear"], ["ref", "authors"]], [new migi.Obj("authors", this, function () {
        return (this.authors || []).map(function (item) {
          return migi.createVd("li", [["rel", item.AuthorID], ["class", item.ISlike ? 'cur' : '']], [item.AuthorName]);
        });
      })]), migi.createVd("label", [], [migi.createVd("input", [["type", "checkbox"], ["checked", "checked"], ["onChange", new migi.Cb(this, this.change)]]), "我已阅读并同意", migi.createVd("a", [["href", "http://zhuanquan.xyz/temp/d3a4c4114dd2ded956b0d6876bd745eb.html"], ["target", "_blank"]], ["《转圈用户规约》"])]), migi.createVd("button", [["class", new migi.Obj("dis", this, function () {
        return 'center' + (this.dis ? ' dis' : '');
      })], ["onClick", new migi.Cb(this, this.clickOK)]], ["好的~我要开始转圈啦！"])])])]);
    }
  }, {
    key: 'step',
    set: function set(v) {
      this.__setBind("step", v);this.__data("step");
    },
    get: function get() {
      return this.__getBind("step");
    }
  }, {
    key: 'tags',
    set: function set(v) {
      this.__setBind("tags", v);this.__data("tags");
    },
    get: function get() {
      return this.__getBind("tags");
    }
  }, {
    key: 'authors',
    set: function set(v) {
      this.__setBind("authors", v);this.__data("authors");
    },
    get: function get() {
      return this.__getBind("authors");
    }
  }, {
    key: 'dis',
    set: function set(v) {
      this.__setBind("dis", v);this.__data("dis");
    },
    get: function get() {
      return this.__getBind("dis");
    }
  }]);

  return Welcome;
}(migi.Component);

migi.name(Welcome, "Welcome");exports.default = Welcome;

/***/ })

/******/ });