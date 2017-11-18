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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
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

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var head = data.ctx.session.head;
  var isPublic = data.ctx.session.isPublic;
  var circleID = data.circleID;
  var circleDetail = data.circleDetail;

  var subPost = migi.preRender(migi.createCp(_SubPost2.default, [["circleID", circleID], ["circleDetail", circleDetail], ["placeholder", '在' + circleDetail.TagName + '圈画个圈吧'], ["isPublic", isPublic], ["head", head]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getMHead({ title: '发新帖子' }) + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/mcpost.css') + '"/>\n</head>\n<body>\n<div id="page">' + subPost + '</div>\n' + data.helper.getMTopNav() + '\n' + data.helper.getMBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.circleID = ' + data.helper.stringify(circleID) + ';\n  $CONFIG.circleDetail = ' + data.helper.stringify(circleDetail) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/mcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/mcpost.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _SubPost = __webpack_require__(68);

var _SubPost2 = _interopRequireDefault(_SubPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 68:
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
    self.originTo = self.props.circleDetail.TagName;
    self.placeholder = self.props.placeholder;
    self.on(migi.Event.DOM, function () {
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
    });
    return _this;
  }

  _createClass(SubPost, [{
    key: 'input',
    value: function input(e, vd) {
      var self = this;
      var $vd = $(vd.element);
      self.num = $vd.val().length;
      self.num = $vd.val().trim().length;
      var content = $vd.val().trim();
      self.invalid = content.length < 3 || content.length > MAX_TEXT_LENGTH;
      self.warnLength = content.length > MAX_TEXT_LENGTH;
      var key2 = self.getContentKey();
      localStorage[key2] = content;
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.ref.form.element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
            location.href = '/circle/' + self.props.circleID;
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
          if (size && size !== 0 && size < 1024 * 1024 * 15) {
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
                  self.list[i + self.imgNum].state = STATE.ERROR;
                }
              } else {
                self.list[i + self.imgNum] = null;
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
      var self = this;
      var i = tvd.props.idx;
      if (self.list[i].state === STATE.LOADED || self.list[i].state === STATE.ERROR) {
        self.delCache(tvd.props.rel);
        self.list.splice(i, 1);
        self.imgNum = self.list.length;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("form", [["class", "mod-sub"], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("div", [["class", "ti"]], [migi.createVd("a", [["href", '/circle/' + this.props.circleID], ["class", "close"], ["title", "返回"]]), this.props.isPublic ? migi.createVd("img", [["src", this.props.head]]) : '', migi.createVd("span", [["class", new migi.Obj("warnLength", this, function () {
        return 'limit' + (this.warnLength ? ' warn' : '');
      })]], [migi.createVd("strong", [], [new migi.Obj("num", this, function () {
        return this.num;
      })]), " / ", MAX_TEXT_LENGTH]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj(["sending", "invalid", "disableUpload"], this, function () {
        return 'submit' + (this.sending || this.invalid || this.disableUpload ? ' dis' : '');
      })], ["value", new migi.Obj("value", this, function () {
        return this.value.trim().length ? this.value.trim().length < 3 ? '-${n}'.replace('${n}', 3 - this.value.trim().length) : '发送' : '发送';
      })]])]), migi.createVd("div", [["class", "ti2"]], [migi.createVd("label", [["class", "cur"]], [new migi.Obj(["to", "originTo"], this, function () {
        return this.to || this.originTo;
      }), "圈"]), migi.createVd("div", [["class", new migi.Obj("disableUpload", this, function () {
        return 'upload' + (this.disableUpload ? ' dis' : '');
      })]], ["\n\
          图片\n\
          ", migi.createVd("input", [["type", "file"], ["ref", "file"], ["class", "file"], ["onChange", new migi.Cb(this, this.change)], ["disabled", new migi.Obj("disableUpload", this, function () {
        return !!this.disableUpload;
      })], ["multiple", "multiple"], ["accept", "image/gif, image/jpeg, image/png"]])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("textarea", [["class", "text"], ["ref", "input"], ["placeholder", new migi.Obj("placeholder", this, function () {
        return this.placeholder || '夸夸这个圈子吧';
      })], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)]], [new migi.Obj("value", this, function () {
        return this.value;
      })])]), migi.createVd("ul", [["class", "list"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickImg)]]]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item, i) {
          return migi.createVd("li", [["class", 's' + item.state], ["idx", i], ["rel", item.url], ["style", 'background-image:url(' + _util2.default.autoSsl(_util2.default.img120_120_80(item.url)) + ')']], [migi.createVd("span", [], [TEXT[item.state]])]);
        });
      })])]);
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