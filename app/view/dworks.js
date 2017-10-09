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
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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
  img192_192: function(url) {
    return url ? url + '-192_192' : url;
  },
  img144_144: function(url) {
    return url ? url + '-144_144' : url;
  },
  img100_100: function(url) {
    return url ? url + '-100_100' : url;
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
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

/* harmony default export */ __webpack_exports__["default"] = (util);


/***/ }),

/***/ 14:
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
      }), " 页"]), migi.createVd("input", [["type", "number"], ["name", "page"], ["value", new migi.Obj("num", this, function () {
        return this.num;
      })], ["min", "1"], ["max", new migi.Obj("total", this, function () {
        return this.total;
      })]]), migi.createVd("input", [["type", "submit"], ["value", "跳转"]])]);
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Title = __webpack_require__(47);

var _Title2 = _interopRequireDefault(_Title);

var _Media = __webpack_require__(46);

var _Media2 = _interopRequireDefault(_Media);

var _WorkComment = __webpack_require__(49);

var _WorkComment2 = _interopRequireDefault(_WorkComment);

var _WorkType = __webpack_require__(32);

var _WorkType2 = _interopRequireDefault(_WorkType);

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
    self.setWorks(self.props.worksDetail.Works_Items);
    self.on(migi.Event.DOM, function () {
      var media = self.ref.media;
      var workComment = self.ref.workComment;
      media.on('switchSubWork', function (data) {
        self.subWorkID = data[0].ItemID;
        workComment.subWorkID = self.subWorkID;
        workComment.barrageTime = 0;
      });
      media.on('timeupdate', function (data) {
        workComment.barrageTime = data;
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
        var workType = item.ItemType;
        if (workType) {
          workHash[workType] = workHash[workType] || [];
          workHash[workType].push(item);
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
          workType: parseInt(k),
          value: workHash[k]
        });
      });
      authorHash = {};
      var tempHash = {
        901: 1,
        111: 1,
        112: 1,
        121: 2,
        122: 2,
        411: 2,
        421: 2,
        131: 2,
        134: 2,
        141: 2,
        211: 3,
        312: 3,
        311: 3,
        313: 3,
        351: 3,
        331: 3,
        332: 3
      };
      authorList.forEach(function (item) {
        var type = tempHash[item.WorksAuthorType] || 3;
        authorHash[type] = authorHash[type] || [];
        authorHash[type].push(item);
      });
      authorList = [];
      if (authorHash[1]) {
        var seq = [901, 111, 112];
        migi.sort(authorHash[1], function (a, b) {
          return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
        });
        authorList.push(authorHash[1]);
      }
      if (authorHash[2]) {
        var _seq = [121, 122, 411, 421, 131, 134, 141];
        migi.sort(authorHash[2], function (a, b) {
          return _seq.indexOf(a.WorksAuthorType) > _seq.indexOf(b.WorksAuthorType);
        });
        authorList.push(authorHash[2]);
      }
      if (authorHash[3]) {
        var _seq2 = [211, 312, 311, 313, 351, 331, 332];
        migi.sort(authorHash[3], function (a, b) {
          return _seq2.indexOf(a.WorksAuthorType) > _seq2.indexOf(b.WorksAuthorType);
        });
        authorList.push(authorHash[3]);
      }
      self.authorList = authorList;

      workList.forEach(function (item) {
        if (item.workType === _WorkType2.default.AUDIO) {
          self.hasAudio = true;
          self.audioData = item.value;
        } else if (item.workType === _WorkType2.default.VIDEO) {
          self.hasVideo = true;
          self.videoData = item.value;
        } else if (item.workType === _WorkType2.default.TEXT) {
          self.hasText = true;
          self.textData = item.value;
        }
      });
      if (self.hasAudio) {
        first = 'audio';
      } else if (self.hasVideo) {
        first = 'video';
      }
    }
  }, {
    key: 'setID',
    value: function setID(worksID) {
      this.worksID = worksID;
      this.ref.workComment.worksID = worksID;
    }
  }, {
    key: 'clickType',
    value: function clickType(e, vd, tvd) {
      var $li = $(tvd.element);
      if (!$li.hasClass('cur')) {
        $(vd.element).find('.cur').removeClass('cur');
        $li.addClass('cur');
        var type = tvd.props.rel;
        this.ref.media.switchType(type);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "works fn-clear"]], [migi.createCp(_Title2.default, [["ref", "title"], ["worksDetail", this.props.worksDetail], ["authorList", this.authorList]]), migi.createVd("div", [["class", "main"]], [migi.createVd("ul", [["class", "type fn-clear"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [this.hasAudio ? migi.createVd("li", [["class", 'audio' + (first === 'audio' ? ' cur' : '')], ["rel", "audio"]], ["音频"]) : '', this.hasVideo ? migi.createVd("li", [["class", 'video' + (first === 'video' ? ' cur' : '')], ["rel", "video"]], ["视频"]) : '']), migi.createCp(_Media2.default, [["ref", "media"], ["audioData", this.audioData], ["videoData", this.videoData], ["first", first]]), migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["isLogin", this.props.isLogin], ["worksID", this.props.worksID], ["commentData", this.props.commentData]])]), migi.createVd("div", [["class", "side"]], [migi.createVd("ul", [["class", "sel fn-clear"], ["ref", "sel"]], [migi.createVd("li", [["class", "cur"]], ["简介"]), migi.createVd("li", [], ["站外链接"])]), migi.createVd("div", [["class", "info"]], [migi.createVd("h4", [], ["文案"]), migi.createVd("div", [["class", "intro"]], [migi.createVd("pre", [], [(this.textData || []).map(function (item) {
        return item.Text;
      })]), migi.createVd("small", [["class", "time"]], ["2017.12.12"])]), migi.createVd("h4", [], ["创作灵感"])])]), migi.createVd("div", [["class", "form"]], [migi.createVd("form", [["class", "fn-clear"], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("input", [["type", "text"], ["class", "text"], ["ref", "input"], ["placeholder", "夸夸这个作品吧"], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)], ["maxlength", "120"]]), migi.createVd("input", [["type", "submit"], ["class", 'submit' + (this.hasContent && !this.loading ? '' : ' dis')], ["value", "发布评论"]])])])]);
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
    key: 'subWorkID',
    set: function set(v) {
      this.__setBind("subWorkID", v);this.__data("subWorkID");
    },
    get: function get() {
      return this.__getBind("subWorkID");
    }
  }]);

  return Works;
}(migi.Component);

migi.name(Works, "Works");exports.default = Works;

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/10/9.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  AUDIO: 1111,
  VIDEO: 2111,
  TEXT: 4110,
});


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(5);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(1);

var _util2 = _interopRequireDefault(_util);

var _LyricsParser = __webpack_require__(45);

var _LyricsParser2 = _interopRequireDefault(_LyricsParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lyricsIndex = -1;
var lyricsHeight = [];
var $lyricsRoll = void 0;

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
    if (self.props.data) {
      self.setData(self.props.data);
      if (self.props.show) {
        self.on(migi.Event.DOM, function () {
          var uid = window.$CONFIG ? $CONFIG.uid : '';
          var key = uid + 'volume';
          self.volume = localStorage[key];
          self.addMedia();
          $(self.ref.fn.element).removeClass('fn-hidden');
        });
      }
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
      self.title = data[0].ItemName;
      self.tips = data.map(function (item) {
        return item.Tips || '普通版';
      });
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
      self.lineLyrics = data[0].formatLyrics.txt;
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
    key: 'addMedia',
    value: function addMedia() {
      var audio = migi.createVd("audio", [["src", this.fileUrl], ["onTimeupdate", this.onTimeupdate.bind(this)], ["onLoadedmetadata", this.onLoadedmetadata.bind(this)], ["onPlaying", this.onPlaying.bind(this)], ["onPause", this.onPause.bind(this)], ["onProgress", this.onProgress.bind(this)], ["preload", "meta"]], ["\n\
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
      var uid = window.$CONFIG ? $CONFIG.uid : '';
      var key = uid + 'volume';
      this.volume = localStorage[key];
      if (!this.audio) {
        this.addMedia();
      }
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
      var currentTime = e.target.currentTime;
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
      this.audio.element.play();
      this.isPlaying = true;
      return this;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.audio.element.pause();
      this.isPlaying = false;
      return this;
    }
  }, {
    key: 'currentTime',
    value: function currentTime(t) {
      this.audio.element.currentTime = t;
      return this;
    }
  }, {
    key: 'altLyrics',
    value: function altLyrics() {
      this.showLyricsMode = !this.showLyricsMode;
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
    key: 'clickProgress',
    value: function clickProgress(e) {
      if (this.canControl && e.target.className !== 'p') {
        var $progress = $(this.ref.progress.element);
        var left = $progress.offset().left;
        var x = e.pageX - left;
        var percent = x / $progress.width();
        var currentTime = Math.floor(this.duration * percent);
        this.currentTime(currentTime);
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
        _net2.default.postJSON('/api/works/likeWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
        _net2.default.postJSON('/api/works/favorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
    key: 'clear',
    value: function clear() {
      this.duration = 0;
      this.fileUrl = '';
      this.lineLyrics = '';
      this.rollLyrics = [];
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'audio' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("ul", [["class", "type fn-clear"]], [(this.tips || []).map(function (item, index) {
        if (index === 0) {
          return migi.createVd("li", [["class", "cur"]], [item]);
        }
        return migi.createVd("li", [], [item]);
      })]), migi.createVd("h3", [], [new migi.Obj("title", this, function () {
        return this.title;
      })]), migi.createVd("div", [["class", 'lyrics']], [migi.createVd("div", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'roll' + (!this.showLyricsMode ? '' : ' fn-hide');
      })]], [migi.createVd("div", [["class", "c"], ["ref", "lyricsRoll"]], [new migi.Obj("rollLyrics", this, function () {
        return (this.rollLyrics || []).map(function (item) {
          return migi.createVd("pre", [], [item.txt || '&nbsp;']);
        });
      })])]), migi.createVd("pre", [["class", new migi.Obj("showLyricsMode", this, function () {
        return 'line' + (this.showLyricsMode ? '' : ' fn-hide');
      })]], [new migi.Obj("lineLyrics", this, function () {
        return this.lineLyrics;
      })])]), migi.createVd("div", [["class", "fn fn-hidden"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("b", [["class", "lyrics"], ["onClick", new migi.Cb(this, this.altLyrics)]]), migi.createVd("div", [["class", "volume"], ["ref", "volume"], ["onClick", new migi.Cb(this, this.clickVolume)]], [migi.createVd("b", [["class", new migi.Obj("muted", this, function () {
        return 'icon' + (this.muted ? ' muted' : '');
      })], ["onClick", new migi.Cb(this, this.clickMute)]]), migi.createVd("b", [["class", "vol"], ["style", new migi.Obj("volume", this, function () {
        return 'width:' + this.volume * 100 + '%';
      })]]), migi.createVd("b", [["class", "p"], ["style", new migi.Obj("volume", this, function () {
        return 'transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)';
      })]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("small", [["class", "time"]], [new migi.Obj("currentTime", this, function () {
        return _util2.default.formatTime(this.currentTime * 1000);
      })]), migi.createVd("small", [["class", "time end"]], [new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj("isLike", this, function () {
        return 'like' + (this.isLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj("isFavor", this, function () {
        return 'favor' + (this.isFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["download", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])])])]);
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
    key: 'currentTime',
    set: function set(v) {
      this.__setBind("currentTime", v);this.__data("currentTime");
    },
    get: function get() {
      return this.__getBind("currentTime");
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
    key: 'title',
    set: function set(v) {
      this.__setBind("title", v);this.__data("title");
    },
    get: function get() {
      return this.__getBind("title");
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

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authorTemplate = __webpack_require__(6);

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
    key: "setAuthor",
    value: function setAuthor(data) {
      var list = [];
      data.forEach(function (item) {
        var temp = [];
        var last = -1;
        var lastTips = '';
        item.forEach(function (item) {
          if (item.WorksAuthorType !== last || item.Tips !== lastTips) {
            var type = _authorTemplate2.default.code2Data[item.WorksAuthorType];
            var label = item.Tips || type.display;
            temp.push(migi.createVd("li", [["class", "label"]], [label]));
          }
          last = item.WorksAuthorType;
          lastTips = item.Tips;
          temp.push(migi.createVd("li", [["class", "item"], ["id", item.ID]], [migi.createVd("a", [["href", "/author/" + item.ID]], [item.AuthName])]));
        });
        list.push(temp);
      });
      this.list = list;
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "authors"]], [new migi.Obj("list", this, function () {
        return this.list.map(function (item) {
          return migi.createVd("ul", [], [item]);
        });
      })]);
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

/***/ 45:
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

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Audio = __webpack_require__(43);

var _Audio2 = _interopRequireDefault(_Audio);

var _Video = __webpack_require__(48);

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WIDTH = 500;
var currentTime = 0;
var duration = 0;

var isStart = void 0;
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
      return;
      var $play = $(this.ref.play.element);
      audio = self.ref.audio;
      video = self.ref.video;
      if (self.props.first === 'audio') {
        last = audio;
      } else if (self.props.first === 'video') {
        last = video;
      }
      audio.on('timeupdate', function (data) {
        currentTime = data;
        var percent = currentTime / duration;
        self.setBarPercent(percent);
        self.emit('timeupdate', Math.floor(currentTime * 1000));
        if (last === audio) {
          self.canControl = true;
        }
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
        if (last === video) {
          self.canControl = true;
        }
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
      var $play = $(vd.element);
      if ($play.hasClass('pause')) {
        last.pause();
      } else {
        last.play();
      }
      $play.toggleClass('pause');
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
    key: 'switchType',
    value: function switchType(type) {
      if (type === 'audio') {
        this.ref.video.pause().hide();
        this.ref.audio.show();
      } else if (type === 'video') {
        this.ref.audio.pause().hide();
        this.ref.video.show();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "media"]], [migi.createCp(_Audio2.default, [["ref", "audio"], ["data", this.props.audioData], ["show", this.props.first === 'audio']]), migi.createCp(_Video2.default, [["ref", "video"], ["data", this.props.videoData], ["show", this.props.first === 'video']])]);
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

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Author = __webpack_require__(44);

var _Author2 = _interopRequireDefault(_Author);

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

    _this.title = _this.props.worksDetail.Title;
    _this.subTitle = _this.props.worksDetail.sub_Title;
    _this.tags = _this.props.worksDetail.ReturnTagData;
    return _this;
  }

  _createClass(Title, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "title"]], [migi.createVd("div", [["class", "t"]], [migi.createVd("span", [], ["原创音乐"]), migi.createVd("h1", [], [new migi.Obj("title", this, function () {
        return this.title;
      })]), migi.createVd("h2", [["class", new migi.Obj("subTitle", this, function () {
        return this.subTitle ? '' : 'fn-hide';
      })]], [new migi.Obj("subTitle", this, function () {
        return this.subTitle;
      })])]), migi.createVd("div", [["class", "c"]], [migi.createVd("ul", [["class", new migi.Obj("tags", this, function () {
        return 'tags fn-clear' + (this.tags && this.tags.length ? '' : ' fn-hide');
      })]], [new migi.Obj("tags", this, function () {
        return (this.tags || []).map(function (item) {
          return migi.createVd("li", [["rel", item.ID]], [item.Tag_Name]);
        });
      })]), migi.createCp(_Author2.default, [["ref", "author"], ["authorList", this.props.authorList]])])]);
    }
  }, {
    key: "title",
    set: function set(v) {
      this.__setBind("title", v);this.__data("title");
    },
    get: function get() {
      return this.__getBind("title");
    }
  }, {
    key: "subTitle",
    set: function set(v) {
      this.__setBind("subTitle", v);this.__data("subTitle");
    },
    get: function get() {
      return this.__getBind("subTitle");
    }
  }, {
    key: "tags",
    set: function set(v) {
      this.__setBind("tags", v);this.__data("tags");
    },
    get: function get() {
      return this.__getBind("tags");
    }
  }]);

  return Title;
}(migi.Component);

migi.name(Title, "Title");exports.default = Title;

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

var _util2 = _interopRequireDefault(_util);

var _net = __webpack_require__(5);

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    if (self.props.data) {
      self.setData(self.props.data);
      if (self.props.show) {
        self.on(migi.Event.DOM, function () {
          var uid = window.$CONFIG ? $CONFIG.uid : '';
          var key = uid + 'volume';
          self.volume = localStorage[key];
          self.addMedia();
          $(self.ref.fn.element).removeClass('fn-hidden');
        });
      }
    }
    return _this;
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
      self.title = data[0].ItemName;
      self.tips = data.map(function (item) {
        return item.Tips || '普通版';
      });
      return this;
    }
  }, {
    key: 'addMedia',
    value: function addMedia() {
      var video = migi.createVd("video", [["ref", "video"], ["poster", this.cover], ["onClick", this.clickPlay.bind(this)], ["onTimeupdate", this.onTimeupdate.bind(this)], ["onLoadedmetadata", this.onLoadedmetadata.bind(this)], ["onPause", this.onPause.bind(this)], ["onPlaying", this.onPlaying.bind(this)], ["preload", "meta"], ["playsinline", "true"], ["webkit-playsinline", "true"], ["src", this.fileUrl]], ["\n\
      your browser does not support the video tag\n\
    "]);
      this.video = video;
      video.after(this.ref.title.element);
      this.volume = this.volume;
    }
  }, {
    key: 'show',
    value: function show() {
      $(this.element).removeClass('fn-hide');
      var uid = window.$CONFIG ? $CONFIG.uid : '';
      var key = uid + 'volume';
      this.volume = localStorage[key];
      if (!this.video) {
        this.addMedia();
      }
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
      var currentTime = e.target.currentTime;
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
      this.video.element.pause();
      this.isPlaying = false;
      return this;
    }
  }, {
    key: 'currentTime',
    value: function currentTime(t) {
      this.video.element.currentTime = t;
      return this;
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
    key: 'clickProgress',
    value: function clickProgress(e) {
      if (this.canControl && e.target.className !== 'p') {
        var $progress = $(this.ref.progress.element);
        var left = $progress.offset().left;
        var x = e.pageX - left;
        var percent = x / $progress.width();
        var currentTime = Math.floor(this.duration * percent);
        this.currentTime(currentTime);
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
        _net2.default.postJSON('/api/works/likeWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
      if (!$CONFIG.isLogin) {
        migi.eventBus.emit('NEED_LOGIN');
        return;
      }
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('/api/works/unFavorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
        _net2.default.postJSON('/api/works/favorWork', { workID: self.data[self.workIndex].ItemID }, function (res) {
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
    key: 'clear',
    value: function clear() {
      this.duration = 0;
      this.fileUrl = '';
      this.lineLyrics = '';
      this.rollLyrics = [];
      return this;
    }
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", 'video' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("ul", [["class", "type fn-clear"]], [(this.tips || []).map(function (item, index) {
        if (index === 0) {
          return migi.createVd("li", [["class", "cur"]], [item]);
        }
        return migi.createVd("li", [], [item]);
      })]), migi.createVd("h3", [["ref", "title"]], [this.title]), migi.createVd("div", [["class", "fn fn-hidden"], ["ref", "fn"]], [migi.createVd("div", [["class", "control"]], [migi.createVd("b", [["class", "full"], ["onClick", new migi.Cb(this, this.clickScreen)]]), migi.createVd("div", [["class", "volume"], ["ref", "volume"], ["onClick", new migi.Cb(this, this.clickVolume)]], [migi.createVd("b", [["class", new migi.Obj("muted", this, function () {
        return 'icon' + (this.muted ? ' muted' : '');
      })], ["onClick", new migi.Cb(this, this.clickMute)]]), migi.createVd("b", [["class", "vol"], ["style", new migi.Obj("volume", this, function () {
        return 'width:' + this.volume * 100 + '%';
      })]]), migi.createVd("b", [["class", "p"], ["style", new migi.Obj("volume", this, function () {
        return 'transform:translateX(' + this.volume * 100 + '%);transform:translateX(' + this.volume * 100 + '%)';
      })]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("b", [["class", new migi.Obj("isPlaying", this, function () {
        return 'play' + (this.isPlaying ? ' pause' : '');
      })], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("small", [["class", "time"]], [_util2.default.formatTime(this.currentTime * 1000)]), migi.createVd("small", [["class", "time end"]], [new migi.Obj("duration", this, function () {
        return _util2.default.formatTime(this.duration * 1000);
      })]), migi.createVd("div", [["class", "progress"], ["ref", "progress"], ["onClick", new migi.Cb(this, this.clickProgress)]], [migi.createVd("b", [["class", "load"]]), migi.createVd("b", [["class", "vol"], ["ref", "vol"]]), migi.createVd("b", [["class", "p"], ["ref", "p"]])])]), migi.createVd("ul", [["class", "btn"]], [migi.createVd("li", [["class", new migi.Obj("isLike", this, function () {
        return 'like' + (this.isLike ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickLike)]]), migi.createVd("li", [["class", new migi.Obj("isFavor", this, function () {
        return 'favor' + (this.isFavor ? ' has' : '');
      })], ["onClick", new migi.Cb(this, this.clickFavor)]]), migi.createVd("li", [["class", "download"]], [migi.createVd("a", [["href", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["download", new migi.Obj("fileUrl", this, function () {
        return this.fileUrl;
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])])])]);
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
    key: 'muted',
    set: function set(v) {
      this.__setBind("muted", v);this.__data("muted");
    },
    get: function get() {
      return this.__getBind("muted");
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

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(5);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(1);

var _util2 = _interopRequireDefault(_util);

var _Comment = __webpack_require__(9);

var _Comment2 = _interopRequireDefault(_Comment);

var _Page = __webpack_require__(14);

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
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      page.on('page', function (i) {
        skip = (i - 1) * take;
        self.loadPage();
      });
      var comment = self.ref.comment;
      comment.on('chooseSubComment', function (rid, cid, name) {
        self.rootId = rid;
        self.replayId = cid;
        self.replayName = name;
      });
      comment.on('closeSubComment', function () {
        self.clickReplay();
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
          currentCount = data.Size;
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
    key: 'clickReplay',
    value: function clickReplay() {
      this.replayId = null;
      this.replayName = null;
      this.rootId = null;
    }
  }, {
    key: 'input',
    value: function input(e, vd) {
      if (window.$CONFIG.isLogin !== 'True') {
        migi.eventBus.emit('NEED_LOGIN');
      } else {
        var v = $(vd.element).val().trim();
        this.hasContent = v.length > 0;
      }
    }
  }, {
    key: 'focus',
    value: function focus(e, vd) {
      if (window.$CONFIG.isLogin !== 'True') {
        migi.eventBus.emit('NEED_LOGIN');
      }
    }
  }, {
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var self = this;
      if (self.hasContent) {
        var $input = $(this.ref.input.element);
        var Content = $input.val();
        var ParentID = self.replayId !== null ? self.replayId : -1;
        var RootID = self.rootId !== null ? self.rootId : -1;
        self.loading = true;
        _util2.default.postJSON('api/works/AddComment', {
          ParentID: ParentID,
          RootID: RootID,
          Content: Content,
          subWorkID: self.subWorkID,
          BarrageTime: self.barrageTime
        }, function (res) {
          if (res.success) {
            $input.val('');
            self.hasContent = false;
            if (RootID === -1) {
              self.ref.comment.prependData(res.data);
              self.ref.comment.message = '';
            } else {
              self.ref.comment.prependChild(res.data);
            }
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
      return migi.createVd("div", [["class", "comments"]], [migi.createVd("div", [["class", "fn"]], [migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部评论"]), this.props.isLogin ? migi.createVd("li", [["rel", "1"]], ["我的"]) : '']), migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.commentData.Size / 10)]]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "api/works/AddWorkCommentLike"], ["subUrl", "api/works/GetTocomment_T_List"], ["delUrl", "api/works/DeleteCommentByID"], ["data", this.props.commentData.data]])]);
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
    key: 'worksID',
    set: function set(v) {
      this.__setBind("worksID", v);this.__data("worksID");
    },
    get: function get() {
      return this.__getBind("worksID");
    }
  }, {
    key: 'subWorkID',
    set: function set(v) {
      this.__setBind("subWorkID", v);this.__data("subWorkID");
    },
    get: function get() {
      return this.__getBind("subWorkID");
    }
  }, {
    key: 'barrageTime',
    set: function set(v) {
      this.__setBind("barrageTime", v);this.__data("barrageTime");
    },
    get: function get() {
      return this.__getBind("barrageTime");
    }
  }]);

  return WorkComment;
}(migi.Component);

migi.name(WorkComment, "WorkComment");exports.default = WorkComment;

/***/ }),

/***/ 5:
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
    error = error || function() {};
    return net.ajax(url, data, success, error, 'post');
  },
};

/* harmony default export */ __webpack_exports__["default"] = (net);


/***/ }),

/***/ 6:
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  migi.Element.resetUid();
  var isLogin = !!data.ctx.session.uid;
  var worksID = data.worksID;
  var worksDetail = data.worksDetail;
  var commentData = data.commentData;

  var works = migi.preRender(migi.createCp(_Works2.default, [["isLogin", isLogin], ["worksID", worksID], ["worksDetail", worksDetail], ["commentData", commentData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  ' + data.helper.getDTopNav() + '\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dworks.css') + '"/>\n</head>\n<body>\n<div id="page">' + works + '</div>\n' + data.helper.getDBotNav() + '\n<script>\n  ' + data.helper.$CONFIG + '\n  $CONFIG.worksID = ' + JSON.stringify(worksID) + ';\n  $CONFIG.worksDetail = ' + JSON.stringify(worksDetail) + ';\n  $CONFIG.commentData = ' + JSON.stringify(commentData) + ';\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dworks.js') + '"></script>\n</body>\n</html>';
};

var _Works = __webpack_require__(27);

var _Works2 = _interopRequireDefault(_Works);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(5);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(1);

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
    var html = '';
    self.props.data.forEach(function (item) {
      html += self.genComment(item);
    });
    self.html = html;
    if (!html) {
      self.message = '暂无评论';
    }

    self.on(migi.Event.DOM, function () {
      var $root = $(self.element);
      $root.on('click', '.zan', function () {
        var $span = $(this);
        var commentID = $span.attr('cid');
        _net2.default.postJSON(self.props.zanUrl, { commentID: commentID }, function (res) {
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
            alert(res.message || _util2.default.ERROR_MESSAGE);
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
        var cid = $btn.attr('cid');
        _net2.default.postJSON(self.props.delUrl, { commentID: cid }, function (res) {
          if (res.success) {
            $btn.closest('li').remove();
          } else if (res.code === 1000) {
            migi.eventBus.emit('NEED_LOGIN');
          } else {
            alert(res.message || _util2.default.ERROR_MESSAGE);
          }
        });
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
        $lastSlide.removeClass('on').closest('li').find('.list2').css('height', 0);
        $lastSlide = null;
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
          ajax = _net2.default.postJSON(self.props.subUrl, { rootID: rid, skip: -1, take: take }, function (res) {
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
      return migi.createVd("li", [["id", 'comment_' + item.Send_ID]], [migi.createVd("div", [["class", "t"]], [migi.createVd("div", [["class", "profile fn-clear"]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name"]], [item.Send_UserName]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), migi.createVd("a", [["class", "share"], ["href", '/?cid=' + item.Send_ID], ["target", "_blank"]], ["分享"]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [], [item.Send_Content, migi.createVd("span", [["class", "placeholder"]])]), migi.createVd("div", [["class", "slide"], ["cid", item.Send_ID], ["rid", item.Send_ID], ["name", item.Send_UserName]], [migi.createVd("small", [], [item.sub_Count]), migi.createVd("span", [], ["收起"])])]), migi.createVd("div", [["class", "list2"]], [migi.createVd("ul", [["class", "fn-hide"]]), migi.createVd("p", [["class", "message"], ["cid", item.Send_ID], ["rid", item.Send_ID]], ["读取中..."])])]);
    }
  }, {
    key: 'genChildComment',
    value: function genChildComment(item) {
      return migi.createVd("li", [], [migi.createVd("div", [["class", "t fn-clear"]], [migi.createVd("div", [["class", "profile fn-clear"], ["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [migi.createVd("img", [["class", "pic"], ["src", item.Send_UserHeadUrl || '//zhuanquan.xin/img/blank.png']]), migi.createVd("div", [["class", "txt"]], [migi.createVd("div", [], [migi.createVd("span", [["class", "name2 fn-hide"]], [item.Send_ToUserName]), migi.createVd("b", [["class", "arrow fn-hide"]]), migi.createVd("small", [["class", "time"]], [formatTime(item.Send_Time)]), migi.createVd("span", [["class", "name"]], [item.Send_UserName])]), migi.createVd("p", [], [item.sign])])]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("span", [["cid", item.Send_ID], ["class", 'zan' + (item.IsLike ? ' has' : '')]], [migi.createVd("small", [], [item.LikeCount])]), item.ISOwn ? migi.createVd("span", [["cid", item.Send_ID], ["class", "remove"]], ["删除"]) : ''])]), migi.createVd("div", [["class", "c"]], [migi.createVd("pre", [["cid", item.Send_ID], ["rid", item.RootID], ["name", item.Send_UserName]], [item.Send_Content])])]);
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

/***/ })

/******/ })));