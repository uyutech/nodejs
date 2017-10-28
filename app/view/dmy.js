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
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
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
  img90_90: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var userInfo = data.userInfo;
  var follows = data.follows;
  var favors = data.favors;

  var my = migi.preRender(migi.createCp(_My2.default, [["userInfo", userInfo], ["follows", follows], ["favors", favors]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dmy.css') + '"/>\n</head>\n<body>\n<div id="page">' + my + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.userInfo = ' + JSON.stringify(userInfo) + ';\n  $CONFIG.follows = ' + JSON.stringify(follows) + ';\n  $CONFIG.favors = ' + JSON.stringify(favors) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dmy.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _My = __webpack_require__(90);

var _My2 = _interopRequireDefault(_My);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _Profile = __webpack_require__(91);

var _Profile2 = _interopRequireDefault(_Profile);

var _Follow = __webpack_require__(92);

var _Follow2 = _interopRequireDefault(_Follow);

var _Favor = __webpack_require__(93);

var _Favor2 = _interopRequireDefault(_Favor);

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
        if (parent && parent !== window && parent.goto) {
          parent.goto('/login');
        } else {
          location.href = '/login';
        }
      }, function (res) {
        alert(res.message || util.ERROR_MESSAGE);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "my"]], [migi.createCp(_Profile2.default, [["userInfo", this.props.userInfo]]), migi.createVd("div", [["class", "c"]], [migi.createCp(_Follow2.default, [["ref", "follow"], ["list", this.props.follows]])] /*<Favor ref="favor" list={ this.props.favors }/>*/
      ), migi.createVd("a", [["href", "#"], ["class", "loginout"], ["onClick", new migi.Cb(this, this.clickOut)]], ["退出登录"])]);
    }
  }]);

  return My;
}(migi.Component);

migi.name(My, "My");exports.default = My;

/***/ }),

/***/ 91:
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

// import Spark from 'spark-md5';

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
    self.name = self.props.userInfo.NickName;
    self.on(migi.Event.DOM, function () {
      var name = self.ref.name;
      var input = self.ref.input;
    });
    return _this;
  }

  _createClass(Profile, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      $(self.ref.name.element).addClass('fn-hide');
      $(self.ref.edit.element).addClass('fn-hide');
      $(self.ref.input.element).removeClass('fn-hide').focus().val(self.name);
    }
  }, {
    key: 'blur',
    value: function blur() {
      var self = this;
      $(self.ref.name.element).removeClass('fn-hide');
      $(self.ref.input.element).addClass('fn-hide');
      var $edit = $(self.ref.edit.element);
      var newName = $(self.ref.input.element).val().trim();
      if (newName !== self.name) {
        _net2.default.postJSON('/api/user/updateNickName', { nickName: newName }, function (res) {
          if (res.success) {
            self.name = newName;
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
          $edit.removeClass('fn-hide');
        }, function (res) {
          alert(res.message || _util2.default.ERROR_MESSAGE);
          $edit.removeClass('fn-hide');
        });
      }
    }
  }, {
    key: 'change',
    value: function change(e) {
      if (window.FileReader) {
        var self = this;
        var file = e.target.files[0];
        var size = file.size;
        if (size && size !== 0 && size <= 1024 * 100) {
          var $upload = $(self.ref.upload.element);
          $upload.addClass('fn-hide');
          var fileReader = new FileReader();
          fileReader.onload = function () {
            _net2.default.postJSON('/api/user/uploadHead', { img: fileReader.result }, function (res) {
              if (res.success) {
                self.head = _util2.default.autoSsl(_util2.default.img144_144(res.url));
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
          alert('图片体积太大啦，不能超过100k！');
        }
      } else {
        alert('您的浏览器暂不支持上传，请暂时使用Chrome或者IE10以上浏览器。');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("div", [["class", "pic"]], [migi.createVd("img", [["src", new migi.Obj("head", this, function () {
        return this.head || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png';
      })]]),,,] /*<div class="upload" ref="upload">*/
      /*<input type="file" onChange={ this.change } accept="image/gif, image/jpeg, image/png"/>*/
      /*</div>*/
      ), migi.createVd("div", [["class", "txt"]], [migi.createVd("strong", [["ref", "name"]], [new migi.Obj("name", this, function () {
        return this.name;
      })]),,] /*<input ref="input" type="text" class="fn-hide" value="" onBlur={ this.blur }/>*/
      /*<b class="edit" ref="edit" onClick={ this.click }/>*/
      )]);
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
    key: 'name',
    set: function set(v) {
      this.__setBind("name", v);this.__data("name");
    },
    get: function get() {
      return this.__getBind("name");
    }
  }]);

  return Profile;
}(migi.Component);

migi.name(Profile, "Profile");exports.default = Profile;

/***/ }),

/***/ 92:
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
    return _this;
  }

  _createClass(Follow, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "follow"]], [migi.createVd("h4", [], ["我的关注"]), migi.createVd("ul", [["class", "list fn-clear"]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/author/' + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", item.Head_url || '//zhuanquan.xin/head/0d90e4f2e6f7ef48992df6b49f54cf40.png']])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [item.AuthorName]), migi.createVd("div", [["class", "info"]], [item.FansNumber, "粉丝"])]);
        });
      })])]);
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

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Favor = function (_migi$Component) {
  _inherits(Favor, _migi$Component);

  function Favor() {
    var _ref;

    _classCallCheck(this, Favor);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Favor.__proto__ || Object.getPrototypeOf(Favor)).call.apply(_ref, [this].concat(data)));

    _this.list = _this.props.list;
    return _this;
  }

  _createClass(Favor, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "favor"]], [migi.createVd("h4", [], ["我的收藏"]), migi.createVd("ul", [["class", "list fn-clear"]], [new migi.Obj("list", this, function () {
        return (this.list || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '/works/' + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", item.cover_Pic || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "ath"]], [item.SingerName])]), migi.createVd("a", [["href", "#"], ["class", "txt"]], [item.Title])]);
        });
      })])]);
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

  return Favor;
}(migi.Component);

migi.name(Favor, "Favor");exports.default = Favor;

/***/ })

/******/ })));