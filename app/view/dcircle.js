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
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
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
  ajax: function(url, data, success, error, type) {
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
        timeout: 6000,
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
  getJSON: function(url, data, success, error) {
    if(typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return net.ajax(url, data, success, error);
  },
  postJSON: function(url, data, success, error) {
    if(typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    success = success || function() {};
    error = error || function() {};
    return net.ajax(url, data, success, error, 'post');
  },
};

/* harmony default export */ __webpack_exports__["default"] = (net);


/***/ }),

/***/ 108:
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
  }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcircle.css') + '"/>\n</head>\n<body>\n<div id="page">' + circle + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.circleID = ' + JSON.stringify(circleID) + ';\n  $CONFIG.circleDetail = ' + JSON.stringify(circleDetail) + ';\n  $CONFIG.postList = ' + JSON.stringify(postList) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dcircle.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Circle = __webpack_require__(109);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Title = __webpack_require__(110);

var _Title2 = _interopRequireDefault(_Title);

var _PostList = __webpack_require__(111);

var _PostList2 = _interopRequireDefault(_PostList);

var _SubPost = __webpack_require__(112);

var _SubPost2 = _interopRequireDefault(_SubPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Circle = function (_migi$Component) {
  _inherits(Circle, _migi$Component);

  function Circle() {
    var _ref;

    _classCallCheck(this, Circle);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Circle.__proto__ || Object.getPrototypeOf(Circle)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Circle, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "circle fn-clear"]], [migi.createCp(_Title2.default, [["circleDetail", this.props.circleDetail]]), migi.createVd("div", [["class", "main"]], [migi.createCp(_PostList2.default, [["datas", this.props.postList]])]), migi.createCp(_SubPost2.default, [["circleID", this.props.circleDetail.TagID], ["ref", "subPost"], ["originTo", this.props.circleDetail.TagName]])]);
    }
  }]);

  return Circle;
}(migi.Component);

migi.name(Circle, "Circle");exports.default = Circle;

/***/ }),

/***/ 110:
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
    _this.count = _this.props.circleDetail.UserCount;
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
      })])]), migi.createVd("p", [["class", "intro"]], [this.props.circleDetail.Describe])])]);
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

/***/ 111:
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
    if (self.props.datas.Size) {
      var html = '';
      self.props.datas.data.forEach(function (item) {
        html += self.genItem(item);
      });
      self.html = html;
      self.on(migi.Event.DOM, function () {
        var $list = $(this.ref.list.element);
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
        $list.on('click', '.comment', function () {
          var postID = $(this).attr('rel');
          location.href = '/post/' + postID;
        });
      });
    }
    return _this;
  }

  _createClass(PostList, [{
    key: 'genItem',
    value: function genItem(item) {
      var len = item.Content.length;
      var maxLen = 64;
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("a", [["href", '/author/' + item.IsAuthor], ["class", "name"]], [item.SendUserNickName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Createtime)])])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + item.ID], ["class", "t"]], [item.Title]) : '', migi.createVd("pre", [["class", "con"]], [len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content, migi.createVd("a", [["href", '/post/' + item.ID], ["class", "more"]], ["查看全部"])]), migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", item.ID]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", item.ID]], [item.CommentCount])]), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img96_96_80(item.SendUserHead_Url || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("span", [["class", "name"]], [item.SendUserNickName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Createtime)])])]), migi.createVd("div", [["class", "wrap"]], [item.Title ? migi.createVd("a", [["href", '/post/' + item.ID], ["class", "t"]], [item.Title]) : '', migi.createVd("pre", [["class", "con"]], [len > maxLen ? item.Content.slice(0, maxLen) + '...' : item.Content, migi.createVd("a", [["href", '/post/' + item.ID], ["class", "more"]], ["点击展开>"])]), migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", 'like' + (item.ISLike ? ' has' : '')], ["rel", item.ID]], [item.LikeCount]), migi.createVd("li", [["class", "comment"], ["rel", item.ID]], [item.CommentCount])]), migi.createVd("b", [["class", "arrow"]])])]);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "post-list"]], [this.props.datas.Size ? migi.createVd("ol", [["ref", "list"], ["dangerouslySetInnerHTML", this.html]]) : migi.createVd("div", [["class", "empty"]], ["暂无内容"])]);
    }
  }]);

  return PostList;
}(migi.Component);

migi.name(PostList, "PostList");exports.default = PostList;

/***/ }),

/***/ 112:
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
  LOADED: 1,
  ERROR: 2
};
var TEXT = {
  0: '上传中...',
  1: '',
  2: '加载失败'
};

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
        var key = $CONFIG.uid + '_circle_img';
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
        var key2 = $CONFIG.uid + '_circle_content';
        var cache2 = localStorage[key2];
        if (cache2) {
          self.value = cache2.trim();
          self.input(null, self.ref.input);
        }
      }
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
        self.invalid = content.length < 3 || content.length > 256;
        self.warnLength = content.length > 256;
        var key2 = $CONFIG.uid + '_circle_content';
        localStorage[key2] = content;
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.expand = true;return;
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
        var imgs = self.list.map(function (item) {
          return item.url;
        });
        self.sending = true;
        _net2.default.postJSON('/api/circle/add', { content: self.value, imgs: imgs, circleID: self.props.circleID }, function (res) {
          if (res.success) {
            self.value = '';
            self.list = [];
            var key = $CONFIG.uid + '_circle_img';
            localStorage[key] = '';
            var key2 = $CONFIG.uid + '_circle_content';
            localStorage[key2] = '';
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
        for (var i = 0, len = files.length; i < len; i++) {
          var file = files[i];
          var size = file.size;
          if (size && size !== 0 && size <= 1024 * 1024 * 3) {
            res.push(file);
          }
        }
        if (files.length !== res.length) {
          alert('图片最大不能超过3M哦，超过的将自动过滤。');
        }
        if (!res.length) {
          return;
        }
        self.disableUpload = true;
        var num = res.length;
        var count = 0;
        res.forEach(function (file, i) {
          var fileReader = new FileReader();
          fileReader.onload = function () {
            self.list.push({
              state: STATE.LOADING,
              url: fileReader.result
            });
            _net2.default.postJSON('/api/user/uploadPic', { img: fileReader.result }, function (res) {
              if (res.success) {
                self.list[i + self.imgNum].state = STATE.LOADED;
                self.list[i + self.imgNum].url = res.data;
                self.list = self.list;
                self.addCache(res.data);
                count++;
                if (count === num) {
                  self.disableUpload = false;
                }
              } else {
                alert(res.message || _util2.default.ERROR_MESSAGE);
              }
            }, function (res) {
              alert(res.message || _util2.default.ERROR_MESSAGE);
              count++;
              if (count === num) {
                self.disableUpload = false;
              }
            });
          };
          fileReader.readAsDataURL(file);
        });
      } else {
        alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器或者极速模式。');
      }
    }
  }, {
    key: 'addCache',
    value: function addCache(url) {
      var key = $CONFIG.uid + '_circle';
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
      var key = $CONFIG.uid + '_circle';
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
      var key = $CONFIG.uid + '_circle';
      localStorage[key] = '';
    }
  }, {
    key: 'clickImg',
    value: function clickImg(e, vd, tvd) {
      this.delCache(tvd.props.rel);
      this.list.splice(tvd.props.idx, 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", new migi.Obj("expand", this, function () {
        return 'mod-sub' + (this.expand ? ' expand' : ' expand');
      })]], [migi.createVd("div", [["class", "c"]], [migi.createVd("form", [["class", new migi.Obj(["to", "originTo"], this, function () {
        return 'fn-clear' + (this.to || this.originTo ? ' to' : '');
      })], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("div", [["class", "wrap"]], [migi.createVd("label", [], ["TO: ", new migi.Obj(["to", "originTo"], this, function () {
        return this.to || this.originTo;
      })]), migi.createVd("textarea", [["class", "text"], ["ref", "input"], ["placeholder", new migi.Obj(["to", "placeholder"], this, function () {
        return this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个圈子吧';
      })], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)], ["onBlur", new migi.Cb(this, this.blur)]], [new migi.Obj("value", this, function () {
        return this.value;
      })]), migi.createVd("span", [["class", new migi.Obj("warnLength", this, function () {
        return 'limit' + (this.warnLength ? ' warn' : '');
      })]], [migi.createVd("strong", [], [new migi.Obj("num", this, function () {
        return this.num;
      })]), " / ", new migi.Obj("maxlength", this, function () {
        return this.maxlength || 256;
      })]), migi.createVd("div", [["class", new migi.Obj("disableUpload", this, function () {
        return 'upload' + (this.disableUpload ? ' dis' : '');
      })]], ["\n\
              添加图片\n\
              ", migi.createVd("input", [["type", "file"], ["class", "file"], ["onChange", new migi.Cb(this, this.change)], ["disabled", new migi.Obj("disableUpload", this, function () {
        return !!this.disableUpload;
      })], ["multiple", "multiple"], ["accept", "image/gif, image/jpeg, image/png"]])]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj(["sending", "invalid", "disableUpload"], this, function () {
        return 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '');
      })], ["value", new migi.Obj(["value", "tipText", "subText"], this, function () {
        return this.value.trim().length ? this.value.trim().length < 3 ? this.tipText ? this.tipText.replace('${n}', 3 - this.value.trim().length) : '还少' + (3 - this.value.trim().length) + '个字哦' : this.subText || '发送' : this.subText || '发送';
      })]]), migi.createVd("input", [["type", 'hidden'], ["id", 'afs_scene'], ["name", 'afs_scene']]), migi.createVd("input", [["type", 'hidden'], ["id", 'afs_token'], ["name", 'afs_token']])]), migi.createVd("ul", [["class", "list fn-clear"], ["onClick", new migi.Cb(this, this.clickImg)]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item, i) {
          return migi.createVd("li", [["class", 's' + item.state], ["idx", i], ["rel", item.url], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img60_60_80(item.url)) + ')']], [migi.createVd("span", [], [TEXT[item.state]])]);
        });
      })])])])]);
    }
  }, {
    key: 'maxlength',
    set: function set(v) {
      this.__setBind("maxlength", v);this.__data("maxlength");
    },
    get: function get() {
      return this.__getBind("maxlength");
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

/***/ })

/******/ })));