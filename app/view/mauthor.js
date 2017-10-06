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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
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
  isIPhone: function(){
    return navigator.appVersion.match(/iphone/gi);
  },
  goto: function(url) {
    location.href = url;
  },
  img150_150: function(url) {
    return url ? url + '-150_150' : url;
  },
  img100_100: function(url) {
    return url ? url + '-100_100' : url;
  },
  img90_90: function(url) {
    return url ? url + '-90_90' : url;
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
 * Created by army8735 on 2017/10/2.
 */



let net = {
  ajax: function(url, data, success, error, type) {
    let csrfToken = $.cookie('csrfToken');
    function load() {
      return $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        cache: false,
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
    error = error || function() {};
    return net.ajax(url, data, success, error, 'post');
  },
};

/* harmony default export */ __webpack_exports__["default"] = (net);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BotNav = function (_migi$Component) {
  _inherits(BotNav, _migi$Component);

  function BotNav() {
    var _ref;

    _classCallCheck(this, BotNav);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = BotNav.__proto__ || Object.getPrototypeOf(BotNav)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(BotNav, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-botnav"]], ["All Rights Reserved 转圈circling 浙ICP备17029501号-2"]);
    }
  }]);

  return BotNav;
}(migi.Component);

migi.name(BotNav, "BotNav");exports.default = BotNav;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    return _possibleConstructorReturn(this, (_ref = TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(TopNav, [{
    key: 'focus',
    value: function focus() {
      this.emit('focus');
    }
  }, {
    key: 'click',
    value: function click() {
      this.submit();
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e && e.preventDefault();
      var v = this.ref.input.element.value;
      this.emit('search', v);
    }
  }, {
    key: 'clickUser',
    value: function clickUser(e) {
      if ($CONFIG.isLogin !== 'True') {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "top-nav"]], [migi.createVd("a", [["href", "/"], ["class", "logo"]]), migi.createVd("form", [["class", "form"], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)], ["action", "/search/"]], [migi.createVd("input", [["ref", "input"], ["type", "text"], ["maxlength", "16"], ["placeholder", "新歌《燃尽人间色发布》"], ["value", this.props.kw || ''], ["onFocus", new migi.Cb(this, this.focus)]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)]], ["确认"]), migi.createVd("a", [["href", "/my"], ["class", "user"], ["onClick", new migi.Cb(this, this.clickUser)]], [migi.createVd("img", [["src", this.props.head || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']])])]);
    }
  }]);

  return TopNav;
}(migi.Component);

migi.name(TopNav, "TopNav");exports.default = TopNav;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/8/13.
 */

let code2Data = {
  '901': {
    name: '出品',
    display: '出品',
    css: 'producer',
  },
  '111': {
    name: '演唱',
    display: '演唱',
    css: 'singer',
  },
  '112': {
    name: '和声',
    display: '和声',
    css: 'singer',
  },
  '121': {
    name: '作曲',
    display: '作曲',
    css: 'musician',
  },
  '122': {
    name: '编曲',
    display: '编曲',
    css: 'musician',
  },
  '131': {
    name: '混音',
    display: '混音',
    css: 'mixer',
  },
  '134': {
    name: '修音',
    display: '修音',
    css: 'mixer',
  },
  '141': {
    name: '演奏',
    display: '', //直接显示乐器名。
    css: 'instrumental',
  },
  '211': {
    name: '视频',
    display: '视频',
    css: 'video',
  },
  '311': {
    name: '立绘',
    display: '立绘',
    css: 'painter',
  },
  '312': {
    name: 'CG',
    display: 'CG',
    css: 'painter',
  },
  '313': {
    name: '场景',
    display: '场景',
    css: 'painter',
  },
  '331': {
    name: '设计',
    display: '设计',
    css: 'designer',
  },
  '332': {
    name: '海报',
    display: '海报',
    css: 'designer',
  },
  '351': {
    name: '书法',
    display: '书法',
    css: 'handwriting',
  },
  '411': {
    name: '作词',
    display: '作词',
    css: 'writer',
  },
  '421': {
    name: '文案',
    display: '文案',
    css: 'writer',
  },
};

let label2Code = {};
Object.keys(code2Data).forEach(function(k) {
  let v = code2Data[k];
  label2Code[v.css] = label2Code[v.css] || [];
  label2Code[v.css].push(k);
});

/* harmony default export */ __webpack_exports__["default"] = ({
  code2Data,
  label2Code,
});


/***/ }),
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
/* 6 */
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
var $lastSlide = void 0;
var Take = 10;
var ajax = void 0;

function formatTime(time) {
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
}

var Comment = function (_migi$Component) {
  _inherits(Comment, _migi$Component);

  function Comment() {
    var _ref;

    _classCallCheck(this, Comment);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    var html = '';
    self.props.data.forEach(function (item) {
      html += self.genComment(item);
    });
    self.html = html;
    if (!html) {
      self.message = '暂无评论';
    }

    self.on(migi.Event.DOM, function () {
      var $root = $(self.element);
      $root.on('click', '.zan', function () {
        var $span = $(this);
        var CommentID = $span.attr('cid');
        _net2.default.postJSON(self.props.zanUrl, { CommentID: CommentID }, function (res) {
          if (res.success) {
            var _data = res.data;
            if (_data.State === 'likeWordsUser') {
              $span.addClass('has');
            } else {
              $span.removeClass('has');
            }
            $span.find('small').text(_data.LikeCount);
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        });
      });
      $root.on('click', '.slide', function () {
        self.slide($(this));
      });
      $root.on('click', '.more', function () {
        var $message = $(this);
        var rid = $message.attr('rid');
        $message.removeClass('more').text('读取中...');
        ajax = _net2.default.postJSON(self.props.subUrl, { RootID: rid, Skip: subSkipHash[rid], Take: Take }, function (res) {
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
              if (_data2.data.length < Take) {
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
        var cid = $btn.attr('cid');
        _net2.default.postJSON(self.props.delUrl, { CommentID: cid }, function (res) {
          if (res.success) {
            $btn.closest('li').remove();
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        });
      });
    });
    return _this;
  }

  _createClass(Comment, [{
    key: 'slide',
    value: function slide($slide) {
      if (ajax) {
        ajax.abort();
      }
      var self = this;
      var $li = $slide.closest('li');
      var $list2 = $li.find('.list2');
      var $ul = $list2.find('ul');
      var $message = $list2.find('.message');
      var rid = $slide.attr('rid');
      if ($lastSlide && $lastSlide[0] !== $slide[0] && $lastSlide.hasClass('on')) {
        $lastSlide.removeClass('on').closest('li').find('.list2').css('height', 0);
        $lastSlide = null;
      }
      if ($slide.hasClass('on')) {
        $slide.removeClass('on');
        $list2.css('height', 0);
        self.emit('closeSubComment');
        $lastSlide = null;
        if (subLoadHash[rid] === IS_LOADING) {
          subLoadHash[rid] = NOT_LOADED;
        }
      } else {
        $lastSlide = $slide;
        $slide.addClass('on');
        self.emit('chooseSubComment', $slide.attr('rid'), $slide.attr('cid'), $slide.attr('name'));
        var state = subLoadHash[rid];
        if (state === HAS_LOADED || state === IS_LOADING) {
          $list2.css('height', 'auto');
        } else {
          $list2.css('height', 'auto');
          subLoadHash[rid] = IS_LOADING;
          ajax = _net2.default.postJSON(self.props.subUrl, { RootID: rid, Skip: 0, Take: Take }, function (res) {
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
    key: 'clearData',
    value: function clearData() {
      if (ajax) {
        ajax.abort();
      }
      this.message = '';
      this.setData();
      subLoadHash = {};
      subSkipHash = {};
      $lastSlide = null;
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
      var li = this.genChildComment(item);
      var $comment = $('#comment_' + item.RootID);
      var $list2 = $comment.find('.list2');
      var $ul = $list2.find('ul');
      li.prependTo($ul[0]);
      $list2.css('height', $ul.height());
      var $num = $comment.find('.slide small');
      $num.text((parseInt($num.text()) || 0) + 1);
    }
  }, {
    key: 'genComment',
    value: function genComment(item) {
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), migi.createVd("a", [["class", "share"], ["href", '/?cid=' + item.Send_ID], ["target", "_blank"]], ["分享"]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [], [item.sub_Count]), migi.createVd("span", [], ["收起"])])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [item.Send_Content])])]);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-comment"]], [migi.createVd("ul", [["class", "list"], ["ref", "list"], ["dangerouslySetInnerHTML", this.html]]), migi.createVd("p", [["class", new migi.Obj("message", this, function () {
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

  return Comment;
}(migi.Component);

migi.name(Comment, "Comment");exports.default = Comment;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(4);

var _authorTemplate2 = _interopRequireDefault(_authorTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var choosedL2 = {};
var all = void 0;
var cacheL2 = {};

var DoubleCheck = function (_migi$Component) {
  _inherits(DoubleCheck, _migi$Component);

  function DoubleCheck() {
    var _ref;

    _classCallCheck(this, DoubleCheck);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = DoubleCheck.__proto__ || Object.getPrototypeOf(DoubleCheck)).call.apply(_ref, [this].concat(data)));

    _this.tagList = _this.props.tags.FilterlevelA;
    _this.tagList2 = _this.props.tags.FilterlevelB;
    all = _this.tagList2;
    _this.on(migi.Event.DOM, function () {
      this.autoWidth();
      this.autoWidth2();
    });
    return _this;
  }

  _createClass(DoubleCheck, [{
    key: "setData",
    value: function setData(v) {
      this.tagList = v.FilterlevelA;
      this.autoWidth();
      this.tagList2 = v.FilterlevelB;
      this.autoWidth2();
      all = this.tagList2;
    }
  }, {
    key: "setCacheL2",
    value: function setCacheL2(k, v) {
      cacheL2[k] = v;
    }
  }, {
    key: "clickL1",
    value: function clickL1(e, vd, tvd) {
      e.preventDefault();
      var $ul = $(vd.element);
      var $li = $(tvd.element);
      $li.toggleClass('on');
      var $allLis = $ul.find('li');
      var $lis = $ul.find('.on');
      // 只有1个和都没选为全部
      if ($allLis.length === 1 || !$lis[0]) {
        this.tagList2 = all;
        this.checkL2();
        this.change();
      } else {
        var param = [];
        $lis.each(function (index, li) {
          var $li = $(li);
          param.push({
            Filterlevel: $li.attr('tagID')
          });
        });
        param = JSON.stringify(param);
        if (cacheL2[param]) {
          this.tagList2 = cacheL2[param];
          this.checkL2();
          this.change();
        } else {
          this.emit('changeL1', param);
        }
      }
    }
  }, {
    key: "clickL2",
    value: function clickL2(e, vd, tvd) {
      e.preventDefault();
      if ($(vd.element).hasClass('loading')) {
        return;
      }
      var $li = $(tvd.element);
      $li.toggleClass('on');
      var name = $li.text();
      choosedL2[name] = $li.hasClass('on');
      this.change();
    }
  }, {
    key: "checkL2",
    value: function checkL2() {
      // 遍历l2标签，chossed中没有的删除
      var hash = {};
      $(this.ref.l2.element).find('li.on').each(function (i, li) {
        var $li = $(li);
        hash[$li.text()] = true;
      });
      Object.keys(choosedL2).forEach(function (key) {
        if (!hash[key]) {
          choosedL2[key] = false;
        }
      });
    }
  }, {
    key: "change",
    value: function change() {
      var self = this;
      var $lis = $(self.ref.l1.element).find('li.on');
      var lA = [];
      $lis.each(function (i, li) {
        var index = $(li).attr('rel');
        var item = self.tagList[index];
        lA.push({
          ID: item.ID,
          TagType: 0,
          Filterlevel: 'A',
          ParameterAName: item.TagName
        });
      });
      var lB = [];
      this.tagList2.forEach(function (item) {
        var key = item.TagName;
        if (choosedL2[key]) {
          lB.push({
            ID: item.ID,
            TagType: item.TagType,
            Filterlevel: item.Filterlevel,
            ParameterAName: item.TagName
          });
        }
      });
      this.emit('change', lA, lB);
    }
  }, {
    key: "autoWidth",
    value: function autoWidth() {
      var $li = $(this.ref.l1.element);
      var $c = $li.find('.c');
      $c.css('width', '999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: "autoWidth2",
    value: function autoWidth2() {
      var $li = $(this.ref.l2.element);
      var $c = $li.find('.c');
      $c.css('width', '999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-doublecheck"]], [migi.createVd("div", [["class", "l1"], ["ref", "l1"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickL1)]]]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [], [new migi.Obj("tagList", this, function () {
        return this.tagList.map(function (item, i) {
          var type = _authorTemplate2.default.code2Data[item.TagName];
          return migi.createVd("li", [["rel", i], ["tagType", item.TagType], ["tagID", item.ID]], [migi.createVd("a", [["href", "#"]], [migi.createVd("span", [], [type ? type.name : item.TagName])])]);
        });
      })])])]), migi.createVd("div", [["class", new migi.Obj("isLoadindL2", this, function () {
        return 'l2' + (this.isLoadindL2 ? ' loading' : '');
      })], ["ref", "l2"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickL2)]]]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [], [new migi.Obj("tagList2", this, function () {
        return this.tagList2.map(function (item, i) {
          var key = 'id' + item.ID + ',type' + item.TagType;
          return migi.createVd("li", [["rel", i], ["tagType", item.TagType], ["tagID", item.ID], ["class", choosedL2[key] ? 'on' : '']], [migi.createVd("a", [["href", "#"]], [migi.createVd("span", [], [item.TagName])])]);
        });
      })])])])]);
    }
  }, {
    key: "tagList",
    get: function get() {
      return this._tagList || [];
    },
    set: function set(v) {
      this._tagList = v;
      ;this.__array("tagList", v);this.__data("tagList");
    }
  }, {
    key: "tagList2",
    get: function get() {
      return this._tagList2 || [];
    },
    set: function set(v) {
      this._tagList2 = v;
      ;this.__array("tagList2", v);this.__data("tagList2");
    }
  }, {
    key: "isLoadindL2",
    set: function set(v) {
      this.__setBind("isLoadindL2", v);this.__data("isLoadindL2");
    },
    get: function get() {
      return this.__getBind("isLoadindL2");
    }
  }]);

  return DoubleCheck;
}(migi.Component);

migi.name(DoubleCheck, "DoubleCheck");exports.default = DoubleCheck;

/***/ }),
/* 8 */
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

    _this.dataList = _this.props.dataList || [];
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
    key: "click",
    value: function click(e, vd, tvd) {
      var authorID = tvd.props.authorID;
      if (authorID) {
        _util2.default.goto('/author/' + authorID);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotauthor"]], [migi.createVd("h3", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          var types = item.WorksType || [];
          return migi.createVd("li", [], [migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.img90_90(item.Head_url) || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']]), types.slice(0, 2).map(function (item) {
            return migi.createVd("b", [["class", "cp-author_type" + item]]);
          })]), migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "txt"]], [item.AuthorName]), migi.createVd("div", [["class", "info"]], ["合作", item.CooperationTimes, "次"])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotAuthor;
}(migi.Component);

migi.name(HotAuthor, "HotAuthor");exports.default = HotAuthor;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotCollection = function (_migi$Component) {
  _inherits(HotCollection, _migi$Component);

  function HotCollection() {
    var _ref;

    _classCallCheck(this, HotCollection);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = HotCollection.__proto__ || Object.getPrototypeOf(HotCollection)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(HotCollection, [{
    key: "autoWidth",
    value: function autoWidth() {
      var $list = $(this.ref.list.element);
      var $c = $list.find('.c');
      $c.width('css', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotcollection"]], [migi.createVd("h3", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [(this.list || []).map(function (item) {
          if (item.type === 'audio') {
            return migi.createVd("li", [], [migi.createVd("div", [["class", "pic"]], [migi.createVd("div", [["class", "bg3"]]), migi.createVd("div", [["class", "bg2"]]), migi.createVd("div", [["class", "bg"]]), migi.createVd("div", [["class", "mask"]]), migi.createVd("div", [["class", "num"]], [migi.createVd("b", [["class", "audio"]]), "66w"]), migi.createVd("div", [["class", "ath"]], [item.author])]), migi.createVd("p", [["class", "txt"]], ["名字"])]);
          }
          return migi.createVd("li", [], [migi.createVd("div", [["class", "pic"]], [migi.createVd("div", [["class", "bg3"]]), migi.createVd("div", [["class", "bg2"]]), migi.createVd("div", [["class", "bg"]]), migi.createVd("img", [["src", item.img]]), migi.createVd("div", [["class", "mask"]]), migi.createVd("div", [["class", "num"]], [migi.createVd("b", [["class", "video"]]), item.num]), migi.createVd("div", [["class", "ath"]], [item.author])]), migi.createVd("p", [["class", "txt"]], [item.name])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })])])]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return HotCollection;
}(migi.Component);

migi.name(HotCollection, "HotCollection");exports.default = HotCollection;

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

    _this.dataList = _this.props.dataList || [];
    _this.on(migi.Event.DOM, function () {
      this.autoWidth();
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
      var authorId = this.props.authorId;
      return migi.createVd("div", [["class", "cp-hotwork"]], [migi.createVd("h3", [], [this.props.title]), migi.createVd("div", [["class", "list"], ["ref", "list"]], [migi.createVd("div", [["class", "c"]], [new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [], [this.dataList.map(function (item) {
          // let myAuthor;
          // let workAuthors = '';
          // let authorList = item.Works_Items[0].Works_Item_Author;
          // authorList.forEach(function(item) {
          //   if(item.ID === authorId) {
          //     myAuthor = item;
          //   }
          // });
          // if(myAuthor) {
          //   // 如果是歌手，将其它歌手&链接并加上with
          //   if(myAuthor.WorksAuthorType === AuthorType.CODE.演唱) {
          //     let authors = [];
          //     authorList.forEach(function(item) {
          //       if(item.ID !== authorId) {
          //         authors.push(item.AuthName);
          //       }
          //     });
          //     if(authors.length) {
          //       workAuthors = 'with ' + authors.join('&');
          //     }
          //   }
          //   // 其它类型将歌手全部展示
          //   else {
          //     let authors = [];
          //     authorList.forEach(function(item) {
          //       if(item.ID !== authorId) {
          //         authors.push(item.AuthName);
          //       }
          //     });
          //     if(authors.length) {
          //       workAuthors = authors.join('&');
          //     }
          //   }
          // }
          // // 其它类型将歌手全部展示
          // else {
          //   let authors = [];
          //   authorList.forEach(function(item) {
          //     if(item.AuthorID !== authorId) {
          //       authors.push(item.AuthName);
          //     }
          //   });
          //   if(authors.length) {
          //     workAuthors = authors.join('&');
          //   }
          // }
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.img150_150(item.cover_Pic) || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "num"]], [migi.createVd("b", [["class", "audio"]]), item.Popular]), migi.createVd("div", [["class", "ath"]], [''])]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "txt"]], [item.Title])]);
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

var PlayList = function (_migi$Component) {
  _inherits(PlayList, _migi$Component);

  function PlayList() {
    var _ref;

    _classCallCheck(this, PlayList);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = PlayList.__proto__ || Object.getPrototypeOf(PlayList)).call.apply(_ref, [this].concat(data)));

    _this.dataList = _this.props.dataList || [];
    return _this;
  }

  _createClass(PlayList, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-playlist"]], [migi.createVd("ul", [["class", "list"], ["ref", "list"]], [new migi.Obj("dataList", this, function () {
        return this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.img100_100(item.cover_Pic) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [["class", "txt"], ["worksId", item.WorksID || item.WorkID]], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "name"]], [item.Title]), migi.createVd("p", [["class", "intro"]], [item.sub_Title])])]);
        });
      })])]);
    }
  }, {
    key: "dataList",
    set: function set(v) {
      this.__setBind("dataList", v);this.__data("dataList");
    },
    get: function get() {
      if (this.__initBind("dataList")) this.__setBind("dataList", []);return this.__getBind("dataList");
    }
  }]);

  return PlayList;
}(migi.Component);

migi.name(PlayList, "PlayList");exports.default = PlayList;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Nav = __webpack_require__(30);

var _Nav2 = _interopRequireDefault(_Nav);

var _Home = __webpack_require__(28);

var _Home2 = _interopRequireDefault(_Home);

var _Work = __webpack_require__(33);

var _Work2 = _interopRequireDefault(_Work);

var _AuthorComment = __webpack_require__(27);

var _AuthorComment2 = _interopRequireDefault(_AuthorComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Author = function (_migi$Component) {
  _inherits(Author, _migi$Component);

  function Author() {
    var _ref;

    _classCallCheck(this, Author);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Author.__proto__ || Object.getPrototypeOf(Author)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.authorID = self.props.authorID;
    self.on(migi.Event.DOM, function () {
      var nav = self.ref.nav;
      var tags = nav.ref.tags;
      var home = self.ref.home;
      var work = self.ref.work;
      var authorComment = self.ref.authorComment;
      tags.on('change', function (i) {
        home && home.hide();
        work && work.hide();
        authorComment && authorComment.hide();
        switch (i) {
          case '0':
            home.show();
            break;
          case '1':
            work.show();
            break;
          case '2':
            authorComment.show();
            break;
        }
      });
      // setTimeout(function() {
      //   tags.emit('change', '1');
      // }, 100);
    });
    return _this;
  }

  _createClass(Author, [{
    key: 'setID',
    value: function setID(authorID) {
      var self = this;
      self.authorID = authorID;
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      var nav = self.ref.nav;
      var profile = nav.ref.profile;
      var link = nav.ref.link;
      util.postJSON('api/author/GetAuthorDetails', { AuthorID: self.authorID }, function (res) {
        if (res.success) {
          var data = res.data;

          profile.headUrl = data.Head_url;
          profile.authorID = data.AuthorID;
          profile.authorName = data.AuthorName;
          profile.type = data.Authortype;
          profile.sign = data.Sign;
          profile.fansNumber = data.FansNumber;
          profile.isLike = data.IsLike;
          profile.loading = false;

          link._5SingUrl = data._5SingUrl;
          link._BilibiliUrl = data._BilibiliUrl;
          link._BaiduUrl = data._BaiduUrl;
          link._WangyiUrl = data._WangyiUrl;
          link._WeiboUrl = data._WeiboUrl;
          link.autoWidth();
        } else {
          alert(res.message || util.ERROR_MESSAGE);
        }
      }, function (res) {
        // alert(res.message || util.ERROR_MESSAGE);
      });
      var home = self.ref.home;
      home.load(self.authorID);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "author"]], [migi.createCp(_Nav2.default, [["ref", "nav"], ["authorID", this.props.authorID], ["authorDetail", this.props.authorDetail]]), migi.createCp(_Home2.default, [["ref", "home"], ["authorID", this.props.authorID], ["homeDetail", this.props.homeDetail]]), migi.createCp(_Work2.default, [["ref", "work"], ["authorID", this.props.authorID], ["tags", this.props.tags], ["playList", this.props.playList]]), migi.createCp(_AuthorComment2.default, [["ref", "authorComment"], ["authorID", this.props.authorID], ["commentData", this.props.commentData]])]);
    }
  }, {
    key: 'authorID',
    set: function set(v) {
      this.__setBind("authorID", v);this.__data("authorID");
    },
    get: function get() {
      return this.__getBind("authorID");
    }
  }]);

  return Author;
}(migi.Component);

migi.name(Author, "Author");exports.default = Author;

/***/ }),
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _Comment = __webpack_require__(6);

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var skip = -1;
var take = 10;
var sortType = 0;
var myComment = 0;
var currentCount = 0;
var ajax = void 0;
var ajaxMore = void 0;
var loadEnd = void 0;

var AuthorComment = function (_migi$Component) {
  _inherits(AuthorComment, _migi$Component);

  function AuthorComment() {
    var _ref;

    _classCallCheck(this, AuthorComment);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = AuthorComment.__proto__ || Object.getPrototypeOf(AuthorComment)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.authorID = self.props.authorID;
    var commentData = self.props.commentData;
    currentCount = commentData.Size;
    skip += take;
    self.on(migi.Event.DOM, function () {
      var $window = $(window);
      $window.on('scroll', function () {
        self.checkMore();
      });
      var comment = self.ref.comment;
      comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
      comment.on('closeSubComment', function () {
        self.clickReplay();
      });
    });
    return _this;
  }

  _createClass(AuthorComment, [{
    key: 'show',
    value: function show() {
      var self = this;
      $(self.element).removeClass('fn-hide');
      self.showComment = true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var self = this;
      $(self.element).addClass('fn-hide');
      self.showComment = false;
      skip = -1;
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      self.ref.comment.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      if (ajaxMore) {
        ajaxMore.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/author/commentList', { authorID: self.authorID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          currentCount = data.Size;
          skip += take;
          if (data.data.length) {
            self.ref.comment.message = '';
            self.ref.comment.appendData(res.data.data);
          } else {
            self.ref.comment.appendData(res.data.data);
            self.ref.comment.message = '暂无评论';
            loadEnd = true;
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          self.ref.comment.message = res.message || _util2.default.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        self.ref.comment.message = res.message || _util2.default.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'checkMore',
    value: function checkMore() {
      var $window = $(window);
      var self = this;
      var WIN_HEIGHT = $window.height();
      var HEIGHT = $(document.body).height();
      var bool = void 0;
      bool = $window.scrollTop() + WIN_HEIGHT + 30 > HEIGHT;
      if (self.showComment && !self.loading && !loadEnd && bool) {
        self.loading = true;
        ajaxMore = _net2.default.postJSON('/api/author/commentList', { authorID: self.authorID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
          if (res.success) {
            var data = res.data;
            currentCount = data.Size;
            skip += take;
            if (data.data.length) {
              self.ref.comment.appendData(data.data);
              if (data.data.length < take) {
                self.ref.comment.message = '已经到底了';
                loadEnd = true;
              }
            } else {
              loadEnd = true;
              self.ref.comment.message = '已经到底了';
            }
          } else {
            self.ref.comment.message = res.message || _util2.default.ERROR_MESSAGE;
          }
          self.loading = false;
        }, function (res) {
          self.ref.comment.message = res.message || _util2.default.ERROR_MESSAGE;
          self.loading = false;
        });
      }
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
      skip = -1;
      if (ajax) {
        ajax.abort();
      }
      if (ajaxMore) {
        ajaxMore.abort();
      }
      loadEnd = false;
      this.loading = false;
      this.ref.comment.clearData();
      this.load();
    }
  }, {
    key: 'switchType2',
    value: function switchType2(e, vd) {
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
      if (ajaxMore) {
        ajaxMore.abort();
      }
      loadEnd = false;
      this.loading = false;
      this.ref.comment.clearData();
      this.load();
    }
  }, {
    key: 'clickReplay',
    value: function clickReplay() {
      this.replayId = null;
      this.replayName = null;
      this.rootId = null;
    }
  }, {
    key: 'input',
    value: function input(e, vd) {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        $(vd.element).blur();
      } else {
        var v = $(vd.element).val().trim();
        this.hasContent = v.length > 0;
      }
    }
  }, {
    key: 'focus',
    value: function focus(e, vd) {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        $(vd.element).blur();
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      if (self.hasContent) {
        var $input = $(this.ref.input.element);
        var Content = $input.val();
        var ParentID = self.replayId !== null ? self.replayId : -1;
        var RootID = self.rootId !== null ? self.rootId : -1;
        self.loading = true;
        _net2.default.postJSON('api/author/AddComment', {
          ParentID: ParentID,
          RootID: RootID,
          Content: Content,
          AuthorCommentID: self.authorID
        }, function (res) {
          if (res.success) {
            self.ref.comment.element.scrollIntoView();
            $input.val('');
            self.hasContent = false;
            if (RootID === -1) {
              self.ref.comment.prependData(res.data);
              self.ref.comment.message = '';
            } else {
              self.ref.comment.prependChild(res.data);
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          self.loading = false;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "comments fn-hide"]], [migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部"]), migi.createVd("li", [["rel", "1"]], ["我的"])]), migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "api/author/AddWorkCommentLike"], ["subUrl", "api/author/GetTocomment_T_List"], ["delUrl", "api/author/DeleteCommentByID"], ["data", this.props.commentData.data]]), migi.createVd("div", [["class", "form"]], [migi.createVd("div", [["class", new migi.Obj("replayId", this, function () {
        return 'reply' + (this.replayId ? '' : ' fn-hide');
      })], ["onClick", new migi.Cb(this, this.clickReplay)]], [new migi.Obj("replayName", this, function () {
        return this.replayName;
      })]), migi.createVd("div", [["class", "inputs"]], [migi.createVd("input", [["ref", "input"], ["type", "text"], ["placeholder", "回复..."], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)], ["class", new migi.Obj(["hasContent", "loading"], this, function () {
        return this.hasContent && !this.loading ? '' : 'dis';
      })]], ["确定"])])]);
    }
  }, {
    key: 'showComment',
    set: function set(v) {
      this.__setBind("showComment", v);this.__data("showComment");
    },
    get: function get() {
      return this.__getBind("showComment");
    }
  }, {
    key: 'rootId',
    set: function set(v) {
      this.__setBind("rootId", v);this.__data("rootId");
    },
    get: function get() {
      if (this.__initBind("rootId")) this.__setBind("rootId", null);return this.__getBind("rootId");
    }
  }, {
    key: 'replayId',
    set: function set(v) {
      this.__setBind("replayId", v);this.__data("replayId");
    },
    get: function get() {
      if (this.__initBind("replayId")) this.__setBind("replayId", null);return this.__getBind("replayId");
    }
  }, {
    key: 'replayName',
    set: function set(v) {
      this.__setBind("replayName", v);this.__data("replayName");
    },
    get: function get() {
      return this.__getBind("replayName");
    }
  }, {
    key: 'hasContent',
    set: function set(v) {
      this.__setBind("hasContent", v);this.__data("hasContent");
    },
    get: function get() {
      return this.__getBind("hasContent");
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
    key: 'authorID',
    set: function set(v) {
      this.__setBind("authorID", v);this.__data("authorID");
    },
    get: function get() {
      return this.__getBind("authorID");
    }
  }]);

  return AuthorComment;
}(migi.Component);

migi.name(AuthorComment, "AuthorComment");exports.default = AuthorComment;

/***/ }),
/* 28 */
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

var _HotWork = __webpack_require__(10);

var _HotWork2 = _interopRequireDefault(_HotWork);

var _HotCollection = __webpack_require__(9);

var _HotCollection2 = _interopRequireDefault(_HotCollection);

var _HotAuthor = __webpack_require__(8);

var _HotAuthor2 = _interopRequireDefault(_HotAuthor);

var _Dynamic = __webpack_require__(34);

var _Dynamic2 = _interopRequireDefault(_Dynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_migi$Component) {
  _inherits(Home, _migi$Component);

  function Home() {
    var _ref;

    _classCallCheck(this, Home);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Home, [{
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
    key: 'load',
    value: function load(authorID) {
      var self = this;
      var hotWork = self.ref.hotWork;
      var hotAuthor = self.ref.hotAuthor;
      _net2.default.postJSON('api/author/GetAuthorHomePage', { AuthorID: authorID }, function (res) {
        if (res.success) {
          var data = res.data;
          hotWork.dataList = data.Hot_Works_Items;
          hotWork.autoWidth();
          hotAuthor.dataList = data.AuthorToAuthor;
          hotAuthor.autoWidth();
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        // alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "home"]], [migi.createCp(_HotWork2.default, [["ref", "hotWork"], ["title", "主打作品"], ["dataList", this.props.homeDetail.Hot_Works_Items]]), migi.createCp(_HotCollection2.default, [["ref", "hotCollection"], ["title", "专辑"]]), migi.createCp(_HotAuthor2.default, [["ref", "hotAuthor"], ["title", "朋友"], ["dataList", this.props.homeDetail.AuthorToAuthor]]), migi.createVd("h5", [["class", "dynamic"]], ["全网动态"]), migi.createCp(_Dynamic2.default, [])]);
    }
  }]);

  return Home;
}(migi.Component);

migi.name(Home, "Home");exports.default = Home;

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

var Link = function (_migi$Component) {
  _inherits(Link, _migi$Component);

  function Link() {
    var _ref;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self._5SingUrl = self.props.authorDetail._5SingUrl;
    self._BilibiliUrl = self.props.authorDetail._BilibiliUrl;
    self._BaiduUrl = self.props.authorDetail._BaiduUrl;
    self._WangyiUrl = self.props.authorDetail._WangyiUrl;
    self._WeiboUrl = self.props.authorDetail._WeiboUrl;
    self.on(migi.Event.DOM, function () {
      self.autoWidth();
    });
    return _this;
  }

  _createClass(Link, [{
    key: 'autoWidth',
    value: function autoWidth() {
      var $root = $(this.element);
      var $c = $root.find('.c');
      $c.css('width', '9999rem');
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "link"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [], [migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", new migi.Obj("_5SingUrl", this, function () {
        return this._5SingUrl;
      })], ["class", new migi.Obj("_5SingUrl", this, function () {
        return this._5SingUrl ? '' : 'fn-hide';
      })]], [migi.createVd("span", [], ["5sing"])])]), migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", new migi.Obj("_BilibiliUrl", this, function () {
        return this._BilibiliUrl;
      })], ["class", new migi.Obj("_BilibiliUrl", this, function () {
        return this._BilibiliUrl ? 'bili' : 'fn-hide';
      })]], [migi.createVd("span", [], ["b站"])])]), migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", new migi.Obj("_BaiduUrl", this, function () {
        return this._BaiduUrl;
      })], ["class", new migi.Obj("_BaiduUrl", this, function () {
        return this._BaiduUrl ? 'baidu' : 'fn-hide';
      })]], [migi.createVd("span", [], ["百度"])])]), migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", new migi.Obj("_WangyiUrl", this, function () {
        return this._WangyiUrl;
      })], ["class", new migi.Obj("_WangyiUrl", this, function () {
        return this._WangyiUrl ? 'wangyi' : 'fn-hide';
      })]], [migi.createVd("span", [], ["网易"])])]), migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", new migi.Obj("_WeiboUrl", this, function () {
        return this._WeiboUrl;
      })], ["class", new migi.Obj("_WeiboUrl", this, function () {
        return this._WeiboUrl ? 'weibo' : 'fn-hide';
      })]], [migi.createVd("span", [], ["微博"])])])])])]);
    }
  }, {
    key: '_5SingUrl',
    set: function set(v) {
      this.__setBind("_5SingUrl", v);this.__data("_5SingUrl");
    },
    get: function get() {
      return this.__getBind("_5SingUrl");
    }
  }, {
    key: '_BilibiliUrl',
    set: function set(v) {
      this.__setBind("_BilibiliUrl", v);this.__data("_BilibiliUrl");
    },
    get: function get() {
      return this.__getBind("_BilibiliUrl");
    }
  }, {
    key: '_BaiduUrl',
    set: function set(v) {
      this.__setBind("_BaiduUrl", v);this.__data("_BaiduUrl");
    },
    get: function get() {
      return this.__getBind("_BaiduUrl");
    }
  }, {
    key: '_WangyiUrl',
    set: function set(v) {
      this.__setBind("_WangyiUrl", v);this.__data("_WangyiUrl");
    },
    get: function get() {
      return this.__getBind("_WangyiUrl");
    }
  }, {
    key: '_WeiboUrl',
    set: function set(v) {
      this.__setBind("_WeiboUrl", v);this.__data("_WeiboUrl");
    },
    get: function get() {
      return this.__getBind("_WeiboUrl");
    }
  }]);

  return Link;
}(migi.Component);

migi.name(Link, "Link");exports.default = Link;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Profile = __webpack_require__(31);

var _Profile2 = _interopRequireDefault(_Profile);

var _Link = __webpack_require__(29);

var _Link2 = _interopRequireDefault(_Link);

var _Tags = __webpack_require__(32);

var _Tags2 = _interopRequireDefault(_Tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_migi$Component) {
  _inherits(Nav, _migi$Component);

  function Nav() {
    var _ref;

    _classCallCheck(this, Nav);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Nav.__proto__ || Object.getPrototypeOf(Nav)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "nav"]], [migi.createVd("div", [["class", "bg"]]), migi.createCp(_Profile2.default, [["ref", "profile"], ["authorID", this.props.authorID], ["authorDetail", this.props.authorDetail]]), migi.createCp(_Link2.default, [["ref", "link"], ["authorDetail", this.props.authorDetail]]), migi.createCp(_Tags2.default, [["ref", "tags"]])]);
    }
  }]);

  return Nav;
}(migi.Component);

migi.name(Nav, "Nav");exports.default = Nav;

/***/ }),
/* 31 */
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

var _authorTemplate = __webpack_require__(4);

var _authorTemplate2 = _interopRequireDefault(_authorTemplate);

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

    _this.authorID = _this.props.authorID;
    _this.authorName = _this.props.authorDetail.AuthorName;
    _this.sign = _this.props.authorDetail.Sign;
    _this.headUrl = _this.props.authorDetail.Head_url;
    _this.fansNumber = _this.props.authorDetail.FansNumber;
    _this.isLike = _this.props.authorDetail.IsLike;
    _this.type = _this.props.authorDetail.Authortype;
    return _this;
  }

  _createClass(Profile, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      self.loading = true;
      if (self.isLike) {
        _net2.default.postJSON('api/author/RemoveAuthorToUser', { Author: self.authorID }, function (res) {
          if (res.success) {
            self.isLike = false;
            self.fansNumber = res.data.followCount;
            alert('取关成功');
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          self.loading = false;
        });
      } else {
        _net2.default.postJSON('api/author/SaveAuthorToUser', { Author: self.authorID }, function (res) {
          if (res.success) {
            self.isLike = true;
            self.fansNumber = res.data.followCount;
            alert('关注成功');
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          self.loading = false;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "profile"]], [migi.createVd("div", [["class", "pic"]], [migi.createVd("img", [["src", new migi.Obj("headUrl", this, function () {
        return this.headUrl || '//zhuanquan.xin/img/c370ff3fa46f4273d0f73147459a43d8.png';
      })]]), migi.createVd("b", [["class", "v"]])]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [["class", "n"]], [migi.createVd("h3", [], [new migi.Obj("authorName", this, function () {
        return this.authorName || '&nbsp;';
      })]), new migi.Obj("authorType", this, function () {
        return this.authorType.map(function (item) {
          return migi.createVd("span", [["class", 'cp-author-type-' + item]]);
        });
      })]), migi.createVd("p", [["class", "intro"]], [new migi.Obj("sign", this, function () {
        return this.sign || '&nbsp;';
      })]), migi.createVd("div", [["class", "o"]], [migi.createVd("div", [["class", "fans"]], [migi.createVd("strong", [], [new migi.Obj("fansNumber", this, function () {
        return this.fansNumber || '0';
      })]), migi.createVd("span", [], ["粉丝"])]), migi.createVd("div", [["class", "hot"]], [migi.createVd("div", [["class", "line"]], [migi.createVd("b", [["class", "progress"]]), migi.createVd("b", [["class", "point"]])]), migi.createVd("span", [], ["热度"])]), migi.createVd("a", [["href", "#"], ["class", new migi.Obj("isLike", this, function () {
        return this.isLike ? 'support' : 'follow';
      })], ["onClick", new migi.Cb(this, this.click)]], [new migi.Obj("isLike", this, function () {
        return this.isLike ? '取关' : '关注';
      })])])])]);
    }
  }, {
    key: 'authorID',
    set: function set(v) {
      this.__setBind("authorID", v);this.__data("authorID");
    },
    get: function get() {
      return this.__getBind("authorID");
    }
  }, {
    key: 'authorName',
    set: function set(v) {
      this.__setBind("authorName", v);this.__data("authorName");
    },
    get: function get() {
      return this.__getBind("authorName");
    }
  }, {
    key: 'sign',
    set: function set(v) {
      this.__setBind("sign", v);this.__data("sign");
    },
    get: function get() {
      return this.__getBind("sign");
    }
  }, {
    key: 'authorType',
    set: function set(v) {
      this.__setBind("authorType", v);this.__data("authorType");
    },
    get: function get() {
      if (this.__initBind("authorType")) this.__setBind("authorType", []);return this.__getBind("authorType");
    }
  }, {
    key: 'headUrl',
    set: function set(v) {
      this.__setBind("headUrl", v);this.__data("headUrl");
    },
    get: function get() {
      return this.__getBind("headUrl");
    }
  }, {
    key: 'fansNumber',
    set: function set(v) {
      this.__setBind("fansNumber", v);this.__data("fansNumber");
    },
    get: function get() {
      return this.__getBind("fansNumber");
    }
  }, {
    key: 'isLike',
    set: function set(v) {
      this.__setBind("isLike", v);this.__data("isLike");
    },
    get: function get() {
      return this.__getBind("isLike");
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
    key: 'type',
    set: function set(v) {
      v = v || [];
      var hash = {};
      v.forEach(function (item) {
        var css = _authorTemplate2.default.code2Data[item.AuthorTypeID].css;
        hash[css] = true;
      });
      this.authorType = Object.keys(hash);
    }
  }]);

  return Profile;
}(migi.Component);

migi.name(Profile, "Profile");exports.default = Profile;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tags = function (_migi$Component) {
  _inherits(Tags, _migi$Component);

  function Tags() {
    var _ref;

    _classCallCheck(this, Tags);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Tags.__proto__ || Object.getPrototypeOf(Tags)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Tags, [{
    key: 'click',
    value: function click(e, vd, tvd) {
      var $ul = $(this.element).find('ul');
      var $li = $(tvd.element);
      if ($li.hasClass('cur')) {
        return;
      }
      $ul.find('.cur').removeClass('cur');
      $li.addClass('cur');
      this.emit('change', $li.attr('rel'));
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "tags"]], [migi.createVd("ul", [["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.click)]]]], [migi.createVd("li", [["class", "item cur"], ["rel", "0"]], [migi.createVd("span", [], ["主页"])]), migi.createVd("li", [["class", "item"], ["rel", "1"]], [migi.createVd("span", [], ["作品"])]), migi.createVd("li", [["class", "item"], ["rel", "2"]], [migi.createVd("span", [], ["留言"])])])]);
    }
  }]);

  return Tags;
}(migi.Component);

migi.name(Tags, "Tags");exports.default = Tags;

/***/ }),
/* 33 */
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

var _DoubleCheck = __webpack_require__(7);

var _DoubleCheck2 = _interopRequireDefault(_DoubleCheck);

var _PlayList = __webpack_require__(11);

var _PlayList2 = _interopRequireDefault(_PlayList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajax = void 0;
var SortType = '1';
var parameter = '';
var ajaxL2 = void 0;

var Work = function (_migi$Component) {
  _inherits(Work, _migi$Component);

  function Work() {
    var _ref;

    _classCallCheck(this, Work);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Work.__proto__ || Object.getPrototypeOf(Work)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.authorID = self.props.authorID;
    self.on(migi.Event.DOM, function () {
      var doubleCheck = self.ref.doubleCheck;
      doubleCheck.on('changeL1', function (param) {
        if (param) {
          if (ajaxL2) {
            ajaxL2.abort();
          }
          doubleCheck.isLoadindL2 = true;
          _net2.default.postJSON('/api/author/tagB', { authorID: self.authorID, tagA: param }, function (res) {
            if (res.success) {
              var _data = res.data;
              doubleCheck.tagList2 = _data;
              doubleCheck.autoWidth2();
              doubleCheck.setCacheL2(param, _data);
              doubleCheck.checkL2();
              doubleCheck.change();
            }
            doubleCheck.isLoadindL2 = false;
          }, function () {
            doubleCheck.isLoadindL2 = false;
          });
        }
      });
      doubleCheck.on('change', function (lA, lB) {
        var temp = lA.concat(lB);
        temp = temp.length ? JSON.stringify(temp) : '';
        if (temp !== parameter) {
          parameter = temp;
          self.loadPlayList();
        }
      });
    });
    return _this;
  }

  _createClass(Work, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      this.ref.doubleCheck.autoWidth();
      this.ref.doubleCheck.autoWidth2();
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      _net2.default.postJSON('/api/author/GetAuthorWorks', { AuthorID: self.authorID }, function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.doubleCheck.setData(data);
        }
      });
      self.loadPlayList();
    }
  }, {
    key: 'loadPlayList',
    value: function loadPlayList() {
      var self = this;
      if (ajax) {
        ajax.abort();
      }
      ajax = _net2.default.postJSON('/api/author/playList', { authorID: self.authorID, parameter: parameter }, function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.playList.setData(data.data);
        }
      });
    }
  }, {
    key: 'switchType',
    value: function switchType(e, vd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      SortType = $ul.find('.cur').attr('rel');
      this.loadPlayList();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "works fn-hide"]], [migi.createCp(_DoubleCheck2.default, [["ref", "doubleCheck"], ["tags", this.props.tags]]), migi.createVd("div", [["class", "bar fn-hide"]], [migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [["class", "all"]], ["播放全部"]), migi.createVd("li", [["class", "audio"]], []), migi.createVd("li", [["class", "video"]], [])]), migi.createVd("ul", [["class", "type fn-clear"], ["onClick", new migi.Cb(this, this.switchType)]], [migi.createVd("li", [["class", "cur"], ["rel", "1"]], ["最热"]), migi.createVd("li", [["rel", "0"]], ["最新"])])]), migi.createCp(_PlayList2.default, [["ref", "playList"], ["dataList", this.props.playList.data]])]);
    }
  }, {
    key: 'authorID',
    set: function set(v) {
      this.__setBind("authorID", v);this.__data("authorID");
    },
    get: function get() {
      return this.__getBind("authorID");
    }
  }]);

  return Work;
}(migi.Component);

migi.name(Work, "Work");exports.default = Work;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dynamics = function (_migi$Component) {
  _inherits(Dynamics, _migi$Component);

  function Dynamics() {
    var _ref;

    _classCallCheck(this, Dynamics);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Dynamics.__proto__ || Object.getPrototypeOf(Dynamics)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Dynamics, [{
    key: "click",
    value: function click(e, vd, tvd) {
      var url = tvd.props.href;
      jsBridge.openUri(url);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-dynamic"]], [migi.createVd("ul", [["class", new migi.Obj("list", this, function () {
        return this.list.length ? '' : 'fn-hide';
      })], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.click)]]]], [new migi.Obj("list", this, function () {
        return this.list.map(function (item) {
          return migi.createVd("li", [["href", item.DynamicUrl]], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["class", "user"]], [migi.createVd("div", [["class", "head fn-clear"]], [migi.createVd("img", [["src", item.AuthorHeadUrl]])]), migi.createVd("div", [["class", "name"]], [migi.createVd("p", [], [item.AuthorName]), migi.createVd("small", [], [item.SendTime])])]), migi.createVd("p", [["class", "info"]], [migi.createVd("b", [["class", "weibo"]]), item.DynamicContent])]), migi.createVd("div", [["class", "preview"]], [migi.createVd("img", [["src", item.DynamicPic]])])]);
          var info = void 0;
          var preview = void 0;
          if (item.type == 'song') {
            info = migi.createVd("p", [["class", "info"]], [migi.createVd("b", [["class", "zq"]]), item.action, migi.createVd("a", [["href", "#"]], [item.song])]);
            preview = migi.createVd("div", [["class", "preview"]], [migi.createVd("img", [["src", item.pic]])]);
          } else if (item.type == 'weibo') {
            info = migi.createVd("p", [["class", "info"]], [migi.createVd("b", [["class", "wb"]]), item.action, migi.createVd("a", [["href", "#"]], [item.txt])]);
          }
          return migi.createVd("li", [], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["class", "user"]], [migi.createVd("div", [["class", "head n" + item.imgs.length + " fn-clear"]], [item.imgs.map(function (item2) {
            return migi.createVd("img", [["src", item2]]);
          })]), migi.createVd("div", [["class", "name"]], [migi.createVd("p", [], [item.names.join('、')]), migi.createVd("small", [], [item.time])])]), info]), preview]);
        });
      })]), migi.createVd("div", [["class", new migi.Obj("list", this, function () {
        return 'no' + (this.list.length ? ' fn-hide' : '');
      })]], [])]);
    }
  }, {
    key: "list",
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      if (this.__initBind("list")) this.__setBind("list", []);return this.__getBind("list");
    }
  }]);

  return Dynamics;
}(migi.Component);

migi.name(Dynamics, "Dynamics");exports.default = Dynamics;

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  migi.Element.resetUid();
  var authorID = data.authorID;
  var authorDetail = data.authorDetail;
  var homeDetail = data.homeDetail;
  var tags = data.tags;
  var playList = data.playList;
  var commentData = data.commentData;

  var author = migi.preRender(migi.createCp(_Author2.default, [["authorID", authorID], ["authorDetail", authorDetail], ["homeDetail", homeDetail], ["tags", tags], ["playList", playList], ["commentData", commentData]]));
  var topNav = migi.preRender(migi.createCp(_TopNav2.default, []));
  var botNav = migi.preRender(migi.createCp(_BotNav2.default, []));

  return '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n  <meta charset="UTF-8"/>\n  <title>' + authorDetail.AuthorName + '</title>\n  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n  <meta name="renderer" content="webkit"/>\n  <meta name="apple-mobile-web-app-capable" content="yes"/>\n  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>\n  <meta name="format-detection" content="telephone=no"/>\n  <meta name="format-detection" content="email=no"/>\n  <meta name="wap-font-scale" content="no"/>\n  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mauthor.css') + '"/>\n</head>\n<body>\n<div id="page">' + author + '</div>\n' + topNav + '\n' + botNav + '\n<script>\n  var $CONFIG = {\n    authorID: \'' + authorID + '\',\n    authorDetail: ' + JSON.stringify(authorDetail) + ',\n    homeDetail: ' + JSON.stringify(homeDetail) + ',\n    tags: ' + JSON.stringify(tags) + ',\n    playList: ' + JSON.stringify(playList) + ',\n    commentData: ' + JSON.stringify(commentData) + ',\n  };\n</script>\n<script src="' + data.helper.getAssetUrl('/mcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/mauthor.js') + '"></script>\n</body>\n</html>';
};

var _TopNav = __webpack_require__(3);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _BotNav = __webpack_require__(2);

var _BotNav2 = _interopRequireDefault(_BotNav);

var _Author = __webpack_require__(13);

var _Author2 = _interopRequireDefault(_Author);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ })
/******/ ])));