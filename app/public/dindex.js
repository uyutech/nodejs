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
/******/ 	return __webpack_require__(__webpack_require__.s = 147);
/******/ })
/************************************************************************/
/******/ ({

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(148);

var _TopNav = __webpack_require__(69);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _CIframe = __webpack_require__(149);

var _CIframe2 = _interopRequireDefault(_CIframe);

var _QuanNiang = __webpack_require__(150);

var _QuanNiang2 = _interopRequireDefault(_QuanNiang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var topNav = migi.preExist(migi.createCp(_TopNav2.default, [["userInfo", $CONFIG.userInfo]]));

var cIframe = void 0;

var quanNiang = migi.render(migi.createCp(_QuanNiang2.default, []), document.body);

migi.render(migi.createVd("div", [["class", "info"]]), document.body);

window.setHash = function (hash) {
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

function iframeGoto(hash) {
  hash = hash || '';
  hash = hash.replace(/^#/, '');
  if (!hash || hash === '/') {
    hash = '/find';
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

/***/ 148:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 149:
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

/***/ 150:
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
      timeout = setTimeout(function () {
        $txt.addClass('fn-hide');
      }, 5000);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "quaniang"]], [migi.createVd("a", [["href", "#"], ["class", "pic"], ["onClick", new migi.Cb(this, this.click)]]), migi.createVd("div", [["class", "txt fn-hide"], ["ref", "txt"]], [migi.createVd("h5", [], ["圈娘："]), migi.createVd("pre", [], [new migi.Obj("message", this, function () {
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

/***/ 69:
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
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        location.hash = '/my';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var userInfo = this.props.userInfo || {};
      return migi.createVd("div", [["class", "cp-topnav"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("a", [["class", "logo"], ["href", "#/"]], ["转圈还在测试中，感谢您的关注和包涵！我们会努力做得更好！"]),,,, /*<form class="search" onSubmit={ this.submit }>*/
      /*<input type="text" ref="input" maxlength="16" placeholder="弱弱的初级搜索功能QAQ"/>*/
      /*</form>*/
      migi.createVd("div", [["class", "user"], ["onClick", new migi.Cb(this, this.click)]], [migi.createVd("span", [], [userInfo.NickName || '登陆/注册']), migi.createVd("img", [["src", userInfo.Head_Url || '//zhuanquan.xyz/img/blank.png']])])])]);
    }
  }]);

  return TopNav;
}(migi.Component);

migi.name(TopNav, "TopNav");exports.default = TopNav;

/***/ })

/******/ });