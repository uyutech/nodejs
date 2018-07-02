var migi=global.migi.clone();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  migi.resetUid();

  var info = data.info;
  var originWorks = data.originWorks;

  var home = migi.preRender(migi.createCp(_Home2.default, [["info", info], ["originWorks", originWorks]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n  <meta charset="utf-8"/>\n  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n  <meta name="renderer" content="webkit"/>\n  <meta name="apple-mobile-web-app-capable" content="yes"/>\n  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>\n  <meta name="format-detection" content="telephone=no"/>\n  <meta name="format-detection" content="email=no"/>\n  <meta name="wap-font-scale" content="no"/>\n  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">\n  <title>' + info.title + '</title>\n  <link rel="icon" href="//zhuanquan.xin/img/ba2257a30816928629e0b47f9e6f7b38.png" type="image/x-icon">\n  <link rel="stylesheet" href="/public/ysjxy.css"/>\n</head>\n<body>\n' + home + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.info = ' + data.helper.stringify(info) + ';\n  $CONFIG.originWorks = ' + data.helper.stringify(originWorks) + ';\n</script>\n<script src="/public/rcommon.js"></script>\n<script src="/public/ysjxy.js"></script>\n<div style="display:none"><script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1266706529\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1266706529\' type=\'text/javascript\'%3E%3C/script%3E"));</script></div>\n</body>\n</html>';
};

var _Home = __webpack_require__(47);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(48);

var _util2 = _interopRequireDefault(_util);

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

    var _this = _possibleConstructorReturn(this, (_ref = Home.__proto__ || Object.getPrototypeOf(Home)).call.apply(_ref, [this].concat(data)));

    _this.index = 0;
    _this.tab = 0;
    return _this;
  }

  _createClass(Home, [{
    key: 'clickIndex',
    value: function clickIndex(e, vd, tvd) {
      if (this.index === tvd.props.rel) {
        return;
      }
      this.index = tvd.props.rel;
    }
  }, {
    key: 'clickTab',
    value: function clickTab(e, vd, tvd) {
      if (this.tab === tvd.props.rel) {
        return;
      }
      this.tab = tvd.props.rel;
    }
  }, {
    key: 'render',
    value: function render() {
      var info = this.props.info;
      var originWorks = this.props.originWorks;
      return migi.createVd("div", [["class", "home"]], [migi.createVd("div", [["class", "banner"]], [migi.createVd("img", [["src", "//zhuanquan.xin/rhymesland/ysjxy/banner.jpg"]])]), migi.createVd("div", [["class", "con"]], [migi.createVd("ul", [["class", "nav fn-clear"], ["onClick", [[{ "span": { "_v": true } }, new migi.Cb(this, this.clickIndex)]]]], [migi.createVd("li", [], [migi.createVd("span", [["class", new migi.Obj("index", this, function () {
        return this.index === 0 ? 'cur' : '';
      })], ["rel", 0]], ["首页"])]), migi.createVd("li", [], [migi.createVd("span", [["class", new migi.Obj("index", this, function () {
        return this.index === 1 ? 'cur' : '';
      })], ["rel", 1]], ["活动详情"])]), migi.createVd("li", [], [migi.createVd("span", [["class", new migi.Obj("index", this, function () {
        return this.index === 2 ? 'cur' : '';
      })], ["rel", 2]], ["参赛作品"])]), migi.createVd("li", [], [migi.createVd("span", [["class", new migi.Obj("index", this, function () {
        return this.index === 3 ? 'cur' : '';
      })], ["rel", 3]], ["获奖作品"])])]), migi.createVd("div", [["class", new migi.Obj("index", this, function () {
        return this.index === 0 ? '' : 'fn-hide';
      })]], [migi.createVd("div", [["class", "info"]], [migi.createVd("h3", [["class", "title"]], ["活动简介"]), migi.createVd("pre", [], [info.describe])]), migi.createVd("div", [["class", "join"]], [migi.createVd("h3", [["class", "title"]], ["参赛报名"]), migi.createVd("ul", [["class", "tab"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickTab)]]]], [migi.createVd("li", [["class", new migi.Obj("tab", this, function () {
        return this.tab === 0 ? 'cur' : '';
      })], ["rel", 0]], ["翻唱比赛"]), migi.createVd("li", [["class", new migi.Obj("tab", this, function () {
        return this.tab === 1 ? 'cur' : '';
      })], ["rel", 1]], ["绘画比赛"])]), migi.createVd("div", [["class", new migi.Obj("tab", this, function () {
        return 'c' + (this.tab === 0 ? '' : ' fn-hide');
      })]], [migi.createVd("p", [], ["日常感慨异世大神的歌声余音绕梁？渴望摇身一变成为大神之一？是时候展现你动人的歌喉啦。", migi.createVd("br", []), "\n\
                异世谣至今已解锁3个篇章，发布15首歌曲。众多歌谣各有美妙，或在于一见倾心洗脑循环，或在于某个瞬间让你无意识地哼起。快来pick你喜欢的异世歌谣，唱给你喜爱的大神~", migi.createVd("br", []), "\n\
                我们准备了丰厚奖品，更不容错过的是——优胜者有机会成为异世大神中的一员，由官方打造角色曲以及人设图！帮你实现穿越到异世的豪华脑洞！", migi.createVd("br", []), migi.createVd("br", []), "\n\
                参赛方式：", migi.createVd("br", []), "\n\
                登录异世谣官网 → 点击“异世交响月活动”→ 选择“异世翻唱大赛”→ 点击“我要参赛” → 上传作品并填写相关参赛信息→参赛成功！", migi.createVd("br", []), migi.createVd("br", []), "\n\
                参赛要求：", migi.createVd("br", []), "\n\
                （1） 翻唱歌曲需为《异世谣》正式出品的歌曲（已在下方列出），请使用异世谣官方提供的歌曲伴奏，自由选择歌曲翻唱。", migi.createVd("br", []), "\n\
                （2） 参赛选手需按照原词曲进行翻唱，不得擅自修改唱词和曲调。", migi.createVd("br", []), "\n\
                （3） 参赛者可根据自身需求对伴奏进行适当的升降调处理。", migi.createVd("br", []), "\n\
                （4） 参赛者需为参与翻唱的歌手本人。", migi.createVd("br", []), "\n\
                （5） 比赛允许多人合唱参赛，实体或现金奖品由上传参赛者负责分配。", migi.createVd("br", []), "\n\
                （6） 比赛允许一人投稿多首作品，评选时将采用名次最高的作品。", migi.createVd("br", []), "\n\
                （7） 为避免不必要的误会或纠纷，请参赛选手保留一份参赛作品的未处理干声。"]), migi.createVd("ul", [["class", "origin fn-clear"]], [originWorks.map(function (item) {
        var work = item.collection[0];
        for (var i = 1; i < item.collection.length; i++) {
          var o = item.collection[i];
          if (o.kind === 2) {
            work = o;
            break;
          }
        }
        var accompany = void 0;
        for (var _i = 1; _i < item.collection.length; _i++) {
          var _o = item.collection[_i];
          if (_o.type === 3) {
            accompany = _o;
            break;
          }
        }
        accompany = accompany || work;
        var author = [];
        var hash = {};
        work.author.forEach(function (item) {
          item.list.forEach(function (item) {
            if (!hash[item.id]) {
              hash[item.id] = true;
              author.push(item);
            }
          });
        });
        return migi.createVd("li", [], [migi.createVd("a", [["href", 'https://circling.cc/works/' + item.id], ["class", "pic"], ["target", "_blank"]], [migi.createVd("img", [["src", _util2.default.img(item.cover || work.cover, 100, 100, 80) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [], [item.title + (item.subTitle ? ' - ' + item.subTitle : '')]), migi.createVd("div", [], [author.map(function (item) {
          return migi.createVd("span", [], [item.name]);
        })]), migi.createVd("div", [], [migi.createVd("a", [["href", 'https://circling.cc/works/' + item.id + '/' + work.id], ["target", "_blank"]], ["原曲"]), migi.createVd("a", [["href", 'https://circling.cc/works/' + item.id + '/' + accompany.id], ["target", "_blank"]], ["伴奏"])])]);
      })])]), migi.createVd("div", [["class", new migi.Obj("tab", this, function () {
        return 'c' + (this.tab === 1 ? '' : ' fn-hide');
      })]], ["\n\
              2222222222222222222\n\
            "])])]), migi.createVd("div", [["class", new migi.Obj("index", this, function () {
        return this.index === 1 ? '' : 'fn-hide';
      })]], [migi.createVd("div", [["class", "time"]], [migi.createVd("h3", [["class", "title"]], ["活动时间"]), migi.createVd("img", [["src", "//zhuanquan.xin/rhymesland/ysjxy/time.png"]])])])])]);
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
    key: 'tab',
    set: function set(v) {
      this.__setBind("tab", v);this.__data("tab");
    },
    get: function get() {
      return this.__getBind("tab");
    }
  }]);

  return Home;
}(migi.Component);

migi.name(Home, "Home");exports.default = Home;

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sort__ = __webpack_require__(49);
/**
 * Created by army on 2017/5/20.
 */


// import $ from 'anima-yocto-ajax';

let util = {
  isIPhone: function(){
    return navigator.appVersion.match(/iphone/gi);
  },
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
    return util.ajax(url, data, success, error);
  },
  postJSON: function(url, data, success, error) {
    if(typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function() {};
    return util.ajax(url, data, success, error, 'post');
  },
  autoSsl: function(url) {
    if(!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function(url, w, h, q) {
    url = url || '';
    url = url.trim();
    if(!/\/\/zhuanquan\./i.test(url)) {
      return util.autoSsl(url);
    }
    url = url.replace(/\.(\w+)-\d*_\d*_\d*/, '.$1');
    if(w === undefined && h === undefined && q === undefined) {
      return url;
    }
    url += '-' + (w ? w : '') + '_' + (h ? h : '') + '_' + (q ? q : '');
    return util.autoSsl(url);
  },
  sort: __WEBPACK_IMPORTED_MODULE_0__sort__["a" /* default */],
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

/* harmony default export */ __webpack_exports__["default"] = (util);


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function quickSort(arr, begin, end, compare) {
  if(begin >= end) {
    return;
  }
  var i = begin, j = end, p = i, v = arr[p], seq = true;
  while(i < j) {
    if(seq) {
      for(; i < j; j--) {
        if(compare.call(arr, v, arr[j])) {
          swap(arr, p, j);
          p = j;
          seq = !seq;
          i++;
          break;
        }
      }
    }
    else {
      for(; i < j; i++) {
        if(compare.call(arr, arr[i], v)) {
          swap(arr, p, i);
          p = i;
          seq = !seq;
          j--;
          break;
        }
      }
    }
  }
  quickSort(arr, begin, p - 1, compare);
  quickSort(arr, p + 1, end, compare);
}
function swap(arr, a, b) {
  var temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

/* harmony default export */ __webpack_exports__["a"] = (function(arr, compare) {
  if(!Array.isArray(arr)) {
    throw new Error('quick sort need an array');
  }
  if(arr.length < 2) {
    return arr;
  }
  compare = compare || function() {};
  quickSort(arr, 0, arr.length - 1, compare);
  return arr;
});;


/***/ })

/******/ })));