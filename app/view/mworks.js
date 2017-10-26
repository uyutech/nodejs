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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
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
  img192_192: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
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
  img100_100: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img__60: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/10/6.
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
    success = success || function() {};
    error = error || function() {};
    return net.ajax(url, data, success, error, 'post');
  },
};

/* harmony default export */ __webpack_exports__["default"] = (net);


/***/ }),
/* 2 */
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
/* 3 */
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
  '902': {
    name: '策划',
    display: '策划',
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
/* 4 */
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
/* 5 */
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
var take = 10;
var ajax = void 0;

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
        self.slide($(this).parent());
      });
      $root.on('click', '.list>li>.c>pre', function () {
        $(this).parent().find('.slide .sub').click();
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
        self.hideLast();
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
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [item.Send_Content]), migi.createVd("div", [["class", "slide2"]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount])]), migi.createVd("b", [["class", "arrow"]])])]);
    }
  }, {
    key: 'hideLast',
    value: function hideLast() {
      if ($lastSlide && $lastSlide.hasClass('on')) {
        $lastSlide.removeClass('on').closest('li').find('.list2').css('height', 0);
      }
      $lastSlide = null;
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
/* 6 */
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
/* 7 */
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
        return this.maxlength || 120;
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _authorTemplate = __webpack_require__(3);

var _authorTemplate2 = _interopRequireDefault(_authorTemplate);

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
    self.setAuthor(self.props.authorList);
    return _this;
  }

  _createClass(Author, [{
    key: 'setAuthor',
    value: function setAuthor(data) {
      var list = [];
      (data || []).forEach(function (item) {
        var temp = [];
        var lis = [];
        var last = '';
        var lastTips = '';
        item.forEach(function (item) {
          if (item.WorksAuthorType !== last || item.Tips !== lastTips) {
            if (temp.length) {
              var li = migi.createVd("li", [], [temp.map(function (item) {
                return item;
              })]);
              lis.push(li);
              temp = [];
            }
            var type = _authorTemplate2.default.code2Data[item.WorksAuthorType];
            var label = item.Tips || type.display;
            temp.push(migi.createVd("span", [["class", "item"]], [migi.createVd("small", [], [label]), migi.createVd("a", [["class", "item"], ["href", '/author/' + item.ID], ["title", item.AuthName]], [migi.createVd("img", [["src", _util2.default.autoSsl(item.HeadUrl) || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("span", [], [item.AuthName])])]));
          } else {
            temp.push(migi.createVd("a", [["class", "item"], ["href", '/author/' + item.ID]], [migi.createVd("img", [["src", _util2.default.autoSsl(item.HeadUrl) || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("span", [], [item.AuthName])]));
          }
          last = item.WorksAuthorType;
          lastTips = item.Tips;
        });
        if (temp.length) {
          var li = migi.createVd("li", [], [temp.map(function (item) {
            return item;
          })]);
          lis.push(li);
          temp = [];
        }
        var ul = migi.createVd("ul", [], [lis.map(function (item) {
          return item;
        })]);
        list.push(ul);
      });
      this.list = list;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-author"]], [migi.createVd("h5", [], ["作者"]), migi.createVd("div", [["class", "c"]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return item;
        });
      })])]);
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      if (this.__initBind("list")) this.__setBind("list", []);return this.__getBind("list");
    }
  }]);

  return Author;
}(migi.Component);

migi.name(Author, "Author");exports.default = Author;

/***/ }),
/* 12 */
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

var Timeline = function (_migi$Component) {
  _inherits(Timeline, _migi$Component);

  function Timeline() {
    var _ref;

    _classCallCheck(this, Timeline);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Timeline, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-timeline"]], [migi.createVd("ul", [["class", "c fn-clear"]], [(this.props.datas || []).map(function (item) {
        var date = _util2.default.formatDate(item.LineDate);
        return migi.createVd("li", [["title", item.LineDate.replace(/:\d{2}$/, '')]], [migi.createVd("span", [], [item.Describe]), migi.createVd("small", [], [date])]);
      })])]);
    }
  }]);

  return Timeline;
}(migi.Component);

migi.name(Timeline, "Timeline");exports.default = Timeline;

/***/ }),
/* 13 */
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

var InspComment = function (_migi$Component) {
  _inherits(InspComment, _migi$Component);

  function InspComment() {
    var _ref;

    _classCallCheck(this, InspComment);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = InspComment.__proto__ || Object.getPrototypeOf(InspComment)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(InspComment, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-insp"]], [migi.createVd("h5", [], ["创作灵感"]), migi.createVd("ul", [["class", "c"]], [(this.props.commentData || []).map(function (item) {
        return migi.createVd("li", [], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Head_Url || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "name"]], [item.AuthorName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.LineDate)])]), migi.createVd("p", [], [item.sign])])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("b", [["class", "arrow"]])])]);
      })])]);
    }
  }]);

  return InspComment;
}(migi.Component);

migi.name(InspComment, "InspComment");exports.default = InspComment;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/8/13.
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  workType: function(type) {
    switch (type) {
      case 1111:
        return {
          bigType: 'audio',
          name: '原创音乐',
        };
      case 1113:
        return {
          bigType: 'audio',
          name: '原创伴奏',
        };
      case 2110:
        return {
          bigType: 'video',
          name: '原创视频',
        };
      case 3120:
        return {
          bigType: 'poster',
          name: '海报',
        };
      case 4110:
        return {
          bigType: 'text',
          name: '文案',
        };
      case 4211:
        return {
          bigType: 'lyric',
          name: '原创歌词',
          display: '歌词',
        };
      default:
        return {};
    }
  },
  authorType: [
    [901, 902],
    [111, 112],
    [151],
    [121, 122],
    [411, 421],
    [131, 132, 134],
    [141],
    [211],
    [312, 311, 313],
    [351],
    [331, 332]
  ],
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_migi$Component) {
  _inherits(Text, _migi$Component);

  function Text() {
    var _ref;

    _classCallCheck(this, Text);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Text.__proto__ || Object.getPrototypeOf(Text)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-text"]], [migi.createVd("h5", [], [this.props.datas.name]), migi.createVd("ul", [["class", "c"]], [(this.props.datas.value || []).map(function (item) {
        return migi.createVd("li", [], [migi.createVd("pre", [], [item.Text])]);
      })])]);
    }
  }]);

  return Text;
}(migi.Component);

migi.name(Text, "Text");exports.default = Text;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lyric = function (_migi$Component) {
  _inherits(Lyric, _migi$Component);

  function Lyric() {
    var _ref;

    _classCallCheck(this, Lyric);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Lyric.__proto__ || Object.getPrototypeOf(Lyric)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Lyric, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-lyric"]], [migi.createVd("h5", [], [this.props.datas.name]), migi.createVd("ul", [["class", "c"]], [(this.props.datas.value || []).map(function (item) {
        return migi.createVd("li", [], [migi.createVd("pre", [], [item.Text])]);
      })])]);
    }
  }]);

  return Lyric;
}(migi.Component);

migi.name(Lyric, "Lyric");exports.default = Lyric;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Poster = function (_migi$Component) {
  _inherits(Poster, _migi$Component);

  function Poster() {
    var _ref;

    _classCallCheck(this, Poster);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Poster.__proto__ || Object.getPrototypeOf(Poster)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Poster, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-poster"]], [migi.createVd("h5", [], [this.props.datas.name]), migi.createVd("ul", [["class", "c"]], [(this.props.datas.value || []).map(function (item) {
        return migi.createVd("li", [], [migi.createVd("img", [["src", item.FileUrl || '//zhuanquan.xin/img/blank.png']])]);
      })])]);
    }
  }]);

  return Poster;
}(migi.Component);

migi.name(Poster, "Poster");exports.default = Poster;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var isLogin = !!data.ctx.session.uid;
  var worksID = data.worksID;
  var worksDetail = data.worksDetail;
  var commentData = data.commentData;
  var labelList = data.labelList;

  var works = migi.preRender(migi.createCp(_Works2.default, [["isLogin", isLogin], ["worksID", worksID], ["worksDetail", worksDetail], ["labelList", labelList], ["commentData", commentData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getMHead({ title: worksDetail.Title }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mworks.css') + '"/>\n</head>\n<body>\n<div id="page">' + works + '</div>\n' + data.helper.getMTopNav() + '\n' + data.helper.getMBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.worksID = ' + JSON.stringify(worksID) + ';\n  $CONFIG.worksDetail = ' + JSON.stringify(worksDetail) + ';\n  $CONFIG.labelList = ' + JSON.stringify(labelList) + ';\n  $CONFIG.commentData = ' + JSON.stringify(commentData) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/mcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/mworks.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Works = __webpack_require__(38);

var _Works2 = _interopRequireDefault(_Works);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 38 */
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

var _Media = __webpack_require__(39);

var _Media2 = _interopRequireDefault(_Media);

var _itemTemplate = __webpack_require__(20);

var _itemTemplate2 = _interopRequireDefault(_itemTemplate);

var _Author = __webpack_require__(11);

var _Author2 = _interopRequireDefault(_Author);

var _Timeline = __webpack_require__(12);

var _Timeline2 = _interopRequireDefault(_Timeline);

var _Text = __webpack_require__(21);

var _Text2 = _interopRequireDefault(_Text);

var _Lyric = __webpack_require__(22);

var _Lyric2 = _interopRequireDefault(_Lyric);

var _InspComment = __webpack_require__(13);

var _InspComment2 = _interopRequireDefault(_InspComment);

var _Poster = __webpack_require__(23);

var _Poster2 = _interopRequireDefault(_Poster);

var _WorkComment = __webpack_require__(42);

var _WorkComment2 = _interopRequireDefault(_WorkComment);

var _SubCmt = __webpack_require__(7);

var _SubCmt2 = _interopRequireDefault(_SubCmt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var first = void 0;

var Works = function (_migi$Component) {
  _inherits(Works, _migi$Component);

  function Works() {
    var _ref;

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _classCallCheck(this, Works);

    var _this = _possibleConstructorReturn(this, (_ref = Works.__proto__ || Object.getPrototypeOf(Works)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.worksID = self.props.worksID;
    self.worksType = self.props.worksDetail.WorkType;
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function () {
      var media = self.ref.media;
      var workComment = self.ref.workComment;
      var comment = workComment.ref.comment;
      var subCmt = self.ref.subCmt;
      if (media) {
        media.on('switchTo', function (data) {
          workComment.workID = data.ItemID;
        });
      }
      comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
        subCmt.to = name;
      });
      comment.on('closeSubComment', function () {
        self.rootID = -1;
        self.parentID = -1;
        subCmt.to = '';
      });
      subCmt.on('submit', function (content) {
        subCmt.invalid = true;
        var rootID = self.rootID;
        var parentID = self.parentID;
        _net2.default.postJSON('/api/works/addComment', {
          parentID: parentID,
          rootID: rootID,
          worksID: self.worksID,
          workID: self.workID,
          barrageTime: self.barrageTime,
          content: content
        }, function (res) {
          if (res.success) {
            var _data = res.data;
            subCmt.value = '';
            if (rootID === -1 && _data.RootID === -1) {
              comment.prependData(_data);
              comment.message = '';
            } else {
              comment.prependChild(_data);
            }
            migi.eventBus.emit('COMMENT', 'work');
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
            subCmt.invalid = false;
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
            subCmt.invalid = false;
          }
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          subCmt.invalid = false;
        });
      });
    });
    return _this;
  }

  _createClass(Works, [{
    key: 'setWorks',
    value: function setWorks(works) {
      var self = this;
      var workHash = {};
      var workList = [];
      var authorList = [];
      var authorHash = {};
      works.forEach(function (item) {
        // 将每个小作品根据小类型映射到大类型上，再归类
        var type = _itemTemplate2.default.workType(item.ItemType);
        var bigType = type.bigType;
        var name = type.display || type.name;
        if (bigType) {
          workHash[bigType] = workHash[bigType] || {
            name: name,
            value: []
          };
          workHash[bigType].value.push(item);
          item.Works_Item_Author.forEach(function (item) {
            authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
            if (!authorHash[item.WorksAuthorType][item.ID]) {
              authorHash[item.WorksAuthorType][item.ID] = true;
              authorList.push(item);
            }
          });
        }
      });
      Object.keys(workHash).forEach(function (k) {
        workList.push({
          bigType: k,
          name: workHash[k].name,
          value: workHash[k].value
        });
      });

      authorHash = {};
      var authorType = _itemTemplate2.default.authorType;
      var authorTypeHash = {};
      var authorTypeList = [];
      var unknowList = [];
      authorType.forEach(function (list, index) {
        list.forEach(function (item) {
          authorTypeHash[item] = index;
        });
      });
      authorList.forEach(function (item) {
        var i = authorTypeHash[item.WorksAuthorType];
        if (i === undefined) {
          unknowList.push(item);
        } else {
          authorTypeList[i] = authorTypeList[i] || [];
          authorTypeList[i].push(item);
        }
      });
      authorList = [];
      authorTypeList.forEach(function (item, index) {
        var seq = _itemTemplate2.default.authorType[index];
        migi.sort(item, function (a, b) {
          return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
        });
      });
      if (unknowList.length) {
        authorTypeList.push(unknowList);
      }
      self.authorList = [];
      if (self.props.worksDetail.Works_Author && self.props.worksDetail.Works_Author.length) {
        self.authorList.push(self.props.worksDetail.Works_Author);
      }
      self.authorList = self.authorList.concat(authorTypeList);

      workList.forEach(function (item) {
        if (item.bigType === 'audio') {
          self.audioData = item.value;
        } else if (item.bigType === 'video') {
          self.videoData = item.value;
        } else if (item.bigType === 'text') {
          self.textData = item;
        } else if (item.bigType === 'poster') {
          self.posterData = item;
        } else if (item.bigType === 'lyric') {
          self.lyricData = item;
        }
      });

      if (self.videoData) {
        first = 'video';
        self.workID = self.videoData[0].ItemID;
      } else if (self.audioData) {
        first = 'audio';
        self.workID = self.audioData[0].ItemID;
      }
    }
  }, {
    key: 'clickSel',
    value: function clickSel(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        var rel = tvd.props.rel;
        if (rel === 'intro') {
          $(this.ref.comments.element).addClass('fn-hide');
          $(this.ref.intro.element).removeClass('fn-hide');
        } else {
          $(this.ref.intro.element).addClass('fn-hide');
          $(this.ref.comments.element).removeClass('fn-hide');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "works"]], [migi.createCp(_Media2.default, [["ref", "media"], ["worksID", new migi.Obj("worksID", this, function () {
        return this.worksID;
      })], ["cover", this.props.worksDetail.cover_Pic], ["audioData", this.audioData], ["videoData", this.videoData], ["first", first]]), migi.createVd("ul", [["class", "sel fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickSel)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "intro"]], ["简介"]), migi.createVd("li", [["rel", "comments"]], ["留言"])]), migi.createVd("div", [["class", "intro"], ["ref", "intro"]], [migi.createCp(_Author2.default, [["authorList", this.authorList]]), this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length ? migi.createCp(_Timeline2.default, [["datas", this.props.worksDetail.WorkTimeLine]]) : '', this.textData ? migi.createCp(_Text2.default, [["datas", this.textData]]) : '', this.lyricData ? migi.createCp(_Lyric2.default, [["datas", this.lyricData]]) : '', migi.createCp(_InspComment2.default, [["ref", "inspComment"], ["commentData", this.props.worksDetail.WorksAuthorComment]]), this.posterData ? migi.createCp(_Poster2.default, [["datas", this.posterData]]) : '']), migi.createVd("div", [["class", "comments fn-hide"], ["ref", "comments"]], [migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["isLogin", this.props.isLogin], ["worksID", new migi.Obj("worksID", this, function () {
        return this.worksID;
      })], ["workID", new migi.Obj("workID", this, function () {
        return this.workID;
      })], ["originTo", this.props.worksDetail.Title], ["commentData", this.props.commentData]])]), migi.createCp(_SubCmt2.default, [["ref", "subCmt"], ["originTo", this.props.worksDetail.Title], ["subText", "发送"], ["tipText", "-${n}"], ["placeholder", "夸夸这个作品吧"]])]);
    }
  }, {
    key: 'worksID',
    set: function set(v) {
      this.__setBind("worksID", v);this.__data("worksID");
    },
    get: function get() {
      return this.__getBind("worksID");
    }
  }, {
    key: 'workID',
    set: function set(v) {
      this.__setBind("workID", v);this.__data("workID");
    },
    get: function get() {
      return this.__getBind("workID");
    }
  }, {
    key: 'worksType',
    set: function set(v) {
      this.__setBind("worksType", v);this.__data("worksType");
    },
    get: function get() {
      return this.__getBind("worksType");
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
    key: 'barrageTime',
    set: function set(v) {
      this.__setBind("barrageTime", v);this.__data("barrageTime");
    },
    get: function get() {
      if (this.__initBind("barrageTime")) this.__setBind("barrageTime", 0);return this.__getBind("barrageTime");
    }
  }]);

  return Works;
}(migi.Component);

migi.name(Works, "Works");exports.default = Works;

/***/ }),
/* 39 */
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

var _Audio = __webpack_require__(40);

var _Audio2 = _interopRequireDefault(_Audio);

var _Video = __webpack_require__(41);

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Media = function (_migi$Component) {
  _inherits(Media, _migi$Component);

  function Media() {
    var _ref;

    _classCallCheck(this, Media);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Media.__proto__ || Object.getPrototypeOf(Media)).call.apply(_ref, [this].concat(data)));

    var self = _this;

    self.on(migi.Event.DOM, function () {});
    return _this;
  }

  _createClass(Media, [{
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-media fn-clear"], ["style", 'background-image:url(' + (this.props.cover || '//zhuanquan.xin/img/blank.png') + ')']], [this.props.videoData ? migi.createCp(_Video2.default, [["ref", "video"], ["cover", this.props.cover], ["datas", this.props.videoData], ["show", this.props.first === 'video']]) : '', migi.createVd("div", [["class", "type fn-clear"]], [this.props.videoData ? migi.createVd("dl", [["class", 'video fn-clear' + (this.props.first === 'video' ? ' cur' : '')]], [migi.createVd("dt", [], ["视频"]), this.props.videoData.map(function (item, i) {
        return migi.createVd("dd", [["class", this.props.first === 'video' && !i]], [item.ItemName]);
      }.bind(this))]) : '', this.props.audioData ? migi.createVd("dl", [["class", 'audio fn-clear' + (this.props.first === 'audio' ? ' cur' : '')]], [migi.createVd("dt", [], ["音频"]), this.props.audioData.map(function (item, i) {
        return migi.createVd("dd", [["class", this.props.first === 'audio' && !i]], [item.ItemName]);
      })]) : ''])]);
    }
  }]);

  return Media;
}(migi.Component);

migi.name(Media, "Media");exports.default = Media;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _net = __webpack_require__(4);

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lyricsIndex = -1;
var lyricsHeight = [];
var $lyricsRoll = void 0;

var Audio = function (_migi$Component) {
  _inherits(Audio, _migi$Component);

  function Audio() {
    var _ref;

    _classCallCheck(this, Audio);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Audio.__proto__ || Object.getPrototypeOf(Audio)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.data) {
      self.setData(self.props.data);
    }
    return _this;
  }

  _createClass(Audio, [{
    key: 'setData',
    value: function setData(data) {
      var self = this;
      self.data = data;
      self.isLike = data[0].ISLike;
      self.isFavor = data[0].ISFavor;
      self.fileUrl = data[0].FileUrl;
      data.forEach(function (item) {
        var l = {};
        if (LyricsParser.isLyrics(item.lrc)) {
          l.is = true;
          l.txt = LyricsParser.getTxt(item.lrc);
          l.data = LyricsParser.parse(item.lrc);
        } else {
          l.is = false;
          l.txt = item.lrc;
        }
        item.formatLyrics = l;
      });
      self.rollLyrics = data[0].formatLyrics.data;
      self.on(migi.Event.DOM, function () {
        var count = 0;
        $lyricsRoll = $(self.ref.lyricsRoll.element);
        $lyricsRoll.find('pre').each(function () {
          lyricsHeight.push(count);
          count += 20;
        });
      });
      return this;
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      return this;
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      return this;
    }
  }, {
    key: 'timeupdate',
    value: function timeupdate(e) {
      var currentTime = e.target.currentTime;
      // console.log(currentTime);
      var item = this.data[this.workIndex];
      var formatLyrics = item.formatLyrics;
      var formatLyricsData = formatLyrics.data;
      if (formatLyrics.is && formatLyricsData.length) {
        var tempIndex = lyricsIndex;
        for (var i = 0, len = formatLyricsData.length; i < len; i++) {
          if (currentTime * 1000 >= formatLyricsData[i].timestamp) {
            tempIndex = i;
          } else {
            break;
          }
        }
        if (tempIndex !== lyricsIndex) {
          // console.log(lyricsIndex, tempIndex);
          lyricsIndex = tempIndex;
          this.lineLyrics = formatLyricsData[lyricsIndex].txt;
          $lyricsRoll.find('.cur').removeClass('cur');
          $lyricsRoll.find('pre').eq(lyricsIndex).addClass('cur');
          $lyricsRoll.css('-webkit-transform', 'translate3d(0,' + -lyricsHeight[lyricsIndex] + 'px,0)');
          $lyricsRoll.css('transform', 'translate3d(0,' + -lyricsHeight[lyricsIndex] + 'px,0)');
        }
      }
      this.emit('timeupdate', currentTime);
    }
  }, {
    key: 'loadedmetadata',
    value: function loadedmetadata(e) {
      var duration = this.duration = e.target.duration;
      this.hasLoaded = true;
      this.emit('loadedmetadata', {
        duration: duration
      });
    }
  }, {
    key: 'playing',
    value: function playing(e) {
      var duration = this.duration = e.target.duration;
      this.emit('playing', {
        duration: duration
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.ref.audio.element.play();
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.ref.audio.element.pause();
      return this;
    }
  }, {
    key: 'currentTime',
    value: function currentTime(t) {
      this.ref.audio.element.currentTime = t;
      return this;
    }
  }, {
    key: 'clickLike',
    value: function clickLike(e, vd) {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        _net2.default.postJSON('api/works/AddLikeBehavior', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isLike = res.data === 211;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickFavor',
    value: function clickFavor(e, vd) {
      if (!window.$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('api/works/RemoveCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = false;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      } else {
        _net2.default.postJSON('api/works/AddCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = true;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickDownload',
    value: function clickDownload(e) {
      if (!window.$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'altLyrics',
    value: function altLyrics() {
      this.showLyricsMode = !this.showLyricsMode;
    }
  }, {
    key: 'clickShare',
    value: function clickShare(e) {
      migi.eventBus.emit('share');
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.duration = 0;
      this.fileUrl = '';
      this.lineLyrics = '';
      this.rollLyrics = [];
      this.hasLoaded = false;
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'audio' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("audio", [["ref", "audio"], ["onTimeupdate", new migi.Cb(this, this.timeupdate)], ["onLoadedmetadata", new migi.Cb(this, this.loadedmetadata)], ["onPlaying", new migi.Cb(this, this.playing)], ["preload", "meta"], ["src", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })]], ["\n\
        your browser does not support the audio tag\n\
      "]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj("isLike", this, function () {
        return 'like' + (this.isLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj("isFavor", this, function () {
        return 'favor' + (this.isFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["download", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])]), migi.createVd("div", [["class", "lyrics-con"]], [migi.createVd("div", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'lyrics-roll' + (!this.showLyricsMode ? '' : ' fn-hide');
      })]], [migi.createVd("div", [["class", "c"], ["ref", "lyricsRoll"]], [new migi.Obj("rollLyrics", this, function () {
        return (this.rollLyrics || []).map(function (item) {
          return migi.createVd("pre", [], [item.txt || '&nbsp;']);
        });
      })])]), migi.createVd("pre", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'lyrics-line' + (this.showLyricsMode ? '' : ' fn-hide');
      })]], [new migi.Obj("lineLyrics", this, function () {
        return this.lineLyrics;
      })]), migi.createVd("span", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'lyrics' + (this.showLyricsMode ? '' : ' alt');
      })], ["onClick", new migi.Cb(this, this.altLyrics)]])])]);
    }
  }, {
    key: 'fileUrl',
    set: function set(v) {
      this.__setBind("fileUrl", v);this.__data("fileUrl");
    },
    get: function get() {
      return this.__getBind("fileUrl");
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
    key: 'isFavor',
    set: function set(v) {
      this.__setBind("isFavor", v);this.__data("isFavor");
    },
    get: function get() {
      return this.__getBind("isFavor");
    }
  }, {
    key: 'workIndex',
    set: function set(v) {
      this.__setBind("workIndex", v);this.__data("workIndex");
    },
    get: function get() {
      if (this.__initBind("workIndex")) this.__setBind("workIndex", 0);return this.__getBind("workIndex");
    }
  }, {
    key: 'lineLyrics',
    set: function set(v) {
      this.__setBind("lineLyrics", v);this.__data("lineLyrics");
    },
    get: function get() {
      return this.__getBind("lineLyrics");
    }
  }, {
    key: 'rollLyrics',
    set: function set(v) {
      this.__setBind("rollLyrics", v);this.__data("rollLyrics");
    },
    get: function get() {
      if (this.__initBind("rollLyrics")) this.__setBind("rollLyrics", []);return this.__getBind("rollLyrics");
    }
  }, {
    key: 'showLyricsMode',
    set: function set(v) {
      this.__setBind("showLyricsMode", v);this.__data("showLyricsMode");
    },
    get: function get() {
      return this.__getBind("showLyricsMode");
    }
  }, {
    key: 'duration',
    set: function set(v) {
      this.__setBind("duration", v);this.__data("duration");
    },
    get: function get() {
      return this.__getBind("duration");
    }
  }, {
    key: 'hasLoaded',
    set: function set(v) {
      this.__setBind("hasLoaded", v);this.__data("hasLoaded");
    },
    get: function get() {
      return this.__getBind("hasLoaded");
    }
  }]);

  return Audio;
}(migi.Component);

migi.name(Audio, "Audio");exports.default = Audio;

/***/ }),
/* 41 */
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

var isStart = void 0;
var offsetX = void 0;

var Video = function (_migi$Component) {
  _inherits(Video, _migi$Component);

  function Video() {
    var _ref;

    _classCallCheck(this, Video);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Video.__proto__ || Object.getPrototypeOf(Video)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.datas) {
      self.setData(self.props.datas);
      if (self.props.show) {
        self.on(migi.Event.DOM, function () {
          self.addMedia();
        });
      }
    }
    return _this;
  }

  _createClass(Video, [{
    key: 'setData',
    value: function setData(datas) {
      var self = this;
      self.datas = datas;
      return this;
    }
  }, {
    key: 'addMedia',
    value: function addMedia() {
      var video = migi.createVd("video", [["ref", "video"], ["src", this.datas[this.index].FileUrl], ["onClick", this.clickPlay.bind(this)], ["onTimeupdate", this.onTimeupdate.bind(this)], ["onLoadedmetadata", this.onLoadedmetadata.bind(this)], ["onPause", this.onPause.bind(this)], ["onPlaying", this.onPlaying.bind(this)], ["preload", "meta"], ["playsinline", "true"], ["webkit-playsinline", "true"]], ["\n\
      your browser does not support the video tag\n\
    "]);
      this.video = video;
      video.prependTo(this.ref.c.element);
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      if (!this.video) {
        this.addMedia();
      }
      $(this.ref.fn.element).removeClass('fn-hidden');
      return this;
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      return this;
    }
  }, {
    key: 'onTimeupdate',
    value: function onTimeupdate(e) {
      var currentTime = this.currentTime = e.target.currentTime;
      var percent = currentTime / this.duration;
      this.setBarPercent(percent);
    }
  }, {
    key: 'onProgress',
    value: function onProgress(e) {}
  }, {
    key: 'onLoadedmetadata',
    value: function onLoadedmetadata(e) {
      this.duration = e.target.duration;
      this.canControl = true;
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying(e) {
      this.duration = e.target.duration;
    }
  }, {
    key: 'onPause',
    value: function onPause() {}
  }, {
    key: 'play',
    value: function play() {
      this.video.element.play();
      this.isPlaying = true;
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video && this.video.element.pause();
      this.isPlaying = false;
      return this;
    }
  }, {
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      if (this.index !== tvd.props.rel) {
        this.index = tvd.props.rel;
        this.video.element.src = this.datas[this.index].FileUrl;
        this.emit('switchTo', this.datas[this.index]);
      }
    }
  }, {
    key: 'clickStart',
    value: function clickStart(e) {
      this.play();
    }
  }, {
    key: 'clickScreen',
    value: function clickScreen() {
      var video = this.video.element;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.webkitEnterFullScreen) {
        video.webkitEnterFullScreen();
      }
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      e.preventDefault();
      if (this.canControl && e.touches.length === 1) {
        isStart = true;
        offsetX = $(this.ref.progress.element).offset().left;
        this.pause();
      }
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      if (isStart && e.touches.length === 1) {
        e.preventDefault();
        var x = e.touches[0].pageX;
        var diff = x - offsetX;
        var width = $(this.ref.progress.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.setBarPercent(percent);
        this.currentTime = Math.floor(this.duration * percent);
      }
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd(e) {
      isStart = false;
    }
  }, {
    key: 'clickProgress',
    value: function clickProgress(e) {
      if (this.canControl && e.target.className !== 'p') {
        var $progress = $(this.ref.progress.element);
        var left = $progress.offset().left;
        var x = e.pageX - left;
        var percent = x / $progress.width();
        var currentTime = Math.floor(this.duration * percent);
        this.currentTime = currentTime;
      }
    }
  }, {
    key: 'setBarPercent',
    value: function setBarPercent(percent) {
      percent *= 100;
      $(this.ref.vol.element).css('width', percent + '%');
      $(this.ref.p.element).css('-webkit-transform', 'translateX(' + percent + '%)');
      $(this.ref.p.element).css('transform', 'translateX(' + percent + '%)');
    }
  }, {
    key: 'clickPlay',
    value: function clickPlay(e) {
      this.isPlaying ? this.pause() : this.play();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'video' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("div", [["class", new migi.Obj("isPlaying", this, function () {
        return 'c' + (this.isPlaying ? ' playing' : '');
      })], ["ref", "c"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'start' + (this.isPlaying ? ' fn-hide' : '');
      })], ["onClick", new migi.Cb(this, this.clickStart)]])]), migi.createVd("div", [["class", "fn"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("small", [["class", "time"]], [new migi.Obj("currentTime", this, function () {
        return _util2.default.formatTime(this.currentTime * 1000);
      }), " / ", new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("b", [["class", "full"], ["onClick", new migi.Cb(this, this.clickScreen)]])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"], ["onTouchStart", new migi.Cb(this, this.touchStart)], ["onTouchMove", new migi.Cb(this, this.touchMove)], ["onTouchEnd", new migi.Cb(this, this.touchEnd)]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnLike"], this, function () {
        return 'like' + (this.datas[this.index].ISLike || this.fnLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnFavor"], this, function () {
        return 'favor' + (this.datas[this.index].ISFavor || this.fnFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index].FileUrl;
      })], ["download", new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index].ItemName + (/\.\w+$/.exec(this.datas[this.index].FileUrl)[0] || '');
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])])])]);
    }
  }, {
    key: 'datas',
    set: function set(v) {
      this.__setBind("datas", v);this.__data("datas");
    },
    get: function get() {
      if (this.__initBind("datas")) this.__setBind("datas", []);return this.__getBind("datas");
    }
  }, {
    key: 'index',
    set: function set(v) {
      this.__setBind("index", v);this.__data("index");
    },
    get: function get() {
      if (this.__initBind("index")) this.__setBind("index", 0);return this.__getBind("index");
    }
  }, {
    key: 'isPlaying',
    set: function set(v) {
      this.__setBind("isPlaying", v);this.__data("isPlaying");
    },
    get: function get() {
      return this.__getBind("isPlaying");
    }
  }, {
    key: 'workIndex',
    set: function set(v) {
      this.__setBind("workIndex", v);this.__data("workIndex");
    },
    get: function get() {
      if (this.__initBind("workIndex")) this.__setBind("workIndex", 0);return this.__getBind("workIndex");
    }
  }, {
    key: 'duration',
    set: function set(v) {
      this.__setBind("duration", v);this.__data("duration");
    },
    get: function get() {
      return this.__getBind("duration");
    }
  }, {
    key: 'fnFavor',
    set: function set(v) {
      this.__setBind("fnFavor", v);this.__data("fnFavor");
    },
    get: function get() {
      return this.__getBind("fnFavor");
    }
  }, {
    key: 'fnLike',
    set: function set(v) {
      this.__setBind("fnLike", v);this.__data("fnLike");
    },
    get: function get() {
      return this.__getBind("fnLike");
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._currentTime || 0;
    },
    set: function set(v) {
      this._currentTime = v;
      if (this.video && v !== this.video.element.currentTime) {
        this.video.element.currentTime = v;
      }
      ;this.__array("currentTime", v);this.__data("currentTime");
    }
  }]);

  return Video;
}(migi.Component);

migi.name(Video, "Video");exports.default = Video;

/***/ }),
/* 42 */
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

var _Comment = __webpack_require__(5);

var _Comment2 = _interopRequireDefault(_Comment);

var _Page = __webpack_require__(6);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var skip = 0;
var take = 10;
var sortType = 0;
var myComment = 0;
var currentCount = 0;
var ajax = void 0;
var loadEnd = void 0;

var WorkComment = function (_migi$Component) {
  _inherits(WorkComment, _migi$Component);

  function WorkComment() {
    var _ref;

    _classCallCheck(this, WorkComment);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = WorkComment.__proto__ || Object.getPrototypeOf(WorkComment)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.worksID = self.props.worksID;
    self.workID = self.props.workID;
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      var comment = self.ref.comment;
      page.on('page', function (i) {
        skip = (i - 1) * take;
        self.loadPage();
      });
    });
    return _this;
  }

  _createClass(WorkComment, [{
    key: 'load',
    value: function load() {
      var self = this;
      var comment = self.ref.comment;
      var page = self.ref.page;
      comment.message = '读取中...';
      page.total = 1;
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/works/commentList', { worksID: self.worksID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          // currentCount = data.Size;
          skip += take;
          if (data.data.length) {
            comment.message = '';
            comment.appendData(res.data.data);
            page.total = Math.ceil(currentCount / take);
          } else {
            comment.appendData(res.data.data);
            comment.message = '暂无评论';
            loadEnd = true;
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          comment.message = res.message || _util2.default.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        comment.message = res.message || _util2.default.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'loadPage',
    value: function loadPage() {
      var self = this;
      var comment = self.ref.comment;
      comment.message = '读取中...';
      comment.setData();
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/works/commentList', { worksID: self.worksID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          skip += take;
          if (data.data.length) {
            comment.message = '';
            comment.appendData(res.data.data);
          } else {
            comment.appendData(res.data.data);
            comment.message = '暂无评论';
            loadEnd = true;
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          comment.message = res.message || _util2.default.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        comment.message = res.message || _util2.default.ERROR_MESSAGE;
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
      loadEnd = false;
      this.loading = false;
      this.ref.comment.clearData();
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
        loadEnd = false;
        this.loading = false;
        this.ref.comment.clearData();
        this.load();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-comment"]], [migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部", migi.createVd("small", [], [this.props.commentData.Size])]), this.props.isLogin ? migi.createVd("li", [["rel", "1"]], ["我的"]) : '']), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.commentData.Size / take)]]), migi.createVd("div", [["class", "warn"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", "//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], ["圈儿"]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(1508739460298)])])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], ["自从积分活动开启，我们感受到了大家满满的热情，感谢支持！m(_ _)m\n\
\n\
转圈系统运用了人工智能算法，所以会根据大家留言内容不同对积分数量进行相应地微调。所以请尽量不要发表重复或没有意义的留言哦( •̥́ ˍ •̀ )\n\
也建议大家不要把一段内容在短时间内拆开分多条发布，悄悄告诉大家，这样获得的积分反而比合在一起的要少哦~\n\
\n\
希望大家转圈开心，都能得想要的福利∗ > ɞ &lt;∗很快会有越来越多的新功能解锁哦！"]), migi.createVd("b", [["class", "arrow"]])])]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/works/likeComment"], ["subUrl", "/api/works/subCommentList"], ["delUrl", "/api/works/delComment"], ["data", this.props.commentData.data]])]);
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
    key: 'worksID',
    set: function set(v) {
      this.__setBind("worksID", v);this.__data("worksID");
    },
    get: function get() {
      return this.__getBind("worksID");
    }
  }, {
    key: 'workID',
    set: function set(v) {
      this.__setBind("workID", v);this.__data("workID");
    },
    get: function get() {
      return this.__getBind("workID");
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
    key: 'barrageTime',
    set: function set(v) {
      this.__setBind("barrageTime", v);this.__data("barrageTime");
    },
    get: function get() {
      if (this.__initBind("barrageTime")) this.__setBind("barrageTime", 0);return this.__getBind("barrageTime");
    }
  }]);

  return WorkComment;
}(migi.Component);

migi.name(WorkComment, "WorkComment");exports.default = WorkComment;

/***/ })
/******/ ])));