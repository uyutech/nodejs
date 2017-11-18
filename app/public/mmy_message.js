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
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
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
  img1200__80: function img1200__80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-1200__80' : url;
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
  img720__80: function img720__80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-720__80' : url;
  },
  img600_600_80: function img600_600_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600_600_80' : url;
  },
  img600__80: function img600__80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600__80' : url;
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
  formatPost: function formatPost(str) {},
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
  ajax: function ajax(url, data, _success, _error, type, timeout) {
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
        timeout: timeout || 30000,
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
  getJSON: function getJSON(url, data, success, error, timeout) {
    if (typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if (typeof success !== 'function') {
      success = function success() {};
      timeout = error;
      error = success;
    }
    if (typeof error !== 'function') {
      timeout = error;
      error = function error() {};
    }
    return net.ajax(url, data, success, error, 'GET', timeout);
  },
  postJSON: function postJSON(url, data, success, error, timeout) {
    if (typeof data === 'function') {
      timeout = error;
      error = success;
      success = data;
      data = {};
    }
    if (typeof success !== 'function') {
      success = function success() {};
      timeout = error;
      error = success;
    }
    if (typeof error !== 'function') {
      timeout = error;
      error = function error() {};
    }
    return net.ajax(url, data, success, error, 'POST', timeout);
  }
};

exports.default = net;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(134);

var _Message = __webpack_require__(135);

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = migi.preExist(migi.createCp(_Message2.default, [["messages", $CONFIG.messages]]));

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 135:
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

var _Messages = __webpack_require__(66);

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var take = 10;
var skip = take;
var loading = void 0;

var Message = function (_migi$Component) {
  _inherits(Message, _migi$Component);

  function Message() {
    var _ref;

    _classCallCheck(this, Message);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Message.__proto__ || Object.getPrototypeOf(Message)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.message = '正在加载...';
    self.on(migi.Event.DOM, function () {
      var $window = $(window);
      $window.on('scroll', function () {
        self.checkMore($window);
      });
      self.read(self.props.messages.data);
    });
    return _this;
  }

  _createClass(Message, [{
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
      _net2.default.postJSON('/api/my/message', { skip: skip, take: take }, function (res) {
        if (res.success) {
          var data = res.data;
          skip += take;
          self.ref.messages.appendData(data.data);
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
    key: 'read',
    value: function read(data) {
      var ids = (data || []).filter(function (item) {
        return !item.ISRead;
      }).map(function (item) {
        return item.NotifyID;
      });
      if (ids.length) {
        _net2.default.postJSON('/api/my/readMessage', { ids: ids }, function (res) {
          if (res.success) {
            migi.eventBus.emit('READ_MESSAGE_NUM', ids.length);
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "message fn-clear"]], [migi.createCp(_Messages2.default, [["ref", "messages"], ["data", this.props.messages.data]]), migi.createVd("div", [["class", "message"]], [new migi.Obj("message", this, function () {
        return this.message;
      })])]);
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

  return Message;
}(migi.Component);

migi.name(Message, "Message");exports.default = Message;

/***/ }),

/***/ 66:
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

var Messages = function (_migi$Component) {
  _inherits(Messages, _migi$Component);

  function Messages() {
    var _ref;

    _classCallCheck(this, Messages);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Messages.__proto__ || Object.getPrototypeOf(Messages)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.data && self.props.data.length) {
      var html = '';
      self.props.data.forEach(function (item) {
        html += self.genItem(item);
      });
      self.html = html;
    }
    return _this;
  }

  _createClass(Messages, [{
    key: 'genItem',
    value: function genItem(item) {
      var id = item.Target;
      var type = item.TargetType;
      var url = '#';
      if (type === 1) {
        url = '/author/' + item.urlID;
      } else if (type === 2) {
        url = '/works/' + item.urlID;
      } else if (type === 3) {
        url = '/post/' + item.urlID;
      }
      if (item.Send_UserISAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("a", [["href", '/author/' + item.Send_UserID], ["class", "name"]], [item.Send_UserName]), migi.createVd("a", [["class", "time"], ["href", url]], [_util2.default.formatDate(item.Send_Time)])])]), migi.createVd("div", [["class", "wrap"]], [migi.createVd("div", [["class", "quote"]], [migi.createVd("label", [], [item.Action, "："]), migi.createVd("p", [], [item.Content])]), migi.createVd("pre", [["class", "con"]], [item.Send_Content]),,,, /*<ul class="btn fn-clear">*/
        /*<li class="comment" type={ type } rel={ id }>{ item.CommentCount }</li>*/
        /*</ul>*/
        migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("a", [["class", "time"], ["href", url]], [_util2.default.formatDate(item.Send_Time)])])]), migi.createVd("div", [["class", "wrap"]], [migi.createVd("div", [["class", "quote"]], [migi.createVd("label", [], [item.Action, "："]), migi.createVd("p", [], [item.Content])]), migi.createVd("pre", [["class", "con"]], [item.Send_Content]),,,, /*<ul class="btn fn-clear">*/
      /*<li class="comment" type={ type } rel={ id }>{ item.CommentCount }</li>*/
      /*</ul>*/
      migi.createVd("b", [["class", "arrow"]])])]);
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
    key: 'appendData',
    value: function appendData(data) {
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
      return migi.createVd("div", [["class", "cp-messages"]], [this.props.data && this.props.data.length ? migi.createVd("ol", [["class", "list"], ["ref", "list"], ["dangerouslySetInnerHTML", this.html]]) : migi.createVd("div", [["class", "empty"]], ["暂无内容"])]);
    }
  }]);

  return Messages;
}(migi.Component);

migi.name(Messages, "Messages");exports.default = Messages;

/***/ })

/******/ });