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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
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
  img192_192: function img192_192(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
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
  img100_100: function img100_100(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img90_90: function img90_90(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img__60: function img__60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
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

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(126);

var _My = __webpack_require__(127);

var _My2 = _interopRequireDefault(_My);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var my = migi.preExist(migi.createCp(_My2.default, [["follows", $CONFIG.follows]]));

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 127:
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

var _Follow = __webpack_require__(128);

var _Follow2 = _interopRequireDefault(_Follow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var My = function (_migi$Component) {
  _inherits(My, _migi$Component);

  function My() {
    var _ref;

    _classCallCheck(this, My);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = My.__proto__ || Object.getPrototypeOf(My)).call.apply(_ref, [this].concat(data)));
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "my"]], [migi.createVd("div", [["class", "c"]], [migi.createCp(_Follow2.default, [["ref", "follow"], ["list", this.props.follows]])] /*<Favor ref="favor" list={ this.props.favors }/>*/
      ), migi.createVd("a", [["href", "#"], ["class", "loginout"], ["onClick", new migi.Cb(this, this.clickOut)]], ["退出登录"])]);
    }
  }]);

  return My;
}(migi.Component);

migi.name(My, "My");exports.default = My;

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      return migi.createVd("div", [["class", "cp-hotauthor follow"]], [migi.createVd("h4", [], ["我的关注"]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", item.Head_url || '//zhuanquan.xin/head/0d90e4f2e6f7ef48992df6b49f54cf40.png']])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [item.AuthorName]), migi.createVd("div", [["class", "info"]], [item.FansNumber, "粉丝"])]);
        });
      })])])])]);
    }
  }, {
    key: "list",
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

/***/ })

/******/ });