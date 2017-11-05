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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
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
  '113': {
    name: '伴唱',
    display: '伴唱',
    css: 'singer',
  },
  '115': {
    name: '合唱',
    display: '合唱',
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
  '132': {
    name: '母带',
    display: '母带',
    css: 'mixer',
  },
  '133': {
    name: '录音',
    display: '录音',
    css: 'mixer',
  },
  '134': {
    name: '修音',
    display: '修音',
    css: 'mixer',
  },
  '141': {
    name: '演奏',
    display: '演奏', //优先显示乐器名。
    css: 'instrumental',
  },
  '151': {
    name: '配音',
    display: '配音',
    css: 'singer',
  },
  '211': {
    name: '视频',
    display: '视频',
    css: 'video',
  },
  '212': {
    name: '压制',
    display: '压制',
    css: 'video',
  },
  '213': {
    name: '拍摄',
    display: '拍摄',
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
  '314': {
    name: '线稿',
    display: '线稿',
    css: 'painter',
  },
  '315': {
    name: '上色',
    display: '上色',
    css: 'painter',
  },
  '316': {
    name: '手绘',
    display: '手绘',
    css: 'painter',
  },
  '317': {
    name: '插画',
    display: '插画',
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
  '333': {
    name: 'Logo设计',
    display: 'Logo设计',
    css: 'designer',
  },
  '341': {
    name: '漫画',
    display: '漫画',
    css: 'painter',
  },

  '351': {
    name: '书法',
    display: '书法',
    css: 'handwriting',
  },

  '391': {
    name: '沙画',
    display: '沙画',
    css: 'painter',
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
  '422': {
    name: '剧本',
    display: '剧本',
    css: 'writer',
  },
  '423': {
    name: '小说',
    display: '小说',
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
/* 4 */,
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
var $last = void 0;
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
        self.slide($(this).closest('li'));
      });
      $root.on('click', '.list>li>.c>pre', function () {
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

  _createClass(Comment, [{
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
        return migi.createVd("li", [["class", "author"], ["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img60_60_80(item.Send_AuthorHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [item.IsAuthor === true ? migi.createVd("span", [["class", "name"]], [item.Send_AuthorName]) : migi.createVd("a", [["href", '/author/' + item.IsAuthor], ["class", "name"]], [item.Send_AuthorName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_AuthorName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
      }
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img60_60_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_AuthorName]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img60_60_80(item.Send_AuthorHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)]), item.IsAuthor === true ? migi.createVd("span", [["class", "name"]], [item.Send_AuthorName]) : migi.createVd("a", [["href", '/author/' + item.IsAuthor], ["class", "name"]], [item.Send_AuthorName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_AuthorName]], [item.Send_Content]), migi.createVd("div", [["class", "slide2"]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount])]), migi.createVd("b", [["class", "arrow"]])])]);
      }
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", _util2.default.autoSsl(_util2.default.img60_60_80(item.Send_UserHeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [item.Send_Content]), migi.createVd("div", [["class", "slide2"]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount])]), migi.createVd("b", [["class", "arrow"]])])]);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/10/28.
 */



const TYPE = {
  originMusic: 1,
  musicAlbum: 5,
  photoAlbum: 11,
};

const NAME = {};
NAME[TYPE.originMusic] = '原创音乐';
NAME[TYPE.musicAlbum] = '音乐专辑';
NAME[TYPE.photoAlbum] = '相册';

/* harmony default export */ __webpack_exports__["default"] = ({
  TYPE,
  NAME,
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  isLyrics: function isLyrics(s) {
    return (/\[\d{2,}:\d{2}\.\d{2,3}]/.test(s)
    );
  },
  parse: function parse(s) {
    var match = s.match(/\[\d{2,}:\d{2}\.\d{2,3}].*/g);
    return match.map(function (item) {
      var time = item.slice(1, item.indexOf(']'));
      var times = time.split(/[^\d]/g);
      var ms = times[2];
      var timestamp = parseInt(times[0]) * 60 * 1000 + parseInt(times[1]) * 1000 + (ms.length === 3 ? parseInt(ms) : parseInt(ms) * 10);
      var txt = item.slice(item.indexOf(']') + 1);
      // console.log(time, timestamp, txt);
      return {
        time: time,
        timestamp: timestamp,
        txt: txt
      };
    });
  },
  getTxt: function getTxt(s) {
    return s.replace(/\[\d{2,}:\d{2}\.\d{2,3}]/g, '').replace(/\[\w+:\w+]/g, '');
  }
};

/***/ }),
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
    [423,422],
    [111],
    [115, 113, 112, 114, 151],
    [151],
    [121, 122],
    [411, 421],
    [331],
    [131, 132, 134,133],
    [141],
    [211,213,212,391],
    [317,316,312, 311, 313,314,315],
    [351],
    [331, 332,333]
  ],
});


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
            var label = item.Tips || (type ? type.display : '其它');
            temp.push(migi.createVd("span", [["class", "item"]], [migi.createVd("small", [], [label]), migi.createVd("a", [["class", "item"], ["href", '/author/' + item.ID], ["title", item.AuthName]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img48_48_80(item.HeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("span", [], [item.AuthName])])]));
          } else {
            temp.push(migi.createVd("a", [["class", "item"], ["href", '/author/' + item.ID]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img48_48_80(item.HeadUrl || '//zhuanquan.xin/head/8fd9055b7f033087e6337e37c8959d3e.png'))]]), migi.createVd("span", [], [item.AuthName])]));
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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

function setTranform($elem, n) {
  $elem.css('-moz-transform', 'scaleY(' + n + ')');
  $elem.css('-webkit-transform', 'scaleY(' + n + ')');
  $elem.css('transform', 'scaleY(' + n + ')');
}

var isPlaying = void 0;

var PlayList = function (_migi$Component) {
  _inherits(PlayList, _migi$Component);

  function PlayList() {
    var _ref;

    _classCallCheck(this, PlayList);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = PlayList.__proto__ || Object.getPrototypeOf(PlayList)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.list = self.props.workList;
    if (self.props.workID) {
      self.list.forEach(function (item, i) {
        if (self.props.workID === item.ItemID.toString()) {
          self.index = i;
        }
      });
    }
    self.on(migi.Event.DOM, function () {
      var $l1 = $(self.element).find('.l1');
      var $l2 = $(self.element).find('.l2');
      var $l3 = $(self.element).find('.l3');
      setInterval(function () {
        if (!isPlaying) {
          setTranform($l1, 0.1);
          setTranform($l2, 0.1);
          setTranform($l3, 0.1);
          return;
        }
        var n1 = Math.random();
        var n2 = Math.random();
        var n3 = Math.random();
        setTranform($l1, n1);
        setTranform($l2, n2);
        setTranform($l3, n3);
      }, 100);
    });
    migi.eventBus.on('play', function () {
      isPlaying = true;
    });
    migi.eventBus.on('pause', function () {
      isPlaying = false;
    });
    return _this;
  }

  _createClass(PlayList, [{
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        this.ref.list.element.className = 'list ' + (tvd.props.rel || '');
      }
    }
  }, {
    key: 'clickItem',
    value: function clickItem(e, vd, tvd, avd) {
      if (avd.name === 'img') {
        return;
      }
      var $li = $(tvd.element);
      if ($li.hasClass('private')) {
        return;
      }
      if (!$li.hasClass('cur')) {
        var $ol = $(vd.element);
        $ol.find('.cur').removeClass('cur');
        $li.addClass('cur');
        var i = tvd.props.rel;
        migi.eventBus.emit('chooseMusic', this.list[i]);
        if (parent && parent !== window && parent.setHash) {
          parent.setHash('/works/' + this.props.worksID + '/' + this.list[i].ItemID, true);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-playlist"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [
        /*<li class="video" rel="video">播放视频</li>*/
        /*<li class="audio" rel="audio">播放音频</li>*/
        /*<li class="music cur">播放全部</li>*/
      ,,]), migi.createVd("ol", [["class", "list"], ["ref", "list"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickItem)]]]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item, i) {
          var type = '';
          if (item.ItemType === 1111 || item.ItemType === 1113) {
            type = 'audio';
          } else if (item.ItemType === 2110) {
            type = 'video';
          }
          if (item.WorksState === 3) {
            return migi.createVd("li", [["class", "private"]], [migi.createVd("span", [["class", "name"]], ["待揭秘"])]);
          }
          if (item.WorksState === 2) {
            return migi.createVd("li", [["class", type + ' rel' + ((this.index === undefined ? i : this.index !== i) ? '' : ' cur')], ["rel", i]], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img64_64_80(item.WorksCoverPic || this.props.cover)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", 'name' + (item.ItemName ? '' : ' empty')]], [item.ItemName || '待揭秘'])]);
          }
          return migi.createVd("li", [["class", type + ' rel' + ((this.index === undefined ? i : this.index !== i) ? '' : ' cur') + (item.FileUrl ? '' : ' empty')], ["rel", i]], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img64_64_80(item.WorksCoverPic || this.props.cover)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("span", [["class", 'name' + (item.ItemName ? '' : ' empty')]], [item.ItemName || '待揭秘']), migi.createVd("span", [["class", "icon"]], [migi.createVd("b", [["class", "l1"]]), migi.createVd("b", [["class", "l2"]]), migi.createVd("b", [["class", "l3"]])])]);
        }.bind(this));
      })])]);
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      return this.__getBind("list");
    }
  }, {
    key: 'index',
    set: function set(v) {
      this.__setBind("index", v);this.__data("index");
    },
    get: function get() {
      return this.__getBind("index");
    }
  }]);

  return PlayList;
}(migi.Component);

migi.name(PlayList, "PlayList");exports.default = PlayList;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorksTypeEnum__ = __webpack_require__(6);
/**
 * Created by army8735 on 2017/11/4.
 */





/* harmony default export */ __webpack_exports__["default"] = ({
  getStateStr: function(type, state) {
    switch(type) {
      case __WEBPACK_IMPORTED_MODULE_0__WorksTypeEnum__["default"].TYPE.originMusic:
      case __WEBPACK_IMPORTED_MODULE_0__WorksTypeEnum__["default"].TYPE.musicAlbum:
        switch(state) {
          case 2:
          case 3:
            return '填坑中';
        }
        return '';
      case __WEBPACK_IMPORTED_MODULE_0__WorksTypeEnum__["default"].TYPE.photoAlbum:
        switch(state) {
          case 2:
          case 3:
            return '连载中';
        }
        return '';
    }
    return '';
  },
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

var Describe = function (_migi$Component) {
  _inherits(Describe, _migi$Component);

  function Describe() {
    var _ref;

    _classCallCheck(this, Describe);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Describe.__proto__ || Object.getPrototypeOf(Describe)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Describe, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-describe"]], [migi.createVd("h4", [], ["专辑简介"]), migi.createVd("pre", [], [this.props.data])]);
    }
  }]);

  return Describe;
}(migi.Component);

migi.name(Describe, "Describe");exports.default = Describe;

/***/ }),
/* 22 */,
/* 23 */,
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
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var isLogin = !!data.ctx.session.uid;
  var worksID = data.worksID;
  var workID = data.workID;
  var worksDetail = data.worksDetail;
  var commentData = data.commentData;
  var labelList = data.labelList;

  // 完成公开1，未完成公开2，未完成保密3
  if (worksDetail.WorkState === 3) {
    return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dworks.css') + '"/>\n</head>\n<body>\n<div id="page"><h1 class="private">\u6B64\u4F5C\u54C1\u5C1A\u672A\u5B8C\u6210\u516C\u5F00</h1></div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
  }

  var works = migi.preRender(migi.createCp(_Works2.default, [["isLogin", isLogin], ["worksID", worksID], ["workID", workID], ["worksDetail", worksDetail], ["labelList", labelList], ["commentData", commentData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead({ title: worksDetail.Title }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dworks.css') + '"/>\n</head>\n<body>\n<div id="page">' + works + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.worksID = ' + JSON.stringify(worksID) + ';\n  $CONFIG.workID = ' + JSON.stringify(workID) + ';\n  $CONFIG.worksDetail = ' + JSON.stringify(worksDetail) + ';\n  $CONFIG.labelList = ' + JSON.stringify(labelList) + ';\n  $CONFIG.commentData = ' + JSON.stringify(commentData) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dworks.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Works = __webpack_require__(71);

var _Works2 = _interopRequireDefault(_Works);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Title = __webpack_require__(72);

var _Title2 = _interopRequireDefault(_Title);

var _Media = __webpack_require__(73);

var _Media2 = _interopRequireDefault(_Media);

var _itemTemplate = __webpack_require__(12);

var _itemTemplate2 = _interopRequireDefault(_itemTemplate);

var _Author = __webpack_require__(13);

var _Author2 = _interopRequireDefault(_Author);

var _Text = __webpack_require__(15);

var _Text2 = _interopRequireDefault(_Text);

var _Lyric = __webpack_require__(16);

var _Lyric2 = _interopRequireDefault(_Lyric);

var _Poster = __webpack_require__(18);

var _Poster2 = _interopRequireDefault(_Poster);

var _Timeline = __webpack_require__(14);

var _Timeline2 = _interopRequireDefault(_Timeline);

var _InspComment = __webpack_require__(17);

var _InspComment2 = _interopRequireDefault(_InspComment);

var _WorkComment = __webpack_require__(77);

var _WorkComment2 = _interopRequireDefault(_WorkComment);

var _PhotoAlbum = __webpack_require__(78);

var _PhotoAlbum2 = _interopRequireDefault(_PhotoAlbum);

var _AddLabelPanel = __webpack_require__(79);

var _AddLabelPanel2 = _interopRequireDefault(_AddLabelPanel);

var _ImageView = __webpack_require__(80);

var _ImageView2 = _interopRequireDefault(_ImageView);

var _WorksTypeEnum = __webpack_require__(6);

var _WorksTypeEnum2 = _interopRequireDefault(_WorksTypeEnum);

var _LyricsParser = __webpack_require__(7);

var _LyricsParser2 = _interopRequireDefault(_LyricsParser);

var _PlayList = __webpack_require__(19);

var _PlayList2 = _interopRequireDefault(_PlayList);

var _MusicAlbum = __webpack_require__(81);

var _MusicAlbum2 = _interopRequireDefault(_MusicAlbum);

var _Describe = __webpack_require__(21);

var _Describe2 = _interopRequireDefault(_Describe);

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
    self.workID = self.props.workID;
    self.worksType = self.props.worksDetail.WorkType;
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function () {
      var workComment = self.ref.workComment;
      if (self.worksType === _WorksTypeEnum2.default.TYPE.originMusic) {
        var media = self.ref.media;
        media.on('switchTo', function (data) {
          workComment.workID = data.ItemID;
        });
      } else if (self.worksType === _WorksTypeEnum2.default.TYPE.musicAlbum) {
        var musicAlbum = self.ref.musicAlbum;
        var cover = musicAlbum.ref.cover;
        var $type = $(self.ref.type.element);
        cover.on('start', function () {
          musicAlbum.start();
          $type.find('.cover').removeClass('cur');
          $type.find('.player').addClass('cur');
        });
        migi.eventBus.on('chooseMusic', function () {
          $type.find('.cover').removeClass('cur');
          $type.find('.player').addClass('cur');
        });
      }
      // let addLabel = self.ref.addLabelPanel;
      // migi.eventBus.on('add-label', function() {
      //   addLabel.show();
      // });
    });
    return _this;
  }

  _createClass(Works, [{
    key: 'setWorks',
    value: function setWorks(works) {
      var self = this;
      var workList = [];
      var authorList = [];
      var authorHash = {};
      var unknowList = [];
      var authorType = _itemTemplate2.default.authorType;
      var authorTypeHash = {};
      var authorTypeList = [];
      if (self.worksType === _WorksTypeEnum2.default.TYPE.musicAlbum) {
        works.forEach(function (item) {
          if (item.ItemType === 1111 || item.ItemType === 1113) {
            var l = {};
            if (_LyricsParser2.default.isLyrics(item.lrc)) {
              l.is = true;
              l.txt = _LyricsParser2.default.getTxt(item.lrc);
              l.data = _LyricsParser2.default.parse(item.lrc);
            } else {
              l.is = false;
              l.txt = item.lrc;
            }
            item.formatLyrics = l;
            workList.push(item);
          } else if (item.ItemType === 2110) {
            workList.push(item);
          }
        });
        self.workList = workList;

        (self.props.worksDetail.Works_Author || []).forEach(function (item) {
          authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
          if (!authorHash[item.WorksAuthorType][item.ID]) {
            authorHash[item.WorksAuthorType][item.ID] = true;
            authorList.push(item);
          }
        });
        authorHash = {};
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
        self.authorList = authorTypeList;
        return;
      }
      var workHash = {};
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

      if (self.workID) {
        if (self.videoData) {
          self.videoData.forEach(function (item) {
            if (item.ItemID.toString() === self.workID) {
              first = 'video';
            }
          });
        }
        if (self.audioData) {
          self.audioData.forEach(function (item) {
            if (item.ItemID.toString() === self.workID) {
              first = 'audio';
            }
          });
        }
      } else {
        if (self.videoData) {
          first = 'video';
          self.workID = self.videoData[0].ItemID;
        } else if (self.audioData) {
          first = 'audio';
          self.workID = self.audioData[0].ItemID;
        }
      }
    }
  }, {
    key: 'setAuthorList',
    value: function setAuthorList(authors) {}
  }, {
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      var self = this;
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        var type = tvd.props.rel;
        if (self.worksType === _WorksTypeEnum2.default.TYPE.musicAlbum) {
          self.ref.musicAlbum.switchType(type);
        } else {
          self.ref.media.switchType(type);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      if (self.worksType === _WorksTypeEnum2.default.TYPE.musicAlbum) {
        return migi.createVd("div", [["class", new migi.Obj("worksType", this, function () {
          return 'works fn-clear t' + self.worksType;
        })]], [migi.createCp(_Title2.default, [["ref", "title"], ["worksType", new migi.Obj("worksType", this, function () {
          return self.worksType;
        })], ["detail", this.props.worksDetail]]), this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length ? migi.createCp(_Timeline2.default, [["datas", this.props.worksDetail.WorkTimeLine]]) : '', migi.createVd("div", [["class", "main"]], [migi.createVd("ul", [["class", "type fn-clear"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [migi.createVd("li", [["class", "cover cur"], ["rel", "intro"]], ["封面"]), migi.createVd("li", [["class", "player"], ["rel", "player"]], ["播放"])]), migi.createCp(_MusicAlbum2.default, [["ref", "musicAlbum"], ["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })], ["workID", new migi.Obj("workID", this, function () {
          return this.workID;
        })], ["cover", this.props.worksDetail.cover_Pic], ["workList", this.workList]]), migi.createVd("div", [["class", "box"]], [migi.createCp(_Describe2.default, [["data", this.props.worksDetail.Describe]]), migi.createCp(_Author2.default, [["authorList", this.authorList]]), migi.createCp(_InspComment2.default, [["ref", "inspComment"], ["commentData", this.props.worksDetail.WorksAuthorComment]])])]), migi.createVd("div", [["class", "side"]], [migi.createVd("ul", [["class", "sel fn-clear"], ["ref", "sel"]], [migi.createVd("li", [["class", "cur"]], ["曲目"])]), migi.createVd("div", [["class", "box box-fn-top-left"]], [migi.createCp(_PlayList2.default, [["ref", "playList"], ["cover", this.props.worksDetail.cover_Pic], ["workList", this.workList], ["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })], ["workID", new migi.Obj("workID", this, function () {
          return this.workID;
        })]])]), migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["isLogin", this.props.isLogin], ["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })], ["workID", new migi.Obj("workID", this, function () {
          return this.workID;
        })], ["originTo", this.props.worksDetail.Title], ["commentData", this.props.commentData]])])]);
      }
      if (self.worksType === _WorksTypeEnum2.default.TYPE.photoAlbum) {
        return migi.createVd("div", [["class", new migi.Obj("worksType", this, function () {
          return 'works fn-clear t' + self.worksType;
        })]], [migi.createCp(_Title2.default, [["ref", "title"], ["worksType", new migi.Obj("worksType", this, function () {
          return self.worksType;
        })], ["detail", this.props.worksDetail]]), migi.createVd("div", [["class", "main"]], [migi.createCp(_PhotoAlbum2.default, [["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })], ["labelList", this.props.labelList]])]), migi.createVd("div", [["class", "side"]], [migi.createVd("div", [["class", "box"]], [migi.createCp(_Author2.default, [["authorList", [this.props.worksDetail.Works_Author]]]), this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length ? migi.createCp(_Timeline2.default, [["datas", this.props.worksDetail.WorkTimeLine]]) : '', this.textData && this.textData.value && this.textData.value.length ? migi.createCp(_Text2.default, [["datas", this.textData]]) : '', migi.createCp(_InspComment2.default, [["ref", "inspComment"], ["commentData", this.props.worksDetail.WorksAuthorComment]])]), migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["isLogin", this.props.isLogin], ["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })], ["workID", new migi.Obj("workID", this, function () {
          return this.workID;
        })], ["originTo", this.props.worksDetail.Title], ["commentData", this.props.commentData]])]), migi.createCp(_AddLabelPanel2.default, [["ref", "addLabelPanel"], ["worksID", new migi.Obj("worksID", this, function () {
          return this.worksID;
        })]]), migi.createCp(_ImageView2.default, [["ref", "imageView"]])]);
      }
      return migi.createVd("div", [["class", new migi.Obj("worksType", this, function () {
        return 'works fn-clear t' + self.worksType;
      })]], [migi.createCp(_Title2.default, [["ref", "title"], ["worksType", new migi.Obj("worksType", this, function () {
        return self.worksType;
      })], ["detail", this.props.worksDetail]]), migi.createVd("div", [["class", "main"]], [migi.createVd("ul", [["class", "type fn-clear"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [this.videoData ? migi.createVd("li", [["class", 'video' + (first === 'video' ? ' cur' : '')], ["rel", "video"]], ["视频"]) : '', this.audioData ? migi.createVd("li", [["class", 'audio' + (first === 'audio' ? ' cur' : '')], ["rel", "audio"]], ["音频"]) : ''] /*<li class="link" rel="link">站外链接</li>*/
      ), migi.createCp(_Media2.default, [["ref", "media"], ["worksID", new migi.Obj("worksID", this, function () {
        return this.worksID;
      })], ["workID", new migi.Obj("workID", this, function () {
        return this.workID;
      })], ["cover", this.props.worksDetail.cover_Pic], ["audioData", this.audioData], ["videoData", this.videoData], ["first", first]]), migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["isLogin", this.props.isLogin], ["worksID", new migi.Obj("worksID", this, function () {
        return this.worksID;
      })], ["workID", new migi.Obj("workID", this, function () {
        return this.workID;
      })], ["originTo", this.props.worksDetail.Title], ["commentData", this.props.commentData]])]), migi.createVd("div", [["class", "side"]], [migi.createVd("ul", [["class", "sel fn-clear"], ["ref", "sel"]], [migi.createVd("li", [["class", "cur"]], ["简介"])]), migi.createVd("div", [["class", "box box-fn-top-left"]], [migi.createCp(_Author2.default, [["authorList", this.authorList]]), this.props.worksDetail.WorkTimeLine && this.props.worksDetail.WorkTimeLine.length ? migi.createCp(_Timeline2.default, [["datas", this.props.worksDetail.WorkTimeLine]]) : '', this.textData && this.textData.value && this.textData.value.length ? migi.createCp(_Text2.default, [["datas", this.textData]]) : '', this.lyricData && this.lyricData.value && this.lyricData.value.length ? migi.createCp(_Lyric2.default, [["datas", this.lyricData]]) : '', migi.createCp(_InspComment2.default, [["ref", "inspComment"], ["commentData", this.props.worksDetail.WorksAuthorComment]]), this.posterData ? migi.createCp(_Poster2.default, [["datas", this.posterData]]) : ''])]), migi.createCp(_AddLabelPanel2.default, [["ref", "addLabelPanel"], ["worksID", new migi.Obj("worksID", this, function () {
        return this.worksID;
      })]])]);
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
  }]);

  return Works;
}(migi.Component);

migi.name(Works, "Works");exports.default = Works;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _WorksTypeEnum = __webpack_require__(6);

var _WorksTypeEnum2 = _interopRequireDefault(_WorksTypeEnum);

var _worksState = __webpack_require__(20);

var _worksState2 = _interopRequireDefault(_worksState);

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

    _this.title = _this.props.detail.Title;
    _this.subTitle = _this.props.detail.sub_Title;
    _this.type = _this.props.detail.WorkType;
    _this.popular = _this.props.detail.Popular;
    _this.tags = _this.props.detail.ReturnTagData;
    return _this;
  }

  _createClass(Title, [{
    key: 'clickAdd',
    value: function clickAdd() {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      migi.eventBus.emit('add-label');
    }
  }, {
    key: 'render',
    value: function render() {
      var hasCover = this.props.detail.cover_Pic;
      return migi.createVd("div", [["class", 'mod mod-title' + (hasCover ? '' : ' no-cover')]], [hasCover ? migi.createVd("div", [["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img200_200_80(this.props.detail.cover_Pic))]])]) : '', migi.createVd("div", [["class", "txt"]], [migi.createVd("h3", [], [new migi.Obj("type", this, function () {
        return _WorksTypeEnum2.default.NAME[this.type];
      })]), migi.createVd("h1", [["class", new migi.Obj("title", this, function () {
        return this.title ? '' : 'empty';
      })]], [new migi.Obj("title", this, function () {
        return this.title || '待揭秘';
      })]), migi.createVd("h2", [["class", new migi.Obj("subTitle", this, function () {
        return this.subTitle ? '' : 'fn-hide';
      })]], [new migi.Obj("subTitle", this, function () {
        return this.subTitle;
      })]),, /*<small class="pop">{ this.popular }</small>*/
      migi.createVd("ul", [["class", 'tags fn-clear']], [new migi.Obj("tags", this, function () {
        return (this.tags || []).map(function (item) {
          return migi.createVd("li", [["rel", item.ID]], [item.Tag_Name]);
        });
      })]
      // this.type === 1 ? <li class="add" onClick={ this.clickAdd }/> : ''

      )]), migi.createVd("div", [["class", "plus"]], [migi.createVd("span", [["class", "state"]], [_worksState2.default.getStateStr(this.props.worksType, this.props.detail.WorkState)])])]);
    }
  }, {
    key: 'title',
    set: function set(v) {
      this.__setBind("title", v);this.__data("title");
    },
    get: function get() {
      return this.__getBind("title");
    }
  }, {
    key: 'subTitle',
    set: function set(v) {
      this.__setBind("subTitle", v);this.__data("subTitle");
    },
    get: function get() {
      return this.__getBind("subTitle");
    }
  }, {
    key: 'type',
    set: function set(v) {
      this.__setBind("type", v);this.__data("type");
    },
    get: function get() {
      return this.__getBind("type");
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
    key: 'popular',
    set: function set(v) {
      this.__setBind("popular", v);this.__data("popular");
    },
    get: function get() {
      return this.__getBind("popular");
    }
  }]);

  return Title;
}(migi.Component);

migi.name(Title, "Title");exports.default = Title;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Audio = __webpack_require__(74);

var _Audio2 = _interopRequireDefault(_Audio);

var _Video = __webpack_require__(75);

var _Video2 = _interopRequireDefault(_Video);

var _Link = __webpack_require__(76);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Media = function (_migi$Component) {
  _inherits(Media, _migi$Component);

  function Media() {
    var _ref;

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _classCallCheck(this, Media);

    var _this = _possibleConstructorReturn(this, (_ref = Media.__proto__ || Object.getPrototypeOf(Media)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var audio = self.ref.audio;
      var video = self.ref.video;
      if (audio) {
        audio.on('switchTo', function (data) {
          self.emit('switchTo', data);
        });
      }
      if (video) {
        video.on('switchTo', function (index, data) {
          self.emit('switchTo', data);
        });
      }
    });
    return _this;
  }

  _createClass(Media, [{
    key: 'switchType',
    value: function switchType(type) {
      var self = this;
      var audio = self.ref.audio;
      var video = self.ref.video;
      var link = self.ref.link;
      if (type === 'audio') {
        // link.hide();
        video && video.pause().hide();
        audio.show();
        self.emit('switchTo', audio.datas[audio.index || 0]);
      } else if (type === 'video') {
        // link.hide();
        audio && audio.pause().hide();
        video.show();
        self.emit('switchTo', video.datas[video.index || 0]);
      } else if (type === 'link') {
        audio && audio.pause().hide();
        video && video.pause().hide();
        link.show();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-media box box-fn-top-left"], ["style", 'background-image:url(' + this.props.cover + ')']], [this.props.audioData ? migi.createCp(_Audio2.default, [["ref", "audio"], ["cover", this.props.cover], ["datas", this.props.audioData], ["show", this.props.first === 'audio'], ["worksID", this.props.worksID], ["workID", this.props.workID]]) : '', this.props.videoData ? migi.createCp(_Video2.default, [["ref", "video"], ["cover", this.props.cover], ["datas", this.props.videoData], ["show", this.props.first === 'video'], ["worksID", this.props.worksID], ["workID", this.props.workID]]) : ''] /*<Link ref="link" worksID={ this.props.worksID } audioData={ this.props.audioData } videoData={ this.props.videoData }/>*/
      );
    }
  }]);

  return Media;
}(migi.Component);

migi.name(Media, "Media");exports.default = Media;

/***/ }),
/* 74 */
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

var _LyricsParser = __webpack_require__(7);

var _LyricsParser2 = _interopRequireDefault(_LyricsParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isVStart = void 0;
var vOffsetX = void 0;
var isStart = void 0;
var offsetX = void 0;

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
    if (self.props.datas) {
      self.setData(self.props.datas);
      if (self.props.workID) {
        self.props.datas.forEach(function (item, i) {
          if (item.ItemID.toString() === self.props.workID) {
            self.index = i;
          }
        });
      }
      if (self.props.show) {
        self.on(migi.Event.DOM, function () {
          var uid = window.$CONFIG ? $CONFIG.uid : '';
          var key = uid + 'volume';
          self.volume = localStorage[key];
          self.addMedia();
          $(self.ref.fn.element).removeClass('fn-hidden');
        });
      }
      self.on(migi.Event.DOM, function () {
        $(document).on('mousemove', this.mousemove.bind(this));
        $(document).on('mouseup', this.mouseup.bind(this));
        $(document).on('mousemove', this.vmousemove.bind(this));
        $(document).on('mouseup', this.vmouseup.bind(this));
      });
    }
    return _this;
  }

  _createClass(Audio, [{
    key: 'setData',
    value: function setData(datas) {
      var self = this;
      self.datas = datas;
      datas.forEach(function (item) {
        var l = {};
        if (_LyricsParser2.default.isLyrics(item.lrc)) {
          l.is = true;
          l.txt = _LyricsParser2.default.getTxt(item.lrc);
          l.data = _LyricsParser2.default.parse(item.lrc);
        } else {
          l.is = false;
          l.txt = item.lrc;
        }
        item.formatLyrics = l;
      });
      return this;
    }
  }, {
    key: 'addMedia',
    value: function addMedia() {
      var audio = migi.createVd("audio", [["src", this.datas[0].FileUrl], ["onTimeupdate", this.onTimeupdate.bind(this)], ["onLoadedmetadata", this.onLoadedmetadata.bind(this)], ["onPlaying", this.onPlaying.bind(this)], ["onPause", this.onPause.bind(this)], ["onProgress", this.onProgress.bind(this)], ["preload", "meta"]], ["\n\
        your browser does not support the audio tag\n\
      "]);
      this.audio = audio;
      audio.appendTo(this.element);
      this.volume = this.volume;
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      if (!this.audio) {
        var uid = window.$CONFIG ? $CONFIG.uid : '';
        var key = uid + 'volume';
        this.volume = localStorage[key];
        this.addMedia();
      }
      if (parent && parent !== window && parent.setHash) {
        this.index = this.index || 0;
        parent.setHash('/works/' + this.props.worksID + '/' + this.datas[this.index].ItemID, true);
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
      var item = this.datas[this.index || 0];
      var formatLyrics = item.formatLyrics;
      var formatLyricsData = formatLyrics.data;
      if (formatLyrics.is && formatLyricsData.length) {
        var tempIndex = this.lyricsIndex;
        for (var i = 0, len = formatLyricsData.length; i < len; i++) {
          if (currentTime * 1000 >= formatLyricsData[i].timestamp) {
            tempIndex = i;
          } else {
            break;
          }
        }
        if (tempIndex !== this.lyricsIndex) {
          this.lyricsIndex = tempIndex;
        }
      }
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
    value: function onPause(e) {}
  }, {
    key: 'play',
    value: function play() {
      if (this.datas[this.index || 0].FileUrl) {
        this.audio.element.play();
        this.isPlaying = true;
        this.hasStart = true;
      }
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.audio && this.audio.element.pause();
      this.isPlaying = false;
      return this;
    }
  }, {
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      if (this.index !== tvd.props.rel) {
        this.index = tvd.props.rel;
        this.audio.element.src = this.datas[this.index || 0].FileUrl;
        this.pause();
        this.emit('switchTo', this.datas[this.index || 0]);
        if (parent && parent !== window && parent.setHash) {
          parent.setHash('/works/' + this.props.worksID + '/' + this.datas[this.index].ItemID, true);
        }
      }
    }
  }, {
    key: 'altLyrics',
    value: function altLyrics() {
      this.showLyricsMode = !this.showLyricsMode;
    }
  }, {
    key: 'vmousedown',
    value: function vmousedown(e) {
      e.preventDefault();
      isVStart = true;
      vOffsetX = $(this.ref.volume.element).offset().left;
    }
  }, {
    key: 'vmousemove',
    value: function vmousemove(e) {
      if (isVStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - vOffsetX;
        var width = $(this.ref.volume.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.volume = percent;
      }
    }
  }, {
    key: 'vmouseup',
    value: function vmouseup() {
      isVStart = false;
    }
  }, {
    key: 'clickStart',
    value: function clickStart(e) {
      this.play();
    }
  }, {
    key: 'clickVolume',
    value: function clickVolume(e) {
      var cn = e.target.className;
      if (cn !== 'p' && cn.indexOf('icon') === -1) {
        var $volume = $(this.ref.volume.element);
        var left = $volume.offset().left;
        var x = e.pageX - left;
        var percent = x / $volume.width();
        this.volume = percent;
      }
    }
  }, {
    key: 'clickMute',
    value: function clickMute(e) {
      this.muted = !this.muted;
      if (this.muted) {
        this.audio.element.volume = 0;
      } else {
        this.audio.element.volume = this.volume;
      }
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      e.preventDefault();
      if (this.canControl) {
        isStart = true;
        offsetX = $(this.ref.progress.element).offset().left;
        this.pause();
      }
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (isStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - offsetX;
        var width = $(this.ref.progress.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.setBarPercent(percent);
        this.audio.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
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
        this.audio.element.currentTime = this.currentTime = currentTime;
      }
    }
  }, {
    key: 'setBarPercent',
    value: function setBarPercent(percent) {
      percent *= 100;
      $(this.ref.vol.element).css('width', percent + '%');
      $(this.ref.p.element).css('-moz-transform', 'translateX(' + percent + '%)');
      $(this.ref.p.element).css('-webkit-transform', 'translateX(' + percent + '%)');
      $(this.ref.p.element).css('transform', 'translateX(' + percent + '%)');
    }
  }, {
    key: 'clickPlay',
    value: function clickPlay(e) {
      this.isPlaying ? this.pause() : this.play();
    }
  }, {
    key: 'clickLike',
    value: function clickLike(e, vd) {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        var data = self.datas[self.index || 0];
        _net2.default.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISLike = res.data === 211;
            self.fnLike = null;
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      var data = self.datas[self.index || 0];
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = false;
            self.fnFavor = null;
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
        _net2.default.postJSON('/api/works/favorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = true;
            self.fnFavor = null;
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
      if (!$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'clickShare',
    value: function clickShare() {
      var url = location.origin + '/works/' + this.props.worksID;
      url += '/' + this.datas[this.index || 0].ItemID;
      migi.eventBus.emit('SHARE', url);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", new migi.Obj(["datas", "index"], this, function () {
        return 'audio' + (this.props.show ? '' : ' fn-hide') + (this.datas[this.index || 0].FileUrl ? '' : ' empty');
      })]], [migi.createVd("ul", [["class", new migi.Obj(["index", "datas"], this, function () {
        return 'type fn-clear' + ((this.index, this.datas || []).length === 1 ? ' single' : '');
      })], ["onClick", new migi.Cb(this, this.clickType)]], [new migi.Obj(["index", "datas"], this, function () {
        return (this.index, this.datas || []).map(function (item, index) {
          return migi.createVd("li", [["class", (this.index === undefined ? index === 0 : this.index === index) ? 'cur' : ''], ["rel", index]], [item.Tips || '歌曲']);
        }.bind(this));
      })]), migi.createVd("h3", [], [new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].ItemName;
      })]), migi.createVd("div", [["class", "num fn-hide"]], [migi.createVd("small", [["class", "play"]], [new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].PlayHis || 0;
      })])]), migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", new migi.Obj("hasStart", this, function () {
        return 'lyrics' + (this.hasStart ? '' : ' fn-hidden');
      })], ["ref", "lyrics"]], [migi.createVd("div", [["class", new migi.Obj(["showLyricsMode", "datas", "index"], this, function () {
        return 'roll' + (!this.showLyricsMode && this.datas[this.index || 0].formatLyrics.data ? '' : ' fn-hide');
      })]], [migi.createVd("div", [["class", "c"], ["ref", "lyricsRoll"], ["style", new migi.Obj("lyricsIndex", this, function () {
        return '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)';
      })]], [new migi.Obj(["datas", "index"], this, function () {
        return (this.datas[this.index || 0].formatLyrics.data || []).map(function (item) {
          return migi.createVd("pre", [], [item.txt || '&nbsp;']);
        });
      })])]), migi.createVd("div", [["class", new migi.Obj(["showLyricsMode", "datas", "index"], this, function () {
        return 'line' + (this.showLyricsMode && this.datas[this.index || 0].formatLyrics.txt ? '' : ' fn-hide');
      })]], [migi.createVd("pre", [["style", new migi.Obj("lyricsIndex", this, function () {
        return '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)';
      })]], [new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].formatLyrics.txt;
      })])])]), migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'start' + (this.isPlaying ? ' fn-hide' : '');
      })], ["onClick", new migi.Cb(this, this.clickStart)]])]), migi.createVd("div", [["class", "fn fn-hidden"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("b", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'lyrics' + (this.showLyricsMode ? '' : ' roll');
      })], ["onClick", new migi.Cb(this, this.altLyrics)]]), migi.createVd("div", [["class", "volume"], ["ref", "volume"], ["onClick", new migi.Cb(this, this.clickVolume)]], [migi.createVd("b", [["class", new migi.Obj("muted", this, function () {
        return 'icon' + (this.muted ? ' muted' : '');
      })], ["onClick", new migi.Cb(this, this.clickMute)]]), migi.createVd("b", [["class", "vol"], ["style", new migi.Obj("volume", this, function () {
        return 'width:' + this.volume * 100 + '%';
      })]]), migi.createVd("b", [["class", "p"], ["onMouseDown", new migi.Cb(this, this.vmousedown)], ["style", new migi.Obj("volume", this, function () {
        return '-moz-transform:translateX(' + this.volume * 100 + '%);-webkit-transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)';
      })]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("small", [["class", "time"]], [new migi.Obj("currentTime", this, function () {
        return _util2.default.formatTime(this.currentTime * 1000);
      })]), migi.createVd("small", [["class", "time end"]], [new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"], ["onMouseDown", new migi.Cb(this, this.mousedown)]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnLike"], this, function () {
        return 'like' + (this.datas[this.index || 0].ISLike || this.fnLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnFavor"], this, function () {
        return 'favor' + (this.datas[this.index || 0].ISFavor || this.fnFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].FileUrl;
      })], ["download", new migi.Obj(["datas", "index"], this, function () {
        return (this.datas[this.index || 0].ItemName || '') + (this.datas[this.index || 0].FileUrl ? /\.\w+$/.exec(this.datas[this.index || 0].FileUrl)[0] || '' : '');
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
      return this.__getBind("index");
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
    key: 'hasStart',
    set: function set(v) {
      this.__setBind("hasStart", v);this.__data("hasStart");
    },
    get: function get() {
      return this.__getBind("hasStart");
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
    key: 'lyricsIndex',
    set: function set(v) {
      this.__setBind("lyricsIndex", v);this.__data("lyricsIndex");
    },
    get: function get() {
      if (this.__initBind("lyricsIndex")) this.__setBind("lyricsIndex", 0);return this.__getBind("lyricsIndex");
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
    key: 'canControl',
    set: function set(v) {
      this.__setBind("canControl", v);this.__data("canControl");
    },
    get: function get() {
      return this.__getBind("canControl");
    }
  }, {
    key: 'muted',
    set: function set(v) {
      this.__setBind("muted", v);this.__data("muted");
    },
    get: function get() {
      return this.__getBind("muted");
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
    key: 'fnFavor',
    set: function set(v) {
      this.__setBind("fnFavor", v);this.__data("fnFavor");
    },
    get: function get() {
      return this.__getBind("fnFavor");
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._currentTime || 0;
    },
    set: function set(v) {
      this._currentTime = v;
      ;this.__array("currentTime", v);this.__data("currentTime");
    }
  }, {
    key: 'volume',
    get: function get() {
      return this._volume || 0.5;
    },
    set: function set(v) {
      this._volume = v;
      migi.eventBus.emit('SET_VOLUME', v);
      if (this.audio) {
        this.audio.element.volume = v;
      }
      ;this.__array("volume", v);this.__data("volume");
    }
  }]);

  return Audio;
}(migi.Component);

migi.name(Audio, "Audio");exports.default = Audio;

/***/ }),
/* 75 */
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

var isVStart = void 0;
var vOffsetX = void 0;
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
      self.props.datas.forEach(function (item, i) {
        if (item.ItemID.toString() === self.props.workID) {
          self.index = i;
        }
      });
      if (self.props.show) {
        self.on(migi.Event.DOM, function () {
          var uid = window.$CONFIG ? $CONFIG.uid : '';
          var key = uid + 'volume';
          self.volume = localStorage[key];
          self.addMedia();
          $(self.ref.fn.element).removeClass('fn-hidden');
        });
      }
      self.on(migi.Event.DOM, function () {
        $(document).on('mousemove', this.mousemove.bind(this));
        $(document).on('mouseup', this.mouseup.bind(this));
        $(document).on('mousemove', this.vmousemove.bind(this));
        $(document).on('mouseup', this.vmouseup.bind(this));
      });
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
      var video = migi.createVd("video", [["ref", "video"], ["src", this.datas[this.index || 0].FileUrl], ["onClick", this.clickPlay.bind(this)], ["onTimeupdate", this.onTimeupdate.bind(this)], ["onLoadedmetadata", this.onLoadedmetadata.bind(this)], ["onPause", this.onPause.bind(this)], ["onPlaying", this.onPlaying.bind(this)], ["preload", "meta"], ["playsinline", "true"], ["webkit-playsinline", "true"]], ["\n\
      your browser does not support the video tag\n\
    "]);
      this.video = video;
      video.prependTo(this.ref.c.element);
      this.volume = this.volume;
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      if (!this.video) {
        var uid = window.$CONFIG ? $CONFIG.uid : '';
        var key = uid + 'volume';
        this.volume = localStorage[key];
        this.addMedia();
      }
      if (parent && parent !== window && parent.setHash) {
        this.index = this.index || 0;
        parent.setHash('/works/' + this.props.worksID + '/' + this.datas[this.index].ItemID, true);
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
      if (this.datas[this.index || 0].FileUrl) {
        this.video.element.play();
        this.isPlaying = true;
      }
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
        this.video.element.src = this.datas[this.index || 0].FileUrl;
        this.pause();
        this.emit('switchTo', this.datas[this.index || 0]);
        if (parent && parent !== window && parent.setHash) {
          parent.setHash('/works/' + this.props.worksID + '/' + this.datas[this.index].ItemID, true);
        }
      }
    }
  }, {
    key: 'vmousedown',
    value: function vmousedown(e) {
      e.preventDefault();
      isVStart = true;
      vOffsetX = $(this.ref.volume.element).offset().left;
    }
  }, {
    key: 'vmousemove',
    value: function vmousemove(e) {
      if (isVStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - vOffsetX;
        var width = $(this.ref.volume.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.volume = percent;
      }
    }
  }, {
    key: 'vmouseup',
    value: function vmouseup() {
      isVStart = false;
    }
  }, {
    key: 'clickStart',
    value: function clickStart(e) {
      this.play();
    }
  }, {
    key: 'clickVolume',
    value: function clickVolume(e) {
      var cn = e.target.className;
      if (cn !== 'p' && cn.indexOf('icon') === -1) {
        var $volume = $(this.ref.volume.element);
        var left = $volume.offset().left;
        var x = e.pageX - left;
        var percent = x / $volume.width();
        this.volume = percent;
      }
    }
  }, {
    key: 'clickMute',
    value: function clickMute(e) {
      this.muted = !this.muted;
      if (this.muted) {
        this.video.element.volume = 0;
      } else {
        this.video.element.volume = this.volume;
      }
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
    key: 'mousedown',
    value: function mousedown(e) {
      e.preventDefault();
      if (this.canControl) {
        isStart = true;
        offsetX = $(this.ref.progress.element).offset().left;
        this.pause();
      }
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (isStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - offsetX;
        var width = $(this.ref.progress.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.setBarPercent(percent);
        this.video.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
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
        this.video.element.currentTime = this.currentTime = currentTime;
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
    key: 'clickLike',
    value: function clickLike(e, vd) {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        var data = self.datas[self.index || 0];
        _net2.default.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISLike = res.data === 211;
            self.fnLike = null;
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      var data = self.datas[self.index || 0];
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = false;
            self.fnFavor = null;
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
        _net2.default.postJSON('/api/works/favorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = true;
            self.fnFavor = null;
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
      if (!$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'clickShare',
    value: function clickShare() {
      var url = location.origin + '/works/' + this.props.worksID;
      url += '/' + this.datas[this.index || 0].ItemID;
      migi.eventBus.emit('SHARE', url);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", new migi.Obj(["datas", "index"], this, function () {
        return 'video' + (this.props.show ? '' : ' fn-hide') + (this.datas[this.index || 0].FileUrl ? '' : ' empty');
      })]], [migi.createVd("ul", [["class", new migi.Obj(["index", "datas"], this, function () {
        return 'type fn-clear' + ((this.index, this.datas || []).length === 1 ? ' single' : '');
      })], ["onClick", new migi.Cb(this, this.clickType)]], [new migi.Obj(["index", "datas"], this, function () {
        return (this.index, this.datas || []).map(function (item, index) {
          return migi.createVd("li", [["class", this.index === index ? 'cur' : ''], ["rel", index]], [item.Tips || '普通版']);
        }.bind(this));
      })]), migi.createVd("h3", [["ref", "title"]], [new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].ItemName;
      })]), migi.createVd("div", [["class", "num fn-hide"]], [migi.createVd("small", [["class", "play"]], [new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].PlayHis || 0;
      })])]), migi.createVd("div", [["class", new migi.Obj("isPlaying", this, function () {
        return 'c' + (this.isPlaying ? ' playing' : '');
      })], ["ref", "c"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'start' + (this.isPlaying ? ' fn-hide' : '');
      })], ["onClick", new migi.Cb(this, this.clickStart)]])]), migi.createVd("div", [["class", "fn fn-hidden"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("b", [["class", "full"], ["onClick", new migi.Cb(this, this.clickScreen)]]), migi.createVd("div", [["class", "volume"], ["ref", "volume"], ["onClick", new migi.Cb(this, this.clickVolume)]], [migi.createVd("b", [["class", new migi.Obj("muted", this, function () {
        return 'icon' + (this.muted ? ' muted' : '');
      })], ["onClick", new migi.Cb(this, this.clickMute)]]), migi.createVd("b", [["class", "vol"], ["style", new migi.Obj("volume", this, function () {
        return 'width:' + this.volume * 100 + '%';
      })]]), migi.createVd("b", [["class", "p"], ["onMouseDown", new migi.Cb(this, this.vmousedown)], ["style", new migi.Obj("volume", this, function () {
        return 'transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)';
      })]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("small", [["class", "time"]], [new migi.Obj("currentTime", this, function () {
        return _util2.default.formatTime(this.currentTime * 1000);
      })]), migi.createVd("small", [["class", "time end"]], [new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"], ["onMouseDown", new migi.Cb(this, this.mousedown)]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnLike"], this, function () {
        return 'like' + (this.datas[this.index || 0].ISLike || this.fnLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj(["datas", "index", "fnFavor"], this, function () {
        return 'favor' + (this.datas[this.index || 0].ISFavor || this.fnFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj(["datas", "index"], this, function () {
        return this.datas[this.index || 0].FileUrl;
      })], ["download", new migi.Obj(["datas", "index"], this, function () {
        return (this.datas[this.index || 0].ItemName || '') + (this.datas[this.index || 0].FileUrl ? /\.\w+$/.exec(this.datas[this.index || 0].FileUrl)[0] || '' : '');
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
      return this.__getBind("index");
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
    key: 'duration',
    set: function set(v) {
      this.__setBind("duration", v);this.__data("duration");
    },
    get: function get() {
      return this.__getBind("duration");
    }
  }, {
    key: 'canControl',
    set: function set(v) {
      this.__setBind("canControl", v);this.__data("canControl");
    },
    get: function get() {
      return this.__getBind("canControl");
    }
  }, {
    key: 'muted',
    set: function set(v) {
      this.__setBind("muted", v);this.__data("muted");
    },
    get: function get() {
      return this.__getBind("muted");
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
      ;this.__array("currentTime", v);this.__data("currentTime");
    }
  }, {
    key: 'volume',
    get: function get() {
      return this._volume || 0.5;
    },
    set: function set(v) {
      this._volume = v;
      migi.eventBus.emit('SET_VOLUME', v);
      if (this.video) {
        this.video.element.volume = v;
      }
      ;this.__array("volume", v);this.__data("volume");
    }
  }]);

  return Video;
}(migi.Component);

migi.name(Video, "Video");exports.default = Video;

/***/ }),
/* 76 */
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

var Link = function (_migi$Component) {
  _inherits(Link, _migi$Component);

  function Link() {
    var _ref;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Link, [{
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
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var self = this;
      if (self.hasContent && !self.loading) {
        var workID = self.ref.select.element.value;
        var url = self.url.trim();
        if (!/^https?:\/\/\w+\.\w+/.test(url)) {
          alert('请输入合法的地址！');
          return;
        }
        self.loading = true;
        _net2.default.postJSON('/api/works/addTempLink', {
          worksID: self.props.worksID,
          workID: workID,
          url: url,
          name: $(self.ref.list.element).find('.cur').attr('rel')
        }, function (res) {
          if (res.success) {
            alert('提交成功，感谢您的参与。');
            self.url = '';
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        });
      }
    }
  }, {
    key: 'input',
    value: function input(e, vd) {
      var v = vd.element.value.trim();
      this.hasContent = !!v.length;
    }
  }, {
    key: 'click',
    value: function click(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var audioData = this.props.audioData;
      var videoData = this.props.videoData;
      var workList = [];
      (videoData || []).forEach(function (item) {
        workList.push({
          id: item.ItemID,
          name: '视频-' + item.ItemName + (item.Tips || '')
        });
      });
      (audioData || []).forEach(function (item) {
        workList.push({
          id: item.ItemID,
          name: '音频-' + item.ItemName + (item.Tips || '')
        });
      });
      return migi.createVd("div", [["class", "link fn-hide"]], [migi.createVd("ul", [["ref", "list"], ["class", "list fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.click)]]]], [migi.createVd("li", [["class", "sing5 cur"], ["rel", "5sing"]], [migi.createVd("h6", [], ["5sing"])]), migi.createVd("li", [["class", "bilibili"], ["rel", "bili"]], [migi.createVd("h6", [], ["bilibili"])]), migi.createVd("li", [["class", "wangyi"], ["rel", "163"]], [migi.createVd("h6", [], ["网易云音乐"])]), migi.createVd("li", [["class", "baidu"], ["rel", "baidu"]], [migi.createVd("h6", [], ["百度音乐人"])])]), migi.createVd("form", [["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("p", [], ["添加站外链接"]), migi.createVd("select", [["ref", "select"]], [workList.map(function (item) {
        return migi.createVd("option", [["value", item.id]], [item.name]);
      })]), migi.createVd("input", [["type", "text"], ["ref", "txt"], ["class", "txt"], ["placeholder", "请输入站外链接"], ["onInput", new migi.Cb(this, this.input)], ["value", new migi.Obj("url", this, function () {
        return this.url;
      })]]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj(["hasContent", "loading"], this, function () {
        return 'sub' + (this.hasContent && !this.loading ? '' : ' dis');
      })], ["value", "确定"]])])]);
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
    key: 'url',
    set: function set(v) {
      this.__setBind("url", v);this.__data("url");
    },
    get: function get() {
      return this.__getBind("url");
    }
  }]);

  return Link;
}(migi.Component);

migi.name(Link, "Link");exports.default = Link;

/***/ }),
/* 77 */
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

var _Comment = __webpack_require__(5);

var _Comment2 = _interopRequireDefault(_Comment);

var _Page = __webpack_require__(8);

var _Page2 = _interopRequireDefault(_Page);

var _SubCmt = __webpack_require__(2);

var _SubCmt2 = _interopRequireDefault(_SubCmt);

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
      var subCmt = self.ref.subCmt;
      var page = self.ref.page;
      var page2 = self.ref.page2;
      var comment = self.ref.comment;
      page.on('page', function (i) {
        page2.index = i;
        skip = (i - 1) * take;
        self.loadPage();
        subCmt.to = '';
      });
      page2.on('page', function (i) {
        page.index = i;
        skip = (i - 1) * take;
        self.loadPage();
        subCmt.to = '';
      });
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
            if (rootID === -1) {
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

  _createClass(WorkComment, [{
    key: 'load',
    value: function load() {
      var self = this;
      var comment = self.ref.comment;
      var page = self.ref.page;
      var page2 = self.ref.page2;
      comment.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = _net2.default.postJSON('/api/works/commentList', { worksID: self.worksID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          currentCount = data.Size;
          skip += take;
          if (data.data.length) {
            comment.message = '';
            comment.appendData(res.data.data);
            page.total = page2.total = Math.ceil(currentCount / take);
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
      return migi.createVd("div", [["class", "mod mod-comment box"]], [migi.createVd("h4", [], ["评论"]), migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部", migi.createVd("small", [], [this.props.commentData.Size])]), this.props.isLogin ? migi.createVd("li", [["rel", "1"]], ["我的"]) : '']), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.commentData.Size / take)]]), migi.createVd("div", [["class", "warn"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", "//zhuanquan.xyz/temp/f3bcae7e2f60d9729a0e205dfb39ca6e.jpg"]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], ["圈儿"]), migi.createVd("small", [["class", "time"]], ["刚刚"])])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], ["自从积分活动开启，我们感受到了大家满满的热情，感谢支持！m(_ _)m\n\
\n\
转圈系统运用了人工智能算法，所以会根据大家留言内容不同对积分数量进行相应地微调。所以请尽量不要发表重复或没有意义的留言哦( •̥́ ˍ •̀ )\n\
也建议大家不要把一段内容在短时间内拆开分多条发布，悄悄告诉大家，这样获得的积分反而比合在一起的要少哦~\n\
\n\
希望大家转圈开心，都能得想要的福利∗ > ɞ &lt;∗很快会有越来越多的新功能解锁哦！"]), migi.createVd("b", [["class", "arrow"]])])]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/works/likeComment"], ["subUrl", "/api/works/subCommentList"], ["delUrl", "/api/works/delComment"], ["data", this.props.commentData.data]]), migi.createCp(_Page2.default, [["ref", "page2"], ["total", Math.ceil(this.props.commentData.Size / take)]]), migi.createCp(_SubCmt2.default, [["ref", "subCmt"], ["originTo", this.props.originTo], ["placeholder", "夸夸这个作品吧"]])]);
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

/***/ }),
/* 78 */
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

var skip = 0;
var take = 12;
var sortType = 0;
var list = [];
var index = 0;
var tagName = void 0;
var ajax = void 0;

var PhotoAlbum = function (_migi$Component) {
  _inherits(PhotoAlbum, _migi$Component);

  function PhotoAlbum() {
    var _ref;

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _classCallCheck(this, PhotoAlbum);

    var _this = _possibleConstructorReturn(this, (_ref = PhotoAlbum.__proto__ || Object.getPrototypeOf(PhotoAlbum)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var $window = $(window);
      self.load($window);
      $window.on('scroll', function () {
        self.checkMore($window);
      });

      var $c = $(self.ref.c.element);
      $c.on('click', '.like', function () {
        var $b = $(this);
        if ($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        var id = $b.attr('itemID');
        _net2.default.postJSON('/api/works/likeWork', { workID: id }, function (res) {
          if (res.success) {
            if (res.data === 211) {
              $b.addClass('has');
            } else {
              $b.removeClass('has');
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
      $c.on('click', '.favor', function () {
        var $b = $(this);
        if ($b.hasClass('loading')) {
          return;
        }
        $b.addClass('loading');
        var id = $b.attr('itemID');
        var url = $b.hasClass('has') ? '/api/works/unFavorWork' : '/api/works/favorWork';
        _net2.default.postJSON(url, { workID: id }, function (res) {
          if (res.success) {
            if (url === '/api/works/favorWork') {
              $b.addClass('has');
            } else {
              $b.removeClass('has');
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $b.removeClass('loading');
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $b.removeClass('loading');
        });
      });
      $c.on('click', 'li', function (e) {
        var $li = $(this);
        if (e.target.nodeName === 'LI' || e.target.nodeName === 'IMG') {
          var _index = $li.attr('rel');
          migi.eventBus.emit('choosePic', list, _index);
        }
      });

      migi.eventBus.on('photoLike', function (data) {
        var $li = $('#photo_' + data.ItemID);
        if (data.ISLike) {
          $li.find('.like').addClass('has');
        } else {
          $li.find('.like').removeClass('has');
        }
      });
      migi.eventBus.on('photoFavor', function (data) {
        var $li = $('#photo_' + data.ItemID);
        if (data.ISLike) {
          $li.find('.favor').addClass('has');
        } else {
          $li.find('.favor').removeClass('has');
        }
      });
    });
    return _this;
  }

  _createClass(PhotoAlbum, [{
    key: 'load',
    value: function load($window) {
      var self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      var $l1 = $(self.ref.l1.element);
      var $l2 = $(self.ref.l2.element);
      var $l3 = $(self.ref.l3.element);
      var $l4 = $(self.ref.l4.element);
      function addWaterFall(li) {
        var $min = $l1;
        if ($l2.height() < $min.height()) {
          $min = $l2;
        }
        if ($l3.height() < $min.height()) {
          $min = $l3;
        }
        if ($l4.height() < $min.height()) {
          $min = $l4;
        }
        li.appendTo($min[0]);
      }
      self.loadImg(function (data) {
        var length = data.data.length;
        var i = 0;
        // 先把有高宽的直接加入流中
        for (; i < length; i++) {
          var item = data.data[i];
          if (item.Width && item.Height) {
            var li = self.genItem(item);
            addWaterFall(li);
          } else {
            break;
          }
        }
        //剩下的先获取高度再加入流
        var num = length - i;
        var count = 0;
        var j = i;
        if (num === 0) {
          self.loading = false;
          if ($(document.body).height() <= $window.height() && !self.loadEnd) {
            self.load($window);
          }
        }
        for (; i < length; i++) {
          var _item = data.data[i];
          self.loadImgSize(_item, function () {
            count++;
            if (count === num) {
              for (; j < length; j++) {
                var _item2 = data.data[j];
                var _li = self.genItem(_item2);
                addWaterFall(_li);
              }
              self.loading = false;
              if ($(document.body).height() <= $window.height() && !self.loadEnd) {
                self.load($window);
              }
            }
          });
        }
      });
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
        self.load($window);
      }
    }
  }, {
    key: 'loadImg',
    value: function loadImg(cb) {
      var self = this;
      if (ajax) {
        ajax.abort();
      }
      ajax = _net2.default.postJSON('/api/works/photoList', { worksID: this.props.worksID, skip: skip, take: take, sortType: sortType, tagName: tagName }, function (res) {
        if (res.success) {
          var data = res.data;
          skip += take;
          if (skip >= data.Size) {
            self.loadEnd = true;
          }
          cb(data);
        } else {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        }
      }, function (res) {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'genItem',
    value: function genItem(data) {
      list.push(data);
      if (data.Width <= 144) {
        return migi.createVd("li", [["rel", index++], ["id", 'photo_' + data.ItemID]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img288__80(data.FileUrl)) || '//zhuanquan.xin/img/blank.png'], ["height", data.Height]]), migi.createVd("b", [["class", 'like' + (data.ISLike ? ' has' : '')], ["itemID", data.ItemID]]), migi.createVd("b", [["class", 'favor' + (data.ISFavor ? ' has' : '')], ["itemID", data.ItemID]])]);
      }
      var height = data.Height * 144 / data.Width;
      return migi.createVd("li", [["rel", index++], ["id", 'photo_' + data.ItemID]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img288__80(data.FileUrl)) || '//zhuanquan.xin/img/blank.png'], ["height", height]]), migi.createVd("b", [["class", 'like' + (data.ISLike ? ' has' : '')], ["itemID", data.ItemID]]), migi.createVd("b", [["class", 'favor' + (data.ISFavor ? ' has' : '')], ["itemID", data.ItemID]])]);
    }
  }, {
    key: 'loadImgSize',
    value: function loadImgSize(data, cb) {
      var img = document.createElement('img');
      img.className = 'temp';
      img.src = _util2.default.autoSsl(_util2.default.img__60(data.FileUrl));
      img.onload = function () {
        data.Width = img.width;
        data.Height = img.height;
        cb();
        document.body.removeChild(img);
      };
      img.onerror = function () {
        data.FileUrl = '//zhuanquan.xin/img/blank.png';
        data.Width = 1;
        data.Height = 100;
        cb();
        document.body.removeChild(img);
      };
      document.body.appendChild(img);
    }
  }, {
    key: 'clear',
    value: function clear() {
      var self = this;
      var $l1 = $(self.ref.l1.element);
      var $l2 = $(self.ref.l2.element);
      var $l3 = $(self.ref.l3.element);
      var $l4 = $(self.ref.l4.element);
      $l1.html('');
      $l2.html('');
      $l3.html('');
      $l4.html('');
      skip = 0;
      self.loadEnd = false;
    }
  }, {
    key: 'switchType',
    value: function switchType(e, vd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      var rel = $ul.find('cur').attr('rel');
      sortType = rel;
      skip = 0;
      this.clear();
      this.load($(window));
    }
  }, {
    key: 'switchType2',
    value: function switchType2(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        tagName = tvd.props.rel;
        this.clear();
        this.load($(window));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-photoalbum box"]], [migi.createVd("h4", [], ["相册"]), migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", ""]], ["全部"]), (this.props.labelList || []).map(function (item) {
        return migi.createVd("li", [["rel", item.Tag_Name]], [item.Tag_Name]);
      })]), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", new migi.Cb(this, this.switchType)]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createVd("div", [["class", "c fn-clear"], ["ref", "c"]], [migi.createVd("ul", [["ref", "l1"]]), migi.createVd("ul", [["ref", "l2"]]), migi.createVd("ul", [["ref", "l3"]]), migi.createVd("ul", [["ref", "l4"]])])]);
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
  }]);

  return PhotoAlbum;
}(migi.Component);

migi.name(PhotoAlbum, "PhotoAlbum");exports.default = PhotoAlbum;

/***/ }),
/* 79 */
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

var first = true;

var AddLabelPanel = function (_migi$Component) {
  _inherits(AddLabelPanel, _migi$Component);

  function AddLabelPanel() {
    var _ref;

    _classCallCheck(this, AddLabelPanel);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = AddLabelPanel.__proto__ || Object.getPrototypeOf(AddLabelPanel)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var $list = $(self.ref.list.element);
      var $has = $(self.ref.has.element);
      $list.on('click', 'li', function () {
        var $li = $(this);
        var id = $li.attr('rel');
        var name = $li.text();
        if ($li.hasClass('cur')) {
          $li.removeClass('cur');
          $has.find('li[rel="' + id + '"]').remove();
        } else {
          $li.addClass('cur');
          $has.append('<li rel="' + id + '">' + name + '</li>');
        }
      });
      $has.on('click', 'li', function () {
        var $li = $(this);
        var id = $li.attr('rel');
        $li.remove();
        $list.find('li[rel="' + id + '"]').removeClass('cur');
      });
    });
    return _this;
  }

  _createClass(AddLabelPanel, [{
    key: 'show',
    value: function show() {
      var self = this;
      $(self.element).removeClass('fn-hide');
      if (first) {
        first = false;
        _net2.default.postJSON('/api/user/labelList', { worksID: self.props.worksID }, function (res) {
          if (res.success) {
            var data = res.data;
            self.list = data.AllLabel;
            var $list = $(self.ref.list.element);
            var $has = $(self.ref.has.element);
            (data.ChangeLabel || []).forEach(function (item) {
              var id = item.ID;
              var name = item.Tag_Name;
              $list.find('li[rel="' + id + '"]').addClass('cur');
              $has.append('<li rel="' + id + '">' + name + '</li>');
            });
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
        });
      }
      var parent = window.parent;
      if (parent !== window && parent.upZIndex) {
        parent.upZIndex();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      var parent = window.parent;
      if (parent !== window && parent.downZIndex) {
        parent.downZIndex();
      }
    }
  }, {
    key: 'clickOK',
    value: function clickOK() {
      var self = this;
      if (!self.dis) {
        var $has = $(self.ref.has.element);
        var ids = [];
        $has.find('li').each(function (i, li) {
          ids.push($(li).attr('rel'));
        });
        self.dis = true;
        _net2.default.postJSON('/api/user/addLabel', { labelID: ids.join(','), worksID: self.props.worksID }, function (res) {
          if (res.success) {} else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          self.hide();
          self.dis = false;
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          self.hide();
          self.dis = false;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "add-label fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("label", [["class", "l1"]], ["添加标签"]), migi.createVd("ul", [["class", "list fn-clear"], ["ref", "list"]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return migi.createVd("li", [["rel", item.ID]], [item.Tag_Name]);
        });
      })]), migi.createVd("b", [["class", "line"]]), migi.createVd("label", [["class", "l2"]], ["已选标签"]), migi.createVd("ul", [["class", "has fn-clear"], ["ref", "has"]]), migi.createVd("button", [["class", new migi.Obj("dis", this, function () {
        return this.dis ? 'dis' : '';
      })], ["onClick", new migi.Cb(this, this.clickOK)]], ["选好啦！"]), migi.createVd("b", [["class", "close"], ["onClick", new migi.Cb(this, this.hide)]])])]);
    }
  }, {
    key: 'list',
    set: function set(v) {
      this.__setBind("list", v);this.__data("list");
    },
    get: function get() {
      return this.__getBind("list");
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

  return AddLabelPanel;
}(migi.Component);

migi.name(AddLabelPanel, "AddLabelPanel");exports.default = AddLabelPanel;

/***/ }),
/* 80 */
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

var list = [];
var index = 0;

var ImageView = function (_migi$Component) {
  _inherits(ImageView, _migi$Component);

  function ImageView() {
    var _ref;

    _classCallCheck(this, ImageView);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ImageView.__proto__ || Object.getPrototypeOf(ImageView)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var $window = $(window);
      migi.eventBus.on('choosePic', function (l, i) {
        self.show();
        self.top = $window.scrollTop();
        list = l;
        index = i;
        self.data = list[index];
      });
    });
    return _this;
  }

  _createClass(ImageView, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      var parent = window.parent;
      if (parent !== window && parent.upZIndex) {
        parent.upZIndex();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      var parent = window.parent;
      if (parent !== window && parent.downZIndex) {
        parent.downZIndex();
      }
    }
  }, {
    key: 'clickPrev',
    value: function clickPrev() {
      if (index) {
        var self = this;
        self.data = list[--index];
      }
    }
  }, {
    key: 'clickNext',
    value: function clickNext() {
      if (index < list.length - 1) {
        var self = this;
        self.data = list[++index];
      }
    }
  }, {
    key: 'clickClose',
    value: function clickClose() {
      this.hide();
    }
  }, {
    key: 'clickLike',
    value: function clickLike(e, vd) {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        var data = self.data;
        _net2.default.postJSON('/api/works/likeWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISLike = res.data === 211;
            self.fnLike = null;
            migi.eventBus.emit('photoLike', data);
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      var data = self.data;
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = false;
            self.fnFavor = null;
            migi.eventBus.emit('photoFavor', data);
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
        _net2.default.postJSON('/api/works/favorWork', { workID: data.ItemID }, function (res) {
          if (res.success) {
            data.ISFavor = true;
            self.fnFavor = null;
            migi.eventBus.emit('photoFavor', data);
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
      if (!$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "image-view fn-hide"]], [migi.createVd("div", [["class", "c"], ["style", new migi.Obj("top", this, function () {
        return 'top:' + this.top + 'px';
      })]], [migi.createVd("img", [["src", new migi.Obj("data", this, function () {
        return _util2.default.autoSsl(_util2.default.img__60(this.data.FileUrl)) || '//zhuanquan.xin/img/blank.png';
      })], ["style", new migi.Obj("data", this, function () {
        return 'width:' + this.data.Width + 'px;';
      })]]), migi.createVd("h3", [], [new migi.Obj("data", this, function () {
        return this.data.ItemName;
      }), migi.createVd("small", [], [new migi.Obj("data", this, function () {
        return this.data.Tips;
      })])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj(["data", "fnLike"], this, function () {
        return 'like' + (this.data.ISLike || this.fnLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj(["data", "fnFavor"], this, function () {
        return 'favor' + (this.data.ISFavor || this.fnFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("data", this, function () {
        return this.data.FileUrl;
      })], ["target", "_blank"], ["download", new migi.Obj("data", this, function () {
        return this.data.ItemName + (this.data.FileUrl ? /\.\w+$/.exec(this.data.FileUrl)[0] || '' : '');
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])])])]), migi.createVd("b", [["class", "prev"], ["onClick", new migi.Cb(this, this.clickPrev)]]), migi.createVd("b", [["class", "next"], ["onClick", new migi.Cb(this, this.clickNext)]]), migi.createVd("b", [["class", "close"], ["onClick", new migi.Cb(this, this.clickClose)]])]);
    }
  }, {
    key: 'data',
    set: function set(v) {
      this.__setBind("data", v);this.__data("data");
    },
    get: function get() {
      if (this.__initBind("data")) this.__setBind("data", {});return this.__getBind("data");
    }
  }, {
    key: 'top',
    set: function set(v) {
      this.__setBind("top", v);this.__data("top");
    },
    get: function get() {
      if (this.__initBind("top")) this.__setBind("top", 0);return this.__getBind("top");
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
    key: 'fnFavor',
    set: function set(v) {
      this.__setBind("fnFavor", v);this.__data("fnFavor");
    },
    get: function get() {
      return this.__getBind("fnFavor");
    }
  }]);

  return ImageView;
}(migi.Component);

migi.name(ImageView, "ImageView");exports.default = ImageView;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Cover = __webpack_require__(82);

var _Cover2 = _interopRequireDefault(_Cover);

var _Player = __webpack_require__(83);

var _Player2 = _interopRequireDefault(_Player);

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
    self.on(migi.Event.DOM, function () {
      var cover = self.ref.cover;
      var player = self.ref.player;
      cover.on('start', function () {
        self.start();
      });
      migi.eventBus.on('chooseMusic', function () {
        cover.hide();
        player.show();
      });
    });
    return _this;
  }

  _createClass(Media, [{
    key: 'switchType',
    value: function switchType(type) {
      var self = this;
      var cover = self.ref.cover;
      var player = self.ref.player;
      if (type === 'cover') {
        player.hide();
        player.pause();
        cover.show();
      } else if (type === 'player') {
        cover.hide();
        player.show();
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var self = this;
      var cover = self.ref.cover;
      var player = self.ref.player;
      cover.hide();
      player.show();
      player.play();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "mod mod-musicalbum box box-fn-top-left"], ["style", 'background-image:url("' + (this.props.cover || '//zhuanquan.xin/img/blank.png') + '")']], [migi.createCp(_Cover2.default, [["ref", "cover"]]), migi.createCp(_Player2.default, [["ref", "player"], ["workList", this.props.workList], ["worksID", this.props.worksID], ["workID", this.props.workID]])]);
    }
  }]);

  return Media;
}(migi.Component);

migi.name(Media, "Media");exports.default = Media;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cover = function (_migi$Component) {
  _inherits(Cover, _migi$Component);

  function Cover() {
    var _ref;

    _classCallCheck(this, Cover);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Cover.__proto__ || Object.getPrototypeOf(Cover)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Cover, [{
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
    key: 'clickStart',
    value: function clickStart() {
      this.emit('start');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cover"]], [migi.createVd("b", [["class", "start"], ["onClick", new migi.Cb(this, this.clickStart)]])]);
    }
  }]);

  return Cover;
}(migi.Component);

migi.name(Cover, "Cover");exports.default = Cover;

/***/ }),
/* 83 */
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

var isVStart = void 0;
var vOffsetX = void 0;
var isStart = void 0;
var offsetX = void 0;

var Player = function (_migi$Component) {
  _inherits(Player, _migi$Component);

  function Player() {
    var _ref;

    _classCallCheck(this, Player);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Player.__proto__ || Object.getPrototypeOf(Player)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.workList && self.props.workList.length) {
      if (self.props.workID) {
        self.props.workList.forEach(function (item, i) {
          if (self.props.workID === item.ItemID.toString()) {
            self.setItem(self.props.workList[i]);
          }
        });
      } else {
        self.setItem(self.props.workList[0]);
      }
      self.on(migi.Event.DOM, function () {
        var uid = window.$CONFIG ? $CONFIG.uid : '';
        var key = uid + 'volume';
        self.volume = localStorage[key];
        self.addOrAltMedia();
        $(self.ref.fn.element).removeClass('fn-hidden');

        $(document).on('mousemove', this.mousemove.bind(this));
        $(document).on('mouseup', this.mouseup.bind(this));
        $(document).on('mousemove', this.vmousemove.bind(this));
        $(document).on('mouseup', this.vmouseup.bind(this));
      });
      migi.eventBus.on('chooseMusic', function (item) {
        self.currentTime = 0;
        self.setItem(item);
        self.addOrAltMedia();
      });
    }
    return _this;
  }

  _createClass(Player, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide hidden');
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: 'hidden',
    value: function hidden() {
      $(this.element).addClass('hidden');
    }
  }, {
    key: 'setItem',
    value: function setItem(item) {
      var self = this;
      self.item = item;
      self.type = item.ItemType;
      self.workID = item.ItemID;
      self.sname = item.ItemName;
      self.url = item.FileUrl;
      self.playNum = item.PlayHis;
      self.formatLyrics = item.formatLyrics || {};
      self.like = item.ISLike;
      self.favor = item.ISFavor;
      self.cover = item.WorksCoverPic;
    }
  }, {
    key: 'addOrAltMedia',
    value: function addOrAltMedia() {
      var self = this;
      var isPlaying = self.isPlaying;
      self.pause();
      switch (self.type) {
        case 1111:
        case 1113:
          if (!self.audio) {
            self.audio = migi.createVd("audio", [["src", self.url], ["onTimeupdate", self.onTimeupdate.bind(self)], ["onLoadedmetadata", self.onLoadedmetadata.bind(self)], ["onPlaying", self.onPlaying.bind(self)], ["onPause", self.onPause.bind(self)], ["onProgress", self.onProgress.bind(self)], ["preload", "meta"]], ["\n\
            your browser does not support the audio tag\n\
          "]);
            self.audio.appendTo(self.ref.c.element);
          } else {
            self.audio.element.src = self.url;
          }
          self.av = self.audio;
          break;
        case 2110:
          if (!self.video) {
            self.video = migi.createVd("video", [["ref", "video"], ["src", self.url], ["onClick", self.clickPlay.bind(self)], ["onTimeupdate", self.onTimeupdate.bind(self)], ["onLoadedmetadata", self.onLoadedmetadata.bind(self)], ["onPause", self.onPause.bind(self)], ["onPlaying", self.onPlaying.bind(self)], ["preload", "meta"], ["playsinline", "true"], ["webkit-playsinline", "true"]], ["\n\
            your browser does not support the video tag\n\
          "]);
            self.video.appendTo(self.ref.c.element);
          } else {
            self.video.element.src = self.url;
          }
          self.av = self.video;
          break;
      }
      self.volume = self.volume;
      self.av.element.currentTime = self.currentTime = 0;
      if (isPlaying) {
        self.play();
      }
    }
  }, {
    key: 'onTimeupdate',
    value: function onTimeupdate(e) {
      var self = this;
      var currentTime = self.currentTime = e.target.currentTime;
      var formatLyrics = self.formatLyrics || {};
      var formatLyricsData = formatLyrics.data;
      if (formatLyrics.is && formatLyricsData.length) {
        var tempIndex = this.lyricsIndex;
        for (var i = 0, len = formatLyricsData.length; i < len; i++) {
          if (currentTime * 1000 >= formatLyricsData[i].timestamp) {
            tempIndex = i;
          } else {
            break;
          }
        }
        if (tempIndex !== this.lyricsIndex) {
          this.lyricsIndex = tempIndex;
        }
      }
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
    value: function onPause(e) {}
  }, {
    key: 'play',
    value: function play() {
      if (this.url) {
        this.av && this.av.element.play();
        this.isPlaying = true;
        this.hasStart = true;
        migi.eventBus.emit('play');
      }
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.av && this.av.element.pause();
      this.isPlaying = false;
      migi.eventBus.emit('pause');
      return this;
    }
  }, {
    key: 'altLyrics',
    value: function altLyrics() {
      this.showLyricsMode = !this.showLyricsMode;
    }
  }, {
    key: 'vmousedown',
    value: function vmousedown(e) {
      e.preventDefault();
      isVStart = true;
      vOffsetX = $(this.ref.volume.element).offset().left;
    }
  }, {
    key: 'vmousemove',
    value: function vmousemove(e) {
      if (isVStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - vOffsetX;
        var width = $(this.ref.volume.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.volume = percent;
      }
    }
  }, {
    key: 'vmouseup',
    value: function vmouseup() {
      isVStart = false;
    }
  }, {
    key: 'clickStart',
    value: function clickStart(e) {
      this.play();
    }
  }, {
    key: 'clickVolume',
    value: function clickVolume(e) {
      var cn = e.target.className;
      if (cn !== 'p' && cn.indexOf('icon') === -1) {
        var $volume = $(this.ref.volume.element);
        var left = $volume.offset().left;
        var x = e.pageX - left;
        var percent = x / $volume.width();
        this.volume = percent;
      }
    }
  }, {
    key: 'clickMute',
    value: function clickMute(e) {
      this.muted = !this.muted;
      if (this.muted) {
        this.audio.element.volume = 0;
      } else {
        this.audio.element.volume = this.volume;
      }
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      e.preventDefault();
      if (this.canControl) {
        isStart = true;
        offsetX = $(this.ref.progress.element).offset().left;
        this.pause();
      }
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (isStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - offsetX;
        var width = $(this.ref.progress.element).width();
        diff = Math.max(0, diff);
        diff = Math.min(width, diff);
        var percent = diff / width;
        this.setBarPercent(percent);
        this.av.element.currentTime = this.currentTime = Math.floor(this.duration * percent);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
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
        this.av.element.currentTime = this.currentTime = currentTime;
      }
    }
  }, {
    key: 'setBarPercent',
    value: function setBarPercent(percent) {
      percent *= 100;
      $(this.ref.vol.element).css('width', percent + '%');
      $(this.ref.p.element).css('-moz-transform', 'translateX(' + percent + '%)');
      $(this.ref.p.element).css('-webkit-transform', 'translateX(' + percent + '%)');
      $(this.ref.p.element).css('transform', 'translateX(' + percent + '%)');
    }
  }, {
    key: 'clickPlay',
    value: function clickPlay(e) {
      this.isPlaying ? this.pause() : this.play();
    }
  }, {
    key: 'clickLike',
    value: function clickLike(e, vd) {
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        var data = self.item;
        _net2.default.postJSON('/api/works/likeWork', { workID: self.workID }, function (res) {
          if (res.success) {
            data.ISLike = self.like = res.data === 211;
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      var data = self.item;
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: self.workID }, function (res) {
          if (res.success) {
            data.ISFavor = self.favor = false;
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
        _net2.default.postJSON('/api/works/favorWork', { workID: self.workID }, function (res) {
          if (res.success) {
            data.ISFavor = self.favor = true;
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
      if (!$CONFIG.isLogin) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'clickShare',
    value: function clickShare() {
      migi.eventBus.emit('SHARE', location.href);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'player fn-hide'], ["style", new migi.Obj("cover", this, function () {
        return 'background-image:url("' + (this.cover || '//zhuanquan.xin/img/blank.png') + '")';
      })]], [migi.createVd("h3", [], [new migi.Obj("sname", this, function () {
        return this.sname;
      })]), migi.createVd("div", [["class", "num fn-hide"]], [migi.createVd("small", [["class", "play"]], [new migi.Obj("playNum", this, function () {
        return this.playNum || 0;
      })])]), migi.createVd("div", [["class", new migi.Obj(["isPlaying", "type"], this, function () {
        return 'c' + (this.isPlaying ? ' playing' : '') + (this.type === 2110 ? ' tvideo' : '');
      })], ["ref", "c"]], [migi.createVd("div", [["class", new migi.Obj("hasStart", this, function () {
        return 'lyrics' + (this.hasStart ? '' : ' fn-hide');
      })], ["ref", "lyrics"]], [migi.createVd("div", [["class", new migi.Obj(["showLyricsMode", "formatLyrics"], this, function () {
        return 'roll' + (!this.showLyricsMode && this.formatLyrics.data ? '' : ' fn-hide');
      })]], [migi.createVd("div", [["class", "c"], ["ref", "lyricsRoll"], ["style", new migi.Obj("lyricsIndex", this, function () {
        return '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)';
      })]], [new migi.Obj("formatLyrics", this, function () {
        return (this.formatLyrics.data || []).map(function (item) {
          return migi.createVd("pre", [], [item.txt || '&nbsp;']);
        });
      })])]), migi.createVd("div", [["class", new migi.Obj(["showLyricsMode", "formatLyrics"], this, function () {
        return 'line' + (this.showLyricsMode && this.formatLyrics.txt ? '' : ' fn-hide');
      })]], [migi.createVd("pre", [["style", new migi.Obj("lyricsIndex", this, function () {
        return '-moz-transform:translateX(' + this.lyricsIndex * 20 + 'px);-webkit-transform:translateY(-' + this.lyricsIndex * 20 + 'px);transform:translateY(-' + this.lyricsIndex * 20 + 'px)';
      })]], [new migi.Obj("formatLyrics", this, function () {
        return this.formatLyrics.txt;
      })])])]), migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'start' + (this.isPlaying ? ' fn-hide' : '');
      })], ["onClick", new migi.Cb(this, this.clickStart)]])]), migi.createVd("div", [["class", "fn fn-hidden"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("b", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'lyrics' + (this.showLyricsMode ? '' : ' roll');
      })], ["onClick", new migi.Cb(this, this.altLyrics)]]), migi.createVd("div", [["class", "volume"], ["ref", "volume"], ["onClick", new migi.Cb(this, this.clickVolume)]], [migi.createVd("b", [["class", new migi.Obj("muted", this, function () {
        return 'icon' + (this.muted ? ' muted' : '');
      })], ["onClick", new migi.Cb(this, this.clickMute)]]), migi.createVd("b", [["class", "vol"], ["style", new migi.Obj("volume", this, function () {
        return 'width:' + this.volume * 100 + '%';
      })]]), migi.createVd("b", [["class", "p"], ["onMouseDown", new migi.Cb(this, this.vmousedown)], ["style", new migi.Obj("volume", this, function () {
        return '-moz-transform:translateX(' + this.volume * 100 + '%);-webkit-transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)';
      })]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("small", [["class", "time"]], [new migi.Obj("currentTime", this, function () {
        return _util2.default.formatTime(this.currentTime * 1000);
      })]), migi.createVd("small", [["class", "time end"]], [new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"], ["onMouseDown", new migi.Cb(this, this.mousedown)]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj("like", this, function () {
        return 'like' + (this.like ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj("favor", this, function () {
        return 'favor' + (this.favor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("url", this, function () {
        return this.url;
      })], ["download", new migi.Obj(["sname", "url"], this, function () {
        return (this.sname || '') + (this.url ? /\.\w+$/.exec(this.url)[0] || '' : '');
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])])])]);
    }
  }, {
    key: 'item',
    set: function set(v) {
      this.__setBind("item", v);this.__data("item");
    },
    get: function get() {
      return this.__getBind("item");
    }
  }, {
    key: 'type',
    set: function set(v) {
      this.__setBind("type", v);this.__data("type");
    },
    get: function get() {
      return this.__getBind("type");
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
    key: 'sname',
    set: function set(v) {
      this.__setBind("sname", v);this.__data("sname");
    },
    get: function get() {
      return this.__getBind("sname");
    }
  }, {
    key: 'url',
    set: function set(v) {
      this.__setBind("url", v);this.__data("url");
    },
    get: function get() {
      return this.__getBind("url");
    }
  }, {
    key: 'playNum',
    set: function set(v) {
      this.__setBind("playNum", v);this.__data("playNum");
    },
    get: function get() {
      return this.__getBind("playNum");
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
    key: 'hasStart',
    set: function set(v) {
      this.__setBind("hasStart", v);this.__data("hasStart");
    },
    get: function get() {
      return this.__getBind("hasStart");
    }
  }, {
    key: 'formatLyrics',
    set: function set(v) {
      this.__setBind("formatLyrics", v);this.__data("formatLyrics");
    },
    get: function get() {
      if (this.__initBind("formatLyrics")) this.__setBind("formatLyrics", {});return this.__getBind("formatLyrics");
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
    key: 'lyricsIndex',
    set: function set(v) {
      this.__setBind("lyricsIndex", v);this.__data("lyricsIndex");
    },
    get: function get() {
      if (this.__initBind("lyricsIndex")) this.__setBind("lyricsIndex", 0);return this.__getBind("lyricsIndex");
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
    key: 'canControl',
    set: function set(v) {
      this.__setBind("canControl", v);this.__data("canControl");
    },
    get: function get() {
      return this.__getBind("canControl");
    }
  }, {
    key: 'muted',
    set: function set(v) {
      this.__setBind("muted", v);this.__data("muted");
    },
    get: function get() {
      return this.__getBind("muted");
    }
  }, {
    key: 'like',
    set: function set(v) {
      this.__setBind("like", v);this.__data("like");
    },
    get: function get() {
      return this.__getBind("like");
    }
  }, {
    key: 'favor',
    set: function set(v) {
      this.__setBind("favor", v);this.__data("favor");
    },
    get: function get() {
      return this.__getBind("favor");
    }
  }, {
    key: 'cover',
    set: function set(v) {
      this.__setBind("cover", v);this.__data("cover");
    },
    get: function get() {
      return this.__getBind("cover");
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._currentTime || 0;
    },
    set: function set(v) {
      this._currentTime = v;
      ;this.__array("currentTime", v);this.__data("currentTime");
    }
  }, {
    key: 'volume',
    get: function get() {
      return this._volume || 0.5;
    },
    set: function set(v) {
      this._volume = v;
      migi.eventBus.emit('SET_VOLUME', v);
      if (this.av) {
        this.av.element.volume = v;
      }
      ;this.__array("volume", v);this.__data("volume");
    }
  }]);

  return Player;
}(migi.Component);

migi.name(Player, "Player");exports.default = Player;

/***/ })
/******/ ])));