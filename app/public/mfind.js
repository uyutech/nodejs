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
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by army on 2017/5/20.
 */

var util = {
  isIPhone: function isIPhone() {
    return navigator.appVersion.match(/iphone/gi);
  },
  goto: function goto(url) {
    location.href = url;
  },
  img150_150: function img150_150(url) {
    return url ? url + '-150_150' : url;
  },
  img100_100: function img100_100(url) {
    return url ? url + '-100_100' : url;
  },
  img90_90: function img90_90(url) {
    return url ? url + '-90_90' : url;
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

exports.default = util;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by army8735 on 2017/8/13.
 */

var code2Data = {
  '901': {
    name: '出品',
    display: '出品',
    css: 'producer'
  },
  '111': {
    name: '演唱',
    display: '演唱',
    css: 'singer'
  },
  '112': {
    name: '和声',
    display: '和声',
    css: 'singer'
  },
  '121': {
    name: '作曲',
    display: '作曲',
    css: 'musician'
  },
  '122': {
    name: '编曲',
    display: '编曲',
    css: 'musician'
  },
  '131': {
    name: '混音',
    display: '混音',
    css: 'mixer'
  },
  '134': {
    name: '修音',
    display: '修音',
    css: 'mixer'
  },
  '141': {
    name: '演奏',
    display: '', //直接显示乐器名。
    css: 'instrumental'
  },
  '211': {
    name: '视频',
    display: '视频',
    css: 'video'
  },
  '311': {
    name: '立绘',
    display: '立绘',
    css: 'painter'
  },
  '312': {
    name: 'CG',
    display: 'CG',
    css: 'painter'
  },
  '313': {
    name: '场景',
    display: '场景',
    css: 'painter'
  },
  '331': {
    name: '设计',
    display: '设计',
    css: 'designer'
  },
  '332': {
    name: '海报',
    display: '海报',
    css: 'designer'
  },
  '351': {
    name: '书法',
    display: '书法',
    css: 'handwriting'
  },
  '411': {
    name: '作词',
    display: '作词',
    css: 'writer'
  },
  '421': {
    name: '文案',
    display: '文案',
    css: 'writer'
  }
};

var label2Code = {};
Object.keys(code2Data).forEach(function (k) {
  var v = code2Data[k];
  label2Code[v.css] = label2Code[v.css] || [];
  label2Code[v.css].push(k);
});

exports.default = {
  code2Data: code2Data,
  label2Code: label2Code
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_migi$Component) {
  _inherits(Banner, _migi$Component);

  function Banner() {
    var _ref;

    _classCallCheck(this, Banner);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = Banner.__proto__ || Object.getPrototypeOf(Banner)).call.apply(_ref, [this].concat(data)));
  }

  _createClass(Banner, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "banner"], ["style", "background-image:url(http://zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_)"]], [migi.createVd("a", [["href", "/works/2015000000000001"]], [migi.createVd("img", [["src", "http://zhuanquan.xin/pic/e34cc1fb3102e63b507293f6e5a20515.jpg-750_"]])])]);
    }
  }]);

  return Banner;
}(migi.Component);

migi.name(Banner, "Banner");exports.default = Banner;

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(84);

var _Find = __webpack_require__(70);

var _Find2 = _interopRequireDefault(_Find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var find = migi.preExist(migi.createCp(_Find2.default, [["hotWorkList", $CONFIG.hotWorkList], ["hotAuthorList", $CONFIG.hotAuthorList], ["tags", $CONFIG.tags], ["playList", $CONFIG.playList]]));

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by army8735 on 2017/10/2.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
var net = {
  ajax: function ajax(url, data, _success, _error, type) {
    var csrfToken = $.cookie('csrfToken');
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
          'x-csrf-token': csrfToken
        },
        // ajax 跨域设置必须加上
        beforeSend: function beforeSend(xhr) {
          xhr.withCredentials = true;
        },
        success: function success(data, state, xhr) {
          _success(data, state, xhr);
        },
        error: function error(data) {
          if (!_error.__hasExec) {
            _error.__hasExec = true;
            _error(data || {});
          }
        }
      });
    }
    return load();
  },
  getJSON: function getJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function () {};
    return net.ajax(url, data, success, error);
  },
  postJSON: function postJSON(url, data, success, error) {
    if (typeof data === 'function') {
      error = success;
      success = data;
      data = {};
    }
    error = error || function () {};
    return net.ajax(url, data, success, error, 'post');
  }
};

exports.default = net;

/***/ }),

/***/ 43:
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

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(11);

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

/***/ 46:
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

/***/ 47:
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

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _AuthorType = __webpack_require__(43);

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

/***/ 49:
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _net = __webpack_require__(4);

var _net2 = _interopRequireDefault(_net);

var _Banner = __webpack_require__(123);

var _Banner2 = _interopRequireDefault(_Banner);

var _HotWork = __webpack_require__(48);

var _HotWork2 = _interopRequireDefault(_HotWork);

var _HotCollection = __webpack_require__(47);

var _HotCollection2 = _interopRequireDefault(_HotCollection);

var _HotAuthor = __webpack_require__(46);

var _HotAuthor2 = _interopRequireDefault(_HotAuthor);

var _DoubleCheck = __webpack_require__(45);

var _DoubleCheck2 = _interopRequireDefault(_DoubleCheck);

var _PlayList = __webpack_require__(49);

var _PlayList2 = _interopRequireDefault(_PlayList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajax = void 0;
var SortType = '1';
var Parameter = '';
var ajaxL2 = void 0;

var Find = function (_migi$Component) {
  _inherits(Find, _migi$Component);

  function Find() {
    var _ref;

    _classCallCheck(this, Find);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Find.__proto__ || Object.getPrototypeOf(Find)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    self.on(migi.Event.DOM, function () {
      var doubleCheck = self.ref.doubleCheck;
      doubleCheck.on('changeL1', function (param) {
        if (ajaxL2) {
          ajaxL2.abort();
        }
        doubleCheck.isLoadindL2 = true;
        _net2.default.postJSON('/api/find/tagB', { tagA: param }, function (res) {
          if (res.success) {
            var _data = res.data;
            doubleCheck.tagList2 = _data;
            doubleCheck.autoWidth2();
            doubleCheck.setCacheL2(param, _data);
            doubleCheck.checkL2();
          }
          doubleCheck.isLoadindL2 = false;
        }, function () {
          doubleCheck.isLoadindL2 = false;
        });
      });
      doubleCheck.on('change', function (lA, lB) {
        var temp = lA.concat(lB);
        temp = temp.length ? JSON.stringify(temp) : '';
        if (temp !== Parameter) {
          Parameter = temp;
          self.loadPlayList();
        }
      });
    });
    return _this;
  }

  _createClass(Find, [{
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
    value: function load() {
      var self = this;
      _net2.default.postJSON('api/find/Hot_works_List', function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.hotWork.dataList = data;
          self.ref.hotWork.autoWidth();
        }
      });
      _net2.default.postJSON('api/find/Hot_Author_List', function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.hotAuthor.dataList = data;
          self.ref.hotAuthor.autoWidth();
        }
      });
      _net2.default.postJSON('api/find/GetTag', { Skip: 0, Take: 10 }, function (res) {
        if (res.success) {
          var data = res.data;
          data.FilterlevelA = [{
            ID: 0,
            TagName: '音乐',
            TagType: 0,
            TagCount: 3957,
            Filterlevel: "A"
          }];
          self.ref.doubleCheck.setData(data);
        }
        self.loadPlayList();
      });
    }
  }, {
    key: 'loadPlayList',
    value: function loadPlayList() {
      var self = this;
      if (ajax) {
        ajax.abort();
      }
      ajax = _net2.default.postJSON('/api/find/playList', { Parameter: Parameter, Skip: 0, Take: 10, SortType: SortType }, function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.playList.setData(data.data);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "find"]], [migi.createCp(_Banner2.default, []), migi.createCp(_HotWork2.default, [["ref", "hotWork"], ["title", "推荐作品"], ["dataList", this.props.hotWorkList]]), migi.createCp(_HotCollection2.default, [["ref", "hotCollection"], ["title", "推荐专辑"]]), migi.createCp(_HotAuthor2.default, [["ref", "hotAuthor"], ["title", "推荐作者"], ["dataList", this.props.hotAuthorList]]), migi.createCp(_DoubleCheck2.default, [["ref", "doubleCheck"], ["tags", this.props.tags]]), migi.createCp(_PlayList2.default, [["ref", "playList"], ["dataList", this.props.playList.data]])]);
    }
  }]);

  return Find;
}(migi.Component);

migi.name(Find, "Find");exports.default = Find;

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });