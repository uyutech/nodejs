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
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by army on 2017/5/20.
 */

var util = {
  goto: function goto(url) {
    location.href = url;
  },
  autoSsl: function autoSsl(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return (url || '').replace(/^https?:\/\//i, '//');
  },
  img: function img(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url.replace(/\.(\w+)-\d+_\d*/, '.$1') : url;
  },
  img1296_1296_80: function img1296_1296_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-1296_1296_80' : url;
  },
  img750_750_80: function img750_750_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-750_750_80' : url;
  },
  img600_600_80: function img600_600_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-600_600_80' : url;
  },
  img288__80: function img288__80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288__80' : url;
  },
  img288_288_80: function img288_288_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-288_288_80' : url;
  },
  img240_240_80: function img240_240_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img220_220_80: function img220_220_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-240_240_80' : url;
  },
  img200_200: function img200_200(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200' : url;
  },
  img200_200_80: function img200_200_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-200_200_80' : url;
  },
  img192_192: function img192_192(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-192_192' : url;
  },
  img150_150_80: function img150_150_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-150_150_80' : url;
  },
  img144_: function img144_(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_' : url;
  },
  img144_144: function img144_144(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144' : url;
  },
  img144_144_80: function img144_144_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-144_144_80' : url;
  },
  img128_128_80: function img128_128_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img120_120: function img120_120(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120' : url;
  },
  img120_120_80: function img120_120_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-120_120_80' : url;
  },
  img100_100: function img100_100(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-100_100' : url;
  },
  img96_96_80: function img96_96_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img90_90: function img90_90(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-90_90' : url;
  },
  img64_64_80: function img64_64_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-64_64_80' : url;
  },
  img60_60: function img60_60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60' : url;
  },
  img60_60_80: function img60_60_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-60_60_80' : url;
  },
  img__60: function img__60(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-__60' : url;
  },
  img48_48_80: function img48_48_80(url) {
    if (!/\/\/zhuanquan\./i.test(url)) {
      return url;
    }
    return url ? url + '-48_48_80' : url;
  },
  formatTime: function formatTime(time) {
    if (!time) {
      return '00:00';
    }
    var res = '';
    if (time >= 1000 * 60 * 60) {
      var hour = Math.floor(time / (1000 * 60 * 60));
      time -= 1000 * 60 * 60 * hour;
      res += hour + ':';
    }
    if (time >= 1000 * 60) {
      var minute = Math.floor(time / (1000 * 60));
      time -= 1000 * 60 * minute;
      if (minute < 10) {
        minute = '0' + minute;
      }
      res += minute + ':';
    } else {
      res += '00:';
    }
    var second = Math.floor(time / 1000);
    if (second < 10) {
      second = '0' + second;
    }
    res += second;
    return res;
  },
  formatDate: function formatDate(time) {
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
  },
  ERROR_MESSAGE: '人气大爆发，请稍后再试。'
};

exports.default = util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by army8735 on 2017/10/6.
 */



Object.defineProperty(exports, "__esModule", {
  value: true
});
var net = {
  ajax: function ajax(url, data, _success, _error, type) {
    var csrfToken = $.cookie('csrfToken');
    Object.keys(data).forEach(function (k) {
      if (data[k] === undefined || data[k] === null) {
        delete data[k];
      }
    });
    if (url.indexOf('?') === -1) {
      url += '?_=' + Date.now();
    } else {
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
    success = success || function () {};
    error = error || function () {};
    return net.ajax(url, data, success, error, 'post');
  }
};

exports.default = net;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);

    this.__hash = {};
  }

  _createClass(Event, [{
    key: 'on',
    value: function on(id, handle) {
      var self = this;
      if (Array.isArray(id)) {
        for (var i = 0, len = id.length; i < len; i++) {
          self.on(id[i], handle);
        }
      } else if (handle) {
        if (!self.__hash.hasOwnProperty(id)) {
          self.__hash[id] = [];
        }
        //遍历防止此handle被侦听过了
        for (var i = 0, item = self.__hash[id], len = item.length; i < len; i++) {
          if (item[i] === handle) {
            return self;
          }
        }
        self.__hash[id].push(handle);
      }
      return self;
    }
  }, {
    key: 'once',
    value: function once(id, handle) {
      var self = this;
      if (Array.isArray(id)) {
        for (var i = 0, len = id.length; i < len; i++) {
          self.once(id[i], handle);
        }
      } else if (handle) {
        var _cb = function _cb() {
          for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
            data[_key] = arguments[_key];
          }

          handle.apply(this, data);
          self.off(id, _cb);
        };

        self.on(id, _cb);
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(id, handle) {
      var self = this;
      if (Array.isArray(id)) {
        for (var i = 0, len = id.length; i < len; i++) {
          self.off(id[i], handle);
        }
      } else if (self.__hash.hasOwnProperty(id)) {
        if (handle) {
          for (var i = 0, item = self.__hash[id], len = item.length; i < len; i++) {
            if (item[i] === handle) {
              item.splice(i, 1);
              break;
            }
          }
        }
        //未定义为全部清除
        else {
            delete self.__hash[id];
          }
      }
      return this;
    }
  }, {
    key: 'emit',
    value: function emit(id) {
      var self = this;

      for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        data[_key2 - 1] = arguments[_key2];
      }

      if (Array.isArray(id)) {
        for (var i = 0, len = id.length; i < len; i++) {
          self.emit(id[i], data);
        }
      } else {
        if (self.__hash.hasOwnProperty(id)) {
          var list = self.__hash[id];
          if (list.length) {
            list = list.slice();
            for (var i = 0, len = list.length; i < len; i++) {
              list[i].apply(self, data);
            }
          }
        }
      }
      return this;
    }
  }], [{
    key: 'mix',
    value: function mix() {
      for (var _len3 = arguments.length, obj = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        obj[_key3] = arguments[_key3];
      }

      for (var i = obj.length - 1; i >= 0; i--) {
        var o = obj[i];
        var event = new Event();
        o.__hash = {};
        var fns = ['on', 'once', 'off', 'emit'];
        for (var j = fns.length - 1; j >= 0; j--) {
          var fn = fns[j];
          o[fn] = event[fn];
        }
      }
    }
  }]);

  return Event;
}();

Event.DOM = 'DOM';
Event.DESTROY = 'DESTROY';
Event.DATA = 'DATA';

exports.default = Event;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Element = __webpack_require__(4);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _clone(obj) {
  if (obj instanceof _Element2.default) {
    return obj;
  }
  if (isOrigin(obj)) {
    return obj;
  }
  var o = Array.isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      var item = obj[i];
      if (item instanceof _Element2.default) {
        o[i] = item;
      } else if (util.isDate(item)) {
        o[i] = new Date(item);
      } else {
        o[i] = util.isObject(item) ? _clone(item) : item;
      }
    }
  }
  return o;
}

var toString = {}.toString;
function isType(type) {
  return function (obj) {
    return toString.call(obj) == '[object ' + type + ']';
  };
}

function isOrigin(o) {
  return o === void 0 || o === null || util.isBoolean(o) || util.isNumber(o) || util.isString(o);
}
function _equal(a, b) {
  //vd常量
  if (a instanceof _Element2.default || b instanceof _Element2.default) {
    return a == b;
  }
  if (isOrigin(a) || isOrigin(b)) {
    return a === b;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length != b.length) {
      return false;
    }
    for (var i = 0, len = a.length; i < len; i++) {
      if (!_equal(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (util.isDate(a)) {
    if (!util.isDate(b)) {
      return false;
    }
    return a - b == 0;
  }
  if (util.isObject(a)) {
    if (!util.isObject(b)) {
      return false;
    }
    var ka = Object.keys(a);
    var kb = Object.keys(b);
    if (ka.length !== kb.length) {
      return false;
    }
    for (var i = 0, len = ka.length; i < len; i++) {
      if (!b.hasOwnProperty(i) || !_equal(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
}

function _joinArray(arr, prop) {
  var res = '';
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if (Array.isArray(item)) {
      res += _joinArray(item);
    } else if (item instanceof _Element2.default) {
      res += prop ? encodeHtml(item.toString(), prop) : item.toString();
    } else {
      res += encodeHtml(stringify(item), prop);
    }
  }
  return res;
}

function _joinSourceArray(arr) {
  var res = '';
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if (Array.isArray(item)) {
      res += _joinSourceArray(item);
    } else {
      res += item.toString();
    }
  }
  return res;
}

function stringify(s) {
  if (s === null || s === void 0) {
    return '';
  }
  return s.toString();
}

function encodeHtml(s, prop) {
  if (prop) {
    return s.replace(/"/g, '&quot;');
  }
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

var util = {
  clone: function clone(obj) {
    return _clone(obj);
  },

  isObject: isType('Object'),
  isString: isType('String'),
  isFunction: isType('Function'),
  isNumber: isType('Number'),
  isBoolean: isType('Boolean'),
  isDate: isType('Date'),
  equal: function equal(a, b) {
    return _equal(a, b);
  },

  stringify: stringify,
  encodeHtml: encodeHtml,
  joinArray: function joinArray(arr, prop) {
    return _joinArray(arr, prop);
  },
  joinSourceArray: function joinSourceArray(arr) {
    return _joinSourceArray(arr);
  }
};

exports.default = util;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Event2 = __webpack_require__(2);

var _Event3 = _interopRequireDefault(_Event2);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var uid = 0;

function getDom(dom) {
  if (_util2.default.isString(dom)) {
    return document.querySelector(dom);
  } else if (dom instanceof Element) {
    return dom.element;
  }
  return dom;
}
function arr2hash(arr) {
  var hash = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if (Array.isArray(item)) {
      hash[item[0]] = item[1];
    } else {
      for (var list = Object.keys(item), j = list.length - 1; j >= 0; j--) {
        var k = list[j];
        hash[k] = item[k];
      }
    }
  }
  return hash;
}
function hash2arr(hash) {
  var arr = [];
  for (var list = Object.keys(hash), i = 0, len = list.length; i < len; i++) {
    var k = list[i];
    arr.push([k, hash[k]]);
  }
  return arr;
}
function spread(arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i];
    if (!Array.isArray(item)) {
      var temp = [];
      for (var list = Object.keys(item), j = 0, len = list.length; j < len; j++) {
        var k = list[j];
        temp.push([k, item[k]]);
      }
      arr.splice.apply(arr, [i, 1].concat(temp));
    }
  }
  return arr;
}

var Element = function (_Event) {
  _inherits(Element, _Event);

  function Element(name, props, children) {
    _classCallCheck(this, Element);

    var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

    _this.__reset(name, props, children);
    return _this;
  }

  _createClass(Element, [{
    key: '__reset',
    value: function __reset(name, props, children) {
      this.uid = uid++;
      this.__name = name;
      //构建工具中都是arr，手写可能出现hash情况
      if (Array.isArray(props)) {
        this.props = arr2hash(props);
        this.__props = spread(props);
      } else {
        this.props = props;
        this.__props = hash2arr(props);
      }
      this.children = children;

      this.__element = null; //真实DOM引用
      this.__parent = null; //父vd或cp引用
      this.__top = null; //最近父cp引用
      this.__style = null; //样式中间生成代码
      this.__dom = false; //是否被添加到真实DOM标识
      this.__cache = {}; //缓存计算好的props

      this.once(_Event3.default.DOM, this.__onDom);
    }
    //防止多次插入后重复，清除上次，永远只存在一个实例

  }, {
    key: 'clean',
    value: function clean() {
      if (this.__dom) {
        var elem = this.element;
        if (elem && elem.parentNode) {
          elem.parentNode.removeChild(elem);
        }
        this.__element = null;
        this.__parent = null;
        this.__top = null;
        this.__style = null;
        this.__dom = false;
        this.__cache = {};
        this.once(_Event3.default.DOM, this.__onDom);
      }
    }
  }, {
    key: 'preString',
    value: function preString() {}
  }, {
    key: '__onDom',
    value: function __onDom() {
      this.__dom = true;
      this.__saveRef();
    }
  }, {
    key: '__saveRef',
    value: function __saveRef() {
      //ref快速引用
      if (this.props.ref) {
        var top = this.top;
        if (top) {
          var k = this.props.ref;
          var exist = top.ref[k];
          if (Array.isArray(exist)) {
            exist.push(this);
          } else if (exist) {
            top.ref[k] = [exist, this];
          } else {
            top.ref[k] = this;
          }
        }
      }
    }
  }, {
    key: 'inTo',
    value: function inTo(dom) {
      this.clean();
      var s = this.toString();
      getDom(dom).innerHTML = s;
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(dom) {
      this.clean();
      var s = this.toString();
      dom = getDom(dom);
      dom.insertAdjacentHTML('beforeend', s);
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'prependTo',
    value: function prependTo(dom) {
      this.clean();
      var s = this.toString();
      dom = getDom(dom);
      dom.insertAdjacentHTML('afterbegin', s);
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'before',
    value: function before(dom) {
      this.clean();
      var s = this.toString();
      dom = getDom(dom);
      dom.insertAdjacentHTML('beforebegin', s);
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'after',
    value: function after(dom) {
      this.clean();
      var s = this.toString();
      dom = getDom(dom);
      dom.insertAdjacentHTML('afterend', s);
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'replace',
    value: function replace(dom) {
      this.clean();
      var s = this.toString();
      dom = getDom(dom);
      dom.insertAdjacentHTML('afterend', s);
      dom.parentNode.removeChild(dom);
      this.emit(_Event3.default.DOM);
    }
  }, {
    key: 'top',
    get: function get() {
      if (!this.__top && this.parent) {
        if (this.parent instanceof migi.Component) {
          this.__top = this.parent;
        } else {
          this.__top = this.parent.top;
        }
      }
      return this.__top;
    }
  }, {
    key: 'parent',
    get: function get() {
      return this.__parent;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.__name;
    }
  }, {
    key: 'dom',
    get: function get() {
      return this.__dom;
    }
  }], [{
    key: 'resetUid',
    value: function resetUid() {
      uid = 0;
    }
  }]);

  return Element;
}(_Event3.default);

exports.default = Element;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _Element2 = __webpack_require__(4);

var _Element3 = _interopRequireDefault(_Element2);

var _VirtualDom = __webpack_require__(8);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _Obj = __webpack_require__(9);

var _Obj2 = _interopRequireDefault(_Obj);

var _EventBus = __webpack_require__(11);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Model = __webpack_require__(12);

var _Model2 = _interopRequireDefault(_Model);

var _Stream = __webpack_require__(25);

var _Stream2 = _interopRequireDefault(_Stream);

var _Fastclick = __webpack_require__(26);

var _Fastclick2 = _interopRequireDefault(_Fastclick);

var _array = __webpack_require__(43);

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var STOP = ['click', 'dblclick', 'focus', 'blur', 'change', 'contextmenu', 'mousedown', 'mousemove', 'mouseover', 'mouseup', 'mouseout', 'mousewheel', 'resize', 'scroll', 'select', 'submit', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup', 'drag', 'dragstart', 'dragover', 'dragenter', 'dragleave', 'dragend', 'drop', 'formchange', 'forminput', 'input', 'cut', 'paste', 'reset', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'MSGestureEnd', 'MSPointerDown', 'pointerdown', 'MSPointerMove', 'pointermove', 'MSPointerUp', 'pointerup', 'MSPointerCancel', 'pointercancel'];

var Component = function (_Element) {
  _inherits(Component, _Element);

  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, null, props, children));

    var self = _this;
    self.__name = self.constructor.__migiName;
    self.__virtualDom = null; //根节点vd引用
    self.__ref = {}; //以ref为attr的vd快速访问引用
    self.__stop = null; //停止冒泡的fn引用
    self.__model = null; //数据模型引用
    self.__allowPropagation = true; //默认是否允许冒泡
    // self.__bridgeHash = {}; //桥接记录
    self.__stream = null; //桥接过程中传递的stream对象
    self.__canData = false; //防止添加至DOM前触发无谓的数据更新
    self.__bindHash = {}; //缩略语法中是否设置过默认值
    self.__ob = []; //被array们的__ob__引用

    self.__props.forEach(function (item, index) {
      var k = item[0];
      var v = item[1];
      self.__init(k, v, index);
    });
    return _this;
  }

  _createClass(Component, [{
    key: '__init',
    value: function __init(k, v, index) {
      var self = this;
      if (/^on[a-zA-Z]/.test(k)) {
        var name = k.slice(2).toLowerCase();
        self.once(_Event2.default.DOM, function () {
          self.virtualDom.__addEvt(name, v);
        });
      } else if (/^on-[a-zA-Z\d_]/.test(k) && _util2.default.isFunction(v)) {
        var name = k.slice(3);
        this.on(name, function () {
          v.apply(undefined, arguments);
        });
      } else if (k == 'model') {
        self.model = v;
      } else if (v instanceof _Obj2.default) {
        self.__props[index] = v.v;
        self.props[k] = v.v;
      }
    }
    //需要被子类覆盖
    //@abstract

  }, {
    key: 'render',
    value: function render() {
      return new _VirtualDom2.default('div', this.props, this.children);
    }
    //@override

  }, {
    key: 'toString',
    value: function toString() {
      this.__virtualDom = this.render();
      if (!this.__virtualDom) {
        throw new Error('render must return a VirtualDom: ' + this.name);
      }
      this.__virtualDom.__parent = this;
      if (this.__style) {
        this.__virtualDom.style = this.__style;
      }
      return this.__virtualDom.toString();
    }
    //@override

  }, {
    key: 'preString',
    value: function preString() {
      this.toString();
    }
  }, {
    key: 'findChild',
    value: function findChild(name) {
      return this.findChildren(name, true)[0];
    }
  }, {
    key: 'findChildren',
    value: function findChildren(name, first) {
      var res = [];
      for (var i = 0, len = this.children.length; i < len; i++) {
        var child = this.children[i];
        if (child instanceof _Element3.default) {
          if (child instanceof Component) {
            if (child.name == name || _util2.default.isFunction(name) && child instanceof name) {
              res.push(child);
              if (first) {
                break;
              }
            }
          } else {
            if (child.name == name || _util2.default.isFunction(name) && child instanceof name) {
              res.push(child);
              if (first) {
                break;
              }
            }
            res = res.concat(child.findAll(name));
            if (first && res.length) {
              break;
            }
          }
        }
      }
      return res;
    }
  }, {
    key: 'find',
    value: function find(selector) {
      return this.__virtualDom ? this.__virtualDom.find(selector) : null;
    }
  }, {
    key: 'findAll',
    value: function findAll(selector) {
      return this.__virtualDom ? this.__virtualDom.findAll(selector) : [];
    }
    /*
     * bridge(target, String, String, Function)
     * bridge(target, String, Function)
     * bridge(target, String, String)
     * bridge(target, String)
     * bridge(target, Object<String:String>)
     * bridge(target, Object<String:Function>)
     * bridge(target, Object<String:Object<name:String,middleware:Function>>)
    */

  }, {
    key: 'bridge',
    value: function bridge(target, src, name, middleware) {
      var self = this;
      if (target == this) {
        throw new Error('can not bridge self: ' + self.name);
      }
      if (!target || !(target instanceof _EventBus2.default) && !(target instanceof Component) && !(target instanceof _Model2.default)) {
        throw new Error('can only bridge to EventBus/Component/Model: ' + self.name);
      }
      //使用桥接时才创建对象
      self.__bridgeHash = self.__bridgeHash || {};
      //重载
      if (arguments.length == 2) {
        if (_util2.default.isString(src)) {
          self.__record(target, src, src);
        } else {
          Object.keys(src).forEach(function (k) {
            var o = src[k];
            if (_util2.default.isString(o)) {
              self.__record(target, k, o);
            } else if (_util2.default.isFunction(o)) {
              self.__record(target, k, k, o);
            } else if (o.name) {
              self.__record(target, k, o.name, o.middleware);
            }
          });
        }
      } else if (arguments.length == 3) {
        if (_util2.default.isString(name)) {
          self.__record(target, src, name);
        } else {
          middleware = name;
          self.__record(target, src, src, middleware);
        }
      } else if (arguments.length == 4) {
        self.__record(target, src, name, middleware);
      }
    }

    //@overwrite

  }, {
    key: '__onDom',
    value: function __onDom(fake) {
      _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), '__onDom', this).call(this);
      var self = this;
      self.virtualDom.emit(_Event2.default.DOM, fake);
      var elem = self.element;
      if (self.name) {
        elem.setAttribute('migi-name', self.name);
      }
      //无覆盖render时渲染标签的children；有时渲染render的children
      //标签的children没被添加到DOM上但父级组件DOM已构建完，因此以参数区分触发fake的DOM事件
      if (!fake && self.children != self.virtualDom.children) {
        Component.fakeDom(self.children);
      }
      //指定不允许冒泡，默认是全部冒泡
      if (self.props.allowPropagation == 'true') {
        return;
      } else if (self.props.allowPropagation != 'false' && self.allowPropagation) {
        return;
      }
      //将所有组件DOM事件停止冒泡，形成shadow特性，但不能阻止捕获
      function stopPropagation(e) {
        e = e || window.event;
        if (e.target != elem && e.srcElement != elem) {
          e.cancelBubble = true;
          e.stopPropagation && e.stopPropagation();
        }
      }
      self.__stop = stopPropagation;
      //仅考虑用户事件，媒体等忽略
      STOP.forEach(function (name) {
        elem.addEventListener(name, stopPropagation);
      });
      //fastclick处理移动点击点透
      _Fastclick2.default.attach(elem);
    }
  }, {
    key: '__data',
    value: function __data(k) {
      var self = this;
      //set触发数据变更时，若已DOM则打开开关
      if (self.dom) {
        self.__canData = true;
      }
      self.__onData(k);
      self.emit(_Event2.default.DATA, k);

      if (self.__bridgeHash) {
        if (!Array.isArray(k)) {
          k = [k];
        }
        k.forEach(function (k) {
          //分析桥接
          var bridge = self.__bridgeHash[k];
          if (bridge) {
            var stream = self.__stream || new _Stream2.default(self.uid);
            var v = self[k];
            bridge.forEach(function (item) {
              var target = item.target;
              var name = item.name;
              var middleware = item.middleware;
              if (!stream.has(target.uid)) {
                stream.add(target.uid);
                if (target instanceof _EventBus2.default) {
                  target.emit(_Event2.default.DATA, name, middleware ? middleware.call(self, v) : v, stream);
                }
                //先设置桥接对象数据为桥接模式，修改数据后再恢复
                else {
                    target.__stream = stream;
                    target[name] = middleware ? middleware.call(self, v) : v;
                    target.__stream = null;
                  }
              }
            });
          }
        });
      }
    }
    //@overwrite

  }, {
    key: '__onData',
    value: function __onData(k) {
      //未DOM或开关时不触发更新
      if (!this.dom || !this.canData) {
        return;
      }
      if (this.virtualDom) {
        this.virtualDom.__onData(k);
      }
      for (var i = 0, len = this.children.length; i < len; i++) {
        var child = this.children[i];
        if (child instanceof _VirtualDom2.default) {
          child.__onData(k);
        }
      }
    }
  }, {
    key: '__destroy',
    value: function __destroy() {
      var self = this;
      if (self.__stop) {
        var elem = self.element;
        STOP.forEach(function (name) {
          elem.removeEventListener(name, self.__stop);
        });
      }
      if (self.model) {
        self.model.__del(self);
      }
      //侦听array里面的引用需删除
      self.__ob.forEach(function (arr) {
        var i = arr.__ob__.indexOf(self);
        if (i > -1) {
          arr.__ob__.splice(i, 1);
          arr.__cb__.splice(i, 1);
        }
      });
      var vd = self.virtualDom.__destroy();
      self.emit(_Event2.default.DESTROY);
      self.__hash = {};
      self.__bridgeHash = null;
      return vd;
    }
  }, {
    key: '__initBind',
    value: function __initBind(name) {
      if (this.__bindHash.hasOwnProperty(name)) {
        return false;
      }
      this.__bindHash[name] = true;
      return true;
    }
  }, {
    key: '__getBind',
    value: function __getBind(name) {
      return this[name + '__'];
    }
  }, {
    key: '__setBind',
    value: function __setBind(name, v) {
      this.__bindHash[name] = true;
      this[name + '__'] = v;
      this.__array(name, v);
    }
  }, {
    key: '__array',
    value: function __array(name, v) {
      var self = this;
      //检查array类型，替换并侦听array的原型方法
      if (Array.isArray(v)) {
        v.__proto__ = _array2.default;
        v.__ob__ = v.__ob__ || [];
        v.__cb__ = v.__cb__ || [];
        if (v.__ob__.indexOf(self) == -1) {
          self.__ob.push(v);
          v.__ob__.push(self);
          v.__cb__.push(function () {
            self[name] = self[name];
          });
        }
      }
    }
  }, {
    key: 'allowPropagation',
    get: function get() {
      return this.__allowPropagation;
    },
    set: function set(v) {
      this.__allowPropagation = v;
    }
  }, {
    key: 'element',
    get: function get() {
      return this.virtualDom ? this.virtualDom.element : null;
    }
  }, {
    key: 'style',
    get: function get() {
      return this.__style;
    },
    set: function set(v) {
      this.__style = v;
    }
  }, {
    key: 'model',
    get: function get() {
      return this.__model;
    },
    set: function set(v) {
      if (!(v instanceof _Model2.default)) {
        throw new Error('can not set model to a non Model: ' + v);
      }
      this.__model = v;
      v.__add(this);
    }
  }, {
    key: 'virtualDom',
    get: function get() {
      return this.__virtualDom;
    }
  }, {
    key: 'ref',
    get: function get() {
      return this.__ref;
    }
  }, {
    key: 'canData',
    get: function get() {
      return this.__canData;
    }
  }], [{
    key: 'fakeDom',
    value: function fakeDom(child) {
      if (Array.isArray(child)) {
        child.forEach(function (item) {
          Component.fakeDom(item);
        });
      } else if (child instanceof Component) {
        child.emit(_Event2.default.DOM, true);
      } else if (child instanceof _VirtualDom2.default) {
        child.emit(_Event2.default.DOM, true);
      }
    }
  }]);

  return Component;
}(_Element3.default);

//完全一样的桥接数据流方法，复用


['__record', '__unRecord', 'bridgeTo', 'unBridge', 'unBridgeTo'].forEach(function (k) {
  Component.prototype[k] = _EventBus2.default.prototype[k];
});

exports.default = Component;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hash = {};

exports.default = {
  get: function get(k) {
    return hash[k];
  },
  set: function set(elem) {
    hash[elem.uid] = elem;
    return elem;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;if (getter === undefined) {
      return undefined;
    }return getter.call(receiver);
  }
};

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _Element2 = __webpack_require__(4);

var _Element3 = _interopRequireDefault(_Element2);

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _Obj = __webpack_require__(9);

var _Obj2 = _interopRequireDefault(_Obj);

var _Cb = __webpack_require__(13);

var _Cb2 = _interopRequireDefault(_Cb);

var _range = __webpack_require__(20);

var _range2 = _interopRequireDefault(_range);

var _match = __webpack_require__(38);

var _match2 = _interopRequireDefault(_match);

var _domDiff = __webpack_require__(39);

var _domDiff2 = _interopRequireDefault(_domDiff);

var _type = __webpack_require__(15);

var _type2 = _interopRequireDefault(_type);

var _fixEvent = __webpack_require__(23);

var _fixEvent2 = _interopRequireDefault(_fixEvent);

var _attr = __webpack_require__(40);

var _attr2 = _interopRequireDefault(_attr);

var _hash = __webpack_require__(7);

var _hash2 = _interopRequireDefault(_hash);

var _touch = __webpack_require__(41);

var _touch2 = _interopRequireDefault(_touch);

var _delegate = __webpack_require__(24);

var _delegate2 = _interopRequireDefault(_delegate);

var _matchUtil = __webpack_require__(17);

var _matchUtil2 = _interopRequireDefault(_matchUtil);

var _eventCaseName = __webpack_require__(42);

var _eventCaseName2 = _interopRequireDefault(_eventCaseName);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var SELF_CLOSE = {
  'img': true,
  'meta': true,
  'link': true,
  'br': true,
  'basefont': true,
  'base': true,
  'col': true,
  'embed': true,
  'frame': true,
  'hr': true,
  'input': true,
  'keygen': true,
  'area': true,
  'param': true,
  'source': true,
  'track': true,
  'wbr': true
};

var TOUCH = {
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  'longtap': true,
  'doubletap': true
};

function convertSelector(selector) {
  if (selector instanceof _Element3.default) {
    return selector.name + '[migi-uid="' + selector.uid + '"]';
  }
  return selector.replace(/(^|\s|,|])([A-Z][\w$]*)\b/, '$1[migi-name="$2"]');
}

function _find(name, children) {
  return _findAll(name, children, true)[0] || null;
}
function _findAll(name, children, first) {
  return __findAll(name, children, [], first);
}
function __findAll(name, children, res, first) {
  for (var i = 0, len = children.length; i < len; i++) {
    var child = children[i];
    if (child instanceof _Element3.default) {
      res = __findEq(name, child, res, first);
    } else if (child instanceof _Obj2.default) {
      child = child.v;
      if (Array.isArray(child)) {
        res = __findAll(name, child, res, first);
      } else if (child instanceof _Element3.default) {
        res = __findEq(name, child, res, first);
      }
    } else if (Array.isArray(child)) {
      res = __findAll(name, child, res, first);
    }
    if (first && res.length) {
      break;
    }
  }
  return res;
}
function __findEq(name, child, res, first) {
  //cp不递归
  if (child instanceof _Component2.default) {
    if (child instanceof name) {
      res.push(child);
    }
  }
  //vd递归
  else {
      if (child instanceof name) {
        res.push(child);
        if (first) {
          return res;
        }
      }
      res = res.concat(child.findAll(name, first));
    }
  return res;
}

var VirtualDom = function (_Element) {
  _inherits(VirtualDom, _Element);

  function VirtualDom(name) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, VirtualDom);

    //自闭合标签不能有children
    if (SELF_CLOSE.hasOwnProperty(name) && children.length) {
      throw new Error('self-close tag can not has chilren: ' + name);
    }

    var _this = _possibleConstructorReturn(this, (VirtualDom.__proto__ || Object.getPrototypeOf(VirtualDom)).call(this, name, props, children));

    var self = _this;
    self.__names = null; //从Component根节点到自己的tagName列表，以便css计算
    self.__classes = null; //同上，class列表
    self.__ids = null; //同上，id列表
    self.__inline = null; //昏村本身props的style属性
    self.__hover = false; //是否处于鼠标hover状态
    self.__active = false; //是否处于鼠标active状态
    self.__listener = null; //添加的event的cb引用，remove时使用
    // self.__init(name, children);
    return _this;
  }

  //@override


  _createClass(VirtualDom, [{
    key: 'toString',
    value: function toString() {
      var self = this;
      var res = '<' + self.name;
      //处理属性
      for (var i = 0, len = self.__props.length; i < len; i++) {
        var item = self.__props[i];
        var s = self.__renderProp(item[0], item[1]);
        res += s;
      }
      //使用jaw内联css需解析
      if (self.__style) {
        var s = self.__match(true);
        if (s) {
          if (res.indexOf(' style="') > 1) {
            res = res.replace(/ style="[^"]*"/, ' style="' + s + '"');
          } else {
            res = res + ' style="' + s + '"';
          }
        }
      }
      res += ' migi-uid="' + self.uid + '"';
      //:input要侦听数据绑定
      self.__checkListener();
      //自闭合标签特殊处理
      if (self.__selfClose) {
        return res + '/>';
      }
      res += '>';
      //有dangerouslySetInnerHTML直接返回
      if (self.props.dangerouslySetInnerHTML) {
        var s = self.props.dangerouslySetInnerHTML;
        if (s instanceof _Obj2.default) {
          s = s.toSourceString();
        } else if (Array.isArray(s)) {
          s = _util2.default.joinSourceArray(s);
        } else {
          s = _util2.default.stringify(s);
        }
        res += s;
      }
      //渲染children
      else {
          res += self.__renderChildren();
        }
      res += '</' + self.name + '>';
      return res;
    }
    //@override

  }, {
    key: 'preString',
    value: function preString() {
      var self = this;
      //处理属性
      for (var i = 0, len = self.__props.length; i < len; i++) {
        var item = self.__props[i];
        self.__renderProp(item[0], item[1]);
      }
      //使用jaw内联css需解析
      if (self.__style) {
        self.__match(true);
      }
      //:input要侦听数据绑定
      self.__checkListener();
      //渲染children
      self.__renderChildren();
    }

    //始终以缓存的props属性为准，哪怕更改了真实DOM的属性

  }, {
    key: 'isFirst',
    value: function isFirst(children) {
      //本身就是Component的唯一节点
      if (this.parent instanceof _Component2.default) {
        return true;
      }
      children = children || this.parent.children;
      for (var i = 0, len = children.length; i < len; i++) {
        var child = children[i];
        if (Array.isArray(child) && child.length) {
          return this.isFirst(child);
        } else if (child == this) {
          return true;
        } else if (child instanceof VirtualDom) {
          return false;
        } else if (child instanceof _Obj2.default) {
          child = child.v;
          if (Array.isArray(child) && child.length) {
            return this.isFirst(child);
          }
        }
      }
    }
  }, {
    key: 'isLast',
    value: function isLast(children) {
      //本身就是Component的唯一节点
      if (this.parent instanceof _Component2.default) {
        return true;
      }
      children = children || this.parent.children;
      for (var i = children.length - 1; i >= 0; i--) {
        var child = children[i];
        if (Array.isArray(child) && child.length) {
          return this.isLast(child);
        } else if (child == this) {
          return true;
        } else if (child instanceof VirtualDom) {
          return false;
        } else if (child instanceof _Obj2.default) {
          child = child.v;
          if (Array.isArray(child) && child.length) {
            return this.isLast(child);
          }
        }
      }
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return childEmpty(this.children);
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return !this.__cache.disabled;
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      return this.__cache.disabled;
    }
  }, {
    key: 'isChecked',
    value: function isChecked() {
      return this.__cache.checked;
    }
  }, {
    key: 'prev',
    value: function prev() {
      var res = {};
      getPrev(this.parent.children, this, res, function (child) {
        res.prev = child;
      });
      return res.prev;
    }
  }, {
    key: 'prevAll',
    value: function prevAll(sel) {
      var res = {
        prev: []
      };
      getPrev(this.parent.children, this, res, function (child) {
        if (sel && !_matchUtil2.default.nci(sel, child) || !sel) {
          res.prev.push(child);
        }
      });
      return res.prev;
    }
  }, {
    key: 'next',
    value: function next() {
      var res = {};
      getNext(this.parent.children, this, res, function (child) {
        res.next = child;
        res.done = true;
      });
      return res.next;
    }
  }, {
    key: 'nextAll',
    value: function nextAll(sel) {
      var res = {
        next: []
      };
      getNext(this.parent.children, this, res, function (child) {
        if (sel && !_matchUtil2.default.nci(sel, child) || !sel) {
          res.next.push(child);
        }
      });
      return res.next;
    }
  }, {
    key: 'isOnly',
    value: function isOnly() {
      return this.siblings().length == 1;
    }
  }, {
    key: 'isOnlyOfType',
    value: function isOnlyOfType(sel) {
      var self = this;
      var all = self.siblings();
      for (var i = 0, len = all.length; i < len; i++) {
        var item = all[i];
        if (item != self && !_matchUtil2.default.nci(sel, item)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'isFirstOfType',
    value: function isFirstOfType(sel) {
      var prevAll = this.prevAll(sel);
      for (var i = 0, len = prevAll.length; i < len; i++) {
        if (!_matchUtil2.default.nci(sel, prevAll[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'isLastOfType',
    value: function isLastOfType(sel) {
      var nextAll = this.nextAll(sel);
      for (var i = 0, len = nextAll.length; i < len; i++) {
        if (!_matchUtil2.default.nci(sel, nextAll[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'siblings',
    value: function siblings() {
      var parent = this.parent;
      var all = allChildren(parent.children);
      return all;
    }
  }, {
    key: 'getIdx',
    value: function getIdx(reverse) {
      var siblings = this.siblings();
      var i = siblings.indexOf(this);
      if (i > -1) {
        return reverse ? siblings.length - i - 1 : i;
      }
      return -1;
    }
  }, {
    key: 'getIdxOfType',
    value: function getIdxOfType(sel, reverse) {
      var siblings = reverse ? this.nextAll(sel) : this.prevAll(sel);
      if (reverse) {
        siblings.unshift(this);
      } else {
        siblings.push(this);
      }
      var i = siblings.indexOf(this);
      if (i > -1) {
        return reverse ? siblings.length - i - 1 : i;
      }
      return -1;
    }
  }, {
    key: '__renderProp',
    value: function __renderProp(k, v) {
      var self = this;
      var res = '';
      //onxxx侦听处理
      if (/^on[a-zA-Z]/.test(k)) {
        self.once(_Event2.default.DOM, function (fake) {
          //防止fake未真实添加DOM
          if (fake) {
            return;
          }
          var name = k.slice(2).toLowerCase();
          self.__addEvt(name, v);
        });
      }
      //Obj类型绑定处理
      else if (v instanceof _Obj2.default) {
          //特殊html不转义
          if (k == 'dangerouslySetInnerHTML') {
            return '';
          }
          var s = v.toString(true);
          if (k == 'className') {
            k = 'class';
          } else if (k == 'htmlFor') {
            k = 'for';
          }
          self.__cache[k] = s;
          //特殊属性根据类型输出或是在DOM后设置prop
          var special = _attr2.default.special(self.name, k);
          switch (special) {
            case _attr2.default.RENDER_EXIST:
              if (v.v) {
                res = ' ' + k + '="' + s + '"';
              }
              break;
            case _attr2.default.RENDER_DOM:
              self.once(_Event2.default.DOM, function () {
                self.__updateAttr(k, v);
              });
              break;
            default:
              res = ' ' + k + '="' + s + '"';
              break;
          }
        } else {
          var s = Array.isArray(v) ? _util2.default.joinSourceArray(v) : _util2.default.stringify(v);
          if (k == 'dangerouslySetInnerHTML') {
            return '';
          }
          if (k == 'className') {
            k = 'class';
          } else if (k == 'htmlFor') {
            k = 'for';
          }
          self.__cache[k] = s;
          //特殊属性根据类型输出或是在DOM后设置prop
          var special = _attr2.default.special(self.name, k);
          switch (special) {
            case _attr2.default.RENDER_EXIST:
              if (v) {
                res = ' ' + k + '="' + _util2.default.encodeHtml(s, true) + '"';
              }
              break;
            case _attr2.default.RENDER_DOM:
              self.once(_Event2.default.DOM, function () {
                self.__updateAttr(k, v);
              });
              break;
            default:
              res = ' ' + k + '="' + _util2.default.encodeHtml(s, true) + '"';
              break;
          }
        }
      //使用jaw导入样式时不输出class和id，以migi-class和migi-id取代之
      if (self.__style) {
        switch (k) {
          case 'class':
          case 'id':
            res = ' ' + 'migi-' + res.slice(1);
            break;
        }
      }
      return res;
    }
  }, {
    key: '__renderChildren',
    value: function __renderChildren() {
      var self = this;
      var res = '';
      for (var i = 0, len = self.children.length; i < len; i++) {
        res += renderChild(self.children[i]);
      }
      return res;
    }
  }, {
    key: '__checkListener',
    value: function __checkListener() {
      var self = this;
      if (self.name == 'input') {
        if (self.props.hasOwnProperty('value')) {
          var item = self.props.value;
          if (item instanceof _Obj2.default) {
            self.once(_Event2.default.DOM, function () {
              function cb(e) {
                (0, _fixEvent2.default)(e);
                var v = e.target.value;
                item.setV(v);
                var key = item.k;
                if (key.indexOf('model.') == 0) {
                  item.context.model[key.slice(6)] = v;
                } else {
                  item.context[key] = v;
                }
              }
              var type = self.__cache.type || '';
              switch (type.toLowerCase()) {
                //一些无需联动
                //case 'button':
                //case 'hidden':
                //case 'image':
                //case 'file':
                //case 'reset':
                //case 'submit':
                //  break;
                //只需侦听change
                case 'checkbox':
                case 'radio':
                case 'range':
                case 'color':
                  self.__addListener('change', cb);
                  break;
                //其它无需change，但input等
                default:
                  self.__addListener(['input', 'paste', 'cut', 'change'], cb);
                  break;
              }
            });
          }
        }
      } else if (self.name == 'select') {
        if (self.props.hasOwnProperty('value')) {
          var item = self.props.value;
          if (item instanceof _Obj2.default) {
            self.once(_Event2.default.DOM, function () {
              function cb(e) {
                (0, _fixEvent2.default)(e);
                var v = e.target.value;
                item.setV(v);
                var key = item.k;
                if (key.indexOf('model.') == 0) {
                  item.context.model[key.slice(6)] = v;
                } else {
                  item.context[key] = v;
                }
              }
              self.__addListener('change', cb);
            });
          }
        }
      }
      //textarea的value在标签的childNodes里，这里只处理单一child情况
      //children有多个其中一个是text有歧义，忽视
      else if (self.name == 'textarea') {
          if (self.children.length == 1) {
            var child = self.children[0];
            if (child instanceof _Obj2.default) {
              self.once(_Event2.default.DOM, function () {
                function cb(e) {
                  (0, _fixEvent2.default)(e);
                  var v = e.target.value;
                  child.setV(v);
                  var key = child.k;
                  child.context[key] = v;
                }
                self.__addListener(['input', 'paste', 'cut', 'change'], cb);
              });
            }
          }
        }
    }
  }, {
    key: '__addEvt',
    value: function __addEvt(name, v) {
      var self = this;
      self.__addListener(name, function (e) {
        (0, _fixEvent2.default)(e);
        var target = e.target;
        var uid = target.getAttribute('migi-uid');
        var tvd = _hash2.default.get(uid);
        if (v instanceof _Cb2.default && _util2.default.isFunction(v.cb)) {
          return v.cb.call(v.context, e, self, tvd);
        } else if (_util2.default.isFunction(v)) {
          return v(e, self, tvd);
        } else if (Array.isArray(v)) {
          var ret;
          v.forEach(function (item, i) {
            var cb = item[1];
            var res = (0, _delegate2.default)(e, item[0], self);
            if (res[0]) {
              if (cb instanceof _Cb2.default && _util2.default.isFunction(cb.cb)) {
                if (i) {
                  cb.cb.call(cb.context, e, self, res[1], tvd);
                } else {
                  ret = cb.cb.call(cb.context, e, self, res[1], tvd);
                }
              } else if (_util2.default.isFunction(cb)) {
                if (i) {
                  cb(e, self, res[1], tvd);
                } else {
                  ret = cb(e, self, res[1], tvd);
                }
              }
            }
          });
          return ret;
        }
      });
    }
  }, {
    key: '__addListener',
    value: function __addListener(name, cb) {
      var self = this;
      if (Array.isArray(name)) {
        for (var i = 0, len = name.length; i < len; i++) {
          self.__addListener(name[i], cb);
        }
      } else {
        //一般没有event，也就不生成对象防止diff比对
        self.__listener = self.__listener || [];
        if (name == 'tap') {
          name = 'click';
        }
        var elem = self.element;
        //touch特殊对待
        if (TOUCH.hasOwnProperty(name)) {
          (0, _touch2.default)(this, name, cb, self.__listener);
          return;
        }
        //记录下来留待清除
        self.__listener.push([name, cb]);
        elem.addEventListener(_eventCaseName2.default[name] || name, cb);
        //onLoad可能因为缓存不发生
        if (name == 'load' && elem.complete) {
          var event = document.createEvent('Event');
          event.initEvent('load', true, true);
          elem.dispatchEvent(event);
        }
      }
    }
  }, {
    key: '__removeListener',
    value: function __removeListener() {
      var self = this;
      if (self.__listener) {
        var elem = self.element;
        for (var i = self.__listener.length - 1; i >= 0; i--) {
          var arr = self.__listener[i];
          elem.removeEventListener(arr[0], arr[1]);
        }
      }
    }
  }, {
    key: 'find',
    value: function find(selector) {
      if (_util2.default.isFunction(selector)) {
        return _find(selector, this.children);
      }
      if (this.element) {
        var node = this.element.querySelector(convertSelector(selector));
        var uid = node.getAttribute('migi-uid');
        return _hash2.default.get(uid) || null;
      }
      return null;
    }
  }, {
    key: 'findAll',
    value: function findAll(selector) {
      if (_util2.default.isFunction(selector)) {
        return _findAll(selector, this.children);
      }
      var res = [];
      if (this.element) {
        var nodes = this.element.querySelectorAll(convertSelector(selector));
        Array.from(nodes).forEach(function (node) {
          if (node) {
            var uid = node.getAttribute('migi-uid');
            var vd = _hash2.default.get(uid) || null;
            if (vd) {
              res.push(vd);
            }
          }
        });
      }
      return res;
    }

    //@override

  }, {
    key: '__onDom',
    value: function __onDom(fake) {
      _get(VirtualDom.prototype.__proto__ || Object.getPrototypeOf(VirtualDom.prototype), '__onDom', this).call(this);
      var self = this;
      //fake无需插入空白节点，直接递归通知
      if (fake) {
        _Component2.default.fakeDom(self.children);
        return;
      }
      //start标明真实DOM索引，因为相邻的文本会合并为一个text节点
      var option = { start: 0, first: true };
      self.__checkBlank(self.children, option);
      //可能最后一个是空白text，或没有children，需特殊判断下插入
      if (option.empty || option.first) {
        self.__insertBlank(option.start);
      }
    }
  }, {
    key: '__checkBlank',
    value: function __checkBlank(item, option) {
      var self = this;
      if (Array.isArray(item) && item.length) {
        for (var i = 0, len = item.length; i < len; i++) {
          self.__checkBlank(item[i], option);
        }
      } else if (item instanceof _Element3.default && !(item instanceof migi.NonVisualComponent)) {
        //前面的连续的空白节点需插入一个空TextNode
        if (option.empty) {
          self.__insertBlank(option.start);
        }
        //递归通知DOM事件，增加start索引
        option.start++;
        //前方文本节点需再增1次，因为文本节点自身不涉及start索引逻辑
        if (option.prev == _type2.default.TEXT) {
          option.start++;
        }
        option.prev = _type2.default.DOM;
        option.empty = false;
        option.first = false;
        item.emit(_Event2.default.DOM);
      } else if (item instanceof _Obj2.default) {
        self.__checkBlank(item.v, option);
      } else if (isEmptyText(item)) {
        if (item instanceof migi.NonVisualComponent) {
          item.emit(_Event2.default.DOM);
        }
        //前方如有兄弟文本节点，无需插入，否则先记录empty，等后面检查是否有非空text出现，再插入空白节点
        if (option.prev == _type2.default.TEXT) {
          return;
        }
        option.empty = true;
        option.prev = _type2.default.TEXT;
        option.first = false;
      }
      //一旦是个非空text，之前记录的空text将无效，因为相邻的text会合并为一个text节点
      else {
          option.empty = false;
          option.prev = _type2.default.TEXT;
          option.first = false;
        }
    }
  }, {
    key: '__insertBlank',
    value: function __insertBlank(start) {
      var blank = document.createTextNode('');
      var elem = this.element;
      var cns = elem.childNodes;
      //可能仅一个空文本节点，或最后一个空文本节点
      var length = cns.length;
      if (!length || start >= length) {
        elem.appendChild(blank);
      }
      //插入
      else {
          elem.insertBefore(blank, cns[start]);
        }
    }
    //@override

  }, {
    key: '__onData',
    value: function __onData(k) {
      var self = this;
      //尚未添加到dom时无效
      if (!self.dom) {
        return;
      }
      //联动属性值
      for (var i = 0, len = self.__props.length; i < len; i++) {
        var item = self.__props[i];
        var key = item[0];
        item = item[1];
        if (item instanceof _Obj2.default) {
          var change = false;
          var vk = Array.isArray(k) ? 1 : 0;
          var ok = Array.isArray(item.k) ? 2 : 0;
          switch (vk + ok) {
            case 0:
              change = k == item.k;
              break;
            case 1:
              change = k.indexOf(item.k) > -1;
              break;
            case 2:
              change = item.k.indexOf(k) > -1;
              break;
            case 3:
              var hash = {};
              for (var j = k.length - 1; j >= 0; j--) {
                hash[k[j]] = true;
              }
              for (var temp = item.k, j = 0, len = temp.length; j < len; j++) {
                if (hash.hasOwnProperty(temp[j])) {
                  change = true;
                  break;
                }
              }
              break;
          }
          if (change) {
            var ov = item.v;
            if (item.update(ov)) {
              self.__updateAttr(key, item.v);
            }
          }
        }
      }
      //利用索引更新，子节点可能为文本、Component、VirtualDom，以及数组
      //其中只有文本节点需要自己更新，记录其索引，组件和VirtualDom递归通知更新
      //由于渲染时相邻的文本变量和String文本同为一个文本节点，因此start为真实DOM的索引
      //当文本节点时start不更新
      //Obj类型的判断type和count，及为文本时是否为空
      var ranges = [];
      var option = { start: 0, record: [], first: true };
      var history;
      var children = self.children;
      for (var index = 0, len = children.length; index < len; index++) {
        var child = children[index];
        //history记录着当前child索引，可能它是个数组，递归记录
        history = [index];
        self.__checkObj(k, child, ranges, option, history);
      }
      if (ranges.length) {
        //textarea特殊判断
        if (self.name == 'textarea') {
          self.__updateAttr('value', _range2.default.value(ranges[0], self.children));
          return;
        }
        for (var i = ranges.length - 1; i >= 0; i--) {
          _range2.default.update(ranges[i], self.children, self.element);
        }
      }
    }
    //option.first标明是否第一个，因为child为数组时会展开，当child不是第1个时其展开项都有prev

  }, {
    key: '__checkObj',
    value: function __checkObj(k, child, ranges, option, history) {
      var self = this;
      //当Component和VirtualDom则start++，且前面是非空文本节点时再++，因为有2个节点
      //文本节点本身不会增加索引，因为可能有相邻的
      if (child instanceof _Obj2.default) {
        //可能Obj的关联是个列表，触发的变量name也是列表
        var change = false;
        var vk = Array.isArray(k) ? 1 : 0;
        var ok = Array.isArray(child.k) ? 2 : 0;
        switch (vk + ok) {
          case 0:
            change = k == child.k;
            break;
          case 1:
            change = k.indexOf(child.k) > -1;
            break;
          case 2:
            change = child.k.indexOf(k) > -1;
            break;
          case 3:
            var hash = {};
            for (var i = k.length - 1; i >= 0; i--) {
              hash[k[i]] = true;
            }
            for (var temp = child.k, i = 0, len = temp.length; i < len; i++) {
              if (hash.hasOwnProperty(temp[i])) {
                change = true;
                break;
              }
            }
            break;
        }
        //当可能发生变化时才进行比对
        if (change) {
          var ov = child.v;
          //对比是否真正发生变更
          if (child.update(ov)) {
            _domDiff2.default.diff(this.element, ov, child.v, ranges, option, history, this);
          } else {
            self.__checkObj(k, child.v, ranges, option, history);
          }
        } else {
          self.__checkObj(k, child.v, ranges, option, history);
        }
      }
      //递归通知，增加索引
      else if (child instanceof _Element3.default) {
          delete option.t2d;
          delete option.d2t;
          if (child instanceof VirtualDom) {
            child.__onData(k);
          }
          option.start++;
          //前面的文本再加一次
          if (!option.first && option.prev == _type2.default.TEXT) {
            option.start++;
          }
          option.prev = _type2.default.DOM;
        } else if (Array.isArray(child)) {
          if (child.length) {
            //数组类型记得递归记录history索引，结束后出栈
            history.push(0);
            for (var i = 0, len = child.length; i < len; i++) {
              var item = child[i];
              history[history.length - 1] = i;
              //第1个同时作为children的第1个要特殊处理
              self.__checkObj(k, item, ranges, option, history);
            }
            history.pop();
          }
          //注意空数组算text类型
          else {
              _domDiff2.default.check(option, this.element, child, ranges, history);
              _range2.default.record(history, option);
              option.prev = _type2.default.TEXT;
            }
        }
        //else其它情况为文本节点或者undefined忽略
        else {
            _domDiff2.default.check(option, this.element, child, ranges, history);
            _range2.default.record(history, option);
            option.prev = _type2.default.TEXT;
          }
      option.first = false;
    }
    //TODO: 一个神奇的现象，实体字符作为attr在初始化时作为String拼接和在setAttribute中表现不一致
    //如&nbsp;会成为charCode 160的Non-breaking space，而非32的Normal space
    //但是setAttribute会保留实体字符形式

  }, {
    key: '__updateAttr',
    value: function __updateAttr(k, v) {
      if (k == 'dangerouslySetInnerHTML') {
        if (v === null || v === void 0) {
          v = '';
        }
        this.element.innerHTML = _util2.default.stringify(v);
        //清空后创建空字符节点
        this.__insertBlank(0);
        return;
      }
      _attr2.default.update(this.name, this.element, k, v, this.__style);
      this.__cache[k] = v;
      //使用了jaw内联解析css
      if (this.__style) {
        this.__updateStyle();
      }
    }
  }, {
    key: '__match',
    value: function __match(first) {
      this.__inline = this.__cache.style || '';
      //预处理class和id，class分为数组形式，id判断#开头
      this.__initCI();
      var matches = (0, _match2.default)(this.__names, this.__classes, this.__ids, this.__style || { default: {} }, this, first);
      //本身的inline最高优先级追加到末尾
      return matches + this.__inline;
    }
  }, {
    key: '__initCI',
    value: function __initCI() {
      var p = this.parent;
      if (p instanceof VirtualDom) {
        this.__classes = p.__classes.slice();
        this.__ids = p.__ids.slice();
      } else {
        this.__classes = [];
        this.__ids = [];
      }
      //预处理class和id，class分为数组形式，id判断#开头
      this.__classes.push(_matchUtil2.default.splitClass(this.__cache['class']));
      this.__ids.push(_matchUtil2.default.preId(this.__cache.id));
    }
  }, {
    key: '__updateStyle',
    value: function __updateStyle(first) {
      var s = this.__match(first);
      if (this.element.getAttribute('style') != s) {
        this.element.setAttribute('style', s);
      }
      //diff调用初始化nvd时自上而下，忽略children
      if (first) {
        return;
      }
      for (var i = this.children.length - 1; i >= 0; i--) {
        var child = this.children[i];
        if (child instanceof VirtualDom) {
          child.__updateStyle();
        }
      }
    }
  }, {
    key: '__init',
    value: function __init(name, children) {
      var self = this;
      self.__selfClose = SELF_CLOSE.hasOwnProperty(name);
      childParent(children, self);
    }
    //@overwrite

  }, {
    key: '__reset',
    value: function __reset(name) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      _get(VirtualDom.prototype.__proto__ || Object.getPrototypeOf(VirtualDom.prototype), '__reset', this).call(this, name, props, children);
      this.__init(name, children);
      this.__hasDes = false;
      return this;
    }
  }, {
    key: '__destroy',
    value: function __destroy() {
      if (this.__onHover || this.__outHover) {
        if (this.element) {
          this.element.removeEventListener('mouseenter', this.__onHover);
          this.element.removeEventListener('mouseleave', this.__outHover);
        }
      }
      this.__hash = {};
      this.__cache = null;
      this.__names = null;
      this.__classes = null;
      this.__ids = null;
      this.__inline = null;
      this.__hover = false;
      this.__active = false;
      this.__listener = null;
      this.__parent = null;
      this.__top = null;
      this.__dom = false;
      this.__style = null;
      this.__element = null;
      return this;
    }
  }, {
    key: 'names',
    get: function get() {
      return this.__names || (this.__names = []);
    }
  }, {
    key: 'element',
    get: function get() {
      return this.__element || (this.__element = document.querySelector(this.name + '[migi-uid="' + this.uid + '"]'));
    }
  }, {
    key: 'style',
    get: function get() {
      return this.__style;
    },
    set: function set(v) {
      var self = this;
      self.__style = v;
      if (self.parent instanceof VirtualDom) {
        self.__names = self.parent.names.slice();
      } else {
        self.__names = [];
      }
      self.__names.push(self.name);
      for (var i = 0, len = self.children.length; i < len; i++) {
        childStyle(self.children[i], v);
      }
    }
  }]);

  return VirtualDom;
}(_Element3.default);

//静态文本节点，包括空、undefined、null、空数组


function isEmptyText(item) {
  return item === void 0 || item === null || !item.toString();
}
function renderChild(child) {
  if (child instanceof _Element3.default || child instanceof _Obj2.default) {
    return child.toString();
  }
  if (Array.isArray(child)) {
    var res = '';
    for (var i = 0, len = child.length; i < len; i++) {
      res += renderChild(child[i]);
    }
    return res;
  }
  return _util2.default.encodeHtml(_util2.default.stringify(child));
}
function childParent(child, parent) {
  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      childParent(child[i], parent);
    }
  } else if (child instanceof _Element3.default) {
    child.__parent = parent;
  } else if (child instanceof _Obj2.default) {
    childParent(child.v, parent);
  }
}
function childStyle(child, style) {
  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      childStyle(child[i], style);
    }
  } else if (child instanceof VirtualDom) {
    child.style = style;
  } else if (child instanceof _Obj2.default) {
    childStyle(child.v, style);
  }
}
function childEmpty(child) {
  var res = true;
  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      res = childEmpty(child[i]);
      if (!res) {
        break;
      }
    }
  } else if (child instanceof _Element3.default) {
    res = false;
  } else if (child instanceof _Obj2.default) {
    res = childEmpty(child.v);
  } else {
    res = isEmptyText(child);
  }
  return res;
}
function getPrev(child, target, res, cb) {
  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      getPrev(child[i], target, res, cb);
      if (res.done) {
        break;
      }
    }
  } else if (child instanceof _Element3.default) {
    if (target == child) {
      res.done = true;
      return;
    }
    cb(child);
  } else if (child instanceof _Obj2.default) {
    getPrev(child.v, target, res, cb);
  }
}
function getNext(child, target, res, cb) {
  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      getNext(child[i], target, res, cb);
      if (res.done) {
        break;
      }
    }
  } else if (child instanceof _Element3.default) {
    if (target == child) {
      res.start = true;
    } else if (res.start) {
      cb(child);
    }
  } else if (child instanceof _Obj2.default) {
    getNext(child.v, target, res, cb);
  }
}
function allChildren(child) {
  var res = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Array.isArray(child)) {
    for (var i = 0, len = child.length; i < len; i++) {
      allChildren(child[i], res);
    }
  } else if (child instanceof _Element3.default) {
    res.push(child);
  } else if (child instanceof _Obj2.default) {
    allChildren(child.v, res);
  }
  return res;
}

exports.default = VirtualDom;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Element = __webpack_require__(4);

var _Element2 = _interopRequireDefault(_Element);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Obj = function () {
  function Obj(k, context, cb) {
    _classCallCheck(this, Obj);

    this.k = k;
    this.context = context;
    this.cb = cb;
    this.setV(cb.call(context));
  }

  _createClass(Obj, [{
    key: 'setV',
    value: function setV(v) {
      this.v = _util2.default.clone(v);
    }
    //prop为true时作为prop渲染转义，否则为innerHTML转义

  }, {
    key: 'toString',
    value: function toString(prop) {
      //array调用join包括转码
      if (Array.isArray(this.v)) {
        return _util2.default.joinArray(this.v, prop);
      }
      var s = _util2.default.stringify(this.v);
      if (prop) {
        return _util2.default.encodeHtml(s, prop);
      }
      return this.v instanceof _Element2.default ? s : _util2.default.encodeHtml(s);
    }
  }, {
    key: 'toSourceString',
    value: function toSourceString() {
      if (Array.isArray(this.v)) {
        return _util2.default.joinSourceArray(this.v);
      }
      return _util2.default.stringify(this.v);
    }
  }, {
    key: 'update',
    value: function update(ov) {
      var nv = this.cb.call(this.context);
      if (!_util2.default.equal(ov, nv)) {
        this.setV(nv);
        return true;
      }
    }
  }]);

  return Obj;
}();

exports.default = Obj;

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Event2 = __webpack_require__(2);

var _Event3 = _interopRequireDefault(_Event2);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var uid = 0;

var EventBus = function (_Event) {
  _inherits(EventBus, _Event);

  function EventBus() {
    _classCallCheck(this, EventBus);

    var _this = _possibleConstructorReturn(this, (EventBus.__proto__ || Object.getPrototypeOf(EventBus)).call(this));

    _this.uid = 'e' + uid++; //为数据流历史记录hack
    _this.__bridgeHash = {};
    _this.on(_Event3.default.DATA, _this.__brcb);
    return _this;
  }

  _createClass(EventBus, [{
    key: '__brcb',
    value: function __brcb(k, v, stream) {
      if (this.__bridgeHash.hasOwnProperty(k)) {
        var arr = this.__bridgeHash[k];
        for (var i = 0, len = arr.length; i < len; i++) {
          var item = arr[i];
          var target = item.target;
          var name = item.name;
          var middleware = item.middleware;
          if (!stream.has(target.uid)) {
            stream.add(target.uid);
            //必须大于桥接对象的sid才生效
            var tItem = migi.CacheComponent.getSid(target);
            if (stream.sid > tItem) {
              //先设置桥接对象数据为桥接模式，修改数据后再恢复
              target.__stream = stream;
              target[name] = middleware ? middleware.call(target, v) : v;
              target.__stream = null;
            }
          }
        }
      }
    }
  }, {
    key: '__record',
    value: function __record(target, src, name, middleware) {
      var self = this;
      var arr = this.__bridgeHash[src] = this.__bridgeHash[src] || [];
      //防止重复桥接
      arr.forEach(function (item) {
        if (item.target == target && item.name == name) {
          throw new Error('duplicate bridge: ' + self + '.' + src + ' -> ' + target + '.' + name);
        }
      });
      //记录桥接单向数据流关系
      arr.push({
        target: target,
        name: name,
        middleware: middleware
      });
    }
  }, {
    key: '__unRecord',
    value: function __unRecord(target, src, name) {
      var self = this;
      var arr = self.__bridgeHash[src] || [];
      for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        if (item.target == target && item.name == name) {
          arr.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: 'bridge',
    value: function bridge(target, src, name, middleware) {
      var self = this;
      if (target == this) {
        throw new Error('can not bridge self: ' + self);
      }
      if (!target || !(target instanceof migi.Component) && !(target instanceof migi.Model)) {
        throw new Error('can only bridge to Component/Model: ' + self);
      }
      //重载
      if (arguments.length == 2) {
        if (_util2.default.isString(src)) {
          self.__record(target, src, src);
        } else {
          Object.keys(src).forEach(function (k) {
            var o = src[k];
            if (_util2.default.isString(o)) {
              self.__record(target, k, o);
            } else if (o.name) {
              self.__record(target, k, o.name, o.middleware);
            }
          });
        }
      } else if (arguments.length == 3) {
        if (_util2.default.isString(name)) {
          self.__record(target, src, name);
        } else {
          middleware = name;
          self.__record(target, src, src, middleware);
        }
      } else if (arguments.length == 4) {
        self.__record(target, src, name, middleware);
      }
    }
  }, {
    key: 'bridgeTo',
    value: function bridgeTo(target) {
      for (var _len = arguments.length, datas = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        datas[_key - 1] = arguments[_key];
      }

      target.bridge.apply(target, [this].concat(datas));
    }
  }, {
    key: 'unBridge',
    value: function unBridge(target, src, name) {
      var self = this;
      //重载
      if (arguments.length == 2) {
        if (_util2.default.isString(src)) {
          self.__unRecord(target, src, src);
        } else {
          Object.keys(src).forEach(function (k) {
            var o = src[k];
            if (_util2.default.isString(o)) {
              self.__unRecord(target, k, o);
            } else if (_util2.default.isFunction(o)) {
              self.__unRecord(target, k, k);
            } else if (o.name) {
              self.__unRecord(target, k, o.name);
            }
          });
        }
      } else {
        self.__unRecord(target, src, name);
      }
    }
  }, {
    key: 'unBridgeTo',
    value: function unBridgeTo(target) {
      for (var _len2 = arguments.length, datas = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        datas[_key2 - 1] = arguments[_key2];
      }

      target.unBridge.apply(target, [this].concat(datas));
    }
  }]);

  return EventBus;
}(_Event3.default);

exports.default = EventBus;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Event2 = __webpack_require__(2);

var _Event3 = _interopRequireDefault(_Event2);

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var uid = 0;

var Model = function (_Event) {
  _inherits(Model, _Event);

  function Model() {
    _classCallCheck(this, Model);

    var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

    _this.uid = 'm' + uid++;
    _this.__name = _this.constructor.__migiName;
    _this.__ref = []; //以ref为attr的vd快速访问引用
    _this.__bridgeHash = {}; //桥接记录
    _this.__bindHash = {}; //缩略语法中是否设置过默认值
    _this.__ob = []; //被array们的__ob__引用
    return _this;
  }

  _createClass(Model, [{
    key: '__onData',
    value: function __onData(k) {
      console.log(k);
      k = 'model.' + k;
      this.__ref.forEach(function (cp) {
        //set触发数据变更时，若已DOM则打开开关
        if (cp.dom) {
          cp.__canData = true;
        }
        cp.__onData(k);
      });
    }
  }, {
    key: '__add',
    value: function __add(cp) {
      if (this.__ref.indexOf(cp) == -1) {
        this.__ref.push(cp);
      }
    }
  }, {
    key: '__del',
    value: function __del(cp) {
      var i = this.__ref.indexOf(cp);
      if (i > -1) {
        this.__ref.splice(i, 1);
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return this.__name;
    }
  }]);

  return Model;
}(_Event3.default);

//完全一样的桥接数据流方法，复用


['__data', '__record', 'bridge', 'bridgeTo', '__unRecord', 'unBridge', 'unBridgeTo', '__initBind', '__getBind', '__setBind', '__array'].forEach(function (k) {
  Model.prototype[k] = _Component2.default.prototype[k];
});

exports.default = Model;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Cb = function Cb(context, cb) {
  _classCallCheck(this, Cb);

  this.context = context;
  this.cb = cb;
};

exports.default = Cb;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function createElement(name) {
  if (typeof window != 'undefined') {
    return document.createElement(name);
  }
}

var NODE = createElement('div');
var TABLE = createElement('table');
var TBODY = createElement('tbody');
var TR = createElement('tr');
var UL = createElement('ul');
var DL = createElement('dl');
var SELECT = createElement('select');
var MENU = createElement('menu');

exports.default = {
  NODE: NODE,
  getParent: function getParent(name) {
    switch (name) {
      case 'td':
        return TR;
      case 'tr':
        return TBODY;
      case 'tbody':
      case 'thead':
      case 'col':
        return TABLE;
      case 'li':
        return UL;
      case 'dt':
      case 'dd':
        return DL;
      case 'option':
        return SELECT;
      case 'menuitem':
        return MENU;
      default:
        return NODE;
    }
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  TEXT: 1,
  DOM: 2
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arr, compare) {
  if (!Array.isArray(arr)) {
    throw new Error('quick sort need an array');
  }
  if (arr.length < 2) {
    return arr;
  }
  compare = compare || function () {};
  quickSort(arr, 0, arr.length - 1, compare);
  return arr;
};

function quickSort(arr, begin, end, compare) {
  if (begin >= end) {
    return;
  }
  var i = begin,
      j = end,
      p = i,
      v = arr[p],
      seq = true;
  while (i < j) {
    if (seq) {
      for (; i < j; j--) {
        if (compare.call(arr, v, arr[j])) {
          swap(arr, p, j);
          p = j;
          seq = !seq;
          i++;
          break;
        }
      }
    } else {
      for (; i < j; i++) {
        if (compare.call(arr, arr[i], v)) {
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

;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sort = __webpack_require__(16);

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  splitClass: function splitClass(s) {
    s = (s || '').trim();
    if (s) {
      s = s.split(/\s+/);
      (0, _sort2.default)(s, function (a, b) {
        return a > b;
      });
      return s;
    } else {
      return '';
    }
  },
  preId: function preId(s) {
    if (s === undefined || s === null) {
      s = '';
    }
    s = s.toString().trim();
    if (s) {
      return '#' + s;
    } else {
      return '';
    }
  },
  combo: function combo(klass, name, id, json) {
    var hasId = 0;
    var hasClass = 0;
    //class可能有多个，任意个class的组合也要匹配
    if (klass && klass.length) {
      var comboClass = comboArr(klass, klass.length);
      hasClass = 1;
    }
    //id、class、name可能单个或组合出现，每种都要匹配
    var combo = [name];
    if (id) {
      hasId = 2;
    }
    //各种*的情况标识
    var hasStarClass = json.hasOwnProperty('_*.');
    var hasStarId = json.hasOwnProperty('_*#');
    var hasStarIdClass = json.hasOwnProperty('_*.#');
    //只有当前有_*时说明有*才匹配
    if (json.hasOwnProperty('_*')) {
      combo.push('*');
    }
    //将各种可能的组合添加进入combo
    if (hasClass) {
      comboClass.forEach(function (klass) {
        combo.push(klass);
        combo.push(name + klass);
        if (hasStarClass) {
          combo.push('*' + klass);
        }
        if (hasId) {
          combo.push(klass + id);
          combo.push(name + klass + id);
          if (hasStarIdClass) {
            combo.push('*' + klass + id);
          }
        }
      });
    }
    if (hasId) {
      combo.push(id);
      combo.push(name + id);
      if (hasStarId) {
        combo.push('*' + id);
      }
    }
    return combo;
  },
  pseudo: function pseudo(pseudos, virtualDom, sel) {
    for (var j = 0, len = pseudos.length; j < len; j++) {
      var pseudo = pseudos[j];
      switch (pseudo) {
        case 'hover':
          if (!virtualDom.__hover) {
            return false;
          }
          break;
        case 'active':
          if (!virtualDom.__active) {
            return false;
          }
          break;
        case 'first-child':
          if (!virtualDom.isFirst()) {
            return false;
          }
          break;
        case 'last-child':
          if (!virtualDom.isLast()) {
            return false;
          }
          break;
        case 'empty':
          if (!virtualDom.isEmpty()) {
            return false;
          }
          break;
        case 'enabled':
          if (!virtualDom.isEnabled()) {
            return false;
          }
          break;
        case 'disabled':
          if (!virtualDom.isDisabled()) {
            return false;
          }
          break;
        case 'checked':
          if (!virtualDom.isChecked()) {
            return false;
          }
          break;
        case 'only-child':
          if (!virtualDom.isOnly()) {
            return false;
          }
          break;
        case 'only-of-type':
          if (!virtualDom.isOnlyOfType(sel)) {
            return false;
          }
          break;
        case 'first-of-type':
          if (!virtualDom.isFirstOfType(sel)) {
            return false;
          }
          break;
        case 'last-of-type':
          if (!virtualDom.isLastOfType(sel)) {
            return false;
          }
          break;
        //除了nth外不支持
        default:
          if (pseudo.indexOf('nth-child') == 0) {
            var idx = virtualDom.getIdx();
            var n = /\((.+)\)/.exec(pseudo)[1];
            if (!nth(idx, n)) {
              return false;
            }
          } else if (pseudo.indexOf('nth-last-child') == 0) {
            var idx = virtualDom.getIdx(true);
            var n = /\((.+)\)/.exec(pseudo)[1];
            if (!nth(idx, n)) {
              return false;
            }
          } else if (pseudo.indexOf('nth-of-type') == 0) {
            var idx = virtualDom.getIdxOfType(sel);
            var n = /\((.+)\)/.exec(pseudo)[1];
            if (!nth(idx, n)) {
              return false;
            }
          } else if (pseudo.indexOf('nth-last-of-type') == 0) {
            var idx = virtualDom.getIdxOfType(sel, true);
            var n = /\((.+)\)/.exec(pseudo)[1];
            if (!nth(idx, n)) {
              return false;
            }
          } else {
            return false;
          }
      }
    }
    return true;
  },
  attr: function attr(attrs, virtualDom) {
    var isMatch = true;
    outer: for (var j = 0, len = attrs.length; j < len; j++) {
      var attr = attrs[j];
      //[attr]形式，只要有属性即可
      if (attr.length == 1) {
        if (!virtualDom.__cache.hasOwnProperty(attr[0])) {
          isMatch = false;
          break;
        }
      }
      //[attr=xxx]形式，需比较值
      else {
          var p = virtualDom.__cache[attr[0]];
          if (p === void 0) {
            isMatch = false;
            break;
          }
          var v = attr[2];
          switch (attr[1]) {
            case '=':
              isMatch = p == v;
              break;
            case '^=':
              isMatch = p.indexOf(v) == 0;
              break;
            case '$=':
              isMatch = p.length >= v.length && p.indexOf(v) == p.length - v.length;
              break;
            case '~=':
              var reg = new RegExp('\\b' + v + '\\b');
              isMatch = reg.test(p);
              break;
            case '*=':
              isMatch = p.indexOf(v) > -1;
              break;
            case '|=':
              isMatch = p.indexOf(v) == 0 || p.indexOf(v + '-') == 0;
              break;
            default:
              isMatch = false;
              break outer;
          }
          if (!isMatch) {
            break;
          }
        }
    }
    return isMatch;
  },
  nci: function nci(s, vd) {
    var nodeName = /^[a-z\d]+/i.exec(s);
    if (nodeName && nodeName[0].toUpperCase() != vd.__name.toUpperCase()) {
      return true;
    }
    var className = s.match(/\.[a-z\d_-]+/ig);
    if (className) {
      for (var j = className.length - 1; j >= 0; j--) {
        if (!new RegExp('\\b' + className[j].slice(1) + '\\b', 'i').test(vd.__cache.class)) {
          return true;
        }
      }
    }
    var id = /#[a-z\d_-]+/i.exec(s);
    if (id && id[0].toUpperCase() != vd.__cache.id.toUpperCase()) {
      return true;
    }
  }
};

function comboArr(arr, len) {
  var res = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (len - i > 1) {
    comboArr(arr, len, res, i + 1);
    for (var j = 0, len2 = res.length; j < len2; j++) {
      res.push(res[j] + '.' + arr[i]);
    }
  }
  res.push('.' + arr[i]);
  return res;
}

function nth(idx, n) {
  if (n == 'odd') {
    if (idx % 2 == 1) {
      return false;
    }
  } else if (n == 'even') {
    if (idx % 2 == 0) {
      return false;
    }
  } else if (/^\d+$/.test(n)) {
    if (idx != n - 1) {
      return false;
    }
  } else {
    var mc = /(\d+)?n(?:\+(\d+))?/.exec(n);
    var res = false;
    for (var k = 0; k <= Math.ceil(idx / mc[1]); k++) {
      if ((mc[1] || 1) * k + (mc[2] || 0) == idx + 1) {
        res = true;
        break;
      }
    }
    if (!res) {
      return false;
    }
  }
  return true;
}

/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Element = __webpack_require__(4);

var _Element2 = _interopRequireDefault(_Element);

var _VirtualDom = __webpack_require__(8);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _Obj = __webpack_require__(9);

var _Obj2 = _interopRequireDefault(_Obj);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(14);

var _browser2 = _interopRequireDefault(_browser);

var _type = __webpack_require__(15);

var _type2 = _interopRequireDefault(_type);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function join(index, children, history) {
  var res = '';
  for (var i = index.shift(), len = children.length; i < len; i++) {
    var child = children[i];
    if (index.length) {
      if (child instanceof _Obj2.default) {
        res += join(index, child.v, history);
      } else {
        res += join(index, child, history);
      }
      if (history.end) {
        break;
      }
    } else if (child instanceof _Obj2.default) {
      if (Array.isArray(child.v)) {
        res += joinObj(child.v, history);
        if (history.end) {
          break;
        }
      } else if (child.v instanceof _Element2.default) {
        history.end = true;
        break;
      } else {
        res += child.toSourceString();
      }
    } else if (child instanceof _Element2.default) {
      history.end = true;
      break;
    }
    //array逻辑和Obj里面相同
    else if (Array.isArray(child)) {
        res += joinObj(child, history);
        if (history.end) {
          break;
        }
      } else {
        res += _util2.default.stringify(child);
      }
  }
  return res;
}
//递归找到第一个不是text的为止，将之前的text拼接返回
function joinObj(arr, history) {
  var res = '';
  for (var i = 0, len = arr.length; i < len; i++) {
    var child = arr[i];
    if (history.end) {
      break;
    }
    if (Array.isArray(child)) {
      res += joinObj(child, history);
    } else if (child instanceof _Element2.default) {
      history.end = true;
      break;
    } else {
      res += _util2.default.stringify(child);
    }
  }
  return res;
}

function update(item, children, elem) {
  //从item的index开始往后找，直到不是text为止，拼接所有text进行更新
  var res = join(item.index, children, {});
  var cns = elem.childNodes;
  var textNode = cns[item.start];
  //神奇的地方，更新的对象是个DOM而不是TEXT，会发生在混杂情况下的t2d变化
  //如t1{t}t2{t}变为t1{d}t2{d}，t2记录的range的start在3，而其目前是第2个{d}的DOM，插入在t2d逻辑中
  if (textNode.nodeType == 1) {
    return;
  }
  var now = textNode.textContent;
  if (res != now) {
    //textContent自动转义，保留空白
    textNode.textContent = res;
  }
}

function value(item, children) {
  //从item的index开始往后找，直到不是text为止，拼接所有text进行更新
  return join(item.index, children, {});
}

function record(history, option) {
  if (option.first || option.prev == _type2.default.DOM) {
    option.record = history.slice();
  }
}

exports.default = {
  update: update,
  value: value,
  record: record
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hash = {};

exports.default = {
  add: function add(uid, cb) {
    hash[uid] = cb;
  },
  del: function del(uid) {
    var cb = hash[uid];
    if (cb) {
      window.removeEventListener('mouseup', cb, true);
      window.removeEventListener('touchend', cb, true);
      window.removeEventListener('touchcancel', cb, true);
      window.removeEventListener('blur', cb);
      window.removeEventListener('dragend', cb);
      delete hash[uid];
    }
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAX = 4096;
var cache = new Array(MAX);

var pool = {
  index: 0,
  add: function add(item) {
    if (!item.__hasDes && this.index < MAX) {
      cache[this.index++] = item;
      item.__hasDes = true;
    }
  },
  get: function get() {
    return cache[--this.index];
  }
};

exports.default = pool;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (e) {
  //chrome23+以上文本节点会相应事件取不到DOM对象
  if (e.target.nodeType == 3) {
    e.target = e.target.parentNode;
  }
};

;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hash = __webpack_require__(7);

var _hash2 = _interopRequireDefault(_hash);

var _matchUtil = __webpack_require__(17);

var _matchUtil2 = _interopRequireDefault(_matchUtil);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var res;

function delegate(e, json, top) {
  var elem = e.target;
  var vd = _hash2.default.get(elem.getAttribute('migi-uid'));
  //点击根元素忽略；不存在也忽略，比如非vd添加的dom没有migi-uid
  if (vd == top || !vd) {
    return [false];
  }
  var names = [];
  var classes = [];
  var ids = [];
  push(vd, names, classes, ids);
  var temp = vd;
  while (temp.parent && temp.parent != top) {
    temp = temp.parent;
    push(temp, names, classes, ids);
  }
  res = false;
  matchSel(names.length - 1, names, classes, ids, json, vd);
  //不同于样式，事件是冒泡的，所以最里层叶子结点也许是事件产生者，但没侦听，结果冒泡到父层被响应
  while (!res && names.length) {
    vd = vd.parent;
    names.pop();
    classes.pop();
    ids.pop();
    matchSel(names.length - 1, names, classes, ids, json, vd);
  }
  return [res, vd];
}

function push(vd, names, classes, ids) {
  names.unshift(vd.name);
  classes.unshift(_matchUtil2.default.splitClass(vd.__cache['class']));
  ids.unshift(_matchUtil2.default.preId(vd.__cache.id));
}

//从底部往上匹配，即.a .b这样的选择器是.b->.a逆序对比
//过程中只要不匹配就跳出，i从最大到0
function matchSel(i, names, classes, ids, json, virtualDom) {
  //只要有一次命中即跳出，不同于css样式全部递归完毕
  if (res) {
    return;
  }
  var combo = _matchUtil2.default.combo(classes[i], names[i], ids[i], json);
  for (var j = 0, len = combo.length; j < len; j++) {
    var k = combo[j];
    if (json.hasOwnProperty(k)) {
      var item = json[k];
      //还未到根节点继续匹配
      if (i) {
        matchSel(i - 1, names, classes, ids, item, virtualDom.parent);
        //多层级时需递归所有层级组合，如<div><p><span>对应div span{}的样式时，并非一一对应
        for (var l = i - 2; l >= 0; l--) {
          matchSel(l, names, classes, ids, item, virtualDom.parent);
        }
      }
      //将当前层次的值存入
      if (item.hasOwnProperty('_v')) {
        res = true;
        return;
      }
      //:和[可能同时存在，也可能分开
      if (item.hasOwnProperty('_:') || item.hasOwnProperty('_[')) {
        //有:[属性时，检查是否满足伪类情况，全部满足后追加样式
        var inAttr = function inAttr(item) {
          if (item && item.hasOwnProperty('_[')) {
            var item2 = item['_['];
            item2.forEach(function (attrItem) {
              var isMatch = _matchUtil2.default.attr(attrItem[0], virtualDom);
              if (isMatch) {
                item2 = attrItem[1];
                //同普通匹配一样
                if (i) {
                  matchSel(i - 1, names, classes, ids, item2, virtualDom.parent);
                }
                if (item2.hasOwnProperty('_v')) {
                  res = true;
                }
              }
            });
          }
        };

        var item2;
        //有:伪类时，检查是否满足伪类情况，全部满足后追加样式
        if (item.hasOwnProperty('_:')) {
          item2 = item['_:'];
          item2.forEach(function (pseudoItem) {
            var isMatch = _matchUtil2.default.pseudo(pseudoItem[0], virtualDom, k);
            if (isMatch) {
              item2 = pseudoItem[1];
              //同普通匹配一样
              if (i) {
                matchSel(i - 1, names, classes, ids, item2, virtualDom.parent);
              }
              if (item2.hasOwnProperty('_v')) {
                res = true;
              }
            }
          });
        }
        inAttr(item);
        inAttr(item2);
      }
      //父子选择器
      if (item.hasOwnProperty('_>')) {
        var item2 = item['_>'];
        matchSel(i - 1, names, classes, ids, item2, virtualDom.parent);
      }
      //相邻兄弟选择器
      if (item.hasOwnProperty('_+')) {
        var item2 = item['_+'];
        var prev = virtualDom.prev();
        if (prev) {
          Object.keys(item2).forEach(function (k) {
            if (_matchUtil2.default.nci(k, prev)) {
              return;
            }
            //将当前层次的值存入
            if (item2[k].hasOwnProperty('_v')) {
              res = true;
              return;
            }
            matchSel(i - 1, names, classes, ids, item2[k], virtualDom.parent);
          });
        }
      }
      //兄弟选择器
      if (item.hasOwnProperty('_~')) {
        var item2 = item['_~'];
        var prevAll = virtualDom.prevAll();
        if (prevAll.length) {
          var hasSibiling = false;
          for (var j = prevAll.length - 1; j >= 0; j--) {
            var prev = prevAll[j];
            Object.keys(item2).forEach(function (k) {
              if (_matchUtil2.default.nci(k, prev)) {
                return;
              }
              //将当前层次的值存入
              if (item2[k].hasOwnProperty('_v')) {
                res = true;
                return;
              }
              hasSibiling = true;
              matchSel(i - 1, names, classes, ids, item2[k], virtualDom.parent);
            });
            //一旦前方出现一次，即说明命中兄弟选择器，可以跳出继续判断下去的循环
            if (hasSibiling) {
              break;
            }
          }
        }
      }
    }
  }
}

exports.default = delegate;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var sid = 1;

var Stream = function () {
  function Stream(cid, iid) {
    _classCallCheck(this, Stream);

    this.sid = iid === undefined ? sid++ : iid;
    this.hash = {};
    this.hash[cid] = true;
  }

  _createClass(Stream, [{
    key: "add",
    value: function add(k) {
      this.hash[k] = true;
    }
  }, {
    key: "has",
    value: function has(k) {
      return this.hash.hasOwnProperty(k);
    }
  }], [{
    key: "now",
    value: function now() {
      return sid;
    }
  }, {
    key: "gen",
    value: function gen() {
      return sid++;
    }
  }]);

  return Stream;
}();

exports.default = Stream;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/

var userAgent = typeof window != 'undefined' ? navigator.userAgent : '';

/**
 * Instantiate fast-clicking listeners on the specified layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 * @param {Object} [options={}] The options to override the defaults
 */
function FastClick(layer, options) {
  var oldOnClick;

  options = options || {};

  /**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
  this.trackingClick = false;

  /**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
  this.trackingClickStart = 0;

  /**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
  this.targetElement = null;

  /**
   * X-coordinate of touch start event.
   *
   * @type number
   */
  this.touchStartX = 0;

  /**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
  this.touchStartY = 0;

  /**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
  this.lastTouchIdentifier = 0;

  /**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
  this.touchBoundary = options.touchBoundary || 10;

  /**
   * The FastClick layer.
   *
   * @type Element
   */
  this.layer = layer;

  /**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
  this.tapDelay = options.tapDelay || 200;

  /**
   * The maximum time for a tap
   *
   * @type number
   */
  this.tapTimeout = options.tapTimeout || 700;

  if (FastClick.notNeeded(layer)) {
    return;
  }

  // Some old versions of Android don't have Function.prototype.bind
  function bind(method, context) {
    return function () {
      return method.apply(context, arguments);
    };
  }

  var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
  var context = this;
  for (var i = 0, l = methods.length; i < l; i++) {
    context[methods[i]] = bind(context[methods[i]], context);
  }

  // Set up event handlers as required
  if (deviceIsAndroid) {
    layer.addEventListener('mouseover', this.onMouse, true);
    layer.addEventListener('mousedown', this.onMouse, true);
    layer.addEventListener('mouseup', this.onMouse, true);
  }

  layer.addEventListener('click', this.onClick, true);
  layer.addEventListener('touchstart', this.onTouchStart, false);
  layer.addEventListener('touchmove', this.onTouchMove, false);
  layer.addEventListener('touchend', this.onTouchEnd, false);
  layer.addEventListener('touchcancel', this.onTouchCancel, false);

  // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
  // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
  // layer when they are cancelled.
  if (!Event.prototype.stopImmediatePropagation) {
    layer.removeEventListener = function (type, callback, capture) {
      var rmv = Node.prototype.removeEventListener;
      if (type === 'click') {
        rmv.call(layer, type, callback.hijacked || callback, capture);
      } else {
        rmv.call(layer, type, callback, capture);
      }
    };

    layer.addEventListener = function (type, callback, capture) {
      var adv = Node.prototype.addEventListener;
      if (type === 'click') {
        adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
          if (!event.propagationStopped) {
            callback(event);
          }
        }), capture);
      } else {
        adv.call(layer, type, callback, capture);
      }
    };
  }

  // If a handler is already declared in the element's onclick attribute, it will be fired before
  // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
  // adding it as listener.
  if (typeof layer.onclick === 'function') {

    // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
    // - the old one won't work if passed to addEventListener directly.
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function (event) {
      oldOnClick(event);
    }, false);
    layer.onclick = null;
  }
}

/**
* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
*
* @type boolean
*/
var deviceIsWindowsPhone = userAgent.indexOf("Windows Phone") >= 0;

/**
 * Android requires exceptions.
 *
 * @type boolean
 */
var deviceIsAndroid = userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
var deviceIsIOS = /iP(ad|hone|od)/.test(userAgent) && !deviceIsWindowsPhone;

/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(userAgent);

/**
 * iOS 6.0-7.* requires the target element to be manually derived
 *
 * @type boolean
 */
var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(userAgent);

/**
 * BlackBerry requires exceptions.
 *
 * @type boolean
 */
var deviceIsBlackBerry10 = userAgent.indexOf('BB10') > 0;

/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function (target) {
  switch (target.nodeName.toLowerCase()) {

    // Don't send a synthetic click to disabled inputs (issue #62)
    case 'button':
    case 'select':
    case 'textarea':
      if (target.disabled) {
        return true;
      }

      break;
    case 'input':

      // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
      if (deviceIsIOS && target.type === 'file' || target.disabled) {
        return true;
      }

      break;
    case 'label':
    case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
    case 'video':
      return true;
  }

  return (/\bneedsclick\b/.test(target.className) || /\bneedsclick\b/.test(target.getAttribute('migi-class'))
  );
};

/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function (target) {
  switch (target.nodeName.toLowerCase()) {
    case 'textarea':
      return true;
    case 'select':
      return !deviceIsAndroid;
    case 'input':
      switch (target.type) {
        case 'button':
        case 'checkbox':
        case 'file':
        case 'image':
        case 'radio':
        case 'submit':
          return false;
      }

      // No point in attempting to focus disabled inputs
      return !target.disabled && !target.readOnly;
    default:
      return (/\bneedsfocus\b/.test(target.className)
      );
  }
};

/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function (targetElement, event) {
  var clickEvent, touch;

  // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
  if (deviceIsAndroid && document.activeElement && document.activeElement !== targetElement) {
    document.activeElement.blur();
  }

  touch = event.changedTouches[0];

  // Synthesise a click event, with an extra attribute so it can be tracked
  clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  clickEvent.forwardedTouchEvent = true;
  targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function (targetElement) {

  //Issue #159: Android Chrome Select Box does not open with a synthetic click event
  if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
    return 'mousedown';
  }

  return 'click';
};

/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function (targetElement) {
  var length;

  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'number' && targetElement.type !== 'email' && targetElement.type !== 'range') {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};

/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function (targetElement) {
  var scrollParent, parentElement;

  scrollParent = targetElement.fastClickScrollParent;

  // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
  // target element was moved to another parent.
  if (!scrollParent || !scrollParent.contains(targetElement)) {
    parentElement = targetElement;
    do {
      if (parentElement.scrollHeight > parentElement.offsetHeight) {
        scrollParent = parentElement;
        targetElement.fastClickScrollParent = parentElement;
        break;
      }

      parentElement = parentElement.parentElement;
    } while (parentElement);
  }

  // Always update the scroll top tracker if possible.
  if (scrollParent) {
    scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
  }
};

/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

  // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
  if (eventTarget.nodeType === Node.TEXT_NODE) {
    return eventTarget.parentNode;
  }

  return eventTarget;
};

/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function (event) {
  var targetElement, touch, selection;

  // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
  if (event.targetTouches.length > 1) {
    return true;
  }

  targetElement = this.getTargetElementFromEventTarget(event.target);
  touch = event.targetTouches[0];

  if (deviceIsIOS) {

    // Only trusted events will deselect text on iOS (issue #49)
    selection = window.getSelection();
    if (selection.rangeCount && !selection.isCollapsed) {
      return true;
    }

    if (!deviceIsIOS4) {

      // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
      // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
      // with the same identifier as the touch event that previously triggered the click that triggered the alert.
      // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
      // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
      // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
      // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
      // random integers, it's safe to to continue if the identifier is 0 here.
      if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
        event.preventDefault();
        return false;
      }

      this.lastTouchIdentifier = touch.identifier;

      // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
      // 1) the user does a fling scroll on the scrollable layer
      // 2) the user stops the fling scroll with another tap
      // then the event.target of the last 'touchend' event will be the element that was under the user's finger
      // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
      // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
      this.updateScrollParent(targetElement);
    }
  }

  this.trackingClick = true;
  this.trackingClickStart = event.timeStamp;
  this.targetElement = targetElement;

  this.touchStartX = touch.pageX;
  this.touchStartY = touch.pageY;

  // Prevent phantom clicks on fast double-tap (issue #36)
  if (event.timeStamp - this.lastClickTime < this.tapDelay) {
    event.preventDefault();
  }

  return true;
};

/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function (event) {
  var touch = event.changedTouches[0],
      boundary = this.touchBoundary;

  if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
    return true;
  }

  return false;
};

/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function (event) {
  if (!this.trackingClick) {
    return true;
  }

  // If the touch has moved, cancel the click tracking
  if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
    this.trackingClick = false;
    this.targetElement = null;
  }

  return true;
};

/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function (labelElement) {

  // Fast path for newer browsers supporting the HTML5 control attribute
  if (labelElement.control !== undefined) {
    return labelElement.control;
  }

  // All browsers under test that support touch events also support the HTML5 htmlFor attribute
  if (labelElement.htmlFor) {
    return document.getElementById(labelElement.htmlFor);
  }

  // If no for attribute exists, attempt to retrieve the first labellable descendant element
  // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
  return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};

/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function (event) {
  var forElement,
      trackingClickStart,
      targetTagName,
      scrollParent,
      touch,
      targetElement = this.targetElement;

  if (!this.trackingClick) {
    return true;
  }

  // Prevent phantom clicks on fast double-tap (issue #36)
  if (event.timeStamp - this.lastClickTime < this.tapDelay) {
    this.cancelNextClick = true;
    return true;
  }

  if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
    return true;
  }

  // Reset to prevent wrong click cancel on input (issue #156).
  this.cancelNextClick = false;

  this.lastClickTime = event.timeStamp;

  trackingClickStart = this.trackingClickStart;
  this.trackingClick = false;
  this.trackingClickStart = 0;

  // On some iOS devices, the targetElement supplied with the event is invalid if the layer
  // is performing a transition or scroll, and has to be re-detected manually. Note that
  // for this to function correctly, it must be called *after* the event target is checked!
  // See issue #57; also filed as rdar://13048589 .
  if (deviceIsIOSWithBadTarget) {
    touch = event.changedTouches[0];

    // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
    targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
    targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
  }

  targetTagName = targetElement.tagName.toLowerCase();
  if (targetTagName === 'label') {
    forElement = this.findControl(targetElement);
    if (forElement) {
      this.focus(targetElement);
      if (deviceIsAndroid) {
        return false;
      }

      targetElement = forElement;
    }
  } else if (this.needsFocus(targetElement)) {

    // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
    // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
    if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
      this.targetElement = null;
      return false;
    }

    this.focus(targetElement);
    this.sendClick(targetElement, event);

    // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
    // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
    if (!deviceIsIOS || targetTagName !== 'select') {
      this.targetElement = null;
      event.preventDefault();
    }

    return false;
  }

  if (deviceIsIOS && !deviceIsIOS4) {

    // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
    // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
    scrollParent = targetElement.fastClickScrollParent;
    if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
      return true;
    }
  }

  // Prevent the actual click from going though - unless the target node is marked as requiring
  // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
  if (!this.needsClick(targetElement)) {
    event.preventDefault();
    this.sendClick(targetElement, event);
  }

  return false;
};

/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function () {
  this.trackingClick = false;
  this.targetElement = null;
};

/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function (event) {

  // If a target element was never set (because a touch event was never fired) allow the event
  if (!this.targetElement) {
    return true;
  }

  if (this.targetElement.nodeName.toLowerCase() == 'canvas') {
    return true;
  }

  if (event.forwardedTouchEvent) {
    return true;
  }

  // Programmatically generated events targeting a specific element should be permitted
  if (!event.cancelable) {
    return true;
  }

  // Derive and check the target element to see whether the mouse event needs to be permitted;
  // unless explicitly enabled, prevent non-touch click events from triggering actions,
  // to prevent ghost/doubleclicks.
  if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

    // Prevent any user-added listeners declared on FastClick element from being fired.
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {

      // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
      event.propagationStopped = true;
    }

    // Cancel the event
    event.stopPropagation();
    event.preventDefault();

    return false;
  }

  // If the mouse event is permitted, return true for the action to go through.
  return true;
};

/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function (event) {
  /**
   * 当阻止事件冒泡来模拟shadowDom时，fastclick会调用2次，1为默认的body，2为本shadowDom
   * 如此捕获阶段便会触发2次，1为默认的body，2为本shadowDom，且并无大碍
   * 但会发生点透现象，在2次捕获回调后、冒泡回调、再发生原生的click，原生捕获回调触发在body上
   * 此时有个特点，既无this.targetElement，event又无forwardedTouchEvent
   * 没有this.targetElement是因为shadowDom阻止了冒泡
   * 没有forwardedTouchEvent是因为这是个原生的重复发生的点击
   * 此时可以进行this.onMouse中的stopImmediatePropagation()操作
   * 如此便可防止点透
   */
  if (!this.targetElement && !event.forwardedTouchEvent) {
    // Prevent any user-added listeners declared on FastClick element from being fired.
    if (event.stopImmediatePropagation) {
      event.stopImmediatePropagation();
    } else {
      // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
      event.propagationStopped = true;
    }
    // Cancel the event
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  var permitted;

  // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
  if (this.trackingClick) {
    this.targetElement = null;
    this.trackingClick = false;
    return true;
  }

  // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
  if (event.target.type === 'submit' && event.detail === 0) {
    return true;
  }

  permitted = this.onMouse(event);

  // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
  if (!permitted) {
    this.targetElement = null;
  }

  // If clicks are permitted, return true for the action to go through.
  return permitted;
};

/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function () {
  var layer = this.layer;

  if (deviceIsAndroid) {
    layer.removeEventListener('mouseover', this.onMouse, true);
    layer.removeEventListener('mousedown', this.onMouse, true);
    layer.removeEventListener('mouseup', this.onMouse, true);
  }

  layer.removeEventListener('click', this.onClick, true);
  layer.removeEventListener('touchstart', this.onTouchStart, false);
  layer.removeEventListener('touchmove', this.onTouchMove, false);
  layer.removeEventListener('touchend', this.onTouchEnd, false);
  layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};

/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function (layer) {
  var metaViewport;
  var chromeVersion;
  var blackberryVersion;
  var firefoxVersion;

  // Devices that don't support touch don't need FastClick
  if (typeof window.ontouchstart === 'undefined') {
    return true;
  }

  // Chrome version - zero for other browsers
  chromeVersion = +(/Chrome\/([0-9]+)/.exec(userAgent) || [, 0])[1];

  if (chromeVersion) {

    if (deviceIsAndroid) {
      metaViewport = document.querySelector('meta[name=viewport]');

      if (metaViewport) {
        // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
          return true;
        }
        // Chrome 32 and above with width=device-width or less don't need FastClick
        if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
          return true;
        }
      }

      // Chrome desktop doesn't need FastClick (issue #15)
    } else {
      return true;
    }
  }

  if (deviceIsBlackBerry10) {
    blackberryVersion = userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

    // BlackBerry 10.3+ does not require Fastclick library.
    // https://github.com/ftlabs/fastclick/issues/251
    if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
      metaViewport = document.querySelector('meta[name=viewport]');

      if (metaViewport) {
        // user-scalable=no eliminates click delay.
        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
          return true;
        }
        // width=device-width (or less than device-width) eliminates click delay.
        if (document.documentElement.scrollWidth <= window.outerWidth) {
          return true;
        }
      }
    }
  }

  // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
  if (layer.style.msTouchAction === 'none' || layer.style.msTouchAction === 'manipulation') {
    return true;
  }

  // Firefox version - zero for other browsers
  firefoxVersion = +(/Firefox\/([0-9]+)/.exec(userAgent) || [, 0])[1];

  if (firefoxVersion >= 27) {
    // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

    metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
      return true;
    }
  }

  // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
  // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
  if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
    return true;
  }

  return false;
};

/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} [options={}] The options to override the defaults
 */
FastClick.attach = function (layer, options) {
  return new FastClick(layer, options);
};

exports.default = FastClick;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model2 = __webpack_require__(12);

var _Model3 = _interopRequireDefault(_Model2);

var _CacheComponent = __webpack_require__(28);

var _CacheComponent2 = _interopRequireDefault(_CacheComponent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CacheModel = function (_Model) {
  _inherits(CacheModel, _Model);

  function CacheModel() {
    _classCallCheck(this, CacheModel);

    var _this = _possibleConstructorReturn(this, (CacheModel.__proto__ || Object.getPrototypeOf(CacheModel)).call(this));

    _this.__handler = {}; //普通状态下缓存data key的hash
    _this.__ccb = false; //缓存1ms再数据分发的是否在缓存时间内的状态标识
    _this.__handler2 = {}; //handler的副本，每次handler被重置为空后保留缓存值
    _this.__timeout;
    _this.__timecb;
    return _this;
  }

  return CacheModel;
}(_Model3.default);

CacheModel.prototype.__data = _CacheComponent2.default.prototype.__data;

exports.default = CacheModel;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _Component2 = __webpack_require__(5);

var _Component3 = _interopRequireDefault(_Component2);

var _EventBus = __webpack_require__(11);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Stream = __webpack_require__(25);

var _Stream2 = _interopRequireDefault(_Stream);

var _CacheModel = __webpack_require__(27);

var _CacheModel2 = _interopRequireDefault(_CacheModel);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CacheComponent = function (_Component) {
  _inherits(CacheComponent, _Component);

  function CacheComponent() {
    var _ref;

    _classCallCheck(this, CacheComponent);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = CacheComponent.__proto__ || Object.getPrototypeOf(CacheComponent)).call.apply(_ref, [this].concat(data)));

    _this.__handler = {}; //缓存data key的hash
    _this.__ccb = false; //缓存1ms再数据分发的是否在缓存时间内的状态标识
    _this.__handler2 = {}; //handler的副本，每次handler被重置为空后保留缓存值
    _this.__timeout;
    _this.__timecb;
    return _this;
  }

  //@overwrite


  _createClass(CacheComponent, [{
    key: '__data',
    value: function __data(k) {
      var self = this;
      //set触发数据变更时，若已DOM则打开开关
      if (self.dom) {
        self.__canData = true;
      }

      if (!Array.isArray(k)) {
        k = [k];
      }
      //没有缓存根据是否桥接模式赋予stream对象或生成sid
      k.forEach(function (k) {
        if (!self.__handler.hasOwnProperty(k)) {
          self.__handler[k] = self.__stream || _Stream2.default.gen();
        } else {
          var item = self.__handler[k];
          //新stream的sid必须大于老stream的sid或sid才能覆盖
          if (self.__stream) {
            if (item instanceof _Stream2.default) {
              if (item.sid < self.__stream.sid) {
                self.__handler[k] = self.__stream;
              }
            } else if (item < self.__stream.sid) {
              self.__handler[k] = self.__stream;
            }
          }
          //非stream触发更新即主动数据更新
          //当缓存是bridge时，Stream当前的sid>=缓存的sid即说明是发生在bridge之后的
          else {
              var now = _Stream2.default.now();
              if (item instanceof _Stream2.default) {
                if (item.sid <= now) {
                  self.__handler[k] = now;
                }
              } else if (item < now) {
                self.__handler[k] = now;
              }
            }
        }
      });
      if (!self.__ccb) {
        self.__ccb = true;
        //1ms后触发数据变更并重设状态
        self.__timeout = setTimeout(self.__timecb = function () {
          self.__ccb = false;
          var temp = self.__handler;
          var keys = Object.keys(temp);
          self.__handler = {};
          //赋值更新状态的sid到缓存
          keys.forEach(function (key) {
            var item = temp[key];
            self.__handler2[key] = item.sid || item;
          });
          //可能被清空
          if (keys.length) {
            self.__onData(keys);
            self.emit(_Event2.default.DATA, keys.length > 1 ? keys : keys[0]);
            keys.forEach(function (key) {
              var stream = temp[key];
              //被桥接触发记录的是stream
              if (stream instanceof _Stream2.default) {
                if (self.__bridgeHash) {
                  var bridge = self.__bridgeHash[key];
                  if (bridge) {
                    bridge.forEach(function (item) {
                      var target = item.target;
                      var name = item.name;
                      var middleware = item.middleware;
                      if (!stream.has(target.uid)) {
                        stream.add(target.uid);
                        //必须大于桥接对象的sid才生效
                        var tItem = CacheComponent.getSid(target, name);
                        if (stream.sid > tItem) {
                          //先设置桥接对象数据为桥接模式，修改数据后再恢复
                          target.__stream = stream;
                          target[name] = middleware ? middleware.call(self, self[key]) : self[key];
                          target.__stream = null;
                        }
                      }
                    });
                  }
                }
              } else if (self.__bridgeHash) {
                var bridge = self.__bridgeHash[key];
                if (bridge) {
                  stream = new _Stream2.default(self.uid, temp[key]);
                  bridge.forEach(function (item) {
                    var target = item.target;
                    var name = item.name;
                    var middleware = item.middleware;
                    //作为主动发起数据变更方，第一位无需检查重复
                    stream.add(target.uid);
                    if (target instanceof _EventBus2.default) {
                      target.emit(_Event2.default.DATA, name, middleware ? middleware.call(self, self[key]) : self[key], stream);
                    } else {
                      //必须大于桥接对象的sid才生效
                      var tItem = CacheComponent.getSid(target, name);
                      if (stream.sid > tItem) {
                        //先设置桥接对象数据为桥接模式，修改数据后再恢复
                        target.__stream = stream;
                        target[name] = middleware ? middleware.call(self, self[key]) : self[key];
                        target.__stream = null;
                      }
                    }
                  });
                }
              }
            });
          }
        }, 0);
      }
    }
  }, {
    key: 'flush',
    value: function flush() {
      if (this.__timeout) {
        clearTimeout(this.__timeout);
        this.__ccb = false;
        this.__timecb();
      }
    }
  }], [{
    key: 'getSid',
    value: function getSid(target, name) {
      if (target instanceof CacheComponent || target instanceof _CacheModel2.default) {
        var tItem = target.__handler[name] || target.__handler2[name] || 0;
        return tItem.sid || tItem;
      }
      return 0;
    }
  }]);

  return CacheComponent;
}(_Component3.default);

exports.default = CacheComponent;

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _forEach = Function.call.bind(Array.prototype.forEach);
var _call = Function.call.bind(Function.call);
var _apply = Function.call.bind(Function.apply);
var _floor = Math.floor;
var _abs = Math.abs;
var _toString = Function.call.bind(Object.prototype.toString);

var isCallable =  false ? function IsCallableSlow(x) {
  // Some old browsers (IE, FF) say that typeof /abc/ === 'function'
  return typeof x === 'function' && _toString(x) === '[object Function]';
} : function IsCallableFast(x) {
  return typeof x === 'function';
};

var ES = {
  Call: function Call(F, V) {
    var args = arguments.length > 2 ? arguments[2] : [];
    if (!ES.IsCallable(F)) {
      throw new TypeError(F + ' is not a function');
    }
    return _apply(F, V, args);
  },
  TypeIsObject: function TypeIsObject(x) {
    if (x === void 0 || x === null || x === true || x === false) {
      return false;
    }
    return typeof x === 'function' || (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
  },
  ToObject: function ToObject(o, optMessage) {
    return Object(ES.RequireObjectCoercible(o, optMessage));
  },
  IsCallable: isCallable,
  IsConstructor: function IsConstructor(x) {
    // We can't tell callables from constructors in ES5
    return ES.IsCallable(x);
  },
  GetMethod: function GetMethod(o, p) {
    var func = ES.ToObject(o)[p];
    if (func === void 0 || func === null) {
      return void 0;
    }
    if (!ES.IsCallable(func)) {
      throw new TypeError('Method not callable: ' + p);
    }
    return func;
  },
  RequireObjectCoercible: function RequireObjectCoercible(x, optMessage) {
    /* jshint eqnull:true */
    if (x == null) {
      throw new TypeError(optMessage || 'Cannot call method on ' + x);
    }
    return x;
  },
  ToLength: function ToLength(value) {
    var len = ES.ToInteger(value);
    if (len <= 0) {
      return 0;
    } // includes converting -0 to +0
    if (len > Number.MAX_SAFE_INTEGER) {
      return Number.MAX_SAFE_INTEGER;
    }
    return len;
  },
  ToNumber: function ToNumber(value) {
    if (_toString(value) === '[object Symbol]') {
      throw new TypeError('Cannot convert a Symbol value to a number');
    }
    return +value;
  },
  ToInteger: function ToInteger(value) {
    var number = ES.ToNumber(value);
    if (numberIsNaN(number)) {
      return 0;
    }
    if (number === 0 || !numberIsFinite(number)) {
      return number;
    }
    return (number > 0 ? 1 : -1) * _floor(_abs(number));
  },
  GetIterator: function GetIterator(o) {
    if (isArguments(o)) {
      // special case support for `arguments`
      return new ArrayIterator(o, 'value');
    }
    var itFn = ES.GetMethod(o, $iterator$);
    if (!ES.IsCallable(itFn)) {
      // Better diagnostics if itFn is null or undefined
      throw new TypeError('value is not an iterable');
    }
    var it = ES.Call(itFn, o);
    if (!ES.TypeIsObject(it)) {
      throw new TypeError('bad iterator');
    }
    return it;
  },
  IteratorClose: function IteratorClose(iterator, completionIsThrow) {
    var returnMethod = ES.GetMethod(iterator, 'return');
    if (returnMethod === void 0) {
      return;
    }
    var innerResult, innerException;
    try {
      innerResult = ES.Call(returnMethod, iterator);
    } catch (e) {
      innerException = e;
    }
    if (completionIsThrow) {
      return;
    }
    if (innerException) {
      throw innerException;
    }
    if (!ES.TypeIsObject(innerResult)) {
      throw new TypeError("Iterator's return method returned a non-object.");
    }
  },
  IteratorNext: function IteratorNext(it) {
    var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
    if (!ES.TypeIsObject(result)) {
      throw new TypeError('bad iterator');
    }
    return result;
  },
  IteratorStep: function IteratorStep(it) {
    var result = ES.IteratorNext(it);
    var done = ES.IteratorComplete(result);
    return done ? false : result;
  },
  IteratorComplete: function IteratorComplete(iterResult) {
    return !!iterResult.done;
  }
};

var getGlobal = function getGlobal() {
  /* global self, window, global */
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};

var globals = getGlobal();

var globalIsFinite = globals.isFinite;

var numberIsNaN = Number.isNaN || function isNaN(value) {
  // NaN !== NaN, but they are identical.
  // NaNs are the only non-reflexive value, i.e., if x !== x,
  // then x is NaN.
  // isNaN is broken: it converts its argument to number, so
  // isNaN('foo') => true
  return value !== value;
};
var numberIsFinite = Number.isFinite || function isFinite(value) {
  return typeof value === 'number' && globalIsFinite(value);
};

var Type = {
  primitive: function primitive(x) {
    return x === null || typeof x !== 'function' && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) !== 'object';
  },
  object: function object(x) {
    return x !== null && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object';
  },
  string: function string(x) {
    return _toString(x) === '[object String]';
  },
  regex: function regex(x) {
    return _toString(x) === '[object RegExp]';
  },
  symbol: function symbol(x) {
    return typeof globals.Symbol === 'function' && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'symbol';
  }
};

var _Symbol = globals.Symbol || {};

var $iterator$ = Type.symbol(_Symbol.iterator) ? _Symbol.iterator : '_es6-shim iterator_';
// Firefox ships a partial implementation using the name @@iterator.
// https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
// So use that name if we detect it.
if (globals.Set && typeof new globals.Set()['@@iterator'] === 'function') {
  $iterator$ = '@@iterator';
}

function isArguments(value) {
  return _toString(value) === '[object Arguments]';
}

var ArrayShims = {
  from: function from(items) {
    var C = this;
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;
    var mapping, T;
    if (mapFn === void 0) {
      mapping = false;
    } else {
      if (!ES.IsCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }
      T = arguments.length > 2 ? arguments[2] : void 0;
      mapping = true;
    }

    // Note that that Arrays will use ArrayIterator:
    // https://bugs.ecmascript.org/show_bug.cgi?id=2416
    var usingIterator = typeof (isArguments(items) || ES.GetMethod(items, $iterator$)) !== 'undefined';

    var length, result, i;
    if (usingIterator) {
      result = ES.IsConstructor(C) ? Object(new C()) : [];
      var iterator = ES.GetIterator(items);
      var next, nextValue;

      i = 0;
      while (true) {
        next = ES.IteratorStep(iterator);
        if (next === false) {
          break;
        }
        nextValue = next.value;
        try {
          if (mapping) {
            nextValue = T === undefined ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i);
          }
          result[i] = nextValue;
        } catch (e) {
          ES.IteratorClose(iterator, true);
          throw e;
        }
        i += 1;
      }
      length = i;
    } else {
      var arrayLike = ES.ToObject(items);
      length = ES.ToLength(arrayLike.length);
      result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
      var value;
      for (i = 0; i < length; ++i) {
        value = arrayLike[i];
        if (mapping) {
          value = T !== undefined ? _call(mapFn, T, value, i) : mapFn(value, i);
        }
        result[i] = value;
      }
    }

    result.length = length;
    return result;
  }
};

var throwsError = function throwsError(func) {
  try {
    func();
    return false;
  } catch (e) {
    return true;
  }
};

var arePropertyDescriptorsSupported = function arePropertyDescriptorsSupported() {
  // if Object.defineProperty exists but throws, it's IE 8
  return !throwsError(function () {
    Object.defineProperty({}, 'x', { get: function get() {} });
  });
};

var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function defineProperty(object, name, value, force) {
  if (!force && name in object) {
    return;
  }
  if (supportsDescriptors) {
    Object.defineProperty(object, name, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: value
    });
  } else {
    object[name] = value;
  }
};

var defineProperties = function defineProperties(object, map, forceOverride) {
  _forEach(Object.keys(map), function (name) {
    var method = map[name];
    defineProperty(object, name, method, !!forceOverride);
  });
};

defineProperties(Array, ArrayShims);

var maxSafeInteger = Math.pow(2, 53) - 1;

defineProperties(Number, {
  MAX_SAFE_INTEGER: maxSafeInteger,
  MIN_SAFE_INTEGER: -maxSafeInteger
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(37)['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _Element = __webpack_require__(4);

var _Element2 = _interopRequireDefault(_Element);

var _EventBus = __webpack_require__(11);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Model = __webpack_require__(12);

var _Model2 = _interopRequireDefault(_Model);

var _CacheModel = __webpack_require__(27);

var _CacheModel2 = _interopRequireDefault(_CacheModel);

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

var _VirtualDom = __webpack_require__(8);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _NonVisualComponent = __webpack_require__(44);

var _NonVisualComponent2 = _interopRequireDefault(_NonVisualComponent);

var _CacheComponent = __webpack_require__(28);

var _CacheComponent2 = _interopRequireDefault(_CacheComponent);

var _Obj = __webpack_require__(9);

var _Obj2 = _interopRequireDefault(_Obj);

var _Cb = __webpack_require__(13);

var _Cb2 = _interopRequireDefault(_Cb);

var _cachePool = __webpack_require__(22);

var _cachePool2 = _interopRequireDefault(_cachePool);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(14);

var _browser2 = _interopRequireDefault(_browser);

var _sort = __webpack_require__(16);

var _sort2 = _interopRequireDefault(_sort);

var _hash = __webpack_require__(7);

var _hash2 = _interopRequireDefault(_hash);

var _Fastclick = __webpack_require__(26);

var _Fastclick2 = _interopRequireDefault(_Fastclick);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var migi = {
  render: function render(element, dom) {
    if (dom) {
      element.appendTo(dom);
    }
    return element;
  },

  // 提前或服务器端渲染，仅输出，不触发DOM事件
  preRender: function preRender(element) {
    return element.toString();
  },
  preExist: function preExist(element) {
    element.preString();
    return element.emit(_Event2.default.DOM);
  },
  createCp: function createCp(cp, props, children) {
    return _hash2.default.set(new cp(props, children));
  },
  createVd: function createVd(name, props, children) {
    if (name == 'style' || name == 'script') {
      throw new Error('can not create VirtualDom of: ' + name);
    }
    return _hash2.default.set(_cachePool2.default.index ? _cachePool2.default.get().__reset(name, props, children) : new _VirtualDom2.default(name, props, children));
  },

  Event: _Event2.default,
  Model: _Model2.default,
  CacheModel: _CacheModel2.default,
  EventBus: _EventBus2.default,
  eventBus: new _EventBus2.default(),
  Element: _Element2.default,
  Component: _Component2.default,
  NonVisualComponent: _NonVisualComponent2.default,
  CacheComponent: _CacheComponent2.default,
  VirtualDom: _VirtualDom2.default,
  Obj: _Obj2.default,
  Cb: _Cb2.default,
  util: _util2.default,
  browser: _browser2.default,
  sort: _sort2.default,
  hash: _hash2.default,
  Fastclick: _Fastclick2.default,
  name: function name(Class, _name) {
    if (_Component2.default.prototype.isPrototypeOf(Class.prototype)) {
      Class.__migiName = _name;
    }
  }
};

if (typeof window != 'undefined') {
  window.migi = migi;
  if (document.body) {
    _Fastclick2.default.attach(document.body);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      _Fastclick2.default.attach(document.body);
    });
  }
} else if (typeof global != 'undefined') {
  global.migi = migi;
}

exports.default = migi;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VirtualDom = __webpack_require__(8);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _sort = __webpack_require__(16);

var _sort2 = _interopRequireDefault(_sort);

var _hash = __webpack_require__(7);

var _hash2 = _interopRequireDefault(_hash);

var _matchHash = __webpack_require__(21);

var _matchHash2 = _interopRequireDefault(_matchHash);

var _matchUtil = __webpack_require__(17);

var _matchUtil2 = _interopRequireDefault(_matchUtil);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

//names,classes,ids为从当前节点开始往上的列表
//style为jaw传入的总样式对象
//virtualDom当前传入的VirtualDom对象
//first为初始化时第一次
function match(names, classes, ids, style, virtualDom, first) {
  var res = [];
  matchSel(names.length - 1, names, classes, ids, style.default, virtualDom, res, first);
  //如果有media query
  if (style.media) {
    style.media.forEach(function (media) {
      var match = false;
      media.query.forEach(function (qlist) {
        //中一个即命中不再往下匹配
        if (match) {
          return;
        }
        for (var i = 0, len = qlist.length; i < len; i++) {
          var item = qlist[i];
          //Array/String类型标明是否有值，目前只支持Array
          if (Array.isArray(item)) {
            var k = item[0].replace(/^-[a-z]+-/i, '').replace(/^mso-/i, '').toLowerCase();
            var v = item[1];
            //只支持px单位
            if (/(px|\d)$/.test(v)) {
              v = v.replace(/px$/, '');
              switch (k) {
                case 'width':
                case 'height':
                  var cur = getCur(k);
                  if (cur == v) {
                    match = true;
                    matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                    return;
                  }
                  break;
                case 'min-width':
                case 'max-width':
                case 'min-height':
                case 'max-height':
                  var cur = getCur(k.slice(4));
                  if (k.indexOf('min-') == 0) {
                    if (cur >= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  } else {
                    if (cur <= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  }
                  break;
                case 'device-width':
                case 'device-height':
                  var cur = window.screen[k.slice(7)];
                  if (cur == v) {
                    match = true;
                    matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                  }
                  break;
                case 'min-device-width':
                case 'min-device-height':
                case 'max-device-width':
                case 'max-device-height':
                  var cur = window.screen[k.slice(11)];
                  if (k.indexOf('min-') == 0) {
                    if (cur >= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  } else {
                    if (cur <= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  }
                  break;
                case 'aspect-ratio':
                  var w = getCur('width');
                  var h = getCur('height');
                  var cur = w / h;
                  var val = v.split('/');
                  val = val[0] / val[1];
                  if (cur == val) {
                    match = true;
                    matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                    return;
                  }
                  break;
                case 'min-aspect-ratio':
                case 'max-aspect-ratio':
                  var w = getCur('width');
                  var h = getCur('height');
                  var cur = w / h;
                  var val = v.split('/');
                  val = val[0] / val[1];
                  if (k.indexOf('min-') == 0) {
                    if (cur >= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  } else {
                    if (cur <= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  }
                  break;
                case 'device-aspect-ratio':
                  var w = window.screen.width;
                  var h = window.screen.height;
                  var cur = w / h;
                  var val = v.split('/');
                  val = val[0] / val[1];
                  if (cur == val) {
                    match = true;
                    matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                    return;
                  }
                  break;
                case 'min-device-aspect-ratio':
                case 'max-device-aspect-ratio':
                  var w = window.screen.width;
                  var h = window.screen.height;
                  var cur = w / h;
                  var val = v.split('/');
                  val = val[0] / val[1];
                  if (k.indexOf('min-') == 0) {
                    if (cur >= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  } else {
                    if (cur <= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  }
                  break;
                case 'device-pixel-ratio':
                  var cur = window.devicePixelRatio;
                  if (cur == v) {
                    match = true;
                    matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                    return;
                  }
                  break;
                case 'min-device-pixel-ratio':
                case 'max-device-pixel-ratio':
                  var cur = window.devicePixelRatio;
                  if (k.indexOf('min-') == 0) {
                    if (cur >= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  } else {
                    if (cur <= v) {
                      match = true;
                      matchSel(names.length - 1, names, classes, ids, media.style, virtualDom, res, first);
                      return;
                    }
                  }
                  break;
              }
            }
          }
        }
      });
    });
    //窗口resize时重新匹配@media query
    if (first) {
      var resize = function resize() {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
          _hash2.default.get(virtualDom.uid).__updateStyle();
        }, 100);
      };

      var timeout;

      window.addEventListener('resize', resize);
      _matchHash2.default.add(virtualDom.uid, resize);
    }
  }
  (0, _sort2.default)(res, function (a, b) {
    var pa = a[2];
    var pb = b[2];
    //引用相等比较出现顺序
    if (pa == pb) {
      return a[0] > b[0];
    }
    //优先级不相等
    for (var i = 0; i < 3; i++) {
      if (pa[i] != pb[i]) {
        return pa[i] > pb[i];
      }
    }
    //优先级相等比较出现顺序
    return a[0] > b[0];
  });
  var s = '';
  res.forEach(function (item) {
    s += item[1] + ';';
  });
  return s;
}
//从底部往上匹配，即.a .b这样的选择器是.b->.a逆序对比
//过程中只要不匹配就跳出，i从最大到0
function matchSel(i, names, classes, ids, style, virtualDom, res, first, isChild) {
  var combo = _matchUtil2.default.combo(classes[i], names[i], ids[i], style);
  for (var j = 0, len = combo.length; j < len; j++) {
    var k = combo[j];
    if (style.hasOwnProperty(k)) {
      var item = style[k];
      //还未到根节点继续匹配
      if (i) {
        matchSel(i - 1, names, classes, ids, item, virtualDom.parent, res, first);
        //多层级时需递归所有层级组合，如<div><p><span>对应div span{}的样式时，并非一一对应
        if (!isChild) {
          for (var l = i - 2; l >= 0; l--) {
            matchSel(l, names, classes, ids, item, virtualDom.parent, res, first);
          }
        }
      }
      //将当前层次的值存入
      if (item.hasOwnProperty('_v')) {
        dealStyle(res, item);
      }
      //首次进入处理:伪类
      if (first && item.hasOwnProperty('_:')) {
        item['_:'].forEach(function (pseudoItem) {
          pseudoItem[0].forEach(function (pseudo) {
            var uid = virtualDom.uid;
            switch (pseudo) {
              case 'hover':
                var onHover = function onHover() {
                  //因为vd可能destroy导致被回收，所以每次动态从hash中取当前的vd
                  _hash2.default.get(uid).__hover = true;
                  _hash2.default.get(uid).__updateStyle();
                };

                var outHover = function outHover() {
                  _hash2.default.get(uid).__hover = false;
                  _hash2.default.get(uid).__updateStyle();
                };

                var cb = function cb() {
                  virtualDom.element.addEventListener('mouseenter', onHover);
                  virtualDom.element.addEventListener('mouseleave', outHover);
                };
                //可能由DOMDiff发起，此时已经在DOM上了


                if (virtualDom.__dom) {
                  cb();
                } else {
                  virtualDom.once(_Event2.default.DOM, cb);
                }
                //记录缓存当destryo时移除
                virtualDom.__onHover = onHover;
                virtualDom.__outHover = outHover;
                break;
              case 'active':
                var onActive = function onActive() {
                  //因为vd可能destroy导致被回收，所以每次动态从hash中取当前的vd
                  _hash2.default.get(uid).__active = true;
                  _hash2.default.get(uid).__updateStyle();
                };

                var outActive = function outActive() {
                  _hash2.default.get(uid).__active = false;
                  _hash2.default.get(uid).__updateStyle();
                };

                var cb2 = function cb2() {
                  virtualDom.element.addEventListener('mousedown', onActive);
                  //鼠标弹起捕获body，因为可能会移出元素后再弹起，且事件被shadow化阻止冒泡了
                  window.addEventListener('mouseup', outActive, true);
                  //touchend也失焦
                  window.addEventListener('touchend', outActive, true);
                  //touchcancel也失焦
                  window.addEventListener('touchcancel', outActive, true);
                  //window失焦时也需判断
                  window.addEventListener('blur', outActive);
                  //drag结束时也需判断
                  window.addEventListener('dragend', outActive);
                };
                //可能由DOMDiff发起，此时已经在DOM上了


                if (virtualDom.__dom) {
                  cb2();
                } else {
                  virtualDom.once(_Event2.default.DOM, cb2);
                }
                //对window的侦听需要在destroy后移除，先记录下来
                _matchHash2.default.add(uid, outActive);
                break;
            }
          });
        });
      }
      //:和[可能同时存在，也可能分开
      if (item.hasOwnProperty('_:') || item.hasOwnProperty('_[')) {
        //有:[属性时，检查是否满足伪类情况，全部满足后追加样式
        var inAttr = function inAttr(item) {
          if (item && item.hasOwnProperty('_[')) {
            var item2 = item['_['];
            item2.forEach(function (attrItem) {
              var isMatch = _matchUtil2.default.attr(attrItem[0], virtualDom);
              if (isMatch) {
                item2 = attrItem[1];
                //同普通匹配一样
                if (i) {
                  matchSel(i - 1, names, classes, ids, item2, virtualDom.parent, res, first);
                }
                if (item2.hasOwnProperty('_v')) {
                  dealStyle(res, item2);
                }
              }
            });
          }
        };

        var item2;
        //有:伪类时，检查是否满足伪类情况，全部满足后追加样式
        if (item.hasOwnProperty('_:')) {
          item2 = item['_:'];
          item2.forEach(function (pseudoItem) {
            var isMatch = _matchUtil2.default.pseudo(pseudoItem[0], virtualDom, k);
            if (isMatch) {
              item2 = pseudoItem[1];
              //同普通匹配一样
              if (i) {
                matchSel(i - 1, names, classes, ids, item2, virtualDom.parent, res, first);
              }
              if (item2.hasOwnProperty('_v')) {
                dealStyle(res, item2);
              }
            }
          });
        }
        inAttr(item);
        inAttr(item2);
      }
      //父子选择器
      if (item.hasOwnProperty('_>')) {
        var item2 = item['_>'];
        matchSel(i - 1, names, classes, ids, item2, virtualDom.parent, res, false, isChild);
      }
      //相邻兄弟选择器
      if (item.hasOwnProperty('_+')) {
        var item2 = item['_+'];
        var prev = virtualDom.prev();
        if (prev) {
          Object.keys(item2).forEach(function (k) {
            if (_matchUtil2.default.nci(k, prev)) {
              return;
            }
            //将当前层次的值存入
            if (item2[k].hasOwnProperty('_v')) {
              dealStyle(res, item2[k]);
            }
            matchSel(i - 1, names, classes, ids, item2[k], virtualDom.parent, res, false, isChild);
          });
        }
      }
      //兄弟选择器
      if (item.hasOwnProperty('_~')) {
        var item2 = item['_~'];
        var prevAll = virtualDom.prevAll();
        if (prevAll.length) {
          var hasSibiling = false;
          for (var j = prevAll.length - 1; j >= 0; j--) {
            var prev = prevAll[j];
            Object.keys(item2).forEach(function (k) {
              if (_matchUtil2.default.nci(k, prev)) {
                return;
              }
              //将当前层次的值存入
              if (item2[k].hasOwnProperty('_v')) {
                dealStyle(res, item2[k]);
              }
              hasSibiling = true;
              matchSel(i - 1, names, classes, ids, item2[k], virtualDom.parent, res, false, isChild);
            });
            //一旦前方出现一次，即说明命中兄弟选择器，可以跳出继续判断下去的循环
            if (hasSibiling) {
              break;
            }
          }
        }
      }
    }
  }
}

function dealStyle(res, item) {
  item._v.forEach(function (style) {
    style[2] = item._p;
    res.push(style);
  });
}

function getCur(k) {
  var key = k.charAt(0).toUpperCase() + k.slice(1);
  return window['inner' + key] || document.documentElement['client' + key] || document.body['client' + key];
}

exports.default = match;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _Element = __webpack_require__(4);

var _Element2 = _interopRequireDefault(_Element);

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

var _Cb = __webpack_require__(13);

var _Cb2 = _interopRequireDefault(_Cb);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(14);

var _browser2 = _interopRequireDefault(_browser);

var _range = __webpack_require__(20);

var _range2 = _interopRequireDefault(_range);

var _cachePool = __webpack_require__(22);

var _cachePool2 = _interopRequireDefault(_cachePool);

var _type = __webpack_require__(15);

var _type2 = _interopRequireDefault(_type);

var _hash = __webpack_require__(7);

var _hash2 = _interopRequireDefault(_hash);

var _matchHash = __webpack_require__(21);

var _matchHash2 = _interopRequireDefault(_matchHash);

var _fixEvent = __webpack_require__(23);

var _fixEvent2 = _interopRequireDefault(_fixEvent);

var _delegate = __webpack_require__(24);

var _delegate2 = _interopRequireDefault(_delegate);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var DOM_TO_TEXT = 0;
var DOM_TO_DOM = 1;
var TEXT_TO_DOM = 2;
var TEXT_TO_TEXT = 3;

function replaceWith(elem, cns, index, vd, isText) {
  //insertAdjacentHTML在插入text时浏览器行为表现不一致，ff会合并相邻text，chrome则不会
  //因此DOM使用insertAdjacentHTML，text则用textNode
  var target;
  if (isText) {
    var s = _util2.default.stringify(vd);
    target = document.createTextNode(s || '');
    if (index >= cns.length) {
      elem.appendChild(target);
    } else {
      elem.replaceChild(target, cns[index]);
    }
    if (vd instanceof migi.NonVisualComponent) {
      vd.emit(_Event2.default.DOM);
    }
  } else {
    target = vd.toString();
    if (index >= cns.length) {
      elem.insertAdjacentHTML('beforeend', target);
    } else {
      //textNode没有insertAdjacentHTML方法，必须使用replaceChild
      if (cns[index].nodeType == 1) {
        cns[index].insertAdjacentHTML('afterend', target);
        elem.removeChild(cns[index]);
      } else {
        var node = _browser2.default.getParent(vd.name);
        node.innerHTML = target;
        elem.replaceChild(node.firstChild, cns[index]);
      }
    }
    //别忘了触发DOM事件
    vd.emit(_Event2.default.DOM);
  }
}
function insertAt(elem, cns, index, vd, isText) {
  var target;
  if (isText) {
    var s = _util2.default.stringify(vd);
    target = document.createTextNode(s || '');
    if (index >= cns.length) {
      elem.appendChild(target);
    } else {
      elem.insertBefore(target, cns[index]);
    }
    if (vd instanceof migi.NonVisualComponent) {
      vd.emit(_Event2.default.DOM);
    }
  } else {
    target = vd.toString();
    if (index >= cns.length) {
      elem.insertAdjacentHTML('beforeend', target);
    } else {
      if (cns[index].nodeType == 1) {
        cns[index].insertAdjacentHTML('beforebegin', target);
      } else {
        var node = _browser2.default.getParent(vd.name);
        node.innerHTML = target;
        elem.insertBefore(node.firstChild, cns[index]);
      }
    }
    //别忘了触发DOM事件
    vd.emit(_Event2.default.DOM);
  }
}

function add(elem, vd, ranges, option, history, temp, last, parent) {
  if (Array.isArray(vd)) {
    history.push(0);
    //防止空数组跳过的情况
    for (var i = 0, len = Math.max(vd.length, 1); i < len; i++) {
      var item = vd[i];
      history[history.length - 1] = i;
      add(elem, item, ranges, option, history, temp, last && i == len - 1, parent);
    }
    history.pop();
  } else if (vd instanceof _Element2.default && !(vd instanceof migi.NonVisualComponent)) {
    vd.__parent = parent;
    vd.__top = parent.top;
    vd.style = parent.style;
    _hash2.default.set(vd);
    if (temp.hasOwnProperty('prev')) {
      if (option.prev == _type2.default.TEXT) {
        option.start++;
      }
      insertAt(elem, elem.childNodes, option.start++, vd);
      if (last) {
        //根据add之前最后一次情况决定下次text判断的特殊逻辑
        switch (temp.state) {
          case TEXT_TO_TEXT:
          case DOM_TO_TEXT:
            option.t2d = true;
            break;
          default:
            delete option.d2t;
        }
      }
    } else {
      temp.state = option.state;
      switch (option.state) {
        case DOM_TO_TEXT:
          option.start++;
          //d(t) -> td(t)
          break;
        case TEXT_TO_TEXT:
          addRange(ranges, option);
          option.start++;
          //t(t) -> td(t)
          option.t2d = true;
          break;
        case TEXT_TO_DOM:
          //t(t) -> dd(t)
          option.t2d = true;
          break;
        //case DOM_TO_DOM:
        //d(t) -> dd(t)
      }
      insertAt(elem, elem.childNodes, option.start++, vd);
    }
    temp.d = true;
    temp.prev = option.prev = _type2.default.DOM;
    option.state = DOM_TO_DOM;
  } else {
    if (temp.hasOwnProperty('prev')) {
      if (option.prev == _type2.default.DOM) {
        _range2.default.record(history, option);
        insertAt(elem, elem.childNodes, option.start, vd, true);
      } else {
        addRange(ranges, option);
      }
      //不仅last，还要判断是否插入过d的情况
      if (last && temp.d) {
        addRange(ranges, option);
        //根据add之前最后一次情况决定下次text判断的特殊逻辑
        switch (temp.state) {
          case DOM_TO_DOM:
          case TEXT_TO_DOM:
            delete option.t2d;
            break;
          default:
            delete option.d2t;
        }
      }
    } else {
      check(option, elem, vd, ranges, history);
      temp.state = option.state;
      switch (option.state) {
        case DOM_TO_TEXT:
          //d(t) -> tt(t)
          option.d2t = true;
        case TEXT_TO_TEXT:
          addRange(ranges, option);
          //t(t) -> tt(t)
          break;
        case TEXT_TO_DOM:
          _range2.default.record(history, option);
          insertAt(elem, elem.childNodes, option.start, vd, true);
          addRange(ranges, option);
          //t(t) -> dt(t)
          break;
        case DOM_TO_DOM:
          _range2.default.record(history, option);
          insertAt(elem, elem.childNodes, option.start, vd, true);
          //d(t) -> dt(t)
          option.d2t = true;
          break;
      }
    }
    temp.prev = option.prev = _type2.default.TEXT;
    option.state = TEXT_TO_TEXT;
  }
}
function del(elem, vd, ranges, option, temp, last) {
  if (Array.isArray(vd)) {
    for (var i = 0, len = vd.length; i < len; i++) {
      del(elem, vd[i], ranges, option, temp, last && i == len - 1);
    }
  } else if (vd instanceof _Element2.default && !(vd instanceof migi.NonVisualComponent)) {
    if (temp.hasOwnProperty('prev')) {
      //刚删过t的话再d索引+1，并且还删过d则连带中间多余的t一并删除
      if (temp.prev == _type2.default.TEXT) {
        if (temp.d) {
          removeAt(elem, option.start + 1);
        }
        removeAt(elem, option.start + 1);
      }
      //刚删过d的话，检查之前最后的节点状态判别索引是否要+1
      else {
          if (option.prev == _type2.default.TEXT) {
            removeAt(elem, option.start + 1);
          } else {
            removeAt(elem, option.start);
          }
        }
      if (last) {
        //根据del之前最后一次情况决定下次text判断的特殊逻辑
        switch (option.state) {
          case TEXT_TO_TEXT:
          case DOM_TO_TEXT:
            option.d2t = true;
            break;
          default:
            delete option.t2d;
            break;
        }
      }
    } else {
      switch (option.state) {
        case DOM_TO_TEXT:
          removeAt(elem, option.start + 1);
          option.state = TEXT_TO_TEXT;
          option.prev = _type2.default.TEXT;
          //dd(t) -> t(t)
          option.d2t = true;
          break;
        case TEXT_TO_TEXT:
          removeAt(elem, option.start + 1);
          option.prev = _type2.default.TEXT;
          //td(t) -> t(t)
          option.d2t = true;
          break;
        case TEXT_TO_DOM:
          removeAt(elem, option.start);
          option.state = DOM_TO_DOM;
          option.prev = _type2.default.DOM;
          //td(t) -> d(t)
          break;
        case DOM_TO_DOM:
          removeAt(elem, option.start);
          option.prev = _type2.default.DOM;
          //dd(t) -> d(t)
          break;
      }
    }
    temp.d = true;
    temp.prev = _type2.default.DOM;
    //缓存对象池
    _cachePool2.default.add(vd.__destroy());
  } else {
    if (temp.hasOwnProperty('prev')) {
      if (temp.prev == _type2.default.DOM) {
        addRange(ranges, option);
      }
      //不仅last，还要判断是否删除过d的情况
      if (last && temp.d) {
        removeAt(elem, option.start + 1);
        //根据del之前最后一次情况决定下次text判断的特殊逻辑
        switch (option.state) {
          case DOM_TO_DOM:
          case TEXT_TO_DOM:
            option.t2d = true;
            break;
          default:
            delete option.d2t;
        }
      }
    } else {
      switch (option.state) {
        case DOM_TO_TEXT:
          removeAt(elem, option.start + 1);
          addRange(ranges, option);
          option.state = TEXT_TO_TEXT;
          option.prev = _type2.default.TEXT;
          //dt(t) -> t(t)
          break;
        case TEXT_TO_TEXT:
          addRange(ranges, option);
          option.prev = _type2.default.TEXT;
          //tt(t) -> t(t)
          break;
        case DOM_TO_DOM:
          removeAt(elem, option.start);
          option.state = DOM_TO_DOM;
          option.prev = _type2.default.DOM;
          //dt(t) -> d(t)
          option.t2d = true;
          break;
        case TEXT_TO_DOM:
          option.prev = _type2.default.DOM;
          //tt(t) -> d(t)
          option.t2d = true;
          break;
      }
    }
    temp.prev = _type2.default.TEXT;
  }
}
function removeAt(elem, start) {
  // 当table省略tbody直接写tr时，浏览器可能会自动生成tbody节点，diff时不在对比内会造成bug，提前判断下
  if (elem.childNodes[start]) {
    elem.removeChild(elem.childNodes[start]);
  }
}

function equalText(a, b) {
  if (a === void 0 || a === null) {
    a = '';
  }
  if (b === void 0 || b === null) {
    b = '';
  }
  return a.toString() == b.toString();
}

function addRange(ranges, option) {
  var len = ranges.length;
  if (!len || ranges[len - 1].start < option.start) {
    ranges.push({ start: option.start, index: option.record.slice() });
  }
}

function diffVd(ovd, nvd) {
  //相同引用说明没发生变更，在一些使用常量、变量未变的情况下会如此
  if (ovd == nvd) {
    return;
  }
  //特殊的uid，以及一些引用赋给新vd
  var elem = ovd.element;
  var props = ['uid', '__element', '__parent', '__top', '__style', '__dom', '__names'];
  var i = props.length - 1;
  for (; i >= 0; i--) {
    var k = props[i];
    nvd[k] = ovd[k];
  }
  //vd记录更新uid引用
  _hash2.default.set(nvd);
  //记录对比过的prop
  var temp = {};
  for (i = ovd.__props.length - 1; i >= 0; i--) {
    var item = ovd.__props[i];
    var k = item[0];
    var v = item[1];
    //只检查普通属性，onXXX事件由__listener中的引用移除
    if (k.indexOf('on') != 0 || k == 'on') {
      temp[k] = true;
      //对比老属性，多余删除，相同无需更新
      if (nvd.props.hasOwnProperty(k)) {
        var nv = nvd.props[k];
        if (nv !== v) {
          nvd.__updateAttr(k, nv);
        }
        nvd.__cache[k] = nv;
      } else {
        nvd.__updateAttr(k, null);
        delete nvd.__cache[k];
      }
    }
  }
  //移除__listener记录的引用
  ovd.__removeListener();
  //添加新vd的属性
  var len = nvd.__props.length;

  var _loop = function _loop() {
    item = nvd.__props[i];
    k = item[0];

    var v = item[1];
    //事件和属性区分对待
    if (k.indexOf('on') == 0 && k != 'on') {
      name = k.slice(2).toLowerCase();

      nvd.__addListener(name, function (e) {
        e = e || window.event;
        (0, _fixEvent2.default)(e);
        var target = e.target;
        var uid = target.getAttribute('migi-uid');
        var tvd = _hash2.default.get(uid);
        if (v instanceof _Cb2.default) {
          v.cb.call(v.context, e, nvd, tvd);
        } else if (_util2.default.isFunction(v)) {
          v(e, nvd, tvd);
        } else if (Array.isArray(v)) {
          v.forEach(function (item) {
            var cb = item[1];
            if ((0, _delegate2.default)(e, item[0], nvd)) {
              if (cb instanceof _Cb2.default) {
                cb.cb.call(cb.context, e, nvd, tvd);
              } else if (_util2.default.isFunction(cb)) {
                cb(e, nvd, tvd);
              }
            }
          });
        }
      });
    } else if (!temp.hasOwnProperty(k)) {
      nvd.__updateAttr(k, v);
    }
  };

  for (i = 0; i < len; i++) {
    var item;
    var k;
    var name;

    _loop();
  }
  if (nvd.__style) {
    nvd.__updateStyle(true);
  }
  var ranges = [];
  diffChild(elem, ovd.children, nvd.children, ranges, { start: 0, record: [], first: true }, [], nvd);
  if (ranges.length) {
    //textarea特殊判断
    if (nvd.name == 'textarea') {
      nvd.__updateAttr('value', _range2.default.value(ranges[0], nvd.children));
      return;
    }
    for (i = ranges.length - 1; i >= 0; i--) {
      _range2.default.update(ranges[i], nvd.children, elem);
    }
  }
  //缓存对象池
  _cachePool2.default.add(ovd.__destroy());
}

function diff(elem, ov, nv, ranges, option, history, parent) {
  //hack之前的状态，非Obj其实没有发生变更，假设自己变自己的状态
  if (!option.first) {
    if (option.prev == _type2.default.TEXT) {
      option.state = TEXT_TO_TEXT;
    } else {
      option.state = DOM_TO_DOM;
    }
  }
  diffChild(elem, ov, nv, ranges, option, history, parent);
  //当最后一次对比是类型变换时记录，因为随后的text可能要更新
  if (!option.t2d && !option.d2t) {
    if (option.state == TEXT_TO_DOM) {
      option.t2d = true;
    } else if (option.state == DOM_TO_TEXT) {
      option.d2t = true;
    }
  }
}

function diffChild(elem, ovd, nvd, ranges, option, history, parent) {
  //新老值是否是数组处理方式不同
  var oa = Array.isArray(ovd);
  var na = Array.isArray(nvd);
  //都是数组时，还要检查二者长度
  if (oa && na) {
    var ol = ovd.length;
    var nl = nvd.length;
    var os = ol ? 1 : 0;
    var ns = nl ? 2 : 0;
    history.push(0);
    if (option.first) {
      _range2.default.record(history, option);
    }
    switch (os + ns) {
      //都是空数组
      case 0:
        option.state = TEXT_TO_TEXT;
        option.prev = _type2.default.TEXT;
        break;
      //有内容的数组变为空数组
      case 1:
        diffChild(elem, ovd[0], nvd[0], ranges, option, history, parent);
        var temp = {};
        for (var i = 1; i < ol; i++) {
          del(elem, ovd[i], ranges, option, temp, i == ol - 1);
        }
        break;
      //空数组变为有内容
      case 2:
        diffChild(elem, ovd[0], nvd[0], ranges, option, history, parent);
        var temp = {};
        for (var i = 1; i < nl; i++) {
          history[history.length - 1] = i;
          add(elem, nvd[i], ranges, option, history, temp, i == nl - 1, parent);
        }
        break;
      //都有内容
      case 3:
        for (var i = 0, len = Math.min(ol, nl); i < len; i++) {
          history[history.length - 1] = i;
          diffChild(elem, ovd[i], nvd[i], ranges, option, history, parent);
        }
        var temp = {};
        //老的多余的删除
        if (i < ol) {
          for (; i < ol; i++) {
            del(elem, ovd[i], ranges, option, temp, i == ol - 1);
          }
        }
        //新的多余的插入
        else if (i < nl) {
            for (; i < nl; i++) {
              history[history.length - 1] = i;
              add(elem, nvd[i], ranges, option, history, temp, i == nl - 1, parent);
            }
          }
        break;
    }
    history.pop();
  }
  //老的是数组新的不是
  else if (oa) {
      //将老的第1个和新的相比，注意老的第一个可能还是个数组，递归下去
      diffChild(elem, ovd[0], nvd, ranges, option, history, parent);
      //移除剩余的老的
      var temp = {};
      for (var i = 1, len = ovd.length; i < len; i++) {
        del(elem, ovd[i], ranges, option, temp, i == len - 1);
      }
    }
    //新的是数组老的不是
    else if (na) {
        history.push(0);
        //将新的第1个和老的相比，注意新的第一个可能还是个数组，递归下去
        diffChild(elem, ovd, nvd[0], ranges, option, history, parent);
        var temp = {};
        //增加剩余的新的
        for (var i = 1, len = nvd.length; i < len; i++) {
          history[history.length - 1] = i;
          add(elem, nvd[i], ranges, option, history, temp, i == len - 1, parent);
        }
        history.pop();
      }
      //都不是数组
      else {
          var oe = ovd instanceof _Element2.default && !(ovd instanceof migi.NonVisualComponent) ? 1 : 0;
          var ne = nvd instanceof _Element2.default && !(nvd instanceof migi.NonVisualComponent) ? 2 : 0;
          //新老值是否为DOM或TEXT分4种情况
          switch (oe + ne) {
            //都是text时，根据上个节点类型和history设置range
            case 0:
              if (!option.first) {
                check(option, elem, nvd, ranges, history);
              }
              _range2.default.record(history, option);
              var cns = elem.childNodes;
              if (option.first) {
                if (!equalText(ovd, nvd)) {
                  addRange(ranges, option);
                }
              } else if (!equalText(ovd, nvd)) {
                switch (option.state) {
                  case DOM_TO_TEXT:
                    addRange(ranges, option);
                    elem.removeChild(cns[option.start + 1]);
                    break;
                  case TEXT_TO_DOM:
                    addRange(ranges, option);
                    insertAt(elem, cns, option.start, nvd, true);
                    break;
                  case DOM_TO_DOM:
                    _range2.default.record(history, option);
                  case TEXT_TO_TEXT:
                    if (!equalText(ovd, nvd)) {
                      addRange(ranges, option);
                    }
                    break;
                }
              }
              //不是第一个但text内容不变时，需根据之前的状态判断处理
              else {
                  switch (option.state) {
                    case DOM_TO_TEXT:
                      addRange(ranges, option);
                      elem.removeChild(cns[option.start + 1]);
                      break;
                    case TEXT_TO_DOM:
                      addRange(ranges, option);
                      insertAt(elem, cns, option.start, nvd, true);
                      break;
                  }
                }
              option.state = TEXT_TO_TEXT;
              option.prev = _type2.default.TEXT;
              break;
            //DOM变TEXT
            case 1:
              _range2.default.record(history, option);
              var cns = elem.childNodes;
              //本身就是第1个，直接替换
              if (option.first) {
                replaceWith(elem, cns, option.start, nvd, true);
              } else {
                switch (option.state) {
                  case DOM_TO_TEXT:
                  case TEXT_TO_TEXT:
                    addRange(ranges, option);
                    elem.removeChild(cns[option.start + 1]);
                    break;
                  case TEXT_TO_DOM:
                    replaceWith(elem, cns, option.start++, nvd, true);
                    break;
                  case DOM_TO_DOM:
                    replaceWith(elem, cns, option.start, nvd, true);
                    break;
                }
              }
              //缓存对象池
              _cachePool2.default.add(ovd.__destroy());
              option.state = DOM_TO_TEXT;
              option.prev = _type2.default.TEXT;
              break;
            //TEXT变DOM
            case 2:
              //这种情况下相当于add新vd，无parent和style引用
              nvd.__parent = parent;
              nvd.__top = parent.top;
              nvd.style = parent.style;
              _hash2.default.set(nvd);
              var cns = elem.childNodes;
              if (option.first) {
                replaceWith(elem, cns, option.start++, nvd);
              } else {
                switch (option.state) {
                  case DOM_TO_TEXT:
                    option.start++;
                  case DOM_TO_DOM:
                    replaceWith(elem, cns, option.start++, nvd);
                    break;
                  case TEXT_TO_DOM:
                    insertAt(elem, cns, option.start++, nvd);
                    break;
                  case TEXT_TO_TEXT:
                    addRange(ranges, option);
                    insertAt(elem, cns, ++option.start, nvd);
                    option.start++;
                    break;
                }
              }
              option.state = TEXT_TO_DOM;
              option.prev = _type2.default.DOM;
              break;
            //DOM变DOM
            case 3:
              if (!option.first) {
                switch (option.state) {
                  case DOM_TO_TEXT:
                  case TEXT_TO_TEXT:
                    option.start++;
                    break;
                }
                delete option.t2d;
                delete option.d2t;
              }
              var ocp = ovd instanceof _Component2.default ? 1 : 0;
              var ncp = nvd instanceof _Component2.default ? 2 : 0;
              switch (ocp + ncp) {
                //DOM名没变递归diff，否则重绘
                case 0:
                  if (ovd.name == nvd.name) {
                    ovd.__parent = parent;
                    ovd.__top = parent.top;
                    diffVd(ovd, nvd);
                  } else {
                    nvd.__parent = parent;
                    nvd.__top = parent.top;
                    nvd.style = parent.style;
                    elem = ovd.element;
                    elem.insertAdjacentHTML('afterend', nvd.toString());
                    elem.parentNode.removeChild(elem);
                    nvd.emit(_Event2.default.DOM);
                    _matchHash2.default.del(ovd.uid);
                    _hash2.default.set(nvd);
                    //缓存对象池
                    _cachePool2.default.add(ovd.__destroy());
                  }
                  break;
                //Component和VirtualDom变化则直接重绘
                default:
                  elem = ovd.element;
                  elem.insertAdjacentHTML('afterend', nvd.toString());
                  elem.parentNode.removeChild(elem);
                  nvd.__parent = parent;
                  nvd.__top = parent.top;
                  //match中为模拟style的:active伪类注册了window的一些事件，需检查移除
                  if (ncp) {
                    _matchHash2.default.del(ovd.virtualDom.uid);
                  } else {
                    _matchHash2.default.del(ovd.uid);
                    nvd.style = parent.style;
                  }
                  nvd.emit(_Event2.default.DOM);
                  _hash2.default.set(nvd);
                  //缓存对象池
                  _cachePool2.default.add(ovd.__destroy());
                  break;
              }
              option.state = DOM_TO_DOM;
              option.prev = _type2.default.DOM;
              option.start++;
              break;
          }
          //非可视组件被当作空字符串处理，连同其他组件，不要忘了DOM事件
          if (nvd instanceof migi.NonVisualComponent) {
            nvd.emit(_Event2.default.DOM);
          }
        }
  option.first = false;
}

function check(option, elem, vd, ranges, history) {
  if (option.t2d) {
    delete option.t2d;
    _range2.default.record(history, option);
    insertAt(elem, elem.childNodes, option.start, vd, true);
  } else if (option.d2t) {
    delete option.d2t;
    addRange(ranges, option);
    removeAt(elem, option.start + 1);
  }
}

exports.default = {
  diff: diff,
  check: check
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var NUM = 0;
var STR = 1;
var BOOL = 2;

var RENDER_EXIST = 1;
var RENDER_DOM = 2;

var SPECIALS = {
  button: {
    disabled: RENDER_EXIST
  },
  input: {
    autofocus: RENDER_EXIST,
    checked: RENDER_EXIST,
    defaultChecked: RENDER_DOM,
    defaultchecked: RENDER_DOM,
    defaultValue: RENDER_DOM,
    defaultvalue: RENDER_DOM,
    disabled: RENDER_EXIST,
    multiple: RENDER_EXIST,
    readOnly: RENDER_EXIST,
    readonly: RENDER_EXIST,
    required: RENDER_EXIST
  },
  link: {
    disabled: RENDER_EXIST
  },
  option: {
    defaultSelected: RENDER_DOM,
    defaultselected: RENDER_DOM,
    disabled: RENDER_EXIST,
    selected: RENDER_EXIST,
    text: RENDER_DOM
  },
  select: {
    autofocus: RENDER_EXIST,
    disabled: RENDER_EXIST,
    multiple: RENDER_EXIST,
    selectedIndex: RENDER_DOM,
    selectedindex: RENDER_DOM
  },
  textarea: {
    autofocus: RENDER_EXIST,
    defaultValue: RENDER_DOM,
    defaultvalue: RENDER_DOM,
    disabled: RENDER_EXIST,
    readOnly: RENDER_EXIST,
    readonly: RENDER_EXIST
  }
};

var SETS = {
  button: {
    disabled: BOOL
  },
  input: {
    autofocus: BOOL,
    checked: BOOL,
    defaultChecked: BOOL,
    defaultchecked: BOOL,
    defaultValue: STR,
    defaultvalue: STR,
    disabled: BOOL,
    readOnly: BOOL,
    readonly: BOOL,
    required: BOOL,
    value: STR
  },
  link: {
    checked: BOOL
  },
  option: {
    defaultSelected: BOOL,
    defaultselected: BOOL,
    disabled: BOOL,
    selected: BOOL,
    text: STR
  },
  select: {
    autofocus: BOOL,
    disabled: BOOL,
    required: BOOL,
    selectedIndex: NUM,
    selectedindex: NUM,
    value: STR
  },
  textarea: {
    autofocus: BOOL,
    defaultValue: STR,
    defaultvalue: STR,
    disabled: BOOL,
    readOnly: BOOL,
    readonly: BOOL,
    required: BOOL,
    value: STR
  }
};

var lowerCase = {
  defaultchecked: 'defaultChecked',
  defaultselected: 'defaultSelected',
  defaultvalue: 'defautlValue',
  readonly: 'readOnly',
  selectindex: 'selectIndex'
};

exports.default = {
  RENDER_EXIST: RENDER_EXIST,
  RENDER_DOM: RENDER_DOM,
  special: function special(name, prop) {
    if (SPECIALS.hasOwnProperty(name)) {
      var o = SPECIALS[name];
      if (o.hasOwnProperty(prop)) {
        return o[prop];
      }
    }
  },
  update: function update(name, element, k, v, jaw) {
    //特殊对待的prop，用js赋值
    if (SETS.hasOwnProperty(name)) {
      var o = SETS[name];
      if (o.hasOwnProperty(k)) {
        o = o[k];
        k = lowerCase[k] || k;
        switch (o) {
          case NUM:
            v = parseInt(v);
            element[k] = v || 0;
            break;
          case STR:
            v = _util2.default.stringify(v);
            element[k] = v;
            break;
          case BOOL:
            v = !!v;
            element[k] = v;
            break;
        }
        return;
      }
    }
    //普通的setAttribute
    switch (k) {
      case 'className':
        k = 'class';
        break;
      case 'htmlFor':
        k = 'for';
        break;
    }
    //jaw导入style时改写migi-前缀
    if (jaw) {
      switch (k) {
        case 'id':
        case 'class':
          k = 'migi-' + k;
          break;
      }
    }
    if (v === null || v === void 0) {
      element.removeAttribute(k);
    } else if (k == 'id') {
      element[k] = v;
    } else if (k == 'class') {
      element.className = v;
    } else {
      element.setAttribute(k, v);
    }
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vd, name, cb, listener) {
  if (!hasInitGlobal) {
    hasInitGlobal = true;
    initGlobal();
  }
  listener.push(['touchstart', onTouchStart]);

  var elem = vd.element;

  elem.addEventListener('touchstart', onTouchStart);

  function onTouchStart(e) {
    //有可能组件内父子多个使用了手势，冒泡触发了多个
    if (touch.first) {
      touchList.push({
        vd: vd,
        name: name,
        cb: cb
      });
      return;
    }

    firstTouch = e.touches[0];
    if (e.touches && e.touches.length === 1 && touch.x2) {
      // Clear out touch movement data if we have it sticking around
      // This can occur if touchcancel doesn't fire due to preventDefault, etc.
      touch.x2 = undefined;
      touch.y2 = undefined;
    }

    touch = {
      vd: vd,
      name: name,
      cb: cb,
      first: true,
      x1: firstTouch.pageX,
      y1: firstTouch.pageY
    };
    lastTouch = touch;

    now = Date.now();
    delta = now - lastTime;
    lastTime = now;
    if (delta > 0 && delta < 250) {
      touch.isDoubleTap = true;
    }
  }
};

/**
 * Thanks to zepto-touch.js
 * https://github.com/madrobby/zepto/blob/master/src/touch.js
 */

var touchList = [];
var touch = {};
var lastTouch;
var tapTimeout;
var swipeTimeout;
var longTapDelay = 750;
var lastTime = 0;
var now;
var delta;
var deltaX = 0;
var deltaY = 0;
var firstTouch;

function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'left' : 'right' : y1 - y2 > 0 ? 'up' : 'down';
}

function cancelAll() {
  if (tapTimeout) {
    clearTimeout(tapTimeout);
  }
  if (swipeTimeout) {
    clearTimeout(swipeTimeout);
  }
  tapTimeout = swipeTimeout = null;
  touch = {};
  touchList = [];
}

var hasInitGlobal;

function initGlobal() {
  document.addEventListener('touchmove', onTouchMove, true);
  document.addEventListener('touchend', onTouchEnd, true);
  document.addEventListener('touchcancel', cancelAll, true);

  window.addEventListener('scroll', cancelAll);
  window.addEventListener('blur', cancelAll);
}

function onTouchMove(e) {
  if (!touch.vd) {
    return;
  }

  firstTouch = e.touches[0];
  touch.x2 = firstTouch.pageX;
  touch.y2 = firstTouch.pageY;

  deltaX += Math.abs(touch.x1 - touch.x2);
  deltaY += Math.abs(touch.y1 - touch.y2);
}

function onTouchEnd(e) {
  if (!touch.vd) {
    return;
  }

  // swipe
  if (touch.x2 && Math.abs(touch.x1 - touch.x2) > 30 || touch.y2 && Math.abs(touch.y1 - touch.y2) > 30) {
    swipeTimeout = setTimeout(function () {
      var type = 'swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2);
      if (touch.name == 'swipe' || touch.name == type) {
        touch.cb(e);
      }
      touchList.forEach(function (touch) {
        if (touch.name == 'swipe' || touch.name == type) {
          touch.cb(e);
        }
      });
      touch = {};
      touchList = [];
    }, 0);
  }
  // don't fire tap when delta position changed by more than 30 pixels,
  // for instance when moving to a point and back to origin
  else if (deltaX < 30 && deltaY < 30) {
      tapTimeout = setTimeout(function () {
        var isLongTap = Date.now() - lastTime > longTapDelay;
        if (isLongTap) {
          if (touch.name == 'longtap') {
            touch.cb(e);
          }
          touchList.forEach(function (touch) {
            if (touch.name == 'longtap') {
              touch.cb(e);
            }
          });
        }
        // trigger double tap immediately
        else if (touch.isDoubleTap && touch.vd == lastTouch.vd) {
            if (touch.name == 'doubletap') {
              touch.cb(e);
            }
            touchList.forEach(function (touch) {
              if (touch.name == 'doubletap') {
                touch.cb(e);
              }
            });
          }
        touch = {};
        touchList = [];
      }, 0);
    } else {
      touch = {};
      touchList = [];
    }
  deltaX = deltaY = 0;
}

;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  domactivate: 'DOMActivate',
  domfocusin: 'DOMFocusIn',
  msgestureend: 'MSGestureEnd',
  mspointerdown: 'MSPointerDown',
  mspointermove: 'MSPointerMove',
  mspointerup: 'MSPointerUp',
  mspointercancel: 'MSPointerCancel'
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
  var original = arrayProto[method];
  Object.defineProperty(arrayMethods, method, {
    value: function value() {
      var i = arguments.length;
      var args = new Array(i);
      while (i--) {
        args[i] = arguments[i];
      }
      var result = original.apply(this, args);
      if (Array.isArray(this.__cb__)) {
        this.__cb__.forEach(function (cb) {
          cb();
        });
      }
      return result;
    }
  });
});

exports.default = arrayMethods;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _Component2 = __webpack_require__(5);

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var NonVisualComponent = function (_Component) {
  _inherits(NonVisualComponent, _Component);

  function NonVisualComponent() {
    var _ref;

    _classCallCheck(this, NonVisualComponent);

    for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = NonVisualComponent.__proto__ || Object.getPrototypeOf(NonVisualComponent)).call.apply(_ref, [this].concat(data)));
  }

  //非可视为空
  //@overwrite


  _createClass(NonVisualComponent, [{
    key: 'toString',
    value: function toString() {
      return '';
    }

    //没有dom
    //@overwrite

  }, {
    key: '__onDom',
    value: function __onDom() {
      this.__dom = true;
      _Component3.default.fakeDom(this.children);
    }
  }]);

  return NonVisualComponent;
}(_Component3.default);

exports.default = NonVisualComponent;

/***/ }),
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = __webpack_require__(90);

module.exports = core;

/***/ }),
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context;
  if (settings.beforeSend && settings.beforeSend.call(context, xhr, settings) === false) return false;
}
function ajaxSuccess(data, xhr, settings, deferred) {
  var context = settings.context,
      status = 'success';
  settings.success && settings.success.call(context, data, status, xhr);
  if (deferred) deferred.resolveWith(context, [data, status, xhr]);
  ajaxComplete(status, xhr, settings);
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings, deferred) {
  var context = settings.context;
  settings.error && settings.error.call(context, xhr, type, error);
  if (deferred) deferred.rejectWith(context, [xhr, type, error]);
  ajaxComplete(type, xhr, settings);
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context;
  settings.complete && settings.complete.call(context, xhr, status);
}

module.exports = {
  ajaxBeforeSend: ajaxBeforeSend,
  ajaxSuccess: ajaxSuccess,
  ajaxError: ajaxError
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var event = __webpack_require__(91);

module.exports = event;

/***/ }),
/* 50 */
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
      return migi.createVd("div", [["class", "cp-share fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("label", [], ["页面地址"]), migi.createVd("input", [["class", "share"], ["ref", "share"], ["type", "text"], ["value", new migi.Obj("url", this, function () {
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
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(35);

__webpack_require__(36);

var _animaYoctoAjax = __webpack_require__(88);

var _animaYoctoAjax2 = _interopRequireDefault(_animaYoctoAjax);

__webpack_require__(94);

__webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (/iP(hone|od|ad)/.test(navigator.userAgent)) {
  var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
      version = parseInt(v[1], 10);
  if (version >= 8) {
    document.documentElement.classList.add('hairlines');
  }
} /**
   * Created by army on 2017/3/19.
   * For my goddess.
   */

_animaYoctoAjax2.default.cookie = function (key, value, options) {
  var days, time, result, decode;

  // A key and value were given. Set cookie.
  if (arguments.length > 1 && String(value) !== "[object Object]") {
    // Enforce object
    options = _animaYoctoAjax2.default.extend({}, options);

    if (value === null || value === undefined) options.expires = -1;

    if (typeof options.expires === 'number') {
      days = options.expires * 24 * 60 * 60 * 1000;
      time = options.expires = new Date();

      time.setTime(time.getTime() + days);
    }

    value = String(value);

    return document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
  }

  // Key and possibly options given, get cookie
  options = value || {};

  decode = options.raw ? function (s) {
    return s;
  } : decodeURIComponent;

  return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

window.requestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 16.7);
  };
}();
window.$ = _animaYoctoAjax2.default;

/***/ }),
/* 86 */,
/* 87 */,
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ajax = __webpack_require__(89);

module.exports = ajax;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(46),
    util = __webpack_require__(48);

__webpack_require__(49);

__webpack_require__(92);

__webpack_require__(93);

module.exports = $;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Yocto = function () {
  var undefined,
      key,
      $,
      classList,
      emptyArray = [],
      _slice = emptyArray.slice,
      _filter = emptyArray.filter,

  // [Opt:C] 增加win变量缓存window
  win = window,
      document = win.document,
      elementDisplay = {},
      classCache = {},
      fragmentRE = /^\s*<(\w+|!)[^>]*>/,
      class2type = {},
      toString = class2type.toString,
      zepto = {},
      camelize,
      uniq,

  //[Opt:B][V1.0+] 由于已经删除prop方法，因此原propMap变量一并删除

  //[Opt:C] 去掉isArray旧方法的兼容
  isArray = Array.isArray;

  zepto.matches = function (element, selector) {
    // [Opt:C] 将原本在父级作用域的变量转移至局部变量
    var tempParent = document.createElement('div');

    if (!selector || !element || element.nodeType !== 1) return false;
    // [Opt:C] 去除对moz o 的支持，一般情况下，是不会遇到以上的浏览器，不针对moz和o做专门的优化
    var matchesSelector = element.webkitMatchesSelector || element.matchesSelector;
    if (matchesSelector) return matchesSelector.call(element, selector);
    // fall back to performing a selector:
    var match,
        parent = element.parentNode,
        temp = !parent;
    if (temp) (parent = tempParent).appendChild(element);
    match = ~zepto.qsa(parent, selector).indexOf(element);
    temp && tempParent.removeChild(element);
    return match;
  };

  //opt by 完颜
  //Get string type of an object.
  //Possible types are:
  //null undefined boolean number string function array date regexp object error.
  function type(obj) {
    return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
  }

  function isFunction(value) {
    return type(value) == "function";
  }

  function isWindow(obj) {
    return obj != null && obj == obj.window;
  }

  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
  }

  function isObject(obj) {
    return type(obj) == "object";
  }

  function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  function likeArray(obj) {
    return typeof obj.length == 'number';
  }

  function compact(array) {
    return _filter.call(array, function (item) {
      return item != null;
    });
  }

  function flatten(array) {
    return array.length > 0 ? $.fn.concat.apply([], array) : array;
  }

  //将中划线连接符转化为驼峰字符串
  camelize = function camelize(str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
  };

  uniq = function uniq(array) {
    return _filter.call(array, function (item, idx) {
      return array.indexOf(item) == idx;
    });
  };

  function classRE(name) {
    return name in classCache ? classCache[name] : classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)');
  }

  function _children(element) {
    return 'children' in element ? _slice.call(element.children) : $.map(element.childNodes, function (node) {
      if (node.nodeType == 1) return node;
    });
  }

  // `$.zepto.fragment` takes a html string and an optional tag name
  // to generate DOM nodes nodes from the given html string.
  // The generated DOM nodes are returned as an array.
  // This function can be overriden in plugins for example to make
  // it compatible with browsers that don't support the DOM fully.
  zepto.fragment = function (html, name) {
    // [Opt:C] 将原本在父级作用域的变量转移至局部变量
    var table = document.createElement('table'),
        tableRow = document.createElement('tr'),
        containers = {
      'tr': document.createElement('tbody'),
      'tbody': table, 'thead': table, 'tfoot': table,
      'td': tableRow, 'th': tableRow,
      '*': document.createElement('div')
    },
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

    // special attributes that should be get/set via method calls
    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'];

    var dom, nodes, container;

    // A special case optimization for a single tag
    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1));

    if (!dom) {
      if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1;
      if (!(name in containers)) name = '*';

      container = containers[name];
      container.innerHTML = '' + html;
      dom = $.each(_slice.call(container.childNodes), function () {
        container.removeChild(this);
      });
    }

    //[Opt:B-1][V1.0+] 移除 $(htmlString, attributes) 的api方法支持

    return dom;
  };

  // `$.zepto.Z` swaps out the prototype of the given `dom` array
  // of nodes with `$.fn` and thus supplying all the Zepto functions
  // to the array. Note that `__proto__` is not supported on Internet
  // Explorer. This method can be overriden in plugins.
  zepto.Z = function (dom, selector) {
    dom = dom || [];
    dom.__proto__ = $.fn;
    dom.selector = selector || '';
    return dom;
  };

  // `$.zepto.isZ` should return `true` if the given object is a Zepto
  // collection. This method can be overriden in plugins.
  zepto.isZ = function (object) {
    return object instanceof zepto.Z;
  };

  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
  // takes a CSS selector and an optional context (and handles various
  // special cases).
  // This method can be overriden in plugins.
  zepto.init = function (selector, context) {
    var dom;
    // If nothing given, return an empty Zepto collection
    if (!selector) return zepto.Z();
    // Optimize for string selectors
    else if (typeof selector == 'string') {
        selector = selector.trim();
        // If it's a html fragment, create nodes from it
        // Note: In both Chrome 21 and Firefox 15, DOM error 12
        // is thrown if the fragment doesn't begin with <
        if (selector[0] == '<' && fragmentRE.test(selector)) dom = zepto.fragment(selector, RegExp.$1, context), selector = null;
        // If there's a context, create a collection on that context first, and select
        // nodes from there
        else if (context !== undefined) return $(context).find(selector);
          // If it's a CSS selector, use it to select nodes.
          else dom = zepto.qsa(document, selector);
      }
      // If a function is given, call it when the DOM is ready
      else if (isFunction(selector)) return $(document).ready(selector);
        // If a Zepto collection is given, just return it
        else if (zepto.isZ(selector)) return selector;else {
            // normalize array if an array of nodes is given
            if (isArray(selector)) dom = compact(selector);
            // Wrap DOM nodes.
            else if (isObject(selector)) dom = [selector], selector = null;
              // If it's a html fragment, create nodes from it
              else if (fragmentRE.test(selector)) dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null;
                // If there's a context, create a collection on that context first, and select
                // nodes from there
                else if (context !== undefined) return $(context).find(selector);
                  // And last but no least, if it's a CSS selector, use it to select nodes.
                  else dom = zepto.qsa(document, selector);
          }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector);
  };

  // `$` will be the base `Zepto` object. When calling this
  // function just call `$.zepto.init, which makes the implementation
  // details of selecting nodes and creating Zepto collections
  // patchable in plugins.
  $ = function $(selector, context) {
    return zepto.init(selector, context);
  };

  // Copy all but undefined properties from one or more
  // objects to the `target` object.
  $.extend = function (target) {
    //[Opt:C] 将全局函数编程内部函数
    var extend = function extend(target, source, deep) {
      for (key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key])) target[key] = {};
          if (isArray(source[key]) && !isArray(target[key])) target[key] = [];
          extend(target[key], source[key], deep);
        } else if (source[key] !== undefined) target[key] = source[key];
      }
    };

    var deep,
        args = _slice.call(arguments, 1);
    if (typeof target == 'boolean') {
      deep = target;
      target = args.shift();
    }
    args.forEach(function (arg) {
      extend(target, arg, deep);
    });
    return target;
  };

  // `$.zepto.qsa` is Zepto's CSS selector implementation which
  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
  // This method can be overriden in plugins.
  // opt by 轩与
  zepto.qsa = function (element, selector) {
    // [Opt:C] 将全局simpleSelectorRE转到局部
    var found,
        simpleSelectorRE = /^[\w-]*$/,
        maybeID = selector[0] == '#',
        maybeClass = !maybeID && selector[0] == '.',
        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
        // Ensure that a 1 char tag name still gets checked
    isSimple = /^[\w-]*$/.test(nameOnly);
    return isDocument(element) && isSimple && maybeID ? (found = element.getElementById(nameOnly)) ? [found] : [] : element.nodeType !== 1 && element.nodeType !== 9 ? [] : _slice.call(isSimple && !maybeID ? maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
    element.getElementsByTagName(selector) : // Or a tag
    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
    );
  };

  function filtered(nodes, selector) {
    return selector == null ? $(nodes) : $(nodes).filter(selector);
  }

  $.contains = function (parent, node) {
    return parent !== node && parent.contains(node);
  };

  function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
  }

  function setAttribute(node, name, value) {
    value == null ? node.removeAttribute(name) : node.setAttribute(name, value);
  }

  // access className property while respecting SVGAnimatedString
  function className(node, value) {
    var klass = node.className,
        svg = klass && klass.baseVal !== undefined;

    if (value === undefined) return svg ? klass.baseVal : klass;
    svg ? klass.baseVal = value : node.className = value;
  }

  // "true"  => true
  // "false" => false
  // "null"  => null
  // "42"    => 42
  // "42.5"  => 42.5
  // "08"    => "08"
  // JSON    => parse if valid
  // String  => self
  function deserializeValue(value) {
    var num;
    try {
      return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !/^0/.test(value) && !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value;
    } catch (e) {
      return value;
    }
  }

  $.type = type;
  $.isFunction = isFunction;
  $.isWindow = isWindow;
  $.isArray = isArray;
  $.isPlainObject = isPlainObject;

  //[Opt:A] 移除$.isEmptyObject方法，官网无公开，core内无引用
  //$.isEmptyObject

  $.camelCase = camelize;
  $.trim = function (str) {
    return str == null ? "" : String.prototype.trim.call(str);
  };

  // plugin compatibility
  $.uuid = 0;
  $.support = {};
  $.expr = {};

  $.map = function (elements, callback) {
    var value,
        values = [],
        i,
        key;
    if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
      value = callback(elements[i], i);
      if (value != null) values.push(value);
    } else for (key in elements) {
      value = callback(elements[key], key);
      if (value != null) values.push(value);
    }
    return flatten(values);
  };

  $.each = function (elements, callback) {
    var i, key;
    if (likeArray(elements)) {
      for (i = 0; i < elements.length; i++) {
        if (callback.call(elements[i], i, elements[i]) === false) return elements;
      }
    } else {
      for (key in elements) {
        if (callback.call(elements[key], key, elements[key]) === false) return elements;
      }
    }

    return elements;
  };

  // [Opt:C] 删除不必要的if (win.JSON)
  $.parseJSON = JSON.parse;

  // Populate the class2type map
  $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  // Define methods that will be available on all
  // Zepto collections
  $.fn = {
    // Because a collection acts like an array
    // copy over these useful array functions.
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

    // `map` and `slice` in the jQuery API work differently
    // from their array counterparts
    map: function map(fn) {
      return $($.map(this, function (el, i) {
        return fn.call(el, i, el);
      }));
    },
    slice: function slice() {
      return $(_slice.apply(this, arguments));
    },
    ready: function ready(callback) {
      //[Opt:C]将原本在父级作用域的变量转移至局部变量
      var readyRE = /complete|loaded|interactive/;

      // need to check if document.body exists for IE as that browser reports
      // document ready when it hasn't yet created the body element
      // [Opt:C] 不做ie的兼容
      if (readyRE.test(document.readyState)) callback($);else document.addEventListener('DOMContentLoaded', function () {
        callback($);
      }, false);
      return this;
    },
    get: function get(idx) {
      return idx === undefined ? _slice.call(this) : this[idx >= 0 ? idx : idx + this.length];
    },
    toArray: function toArray() {
      return this.get();
    },
    size: function size() {
      return this.length;
    },
    remove: function remove() {
      return this.each(function () {
        if (this.parentNode != null) this.parentNode.removeChild(this);
      });
    },
    each: function each(callback) {
      emptyArray.every.call(this, function (el, idx) {
        return callback.call(el, idx, el) !== false;
      });
      return this;
    },
    filter: function filter(selector) {
      if (isFunction(selector)) return this.not(this.not(selector));
      return $(_filter.call(this, function (element) {
        return zepto.matches(element, selector);
      }));
    },
    add: function add(selector, context) {
      return $(uniq(this.concat($(selector, context))));
    },
    is: function is(selector) {
      return this.length > 0 && zepto.matches(this[0], selector);
    },
    not: function not(selector) {
      var nodes = [];
      if (isFunction(selector) && selector.call !== undefined) this.each(function (idx) {
        if (!selector.call(this, idx)) nodes.push(this);
      });else {
        var excludes = typeof selector == 'string' ? this.filter(selector) : likeArray(selector) && isFunction(selector.item) ? _slice.call(selector) : $(selector);
        this.forEach(function (el) {
          if (excludes.indexOf(el) < 0) nodes.push(el);
        });
      }
      return $(nodes);
    },
    has: function has(selector) {
      return this.filter(function () {
        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size();
      });
    },
    eq: function eq(idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1);
    },
    first: function first() {
      var el = this[0];
      return el && !isObject(el) ? el : $(el);
    },
    last: function last() {
      var el = this[this.length - 1];
      return el && !isObject(el) ? el : $(el);
    },
    find: function find(selector) {
      var result,
          $this = this;
      if ((typeof selector === "undefined" ? "undefined" : _typeof(selector)) == 'object') result = $(selector).filter(function () {
        var node = this;
        return emptyArray.some.call($this, function (parent) {
          return $.contains(parent, node);
        });
      });else if (this.length == 1) result = $(zepto.qsa(this[0], selector));else result = this.map(function () {
        return zepto.qsa(this, selector);
      });
      return result;
    },
    //[Opt:B][V1.0+] : closest的父级选择，代理parents，去除原有的第二个参数支持
    closest: function closest(selector) {
      if (zepto.matches(this[0], selector)) return $(this[0]);else return $(this.parents(selector).get(0));
    },
    parents: function parents(selector) {
      var ancestors = [],
          nodes = this;
      while (nodes.length > 0) {
        nodes = $.map(nodes, function (node) {
          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
            ancestors.push(node);
            return node;
          }
        });
      }return filtered(ancestors, selector);
    },
    parent: function parent(selector) {
      return filtered(uniq(this.pluck('parentNode')), selector);
    },
    children: function children(selector) {
      return filtered(this.map(function () {
        return _children(this);
      }), selector);
    },
    //[Opt:B][V1.0+] : contents已经转移至plugin
    siblings: function siblings(selector) {
      return filtered(this.map(function (i, el) {
        return _filter.call(_children(el.parentNode), function (child) {
          return child !== el;
        });
      }), selector);
    },
    //[Opt:A] : empty已经转移至plugin
    // `pluck` is borrowed from Prototype.js
    pluck: function pluck(property) {
      return $.map(this, function (el) {
        return el[property];
      });
    },
    show: function show() {
      // [Opt:C] 提取函数
      var getDisplay = function getDisplay(DOM) {
        return getComputedStyle(DOM, '').getPropertyValue("display");
      };
      return this.each(function () {
        this.style.display == "none" && (this.style.display = '');
        if (getDisplay(this) == "none") {
          // [Opt:C] 将defaultDisplay方法局部化
          var defaultDisplay = function defaultDisplay(nodeName) {
            var element, display;
            if (!elementDisplay[nodeName]) {
              element = document.createElement(nodeName);
              document.body.appendChild(element);
              display = getDisplay(element);
              element.parentNode.removeChild(element);
              display == "none" && (display = "block");
              elementDisplay[nodeName] = display;
            }
            return elementDisplay[nodeName];
          };
          this.style.display = defaultDisplay(this.nodeName);
        }
      });
    },
    replaceWith: function replaceWith(newContent) {
      return this.before(newContent).remove();
    },
    //[Opt:A] : wrap系列方法，已经转移至plugin
    clone: function clone() {
      return this.map(function () {
        return this.cloneNode(true);
      });
    },
    hide: function hide() {
      return this.css("display", "none");
    },
    toggle: function toggle(setting) {
      return this.each(function () {
        var el = $(this);
        (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide();
      });
    },
    prev: function prev(selector) {
      return $(this.pluck('previousElementSibling')).filter(selector || '*');
    },
    next: function next(selector) {
      return $(this.pluck('nextElementSibling')).filter(selector || '*');
    },
    html: function html(_html) {
      return arguments.length === 0 ? this.length > 0 ? this[0].innerHTML : null : this.each(function (idx) {
        var originHtml = this.innerHTML;
        this.innerHTML = '';
        $(this).append(funcArg(this, _html, idx, originHtml));
      });
    },
    text: function text(_text) {
      return arguments.length === 0 ? this.length > 0 ? this[0].textContent : null : this.each(function () {
        this.textContent = _text === undefined ? '' : '' + _text;
      });
    },
    attr: function attr(name, value) {
      var result;
      return typeof name == 'string' && value === undefined ? this.length == 0 || this[0].nodeType !== 1 ? undefined : name == 'value' && this[0].nodeName == 'INPUT' ? this.val() : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function (idx) {
        if (this.nodeType !== 1) return;
        if (isObject(name)) for (key in name) {
          setAttribute(this, key, name[key]);
        } else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)));
      });
    },
    removeAttr: function removeAttr(name) {
      return this.each(function () {
        this.nodeType === 1 && setAttribute(this, name);
      });
    },
    data: function data(name, value) {
      //[Opt:C]将原本在父级作用域的变量转移至局部变量
      var capitalRE = /([A-Z])/g,
          data = this.attr('data-' + name.replace(capitalRE, '-$1').toLowerCase(), value);
      return data !== null ? deserializeValue(data) : undefined;
    },
    val: function val(value) {
      return arguments.length === 0 ? this[0] && (this[0].multiple ? $(this[0]).find('option').filter(function () {
        return this.selected;
      }).pluck('value') : this[0].value) : this.each(function (idx) {
        this.value = funcArg(this, value, idx, this.value);
      });
    },
    //[Opt:B][V1.0+] 去除offset的coordinates参数
    offset: function offset() {
      if (this.length == 0) return null;
      var obj = this[0].getBoundingClientRect();
      return {
        left: obj.left + win.pageXOffset,
        top: obj.top + win.pageYOffset,
        width: Math.round(obj.width),
        height: Math.round(obj.height)
      };
    },
    css: function css(property, value) {
      //智能补足：分析css方法中传入的value，如果name是在cssNumber清单外的纯数字，则增加px单位
      //[Opt:C] 将全局函数装到局部函数
      var maybeAddPx = function maybeAddPx(name, value) {
        //[Opt:C]将原本在父级作用域的变量转移至局部变量
        var cssNumber = {
          'column-count': 1,
          'columns': 1,
          'font-weight': 1,
          'line-height': 1,
          'opacity': 1,
          'z-index': 1,
          'zoom': 1
        };
        return typeof value == "number" && !cssNumber[dasherize(name)] ? value + "px" : value;
      };

      //将字符串(驼峰)转换为dasherized(中划线连接符形式命名)字符
      //[Opt:C] 将全局函数装到局部函数
      var dasherize = function dasherize(str) {
        return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
      };

      if (arguments.length < 2) {
        var element = this[0];
        if (!element) return;
        var computedStyle = getComputedStyle(element, '');
        if (typeof property == 'string') return element.style[camelize(property)] || computedStyle.getPropertyValue(property);else if (isArray(property)) {
          var props = {};
          $.each(isArray(property) ? property : [property], function (_, prop) {
            props[prop] = element.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
          });
          return props;
        }
      }

      var css = '';
      if (type(property) == 'string') {
        if (!value && value !== 0) this.each(function () {
          this.style.removeProperty(dasherize(property));
        });else css = dasherize(property) + ":" + maybeAddPx(property, value);
      } else {
        for (key in property) {
          if (!property[key] && property[key] !== 0) this.each(function () {
            this.style.removeProperty(dasherize(key));
          });else css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';';
        }
      }

      return this.each(function () {
        this.style.cssText += ';' + css;
      });
    },
    index: function index(element) {
      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0]);
    },
    hasClass: function hasClass(name) {
      if (!name) return false;
      return emptyArray.some.call(this, function (el) {
        return this.test(className(el));
      }, classRE(name));
    },
    addClass: function addClass(name) {
      if (!name) return this;
      return this.each(function (idx) {
        classList = [];
        var cls = className(this),
            newName = funcArg(this, name, idx, cls);
        newName.split(/\s+/g).forEach(function (klass) {
          if (!$(this).hasClass(klass)) classList.push(klass);
        }, this);
        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "));
      });
    },
    removeClass: function removeClass(name) {
      return this.each(function (idx) {
        if (name === undefined) return className(this, '');
        classList = className(this);
        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
          classList = classList.replace(classRE(klass), " ");
        });
        className(this, classList.trim());
      });
    },
    toggleClass: function toggleClass(name, when) {
      if (!name) return this;
      return this.each(function (idx) {
        var $this = $(this),
            names = funcArg(this, name, idx, className(this));
        names.split(/\s+/g).forEach(function (klass) {
          (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass);
        });
      });
    },
    scrollTop: function scrollTop(value) {
      if (!this.length) return;
      var hasScrollTop = 'scrollTop' in this[0];
      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset;
      return this.each(hasScrollTop ? function () {
        this.scrollTop = value;
      } : function () {
        this.scrollTo(this.scrollX, value);
      });
    }
    //[Opt:A] : scrollLeft已经转移至plugin
    //[Opt:A] : position已经转移至plugin
    //[Opt:A] : offsetParent已经转移至plugin


    // for now
  };$.fn.detach = $.fn.remove

  // Generate the `width` and `height` functions
  // todo:高度值bug待修复
  ;
  ['width', 'height'].forEach(function (dimension) {
    var dimensionProperty = dimension.replace(/./, function (m) {
      return m[0].toUpperCase();
    });

    $.fn[dimension] = function (value) {
      var offset,
          el = this[0];
      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] : isDocument(el) ? el.documentElement['scroll' + dimensionProperty] : (offset = this.offset()) && offset[dimension];else return this.each(function (idx) {
        el = $(this);
        el.css(dimension, funcArg(this, value, idx, el[dimension]()));
      });
    };
  })

  // Generate the `after`, `prepend`, `before`, `append`,
  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
  // [Opt:C] 将全部变量，改为局部变量
  ;
  ['after', 'prepend', 'before', 'append'].forEach(function (operator, operatorIndex) {
    var inside = operatorIndex % 2; //=> prepend, append

    $.fn[operator] = function () {
      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
      var argType,
          nodes = $.map(arguments, function (arg) {
        argType = type(arg);
        return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg);
      }),
          parent,
          copyByClone = this.length > 1;
      if (nodes.length < 1) return this;

      return this.each(function (_, target) {
        parent = inside ? target : target.parentNode;

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;

        // [Opt:C] 全部变量局部化
        var traverseNode = function traverseNode(node, fun) {
          fun(node);
          for (var key in node.childNodes) {
            traverseNode(node.childNodes[key], fun);
          }
        };

        nodes.forEach(function (node) {

          if (copyByClone) node = node.cloneNode(true);else if (!parent) return $(node).remove();

          traverseNode(parent.insertBefore(node, target), function (el) {
            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript') && !el.src) win['eval'].call(win, el.innerHTML);
          });
        });
      });
    };

    // after    => insertAfter
    // prepend  => prependTo
    // before   => insertBefore
    // append   => appendTo
    $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function (html) {
      $(html)[operator](this);
      return this;
    };
  });

  zepto.Z.prototype = $.fn;

  // Export internal API functions in the `$.zepto` namespace
  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = $.yocto = zepto;

  return $;
}();

module.exports = Yocto;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(46);

// Event Module
var _zid = 1,
    undefined,
    slice = Array.prototype.slice,
    isFunction = $.isFunction,
    isString = function isString(obj) {
  return typeof obj == 'string';
},
    handlers = {},
    specialEvents = {};

specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

function zid(element) {
  return element._zid || (element._zid = _zid++);
}
function findHandlers(element, event, fn, selector) {
  event = parse(event);
  if (event.ns) var matcher = matcherFor(event.ns);
  return (handlers[zid(element)] || []).filter(function (handler) {
    return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector);
  });
}
function parse(event) {
  var parts = ('' + event).split('.');
  // e——事件名 ns——命名空间
  return { e: parts[0], ns: parts.slice(1).sort().join(' ') };
}
function matcherFor(ns) {
  return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)');
}

function eventCapture(handler, captureSetting) {
  return handler.del && (handler.e === 'focus' || handler.e === 'blur') || !!captureSetting;
}

function add(element, events, fn, data, selector, delegator, capture) {
  var id = zid(element),
      set = handlers[id] || (handlers[id] = []);
  events.split(/\s/).forEach(function (event) {
    if (event == 'ready') return $(document).ready(fn);
    var handler = parse(event);
    handler.fn = fn;
    handler.sel = selector;

    handler.del = delegator;
    var callback = delegator || fn;
    handler.proxy = function (e) {
      //Android下如果同时存在tap逻辑并且事件类型为click,阻止浏览器自己触发的点击事件
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && $.gestures && $.gestures.tap && handler.e === 'click' && !e.animaClick) {
        if (e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        } else {
          e.propagationStopped = true;
        }

        e.stopPropagation();
        e.preventDefault();

        return false;
      }

      e = compatible(e);
      if (e.isImmediatePropagationStopped()) return;
      e.data = data;
      var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args));
      if (result === false) e.preventDefault(), e.stopPropagation();
      return result;
    };
    handler.i = set.length;
    set.push(handler);
    if ('addEventListener' in element) {
      // 自定义手势逻辑
      if ($.gestures && $.gestures.list && $.gestures.list[handler.e]) {
        $.gestures.list[handler.e](element);
      }

      element.addEventListener(handler.e, handler.proxy, eventCapture(handler, capture));
    }
  });
}
function remove(element, events, fn, selector, capture) {
  var id = zid(element);(events || '').split(/\s/).forEach(function (event) {
    findHandlers(element, event, fn, selector).forEach(function (handler) {
      delete handlers[id][handler.i];
      if ('removeEventListener' in element) element.removeEventListener(handler.e, handler.proxy, eventCapture(handler, capture));
    });
  });
}

$.event = { add: add, remove: remove };

$.proxy = function (fn, context) {
  if (isFunction(fn)) {
    var proxyFn = function proxyFn() {
      return fn.apply(context, arguments);
    };
    proxyFn._zid = zid(fn);
    return proxyFn;
  } else if (isString(context)) {
    return $.proxy(fn[context], fn);
  } else {
    throw new TypeError("expected function");
  }
};

$.fn.one = function (event, selector, data, callback) {
  return this.on(event, selector, data, callback, 1);
};

var returnTrue = function returnTrue() {
  return true;
},
    returnFalse = function returnFalse() {
  return false;
},
    ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$)/,
    eventMethods = {
  preventDefault: 'isDefaultPrevented',
  stopImmediatePropagation: 'isImmediatePropagationStopped',
  stopPropagation: 'isPropagationStopped'
};

function compatible(event, source) {
  if (source || !event.isDefaultPrevented) {
    source || (source = event);

    $.each(eventMethods, function (name, predicate) {
      var sourceMethod = source[name];
      event[name] = function () {
        this[predicate] = returnTrue;
        return sourceMethod && sourceMethod.apply(source, arguments);
      };
      event[predicate] = returnFalse;
    });

    if (source.defaultPrevented !== undefined ? source.defaultPrevented : 'returnValue' in source ? source.returnValue === false : source.getPreventDefault && source.getPreventDefault()) event.isDefaultPrevented = returnTrue;
  }
  return event;
}

function createProxy(event) {
  var key,
      proxy = { originalEvent: event };
  for (key in event) {
    if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key];
  }return compatible(proxy, event);
}

$.fn.on = function (event, selector, data, callback, one) {
  var autoRemove,
      delegator,
      $this = this;
  if (event && !isString(event)) {
    $.each(event, function (type, fn) {
      $this.on(type, selector, data, fn, one);
    });
    return $this;
  }

  if (!isString(selector) && !isFunction(callback) && callback !== false) callback = data, data = selector, selector = undefined;
  if (isFunction(data) || data === false) callback = data, data = undefined;

  if (callback === false) callback = returnFalse;

  return $this.each(function (_, element) {
    if (one) autoRemove = function autoRemove(e) {
      remove(element, e.type, callback);
      return callback.apply(this, arguments);
    };

    if (selector) delegator = function delegator(e) {
      var evt,
          match = $(e.target).closest(selector, element).get(0);
      if (match && match !== element) {
        evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element });
        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)));
      }
    };

    add(element, event, callback, data, selector, delegator || autoRemove);
  });
};
$.fn.off = function (event, selector, callback) {
  var $this = this;
  if (event && !isString(event)) {
    $.each(event, function (type, fn) {
      $this.off(type, selector, fn);
    });
    return $this;
  }

  if (!isString(selector) && !isFunction(callback) && callback !== false) callback = selector, selector = undefined;

  if (callback === false) callback = returnFalse;

  return $this.each(function () {
    remove(this, event, callback, selector);
  });
};

$.fn.trigger = function (event, args) {
  event = isString(event) || $.isPlainObject(event) ? $.Event(event) : compatible(event);
  event._args = args;
  return this.each(function () {
    // items in the collection might not be DOM elements
    if ('dispatchEvent' in this) this.dispatchEvent(event);else $(this).triggerHandler(event, args);
  });
};

// triggers event handlers on current element just as if an event occurred,
// doesn't trigger an actual event, doesn't bubble
$.fn.triggerHandler = function (event, args) {
  var e, result;
  this.each(function (i, element) {
    e = createProxy(isString(event) ? $.Event(event) : event);
    e._args = args;
    e.target = element;
    $.each(findHandlers(element, event.type || event), function (i, handler) {
      result = handler.proxy(e);
      if (e.isImmediatePropagationStopped()) return false;
    });
  });
  return result;
}

// shortcut methods for `.bind(event, fn)` for each event type
;('focusin focusout load resize scroll unload click dblclick ' +
// 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+
'change select keydown keypress keyup error').split(' ').forEach(function (event) {
  $.fn[event] = function (callback) {
    return callback ? this.on(event, callback) : this.trigger(event);
  };
});['focus', 'blur'].forEach(function (name) {
  $.fn[name] = function (callback) {
    if (callback) this.on(name, callback);else this.each(function () {
      try {
        this[name]();
      } catch (e) {}
    });
    return this;
  };
});

$.Event = function (type, props) {
  if (!isString(type)) props = type, type = props.type;
  var event = document.createEvent(specialEvents[type] || 'Events'),
      bubbles = true;
  if (props) for (var name in props) {
    name == 'bubbles' ? bubbles = !!props[name] : event[name] = props[name];
  }event.initEvent(type, bubbles, true);
  return compatible(event);
};

module.exports = $;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(46),
    util = __webpack_require__(48);

__webpack_require__(49);

var jsonpID = Date.now(),
    document = window.document,
    ajaxBeforeSend = util.ajaxBeforeSend,
    ajaxSuccess = util.ajaxSuccess,
    ajaxError = util.ajaxError;

$.ajaxJSONP = function (options, deferred) {
  if (!('type' in options)) return $.ajax && $.ajax(options);

  var _callbackName = options.jsonpCallback,
      callbackName = ($.isFunction(_callbackName) ? _callbackName() : _callbackName) || 'jsonp' + ++jsonpID,
      script = document.createElement('script'),
      originalCallback = window[callbackName],
      responseData,
      abort = function abort(errorType) {
    $(script).triggerHandler('error', errorType || 'abort');
  },
      xhr = { abort: abort },
      abortTimeout;

  if (deferred) deferred.promise(xhr);

  $(script).on('load error', function (e, errorType) {
    clearTimeout(abortTimeout);
    $(script).off().remove();

    if (e.type == 'error' || !responseData) {
      ajaxError(null, errorType || 'error', xhr, options, deferred);
    } else {
      ajaxSuccess(responseData[0], xhr, options, deferred);
    }

    window[callbackName] = originalCallback;
    if (responseData && $.isFunction(originalCallback)) originalCallback(responseData[0]);

    originalCallback = responseData = undefined;
  });

  if (ajaxBeforeSend(xhr, options) === false) {
    abort('abort');
    return xhr;
  }

  window[callbackName] = function () {
    responseData = arguments;
  };

  script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName);
  document.head.appendChild(script);

  if (options.timeout > 0) abortTimeout = setTimeout(function () {
    abort('timeout');
  }, options.timeout);

  return xhr;
};

module.exports = $;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(46),
    util = __webpack_require__(48);

__webpack_require__(49);

var key,
    name,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/,
    ajaxBeforeSend = util.ajaxBeforeSend,
    ajaxSuccess = util.ajaxSuccess,
    ajaxError = util.ajaxError;

function empty() {}

$.ajaxSettings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger "global" Ajax events
  global: true,
  // Transport
  xhr: function xhr() {
    return new window.XMLHttpRequest();
  },
  // MIME types mapping
  // IIS returns Javascript as "application/x-javascript"
  accepts: {
    script: 'text/javascript, application/javascript, application/x-javascript',
    json: jsonType,
    xml: 'application/xml, text/xml',
    html: htmlType,
    text: 'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0,
  // Whether data should be serialized to string
  processData: true,
  // Whether the browser should be allowed to cache GET responses
  cache: true
};

function mimeToDataType(mime) {
  if (mime) mime = mime.split(';', 2)[0];
  return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
}

function appendQuery(url, query) {
  if (query == '') return url;
  return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
  if (options.processData && options.data && $.type(options.data) != "string") options.data = $.param(options.data, options.traditional);
  if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data), options.data = undefined;
}

$.ajax = function (options) {
  var settings = $.extend({}, options || {}),
      deferred = $.Deferred && $.Deferred();
  for (key in $.ajaxSettings) {
    if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
  }if (!settings.crossDomain) settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host;

  if (!settings.url) settings.url = window.location.toString();
  serializeData(settings);
  if (settings.cache === false) settings.url = appendQuery(settings.url, '_=' + Date.now());

  var dataType = settings.dataType,
      hasPlaceholder = /\?.+=\?/.test(settings.url);
  if (dataType == 'jsonp' || hasPlaceholder) {
    if (!hasPlaceholder) settings.url = appendQuery(settings.url, settings.jsonp ? settings.jsonp + '=?' : settings.jsonp === false ? '' : 'callback=?');
    return $.ajaxJSONP(settings, deferred);
  }

  var mime = settings.accepts[dataType],
      headers = {},
      setHeader = function setHeader(name, value) {
    headers[name.toLowerCase()] = [name, value];
  },
      protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
      xhr = settings.xhr(),
      nativeSetHeader = xhr.setRequestHeader,
      abortTimeout;

  if (deferred) deferred.promise(xhr);

  if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest');
  setHeader('Accept', mime || '*/*');
  if (mime) {
    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
    xhr.overrideMimeType && xhr.overrideMimeType(mime);
  }
  if (settings.contentType || settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET') setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');

  if (settings.headers) for (name in settings.headers) {
    setHeader(name, settings.headers[name]);
  }xhr.setRequestHeader = setHeader;

  var async = 'async' in settings ? settings.async : true;
  xhr.open(settings.type, settings.url, async);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      xhr.onreadystatechange = empty;
      clearTimeout(abortTimeout);
      var result,
          error = false;
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
        dataType = dataType || mimeToDataType(xhr.getResponseHeader('content-type'));
        result = xhr.responseText;

        try {
          // http://perfectionkills.com/global-eval-what-are-the-options/
          if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result);
        } catch (e) {
          error = e;
        }

        if (error) ajaxError(error, 'parsererror', xhr, settings, deferred);else ajaxSuccess(result, xhr, settings, deferred);
      } else {
        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred);
      }
    }
  };

  if (ajaxBeforeSend(xhr, settings) === false) {
    xhr.abort();
    ajaxError(null, 'abort', xhr, settings, deferred);
    return xhr;
  }

  for (name in headers) {
    nativeSetHeader.apply(xhr, headers[name]);
  } // if (settings.timeout > 0) abortTimeout = setTimeout(function(){
  //     xhr.onreadystatechange = empty
  //     xhr.abort()
  //     ajaxError(null, 'timeout', xhr, settings, deferred)
  //   }, settings.timeout)

  // 使用原生timeout属性
  if (settings.timeout > 0) {
    xhr.timeout = settings.timeout;
    xhr.ontimeout = function () {
      xhr.onreadystatechange = empty;
      xhr.abort();
      ajaxError(null, 'timeout', xhr, settings, deferred);
    };
  }

  // avoid sending empty string (#319)
  xhr.send(settings.data ? settings.data : null);
  return xhr;
};

// handle optional data/success arguments
function parseArguments(url, data, success, dataType) {
  if ($.isFunction(data)) dataType = success, success = data, data = undefined;
  if (!$.isFunction(success)) dataType = success, success = undefined;
  return {
    url: url,
    data: data,
    success: success,
    dataType: dataType
  };
}

$.get = function () /* url, data, success, dataType */{
  return $.ajax(parseArguments.apply(null, arguments));
};

$.post = function () /* url, data, success, dataType */{
  var options = parseArguments.apply(null, arguments);
  options.type = 'POST';
  return $.ajax(options);
};

$.getJSON = function () /* url, data, success */{
  var options = parseArguments.apply(null, arguments);
  options.dataType = 'json';
  return $.ajax(options);
};

$.fn.load = function (url, data, success) {
  if (!this.length) return this;
  var self = this,
      parts = url.split(/\s/),
      selector,
      options = parseArguments(url, data, success),
      callback = options.success;
  if (parts.length > 1) options.url = parts[0], selector = parts[1];
  options.success = function (response) {
    self.html(selector ? $('<div>').html(response.replace(rscript, "")).find(selector) : response);
    callback && callback.apply(self, arguments);
  };
  $.ajax(options);
  return this;
};

var escape = encodeURIComponent;

function serialize(params, obj, traditional, scope) {
  var type,
      array = $.isArray(obj),
      hash = $.isPlainObject(obj);
  $.each(obj, function (key, value) {
    type = $.type(value);
    if (scope) key = traditional ? scope : scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']';
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value);
    // recurse into nested objects
    else if (type == "array" || !traditional && type == "object") serialize(params, value, traditional, key);else params.add(key, value);
  });
}

$.param = function (obj, traditional) {
  var params = [];
  params.add = function (k, v) {
    this.push(escape(k) + '=' + escape(v));
  };
  serialize(params, obj, traditional);
  return params.join('&').replace(/%20/g, '+');
};

module.exports = $;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _net = __webpack_require__(1);

var _net2 = _interopRequireDefault(_net);

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

var _MLogin = __webpack_require__(95);

var _MLogin2 = _interopRequireDefault(_MLogin);

var _Share = __webpack_require__(50);

var _Share2 = _interopRequireDefault(_Share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mlogin = void 0;
migi.eventBus.on('NEED_LOGIN', function () {
  if (!mlogin) {
    mlogin = migi.render(migi.createCp(_MLogin2.default, []), document.body);
  }
  mlogin.show();
});

var share = void 0;
migi.eventBus.on('SHARE', function (url) {
  if (!share) {
    share = migi.render(migi.createCp(_Share2.default, []), document.body);
  }
  share.url = url;
  share.show();
});

document.addEventListener('DOMContentLoaded', function () {
  var $name = $('#topNav .name');
  $name.on('click', function () {
    if (!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  });
  var $head = $('#topNav img');
  $head.on('click', function () {
    if (!$CONFIG.isLogin) {
      migi.eventBus.emit('NEED_LOGIN');
    }
  });
  var loading = void 0;
  var $public = $('#topNav .public').eq(0);
  $public.on('click', function () {
    if (loading) {
      return;
    }
    loading = true;
    var isPublic = $CONFIG.isPublic;
    _net2.default.postJSON('/api/user/altSettle', { public: !isPublic }, function (res) {
      if (res.success) {
        $CONFIG.isPublic = !isPublic;
        if (!isPublic) {
          $name.addClass('public');
          $name.text($CONFIG.authorName);
          $public.text('[切换到马甲]');
        } else {
          $name.removeClass('public');
          $name.text($CONFIG.uname);
          $public.text('[切换到作者]');
        }
      } else {
        alert(res.message || _util2.default.ERROR_MESSAGE);
      }
      loading = false;
    }, function (res) {
      alert(res.message || _util2.default.ERROR_MESSAGE);
      loading = false;
    });
  });
});

/***/ }),
/* 95 */
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
    key: "show",
    value: function show() {
      $(this.element).removeClass('fn-hide');
    }
  }, {
    key: "hide",
    value: function hide() {
      $(this.element).addClass('fn-hide');
    }
  }, {
    key: "clickClose",
    value: function clickClose(e) {
      e.preventDefault();
      this.hide();
    }
  }, {
    key: "clickWeibo",
    value: function clickWeibo(e) {
      e.preventDefault();
      location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-mlogin fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("h3", [], ["您尚未登录..."]), migi.createVd("p", [], [new migi.Obj("message", this, function () {
        return this.message || '登录后即可进行相关操作~';
      })]), migi.createVd("a", [["href", "/oauth/weibo"], ["class", "weibo"], ["onClick", new migi.Cb(this, this.clickWeibo)]], ["微博登录"]), migi.createVd("a", [["href", "#"], ["class", "close"], ["onClick", new migi.Cb(this, this.clickClose)]])])]);
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

  return NeedLogin;
}(migi.Component);

migi.name(NeedLogin, "NeedLogin");exports.default = NeedLogin;

/***/ }),
/* 96 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);