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
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
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

/***/ 2:
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
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

/* harmony default export */ __webpack_exports__["default"] = (util);


/***/ }),

/***/ 22:
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

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Title = __webpack_require__(46);

var _Title2 = _interopRequireDefault(_Title);

var _Author = __webpack_require__(42);

var _Author2 = _interopRequireDefault(_Author);

var _Media = __webpack_require__(45);

var _Media2 = _interopRequireDefault(_Media);

var _itemTemplate = __webpack_require__(30);

var _itemTemplate2 = _interopRequireDefault(_itemTemplate);

var _Intro = __webpack_require__(43);

var _Intro2 = _interopRequireDefault(_Intro);

var _WorkComment = __webpack_require__(48);

var _WorkComment2 = _interopRequireDefault(_WorkComment);

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
        // 先按每个小作品类型排序其作者
        migi.sort(item.Works_Item_Author, (0, _itemTemplate2.default)(item.ItemType).authorSort || function () {});
        // 将每个小作品根据小类型映射到大类型上，再归类
        var bigType = (0, _itemTemplate2.default)(item.ItemType).bigType;
        workHash[bigType] = workHash[bigType] || [];
        workHash[bigType].push(item);
        item.Works_Item_Author.forEach(function (item) {
          authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
          if (!authorHash[item.WorksAuthorType][item.ID]) {
            authorHash[item.WorksAuthorType][item.ID] = true;
            authorList.push(item);
          }
        });
      });
      Object.keys(workHash).forEach(function (k) {
        workList.push({
          bigType: k,
          value: workHash[k]
        });
      });
      migi.sort(workList, function (a, b) {
        return a.bigType > b.bigType;
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
        if (item.bigType === 'audio') {
          self.hasAudio = true;
          self.audioData = item.value;
        } else if (item.bigType === 'video') {
          self.hasVideo = true;
          self.videoData = item.value;
        }
      });
      if (self.hasAudio) {
        first = 'audio';
      } else if (self.hasVideo) {
        first = 'video';
      }
      self.workList = workList;
    }
  }, {
    key: 'setID',
    value: function setID(worksID) {
      this.worksID = worksID;
      this.ref.workComment.worksID = worksID;
    }
  }, {
    key: 'load',
    value: function load() {
      var self = this;
      var title = self.ref.title;
      var media = self.ref.media;
      var workComment = self.ref.workComment;
      workComment.load();
      util.postJSON('api/works/GetWorkDetails', { WorksID: self.worksID }, function (res) {
        if (res.success) {
          var data = res.data;
          title.title = data.Title;
          title.subTitle = data.sub_Title;
          media.setCover(data.cover_Pic);

          var works = data.Works_Items;
          var workHash = {};
          var workList = [];
          var authorList = [];
          var authorHash = {};
          works.forEach(function (item) {
            // 先按每个小作品类型排序其作者
            util.sort(item.Works_Item_Author, (0, _itemTemplate2.default)(item.ItemType).authorSort || function () {});
            // 将每个小作品根据小类型映射到大类型上，再归类
            var bigType = (0, _itemTemplate2.default)(item.ItemType).bigType;
            workHash[bigType] = workHash[bigType] || [];
            workHash[bigType].push(item);
            item.Works_Item_Author.forEach(function (item) {
              authorHash[item.WorksAuthorType] = authorHash[item.WorksAuthorType] || {};
              if (!authorHash[item.WorksAuthorType][item.ID]) {
                authorHash[item.WorksAuthorType][item.ID] = true;
                authorList.push(item);
              }
            });
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
            util.sort(authorHash[1], function (a, b) {
              return seq.indexOf(a.WorksAuthorType) > seq.indexOf(b.WorksAuthorType);
            });
            authorList.push(authorHash[1]);
          }
          if (authorHash[2]) {
            var _seq3 = [121, 122, 411, 421, 131, 134, 141];
            util.sort(authorHash[2], function (a, b) {
              return _seq3.indexOf(a.WorksAuthorType) > _seq3.indexOf(b.WorksAuthorType);
            });
            authorList.push(authorHash[2]);
          }
          if (authorHash[3]) {
            var _seq4 = [211, 312, 311, 313, 351, 331, 332];
            util.sort(authorHash[3], function (a, b) {
              return _seq4.indexOf(a.WorksAuthorType) > _seq4.indexOf(b.WorksAuthorType);
            });
            authorList.push(authorHash[3]);
          }
          self.ref.author.setAuthor(authorList);

          media.setWorks(workList);

          var hasAudio = false;
          var hasVideo = false;
          workList.forEach(function (item) {
            if (item.bigType === 'audio') {
              hasAudio = true;
              $(self.ref.type.element).find('.audio').removeClass('fn-hide');
            } else if (item.bigType === 'video') {
              hasVideo = true;
              $(self.ref.type.element).find('.video').removeClass('fn-hide');
            }
          });
          if (hasAudio) {
            $(self.ref.type.element).find('.audio').addClass('cur');
          } else if (hasVideo) {
            $(self.ref.type.element).find('.video').addClass('cur');
          }
          // media.popular = data.Popular;
          // intro.tags = data.ReturnTagData || [];
          // $(self.ref.form.element).removeClass('fn-hide');
        } else {
          alert(res.message);
        }
      });
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
      return migi.createVd("div", [["class", "works fn-clear"]], [migi.createCp(_Title2.default, [["ref", "title"], ["worksDetail", this.props.worksDetail]]), migi.createVd("div", [["class", "temp fn-clear"]], [migi.createVd("ul", [["class", "type"], ["ref", "type"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.clickType)]]]], [migi.createVd("li", [["class", 'audio' + (this.hasAudio ? '' : ' fn-hide') + (first === 'audio' ? ' cur' : '')], ["rel", "audio"]], ["音频"]), migi.createVd("li", [["class", 'video' + (this.hasVideo ? '' : ' fn-hide') + (first === 'video' ? ' cur' : '')], ["rel", "video"]], ["视频"])]), migi.createCp(_Author2.default, [["ref", "author"], ["authorList", this.authorList]]), migi.createCp(_Media2.default, [["ref", "media"], ["worksDetail", this.props.worksDetail], ["audioData", this.audioData], ["videoData", this.videoData], ["first", first]])]), migi.createCp(_WorkComment2.default, [["ref", "workComment"], ["worksID", this.props.worksID], ["commentData", this.props.commentData]])]);
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

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/**
 * Created by army8735 on 2017/8/13.
 */

/* harmony default export */ __webpack_exports__["default"] = (function(workType) {
  switch (workType) {
    case 1111:
      let weight = [111, 151, 112, 113, 114, 411, 121, 122, 123, 131, 132, 133, 134, 135, 141];
      return {
        bigType: 'audio',
        authorSort: function(a, b) {
          return weight.indexOf(a.WorksAuthorType) > weight.indexOf(b.WorksAuthorType);
        }
      };
    case 2111:
      return {
        bigType: 'video',
      };
    default:
      return {

      }
  }
});;


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _LyricsParser = __webpack_require__(44);

var _LyricsParser2 = _interopRequireDefault(_LyricsParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lyricsIndex = -1;
var lyricsHeight = [];
var $lyricsRoll = void 0;

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
      this.showLyrics = true;
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
        _util2.default.postJSON('api/works/AddLikeBehavior', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _util2.default.postJSON('api/works/RemoveCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
        _util2.default.postJSON('api/works/AddCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
      if (window.$CONFIG.isLogin !== 'True') {
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
      migi.eventBus.emit('SHARE', location.href);
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
      return migi.createVd("div", [["class", 'audio' + (this.props.show ? '' : ' fn-hide')]], [migi.createVd("audio", [["ref", "audio"], ["onTimeupdate", new migi.Cb(this, this.timeupdate)], ["onLoadedmetadata", new migi.Cb(this, this.loadedmetadata)], ["onPlaying", new migi.Cb(this, this.playing)], ["preload", "meta"], ["src", new migi.Obj("fileUrl", this, function () {
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
      })], ["onClick", new migi.Cb(this, this.clickDownload)]])]), migi.createVd("li", [["class", "share"], ["onClick", new migi.Cb(this, this.clickShare)]])]), migi.createVd("div", [["class", new migi.Obj("showLyrics", this, function () {
        return 'lyrics-con' + (this.showLyrics ? '' : ' fn-hide');
      })]], [migi.createVd("div", [["class", new migi.Obj("showLyricsMode", this, function () {
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
  }, {
    key: 'showLyrics',
    set: function set(v) {
      this.__setBind("showLyrics", v);this.__data("showLyrics");
    },
    get: function get() {
      return this.__getBind("showLyrics");
    }
  }]);

  return Audio;
}(migi.Component);

migi.name(Audio, "Audio");exports.default = Audio;

/***/ }),

/***/ 42:
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
      return migi.createVd("div", [["class", "author"]], [migi.createVd("div", [["class", "fn fn-clear fn-hide"]], [migi.createVd("a", [["class", "prev"], ["href", "#"], ["onClick", new migi.Cb(this, this.clickPrev)]], ["查看上页"]), migi.createVd("a", [["class", "next"], ["href", "#"], ["onClick", new migi.Cb(this, this.clickNext)]], ["查看下页"])]), migi.createVd("div", [["class", "c"], ["ref", "c"]], [new migi.Obj("list", this, function () {
        return this.list.map(function (item) {
          return migi.createVd("ul", [], [item]);
        });
      })])]);
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

/***/ 43:
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
  '2757': '<p>\u5F53\u9762\u7EB1\u63ED\u5F00\uFF0C\u5F53\u5149\u8292\u95EA\u73B0\uFF0C\u4ECE\u5F02\u4E16\u5230\u73B0\u4E16\uFF0C\u4ECE\u6211\u5230\u4F60\uFF0C\u8FD9\u662F\u4E00\u573A\u547D\u4E2D\u6CE8\u5B9A\u7684\u76F8\u9047\uFF0C\u6545\u4E8B\u7531\u6B64\u800C\u751F\u3002</p>\n        <p><br/>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/740120222" target="_blank">\u6155\u5BD2</a>&nbsp;\n          <a href="http://weibo.com/arielmelody" target="_blank">\u53F8\u590F</a>&nbsp;\n          <a href="http://weibo.com/u/1750157883" target="_blank">\u6CB3\u56FE</a>&nbsp;\n          <a href="http://weibo.com/ichigolily" target="_blank">Midaho</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/u/2423021884" target="_blank">\u6708\u5343\u5BB8</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/tingyugelouyinyueshe" target="_blank">\u6C88\u884C\u4E4B</a></p>\n        <p>\u7B1B\u8427\uFF1A<a href="http://weibo.com/ellen0411" target="_blank">\u6C34\u73A5\u513F</a>&nbsp;\n        \u53E4\u7B5D\uFF1A<a href="http://weibo.com/u/2616755905" target="_blank">\u58A8\u97F5\u968F\u6B65\u6447</a>&nbsp;\n        \u7435\u7436\uFF1A<a href="http://weibo.com/zycq" target="_blank">\u4E4D\u96E8\u521D\u6674</a>&nbsp;\n        \u7535\u5409\u4ED6\uFF1A<a href="http://weibo.com/litterzy" target="_blank">Litterzy</a></p>\n        <p>\u4FEE\u97F3\uFF1A<a href="http://weibo.com/yaolaoso" target="_blank">\u5E7A\u5520</a>&nbsp;\n        \u6DF7\u97F3\uFF1A<a href="http://weibo.com/princesscuttlefish" target="_blank">CuTTleFish</a>&nbsp;\n        <a href="http://weibo.com/u/3222735190" target="_blank">\u5C11\u5E74E</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/moirajia" target="_blank">\u51B0\u9547\u751C\u8C46\u6D46</a></p>\n        <p>\u7ACB\u7ED8\uFF1A<a href="http://weibo.com/yukiart" target="_blank">\u6728\u7F8E\u4EBA</a>&nbsp;\n        \u573A\u666F\uFF1A<a href="http://weibo.com/u/5190275328" target="_blank">_LEOX</a>&nbsp;\n        CG\uFF1A<a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a></p>\n        <p>\u6D77\u62A5\uFF1A<a href="http://weibo.com/seoyutsuki" target="_blank">\u9752\u51CC</a>&nbsp;\n        \u7F8E\u672F\u8BBE\u8BA1\uFF1A<a href="http://weibo.com/520snc" target="_blank">\u5FF5\u6148</a></p>\n        <pre>\n\n\u6155\u5BD2\uFF1A\u4E16\u95F4\u6D6E\u751F\u82E6\u5C81\u66AE \u65E5\u6708\u5316\u6211\u68A6\u6D6E\u751F\n\u95FB\u957F\u6B4C \u98D2\u6C93\u7A7F\u6797\u8FC7 \u5FFD\u73B0\u8703\u697C\u6CA7\u6D77\n\u53F8\u590F\uFF1A\u6211\u6B4C\u6C34\u5929\u63A5\u4E00\u8272 \u4E07\u8C61\u67AF\u8363\u5F39\u6307\u95F4\n\u5929\u5730\u4E3A\u5BB4 \u6CB3\u9152\u6D77\u7A96 \u6070\u662F\u6B64\u65F6\u5F00\n\n\u6CB3\u56FE\uFF1A\u676F\u9152\u8D50\u4EBA\u95F4 \u7B11\u4F17\u751F \u4E0D\u66FE\u8BC6\u84EC\u83B1\n\u4F59\u4E0B\u5165\u6211\u8896 \u62AB\u7D20\u6656 \u9080\u53CB\u5929\u9645\u6765\nmidaho\uFF1A\u9B13\u8FB9\u6CBE\u4E91\u8272 \u7545\u5FEB\u996E\u7F62 \u6708\u534E\u6EE1\u676F\u76CF\n\u6B64\u65E5\u5374\u70E6\u5FE7 \u9169\u914A\u4E00\u9189 \u5929\u5730\u4E5F\u5FEB\u54C9\n\n\u5408\uFF1A\u5FEB\u54C9\u610F \u5FEB\u54C9\u610F \u6D41\u5149\u7167\u5F7B\u4E7E\u5764\u6765\n\u6D69\u7136\u6C14 \u6D69\u7136\u6C14 \u4E58\u98CE\u7834\u6D6A\u5929\u5730\u5F00\n\u6B64\u65F6\u751F \u5F7C\u65F6\u706D \u5DDD\u6D88\u5C71\u957F\u6709\u65F6\u8870\n\u70B9\u5FC3\u706B \u71C3\u5C3D\u4EBA\u95F4\u8272 \u4E0D\u591C\u661F\u5929\u5916\n\nmidaho\uFF1A\u662F\u4F55\u4EBA\u8C13\u6211 \u5982\u8709\u8763 \u672A\u6562\u8D8A\u4E1C\u5CB1\n\u53F8\u590F\uFF1A\u7B11\u6211\u6CA7\u6D77\u4E2D \u4F3C\u4E00\u7C9F \u65E0\u529B\u6392\u4E91\u5F00\n\u6CB3\u56FE\uFF1A\u600E\u77E5\u4ED6\u4E0D\u8FC7 \u5C0F\u5352\u5C14\u5C14 \u6070\u5165\u6211\u68A6\u6765\n\u6155\u5BD2\uFF1A\u6F0F\u591C\u4E00\u7167\u9762 \u5BE5\u5BE5\u6170\u6211 \u5B64\u8EAB\u5728\u9AD8\u53F0\n\n\u6155\u5BD2\u6CB3\u56FE\uFF1A\u4E14\u884C\u4E50 \u4E14\u884C\u4E50 \u4E07\u5343\u98CE\u7269\u5165\u6211\u6000\n\u53F8\u590FMidaho:\u82B1\u582A\u6298 \u82B1\u582A\u6298 \u7C2A\u82B1\u5BF9\u955C\u77E5\u5DF1\u62DC\n\u5408\uFF1A\u5317\u95FB\u7B11 \u5357\u4F20\u54ED \u6211\u81EA\u900D\u9065\u8EAB\u81EA\u5728\n\u541B\u53EF\u77E5 \u98CE\u6708\u4E89\u76F8\u6765 \u4EBA\u95F4\u6211\u68A6\u88C1\n\n\u6CB3\u56FE\uFF1A\u5FEB\u54C9\u610F \u5FEB\u54C9\u610F \u6D41\u5149\u7167\u5F7B\u4E7E\u5764\u6765\n\u6155\u5BD2\uFF1A\u6D69\u7136\u6C14 \u6D69\u7136\u6C14 \u4E58\u98CE\u7834\u6D6A\u5929\u5730\u5F00\n\u5408\uFF1A\u6B64\u65F6\u751F \u5F7C\u65F6\u706D \u5DDD\u6D88\u5C71\u957F\u6709\u65F6\u8870\n\u70B9\u5FC3\u706B \u71C3\u5C3D\u4EBA\u95F4\u8272 \u4E0D\u591C\u661F\u5929\u5916\n\n\u4E14\u884C\u4E50 \u4E14\u884C\u4E50 \u4E07\u5343\u98CE\u7269\u5165\u6211\u6000\n\u82B1\u582A\u6298 \u82B1\u582A\u6298 \u7C2A\u82B1\u5BF9\u955C\u77E5\u5DF1\u62DC\n\u5317\u95FB\u7B11 \u5357\u4F20\u54ED \u6211\u81EA\u900D\u9065\u8EAB\u81EA\u5728\n\u541B\u53EF\u77E5 \u98CE\u6708\u4E89\u76F8\u6765 \u4EBA\u95F4\u6211\u68A6\u88C1\n\n\u53F8\u590F\uFF1A\u5374\u4E0D\u77E5 \u4EBA\u95F4\u68A6\u6211 \u6211\u68A6\u4EBA\u95F4\u88C1</pre>',
  '2758': '<p>\u539F\u6765\u6700\u6C38\u6052\u7684\u70ED\u5FF1\uFF0C\u6700\u5E94\u8BE5\u7559\u5728\u521D\u89C1\u65F6\u5206\uFF1B<br/>\u539F\u6765\u770B\u4F3C\u6700\u67D4\u8F6F\u7684\u65F6\u5149\uFF0C\u6700\u64C5\u957F\u5C06\u6E29\u5B58\u9605\u540E\u5373\u711A\uFF1B<br/>\u539F\u6765\u6700\u75AF\u72C2\u60C5\u6D53\u7684\u68A6\uFF0C\u6700\u77ED\u6682\u5982\u6D6E\u6CAB\u76F8\u9022\u3002</p>\n        <p><br/>\u51FA\u54C1\uFF1A<a href="http://weibo.com/u/6276065571" target="_blank">\u7ED3\u68A6\u539F\u521B\u97F3\u4E50\u56E2\u961F</a></p>\n        <p>\u6F14\u5531\uFF1A<a href="http://weibo.com/arielmelody" target="_blank">\u53F8\u590F</a></p>\n        <p>\u4F5C\u66F2\uFF1A<a href="http://weibo.com/menghunxiaoxiang" target="_blank">\u6F47\u68A6\u4E34</a>&nbsp;\n        \u7F16\u66F2\uFF1A<a href="http://weibo.com/chenpengjie" target="_blank">\u9648\u9E4F\u6770</a>&nbsp;\n        \u4F5C\u8BCD\uFF1A<a href="http://weibo.com/mercuryco" target="_blank">Vagary </a></p>\n        <p>\u8427\uFF1A<a href="http://weibo.com/ellen0411" target="_blank">\u6C34\u73A5\u513F</a>&nbsp;\n        \u53E4\u7B5D\uFF1A<a href="http://weibo.com/u/2420864952" target="_blank">\u7389\u9762\u5C0F\u5AE3\u7136</a>&nbsp;\n        \u5409\u4ED6\uFF1A<a href="http://weibo.com/chenpengjie" target="_blank">\u9648\u9E4F\u6770</a></p>\n        <p>\u4FEE\u97F3\uFF1A<a href="http://weibo.com/yaolaoso" target="_blank">\u5E7A\u5520</a>&nbsp;\n        \u6DF7\u97F3\uFF1A<a href="http://weibo.com/princesscuttlefish" target="_blank">CuTTleFish</a></p>\n        <p>PV\uFF1A<a href="http://weibo.com/moirajia" target="_blank">\u51B0\u9547\u751C\u8C46\u6D46</a></p>\n        <p>\u66F2\u7ED8\uFF1A<a href="http://weibo.com/pudding131" target="_blank">\u9ED1\u8272\u5E03\u4E01_\u9171</a>&nbsp;\n        <a href="http://weibo.com/muweiervv" target="_blank">VV\u4E36SAMA</a></p>\n        <pre>\n\n\u4E0D\u6DE1\u4E0D\u6DF1 \u4E0D\u5F03\u4E0D\u73CD\n\u78A7\u6D77\u768E\u6708 \u770B\u8001\u826F\u8FB0\n\u4E0D\u5BD2\u4E0D\u6696 \u4E0D\u6B3A\u4E0D\u95EE\n\u6211\u4E3A\u8C01\u4FEF\u9996\u79F0\u81E3\n\n\u4E0D\u601D\u4E0D\u5FD8 \u4E0D\u805A\u4E0D\u5206\n\u5343\u5C81\u767D\u6C99 \u4E00\u626B\u7EA2\u5C18\n\u4E0D\u7559\u4E0D\u820D \u4E0D\u601C\u4E0D\u8BA4\n\u7231\u662F\u6700\u6E29\u5B58\u7684\u6068\n\n\u4F60\u8BF4\u68A6\u4F1A\u751F\u6839 \u60C5\u4F1A\u8FD8\u9B42\n\u4F20\u5947\u662F\u4F60\u6211\u8303\u672C\n\u8BA9\u8FD9\u706F\u524D\u7EA2\u8896 \u96EA\u4E0B\u9752\u887F \u5165\u5F97\u620F\u6587\n\n\u53EF\u7B11\u6851\u7530\u8015\u8FC7\u51E0\u8F6E \u6CA7\u6D77\u9189\u8FC7\u51E0\u6A3D\n\u81EA\u8D4F\u5B64\u82B3\u53C8\u51E0\u4E2A\u9EC4\u660F\n\u6709\u4F20\u5947\u5531\u904D\u4E09\u6625 \u4E3B\u89D2\u4E0D\u662F\u6211\u4EEC\n\u7D6E\u7D6E\u7740\u4F60\u548C\u53E6\u4E00\u4E2A\u4EBA\n\n\u96BE\u9053\u75DB\u695A\u624D\u6709\u8BD7\u97F5 \u7EDD\u671B\u624D\u914D\u60C5\u6DF1\n\u6240\u6709\u575A\u5F3A\u90FD\u4E00\u8BED\u6210\u8C36\n\u800C\u6545\u4E8B\u4ECE\u672A\u653E\u8FC7 \u7901\u77F3\u4E0A\u7684\u6CEA\u75D5\n\u8D8A\u662F\u5BBD\u5BB9\u7684\u4EBA \u8D8A\u662F \u65E0\u5904\u5BB9\u8EAB\n\n\u4F60\u8BF4\u9047\u4E0A\u4E86\u6211 \u624D\u61C2\u9752\u6625\n\u4E00\u751F\u53EA\u591F\u7231\u4E00\u4E2A\u4EBA\n\u5018\u82E5\u6628\u65E5\u91CD\u6E29 \u613F\u4F60\u65E0\u8A00 \u514D\u6211\u8BA4\u771F\n\n\u53EF\u7B11\u6851\u7530\u8015\u8FC7\u51E0\u8F6E \u6CA7\u6D77\u9189\u8FC7\u51E0\u6A3D\n\u81EA\u8D4F\u5B64\u82B3\u53C8\u51E0\u4E2A\u9EC4\u660F\n\u6709\u4F20\u5947\u5531\u904D\u4E09\u6625 \u4E3B\u89D2\u4E0D\u662F\u6211\u4EEC\n\u7D6E\u7D6E\u7740\u4F60\u548C\u53E6\u4E00\u4E2A\u4EBA\n\n\u96BE\u9053\u75DB\u695A\u624D\u6709\u8BD7\u97F5 \u7EDD\u671B\u624D\u914D\u60C5\u6DF1\n\u6211\u7684\u6C89\u9ED8\u5C31\u4E0D\u7B97\u4F24\u75D5\n\u800C\u6545\u4E8B\u4ECE\u672A\u63D0\u5230 \u6708\u5149\u4E0B\u7684\u6211\u4EEC\n\u8D8A\u60F3\u9000\u6B65\u62BD\u8EAB \u8D8A\u4F1A \u5F04\u5047\u6210\u771F\n\n\u5355\u7EAF\u8C62\u517B\u6B8B\u5FCD \u9A84\u50B2\u6210\u5168\u81EA\u5C0A\n\u65F6\u5149\u6700\u64C5\u957F\u9605\u540E\u5373\u711A\n\n\u8C01\u8BF4\u955C\u4E2D\u7684\u82B1\u4E0D\u771F \u6C34\u5E95\u7684\u6708\u4E0D\u6E29\n\u7F8E\u5230\u6DF1\u5904\u600E\u4F1A\u6CA1\u6709\u7075\u9B42\n\u53EF\u6545\u4E8B\u7EC8\u5C06\u820D\u5F03 \u6700\u6C38\u6052\u7684\u70ED\u5FF1\n\u53EA\u5269\u6D77\u98CE\u4E00\u77AC \u4E0D\u614E \u88AB\u8C01\u542C\u95FB\n\u6211\u66FE\u8DEF\u8FC7\u4E86 \u4F60\u7684\u9752\u6625\n</pre>'
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
      return migi.createVd("div", [["class", "intro"]], [migi.createVd("h3", [], ["简介"]), migi.createVd("b", [["class", "line"]]), migi.createVd("div", [["class", "tag"]], [migi.createVd("ul", [["class", "fn-clear"]], [new migi.Obj("tags", this, function () {
        return (this.tags || []).map(function (item) {
          return migi.createVd("li", [], [migi.createVd("a", [["href", '#' + item.Tag_ID]], [item.Tag_Name])]);
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

/***/ 44:
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

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Audio = __webpack_require__(41);

var _Audio2 = _interopRequireDefault(_Audio);

var _Video = __webpack_require__(47);

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
    key: 'setWorks',
    value: function setWorks(workList) {
      var self = this;
      var hasAudio = false;
      var hasVideo = false;
      workList.forEach(function (item) {
        if (item.bigType === 'audio') {
          audio.setData(item.value);
          hasAudio = true;
          // $(self.ref.type.element).find('.audio').removeClass('fn-hide');
        } else if (item.bigType === 'video') {
          video.setData(item.value);
          hasVideo = true;
          // $(self.ref.type.element).find('.video').removeClass('fn-hide');
        }
      });
      if (hasAudio) {
        last = audio;
        // $(self.ref.type.element).find('.audio').addClass('cur');
      } else if (hasVideo) {
        last = video;
        // $(self.ref.type.element).find('.video').addClass('cur');
      }
      if (last) {
        last.show();
        this.emit('switchSubWork', last.data);
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
  }, {
    key: 'render',
    value: function render() {
      return migi.createVd("div", [["class", "media"], ["style", 'background-image:url(' + (this.props.worksDetail.cover_Pic || '//zhuanquan.xin/img/blank.png') + ')']], [migi.createVd("div", [["class", "c"], ["ref", "c"]], [migi.createCp(_Audio2.default, [["ref", "audio"], ["data", this.props.audioData], ["show", this.props.first === 'audio']]), migi.createCp(_Video2.default, [["ref", "video"], ["data", this.props.videoData], ["show", this.props.first === 'video']])]), migi.createVd("div", [["class", new migi.Obj("canControl", this, function () {
        return 'progress' + (this.canControl ? '' : ' dis');
      })], ["onClick", new migi.Cb(this, this.clickProgress)], ["ref", "progress"]], [migi.createVd("div", [["class", "has"], ["ref", "has"]]), migi.createVd("div", [["class", "pbg"], ["ref", "pgb"]], [migi.createVd("div", [["class", "point"], ["ref", "point"], ["onMouseDown", new migi.Cb(this, this.down)]])])]), migi.createVd("div", [["class", "bar"]], [migi.createVd("div", [["class", "prev dis"]]), migi.createVd("div", [["class", "play"], ["ref", "play"], ["onClick", new migi.Cb(this, this.clickPlay)]]), migi.createVd("div", [["class", "next dis"]])])]);
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

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
    return _this;
  }

  _createClass(Title, [{
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "title"]], [migi.createVd("h1", [], [new migi.Obj("title", this, function () {
        return this.title;
      })]), migi.createVd("h2", [], [new migi.Obj("subTitle", this, function () {
        return this.subTitle;
      })])]);
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
  }]);

  return Title;
}(migi.Component);

migi.name(Title, "Title");exports.default = Title;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _net = __webpack_require__(22);

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return this;
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
        _net2.default.postJSON('api/works/AddLikeBehavior', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
      var self = this;
      var $vd = $(vd.element);
      if ($vd.hasClass('loading')) {
        //
      } else if ($vd.hasClass('has')) {
        _net2.default.postJSON('api/works/RemoveCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
        _net2.default.postJSON('api/works/AddCollection', { WorkItemsID: self.data[self.workIndex].ItemID }, function (res) {
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
      if (!window.$CONFIG.isLogin) {
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
    key: 'clickScreen',
    value: function clickScreen() {
      var video = this.ref.video.element;
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
        return 'background-image:url(' + (this.cover || '//zhuanquan.xin/img/blank.png') + ')';
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

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = __webpack_require__(22);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _Comment = __webpack_require__(8);

var _Comment2 = _interopRequireDefault(_Comment);

var _Page = __webpack_require__(13);

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Skip = 0;
var Take = 10;
var SortType = 0;
var MyComment = 0;
var CurrentCount = 0;
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
    self.on(migi.Event.DOM, function () {
      var page = self.ref.page;
      page.on('page', function (i) {
        Skip = (i - 1) * Take;
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
      Skip = 0;
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
      ajax = _net2.default.postJSON('api/works/GetToWorkMessage_List', { WorkID: self.worksID, Skip: Skip, Take: Take, SortType: SortType, MyComment: MyComment, CurrentCount: CurrentCount }, function (res) {
        if (res.success) {
          var data = res.data;
          CurrentCount = data.Size;
          Skip += Take;
          if (data.data.length) {
            comment.message = '';
            comment.appendData(res.data.data);
            page.total = Math.ceil(CurrentCount / Take);
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
      ajax = _net2.default.postJSON('api/works/GetToWorkMessage_List', { WorkID: self.worksID, Skip: Skip, Take: Take, SortType: SortType, MyComment: MyComment, CurrentCount: 0 }, function (res) {
        if (res.success) {
          var data = res.data;
          Skip += Take;
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
      CurrentCount = 0;
      SortType = rel;
      Skip = 0;
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
      CurrentCount = 0;
      MyComment = rel;
      Skip = 0;
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
      return migi.createVd("div", [["class", "comments"]], [migi.createVd("h3", [], ["评论", migi.createVd("small", [], ["之后还会增加简介、歌词、翻唱等多种功能，敬请期待-3-"])]), migi.createVd("b", [["class", "line"]]), migi.createVd("div", [["class", "fn fn-clear"]], [migi.createVd("ul", [["class", "type2 fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType2)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["全部"]), migi.createVd("li", [["rel", "1"]], ["我的"])]), migi.createVd("ul", [["class", "type fn-clear"], ["onClick", [[{ "li": { "_v": true } }, new migi.Cb(this, this.switchType)]]]], [migi.createVd("li", [["class", "cur"], ["rel", "0"]], ["最新"]), migi.createVd("li", [["rel", "1"]], ["最热"])])]), migi.createVd("div", [["class", new migi.Obj("replayId", this, function () {
        return 'reply' + (this.replayId ? '' : ' fn-hidden');
      })], ["onClick", new migi.Cb(this, this.clickReplay)]], ["回复：", new migi.Obj("replayName", this, function () {
        return this.replayName;
      })]), migi.createVd("form", [["class", "form"], ["ref", "form"], ["onSubmit", new migi.Cb(this, this.submit)]], [migi.createVd("input", [["type", "text"], ["class", "text"], ["ref", "input"], ["placeholder", "请输入评论内容"], ["onInput", new migi.Cb(this, this.input)], ["onFocus", new migi.Cb(this, this.focus)]]), migi.createVd("input", [["type", "submit"], ["class", new migi.Obj(["hasContent", "loading"], this, function () {
        return 'submit' + (this.hasContent && !this.loading ? '' : ' dis');
      })], ["value", "发布评论"]])]), migi.createCp(_Page2.default, [["ref", "page"], ["total", Math.ceil(this.props.commentData.Size / 10)]]), migi.createCp(_Comment2.default, [["ref", "comment"], ["zanUrl", "api/works/AddWorkCommentLike"], ["subUrl", "api/works/GetTocomment_T_List"], ["delUrl", "api/works/DeleteCommentByID"], ["data", this.props.commentData.data]])]);
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

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (data) {
  migi.Element.resetUid();
  var worksID = data.worksID;
  var worksDetail = data.worksDetail;
  var commentData = data.commentData;

  var works = migi.preRender(migi.createCp(_Works2.default, [["worksID", worksID], ["worksDetail", worksDetail], ["commentData", commentData]]));

  return '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n  <meta charset="UTF-8"/>\n  <title>\u8F6C\u5708</title>\n  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n  <meta name="renderer" content="webkit"/>\n  <meta name="apple-mobile-web-app-capable" content="yes"/>\n  <meta name="apple-mobile-web-app-status-bar-style" content="black"/>\n  <meta name="format-detection" content="telephone=no"/>\n  <meta name="format-detection" content="email=no"/>\n  <meta name="wap-font-scale" content="no"/>\n  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dcommon.css') + '"/>\n  <link rel="stylesheet" href="' + data.helper.getAssetUrl('/dworks.css') + '"/>\n</head>\n<body>\n<div id="page">' + works + '</div>\n<div class="g-botnav">All Rights Reserved \u8F6C\u5708circling \u6D59ICP\u590717029501\u53F7-2</div>\n<script>\n  var $CONFIG = {\n    worksID: ' + JSON.stringify(worksID) + ',\n    worksDetail: ' + JSON.stringify(worksDetail) + ',\n    commentData: ' + JSON.stringify(commentData) + ',\n  };\n</script>\n<script src="' + data.helper.getAssetUrl('/dcommon.js') + '"></script>\n<script src="' + data.helper.getAssetUrl('/dworks.js') + '"></script>\n</body>\n</html>';
};

var _Works = __webpack_require__(25);

var _Works2 = _interopRequireDefault(_Works);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/***/ }),

/***/ 8:
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
var Take = 10;
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
        var CommentID = $span.attr('cid');
        util.postJSON(self.props.zanUrl, { CommentID: CommentID }, function (res) {
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
        ajax = util.postJSON(self.props.subUrl, { RootID: rid, Skip: subSkipHash[rid], Take: Take }, function (res) {
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
              if (_data2.data.length < Take) {
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
      });
      $root.on('click', '.remove', function () {
        var $btn = $(this);
        var cid = $btn.attr('cid');
        util.postJSON(self.props.delUrl, { CommentID: cid }, function (res) {
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
          ajax = util.postJSON(self.props.subUrl, { RootID: rid, Skip: -1, Take: Take }, function (res) {
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