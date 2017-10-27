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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _AuthorType = __webpack_require__(25);

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
    return _this;
  }

  _createClass(HotWork, [{
    key: 'clickPrev',
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickNext',
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: 'clickChange',
    value: function clickChange(e) {
      e.preventDefault();
      this.emit('change');
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotwork"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["未来会根据你的口味进行精准智能的推送！>3&lt;"])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("a", [["href", "#"], ["class", "change"], ["onClick", new migi.Cb(this, this.clickChange)]], ["换一批"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          var url = item.WorkType === 5 ? '/musicalbum/' + item.WorksID : '/works/' + item.WorksID;
          return migi.createVd("li", [], [migi.createVd("a", [["href", url], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "ath"]], [''])]), migi.createVd("a", [["href", url], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
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

/***/ 25:
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

/***/ 26:
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

var HotCollection = function (_migi$Component) {
  _inherits(HotCollection, _migi$Component);

  function HotCollection() {
    var _ref;

    _classCallCheck(this, HotCollection);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = HotCollection.__proto__ || Object.getPrototypeOf(HotCollection)).call.apply(_ref, [this].concat(data)));

    var self = _this;
    if (self.props.dataList) {
      self.dataList = self.props.dataList;
    }
    return _this;
  }

  _createClass(HotCollection, [{
    key: "clickPrev",
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: "clickNext",
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotcollection"]], [migi.createVd("h4", [], [this.props.title]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("b", [["class", "bg"]]), migi.createVd("a", [["href", "/collection/" + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("a", [["href", "/collection/" + item.WorksID], ["class", "txt"]], [item.Title])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
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

/***/ 27:
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

    _this.dataList = _this.props.dataList;
    return _this;
  }

  _createClass(HotAuthor, [{
    key: "clickPrev",
    value: function clickPrev(e) {
      e.preventDefault();
    }
  }, {
    key: "clickNext",
    value: function clickNext(e) {
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-hotauthor"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["我们会邀请更多作者入驻！也诚邀你在转圈发布作品、交流创作>3&lt;"])]), new migi.Obj("dataList", this, function () {
        return this.dataList && this.dataList.length ? migi.createVd("ul", [["class", "list fn-clear"]], [this.dataList.map(function (item) {
          var types = item.WorksType || [];
          return migi.createVd("li", [["authorID", item.AuthorID]], [migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img144_144(item.Head_url)) || '//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png']]), types.slice(0, 2).map(function (item) {
            return migi.createVd("b", [["class", "cp-author_type" + item]]);
          })]), migi.createVd("a", [["href", "/author/" + item.AuthorID], ["class", "txt"]], [item.AuthorName]), migi.createVd("div", [["class", "info"]], ["合作", item.CooperationTimes, "次"])]);
        })]) : migi.createVd("div", [["class", "empty"]]);
      })]);
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

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(3);

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
      // this.autoWidth();
      // this.autoWidth2();
    });
    return _this;
  }

  _createClass(DoubleCheck, [{
    key: "setData",
    value: function setData(v) {
      this.tagList = v.FilterlevelA;
      // this.autoWidth();
      this.tagList2 = v.FilterlevelB;
      // this.autoWidth2();
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
      } else {
        var param = [];
        $lis.each(function (index, li) {
          var $li = $(li);
          param.push({
            Filterlevel: $li.attr('tagName')
          });
        });
        param = JSON.stringify(param);
        if (cacheL2[param]) {
          this.checkL2();
          this.tagList2 = cacheL2[param];
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
          ParameterName: item.TagName
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
            ParameterName: item.TagName
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
      return migi.createVd("div", [["class", "cp-doublecheck"]], [migi.createVd("div", [["class", "l1"], ["ref", "l1"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickL1)]]]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [["class", "fn-clear"]], [new migi.Obj("tagList", this, function () {
        return this.tagList.map(function (item, i) {
          var type = _authorTemplate2.default.code2Data[item.TagName];
          return migi.createVd("li", [["class", this.tagList.length === 1 ? 'on' : ''], ["rel", i], ["tagType", item.TagType], ["tagID", item.ID], ["tagName", item.TagName]], [migi.createVd("span", [], [type ? type.name : item.TagName])]);
        }.bind(this));
      })])])]), migi.createVd("div", [["class", new migi.Obj("isLoadindL2", this, function () {
        return 'l2' + (this.isLoadindL2 ? ' loading' : '');
      })], ["ref", "l2"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickL2)]]]], [migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [["class", "fn-clear"]], [new migi.Obj("tagList2", this, function () {
        return this.tagList2.map(function (item, i) {
          var key = 'id' + item.ID + ',type' + item.TagType;
          return migi.createVd("li", [["rel", i], ["tagType", item.TagType], ["tagID", item.ID], ["class", choosedL2[key] ? 'on' : '']], [migi.createVd("span", [], [item.TagName])]);
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

/***/ 29:
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
    _this.dataList2 = _this.props.dataList2 || [];
    return _this;
  }

  _createClass(PlayList, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-playlist fn-clear"]], [migi.createVd("div", [["class", "hot"]], [migi.createVd("h4", [], ["最热", migi.createVd("small", [], ["未来还将解锁更多人气数据-3-"])]), migi.createVd("ul", [["class", "list"], ["ref", "list"]], [new migi.Obj("dataList", this, function () {
        return this.dataList.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [["class", "txt"], ["worksId", item.WorksID || item.WorkID]], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "name"]], [item.Title]), migi.createVd("p", [["class", "intro"]], [item.sub_Title])])]);
        });
      })])]), migi.createVd("div", [["class", "new"]], [migi.createVd("h4", [], ["最新", migi.createVd("small", [], ["未来会显示更多歌曲信息-3-"])]), migi.createVd("ul", [["class", "list2"], ["ref", "list2"]], [new migi.Obj("dataList2", this, function () {
        return this.dataList2.map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "pic"]], [migi.createVd("img", [["src", _util2.default.autoSsl(_util2.default.img100_100(item.cover_Pic)) || '//zhuanquan.xin/img/blank.png']])]), migi.createVd("div", [["class", "txt"], ["worksId", item.WorksID || item.WorkID]], [migi.createVd("a", [["href", "/works/" + item.WorksID], ["class", "name"]], [item.Title]), migi.createVd("p", [["class", "intro"]], [item.sub_Title])])]);
        });
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
  }, {
    key: "dataList2",
    set: function set(v) {
      this.__setBind("dataList2", v);this.__data("dataList2");
    },
    get: function get() {
      if (this.__initBind("dataList2")) this.__setBind("dataList2", []);return this.__getBind("dataList2");
    }
  }]);

  return PlayList;
}(migi.Component);

migi.name(PlayList, "PlayList");exports.default = PlayList;

/***/ }),

/***/ 3:
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

/***/ 5:
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
      if (item.IsAuthor) {
        return migi.createVd("li", [["class", "author"], ["id", 'comment_' + item.AuthorID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_AuthorHeadUrl || '//zhuanquan.xin/head/35e21cf59874d33e48c1bee7678d4d95.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_AuthorName]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [["cid", item.Send_ID], ["class", 'like' + (item.IsLike ? ' liked' : '')]], [item.LikeCount]), migi.createVd("small", [["class", "sub"]], [item.sub_Count]), migi.createVd("span", [], ["收起"])]), migi.createVd("b", [["class", "arrow"]])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
      }
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

/***/ 6:
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

/***/ 7:
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

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  var uid = data.ctx.session.uid;
  var authorID = data.authorID;
  var authorDetail = data.authorDetail;
  var homeDetail = data.homeDetail;
  var tags = data.tags;
  var playList = data.playList;
  var playList2 = data.playList2;
  var commentData = data.commentData;

  var author = migi.preRender(migi.createCp(_Author2.default, [["uid", uid], ["authorID", authorID], ["authorDetail", authorDetail], ["homeDetail", homeDetail], ["tags", tags], ["playList", playList], ["playList2", playList2], ["commentData", commentData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDHead() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dauthor.css') + '"/>\n</head>\n<body>\n<div id="page">' + author + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.authorID = ' + JSON.stringify(authorID) + ';\n  $CONFIG.authorDetail = ' + JSON.stringify(authorDetail) + ';\n  $CONFIG.homeDetail = ' + JSON.stringify(homeDetail) + ';\n  $CONFIG.tags = ' + JSON.stringify(tags) + ';\n  $CONFIG.playList = ' + JSON.stringify(playList) + ';\n  $CONFIG.playList2 = ' + JSON.stringify(playList2) + ';\n  $CONFIG.commentData = ' + JSON.stringify(commentData) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dauthor.js') + '"></script>\n' + data.helper.getStat() + '\n</body>\n</html>';
};

var _Author = __webpack_require__(79);

var _Author2 = _interopRequireDefault(_Author);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 79:
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

var _Nav = __webpack_require__(80);

var _Nav2 = _interopRequireDefault(_Nav);

var _Home = __webpack_require__(83);

var _Home2 = _interopRequireDefault(_Home);

var _Work = __webpack_require__(85);

var _Work2 = _interopRequireDefault(_Work);

var _AuthorComment = __webpack_require__(86);

var _AuthorComment2 = _interopRequireDefault(_AuthorComment);

var _SubCmt = __webpack_require__(7);

var _SubCmt2 = _interopRequireDefault(_SubCmt);

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
    self.on(migi.Event.DOM, function () {
      var authorComment = self.ref.authorComment;
      var comment = self.ref.authorComment.ref.comment;
      var subCmt = self.ref.subCmt;
      var page = self.ref.authorComment.ref.page;
      subCmt.on('submit', function (content) {
        subCmt.invalid = true;
        var rootID = authorComment.rootID;
        var parentID = authorComment.parentID;
        _net2.default.postJSON('/api/author/addComment', {
          parentID: parentID,
          rootID: rootID,
          authorID: authorComment.authorID,
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
            var $tag = $(self.ref.type.element).find('.comments');
            if (!$tag.hasClass('cur')) {
              $tag.click();
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
      comment.on('chooseSubComment', function (rid, cid, name) {
        subCmt.to = name;
      });
      comment.on('closeSubComment', function () {
        subCmt.to = '';
      });
      page.on('page', function () {
        subCmt.to = '';
      });
      // self.ref.home.hide();
      // self.ref.works.show();
    });
    return _this;
  }

  _createClass(Author, [{
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      var $li = $(tvd.element);
      if ($li.hasClass('cur')) {
        return;
      }
      $(vd.element).find('.cur').removeClass('cur');
      $li.addClass('cur');
      var self = this;
      var home = self.ref.home;
      var works = self.ref.works;
      var authorComment = self.ref.authorComment;
      home.hide();
      // works.hide();
      authorComment.hide();
      var rel = tvd.props.rel;
      switch (rel) {
        case '0':
          home.show();
          break;
        // case '1':
        //   works.show();
        //   break;
        case '2':
          authorComment.show();
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "author"]], [migi.createCp(_Nav2.default, [["ref", "nav"], ["authorID", this.props.authorID], ["authorDetail", this.props.authorDetail], ["uid", this.props.uid]]), migi.createVd("ul", [["class", "type fn-clear"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [this.props.authorDetail.ISSettled ? migi.createVd("li", [["class", "home cur"], ["rel", "0"]], ["主页"]) : '',,, /*<li class="home cur" rel="0">主页</li>*/
      /*<li class="works" rel="1">作品</li>*/
      migi.createVd("li", [["class", 'comments' + (this.props.authorDetail.ISSettled ? '' : ' cur')], ["rel", "2"]], ["留言"])]), this.props.authorDetail.ISSettled ? migi.createCp(_Home2.default, [["ref", "home"], ["authorID", this.props.authorID], ["homeDetail", this.props.homeDetail], ["playList", this.props.playList.data]]) : '',, /*<Work ref="works" authorID={ this.props.authorID } tags={ this.props.tags } playList={ this.props.playList } playList2={ this.props.playList2 }/>*/
      migi.createCp(_AuthorComment2.default, [["ref", "authorComment"], ["show", !this.props.authorDetail.ISSettled], ["isLogin", !!this.props.uid], ["authorID", this.props.authorID], ["commentData", this.props.commentData]]), migi.createCp(_SubCmt2.default, [["ref", "subCmt"], ["originTo", this.props.authorDetail.AuthorName], ["placeholder", '给' + this.props.authorDetail.AuthorName + '留个言吧']])]);
    }
  }]);

  return Author;
}(migi.Component);

migi.name(Author, "Author");exports.default = Author;

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Profile = __webpack_require__(81);

var _Profile2 = _interopRequireDefault(_Profile);

var _Link = __webpack_require__(82);

var _Link2 = _interopRequireDefault(_Link);

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
      return migi.createVd("div", [["class", "nav fn-clear"]], [migi.createVd("div", [["class", "bg"]]), migi.createCp(_Profile2.default, [["ref", "profile"], ["authorID", this.props.authorID], ["authorDetail", this.props.authorDetail], ["uid", this.props.uid]]), migi.createCp(_Link2.default, [["ref", "link"], ["authorDetail", this.props.authorDetail]])]);
    }
  }]);

  return Nav;
}(migi.Component);

migi.name(Nav, "Nav");exports.default = Nav;

/***/ }),

/***/ 81:
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

var _authorTemplate = __webpack_require__(3);

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
    _this.like = _this.props.authorDetail.IsLike;
    _this.settled = _this.props.authorDetail.ISSettled;
    _this.type = _this.props.authorDetail.Authortype;
    return _this;
  }

  _createClass(Profile, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();
      var self = this;
      self.loading = true;
      if (self.like) {
        _net2.default.postJSON('/api/author/unFollow', { authorID: self.authorID }, function (res) {
          if (res.success) {
            self.like = false;
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
        _net2.default.postJSON('/api/author/follow', { authorID: self.authorID }, function (res) {
          if (res.success) {
            self.like = true;
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
      return migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("div", [["class", "pic"]], [migi.createVd("img", [["src", new migi.Obj("headUrl", this, function () {
        return _util2.default.autoSsl(_util2.default.img144_144(this.headUrl)) || '//zhuanquan.xin/img/c370ff3fa46f4273d0f73147459a43d8.png';
      })]]), new migi.Obj("settled", this, function () {
        return this.settled ? migi.createVd("b", [["class", "settled"], ["title", "已入驻"]]) : '';
      })]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [["class", "n"]], [migi.createVd("h3", [], [new migi.Obj("authorName", this, function () {
        return this.authorName || '&nbsp;';
      })]), new migi.Obj("authorType", this, function () {
        return this.authorType.map(function (item) {
          return migi.createVd("span", [["class", 'cp-author-type-' + item]]);
        });
      })]), migi.createVd("div", [["class", "rel"]], [migi.createVd("label", [], ["粉丝"]), migi.createVd("span", [], [new migi.Obj("fansNumber", this, function () {
        return this.fansNumber || '0';
      })]), migi.createVd("a", [["href", "#"], ["class", new migi.Obj(["like", "loading"], this, function () {
        return (this.like ? 'un-follow' : 'follow') + (this.loading ? ' loading' : '');
      })], ["onClick", new migi.Cb(this, this.click)]], [new migi.Obj("like", this, function () {
        return this.like ? '取关' : '关注';
      })])]), migi.createVd("p", [["class", "intro"]], [new migi.Obj("sign", this, function () {
        return this.sign;
      })])])]);
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
    key: 'like',
    set: function set(v) {
      this.__setBind("like", v);this.__data("like");
    },
    get: function get() {
      return this.__getBind("like");
    }
  }, {
    key: 'loading',
    set: function set(v) {
      this.__setBind("loading", v);this.__data("loading");
    },
    get: function get() {
      if (this.__initBind("loading")) this.__setBind("loading", false);return this.__getBind("loading");
    }
  }, {
    key: 'settled',
    set: function set(v) {
      this.__setBind("settled", v);this.__data("settled");
    },
    get: function get() {
      return this.__getBind("settled");
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

/***/ 82:
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
    return _this;
  }

  _createClass(Link, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "link"]], [migi.createVd("ul", [], [new migi.Obj("_5SingUrl", this, function () {
        return this._5SingUrl ? migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", this._5SingUrl], ["class", "sing5"]], ["5sing"])]) : '';
      }), new migi.Obj("_BilibiliUrl", this, function () {
        return this._BilibiliUrl ? migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", this._BilibiliUrl], ["class", "bilibili"]], ["b站"])]) : '';
      }), new migi.Obj("_BaiduUrl", this, function () {
        return this._BaiduUrl ? migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", this._BaiduUrl], ["class", "baidu"]], ["百度"])]) : '';
      }), new migi.Obj("_WangyiUrl", this, function () {
        return this._WangyiUrl ? migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", this._WangyiUrl], ["class", "wangyi"]], ["网易"])]) : '';
      }), new migi.Obj("_WeiboUrl", this, function () {
        return this._WeiboUrl ? migi.createVd("li", [], [migi.createVd("a", [["target", "_blank"], ["href", this._WeiboUrl], ["class", "weibo"]], ["微博"])]) : '';
      })]), migi.createVd("p", [], ["外站主页"])]);
    }
  }, {
    key: "_5SingUrl",
    set: function set(v) {
      this.__setBind("_5SingUrl", v);this.__data("_5SingUrl");
    },
    get: function get() {
      return this.__getBind("_5SingUrl");
    }
  }, {
    key: "_BilibiliUrl",
    set: function set(v) {
      this.__setBind("_BilibiliUrl", v);this.__data("_BilibiliUrl");
    },
    get: function get() {
      return this.__getBind("_BilibiliUrl");
    }
  }, {
    key: "_BaiduUrl",
    set: function set(v) {
      this.__setBind("_BaiduUrl", v);this.__data("_BaiduUrl");
    },
    get: function get() {
      return this.__getBind("_BaiduUrl");
    }
  }, {
    key: "_WangyiUrl",
    set: function set(v) {
      this.__setBind("_WangyiUrl", v);this.__data("_WangyiUrl");
    },
    get: function get() {
      return this.__getBind("_WangyiUrl");
    }
  }, {
    key: "_WeiboUrl",
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

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HotWork = __webpack_require__(24);

var _HotWork2 = _interopRequireDefault(_HotWork);

var _HotCollection = __webpack_require__(26);

var _HotCollection2 = _interopRequireDefault(_HotCollection);

var _HotAuthor = __webpack_require__(27);

var _HotAuthor2 = _interopRequireDefault(_HotAuthor);

var _Dynamic = __webpack_require__(84);

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
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "home"]], [migi.createCp(_HotWork2.default, [["ref", "hotWork"], ["title", "主打作品"], ["dataList", this.props.homeDetail.Hot_Works_Items]]), migi.createCp(_HotCollection2.default, [["ref", "hotCollection"], ["title", "专辑"]]), migi.createCp(_HotAuthor2.default, [["ref", "hotAuthor"], ["title", "合作关系"], ["dataList", this.props.homeDetail.AuthorToAuthor]]), migi.createCp(_Dynamic2.default, [["title", "全网动态"]])]);
    }
  }]);

  return Home;
}(migi.Component);

migi.name(Home, "Home");exports.default = Home;

/***/ }),

/***/ 84:
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
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-dynamic"]], [migi.createVd("h4", [], [this.props.title, migi.createVd("small", [], ["等这个功能上线，就再也不用担心特关是死的啦！>3&lt;"])]), migi.createVd("ul", [["class", new migi.Obj("list", this, function () {
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

/***/ 85:
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

var _DoubleCheck = __webpack_require__(28);

var _DoubleCheck2 = _interopRequireDefault(_DoubleCheck);

var _PlayList = __webpack_require__(29);

var _PlayList2 = _interopRequireDefault(_PlayList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ajax = void 0;
var sortType = '1';
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
              doubleCheck.checkL2();
              doubleCheck.setCacheL2(param, _data);
              doubleCheck.tagList2 = _data;
              doubleCheck.change();
              // doubleCheck.autoWidth2();
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
    }
  }, {
    key: 'hide',
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: 'loadPlayList',
    value: function loadPlayList() {
      var self = this;
      if (ajax) {
        ajax.abort();
      }
      ajax = _net2.default.postJSON('/api/author/searchWorks', { authorID: self.authorID, parameter: parameter, skip: 0, take: 10, sortType: sortType }, function (res) {
        if (res.success) {
          var data = res.data;
          self.ref.playList.dataList = data.data;
        }
      });
      // net.postJSON('api/author/SearchWorks', { AuthorID: self.authorID, parameter, skip: 1, take: 10, sortType: '0' }, function(res) {
      //   if(res.success) {
      //     let data = res.data;
      //     self.ref.playList.setData2(data.data);
      //   }
      // });
    }
  }, {
    key: 'switchType',
    value: function switchType(e, vd) {
      var $ul = $(vd.element);
      $ul.toggleClass('alt');
      $ul.find('li').toggleClass('cur');
      sortType = $ul.find('.cur').attr('rel');
      this.loadPlayList();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "works fn-hide"]], [migi.createCp(_DoubleCheck2.default, [["ref", "doubleCheck"], ["tags", this.props.tags]]), migi.createCp(_PlayList2.default, [["ref", "playList"], ["dataList", this.props.playList.data], ["dataList2", this.props.playList2.data]])]);
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

/***/ 86:
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
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      page.on('page', function (i) {
        skip = (i - 1) * take;
        self.loadPage();
      });
      var comment = self.ref.comment;
      comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootID = rid;
        self.parentID = cid;
      });
      comment.on('closeSubComment', function () {
        self.rootID = -1;
        self.parentID = -1;
      });
    });
    return _this;
  }

  _createClass(AuthorComment, [{
    key: 'show',
    value: function show() {
      var self = this;
      $(self.element).removeClass('fn-hide');
    }
  }, {
    key: 'hide',
    value: function hide() {
      var self = this;
      $(self.element).addClass('fn-hide');
    }
  }, {
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
      ajax = _net2.default.postJSON('/api/author/commentList', { authorID: self.authorID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
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
      ajax = _net2.default.postJSON('/api/author/commentList', { authorID: self.authorID, skip: skip, take: take, sortType: sortType, myComment: myComment, currentCount: currentCount }, function (res) {
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
      this.ref.comment.clearData();
      this.load();
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'comments' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部评论", migi.createVd("small", [], [this.props.commentData.Size])]), this.props.isLogin ? migi.createVd("li", [["rel", "1"]], ["我的"]) : '']), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.commentData.Size / take)]]), migi.createVd("div", [["class", "warn"]], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", "//zhuanquan.xin/img/f59284bd66f39bcfc70ef62eee10e186.png"]]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], ["圈儿"]), migi.createVd("small", [["class", "time"]], [_util2.default.formatDate(1508739460298)])])])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], ["自从积分活动开启，我们感受到了大家满满的热情，感谢支持！m(_ _)m\n\
\n\
转圈系统运用了人工智能算法，所以会根据大家留言内容不同对积分数量进行相应地微调。所以请尽量不要发表重复或没有意义的留言哦( •̥́ ˍ •̀ )\n\
也建议大家不要把一段内容在短时间内拆开分多条发布，悄悄告诉大家，这样获得的积分反而比合在一起的要少哦~\n\
\n\
希望大家转圈开心，都能得想要的福利∗ > ɞ &lt;∗很快会有越来越多的新功能解锁哦！"]), migi.createVd("b", [["class", "arrow"]])])]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "/api/author/likeComment"], ["subUrl", "/api/author/subCommentList"], ["delUrl", "/api/author/delComment"], ["data", this.props.commentData.data]])]);
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
  }]);

  return AuthorComment;
}(migi.Component);

migi.name(AuthorComment, "AuthorComment");exports.default = AuthorComment;

/***/ })

/******/ })));