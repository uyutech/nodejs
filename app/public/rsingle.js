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
/******/ 	return __webpack_require__(__webpack_require__.s = 209);
/******/ })
/************************************************************************/
/******/ ({

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(210);

var _TopNav = __webpack_require__(211);

var _TopNav2 = _interopRequireDefault(_TopNav);

var _BotNav = __webpack_require__(212);

var _BotNav2 = _interopRequireDefault(_BotNav);

var _Share = __webpack_require__(213);

var _Share2 = _interopRequireDefault(_Share);

var _NeedLogin = __webpack_require__(214);

var _NeedLogin2 = _interopRequireDefault(_NeedLogin);

var _Luck = __webpack_require__(215);

var _Luck2 = _interopRequireDefault(_Luck);

var _Index = __webpack_require__(216);

var _Index2 = _interopRequireDefault(_Index);

var _Geography = __webpack_require__(217);

var _Geography2 = _interopRequireDefault(_Geography);

var _History = __webpack_require__(218);

var _History2 = _interopRequireDefault(_History);

var _Legend = __webpack_require__(219);

var _Legend2 = _interopRequireDefault(_Legend);

var _Character = __webpack_require__(220);

var _Character2 = _interopRequireDefault(_Character);

var _Rhyme = __webpack_require__(221);

var _Rhyme2 = _interopRequireDefault(_Rhyme);

var _Work = __webpack_require__(222);

var _Work2 = _interopRequireDefault(_Work);

var _About = __webpack_require__(233);

var _About2 = _interopRequireDefault(_About);

var _SComment = __webpack_require__(234);

var _SComment2 = _interopRequireDefault(_SComment);

var _Grid = __webpack_require__(235);

var _Grid2 = _interopRequireDefault(_Grid);

var _animaQuerystring = __webpack_require__(236);

var _animaQuerystring2 = _interopRequireDefault(_animaQuerystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var search = _animaQuerystring2.default.parse(location.search.replace(/^\?/, ''));
var cid = window.cid = search.cid;

var $page = $('#page');
migi.eventBus.on('changeBgi', function (name) {
  if (/^https?:/.test(name)) {
    $page.css('background-image', 'url(' + name + ')');
    return;
  }
  $page.removeAttr('style');
  $page[0].className = 'page';
  $page.addClass(name);
});

var last = void 0;

var topNav = migi.render(migi.createCp(_TopNav2.default, []), document.body);

var audio = migi.render(migi.createVd("audio", [["autoplay", "autoplay"], ["loop", "loop"]], [migi.createVd("source", [["src", "//zhuanquan.xyz/rhymesland/bgm.mp3"], ["type", "audio/mpeg"]])]), document.body);

topNav.on('music', function (bool) {
  if (bool) {
    audio.element.play();
  } else {
    audio.element.pause();
  }
});

var luck = void 0;
var index = void 0;
var geography = void 0;
var history = void 0;
var legend = void 0;
var character = void 0;
var rhyme = void 0;
var work = void 0;
var about = void 0;
var scomment = void 0;
var grid = void 0;

var botNav = migi.render(migi.createCp(_BotNav2.default, []), document.body);

var share = migi.render(migi.createCp(_Share2.default, []), document.body);
migi.eventBus.on('share', function (url) {
  share.url = url;
  share.show();
});

var needLogin = migi.render(migi.createCp(_NeedLogin2.default, []), document.body);
migi.eventBus.on('NEED_LOGIN', function (message) {
  needLogin.message = message;
  needLogin.show();
});

if (window.IS_MOBILE) {
  topNav.on('clickLogo', function () {
    botNav.clickLogo();
  });
}

function hashchange(hash) {
  hash = hash || '';
  botNav.hl(hash.slice(1));
  if (last) {
    last.hide();
  }
  //是否展示返回按钮
  if (window.history.length) {
    topNav.showBack();
  } else {
    topNav.hideBack();
  }
  $page.scrollTop(0);
  // 移动除了个别页，其它均默认隐藏botNav的子导航
  if (window.IS_MOBILE) {
    botNav.hideMenu();
    botNav.showBall();
  }
  topNav.show();
  botNav.show();
  //work特殊处理id
  if (hash.indexOf('#work') === 0) {
    if (!work) {
      work = migi.render(migi.createCp(_Work2.default, []), '#page');
    }
    last = work;
    var id = hash.slice('#work'.length);
    work.setId(id);
    migi.eventBus.emit('changeBgi', 'work' + id);
    botNav.hideMenu();
    topNav.stop();
    if (window.IS_MOBILE) {
      botNav.hideBall();
    }
  }
  //单独评论特殊处理id
  else if (hash.indexOf('#comment') === 0) {
      if (!scomment) {
        scomment = migi.render(migi.createCp(_SComment2.default, []), '#page');
      }
      last = scomment;
      migi.eventBus.emit('changeBgi', 'scomment');
      topNav.name = '留言';
      topNav.play();
    }
    //单独人物特殊处理
    else if (hash.indexOf('#character') === 0) {
        if (!character) {
          character = migi.render(migi.createCp(_Character2.default, []), '#page');
        }
        last = character;
        migi.eventBus.emit('changeBgi', 'character');
        var name = hash.slice('#character'.length);
        switch (name) {
          case 'muhan':
            topNav.name = '慕寒';
            break;
          case 'hetu':
            topNav.name = '河图';
            break;
          case 'mi':
            topNav.name = '弥';
            break;
          case 'sixia':
            topNav.name = '司夏';
            break;
          case 'jiemeng':
            topNav.name = '结梦';
            break;
        }
        character.user(name);
        topNav.play();
      }
      //其它
      else {
          switch (hash) {
            case '#luck':
              if (!luck) {
                luck = migi.render(migi.createCp(_Luck2.default, []), '#page');
                luck.on('ok', function () {
                  hashchange();
                });
              }
              last = luck;
              migi.eventBus.emit('changeBgi', 'luck');
              topNav.name = '提示';
              botNav.showMenu();
              break;
            case '#geography':
              if (!geography) {
                geography = migi.render(migi.createCp(_Geography2.default, []), '#page');
              }
              last = geography;
              migi.eventBus.emit('changeBgi', 'geography');
              topNav.name = '地理';
              break;
            case '#rhyme':
              if (!rhyme) {
                rhyme = migi.render(migi.createCp(_Rhyme2.default, []), '#page');
              }
              last = rhyme;
              migi.eventBus.emit('changeBgi', 'rhyme');
              topNav.name = '歌谣';
              break;
            case '#legend':
              if (!legend) {
                legend = migi.render(migi.createCp(_Legend2.default, []), '#page');
              }
              last = legend;
              migi.eventBus.emit('changeBgi', 'legend');
              topNav.name = '传记';
              break;
            case 'rhyme':
              if (!rhyme) {
                rhyme = migi.render(migi.createCp(_Rhyme2.default, []), '#page');
              }
              last = rhyme;
              migi.eventBus.emit('changeBgi', 'rhyme');
              topNav.name = '歌谣';
              break;
            case '#history':
              if (!history) {
                history = migi.render(migi.createCp(_History2.default, []), '#page');
              }
              last = history;
              migi.eventBus.emit('changeBgi', 'history');
              topNav.name = '历史';
              break;
            case '#about':
              if (!about) {
                about = migi.render(migi.createCp(_About2.default, []), '#page');
              }
              last = about;
              migi.eventBus.emit('changeBgi', 'history');
              topNav.name = '关于';
              break;
            case '#grid':
              if (!grid) {
                grid = migi.render(migi.createCp(_Grid2.default, []), '#page');
              }
              last = grid;
              migi.eventBus.emit('changeBgi', 'grid');
              topNav.name = '皎然浮生';
              break;
            default:
              if (!index) {
                index = migi.render(migi.createCp(_Index2.default, []), '#page');
              }
              last = index;
              migi.eventBus.emit('changeBgi', 'index');
              topNav.name = '首页';
              botNav.showMenu();
              break;
          }
          topNav.play();
        }
  if (last) {
    last.show();
  }
}

var cookieHash = $.cookie('hash');
if (cookieHash) {
  location.hash = cookieHash;
  $.removeCookie('hash');
} else if (cid) {
  hashchange('#comment' + cid);
} else {
  hashchange(location.hash);
}

topNav.on('back', function () {
  window.history.back();
});

$(window).on('hashchange', function () {
  hashchange(location.hash);
});

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pause = false;

var TopNav = function (_migi$Component) {
  _inherits(TopNav, _migi$Component);

  function TopNav() {
    var _ref;

    _classCallCheck(this, TopNav);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    _this.on(migi.Event.DOM, function () {
      var music = this.ref.music.element;
      var i = 0;
      function play() {
        if (!pause) {
          if (++i >= 50) {
            i = 0;
          }
          music.className = 'music music' + i;
        }
      }
      setInterval(play, 40);
      migi.eventBus.on('changeTitle', function (t) {
        self.name = t;
      });
    });
    return _this;
  }

  _createClass(TopNav, [{
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
    key: 'resize',
    value: function resize() {
      // let width = $(this.ref.bg.element).width();console.log(width);
      // $(this.ref.bg.element).css('height', width);
      // $(this.ref.fg.element).css('height', width * 0.8);
    }
  }, {
    key: 'clickLogo',
    value: function clickLogo() {
      this.emit('clickLogo');
    }
  }, {
    key: 'clickMusic',
    value: function clickMusic(e, vd) {
      pause = !pause;
      if (pause) {
        this.ref.music.element.className = 'music';
      }
      this.emit('music', !pause);
    }
  }, {
    key: 'stop',
    value: function stop() {
      pause = true;
      this.ref.music.element.className = 'music';
      this.emit('music', !pause);
    }
  }, {
    key: 'play',
    value: function play() {
      pause = false;
      this.emit('music', !pause);
    }
  }, {
    key: 'clickBack',
    value: function clickBack() {
      this.emit('back');
    }
  }, {
    key: 'showBack',
    value: function showBack() {
      $(this.ref.back.element).removeClass('fn-hide');
    }
  }, {
    key: 'hideBack',
    value: function hideBack() {
      $(this.ref.back.element).addClass('fn-hide');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "top-nav fn-hide"]], [migi.createVd("div", [["class", "ti"]], [migi.createVd("b", [["class", "bg"], ["ref", "bg"]]), migi.createVd("b", [["class", "fg"], ["ref", "fg"]]), migi.createVd("span", [["onClick", new migi.Cb(this, this.clickLogo)]], [new migi.Obj("name", this, function () {
        return this.name || '首页';
      })])]), migi.createVd("b", [["ref", "back"], ["class", "back fn-hide"], ["onClick", new migi.Cb(this, this.clickBack)]]), migi.createVd("b", [["ref", "music"], ["class", "music"], ["onClick", new migi.Cb(this, this.clickMusic)]])]);
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

  return TopNav;
}(migi.Component);

migi.name(TopNav, "TopNav");exports.default = TopNav;

/***/ }),

/***/ 212:
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

    var _this = _possibleConstructorReturn(this, (_ref = BotNav.__proto__ || Object.getPrototypeOf(BotNav)).call.apply(_ref, [this].concat(data)));

    _this.on(migi.Event.DOM, function () {
      var $cloud = $(this.ref.cloud.element);
      var $window = $(window);
      $window.on('mousemove', function (e) {
        var x = e.pageX;
        var y = e.pageY;
        $cloud.css('-webkit-transform', 'translate3d(' + x / 50 + 'px,' + -y / 50 + 'px,0)');
        $cloud.css('transform', 'translate3d(' + x / 50 + 'px,' + -y / 50 + 'px,0)');
      });
    });
    return _this;
  }

  _createClass(BotNav, [{
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
    key: 'click',
    value: function click(e, vd, tvd) {
      // e.preventDefault();
      var li = tvd.parent;
      var $li = $(li.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      $(this.element).find('.cur').removeClass('cur');
    }
  }, {
    key: 'clickLogo',
    value: function clickLogo() {
      $(this.ref.list.element).toggleClass('alt');
    }
  }, {
    key: 'showMenu',
    value: function showMenu() {
      $(this.ref.list.element).removeClass('alt');
    }
  }, {
    key: 'hideMenu',
    value: function hideMenu() {
      $(this.ref.list.element).addClass('alt');
    }
  }, {
    key: 'hl',
    value: function hl(cn) {
      $(this.ref.list.element).find('.cur').removeClass('cur');
      if (cn) {
        if (cn.charAt(0) === '#') {
          cn = cn.slice(1);
        }
        $(this.ref.list.element).find('.' + cn).addClass('cur');
      }
    }
  }, {
    key: 'showBall',
    value: function showBall() {
      $(this.ref.logo.element).removeClass('fn-hide');
    }
  }, {
    key: 'hideBall',
    value: function hideBall() {
      $(this.ref.logo.element).addClass('fn-hide');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "bot-nav fn-hide"]], [migi.createVd("ul", [["ref", "list"], ["class", "fn-clear"], ["onClick", [[{ "a": { "_v": true } }, new migi.Cb(this, this.click)]]]], [migi.createVd("li", [["class", "geography"]], [migi.createVd("a", [["href", "#geography"], ["title", "世界地理"]], ["世界地理"])]), migi.createVd("li", [["class", "history"]], [migi.createVd("a", [["href", "#history"], ["title", "历史故事"]], ["历史故事"])]), migi.createVd("li", [["class", "logo"]], [migi.createVd("b", [["class", "cloud"], ["ref", "cloud"]])]), migi.createVd("li", [["class", "legend"]], [migi.createVd("a", [["href", "#legend"], ["title", "异闻传记"]], ["异闻传记"])]), migi.createVd("li", [["class", "rhyme"]], [migi.createVd("a", [["href", "#rhyme"], ["title", "浮世歌谣"]], ["浮世歌谣"])]), migi.createVd("li", [["class", "about"]], [migi.createVd("a", [["href", "#about"], ["title", "关于异世"]], ["关于异世"])])]), migi.createVd("div", [["class", "logo"], ["ref", "logo"], ["onClick", new migi.Cb(this, this.clickLogo)]])]);
    }
  }]);

  return BotNav;
}(migi.Component);

migi.name(BotNav, "BotNav");exports.default = BotNav;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Share = function (_migi$Component) {
  _inherits(Share, _migi$Component);

  function Share() {
    var _ref;

    _classCallCheck(this, Share);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Share.__proto__ || Object.getPrototypeOf(Share)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Share, [{
    key: "show",
    value: function show() {
      $(this.element).removeClass('fn-hide');
    }
  }, {
    key: "click",
    value: function click() {
      var input = this.ref.share.element;
      input.focus();
      input.setSelectionRange(0, 9999);
      try {
        document.execCommand('copy');
        alert('分享链接已复制成功，可以分享给亲朋好友啦！如没有复制成功，也可以直接复制输入框中的网址哦！');
      } catch (err) {
        alert('分享链接已复制成功，可以分享给亲朋好友啦！如没有复制成功，也可以直接复制输入框中的网址哦！');
      }
    }
  }, {
    key: "clickClose",
    value: function clickClose() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "share-c fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("label", [], ["页面地址"]), migi.createVd("input", [["class", "share"], ["ref", "share"], ["type", "text"], ["value", new migi.Obj("url", this, function () {
        return this.url;
      })]]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)]], ["复制"]), migi.createVd("span", [["class", "close"], ["onClick", new migi.Cb(this, this.clickClose)]])])]);
    }
  }, {
    key: "url",
    set: function set(v) {
      this.__setBind("url", v);this.__data("url");
    },
    get: function get() {
      return this.__getBind("url");
    }
  }]);

  return Share;
}(migi.Component);

migi.name(Share, "Share");exports.default = Share;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NeedLogin = function (_migi$Component) {
  _inherits(NeedLogin, _migi$Component);

  function NeedLogin() {
    var _ref;

    _classCallCheck(this, NeedLogin);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = NeedLogin.__proto__ || Object.getPrototypeOf(NeedLogin)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(NeedLogin, [{
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
    key: 'clickLogin',
    value: function clickLogin(e, vd) {
      e.preventDefault();
      var hash = location.hash.replace(/^#/, '');
      $.cookie('hash', hash);
      setTimeout(function () {
        location.href = vd.props.href;
      }, 100);
    }
  }, {
    key: 'clickClose',
    value: function clickClose(e) {
      e.preventDefault();
      this.hide();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "need-login fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("p", [], [new migi.Obj("message", this, function () {
        return this.message || '您还没有登录，不能进行相关操作噢~';
      })]), migi.createVd("p", [], ["或选择 ", migi.createVd("a", [["href", window.LOGIN_URL], ["onClick", new migi.Cb(this, this.clickLogin)]], ["立即登录"])]), migi.createVd("a", [["href", window.LOGIN_URL], ["onClick", new migi.Cb(this, this.clickLogin)], ["class", "weibo"]]), migi.createVd("a", [["href", "#"], ["class", "close"], ["onClick", new migi.Cb(this, this.clickClose)]])])]);
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

  return NeedLogin;
}(migi.Component);

migi.name(NeedLogin, "NeedLogin");exports.default = NeedLogin;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Luck = function (_migi$Component) {
  _inherits(Luck, _migi$Component);

  function Luck() {
    var _ref;

    _classCallCheck(this, Luck);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Luck.__proto__ || Object.getPrototypeOf(Luck)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Luck, [{
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
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      this.emit('ok');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main weibo"]], [migi.createVd("p", [], [window.LUCK_MES]), migi.createVd("a", [["href", "#"], ["class", "ok"], ["onClick", new migi.Cb(this, this.click)]], ["确定"])]);
    }
  }]);

  return Luck;
}(migi.Component);

migi.name(Luck, "Luck");exports.default = Luck;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_migi$Component) {
  _inherits(Index, _migi$Component);

  function Index() {
    var _ref;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Index, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main index"]], [migi.createVd("div", [["class", "light"]]), migi.createVd("div", [["class", "logo"]], [migi.createVd("div", [["class", "point"]], [migi.createVd("span", [["class", "p1"]]), migi.createVd("span", [["class", "p2"]]), migi.createVd("span", [["class", "p3"]])])]), migi.createVd("p", [["class", "copyright"]], ["All Rights Reserved 结梦谷 浙ICP备17029501号-1"])]);
    }
  }]);

  return Index;
}(migi.Component);

migi.name(Index, "Index");exports.default = Index;

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Geography = function (_migi$Component) {
  _inherits(Geography, _migi$Component);

  function Geography() {
    var _ref;

    _classCallCheck(this, Geography);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Geography.__proto__ || Object.getPrototypeOf(Geography)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Geography, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main geography"]], [migi.createVd("div", [["class", "wait"]])]);
    }
  }]);

  return Geography;
}(migi.Component);

migi.name(Geography, "Geography");exports.default = Geography;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var History = function (_migi$Component) {
  _inherits(History, _migi$Component);

  function History() {
    var _ref;

    _classCallCheck(this, History);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = History.__proto__ || Object.getPrototypeOf(History)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(History, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main history"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("h3", [], [migi.createVd("span", [], ["•", migi.createVd("br", []), "异世纪年", migi.createVd("br", []), "•"])]), migi.createVd("div", [["class", "c"]], [migi.createVd("p", [], ["“物生谓之化，物极谓之变。”"]), migi.createVd("p", [["class", "end"]], ["——《素问·天元纪大论》"]), migi.createVd("p", [], ["混沌初开，乾坤始明，方先出蒙昧世界，灵与物的重叠之处便是异世。在异世亿万年的演化中，日升月落，斗转星移，沧海桑田，由简到繁演化出了世间万物，这个演化一直持续着，直到出现了自我意识。部分生灵开始按照自己的意志认识并改造世界。自此，这世间一切开始有了名字，而他们则自称人类。"]), migi.createVd("p", [], ["万物有灵，天地河海日月山川之灵谓之灵气，鸟兽鱼虫花草树木之灵谓之灵魂。"]), migi.createVd("p", [], ["天地灵气累积，行阴阳八卦之道，于机缘巧合下生出了仙灵。长此以往，万物又在天地灵气的滋养下，修炼出强大的灵力，化为妖。"]), migi.createVd("p", [], ["而随着人类历史的不断演变，世间生灵的情感不断碰撞，最终发展到极致，凝聚为多种强大的信仰，信仰之极则生灵力，灵力之极则生精魄，有了自己的意识。这些强大的灵力与信仰在世间结成小部分灵域，使各个灵域中的人类进化变异，变化出新的特征与特质，成为异人。"]), migi.createVd("p", [], ["To be continued..."])]), migi.createVd("div", [["class", "scroll fn-hide"]], [migi.createVd("span", [["class", "bar"]])])])]);
    }
  }]);

  return History;
}(migi.Component);

migi.name(History, "History");exports.default = History;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Legend = function (_migi$Component) {
  _inherits(Legend, _migi$Component);

  function Legend() {
    var _ref;

    _classCallCheck(this, Legend);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Legend.__proto__ || Object.getPrototypeOf(Legend)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Legend, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main legend"]], [migi.createVd("ul", [["ref", "list"], ["class", "fn-clear"]], [migi.createVd("li", [["class", "immortals"], ["rel", "muhan"], ["cname", "慕寒"]], [migi.createVd("a", [["href", "#charactermuhan"], ["class", "c"]], [migi.createVd("span", [], ["生"])]), migi.createVd("a", [["href", "#charactermuhan"], ["class", "h"]], [migi.createVd("span", [["class", "muhan"]])])]), migi.createVd("li", [["class", "spirits"], ["rel", "hetu"], ["cname", "河图"]], [migi.createVd("a", [["href", "#characterhetu"], ["class", "c"]], [migi.createVd("span", [], ["化"])]), migi.createVd("a", [["href", "#characterhetu"], ["class", "h"]], [migi.createVd("span", [["class", "hetu"]])])]), migi.createVd("li", [["class", "ethereals"], ["rel", "mi"], ["cname", "弥"]], [migi.createVd("a", [["href", "#charactermi"], ["class", "c"]], [migi.createVd("span", [], ["极"])]), migi.createVd("a", [["href", "#charactermi"], ["class", "h"]], [migi.createVd("span", [["class", "mi"]])])]), migi.createVd("li", [["class", "mutants"], ["rel", "sixia"], ["cname", "司夏"]], [migi.createVd("a", [["href", "#charactersixia"], ["class", "c"]], [migi.createVd("span", [], ["变"])]), migi.createVd("a", [["href", "#charactersixia"], ["class", "h"]], [migi.createVd("span", [["class", "sixia"]])])])])]);
    }
  }]);

  return Legend;
}(migi.Component);

migi.name(Legend, "Legend");exports.default = Legend;

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comment = __webpack_require__(64);

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var skip = 0;
var take = 10;
var sortType = 0;
var myComment = 0;
var currentCount = 0;
var loadingMore = void 0;
var ajax = void 0;
var HASH = {
  'hetu': {
    skip: 0,
    authorId: window.HETU_ID,
    state: window.FOLLOW.FOLLOW_HETU,
    img: '//zhuanquan.xyz/rhymesland/hetu_a.png',
    w: 367,
    h: 580,
    n: 181
  },
  'sixia': {
    skip: 0,
    authorId: window.SIXIA_ID,
    state: window.FOLLOW.FOLLOW_SIXIA,
    // img: `//192.168.0.7/sixia_a.png`,
    img: '//zhuanquan.xyz/rhymesland/sixia_a.png',
    w: 400,
    h: 600,
    n: 181
  },
  'muhan': {
    skip: 0,
    authorId: window.MUHAN_ID,
    state: window.FOLLOW.FOLLOW_MUHAN,
    // img: `//192.168.0.7/muhan_a.png`,
    img: '//zhuanquan.xyz/rhymesland/muhan_a.png',
    w: 400,
    h: 600,
    n: 181
  },
  'mi': {
    skip: 0,
    authorId: window.MI_ID,
    state: window.FOLLOW.FOLLOW_MI,
    // img: '//192.168.0.7/mi_a.png',
    img: '//zhuanquan.xyz/rhymesland/mi_a.png',
    w: 400,
    h: 600,
    n: 181
  },
  'jiemeng': {
    skip: 0,
    authorId: window.JIEMENG_ID,
    state: window.FOLLOW.FOLLOW_JIEMENG
  }
};
var index = 0;
var showAnimate = void 0;
var $wrap = void 0;
var $cp = void 0;

var Character = function (_migi$Component) {
  _inherits(Character, _migi$Component);

  function Character() {
    var _ref;

    _classCallCheck(this, Character);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Character.__proto__ || Object.getPrototypeOf(Character)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      $wrap = $(self.ref.wrap.element);
      $cp = $wrap.find('.cp_comment');
      $wrap.on('scroll', function () {
        self.checkMore();
      });
      self.ref.comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
      self.ref.comment.on('noSubComment', function () {
        self.clickReplay();
      });
      self.ref.comment.on('copy', function (url) {
        migi.eventBus.emit('share', url);
      });
    });
    return _this;
  }

  _createClass(Character, [{
    key: 'user',
    value: function user(name) {
      var self = this;
      self.name = name;
      var hash = HASH[name];
      showAnimate = true;
      index = 0;
      this.ref.img.element.removeAttribute('style');
      if (hash.animate) {
        hash.animate();
      } else if (hash.img) {
        var bg = self.ref.img.element;
        var img = new Image();
        img.onload = function () {
          if (self.name !== name) {
            return;
          }
          function anm() {
            if (!showAnimate) {
              return;
            }
            var x = hash.w * (index % 20);
            var y = hash.h * Math.floor(index / 20);
            bg.style.backgroundImage = 'url(' + hash.img + ')';
            bg.style.backgroundPosition = -x + 'px ' + -y + 'px';
            bg.style.backgroundSize = 'auto';
            index++;
            if (index >= hash.n) {
              index = 0;
            }
            // requestAnimationFrame(anm);
            setTimeout(anm, 20);
          }
          hash.animate = anm;
          anm();
        };
        img.src = hash.img;
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var self = this;
      $(self.element).removeClass('fn-hide');
      $(this.ref.left.element).removeClass('on');
      $(this.ref.right.element).removeClass('on');
      setTimeout(function () {
        $(self.ref.left.element).addClass('on');
        $(self.ref.right.element).addClass('on');
      }, 100);
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      $(this.ref.left.element).removeClass('on');
      $(this.ref.right.element).removeClass('on');
      this.rootId = null;
      this.replayId = null;
      this.replayName = null;
      this.showComment = false;
      this.ref.comment.abort();
      this.ref.comment.showComment();
      skip = 0;
      currentCount = 0;
      Object.keys(HASH).forEach(function (key) {
        HASH[key].skip = 0;
        HASH[key].end = false;
      });
      showAnimate = false;
      this.ref.img.element.removeAttribute('style');
    }
  }, {
    key: 'clickFollow',
    value: function clickFollow(e, vd) {
      e.preventDefault();
      var self = this;
      if (HASH[self.name].state === 1) {
        util.postJSON('/api/author/unFollow', { authorID: HASH[self.name].authorId }, function (res) {
          if (res.success) {
            HASH[self.name].state = 0;
            self.name = self.name;
            alert('取关成功');
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
        });
      } else {
        util.postJSON('/api/author/follow', { authorID: HASH[self.name].authorId }, function (res) {
          if (res.success) {
            HASH[self.name].state = 1;
            self.name = self.name;
            alert('关注成功');
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
        });
      }
    }
  }, {
    key: 'clickComment',
    value: function clickComment(e) {
      e.preventDefault();
      this.showComment = true;
      this.load();
    }
  }, {
    key: 'clickClose',
    value: function clickClose(e) {
      e.preventDefault();
      $wrap.scrollTop(0);
      this.showComment = false;
      if (ajax) {
        ajax.abort();
      }
      this.ref.comment.abort();
      this.ref.comment.showComment();
      skip = 0;
      currentCount = 0;
      HASH[this.name].skip = 0;
      HASH[this.name].end = false;
      this.rootId = null;
      this.replayId = null;
      this.replayName = null;
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      self.ref.comment.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = util.postJSON('/api/author/commentList', { authorID: HASH[self.name].authorId, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          // currentCount = data.Size;
          skip += take;
          if (data.Size) {
            self.ref.comment.message = '';
            self.ref.comment.showComment(res.data.data);
          } else {
            self.ref.comment.showComment(res.data.data);
            self.ref.comment.message = '暂无评论';
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          self.ref.comment.showComment();
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'checkMore',
    value: function checkMore() {
      var self = this;
      if (self.showComment && !loadingMore && !HASH[self.name].end && $wrap.scrollTop() + $wrap.height() + 30 > $cp.height()) {
        loadingMore = true;
        if (ajax) {
          ajax.abort();
        }
        ajax = util.postJSON('/api/author/commentList', { authorID: HASH[self.name].authorId, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
          if (res.success) {
            var data = res.data;
            // currentCount = data.Size;
            skip += take;
            if (data.data.length) {
              self.ref.comment.addMore(data.data);
              if (data.data.length < take) {
                self.ref.comment.message = '';
                HASH[self.name].end = true;
              }
            } else {
              self.ref.comment.message = '';
              HASH[self.name].end = true;
            }
          } else {
            self.ref.comment.message = res.message || util.ERROR_MESSAGE;
          }
          loadingMore = false;
        }, function (res) {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
          loadingMore = false;
        });
      }
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
      var v = $(vd.element).val().trim();
      this.hasContent = v.length > 0;
      if (!window.IS_LOGIN) {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!window.IS_LOGIN) {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      if (self.hasContent) {
        var $input = $(this.ref.input.element);
        var content = $input.val();
        var parentID = self.replayId !== null ? self.replayId : -1;
        var rootID = self.rootId !== null ? self.rootId : -1;
        self.loading = true;
        if (ajax) {
          ajax.abort();
        }
        ajax = util.postJSON('/api/author/addComment', {
          parentID: parentID,
          rootID: rootID,
          content: content,
          authorID: HASH[self.name].authorId
        }, function (res) {
          if (res.success) {
            $input.val('');
            self.hasContent = false;
            if (rootID === -1) {
              self.ref.comment.addNew(res.data);
              self.ref.comment.message = '';
            } else {
              self.ref.comment.addChild(res.data);
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
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
      HASH[this.name].skip = 0;
      HASH[this.name].end = false;
      currentCount = 0;
      sortType = rel;
      skip = 0;
      this.ref.comment.showComment();
      this.ref.comment.abort();
      this.load();
    }
  }, {
    key: 'switchType2',
    value: function switchType2(e, vd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      var rel = $ul.find('.cur').attr('rel');
      HASH[this.name].skip = 0;
      HASH[this.name].end = false;
      currentCount = 0;
      myComment = rel;
      skip = 0;
      this.ref.comment.showComment();
      this.ref.comment.abort();
      this.load();
    }
  }, {
    key: 'clickShare',
    value: function clickShare(e) {
      e.preventDefault();
      migi.eventBus.emit('share', location.href);
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", new migi.Obj("name", this, function () {
        return 'main character ' + this.name;
      })]], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["class", "img"], ["ref", "img"]]), migi.createVd("ul", [["class", "btn fn-clear"]], [migi.createVd("li", [], [migi.createVd("a", [["href", "#"], ["onClick", new migi.Cb(this, this.clickFollow)]], [migi.createVd("span", [], [new migi.Obj("name", this, function () {
        return HASH[this.name] && HASH[this.name].state === 1 ? '取关' : '关注';
      })])])]), migi.createVd("li", [], [migi.createVd("a", [["href", "#"], ["class", "comment"], ["onClick", new migi.Cb(this, this.clickComment)]], [migi.createVd("span", [], [new migi.Obj("name", this, function () {
        return this.name === 'jiemeng' ? '留言' : '表白';
      })])])]), migi.createVd("li", [], [migi.createVd("a", [["href", "#"], ["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]], [migi.createVd("span", [], ["分享"])])])]), migi.createVd("div", [["class", "left"], ["ref", "left"]]), migi.createVd("div", [["class", "right"], ["ref", "right"]])]), migi.createVd("div", [["class", new migi.Obj("showComment", this, function () {
        return 'comments' + (this.showComment ? '' : ' fn-hide');
      })], ["ref", "comments"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "wrap"], ["ref", "wrap"]], [migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/author/likeComment"], ["subUrl", "/api/author/subCommentList"], ["delUrl", "/api/author/delComment"]])]), migi.createVd("a", [["href", "#"], ["class", "close"], ["onClick", new migi.Cb(this, this.clickClose)]]), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], [migi.createVd("span", [], ["全部"])]), migi.createVd("li", [["rel", "1"]], [migi.createVd("span", [], ["我的"])])]), migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], [migi.createVd("span", [], ["最新"])]), migi.createVd("li", [["rel", "1"]], [migi.createVd("span", [], ["最热"])])]), migi.createVd("div", [["class", "form"]], [migi.createVd("div", [["class", new migi.Obj("replayId", this, function () {
        return 'reply' + (this.replayId ? '' : ' fn-hide');
      })], ["onClick", new migi.Cb(this, this.clickReplay)]], [new migi.Obj("replayName", this, function () {
        return this.replayName;
      })]), migi.createVd("div", [["class", "inputs"]], [migi.createVd("input", [["ref", "input"], ["maxlength", "1000"], ["type", "text"], ["placeholder", "留言..."], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)], ["class", new migi.Obj(["hasContent", "loading"], this, function () {
        return this.hasContent && !this.loading ? '' : 'dis';
      })]], ["确定"])])])])]);
    }
  }, {
    key: 'name',
    set: function set(v) {
      this.__setBind("name", v);this.__data("name");
    },
    get: function get() {
      return this.__getBind("name");
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
  }]);

  return Character;
}(migi.Component);

migi.name(Character, "Character");exports.default = Character;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rhyme = function (_migi$Component) {
  _inherits(Rhyme, _migi$Component);

  function Rhyme() {
    var _ref;

    _classCallCheck(this, Rhyme);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Rhyme.__proto__ || Object.getPrototypeOf(Rhyme)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Rhyme, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main rhyme"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("a", [["href", "#work2015000000000006"], ["class", "rjrjs"]]), migi.createVd("a", [["href", "#grid"], ["class", "jrj"]]), migi.createVd("a", [["href", "#work2015000000001368"], ["class", "wsffl"]])])]);
    }
  }]);

  return Rhyme;
}(migi.Component);

migi.name(Rhyme, "Rhyme");exports.default = Rhyme;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(223);

var _Media = __webpack_require__(224);

var _Media2 = _interopRequireDefault(_Media);

var _Intro = __webpack_require__(231);

var _Intro2 = _interopRequireDefault(_Intro);

var _WorkComment = __webpack_require__(232);

var _WorkComment2 = _interopRequireDefault(_WorkComment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajax = void 0;
var commentType = 1;
var firstLoadComment = true;
var barrageTime = 0;

var Work = function (_migi$Component) {
  _inherits(Work, _migi$Component);

  function Work() {
    var _ref;

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _classCallCheck(this, Work);

    var _this = _possibleConstructorReturn(this, (_ref = Work.__proto__ || Object.getPrototypeOf(Work)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var media = self.ref.media;
      var intro = self.ref.intro;
      var workComment = self.ref.workComment;
      media.on('tagChange', function (type) {
        switch (type) {
          case '0':
            workComment.hide();
            intro.show();
            break;
          case '1':
            intro.hide();
            workComment.show();
            if (firstLoadComment) {
              firstLoadComment = false;
              workComment.load();
            }
            break;
        }
      });
      media.on('switchSubWork', function (data) {
        self.subWorkID = data[0].ItemID;
        barrageTime = 0;
      });
      media.on('timeupdate', function (data) {
        barrageTime = data;
      });
      var comment = self.ref.workComment.ref.comment;
      comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
        commentType = 4;
      });
      comment.on('noSubComment', function () {
        self.clickReplay();
      });
    });
    return _this;
  }

  _createClass(Work, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      setTimeout(function () {
        this.ref.media.open();
      }.bind(this), 100);
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      this.ref.media.clear();
      firstLoadComment = true;
      if (ajax) {
        ajax.abort();
        commentType = 1;
        this.rootId = null;
        this.replayId = null;
        this.replayName = null;
      }
      this.ref.media.close();
      this.ref.intro.show();
      this.ref.workComment.hide();
      $(this.ref.form.element).addClass('fn-hide');
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      var self = this;
      self.id = id;
      var media = self.ref.media;
      media.setId(id);
      var intro = self.ref.intro;
      intro.setId(id);
      util.postJSON('/api/works/detail', { worksID: id }, function (res) {
        if (res.success) {
          var data = res.data;
          media.setCover(data.cover_Pic);
          media.setWorks(data.Works_Items);
          media.popular = data.Popular;
          intro.tags = data.ReturnTagData || [];
          migi.eventBus.emit('changeTitle', data.Title);
          $(self.ref.form.element).removeClass('fn-hide');
        } else {
          alert(res.message);
        }
      });
      self.ref.workComment.id = id;
    }
  }, {
    key: 'clickReplay',
    value: function clickReplay() {
      this.replayId = null;
      this.replayName = null;
      this.rootId = null;
      commentType = 1;
    }
  }, {
    key: 'input',
    value: function input(e, vd) {
      var v = $(vd.element).val().trim();
      this.hasContent = v.length > 0;
      if (!window.IS_LOGIN) {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!window.IS_LOGIN) {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      if (self.hasContent) {
        var $input = $(this.ref.input.element);
        var content = $input.val();
        var parentID = self.replayId !== null ? self.replayId : -1;
        var rootID = self.rootId !== null ? self.rootId : -1;
        self.loading = true;
        if (ajax) {
          ajax.abort();
        }
        self.ref.media.switchTo(1);
        ajax = util.postJSON('/api/works/addComment', {
          parentID: parentID,
          rootID: rootID,
          content: content,
          worksID: self.id,
          workID: self.subWorkID,
          barrageTime: barrageTime
        }, function (res) {
          if (res.success) {
            self.ref.workComment.element.scrollIntoView();
            $input.val('');
            self.hasContent = false;
            if (rootID === -1) {
              self.ref.workComment.ref.comment.addNew(res.data);
              self.ref.workComment.ref.comment.message = '';
            } else {
              self.ref.workComment.ref.comment.addChild(res.data);
            }
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          self.loading = false;
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          self.loading = false;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main work"]], [migi.createCp(_Media2.default, [["ref", "media"]]), migi.createCp(_Intro2.default, [["ref", "intro"]]), migi.createCp(_WorkComment2.default, [["ref", "workComment"]]), migi.createVd("div", [["class", "form fn-hide"], ["ref", "form"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", new migi.Obj("replayId", this, function () {
        return 'reply' + (this.replayId ? '' : ' fn-hide');
      })], ["onClick", new migi.Cb(this, this.clickReplay)]], [new migi.Obj("replayName", this, function () {
        return this.replayName;
      })]), migi.createVd("div", [["class", "inputs"]], [migi.createVd("input", [["ref", "input"], ["type", "text"], ["placeholder", "回复..."], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)], ["class", new migi.Obj(["hasContent", "loading"], this, function () {
        return this.hasContent && !this.loading ? '' : 'dis';
      })]], ["确定"])])])]);
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
    key: 'id',
    set: function set(v) {
      this.__setBind("id", v);this.__data("id");
    },
    get: function get() {
      return this.__getBind("id");
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
    key: 'subWorkID',
    set: function set(v) {
      this.__setBind("subWorkID", v);this.__data("subWorkID");
    },
    get: function get() {
      return this.__getBind("subWorkID");
    }
  }]);

  return Work;
}(migi.Component);

migi.name(Work, "Work");exports.default = Work;

/***/ }),

/***/ 223:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Author = __webpack_require__(225);

var _Author2 = _interopRequireDefault(_Author);

var _Audio = __webpack_require__(227);

var _Audio2 = _interopRequireDefault(_Audio);

var _Video = __webpack_require__(229);

var _Video2 = _interopRequireDefault(_Video);

var _itemTemplate = __webpack_require__(230);

var _itemTemplate2 = _interopRequireDefault(_itemTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = void 0;
var currentTime = 0;
var duration = 0;

var isStart = void 0;
var isMove = void 0;
var offsetX = void 0;

var audio = void 0;
var video = void 0;
var last = void 0;

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
      WIDTH = $(this.element).width();
      var style = document.createElement('style');
      var width = $(this.element).width();
      style.innerText = '.main.work>.media>.c{height:' + Math.round(width / 16 * 9) + 'px}';
      document.head.appendChild(style);

      var $play = $(this.ref.play.element);
      audio = self.ref.audio;
      video = self.ref.video;
      audio.on('timeupdate', function (data) {
        currentTime = data;
        var percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
      });
      audio.on('loadedmetadata', function (data) {
        duration = data.duration;
        if (last === audio) {
          self.canControl = true;
        }
      });
      audio.on('playing', function (data) {
        duration = data.duration;
      });
      audio.on('play', function () {
        $play.addClass('pause');
      });
      audio.on('pause', function () {
        $play.removeClass('pause');
      });
      video.on('timeupdate', function (data) {
        currentTime = data;
        var percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
      });
      video.on('loadedmetadata', function (data) {
        duration = data.duration;
        if (last === video) {
          self.canControl = true;
        }
      });
      video.on('playing', function (data) {
        duration = data.duration;
      });
      video.on('play', function () {
        $play.addClass('pause');
      });
      video.on('pause', function () {
        $play.removeClass('pause');
      });

      $(document).on('mousemove', this.move2.bind(this));
      $(document).on('mouseup', this.up.bind(this));
    });
    return _this;
  }

  _createClass(Media, [{
    key: 'setCover',
    value: function setCover(url) {
      if (url) {
        $(this.element).css('background-image', 'url(' + url + ')');
      } else {
        $(this.element).removeAttr('style');
      }
    }
  }, {
    key: 'setWorks',
    value: function setWorks(works) {
      var self = this;
      var workHash = {};
      var workList = [];
      var authorList = [];
      works.forEach(function (item) {
        // 先按每个小作品类型排序其作者
        util.sort(item.Works_Item_Author, (0, _itemTemplate2.default)(item.ItemType).authorSort || function () {});
        // 将每个小作品根据小类型映射到大类型上，再归类
        var bigType = (0, _itemTemplate2.default)(item.ItemType).bigType;
        workHash[bigType] = workHash[bigType] || [];
        workHash[bigType].push(item);
      });
      Object.keys(workHash).forEach(function (k) {
        workList.push({
          bigType: k,
          value: workHash[k]
        });
      });
      util.sort(workList, function (a, b) {
        return a.bigType > b.bigType;
      });
      workList.forEach(function (works) {
        var authors = [];
        works.value.forEach(function (work) {
          authors = authors.concat(work.Works_Item_Author);
        });
        // 去重
        var hash = {};
        for (var i = 0; i < authors.length; i++) {
          var author = authors[i];
          var key = author.ID + ',' + author.WorksAuthorType;
          if (hash[key]) {
            authors.splice(i--, 1);
            continue;
          } else {
            hash[key] = true;
          }
        }
        // 合并
        hash = {};
        var nAuthors = [];
        authors.forEach(function (author) {
          if (hash.hasOwnProperty(author.WorksAuthorType)) {
            nAuthors[hash[author.WorksAuthorType]].list.push(author);
          } else {
            hash[author.WorksAuthorType] = nAuthors.length;
            nAuthors.push({
              type: author.WorksAuthorType,
              list: [author]
            });
          }
        });
        authorList.push(nAuthors);
      });
      // self.ref.author.setAuthor(authorList);

      var hasAudio = false;
      var hasVideo = false;
      workList.forEach(function (item) {
        if (item.bigType === 'audio') {
          audio.setData(item.value);
          hasAudio = true;
          $(self.ref.type.element).find('.audio').removeClass('fn-hide');
        } else if (item.bigType === 'video') {
          video.setData(item.value);
          hasVideo = true;
          $(self.ref.type.element).find('.video').removeClass('fn-hide');
        }
      });
      if (hasAudio) {
        last = audio;
        $(self.ref.type.element).find('.audio').addClass('cur');
      } else if (hasVideo) {
        last = video;
        $(self.ref.type.element).find('.video').addClass('cur');
      }
      if (last) {
        last.show();
        this.emit('switchSubWork', last.data);
      }
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      this.ref.audio.setId(id);
      this.ref.video.setId(id);
    }
  }, {
    key: 'clickTag',
    value: function clickTag(e, vd, tvd) {
      var $ul = $(vd.element);
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $ul.find('.cur').removeClass('cur');
        $li.addClass('cur');
        this.emit('tagChange', tvd.props.rel);
      }
    }
  }, {
    key: 'clickPlay',
    value: function clickPlay(e, vd) {
      if (this.canControl) {
        var $play = $(vd.element);
        if ($play.hasClass('pause')) {
          last.pause();
        } else {
          last.play();
        }
        $play.toggleClass('pause');
      }
    }
  }, {
    key: 'clickProgress',
    value: function clickProgress(e) {
      if (this.canControl && e.target.className !== 'point') {
        offsetX = $(this.ref.progress.element).offset().left;
        var x = e.pageX - offsetX;
        var percent = x / WIDTH;
        var _currentTime = Math.floor(duration * percent);
        last.currentTime(_currentTime);
      }
    }
  }, {
    key: 'start',
    value: function start(e) {
      if (this.canControl && e.touches.length === 1) {
        isStart = true;
        last.pause();
        $(this.ref.play.element).removeClass('pause');
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      if (isStart) {
        isMove = true;
        e.preventDefault();
        var x = e.touches[0].pageX;
        var percent = x / WIDTH;
        this.setBarPercent(percent);
        currentTime = Math.floor(duration * percent);
      }
    }
  }, {
    key: 'end',
    value: function end() {
      if (isMove) {
        last.currentTime(currentTime);
      }
      isStart = isMove = false;
    }
  }, {
    key: 'down',
    value: function down(e) {
      e.preventDefault();
      if (this.canControl) {
        isStart = true;
        offsetX = $(this.ref.progress.element).offset().left;
      }
    }
  }, {
    key: 'move2',
    value: function move2(e) {
      if (isStart) {
        e.preventDefault();
        var x = e.pageX;
        var diff = x - offsetX;
        diff = Math.max(0, diff);
        diff = Math.min(WIDTH, diff);
        var percent = diff / WIDTH;
        this.setBarPercent(percent);
        currentTime = Math.floor(duration * percent);
      }
    }
  }, {
    key: 'up',
    value: function up() {
      isStart = false;
    }
  }, {
    key: 'setBarPercent',
    value: function setBarPercent(percent) {
      percent *= 100;
      $(this.ref.has.element).css('width', percent + '%');
      $(this.ref.pgb.element).css('-webkit-transform', 'translate3d(' + percent + '%,0,0)');
      $(this.ref.pgb.element).css('transform', 'translate3d(' + percent + '%,0,0)');
    }
  }, {
    key: 'clear',
    value: function clear() {
      audio.clear().hide();
      video.clear().hide();
      duration = currentTime = 0;
      last = null;
      this.canControl = false;
      $(this.ref.play.element).removeClass('pause');
      $(this.ref.has.element).removeAttr('style');
      $(this.ref.pgb.element).removeAttr('style');
      $(this.ref.type.element).find('li').addClass('fn-hide').removeClass('cur');
    }
  }, {
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        var type = tvd.props.rel;
        if (type === 'audio') {
          video.pause().hide();
          last = audio.show().currentTime(0);
        } else if (type === 'video') {
          audio.pause().hide();
          last = video.show().currentTime(0);
        }
        this.canControl = last.hasLoaded;
        duration = last.duration;
        $(this.ref.play.element).removeClass('pause');
        this.emit('switchSubWork', last.data);
      }
    }
  }, {
    key: 'switchTo',
    value: function switchTo(index) {
      $(this.ref.tags.element).find('li').eq(index).click();
    }
  }, {
    key: 'open',
    value: function open() {
      $(this.ref.left.element).addClass('on');
      $(this.ref.right.element).addClass('on');
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      $(this.ref.left.element).removeClass('on');
      $(this.ref.right.element).removeClass('on');
      $(this.ref.tags.element).find('.cur').removeClass('cur');
      $(this.ref.tags.element).find('li').eq(0).addClass('cur');
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "media"]], [migi.createVd("div", [["class", "c"], ["ref", "c"]], [migi.createCp(_Audio2.default, [["ref", "audio"]]), migi.createCp(_Video2.default, [["ref", "video"]]), migi.createVd("div", [["class", "left"], ["ref", "left"]]), migi.createVd("div", [["class", "right"], ["ref", "right"]])]), migi.createVd("div", [["class", new migi.Obj("canControl", this, function () {
        return 'progress' + (this.canControl ? '' : ' dis');
      })], ["onClick", new migi.Cb(this, this.clickProgress)], ["ref", "progress"]], [migi.createVd("div", [["class", "has"], ["ref", "has"]]), migi.createVd("div", [["class", "pbg"], ["ref", "pgb"]], [migi.createVd("div", [["class", "point"], ["ref", "point"], ["onMouseDown", new migi.Cb(this, this.down)], ["onTouchStart", new migi.Cb(this, this.start)], ["onTouchMove", new migi.Cb(this, this.move)], ["onTouchEnd", new migi.Cb(this, this.end)]])])]), migi.createVd("div", [["class", new migi.Obj("canControl", this, function () {
        return 'bar' + (this.canControl ? '' : ' dis');
      })]], [migi.createVd("div", [["class", "prev dis"]]), migi.createVd("div", [["class", "play"], ["ref", "play"], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("div", [["class", "next dis"]])]), migi.createVd("ul", [["class", "type"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [migi.createVd("li", [["class", "audio fn-hide"], ["rel", "audio"]], ["音频"]), migi.createVd("li", [["class", "video fn-hide"], ["rel", "video"]], ["视频"])]), migi.createVd("div", [["class", "tags"], ["ref", "tags"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickTag)]]]], [migi.createVd("ul", [], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], [migi.createVd("span", [], ["简介"])]), migi.createVd("li", [["rel", "1"]], [migi.createVd("span", [], ["评论"])])])])]);
    }
  }, {
    key: 'popular',
    set: function set(v) {
      this.__setBind("popular", v);this.__data("popular");
    },
    get: function get() {
      if (this.__initBind("popular")) this.__setBind("popular", 0);return this.__getBind("popular");
    }
  }, {
    key: 'canControl',
    set: function set(v) {
      this.__setBind("canControl", v);this.__data("canControl");
    },
    get: function get() {
      return this.__getBind("canControl");
    }
  }]);

  return Media;
}(migi.Component);

migi.name(Media, "Media");exports.default = Media;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(226);

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

    return _possibleConstructorReturn(this, (_ref = Author.__proto__ || Object.getPrototypeOf(Author)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Author, [{
    key: "setAuthor",
    value: function setAuthor(data) {
      var temp = [];
      data.forEach(function (item) {
        item.forEach(function (item2) {
          temp.push(migi.createVd("li", [["class", "label"]], [(0, _authorTemplate2.default)(item2.type).name]));
          item2.list.forEach(function (item3) {
            temp.push(migi.createVd("li", [["class", "item"], ["id", item3.ID]], [item3.AuthName]));
          });
        });
      });
      this.list = temp;
      var $c = $(this.ref.c.element);
      var $ul = $c.find('ul');
      $c.css('width', $ul.width() + 1);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "author"]], [migi.createVd("div", [["class", "c"], ["ref", "c"]], [migi.createVd("ul", [], [new migi.Obj("list", this, function () {
        return this.list;
      })])])]);
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

  return Author;
}(migi.Component);

migi.name(Author, "Author");exports.default = Author;

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (authorType) {
  switch (authorType) {
    case 111:
      return {
        name: '演唱',
        abbr: '唱',
        css: 'chang',
        labelType: 11
      };
    case 121:
      return {
        name: '作曲',
        abbr: '曲',
        css: 'qu',
        labelType: 12
      };
    case 122:
      return {
        name: '编曲',
        abbr: '曲',
        css: 'qu',
        labelType: 13
      };
    case 411:
      return {
        name: '作词',
        abbr: '文',
        css: 'wen',
        labelType: 14
      };
    case 131:
      return {
        name: '混音',
        abbr: '混',
        css: 'hun',
        labelType: 15
      };
    default:
      return {
        name: authorType,
        abbr: authorType,
        css: authorType,
        labelType: -1
      };
  }
};

; /**
   * Created by army8735 on 2017/8/13.
   */

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LyricsParser = __webpack_require__(228);

var _LyricsParser2 = _interopRequireDefault(_LyricsParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lyricsIndex = -1;
var lyricsHeight = [];
var $lyricsRoll = void 0;

var shareId = void 0;
var hash = {
  '2015000000000006': 'http://rhymesland.com/rhymes/rjrjs',
  '2015000000000001': 'http://rhymesland.com/rhymes/jrj',
  '2015000000000002': 'http://rhymesland.com/rhymes/shuomeng'
  // '2015000000001329': 'http://rhymesland.com/rhymes/hlm',
  // '2015000000001331': 'http://rhymesland.com/rhymes/mhl',
};

var Audio = function (_migi$Component) {
  _inherits(Audio, _migi$Component);

  function Audio() {
    var _ref;

    _classCallCheck(this, Audio);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Audio.__proto__ || Object.getPrototypeOf(Audio)).call.apply(_ref, [this].concat(data)));
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
      self.rollLyrics = data[0].formatLyrics.data;
      var count = 0;
      $lyricsRoll = $(self.ref.lyricsRoll.element);
      $lyricsRoll.find('pre').each(function () {
        lyricsHeight.push(count);
        count += 20;
      });
      return this;
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      shareId = id;
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
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        util.postJSON('/api/works/likeWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isLike = res.data === 211;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickFavor',
    value: function clickFavor(e, vd) {
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        util.postJSON('/api/works/unFavorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = false;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      } else {
        util.postJSON('/api/works/favorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = true;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickDownload',
    value: function clickDownload(e) {
      if (!window.IS_LOGIN) {
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
    value: function clickShare() {
      migi.eventBus.emit('share', hash[shareId] || location.href);
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
      return migi.createVd("div", [["class", "audio fn-hide"]], [migi.createVd("audio", [["ref", "audio"], ["onTimeupdate", new migi.Cb(this, this.timeupdate)], ["onLoadedmetadata", new migi.Cb(this, this.loadedmetadata)], ["onPlaying", new migi.Cb(this, this.playing)], ["preload", "meta"], ["src", new migi.Obj("fileUrl", this, function () {
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

/***/ 228:
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

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var de = document.documentElement;

var shareId = void 0;
var hash2 = {
  '2015000000000006': 'http://rhymesland.com/rhymes/rjrjs',
  '2015000000000001': 'http://rhymesland.com/rhymes/jrj',
  '2015000000000002': 'http://rhymesland.com/rhymes/shuomeng'
  // '2015000000001329': 'http://rhymesland.com/rhymes/hlm',
  // '2015000000001331': 'http://rhymesland.com/rhymes/mhl',
};

var Video = function (_migi$Component) {
  _inherits(Video, _migi$Component);

  function Video() {
    var _ref;

    _classCallCheck(this, Video);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Video.__proto__ || Object.getPrototypeOf(Video)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Video, [{
    key: 'setData',
    value: function setData(data) {
      var self = this;
      self.data = data;
      self.isLike = data[0].ISLike;
      self.isFavor = data[0].ISFavor;
      self.fileUrl = data[0].FileUrl;
      self.cover = data[0].VideoCoverPic;
      return this;
    }
  }, {
    key: 'setId',
    value: function setId(id) {
      shareId = id;
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      $(this.ref.poster.element).removeClass('fn-hide');
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
    key: 'onpause',
    value: function onpause() {
      this.emit('pause');
    }
  }, {
    key: 'play',
    value: function play() {
      this.ref.video.element.play();
      $(this.ref.poster.element).addClass('fn-hide');
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.ref.video.element.pause();
      return this;
    }
  }, {
    key: 'currentTime',
    value: function currentTime(t) {
      this.ref.video.element.currentTime = t;
      return this;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.fileUrl = '';
      this.workIndex = 0;
      this.duration = 0;
      this.hasLoaded = false;
      $(this.ref.poster.element).removeClass('fn-hide');
      return this;
    }
  }, {
    key: 'clickLike',
    value: function clickLike(e, vd) {
      var self = this;
      var $vd = $(vd.element);
      if (!$vd.hasClass('loading')) {
        $vd.addClass('loading');
        util.postJSON('/api/works/likeWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isLike = res.data === 211;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickFavor',
    value: function clickFavor(e, vd) {
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        util.postJSON('/api/works/unFavorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = false;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      } else {
        util.postJSON('/api/works/favorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
          if (res.success) {
            self.isFavor = true;
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          $vd.removeClass('loading');
        }, function () {
          alert(res.message || util.ERROR_MESSAGE);
          $vd.removeClass('loading');
        });
      }
    }
  }, {
    key: 'clickDownload',
    value: function clickDownload(e) {
      if (!window.IS_LOGIN) {
        e.preventDefault();
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'clickShare',
    value: function clickShare() {
      migi.eventBus.emit('share', hash2[shareId] || location.href);
    }
  }, {
    key: 'clickScreen',
    value: function clickScreen() {
      var video = this.ref.video.element;
      if (de.requestFullscreen) {
        video.requestFullscreen();
      } else if (de.mozRequestFullscreen) {
        video.mozRequestFullscreen();
      } else if (de.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (de.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  }, {
    key: 'clickPoster',
    value: function clickPoster() {
      if (this.top.canControl) {
        this.play();
        this.emit('play');
        $(this.ref.poster.element).addClass('fn-hide');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "video fn-hide"]], [migi.createVd("video", [["ref", "video"], ["poster", new migi.Obj("cover", this, function () {
        return this.cover;
      })], ["onTimeupdate", new migi.Cb(this, this.timeupdate)], ["onLoadedmetadata", new migi.Cb(this, this.loadedmetadata)], ["onPause", new migi.Cb(this, this.onpause)], ["onPlaying", new migi.Cb(this, this.playing)], ["preload", "meta"], ["playsinline", "true"], ["webkit-playsinline", "true"], ["src", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })]], ["\n\
        your browser does not support the audio tag\n\
      "]), migi.createVd("div", [["ref", "poster"], ["class", "poster"], ["style", new migi.Obj("cover", this, function () {
        return 'background-image:url(' + (this.cover || 'http://rhymesland.oss-cn-shanghai.aliyuncs.com/blank.png') + ')';
      })], ["onClick", new migi.Cb(this, this.clickPoster)]]), migi.createVd("ul", [["class", "btn"], ["ref", "btn"]], [migi.createVd("li", [["class", new migi.Obj("isLike", this, function () {
        return 'like' + (this.isLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj("isFavor", this, function () {
        return 'favor' + (this.isFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["download", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]]), migi.createVd("li", [["class", "screen"], ["onClick", new migi.Cb(this, this.clickScreen)]])])]);
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

  return Video;
}(migi.Component);

migi.name(Video, "Video");exports.default = Video;

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (workType) {
  switch (workType) {
    case 1111:
      var weight = [111, 151, 112, 113, 114, 411, 121, 122, 123, 131, 132, 133, 134, 135, 141];
      return {
        bigType: 'audio',
        authorSort: function authorSort(a, b) {
          return weight.indexOf(a.WorksAuthorType) > weight.indexOf(b.WorksAuthorType);
        }
      };
    case 2110:
      return {
        bigType: 'video'
      };
    default:
      return {};
  }
};

; /**
   * Created by army8735 on 2017/8/13.
   */

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hash = {
  '2015000000000006': '<p>\u5F53\u9762\u7EB1\u63ED\u5F00\uFF0C\u5F53\u5149\u8292\u95EA\u73B0\uFF0C\u4ECE\u5F02\u4E16\u5230\u73B0\u4E16\uFF0C\u4ECE\u6211\u5230\u4F60\uFF0C\u8FD9\u662F\u4E00\u573A\u547D\u4E2D\u6CE8\u5B9A\u7684\u76F8\u9047\uFF0C\u6545\u4E8B\u7531\u6B64\u800C\u751F\u3002</p>\n        <p><br/>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/740120222" target="_blank">\u6155\u5BD2</a>&nbsp;\n          <a href="http://weibo.com/arielmelody" target="_blank">\u53F8\u590F</a>&nbsp;\n          <a href="http://weibo.com/u/1750157883" target="_blank">\u6CB3\u56FE</a>&nbsp;\n          <a href="http://weibo.com/ichigolily" target="_blank">Midaho</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/u/2423021884" target="_blank">\u6708\u5343\u5BB8</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/tingyugelouyinyueshe" target="_blank">\u6C88\u884C\u4E4B</a></p>\n        <p>\u7B1B\u8427\uFF1A<a href="http://weibo.com/ellen0411" target="_blank">\u6C34\u73A5\u513F</a>&nbsp;\n        \u53E4\u7B5D\uFF1A<a href="http://weibo.com/u/2616755905" target="_blank">\u58A8\u97F5\u968F\u6B65\u6447</a>&nbsp;\n        \u7435\u7436\uFF1A<a href="http://weibo.com/zycq" target="_blank">\u4E4D\u96E8\u521D\u6674</a>&nbsp;\n        \u7535\u5409\u4ED6\uFF1A<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a></p>\n        <p>\u4FEE\u97F3\uFF1A<a href="http://weibo.com/yaolaoso" target="_blank">\u5E7A\u5520</a>&nbsp;\n        \u6DF7\u97F3\uFF1A<a href="http://weibo.com/princesscuttlefish" target="_blank">CuTTleFish</a>&nbsp;\n        <a href="http://weibo.com/u/3222735190" target="_blank">\u5C11\u5E74E</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/moirajia" target="_blank">\u51B0\u9547\u751C\u8C46\u6D46</a></p>\n        <p>\u7ACB\u7ED8\uFF1A<a href="http://weibo.com/yukiart" target="_blank">\u6728\u7F8E\u4EBA</a>&nbsp;\n        \u573A\u666F\uFF1A<a href="http://weibo.com/u/5190275328" target="_blank">_LEOX</a>&nbsp;\n        CG\uFF1A<a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a></p>\n        <p>\u6D77\u62A5\uFF1A<a href="http://weibo.com/seoyutsuki" target="_blank">\u9752\u51CC</a>&nbsp;\n        \u7F8E\u672F\u8BBE\u8BA1\uFF1A<a href="http://weibo.com/520snc" target="_blank">\u5FF5\u6148</a></p>\n        <pre>\n\n\u6155\u5BD2\uFF1A\u4E16\u95F4\u6D6E\u751F\u82E6\u5C81\u66AE \u65E5\u6708\u5316\u6211\u68A6\u6D6E\u751F\n\u95FB\u957F\u6B4C \u98D2\u6C93\u7A7F\u6797\u8FC7 \u5FFD\u73B0\u8703\u697C\u6CA7\u6D77\n\u53F8\u590F\uFF1A\u6211\u6B4C\u6C34\u5929\u63A5\u4E00\u8272 \u4E07\u8C61\u67AF\u8363\u5F39\u6307\u95F4\n\u5929\u5730\u4E3A\u5BB4 \u6CB3\u9152\u6D77\u7A96 \u6070\u662F\u6B64\u65F6\u5F00\n\n\u6CB3\u56FE\uFF1A\u676F\u9152\u8D50\u4EBA\u95F4 \u7B11\u4F17\u751F \u4E0D\u66FE\u8BC6\u84EC\u83B1\n\u4F59\u4E0B\u5165\u6211\u8896 \u62AB\u7D20\u6656 \u9080\u53CB\u5929\u9645\u6765\nmidaho\uFF1A\u9B13\u8FB9\u6CBE\u4E91\u8272 \u7545\u5FEB\u996E\u7F62 \u6708\u534E\u6EE1\u676F\u76CF\n\u6B64\u65E5\u5374\u70E6\u5FE7 \u9169\u914A\u4E00\u9189 \u5929\u5730\u4E5F\u5FEB\u54C9\n\n\u5408\uFF1A\u5FEB\u54C9\u610F \u5FEB\u54C9\u610F \u6D41\u5149\u7167\u5F7B\u4E7E\u5764\u6765\n\u6D69\u7136\u6C14 \u6D69\u7136\u6C14 \u4E58\u98CE\u7834\u6D6A\u5929\u5730\u5F00\n\u6B64\u65F6\u751F \u5F7C\u65F6\u706D \u5DDD\u6D88\u5C71\u957F\u6709\u65F6\u8870\n\u70B9\u5FC3\u706B \u71C3\u5C3D\u4EBA\u95F4\u8272 \u4E0D\u591C\u661F\u5929\u5916\n\nmidaho\uFF1A\u662F\u4F55\u4EBA\u8C13\u6211 \u5982\u8709\u8763 \u672A\u6562\u8D8A\u4E1C\u5CB1\n\u53F8\u590F\uFF1A\u7B11\u6211\u6CA7\u6D77\u4E2D \u4F3C\u4E00\u7C9F \u65E0\u529B\u6392\u4E91\u5F00\n\u6CB3\u56FE\uFF1A\u600E\u77E5\u4ED6\u4E0D\u8FC7 \u5C0F\u5352\u5C14\u5C14 \u6070\u5165\u6211\u68A6\u6765\n\u6155\u5BD2\uFF1A\u6F0F\u591C\u4E00\u7167\u9762 \u5BE5\u5BE5\u6170\u6211 \u5B64\u8EAB\u5728\u9AD8\u53F0\n\n\u6155\u5BD2\u6CB3\u56FE\uFF1A\u4E14\u884C\u4E50 \u4E14\u884C\u4E50 \u4E07\u5343\u98CE\u7269\u5165\u6211\u6000\n\u53F8\u590FMidaho:\u82B1\u582A\u6298 \u82B1\u582A\u6298 \u7C2A\u82B1\u5BF9\u955C\u77E5\u5DF1\u62DC\n\u5408\uFF1A\u5317\u95FB\u7B11 \u5357\u4F20\u54ED \u6211\u81EA\u900D\u9065\u8EAB\u81EA\u5728\n\u541B\u53EF\u77E5 \u98CE\u6708\u4E89\u76F8\u6765 \u4EBA\u95F4\u6211\u68A6\u88C1\n\n\u6CB3\u56FE\uFF1A\u5FEB\u54C9\u610F \u5FEB\u54C9\u610F \u6D41\u5149\u7167\u5F7B\u4E7E\u5764\u6765\n\u6155\u5BD2\uFF1A\u6D69\u7136\u6C14 \u6D69\u7136\u6C14 \u4E58\u98CE\u7834\u6D6A\u5929\u5730\u5F00\n\u5408\uFF1A\u6B64\u65F6\u751F \u5F7C\u65F6\u706D \u5DDD\u6D88\u5C71\u957F\u6709\u65F6\u8870\n\u70B9\u5FC3\u706B \u71C3\u5C3D\u4EBA\u95F4\u8272 \u4E0D\u591C\u661F\u5929\u5916\n\n\u4E14\u884C\u4E50 \u4E14\u884C\u4E50 \u4E07\u5343\u98CE\u7269\u5165\u6211\u6000\n\u82B1\u582A\u6298 \u82B1\u582A\u6298 \u7C2A\u82B1\u5BF9\u955C\u77E5\u5DF1\u62DC\n\u5317\u95FB\u7B11 \u5357\u4F20\u54ED \u6211\u81EA\u900D\u9065\u8EAB\u81EA\u5728\n\u541B\u53EF\u77E5 \u98CE\u6708\u4E89\u76F8\u6765 \u4EBA\u95F4\u6211\u68A6\u88C1\n\n\u53F8\u590F\uFF1A\u5374\u4E0D\u77E5 \u4EBA\u95F4\u68A6\u6211 \u6211\u68A6\u4EBA\u95F4\u88C1</pre>',
  '2015000000000001': '<p>\u539F\u6765\u6700\u6C38\u6052\u7684\u70ED\u5FF1\uFF0C\u6700\u5E94\u8BE5\u7559\u5728\u521D\u89C1\u65F6\u5206\uFF1B<br/>\u539F\u6765\u770B\u4F3C\u6700\u67D4\u8F6F\u7684\u65F6\u5149\uFF0C\u6700\u64C5\u957F\u5C06\u6E29\u5B58\u9605\u540E\u5373\u711A\uFF1B<br/>\u539F\u6765\u6700\u75AF\u72C2\u60C5\u6D53\u7684\u68A6\uFF0C\u6700\u77ED\u6682\u5982\u6D6E\u6CAB\u76F8\u9022\u3002</p>\n        <p><br/>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/arielmelody" target="_blank">\u53F8\u590F</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/menghunxiaoxiang" target="_blank">\u6F47\u68A6\u4E34</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/chenpengjie" target="_blank">\u9648\u9E4F\u6770</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/mercuryco" target="_blank">Vagary </a></p>\n        <p>\u8427\uFF1A<a href="http://weibo.com/ellen0411" target="_blank">\u6C34\u73A5\u513F</a>&nbsp;\n        \u53E4\u7B5D\uFF1A<a href="http://weibo.com/u/2420864952" target="_blank">\u7389\u9762\u5C0F\u5AE3\u7136</a>&nbsp;\n        \u5409\u4ED6\uFF1A<a href="http://weibo.com/chenpengjie" target="_blank">\u9648\u9E4F\u6770</a></p>\n        <p>\u4FEE\u97F3\uFF1A<a href="http://weibo.com/yaolaoso" target="_blank">\u5E7A\u5520</a>&nbsp;\n        \u6DF7\u97F3\uFF1A<a href="http://weibo.com/princesscuttlefish" target="_blank">CuTTleFish</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/moirajia" target="_blank">\u51B0\u9547\u751C\u8C46\u6D46</a></p>\n        <p>\u66F2\u7ED8\uFF1A<a href="http://weibo.com/pudding131" target="_blank">\u9ED1\u8272\u5E03\u4E01_\u9171</a>&nbsp;\n        <a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a></p>\n        <pre>\n\n\u4E0D\u6DE1\u4E0D\u6DF1 \u4E0D\u5F03\u4E0D\u73CD\n\u78A7\u6D77\u768E\u6708 \u770B\u8001\u826F\u8FB0\n\u4E0D\u5BD2\u4E0D\u6696 \u4E0D\u6B3A\u4E0D\u95EE\n\u6211\u4E3A\u8C01\u4FEF\u9996\u79F0\u81E3\n\n\u4E0D\u601D\u4E0D\u5FD8 \u4E0D\u805A\u4E0D\u5206\n\u5343\u5C81\u767D\u6C99 \u4E00\u626B\u7EA2\u5C18\n\u4E0D\u7559\u4E0D\u820D \u4E0D\u601C\u4E0D\u8BA4\n\u7231\u662F\u6700\u6E29\u5B58\u7684\u6068\n\n\u4F60\u8BF4\u68A6\u4F1A\u751F\u6839 \u60C5\u4F1A\u8FD8\u9B42\n\u4F20\u5947\u662F\u4F60\u6211\u8303\u672C\n\u8BA9\u8FD9\u706F\u524D\u7EA2\u8896 \u96EA\u4E0B\u9752\u887F \u5165\u5F97\u620F\u6587\n\n\u53EF\u7B11\u6851\u7530\u8015\u8FC7\u51E0\u8F6E \u6CA7\u6D77\u9189\u8FC7\u51E0\u6A3D\n\u81EA\u8D4F\u5B64\u82B3\u53C8\u51E0\u4E2A\u9EC4\u660F\n\u6709\u4F20\u5947\u5531\u904D\u4E09\u6625 \u4E3B\u89D2\u4E0D\u662F\u6211\u4EEC\n\u7D6E\u7D6E\u7740\u4F60\u548C\u53E6\u4E00\u4E2A\u4EBA\n\n\u96BE\u9053\u75DB\u695A\u624D\u6709\u8BD7\u97F5 \u7EDD\u671B\u624D\u914D\u60C5\u6DF1\n\u6240\u6709\u575A\u5F3A\u90FD\u4E00\u8BED\u6210\u8C36\n\u800C\u6545\u4E8B\u4ECE\u672A\u653E\u8FC7 \u7901\u77F3\u4E0A\u7684\u6CEA\u75D5\n\u8D8A\u662F\u5BBD\u5BB9\u7684\u4EBA \u8D8A\u662F \u65E0\u5904\u5BB9\u8EAB\n\n\u4F60\u8BF4\u9047\u4E0A\u4E86\u6211 \u624D\u61C2\u9752\u6625\n\u4E00\u751F\u53EA\u591F\u7231\u4E00\u4E2A\u4EBA\n\u5018\u82E5\u6628\u65E5\u91CD\u6E29 \u613F\u4F60\u65E0\u8A00 \u514D\u6211\u8BA4\u771F\n\n\u53EF\u7B11\u6851\u7530\u8015\u8FC7\u51E0\u8F6E \u6CA7\u6D77\u9189\u8FC7\u51E0\u6A3D\n\u81EA\u8D4F\u5B64\u82B3\u53C8\u51E0\u4E2A\u9EC4\u660F\n\u6709\u4F20\u5947\u5531\u904D\u4E09\u6625 \u4E3B\u89D2\u4E0D\u662F\u6211\u4EEC\n\u7D6E\u7D6E\u7740\u4F60\u548C\u53E6\u4E00\u4E2A\u4EBA\n\n\u96BE\u9053\u75DB\u695A\u624D\u6709\u8BD7\u97F5 \u7EDD\u671B\u624D\u914D\u60C5\u6DF1\n\u6211\u7684\u6C89\u9ED8\u5C31\u4E0D\u7B97\u4F24\u75D5\n\u800C\u6545\u4E8B\u4ECE\u672A\u63D0\u5230 \u6708\u5149\u4E0B\u7684\u6211\u4EEC\n\u8D8A\u60F3\u9000\u6B65\u62BD\u8EAB \u8D8A\u4F1A \u5F04\u5047\u6210\u771F\n\n\u5355\u7EAF\u8C62\u517B\u6B8B\u5FCD \u9A84\u50B2\u6210\u5168\u81EA\u5C0A\n\u65F6\u5149\u6700\u64C5\u957F\u9605\u540E\u5373\u711A\n\n\u8C01\u8BF4\u955C\u4E2D\u7684\u82B1\u4E0D\u771F \u6C34\u5E95\u7684\u6708\u4E0D\u6E29\n\u7F8E\u5230\u6DF1\u5904\u600E\u4F1A\u6CA1\u6709\u7075\u9B42\n\u53EF\u6545\u4E8B\u7EC8\u5C06\u820D\u5F03 \u6700\u6C38\u6052\u7684\u70ED\u5FF1\n\u53EA\u5269\u6D77\u98CE\u4E00\u77AC \u4E0D\u614E \u88AB\u8C01\u542C\u95FB\n\u6211\u66FE\u8DEF\u8FC7\u4E86 \u4F60\u7684\u9752\u6625\n</pre>',
  '2015000000000002': '<p>\n\u4F20\u95FB\u4E16\u95F4\u6709\u7FBD\u65CF\uFF0C\u53F8\u638C\u4EBA\u95F4\u68A6\u5883\u3002\u8FD9\u68A6\u91CC\u6709\u98CE\u82B1\u96EA\u6708\uFF0C\u7F8E\u6EE1\u56E2\u5706\uFF1B\u6709\u51E0\u4E16\u60C5\u6DF1\uFF0C\u620F\u6587\u4F20\u5947\uFF1B\u4E5F\u6709\u6267\u5FF5\u671F\u8BB8\uFF0C\u5341\u5206\u5FE7\u6101\u3002<br/>\n\u5979\u662F\u7FBD\u65CF\uFF0C\u542C\u89C1\u8FC7\u8BB8\u591A\u8BB8\u591A\u4E16\u95F4\u4EBA\u7684\u68A6\u3002\u53EF\u505A\u68A6\u7684\u4EBA\u75F4\u75F4\uFF0C\u8BFB\u68A6\u7684\u4EBA\uFF0C\u4EA6\u5982\u662F\u3002\u82E5\u6267\u5FF5\u6DF1\u6DF1\u4E0D\u53EF\u89E3\uFF0C\u5979\u4FBF\u4F1A\u4E3A\u90A3\u4E9B\u68A6\u7684\u4E3B\u4EBA\uFF0C\u5B9E\u73B0\u5979\u4EEC\u7684\u68A6\u3002<br/>\n\u800C\u5343\u767E\u5E74\u524D\u9C9B\u4EBA\u65CF\u5C11\u5973\u7684\u68A6\uFF0C\u662F\u5979\u542C\u8FC7\u6700\u60C6\u6005\u7684\u68A6\u3002\u6240\u4EE5\u6700\u540E\uFF0C\u5979\u5E2E\u5979\u5C06\u6267\u5FF5\u91CA\u7136\u5728\uFF0C\u5343\u767E\u4E2A\u7F8E\u68A6\u4E2D\u3002</p>\n<p><br/>\u4F5C\u8BCD\uFF1A\u5085\u767D</p>\n<p>\u4F5C\u66F2/\u7F16\u66F2\uFF1ALitterzy</p>\n<p>\u6F14\u5531/\u6DF7\u97F3\uFF1AMidaho</p>\n<p>\u548C\u58F0\uFF1A\u6A2A\u989C\u541B</p>\n<p>\u4EBA\u8BBE\uFF1A\u6728\u7F8E\u4EBA</p>\n<p>\u573A\u666F\uFF1A_LEOX</p>\n<p>PV\uFF1A\u51B0\u9547\u751C\u8C46\u6D46</p>\n<p>\u9898\u5B57\uFF1A\u53F9\u4E66</p>\n<p>\u6D77\u62A5\uFF1A\u8212\u5FF5\u6148</p>',
  '2015000000001329': '<p>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/bulasika" target="_blank">Braska</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/litterzy " target="_blank">Litterzy</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/litterzy " target="_blank">Litterzy</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/mercuryco" target="_blank">Vagary </a></p>\n        <p>\u6DF7\u97F3\uFF1A<a href="http://weibo.com/bulasika" target="_blank">Braska</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/gylg" target="_blank">\u585A\u672C\u6545</a></p>\n        <p>\u66F2\u7ED8<a href="http://weibo.com/pudding131" target="_blank">\u9ED1\u8272\u5E03\u4E01_\u9171</a>&nbsp;\n        <a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a>\n\t\t<a href="http://weibo.com/yukiart" target="_blank">\u6728\u7F8E\u4EBA</a></p>\n\t\t<p>\u9898\u5B57\uFF1A<a href="http://weibo.com/p/1005052515876194" target="_blank">\u989C\u6C60</a></p>\n\t\t<p>\u6D77\u62A5\uFF1A<a href="http://www.weibo.com/p/1005052018108743" target="_blank">\u8212\u5FF5\u6148</a></p>\n        <pre>\n\n\u6587\u6848\uFF1A\u81E3\u670D\u4E8E\u4E16\u4E8B\u76F8\u903C\uFF0C\u4ED6\u9009\u62E9\u4E86\u82CD\u751F\u5927\u4E49\u3002\u56DE\u9996\u8FD9\u4E00\u751F\uFF0C\u624D\u53D1\u89C9\u4E00\u5207\u5728\u521D\u89C1\u4E4B\u65F6\uFF0C\u5C31\u5DF2\u5C18\u57C3\u843D\u5B9A\u3002\n\n\n\u9003\u4E0D\u5F00\u7684\u68A6\u9B47 \u6700\u73CD\u8D35\n\u4E00\u89C1\u949F\u60C5\u7684\u8FF7\u60D1 \u591A\u59A9\u5A9A\n\u6CA1\u6210\u771F\u7684\u8A93\u8A00 \u592A\u751C\u7F8E\n\u4F60\u66FE\u95EE\u6211\u53EF\u6709\u80C6\u5C3D\u6B22\u800C\u9189\n\n\u4E5D\u91CD\u5BAB\u9619\u5DCD\u5DCD \u7EC8\u4E0E\u613F\u8FDD\n\u5F53\u5C40\u61F5\u61C2\u5374\u604B\u604B\u96BE\u9000\n\u6D6E\u534E\u6D41\u91D1\u70B9\u7FE0 \u8FC7\u773C\u6210\u7070\n\u5269\u4E00\u8DEF\u7EA2\u5C18\u6EE1\u5730\u5351\u5FAE\n\n\u5047\u5982\u6211\u4E0D\u8F9C\u8D1F \u9EC4\u7CB1\u6C38\u4E0D\u719F\n\u4F60\u6211\u4E00\u4E16\u5728\u68A6\u91CC\u51DD\u7738\n\u6211\u98CE\u6CE2\u65E0\u963B \u5FD8\u4EBA\u95F4\u65E0\u6570\n\u53EA\u4E3A\u4F60\u516D\u795E\u65E0\u4E3B\n\n\u6216\u88AB\u547D\u8FD0\u7AA5\u900F\u6211\u4E0D\u914D\n\u624D\u8896\u624B\u5C06\u65E0\u6094\u653E\u9010\u6210\u8BEF\u4F1A\n\n\u4E5D\u91CD\u5BAB\u9619\u5DCD\u5DCD \u7EC8\u4E0E\u613F\u8FDD\n\u5F53\u5C40\u61F5\u61C2\u5374\u604B\u604B\u96BE\u9000\n\u6D6E\u534E\u6D41\u91D1\u70B9\u7FE0 \u8FC7\u773C\u6210\u7070\n\u5269\u4E00\u8DEF\u7EA2\u5C18\u6EE1\u5730\u5351\u5FAE\n\n\u5047\u5982\u6211\u4E0D\u8F9C\u8D1F \u9EC4\u7CB1\u6C38\u4E0D\u719F\n\u4F60\u6211\u4E00\u4E16\u5728\u68A6\u91CC\u51DD\u7738\n\u6211\u98CE\u6CE2\u65E0\u963B \u5FD8\u4EBA\u95F4\u65E0\u6570\n\u53EA\u4E3A\u4F60\u516D\u795E\u65E0\u4E3B\n\n\u7EB5 \u68A6\u91CC\u65E0\u5BD2\u6691 \u5FC3\u5934\u6709\u8363\u67AF\n\u6ED4\u6ED4\u65E5\u6708\u8001\u53BB\u6211\u7709\u76EE\n\u6068 \u60C6\u6005\u96BE\u5982\u521D \u75F4\u60C5\u5206\u4ECA\u53E4\n\u6211\u9519\u8FC7\u7684\u8C01\u80FD\u5F25\u8865\n\n\u6B64\u540E\u72EC\u996E\u574E\u5777 \u662F\u79CD\u56E0\u5F97\u679C\n\u4E00\u604D\u60DA\u591A\u5C11\u7136\u8BFA\u6467\u6298\n\u7528\u4F60\u7684\u7F04\u9ED8 \u6210\u5168\u6211\u5931\u63AA\n\u53EA\u4E00\u68A6\u767D\u53D1\u8E49\u8DCE\n\n\u6B64\u751F\u6D6E\u4E16\u6D88\u78E8 \u542C\u98CE\u706F\u77F3\u706B\n\u4E00\u7728\u773C\u5439\u843D\u738B\u671D\u5E72\u6208\n\u987B\u81FE\u6362\u5C71\u6CB3 \u7B11\u767E\u5C81\u51E0\u4F55\n\u628A\u4E00\u6795\u9EC4\u7CB1\u53F9\u7834\n</pre>',
  '2015000000001331': '<p>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/bulasika" target="_blank">Braska</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/litterzy " target="_blank">Litterzy</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/litterzy " target="_blank">Litterzy</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/mercuryco" target="_blank">Vagary </a></p>\n        <p>\u6DF7\u97F3\uFF1A<a href="http://weibo.com/bulasika" target="_blank">Braska</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/gylg" target="_blank">\u585A\u672C\u6545</a></p>\n        <p>\u66F2\u7ED8\uFF1A<a href="http://weibo.com/pudding131" target="_blank">\u9ED1\u8272\u5E03\u4E01_\u9171</a>&nbsp;\n        <a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a>\n\t\t<a href="http://weibo.com/yukiart" target="_blank">\u6728\u7F8E\u4EBA</a></p>\n\t\t<p>\u6D77\u62A5\uFF1A<a href="http://weibo.com/270137711" target="_blank">\u7405\u534E\u4EE4\u541B</a></p>\n        <pre>\n\n\n\u6587\u6848\uFF1A\u8FD9\u4E00\u751F\uFF0C\u4ED6\u4EEC\u90FD\u53EA\u66FE\u5728\u68A6\u91CC\u51DD\u7738\u3002\n\n\n\u9003\u4E0D\u5F00\u7684\u68A6\u9B47 \u6700\u73CD\u8D35\n\u4E00\u610F\u5B64\u884C\u7684\u6267\u62D7 \u591A\u59A9\u5A9A\n\u6CA1\u5151\u73B0\u7684\u8BB8\u613F \u592A\u751C\u7F8E\n\u6211\u66FE\u76FC\u4F60\u80FD\u6709\u7F18\u5C3D\u6B22\u800C\u9189\n\n\u7EA2\u70DB\u4E00\u7EBF\u6B8B\u7070 \u62FE\u6765\u753B\u7709\n\u655D\u5E1A\u81EA\u73CD\u4E86\u60C5\u6000\u6194\u60B4\n\u6CEA\u5149\u6D41\u73E0\u6563\u7470 \u98D8\u96F6\u4F3C\u6C34\n\u6709\u591A\u534E\u7F8E\u5C31\u6709\u591A\u75B2\u60EB\n\n\u5047\u5982\u6211\u4E0D\u5728\u4E4E \u9EC4\u7CB1\u6C38\u4E0D\u719F\n\u4F60\u6211\u4E00\u4E16\u5728\u68A6\u91CC\u51DD\u7738\n\u6211\u900D\u9065\u4E0D\u5C5E  \u7ADF\u5FD8\u60C5\u4E0D\u987E\n\u53EA\u4E3A\u4F60\u4E07\u52AB\u4E0D\u590D\n\n\u5047\u5982\u6267\u7740\u6CE8\u5B9A\u88AB\u6789\u8D39\n\u4F60\u7A76\u7ADF\u662F\u6211\u7684\u65E0\u6094\u6291\u6216\u8BEF\u4F1A\n\n\u7EA2\u70DB\u4E00\u7EBF\u6B8B\u7070 \u62FE\u6765\u753B\u7709\n\u655D\u5E1A\u81EA\u73CD\u4E86\u60C5\u6000\u6194\u60B4\n\u6CEA\u5149\u6D41\u73E0\u6563\u7470 \u98D8\u96F6\u4F3C\u6C34\n\u6709\u591A\u534E\u7F8E\u5C31\u6709\u591A\u75B2\u60EB\n\n\u5047\u5982\u6211\u4E0D\u5728\u4E4E \u9EC4\u7CB1\u6C38\u4E0D\u719F\n\u4F60\u6211\u4E00\u4E16\u5728\u68A6\u91CC\u51DD\u7738\n\u6211\u900D\u9065\u4E0D\u5C5E  \u7ADF\u5FD8\u60C5\u4E0D\u987E\n\u53EA\u4E3A\u4F60\u4E07\u52AB\u4E0D\u590D\n\n\u7EB5 \u68A6\u91CC\u65E0\u5BD2\u6691 \u5FC3\u5934\u6709\u8363\u67AF\n\u6ED4\u6ED4\u65E5\u6708\u8001\u53BB\u4F60\u7709\u76EE\n\u7B11 \u4ECA\u5915\u600E\u5982\u521D \u955C\u4E2D\u82B1\u5982\u6545\n\u6211\u9519\u8FC7\u7684\u8C01\u80FD\u9886\u609F\n\n\u6B64\u524D\u81EA\u659F\u574E\u5777 \u662F\u79CD\u56E0\u5F97\u679C\n\u4E00\u604D\u60DA\u591A\u5C11\u7136\u8BFA\u6467\u6298\n\u7528\u6211\u7684\u8427\u745F \u6210\u5168\u4F60\u5BE5\u5ED3\n\u53EA\u4E00\u68A6\u6D41\u79BB\u5931\u6240\n\n\u6B64\u8EAB\u6D6E\u4E16\u7A7F\u68AD \u6E21\u4EBA\u6D77\u5929\u6CB3\n\u4E00\u8F6C\u8EAB\u6E6E\u6CA1\u805A\u6563\u6D88\u78E8\n\u6795\u60CA\u6F9C\u70DF\u6CE2 \u95EE\u767E\u5C81\u51E0\u4F55\n\u9EC4\u7CB1\u4E2D\u53EF\u66FE\u6709\u6211\n</pre>',
  '2015000000001368': '<p>\u6F14\u5531\uFF1A<a href="http://weibo.com/740120222" target="_blank">\u6155\u5BD2</a></p>\n         <p>\u7AE5\u58F0\uFF1A<a href="http://weibo.com/ichigolily" target="_blank">Midaho</a></p>\n        <p>\u548C\u58F0\uFF1A<a href="http://weibo.com/740120222" target="_blank">\u6155\u5BD2</a>\n       \t\t<a href="http://weibo.com/u/2423021884 " target="_blank">\u6708\u5343\u5BB8</a></p>\n        <p>\u4F5C\u66F2/\u7F16\u66F2\uFF1A<a href="http://weibo.com/u/2423021884 " target="_blank">\u6708\u5343\u5BB8</a></p>\n        <p>\u4F5C\u8BCD\uFF1A<a href="http://weibo.com/redmirror2005" target="_blank">\u817E\u4E91\u9A7E\u96FE\u7409\u7483\u4ED9 </a></p>\n        <p>\u6DF7\u97F3\uFF1A<a href="http://weibo.com/ichigolily" target="_blank">Midaho</a></p>\n         <p>\u7B1B\u7BAB\uFF1A<a href="http://weibo.com/ellen0411" target="_blank">\u6C34\u73A5\u513F</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/moirajia" target="_blank">\u51B0\u9547\u751C\u8C46\u6D46</a>\n        \t<a href="http://weibo.com/zzstarsound" target="_blank">\u4E2D\u6893\u661F\u97F3</a></p>\n        <p>\u66F2\u7ED8\uFF1A<a href="http://weibo.com/pudding131" target="_blank">\u9ED1\u8272\u5E03\u4E01_\u9171</a>&nbsp;\n        <a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a>\n\t\t<a href="http://weibo.com/yukiart" target="_blank">\u6728\u7F8E\u4EBA</a></p>\n\t\t<p>\u6D77\u62A5\uFF1A<a href="http://weibo.com/seoyutsuki" target="_blank">\u9752\u51CC</a></p>\n        <pre>\n\n\u6587\u6848\uFF1A\n\u5F53\u65E5\u6708\u4E8E\u795E\u660E\u6C38\u751F\n\u5F53\u661F\u8FB0\u4E0E\u6B64\u5FC3\u540C\u6388\n\u90A3\u53CC\u773C\uFF0C\u4ECE\u53E4\u81F3\u4ECA\u6E29\u67D4\u51DD\u89C6\n\u8BDA\u5FC3\u4EE5\u6C42\uFF0C\u6E29\u7136\u7ED9\u4E88\n\u82E5\u4EE5\u5927\u7231\u4E3A\u5FC3\uFF0C\u4E16\u95F4\u79CD\u79CD\uFF0C\u5FC5\u4E0D\u76F8\u8D1F\u3002\n\n\n\n\u541F\u5531\uFF1A\n\u4E00\u613F\u7A3B\u9999\u71D5\u96C0\u5FD9\n\u4E8C\u613F\u6709\u60C5\u521D\u6210\u53CC\n\u4E09\u613F\u957F\u751F\u767B\u4ED9\u4E61\n\u56DB\u6D77\u5347\u5E73\u4E07\u4E16\u82B3\n\n\u591C\uFF0C\u4E09\u66F4\u672A\u592E\uFF0C\u70DB\u706B\u8F7B\u6447\u6643\n\u68A6\uFF0C\u534A\u660E\u534A\u6627\uFF0C\u6A90\u5916\u7ED3\u521D\u971C\n\u604D\u60DA\u95F4\uFF0C\u8C01\u5728\u541F\u5531\n\u7A7F\u8FC7\u96FE\u832B\u832B\n\u8BB0\u4E0D\u6E05\uFF0C\u8BB8\u4E0B\u4EC0\u4E48\u613F\u671B\n\n\u9082\u6625\u82B1 \u521D\u89C1\u4E00\u573A\n\u5FC6\u51AC\u96EA \u83AB\u5931\u83AB\u5FD8\n\u4ED6\u62C8\u6307 \u7ADF\u6570\u4E0D\u6E05\u90A3\u6B32\u671B\n\n\u5BC4\u9E3F\u9E44 \u82F1\u9B42\u5F52\u4E61\n\u81F3\u767D\u5934 \u7EA2\u989C\u4E0D\u5F80\n\u4ED6\u770B\u8FC7 \u4EBA\u95F4\u767E\u6001\u7686\u662F\u5BFB\u5E38\n\n\u8D50\u4E00\u659B\u5929\u547D \u4E07\u7269\u5B55\u83BD\u83BD\n\u4E88\u4E00\u77AC\u767D\u9A79 \u4E5D\u5929\u5FA1\u51E4\u7FD4\n\u4ED6\u9616\u76EE \u95FB\u767E\u9E1F\u9E23\u5531\n\u751F\u53CC\u7FFC \u4F51\u4E07\u4E16\u82AC\u82B3\n\u552F\u4EE5\u60B2\u559C\u7B11\u6CEA \u6362\u4E00\u6367\u9633\u5149\n\n\u613F\u4F5C\u661F \u9A71\u6563\u4ED3\u60F6\n\u613F\u4E3A\u96E8 \u5C06\u68A6\u6ECB\u517B\n\u4ED6\u7684\u5FC3 \u662F\u98CE\u662F\u706B\u662F\u971E\u5149\n\n\u66FE\u4EE5\u7231 \u6E29\u67D4\u6CA7\u6851\n\u4E5F\u4EE5\u6012 \u6A2A\u5BF9\u6267\u5984\n\u4ED6\u7684\u773C \u662F\u65E5\u662F\u6708\u662F\u6D2A\u8352\n\n\u8D50\u4E00\u659B\u5929\u547D \u4E07\u7269\u5B55\u83BD\u83BD\n\u4E88\u4E00\u77AC\u767D\u9A79 \u4E5D\u5929\u5FA1\u51E4\u7FD4\n\u4ED6\u9616\u76EE \u95FB\u767E\u9E1F\u9E23\u5531\n\u751F\u53CC\u7FFC \u4F51\u4E07\u4E16\u82AC\u82B3\n\u552F\u4EE5\u60B2\u559C\u7B11\u6CEA \u6362\u4E00\u6367\u9633\u5149\n\n\u660E\u6708\u7167\u53E4\u4ECA \u4ECA\u4EBA\u8BF4\u53E4\u957F\n\u9B42\u68A6\u5982\u76F8\u6388 \u4E0D\u8F9E\u8D74\u4ED9\u4E61\n\u4ED6\u62AB\u4E0A\u6726\u80E7\u7684\u6708\u5149\n\u7948\u4E00\u573A\u751F\u547D\u7684\u6012\u653E\n\u5343\u5E74\u5BC2\u5BDE\u592A\u957F \u5374\u5FF5\u5FF5\u4E0D\u5FD8\n</pre>'
};

var Intro = function (_migi$Component) {
  _inherits(Intro, _migi$Component);

  function Intro() {
    var _ref;

    _classCallCheck(this, Intro);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Intro.__proto__ || Object.getPrototypeOf(Intro)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Intro, [{
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
    key: 'setId',
    value: function setId(id) {
      this.ref.inspiration.element.innerHTML = hash[id] || '';
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "intro"]], [migi.createVd("div", [["class", "tag"]], [migi.createVd("ul", [["class", "fn-clear"]], [new migi.Obj("tags", this, function () {
        return (this.tags || []).map(function (item) {
          return migi.createVd("li", [], [item.Tag_Name]);
        });
      })])]), migi.createVd("div", [["class", "inspiration"], ["ref", "inspiration"]])]);
    }
  }, {
    key: 'tags',
    set: function set(v) {
      this.__setBind("tags", v);this.__data("tags");
    },
    get: function get() {
      if (this.__initBind("tags")) this.__setBind("tags", []);return this.__getBind("tags");
    }
  }]);

  return Intro;
}(migi.Component);

migi.name(Intro, "Intro");exports.default = Intro;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comment = __webpack_require__(64);

var _Comment2 = _interopRequireDefault(_Comment);

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
var loadingMore = void 0;
var loadEnd = void 0;
var $window = $(window);
var $page = $('#page');
var $main = void 0;
var $body = $(document.body);

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
    self.on(migi.Event.DOM, function () {
      $main = $('.main.work');
      $window.on('scroll', function () {
        self.checkMore();
      });
      $page.on('scroll', function () {
        self.checkMore();
      });
    });
    return _this;
  }

  _createClass(WorkComment, [{
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
      skip = 0;
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      // self.ref.comment.showComment();
      self.ref.comment.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      self.loading = true;
      ajax = util.postJSON('/api/works/commentList', { worksID: self.id, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          // currentCount = data.Size;
          skip += take;
          if (data.data.length) {
            self.ref.comment.message = '';
            self.ref.comment.showComment(res.data.data);
          } else {
            self.ref.comment.showComment(res.data.data);
            self.ref.comment.message = '暂无评论';
            loadEnd = true;
          }
        } else {
          if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          }
          self.ref.comment.showComment();
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
        self.loading = false;
      }, function (res) {
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        self.loading = false;
      });
    }
  }, {
    key: 'checkMore',
    value: function checkMore() {
      var self = this;
      var WIN_HEIGHT = $window.height();
      var bool = void 0;
      if (window.IS_MOBILE) {
        bool = $page.scrollTop() + WIN_HEIGHT + 30 > $main.outerHeight();
      } else {
        bool = $window.scrollTop() + WIN_HEIGHT + 30 > $page.height();
      }
      if (self.showComment && !self.loading && !loadingMore && !loadEnd && bool) {
        loadingMore = true;
        ajax = util.postJSON('/api/works/commentList', { worksID: self.id, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
          if (res.success) {
            var data = res.data;
            // currentCount = data.Size;
            skip += take;
            if (data.data.length) {
              self.ref.comment.addMore(data.data);
              if (data.data.length < take) {
                self.ref.comment.message = '';
                loadEnd = true;
              }
            } else {
              loadEnd = true;
              self.ref.comment.message = '';
            }
          } else {
            self.ref.comment.message = res.message || util.ERROR_MESSAGE;
          }
          self.loading = false;
          loadingMore = false;
        }, function (res) {
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
          self.loading = false;
          loadingMore = false;
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
      skip = 0;
      if (ajax) {
        ajax.abort();
      }
      loadEnd = false;
      this.loading = false;
      this.ref.comment.showComment();
      this.ref.comment.abort();
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
      loadEnd = false;
      this.loading = false;
      this.ref.comment.showComment();
      this.ref.comment.abort();
      this.load();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "comments fn-hide"]], [migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], [migi.createVd("span", [], ["全部"])]), migi.createVd("li", [["rel", "1"]], [migi.createVd("span", [], ["我的"])])]), migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], [migi.createVd("span", [], ["最新"])]), migi.createVd("li", [["rel", "1"]], [migi.createVd("span", [], ["最热"])])]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/works/likeComment"], ["subUrl", "/api/works/subCommentList"], ["delUrl", "/api/works/delComment"]])]);
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
    key: 'id',
    set: function set(v) {
      this.__setBind("id", v);this.__data("id");
    },
    get: function get() {
      return this.__getBind("id");
    }
  }]);

  return WorkComment;
}(migi.Component);

migi.name(WorkComment, "WorkComment");exports.default = WorkComment;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_migi$Component) {
  _inherits(About, _migi$Component);

  function About() {
    var _ref;

    _classCallCheck(this, About);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = About.__proto__ || Object.getPrototypeOf(About)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(About, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main history"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("h3", [], [migi.createVd("span", [], ["•", migi.createVd("br", []), "感谢", migi.createVd("br", []), "•"])]), migi.createVd("div", [["class", "c"]], [migi.createVd("p", [], ["“人间梦我，我梦人间裁。”"]), migi.createVd("p", [], ["二次元世界就好似平行于三次元的一个梦幻世界。在这里，二次元优秀的创作者、众人青睐的大神们也有梦可造，有念可说。异世谣的初衷便是把这个网络世界幻想化，用奇幻动人的故事将大神们的所思所想与心境感悟表达出来，并分享给大家。"]), migi.createVd("p", [], ["感谢众多的男神女神支持并参与这个系列的创作，我们会竭尽全力将大家一起创造的这个世界用美妙的音乐、精美的绘画、精彩的视频以及其他各种形式呈现给大家！"]), migi.createVd("p", [], ["也要特别感谢 ", migi.createVd("a", [["href", "http://weibo.com/p/1005056259241863"], ["target", "_blank"]], ["@转圈circling"]), " 的程序员小哥哥们为我们提供的技术支持，让我们能够通过各种方式和异世以及异世的大神们进行互动。"]), migi.createVd("p", [], ["异世里的故事会随着更多好听的新歌曲放出，详情请关注我们的官网与官博、官微哟。"]), migi.createVd("p", [["class", "end"]], ["—— ", migi.createVd("a", [["href", "#characterjiemeng"]], ["结梦团队"]), migi.createVd("a", [["href", "http://weibo.com/u/6276065571"], ["target", "_blank"]], ["@结梦谷"])]), migi.createVd("p", [["class", "end"]], ["丁酉年 戊申月 丙戌日"])]), migi.createVd("div", [["class", "scroll fn-hide"]], [migi.createVd("span", [["class", "bar"]])])])]);
    }
  }]);

  return About;
}(migi.Component);

migi.name(About, "About");exports.default = About;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comment = __webpack_require__(64);

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajax = void 0;
var authorId = void 0;

var SComment = function (_migi$Component) {
  _inherits(SComment, _migi$Component);

  function SComment() {
    var _ref;

    _classCallCheck(this, SComment);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = SComment.__proto__ || Object.getPrototypeOf(SComment)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(SComment, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      this.load();
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      if (ajax) {
        ajax.abort();
      }
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      self.ref.comment.message = '读取中...';
      if (ajax) {
        ajax.abort();
      }
      ajax = util.postJSON('/api/author/singleComment', { commentID: window.cid }, function (res) {
        if (res.success) {
          var data = res.data;
          self.rootId = self.replayId = data.Send_ID;
          authorId = data.AuthorID;
          self.ref.comment.message = '';
          self.ref.comment.showComment([data]);
          $(self.ref.comment.element).find('.slide').click();
        } else {
          self.ref.comment.showComment();
          self.ref.comment.message = res.message || util.ERROR_MESSAGE;
        }
      }, function (res) {
        self.ref.comment.showComment();
        self.ref.comment.message = res.message || util.ERROR_MESSAGE;
      });
    }
  }, {
    key: 'input',
    value: function input(e, vd) {
      var v = $(vd.element).val().trim();
      this.hasContent = v.length > 0;
    }
  }, {
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      if (self.hasContent) {
        var $input = $(this.ref.input.element);
        var content = $input.val();
        var parentID = self.replayId !== null ? self.replayId : -1;
        var rootID = self.rootId !== null ? self.rootId : -1;
        self.sending = true;
        if (ajax) {
          ajax.abort();
        }
        ajax = util.postJSON('/api/author/addComment', {
          parentID: parentID,
          rootID: rootID,
          content: content,
          authorID: authorId
        }, function (res) {
          if (res.success) {
            $input.val('');
            self.hasContent = false;
            if (rootID === -1) {
              self.ref.comment.addNew(res.data);
              self.ref.comment.message = '';
            } else {
              self.ref.comment.addChild(res.data);
            }
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
          self.sending = false;
        }, function (res) {
          alert(res.message || util.ERROR_MESSAGE);
          self.sending = false;
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main scomment"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("div", [["class", "wrap"]], [migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/author/likeComment"], ["subUrl", "/api/author/subCommentList"], ["delUrl", "/api/author/deleteComment"]])]), migi.createVd("div", [["class", "form"]], [migi.createVd("div", [["class", "inputs"]], [migi.createVd("input", [["ref", "input"], ["maxlength", "1000"], ["type", "text"], ["placeholder", "留言..."], ["onInput", new migi.Cb(this, this.input)]])]), migi.createVd("button", [["onClick", new migi.Cb(this, this.click)], ["class", new migi.Obj(["hasContent", "sending"], this, function () {
        return this.hasContent && !this.sending ? '' : 'dis';
      })]], ["确定"])])])])]);
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
    key: 'sending',
    set: function set(v) {
      this.__setBind("sending", v);this.__data("sending");
    },
    get: function get() {
      return this.__getBind("sending");
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
  }]);

  return SComment;
}(migi.Component);

migi.name(SComment, "SComment");exports.default = SComment;

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_migi$Component) {
  _inherits(Grid, _migi$Component);

  function Grid() {
    var _ref;

    _classCallCheck(this, Grid);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Grid, [{
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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "main grid"]], [migi.createVd("div", [["class", "con"]], [migi.createVd("ul", [["class", "fn-clear"]], [migi.createVd("li", [], [migi.createVd("a", [["href", "#work2015000000000001"]], [migi.createVd("img", [["src", "http://zhuanquan.xyz/rhymesland/src/single/grid/1.jpg"]]), migi.createVd("span", [], ["《皎然记》"])])]), migi.createVd("li", [], [migi.createVd("a", [["href", "#work2015000000000002"]], [migi.createVd("img", [["src", "http://zhuanquan.xyz/rhymesland/src/single/grid/2.jpg"]]), migi.createVd("span", [], ["《说梦》"])])]), migi.createVd("li", [], [migi.createVd("a", [["href", "#work2015000000001329"]], [migi.createVd("img", [["src", "http://zhuanquan.xyz/pic/e45a131fe3e858af6226958c4931f25b.jpg"]]), migi.createVd("span", [], ["《黄粱梦》"])])]), migi.createVd("li", [], [migi.createVd("a", [["href", "#work2015000000001331"]], [migi.createVd("img", [["src", "http://zhuanquan.xyz/pic/25fbb4c756a8e2c8f4175e8f53065b69.jpg"]]), migi.createVd("span", [], ["《梦黄粱》"])])])])])]);
    }
  }]);

  return Grid;
}(migi.Component);

migi.name(Grid, "Grid");exports.default = Grid;

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(237);

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// QueryString
// ---------------
// This module provides utilities for dealing with query strings.
//
// Thanks to:
//  - http://nodejs.org/docs/v0.4.7/api/querystring.html
//  - http://developer.yahoo.com/yui/3/api/QueryString.html
//  - https://github.com/lifesinger/dew/tree/master/lib/querystring


// var QueryString = exports;

var QueryString = {};

// The escape/unescape function used by stringify/parse, provided so that it
// could be overridden if necessary. This is important in cases where
// non-standard delimiters are used, if the delimiters would not normally be
// handled properly by the built-in (en|de)codeURIComponent functions.
QueryString.escape = encodeURIComponent;

QueryString.unescape = function (s) {
    // The + character is interpreted as a space on the server side as well as
    // generated by forms with spaces in their fields.
    return decodeURIComponent(s.replace(/\+/g, ' '));
};

/**
 * Serialize an object to a query string. Optionally override the default
 * separator and assignment characters.
 *
 * stringify({foo: 'bar'})
 *   // returns 'foo=bar'
 *
 * stringify({foo: 'bar', baz: 'bob'}, ';', ':')
 *   // returns 'foo:bar;baz:bob'
 */
QueryString.stringify = function (obj, sep, eq, arrayKey) {
    if (!isPlainObject(obj)) return '';

    sep = sep || '&';
    eq = eq || '=';
    arrayKey = arrayKey || false;

    var buf = [],
        key,
        val;
    var escape = QueryString.escape;

    for (key in obj) {
        if (!hasOwnProperty.call(obj, key)) continue;

        val = obj[key];
        key = QueryString.escape(key);

        // val is primitive value
        if (isPrimitive(val)) {
            buf.push(key, eq, escape(val + ''), sep);
        }
        // val is not empty array
        else if (isArray(val) && val.length) {
                for (var i = 0; i < val.length; i++) {
                    if (isPrimitive(val[i])) {
                        buf.push(key, (arrayKey ? escape('[]') : '') + eq, escape(val[i] + ''), sep);
                    }
                }
            }
            // ignore other cases, including empty array, Function, RegExp, Date etc.
            else {
                    buf.push(key, eq, sep);
                }
    }

    buf.pop();
    return buf.join('');
};

/**
 * Deserialize a query string to an object. Optionally override the default
 * separator and assignment characters.
 *
 * parse('a=b&c=d')
 *   // returns {a: 'b', c: 'c'}
 */
QueryString.parse = function (str, sep, eq) {
    var ret = {};

    if (typeof str !== 'string' || trim(str).length === 0) {
        return ret;
    }

    var pairs = str.split(sep || '&');
    eq = eq || '=';
    var unescape = QueryString.unescape;

    for (var i = 0; i < pairs.length; i++) {

        var pair = pairs[i].split(eq);
        var key = unescape(trim(pair[0]));
        var val = unescape(trim(pair.slice(1).join(eq)));

        var m = key.match(/^(\w+)\[\]$/);
        if (m && m[1]) {
            key = m[1];
        }

        if (hasOwnProperty.call(ret, key)) {
            if (!isArray(ret[key])) {
                ret[key] = [ret[key]];
            }
            ret[key].push(val);
        } else {
            ret[key] = m ? [val] : val;
        }
    }

    return ret;
};

// Helpers

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var isArray = Array.isArray || function (val) {
    return toString.call(val) === '[object Array]';
};
var trim = String.prototype.trim ? function (str) {
    return str == null ? '' : String.prototype.trim.call(str);
} : function (str) {
    return str == null ? '' : str.toString().replace(/^\s+/, '').replace(/\s+$/, '');
};

/**
 * Checks to see if an object is a plain object (created using "{}" or
 * "new Object()" or "new FunctionClass()").
 */
function isPlainObject(o) {
    /**
     * NOTES:
     * isPlainObject(node = document.getElementById("xx")) -> false
     * toString.call(node):
     *   ie678 === '[object Object]', other === '[object HTMLElement]'
     * 'isPrototypeOf' in node:
     *   ie678 === false, other === true
     */
    return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
}

/**
 * If the type of o is null, undefined, number, string, boolean,
 * return true.
 */
function isPrimitive(o) {
    return o !== Object(o);
}

module.exports = QueryString;

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    self.on(migi.Event.DOM, function () {
      var $root = $(self.element);
      $root.on('click', '.zan', function () {
        var $span = $(this);
        var commentID = $span.attr('cid');
        util.postJSON(self.props.zanUrl, { commentID: commentID }, function (res) {
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
            alert(res.message || util.ERROR_MESSAGE);
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
        ajax = util.postJSON(self.props.subUrl, { rootID: rid, skip: subSkipHash[rid], take: take }, function (res) {
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
            $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
          }
        }, function (res) {
          $message.addClass('more').text(res.message || util.ERROR_MESSAGE);
        });
      });
      $root.on('click', '.share', function (e) {
        e.preventDefault();
        var $btn = $(this);
        self.emit('copy', location.protocol + '//' + location.host + $btn.attr('href'));
      });
      $root.on('click', '.remove', function () {
        var $btn = $(this);
        var cid = $btn.attr('cid');
        util.postJSON(self.props.delUrl, { commentID: cid }, function (res) {
          if (res.success) {
            $btn.closest('li').remove();
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || util.ERROR_MESSAGE);
          }
        });
      });
    });
    return _this;
  }

  _createClass(Comment, [{
    key: 'abort',
    value: function abort() {
      if (ajax) {
        ajax.abort();
      }
      this.message = '';
      subLoadHash = {};
      subSkipHash = {};
      $lastSlide = null;
    }
  }, {
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
        self.emit('noSubComment');
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
          ajax = util.postJSON(self.props.subUrl, { rootID: rid, skip: 0, take: take }, function (res) {
            if (res.success) {
              subLoadHash[rid] = HAS_LOADED;
              var s = '';
              var data = res.data;
              data.data.forEach(function (item) {
                s += self.genChildComment(item);
              });
              $ul.html(s);
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
              $message.text(res.message || util.ERROR_MESSAGE);
            }
          }, function (res) {
            subLoadHash[rid] = NOT_LOADED;
            $message.text(res.message || util.ERROR_MESSAGE);
          });
        }
      }
    }
  }, {
    key: 'showComment',
    value: function showComment(data) {
      var self = this;
      var s = '';
      (data || []).forEach(function (item) {
        s += self.genComment(item);
      });
      $(self.ref.list.element).html(s);
    }
  }, {
    key: 'addMore',
    value: function addMore(data) {
      var self = this;
      var s = '';
      (data || []).forEach(function (item) {
        s += self.genComment(item);
      });
      $(self.ref.list.element).append(s);
    }
  }, {
    key: 'addNew',
    value: function addNew(item) {
      this.genComment(item).prependTo(this.ref.list.element);
    }
  }, {
    key: 'addChild',
    value: function addChild(item) {
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
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || 'http://rhymesland.oss-cn-shanghai.aliyuncs.com/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), migi.createVd("a", [["class", "share"], ["href", '/?cid=' + item.Send_ID], ["target", "_blank"]], ["分享"]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [], [item.sub_Count]), migi.createVd("span", [], ["收起"])])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || 'http://rhymesland.oss-cn-shanghai.aliyuncs.com/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [item.Send_Content])])]);
    }
  }, {
    key: 'switchType',
    value: function switchType(e, vd, tvd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      this.emit('switchType', $ul.find('.cur').attr('rel'));
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp_comment"]], [migi.createVd("ul", [["class", "list"], ["ref", "list"]]), migi.createVd("p", [["class", new migi.Obj("message", this, function () {
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

/***/ })

/******/ });