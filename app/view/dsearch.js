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
/******/ 	return __webpack_require__(__webpack_require__.s = 98);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
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
    css: 'ce',
  },
  '902': {
    name: '策划',
    display: '策划',
    css: 'ce',
  },
  '111': {
    name: '演唱',
    display: '演唱',
    css: 'ge',
  },
  '112': {
    name: '和声',
    display: '和声',
    css: 'ge',
  },
  '113': {
    name: '伴唱',
    display: '伴唱',
    css: 'ge',
  },
  '114': {
    name: '戏腔',
    display: '戏腔',
    css: 'ge',
  },
  '115': {
    name: '合唱',
    display: '合唱',
    css: 'ge',
  },
  '121': {
    name: '作曲',
    display: '作曲',
    css: 'qu',
  },
  '122': {
    name: '编曲',
    display: '编曲',
    css: 'qu',
  },
  '131': {
    name: '混音',
    display: '混音',
    css: 'hun',
  },
  '132': {
    name: '母带',
    display: '母带',
    css: 'hun',
  },
  '133': {
    name: '录音',
    display: '录音',
    css: 'hun',
  },
  '134': {
    name: '修音',
    display: '修音',
    css: 'hun',
  },
  '141': {
    name: '演奏',
    display: '演奏', //优先显示乐器名。
    css: 'yue',
  },
  '151': {
    name: '配音',
    display: '配音',
    css: 'yue',
  },
  '211': {
    name: '视频',
    display: '视频',
    css: 'ying',
  },
  '212': {
    name: '压制',
    display: '压制',
    css: 'ying',
  },
  '213': {
    name: '拍摄',
    display: '拍摄',
    css: 'ying',
  },
  '311': {
    name: '立绘',
    display: '立绘',
    css: 'tu',
  },
  '312': {
    name: 'CG',
    display: 'CG',
    css: 'tu',
  },
  '313': {
    name: '场景',
    display: '场景',
    css: 'tu',
  },
  '314': {
    name: '线稿',
    display: '线稿',
    css: 'tu',
  },
  '315': {
    name: '上色',
    display: '上色',
    css: 'tu',
  },
  '316': {
    name: '手绘',
    display: '手绘',
    css: 'tu',
  },
  '317': {
    name: '插画',
    display: '插画',
    css: 'tu',
  },
  '331': {
    name: '设计',
    display: '设计',
    css: 'she',
  },
  '332': {
    name: '海报',
    display: '海报',
    css: 'she',
  },
  '333': {
    name: 'Logo设计',
    display: 'Logo设计',
    css: 'she',
  },
  '341': {
    name: '漫画',
    display: '漫画',
    css: 'she',
  },
  '351': {
    name: '书法',
    display: '书法',
    css: 'ji',
  },
  '391': {
    name: '沙画',
    display: '沙画',
    css: 'ji',
  },
  '411': {
    name: '作词',
    display: '作词',
    css: 'wen',
  },
  '421': {
    name: '文案',
    display: '文案',
    css: 'wen',
  },
  '422': {
    name: '剧本',
    display: '剧本',
    css: 'wen',
  },
  '423': {
    name: '小说',
    display: '小说',
    css: 'wen',
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

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var kw = data.kw;
  var datas = data.datas;

  var search = migi.preRender(migi.createCp(_Search2.default, [["datas", datas]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dsearch.css') + '"/>\n</head>\n<body>\n<div id="page">' + search + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.kw = ' + JSON.stringify(kw) + ';\n  $CONFIG.datas = ' + JSON.stringify(datas) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dsearch.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Search = __webpack_require__(99);

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(5);

var _authorTemplate2 = _interopRequireDefault(_authorTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_migi$Component) {
  _inherits(Search, _migi$Component);

  function Search() {
    var _ref;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.kw = self.props.kw;
    {
      var _data = self.props.datas.data;
      var list = [];
      _data.Author.forEach(function (item) {
        list.push({
          key: 'author',
          value: item
        });
      });
      _data.Audio.forEach(function (item) {
        list.push({
          key: 'audio',
          value: item
        });
      });
      if (list.length) {
        self.list = list;
        self.on(migi.Event.DOM, function () {
          self.autoWidth();
        });
      } else {
        self.message = '暂无搜索结果';
      }
    }
    return _this;
  }

  _createClass(Search, [{
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
      this.list = [];
    }
  }, {
    key: 'load',
    value: function load(kw) {
      var self = this;
      self.kw = kw;
      util.postJSON('api/search/Homesearch', { Parameter: kw }, function (res) {
        if (res.success) {
          var data = res.data;
          var list = [];
          data.Author.forEach(function (item) {
            list.push({
              key: 'author',
              value: item
            });
          });
          data.Audio.forEach(function (item) {
            list.push({
              key: 'audio',
              value: item
            });
          });
          if (list.length) {
            self.list = list;
            self.autoWidth();
          } else {
            self.message = '暂无搜索结果';
          }
        }
      });
    }
  }, {
    key: 'autoWidth',
    value: function autoWidth() {
      $(this.element).find('li.author .list').each(function (i, o) {
        var $o = $(o);
        var $c = $o.find('.c');
        $c.css('width', '9999rem');
        var $ul = $c.find('ul');
        $c.css('width', $ul.width() + 1);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      return migi.createVd("div", [["class", "search"]], [migi.createVd("ul", [["class", new migi.Obj("list", this, function () {
        return this.list.length ? '' : 'fn-hide';
      })]], [new migi.Obj("list", this, function () {
        return this.list.map(function (item) {
          var key = item.key;
          var value = item.value;
          if (key === 'author') {
            var name = value.AuthorName || '';
            var i = name.indexOf(self.kw);
            if (i > -1) {
              name = migi.util.encodeHtml(name.slice(0, i)) + '<strong>' + name.slice(i, i + self.kw.length) + '</strong>' + migi.util.encodeHtml(name.slice(i + self.kw.length));
            } else {
              name = migi.util.encodeHtml(name);
            }
            var hash = {};
            value.Authortype.forEach(function (item) {
              var css = _authorTemplate2.default.code2Data[item.AuthorTypeID].css;
              hash[css] = true;
            });
            var authorType = Object.keys(hash);
            return migi.createVd("li", [["class", "author fn-clear"]], [migi.createVd("a", [["href", '/author/' + value.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", value.Head_url || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']])]), migi.createVd("div", [["class", "info"]], [migi.createVd("a", [["href", '/author/' + value.AuthorID], ["class", "name"]], [migi.createVd("h4", [["dangerouslySetInnerHTML", name]]), authorType.map(function (item) {
              return migi.createVd("span", [["class", 'cp-author-type-' + item]]);
            })]), migi.createVd("p", [], ["粉丝：", value.FansNumber])])]);
          } else if (key === 'audio') {
            var _name = value.workName || '';
            var _i = _name.indexOf(self.kw);
            if (_i > -1) {
              _name = migi.util.encodeHtml(_name.slice(0, _i)) + '<strong>' + _name.slice(_i, _i + self.kw.length) + '</strong>' + migi.util.encodeHtml(_name.slice(_i + self.kw.length));
            } else {
              _name = migi.util.encodeHtml(_name);
            }
            return migi.createVd("li", [["class", "audio fn-clear"]], [migi.createVd("a", [["href", '/works/' + value.workID], ["class", "pic"]], [migi.createVd("img", [["src", value.CoverPic || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [["class", "info"]], [migi.createVd("a", [["href", '/works/' + value.workID], ["class", "name"], ["dangerouslySetInnerHTML", _name]])])]);
          }
        });
      })]), migi.createVd("div", [["class", new migi.Obj("list", this, function () {
        return 'message' + (this.list.length ? ' fn-hide' : '');
      })]], [new migi.Obj("message", this, function () {
        return this.message;
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
  }, {
    key: 'message',
    set: function set(v) {
      this.__setBind("message", v);this.__data("message");
    },
    get: function get() {
      return this.__getBind("message");
    }
  }, {
    key: 'kw',
    set: function set(v) {
      this.__setBind("kw", v);this.__data("kw");
    },
    get: function get() {
      return this.__getBind("kw");
    }
  }]);

  return Search;
}(migi.Component);

migi.name(Search, "Search");exports.default = Search;

/***/ })

/******/ })));