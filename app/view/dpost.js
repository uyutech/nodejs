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
/******/ 	return __webpack_require__(__webpack_require__.s = 101);
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

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var isLogin = !!data.ctx.session.uid;
  var id = data.id;
  var postData = data.postData;
  var replyData = data.replyData;

  var post = migi.preRender(migi.createCp(_Post2.default, [["isLogin", isLogin], ["id", id], ["postData", postData], ["replyData", replyData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead({
    title: postData.Title
  }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dpost.css') + '"/>\n</head>\n<body>\n<div id="page">' + post + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.id = ' + JSON.stringify(id) + ';\n  $CONFIG.postData = ' + JSON.stringify(postData) + ';\n  $CONFIG.replyData = ' + JSON.stringify(replyData) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dpost.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Post = __webpack_require__(102);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 102:
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

var _Reply = __webpack_require__(103);

var _Reply2 = _interopRequireDefault(_Reply);

var _SubCmt = __webpack_require__(2);

var _SubCmt2 = _interopRequireDefault(_SubCmt);

var _Page = __webpack_require__(8);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var skip = 10;
var take = 10;
var sortType = 0;
var myComment = 0;
var currentCount = 0;
var ajax = void 0;

var Post = function (_migi$Component) {
  _inherits(Post, _migi$Component);

  function Post() {
    var _ref;

    _classCallCheck(this, Post);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Post.__proto__ || Object.getPrototypeOf(Post)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var subCmt = self.ref.subCmt;
      var reply = self.ref.reply;
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
      reply.on('chooseSubComment', function (rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      reply.on('closeSubComment', function () {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = null;
      });
      subCmt.on('submit', function (content) {
        subCmt.isCommentSending = true;
        var rootID = self.rootID;
        var parentID = self.parentID;
        _net2.default.postJSON('/api/post/addComment', {
          parentID: parentID,
          rootID: rootID,
          postID: self.props.id,
          content: content
        }, function (res) {
          if (res.success) {
            subCmt.value = '';
            subCmt.hasCommentContent = false;
            if (rootID === -1) {
              reply.prependData(res.data);
              reply.message = '';
            } else {
              reply.prependChild(res.data);
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          subCmt.isCommentSending = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          subCmt.isCommentSending = false;
        });
      });
    });
    return _this;
  }

  _createClass(Post, [{
    key: 'load',
    value: function load() {
      var self = this;
      var reply = self.ref.reply;
      var page = self.ref.page;
      var page2 = self.ref.page2;
      reply.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/post/commentList', { postID: self.props.id, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          // currentCount = data.Size;
          skip += take;
          if (data.data.length) {
            reply.message = '';
            reply.appendData(res.data.data);
            page.total = page2.total = Math.ceil(currentCount / take);
          } else {
            reply.appendData(res.data.data);
            reply.message = '暂无评论';
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          reply.message = res.message || _util2.default.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        reply.message = res.message || _util2.default.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'loadPage',
    value: function loadPage() {
      var self = this;
      var reply = self.ref.reply;
      reply.message = '读取中...';
      reply.setData();
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/post/commentList', { postID: self.props.id, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          skip += take;
          if (data.data.length) {
            reply.message = '';
            reply.appendData(res.data.data);
          } else {
            reply.appendData(res.data.data);
            reply.message = '暂无评论';
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          reply.message = res.message || _util2.default.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        reply.message = res.message || _util2.default.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'switchType',
    value: function switchType(e, vd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      var rel = $ul.find('.cur').attr('rel');
      currentCount = 0;
      sortType = rel;
      skip = 0;
      if (ajax) {
        ajax.abort();
      }
      this.loading = false;
      this.ref.reply.clearData();
      this.load();
    }
  }, {
    key: 'switchType2',
    value: function switchType2(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        var $ul = $(vd.element);
        $ul.toggleClass('alt');
        $ul.find('li').toggleClass('cur');
        var rel = $ul.find('.cur').attr('rel');
        currentCount = 0;
        myComment = rel;
        skip = 0;
        if (ajax) {
          ajax.abort();
        }
        this.loading = false;
        this.ref.reply.clearData();
        this.load();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var postData = this.props.postData;
      return migi.createVd("div", [["class", "post fn-clear"]], [migi.createVd("div", [["class", "main"]], [migi.createVd("h2", [], [postData.Title]), migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", postData.IsAuthor ? postData.SendAuthorHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png' : postData.SendUserHead_Url || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [postData.SendUserNickName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(postData.Createtime)])])])]), migi.createVd("div", [["class", "wrap"]], [migi.createVd("div", [["class", "con"], ["dangerouslySetInnerHTML", postData.Content]]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "box"]], [migi.createVd("h4", [], ["回复"]), migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部", migi.createVd("small", [], [this.props.replyData.Size])]), this.props.isLogin ? migi.createVd("li", [["rel", "1"]], ["我的"]) : '']), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.replyData.Size / take)]]), migi.createCp(_Reply2.default, [["ref", "reply"], ["zanUrl", "/api/post/likeComment"], ["subUrl", "/api/post/subCommentList"], ["delUrl", "/api/post/delComment"], ["data", this.props.replyData.data]]), migi.createCp(_Page2.default, [["ref", "page2"], ["total", Math.ceil(this.props.replyData.Size / take)]])]), migi.createCp(_SubCmt2.default, [["ref", "subCmt"], ["subText", "回复帖子"], ["placeholder", "夸夸这个帖子吧"]])])]);
    }
  }, {
    key: 'rootID',
    set: function set(v) {
      this.__setBind("rootID", v);this.__data("rootID");
    },
    get: function get() {
      if (this.__initBind("rootID")) this.__setBind("rootID", -1);return this.__getBind("rootID");
    }
  }, {
    key: 'parentID',
    set: function set(v) {
      this.__setBind("parentID", v);this.__data("parentID");
    },
    get: function get() {
      if (this.__initBind("parentID")) this.__setBind("parentID", -1);return this.__getBind("parentID");
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

  return Post;
}(migi.Component);

migi.name(Post, "Post");exports.default = Post;

/***/ }),

/***/ 103:
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

var NOT_LOADED = 0;
var IS_LOADING = 1;
var HAS_LOADED = 2;
var subLoadHash = {};
var subSkipHash = {};
var $last = void 0;
var take = 10;
var ajax = void 0;

var Reply = function (_migi$Component) {
  _inherits(Reply, _migi$Component);

  function Reply() {
    var _ref;

    _classCallCheck(this, Reply);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Reply.__proto__ || Object.getPrototypeOf(Reply)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    var html = '';
    (self.props.data || []).forEach(function (item) {
      html += self.genComment(item);
    });
    self.html = html;
    if (!html) {
      self.message = '暂无评论';
    }

    self.on(migi.Event.DOM, function () {
      var $root = $(self.element);
      $root.on('click', '.like', function () {
        var $elem = $(this);
        var commentID = $elem.attr('cid');
        _net2.default.postJSON(self.props.zanUrl, { commentID: commentID }, function (res) {
          if (res.success) {
            var _data = res.data;
            if (_data.State === 'likeWordsUser') {
              $elem.addClass('liked');
            } else {
              $elem.removeClass('liked');
            }
            $elem.text(_data.LikeCount);
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        });
      });
      $root.on('click', '.slide .sub, .slide span', function () {
        self.slide($(this).closest('li'));
      });
      $root.on('click', '.list>li>.c>.con', function () {
        self.slide($(this).closest('li'));
      });
      $root.on('click', '.more', function () {
        var $message = $(this);
        var rid = $message.attr('rid');
        $message.removeClass('more').text('读取中...');
        ajax = _net2.default.postJSON(self.props.subUrl, { rootID: rid, skip: subSkipHash[rid], take: take }, function (res) {
          if (res.success) {
            var _data2 = res.data;
            if (_data2.data.length) {
              subSkipHash[rid] = _data2.data[_data2.data.length - 1].Send_ID;
              var s = '';
              _data2.data.forEach(function (item) {
                s += self.genChildComment(item);
              });
              var $ul = $message.prev();
              $ul.append(s);
              if (_data2.data.length < take) {
                $message.addClass('fn-hide');
              } else {
                $message.addClass('more').text('点击加载更多');
              }
            } else {
              $message.addClass('fn-hide');
            }
          } else {
            $message.addClass('more').text(res.message || _util2.default.ERROR_MESSAGE);
          }
        }, function (res) {
          $message.addClass('more').text(res.message || _util2.default.ERROR_MESSAGE);
        });
      });
      $root.on('click', '.share', function (e) {
        e.preventDefault();
      });
      $root.on('click', '.remove', function () {
        var $btn = $(this);
        if (window.confirm('会删除子留言哦，确定要删除吗？')) {
          var cid = $btn.attr('cid');
          _net2.default.postJSON(self.props.delUrl, { commentID: cid }, function (res) {
            if (res.success) {
              $btn.closest('li').remove();
            } else if (res.code === 1000) {
              migi.eventBus.emit('NEED_LOGIN');
            } else {
              alert(res.message || _util2.default.ERROR_MESSAGE);
            }
          }, function (res) {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          });
        }
      });
    });
    return _this;
  }

  _createClass(Reply, [{
    key: 'slide',
    value: function slide($li) {
      var self = this;
      if (ajax) {
        ajax.abort();
      }
      var $slide = $li.find('.slide');
      var $list2 = $li.find('.list2');
      var $ul = $list2.find('ul');
      var $message = $list2.find('.message');
      var rid = $slide.attr('rid');
      if ($last && $last[0] !== $li[0] && $last.hasClass('on')) {
        self.hideLast();
      }
      if ($li.hasClass('on')) {
        $li.removeClass('on');
        $list2.css('height', 0);
        self.emit('closeSubComment');
        $last = null;
        if (subLoadHash[rid] === IS_LOADING) {
          subLoadHash[rid] = NOT_LOADED;
        }
      } else {
        $last = $li;
        $li.addClass('on');
        self.emit('chooseSubComment', $slide.attr('rid'), $slide.attr('cid'), $slide.attr('name'));
        var state = subLoadHash[rid];
        if (state === HAS_LOADED || state === IS_LOADING) {
          $list2.css('height', 'auto');
        } else {
          $list2.css('height', 'auto');
          subLoadHash[rid] = IS_LOADING;
          ajax = _net2.default.postJSON(self.props.subUrl, { rootID: rid, skip: 0, take: take }, function (res) {
            if (res.success) {
              subLoadHash[rid] = HAS_LOADED;
              var s = '';
              var data = res.data;
              data.data.forEach(function (item) {
                s += self.genChildComment(item);
              });
              $ul.append(s);
              if (data.data.length >= data.Size) {
                $message.addClass('fn-hide');
              } else {
                $message.addClass('more').text('点击加载更多');
                subSkipHash[rid] = data.data[data.data.length - 1].Send_ID;
              }
              $ul.removeClass('fn-hide');
              $list2.css('height', 'auto');
            } else {
              subLoadHash[rid] = NOT_LOADED;
              $message.text(res.message || _util2.default.ERROR_MESSAGE);
            }
          }, function (res) {
            subLoadHash[rid] = NOT_LOADED;
            $message.text(res.message || _util2.default.ERROR_MESSAGE);
          });
        }
      }
    }
  }, {
    key: 'slideOn',
    value: function slideOn(cid) {
      var $slide = $(this.element).find('#comment_' + cid).find('.slide');
      if (!$slide.hasClass('on')) {
        $slide.find('.sub').click();
      }
    }
  }, {
    key: 'clearData',
    value: function clearData() {
      if (ajax) {
        ajax.abort();
      }
      this.message = '';
      this.setData();
      subLoadHash = {};
      subSkipHash = {};
      $last = null;
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var self = this;
      var s = '';
      (data || []).forEach(function (item) {
        s += self.genComment(item);
      });
      $(self.ref.list.element).html(s);
    }
  }, {
    key: 'appendData',
    value: function appendData(data) {
      var self = this;
      var s = '';
      (data || []).forEach(function (item) {
        s += self.genComment(item);
      });
      $(self.ref.list.element).append(s);
    }
  }, {
    key: 'prependData',
    value: function prependData(item) {
      this.genComment(item).prependTo(this.ref.list.element);
    }
  }, {
    key: 'prependChild',
    value: function prependChild(item) {
      var $comment = $('#comment_' + item.RootID);
      var $list2 = $comment.find('.list2');
      var $ul = $list2.find('ul');
      var state = subLoadHash[item.RootID];
      if (state === HAS_LOADED || state === IS_LOADING) {
        var li = this.genChildComment(item);
        li.prependTo($ul[0]);
      }
      if ($ul.closest('li').find('.slide').hasClass('on')) {
        $list2.css('height', $ul.height());
      }
      var $num = $comment.find('.slide small.sub');
      $num.text((parseInt($num.text()) || 0) + 1);
    }
  }, {
    key: 'genComment',
    value: function genComment(item) {
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"], ["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_AuthorHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_AuthorName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["dangerouslySetInnerHTML", item.Send_Content]]), migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_AuthorName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
      }
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["dangerouslySetInnerHTML", item.Send_Content]]), migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_AuthorName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_AuthorName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "con"], ["dangerouslySetInnerHTML", item.Send_Content]]), migi.createVd("div", [["class", "slide2"]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount])]), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "con"], ["dangerouslySetInnerHTML", item.Send_Content]]), migi.createVd("div", [["class", "slide2"]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount])]), migi.createVd("b", [["class", "arrow"]])])]);
    }
  }, {
    key: 'hideLast',
    value: function hideLast() {
      if ($last && $last.hasClass('on')) {
        $last.removeClass('on').find('.list2').css('height', 0);
      }
      $last = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-comment reply"]], [migi.createVd("ul", [["class", "list"], ["ref", "list"], ["dangerouslySetInnerHTML", this.html]]), migi.createVd("p", [["class", new migi.Obj("message", this, function () {
        return 'message' + (this.message ? '' : ' fn-hide');
      })]], [new migi.Obj("message", this, function () {
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

  return Reply;
}(migi.Component);

migi.name(Reply, "Reply");exports.default = Reply;

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubCmt = function (_migi$Component) {
  _inherits(SubCmt, _migi$Component);

  function SubCmt() {
    var _ref;

    _classCallCheck(this, SubCmt);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = SubCmt.__proto__ || Object.getPrototypeOf(SubCmt)).call.apply(_ref, [this].concat(data)));

    _this.value = _this.props.value || '';
    _this.invalid = _this.value.trim().length < 3;
    _this.maxlength = _this.props.maxlength;
    _this.subText = _this.props.subText;
    _this.tipText = _this.props.tipText;
    _this.placeholder = _this.props.placeholder;
    _this.originTo = _this.props.originTo;
    return _this;
  }

  _createClass(SubCmt, [{
    key: 'input',
    value: function input(e, vd) {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        this.invalid = $(vd.element).val().trim().length < 3;
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      if (!this.invalid) {
        this.emit('submit', this.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-subcmt"]], [migi.createVd("form", [["class", new migi.Obj(["to", "originTo"], this, function () {
        return 'fn-clear' + (this.to || this.originTo ? ' to' : '');
      })], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("label", [], ["TO: ", new migi.Obj(["to", "originTo"], this, function () {
        return this.to || this.originTo;
      })]), migi.createVd("input", [["type", "text"], ["class", "text"], ["ref", "input"], ["placeholder", new migi.Obj(["to", "placeholder"], this, function () {
        return this.to ? '回复' + this.to + '的评论' : this.placeholder || '夸夸这个作品吧';
      })], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)], ["maxlength", new migi.Obj("maxlength", this, function () {
        return this.maxlength || 256;
      })], ["value", new migi.Obj("value", this, function () {
        return this.value;
      })]]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj("invalid", this, function () {
        return 'submit' + (this.invalid ? ' dis' : '');
      })], ["value", new migi.Obj(["value", "tipText", "subText"], this, function () {
        return this.value.trim().length ? this.value.trim().length < 3 ? this.tipText ? this.tipText.replace('${n}', 3 - this.value.trim().length) : '还少' + (3 - this.value.trim().length) + '个字哦' : this.subText || '发布评论' : this.subText || '发布评论';
      })]])])]);
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
  }]);

  return SubCmt;
}(migi.Component);

migi.name(SubCmt, "SubCmt");exports.default = SubCmt;

/***/ }),

/***/ 8:
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

/***/ })

/******/ })));