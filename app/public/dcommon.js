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
/******/ 	return __webpack_require__(__webpack_require__.s = 134);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
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
  return prop ? s.replace(/"/g, '&quot;') : s.replace(/</g, '&lt;');
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

var _VirtualDom = __webpack_require__(7);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _Obj = __webpack_require__(8);

var _Obj2 = _interopRequireDefault(_Obj);

var _EventBus = __webpack_require__(10);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Model = __webpack_require__(11);

var _Model2 = _interopRequireDefault(_Model);

var _Stream = __webpack_require__(25);

var _Stream2 = _interopRequireDefault(_Stream);

var _Fastclick = __webpack_require__(26);

var _Fastclick2 = _interopRequireDefault(_Fastclick);

var _array = __webpack_require__(40);

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
/* 6 */
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
/* 7 */
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

var _Obj = __webpack_require__(8);

var _Obj2 = _interopRequireDefault(_Obj);

var _Cb = __webpack_require__(12);

var _Cb2 = _interopRequireDefault(_Cb);

var _range = __webpack_require__(20);

var _range2 = _interopRequireDefault(_range);

var _match = __webpack_require__(35);

var _match2 = _interopRequireDefault(_match);

var _domDiff = __webpack_require__(36);

var _domDiff2 = _interopRequireDefault(_domDiff);

var _type = __webpack_require__(14);

var _type2 = _interopRequireDefault(_type);

var _fixEvent = __webpack_require__(23);

var _fixEvent2 = _interopRequireDefault(_fixEvent);

var _attr = __webpack_require__(37);

var _attr2 = _interopRequireDefault(_attr);

var _hash = __webpack_require__(6);

var _hash2 = _interopRequireDefault(_hash);

var _touch = __webpack_require__(38);

var _touch2 = _interopRequireDefault(_touch);

var _delegate = __webpack_require__(24);

var _delegate2 = _interopRequireDefault(_delegate);

var _matchUtil = __webpack_require__(16);

var _matchUtil2 = _interopRequireDefault(_matchUtil);

var _eventCaseName = __webpack_require__(39);

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
/* 8 */
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
/* 9 */,
/* 10 */
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

    // this.on(Event.DATA, this.__onData);
    return _this;
  }

  _createClass(Model, [{
    key: '__onData',
    value: function __onData(k, caller) {
      k = 'model.' + k;
      this.__ref.forEach(function (cp) {
        //set触发数据变更时，若已DOM则打开开关
        if (cp.dom) {
          cp.__canData = true;
        }
        // cp.emit(Event.DATA, k, caller);
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sort = __webpack_require__(15);

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
/* 17 */,
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

var _VirtualDom = __webpack_require__(7);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _Obj = __webpack_require__(8);

var _Obj2 = _interopRequireDefault(_Obj);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(13);

var _browser2 = _interopRequireDefault(_browser);

var _type = __webpack_require__(14);

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
        res += child.toString();
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
    //有实体字符时也不能用textContent
    if (/&([a-z]+|#\d+);/i.test(res)) {
      var node = _browser2.default.NODE;
      node.innerHTML = _util2.default.encodeHtml(res);
      elem.replaceChild(node.firstChild, textNode);
    } else {
      textNode.textContent = res;
    }
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

var _hash = __webpack_require__(6);

var _hash2 = _interopRequireDefault(_hash);

var _matchUtil = __webpack_require__(16);

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

var _Model2 = __webpack_require__(11);

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

var _EventBus = __webpack_require__(10);

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
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(34)['default'];

/***/ }),
/* 34 */
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

var _EventBus = __webpack_require__(10);

var _EventBus2 = _interopRequireDefault(_EventBus);

var _Model = __webpack_require__(11);

var _Model2 = _interopRequireDefault(_Model);

var _CacheModel = __webpack_require__(27);

var _CacheModel2 = _interopRequireDefault(_CacheModel);

var _Component = __webpack_require__(5);

var _Component2 = _interopRequireDefault(_Component);

var _VirtualDom = __webpack_require__(7);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _NonVisualComponent = __webpack_require__(41);

var _NonVisualComponent2 = _interopRequireDefault(_NonVisualComponent);

var _CacheComponent = __webpack_require__(28);

var _CacheComponent2 = _interopRequireDefault(_CacheComponent);

var _Obj = __webpack_require__(8);

var _Obj2 = _interopRequireDefault(_Obj);

var _Cb = __webpack_require__(12);

var _Cb2 = _interopRequireDefault(_Cb);

var _cachePool = __webpack_require__(22);

var _cachePool2 = _interopRequireDefault(_cachePool);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(13);

var _browser2 = _interopRequireDefault(_browser);

var _sort = __webpack_require__(15);

var _sort2 = _interopRequireDefault(_sort);

var _hash = __webpack_require__(6);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VirtualDom = __webpack_require__(7);

var _VirtualDom2 = _interopRequireDefault(_VirtualDom);

var _Event = __webpack_require__(2);

var _Event2 = _interopRequireDefault(_Event);

var _sort = __webpack_require__(15);

var _sort2 = _interopRequireDefault(_sort);

var _hash = __webpack_require__(6);

var _hash2 = _interopRequireDefault(_hash);

var _matchHash = __webpack_require__(21);

var _matchHash2 = _interopRequireDefault(_matchHash);

var _matchUtil = __webpack_require__(16);

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
/* 36 */
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

var _Cb = __webpack_require__(12);

var _Cb2 = _interopRequireDefault(_Cb);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _browser = __webpack_require__(13);

var _browser2 = _interopRequireDefault(_browser);

var _range = __webpack_require__(20);

var _range2 = _interopRequireDefault(_range);

var _cachePool = __webpack_require__(22);

var _cachePool2 = _interopRequireDefault(_cachePool);

var _type = __webpack_require__(14);

var _type2 = _interopRequireDefault(_type);

var _hash = __webpack_require__(6);

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
/* 37 */
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
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
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
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by army on 2017/3/19.
 * For my goddess.
 */



__webpack_require__(32);

__webpack_require__(33);

var _jquery = __webpack_require__(135);

var _jquery2 = _interopRequireDefault(_jquery);

var _cookie = __webpack_require__(136);

var _cookie2 = _interopRequireDefault(_cookie);

__webpack_require__(137);

__webpack_require__(140);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cookie2.default)(_jquery2.default);

window.requestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 16.7);
  };
}();

window.$ = _jquery2.default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
(function (global, factory) {

	"use strict";

	if (( false ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ? factory(global, true) : function (w) {
			if (!w.document) {
				throw new Error("jQuery requires a window with a document");
			}
			return factory(w);
		};
	} else {
		factory(global);
	}

	// Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var _slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	var support = {};

	function DOMEval(code, doc) {
		doc = doc || document;

		var script = doc.createElement("script");

		script.text = code;
		doc.head.appendChild(script).parentNode.removeChild(script);
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module


	var version = "3.2.1",


	// Define a local copy of jQuery
	jQuery = function jQuery(selector, context) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init(selector, context);
	},


	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,


	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	    rdashAlpha = /-([a-z])/g,


	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function fcamelCase(all, letter) {
		return letter.toUpperCase();
	};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function toArray() {
			return _slice.call(this);
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function get(num) {

			// Return all the elements in a clean array
			if (num == null) {
				return _slice.call(this);
			}

			// Return just the one element from the set
			return num < 0 ? this[num + this.length] : this[num];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function pushStack(elems) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge(this.constructor(), elems);

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function each(callback) {
			return jQuery.each(this, callback);
		},

		map: function map(callback) {
			return this.pushStack(jQuery.map(this, function (elem, i) {
				return callback.call(elem, i, elem);
			}));
		},

		slice: function slice() {
			return this.pushStack(_slice.apply(this, arguments));
		},

		first: function first() {
			return this.eq(0);
		},

		last: function last() {
			return this.eq(-1);
		},

		eq: function eq(i) {
			var len = this.length,
			    j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},

		end: function end() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function () {
		var options,
		    name,
		    src,
		    copy,
		    copyIsArray,
		    clone,
		    target = arguments[0] || {},
		    i = 1,
		    length = arguments.length,
		    deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

						if (copyIsArray) {
							copyIsArray = false;
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function error(msg) {
			throw new Error(msg);
		},

		noop: function noop() {},

		isFunction: function isFunction(obj) {
			return jQuery.type(obj) === "function";
		},

		isWindow: function isWindow(obj) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function isNumeric(obj) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type(obj);
			return (type === "number" || type === "string") &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN(obj - parseFloat(obj));
		},

		isPlainObject: function isPlainObject(obj) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if (!obj || toString.call(obj) !== "[object Object]") {
				return false;
			}

			proto = getProto(obj);

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if (!proto) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
			return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
		},

		isEmptyObject: function isEmptyObject(obj) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for (name in obj) {
				return false;
			}
			return true;
		},

		type: function type(obj) {
			if (obj == null) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
		},

		// Evaluates a script in a global context
		globalEval: function globalEval(code) {
			DOMEval(code);
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function camelCase(string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},

		each: function each(obj, callback) {
			var length,
			    i = 0;

			if (isArrayLike(obj)) {
				length = obj.length;
				for (; i < length; i++) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			} else {
				for (i in obj) {
					if (callback.call(obj[i], i, obj[i]) === false) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function trim(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},

		// results is for internal usage only
		makeArray: function makeArray(arr, results) {
			var ret = results || [];

			if (arr != null) {
				if (isArrayLike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},

		inArray: function inArray(elem, arr, i) {
			return arr == null ? -1 : indexOf.call(arr, elem, i);
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function merge(first, second) {
			var len = +second.length,
			    j = 0,
			    i = first.length;

			for (; j < len; j++) {
				first[i++] = second[j];
			}

			first.length = i;

			return first;
		},

		grep: function grep(elems, callback, invert) {
			var callbackInverse,
			    matches = [],
			    i = 0,
			    length = elems.length,
			    callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function map(elems, callback, arg) {
			var length,
			    value,
			    i = 0,
			    ret = [];

			// Go through the array, translating each of the items to their new values
			if (isArrayLike(elems)) {
				length = elems.length;
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}

				// Go through every key on the object,
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);

					if (value != null) {
						ret.push(value);
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply([], ret);
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function proxy(fn, context) {
			var tmp, args, proxy;

			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}

			// Simulated bind
			args = _slice.call(arguments, 2);
			proxy = function proxy() {
				return fn.apply(context || this, args.concat(_slice.call(arguments)));
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	if (typeof Symbol === "function") {
		jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
	}

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	function isArrayLike(obj) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
		    type = jQuery.type(obj);

		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}

		return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
	}
	var Sizzle =
	/*!
  * Sizzle CSS Selector Engine v2.3.3
  * https://sizzlejs.com/
  *
  * Copyright jQuery Foundation and other contributors
  * Released under the MIT license
  * http://jquery.org/license
  *
  * Date: 2016-08-08
  */
	function (window) {

		var i,
		    support,
		    Expr,
		    getText,
		    isXML,
		    tokenize,
		    compile,
		    select,
		    outermostContext,
		    sortInput,
		    hasDuplicate,


		// Local document vars
		setDocument,
		    document,
		    docElem,
		    documentIsHTML,
		    rbuggyQSA,
		    rbuggyMatches,
		    matches,
		    contains,


		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		    preferredDoc = window.document,
		    dirruns = 0,
		    done = 0,
		    classCache = createCache(),
		    tokenCache = createCache(),
		    compilerCache = createCache(),
		    sortOrder = function sortOrder(a, b) {
			if (a === b) {
				hasDuplicate = true;
			}
			return 0;
		},


		// Instance methods
		hasOwn = {}.hasOwnProperty,
		    arr = [],
		    pop = arr.pop,
		    push_native = arr.push,
		    push = arr.push,
		    slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function indexOf(list, elem) {
			var i = 0,
			    len = list.length;
			for (; i < len; i++) {
				if (list[i] === elem) {
					return i;
				}
			}
			return -1;
		},
		    booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",


		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",


		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",


		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
		    pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" + ")\\)|)",


		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp(whitespace + "+", "g"),
		    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
		    rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
		    rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
		    rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
		    rpseudo = new RegExp(pseudos),
		    ridentifier = new RegExp("^" + identifier + "$"),
		    matchExpr = {
			"ID": new RegExp("^#(" + identifier + ")"),
			"CLASS": new RegExp("^\\.(" + identifier + ")"),
			"TAG": new RegExp("^(" + identifier + "|[*])"),
			"ATTR": new RegExp("^" + attributes),
			"PSEUDO": new RegExp("^" + pseudos),
			"CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
			"bool": new RegExp("^(?:" + booleans + ")$", "i"),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
		},
		    rinputs = /^(?:input|select|textarea|button)$/i,
		    rheader = /^h\d$/i,
		    rnative = /^[^{]+\{\s*\[native \w/,


		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		    rsibling = /[+~]/,


		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
		    funescape = function funescape(_, escaped, escapedWhitespace) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ? escaped : high < 0 ?
			// BMP codepoint
			String.fromCharCode(high + 0x10000) :
			// Supplemental Plane codepoint (surrogate pair)
			String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
		},


		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		    fcssescape = function fcssescape(ch, asCodePoint) {
			if (asCodePoint) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if (ch === "\0") {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},


		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function unloadHandler() {
			setDocument();
		},
		    disabledAncestor = addCombinator(function (elem) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		}, { dir: "parentNode", next: "legend" });

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
			// Support: Android<4.0
			// Detect silently failing push.apply
			arr[preferredDoc.childNodes.length].nodeType;
		} catch (e) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function (target, els) {
					push_native.apply(target, slice.call(els));
				} :

				// Support: IE<9
				// Otherwise append directly
				function (target, els) {
					var j = target.length,
					    i = 0;
					// Can't trust NodeList.length
					while (target[j++] = els[i++]) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle(selector, context, results, seed) {
			var m,
			    i,
			    elem,
			    nid,
			    match,
			    groups,
			    newSelector,
			    newContext = context && context.ownerDocument,


			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if (!seed) {

				if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
					setDocument(context);
				}
				context = context || document;

				if (documentIsHTML) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

						// ID selector
						if (m = match[1]) {

							// Document context
							if (nodeType === 9) {
								if (elem = context.getElementById(m)) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}

								// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {

									results.push(elem);
									return results;
								}
							}

							// Type selector
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;

							// Class selector
						} else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {

							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {

						if (nodeType !== 1) {
							newContext = context;
							newSelector = selector;

							// qSA looks outside Element context, which is not what we want
							// Thanks to Andrew Dupont for this workaround technique
							// Support: IE <=8
							// Exclude object elements
						} else if (context.nodeName.toLowerCase() !== "object") {

							// Capture the context ID, setting it first if necessary
							if (nid = context.getAttribute("id")) {
								nid = nid.replace(rcssescape, fcssescape);
							} else {
								context.setAttribute("id", nid = expando);
							}

							// Prefix every selector in the list
							groups = tokenize(selector);
							i = groups.length;
							while (i--) {
								groups[i] = "#" + nid + " " + toSelector(groups[i]);
							}
							newSelector = groups.join(",");

							// Expand context for sibling selectors
							newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
						}

						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {} finally {
								if (nid === expando) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
			}

			// All others
			return select(selector.replace(rtrim, "$1"), context, results, seed);
		}

		/**
   * Create key-value caches of limited size
   * @returns {function(string, object)} Returns the Object data after storing it on itself with
   *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
   *	deleting the oldest entry
   */
		function createCache() {
			var keys = [];

			function cache(key, value) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if (keys.push(key + " ") > Expr.cacheLength) {
					// Only keep the most recent entries
					delete cache[keys.shift()];
				}
				return cache[key + " "] = value;
			}
			return cache;
		}

		/**
   * Mark a function for special use by Sizzle
   * @param {Function} fn The function to mark
   */
		function markFunction(fn) {
			fn[expando] = true;
			return fn;
		}

		/**
   * Support testing using an element
   * @param {Function} fn Passed the created element and returns a boolean result
   */
		function assert(fn) {
			var el = document.createElement("fieldset");

			try {
				return !!fn(el);
			} catch (e) {
				return false;
			} finally {
				// Remove from its parent by default
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
				// release memory in IE
				el = null;
			}
		}

		/**
   * Adds the same handler for all of the specified attrs
   * @param {String} attrs Pipe-separated list of attributes
   * @param {Function} handler The method that will be applied
   */
		function addHandle(attrs, handler) {
			var arr = attrs.split("|"),
			    i = arr.length;

			while (i--) {
				Expr.attrHandle[arr[i]] = handler;
			}
		}

		/**
   * Checks document order of two siblings
   * @param {Element} a
   * @param {Element} b
   * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
   */
		function siblingCheck(a, b) {
			var cur = b && a,
			    diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if (diff) {
				return diff;
			}

			// Check if b follows a
			if (cur) {
				while (cur = cur.nextSibling) {
					if (cur === b) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
   * Returns a function to use in pseudos for input types
   * @param {String} type
   */
		function createInputPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for buttons
   * @param {String} type
   */
		function createButtonPseudo(type) {
			return function (elem) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && elem.type === type;
			};
		}

		/**
   * Returns a function to use in pseudos for :enabled/:disabled
   * @param {Boolean} disabled true for :disabled; false for :enabled
   */
		function createDisabledPseudo(disabled) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function (elem) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ("form" in elem) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if (elem.parentNode && elem.disabled === false) {

						// Option elements defer to a parent optgroup if present
						if ("label" in elem) {
							if ("label" in elem.parentNode) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled;
					}

					return elem.disabled === disabled;

					// Try to winnow out elements that can't be disabled before trusting the disabled property.
					// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
					// even exist on them, let alone have a boolean value.
				} else if ("label" in elem) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
   * Returns a function to use in pseudos for positionals
   * @param {Function} fn
   */
		function createPositionalPseudo(fn) {
			return markFunction(function (argument) {
				argument = +argument;
				return markFunction(function (seed, matches) {
					var j,
					    matchIndexes = fn([], seed.length, argument),
					    i = matchIndexes.length;

					// Match elements found at the specified indexes
					while (i--) {
						if (seed[j = matchIndexes[i]]) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		/**
   * Checks a node for validity as a Sizzle context
   * @param {Element|Object=} context
   * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
   */
		function testContext(context) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
   * Detects XML nodes
   * @param {Element|Object} elem An element or a document
   * @returns {Boolean} True iff elem is a non-HTML XML node
   */
		isXML = Sizzle.isXML = function (elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		/**
   * Sets document-related variables once based on the current document
   * @param {Element|Object} [doc] An element or document object to use to set the document
   * @returns {Object} Returns the current document
   */
		setDocument = Sizzle.setDocument = function (node) {
			var hasCompare,
			    subWindow,
			    doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML(document);

			// Support: IE 9-11, Edge
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			if (preferredDoc !== document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {

				// Support: IE 11, Edge
				if (subWindow.addEventListener) {
					subWindow.addEventListener("unload", unloadHandler, false);

					// Support: IE 9 - 10 only
				} else if (subWindow.attachEvent) {
					subWindow.attachEvent("onunload", unloadHandler);
				}
			}

			/* Attributes
   ---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert(function (el) {
				el.className = "i";
				return !el.getAttribute("className");
			});

			/* getElement(s)By*
   ---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert(function (el) {
				el.appendChild(document.createComment(""));
				return !el.getElementsByTagName("*").length;
			});

			// Support: IE<9
			support.getElementsByClassName = rnative.test(document.getElementsByClassName);

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert(function (el) {
				docElem.appendChild(el).id = expando;
				return !document.getElementsByName || !document.getElementsByName(expando).length;
			});

			// ID filter and find
			if (support.getById) {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						return elem.getAttribute("id") === attrId;
					};
				};
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var elem = context.getElementById(id);
						return elem ? [elem] : [];
					}
				};
			} else {
				Expr.filter["ID"] = function (id) {
					var attrId = id.replace(runescape, funescape);
					return function (elem) {
						var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find["ID"] = function (id, context) {
					if (typeof context.getElementById !== "undefined" && documentIsHTML) {
						var node,
						    i,
						    elems,
						    elem = context.getElementById(id);

						if (elem) {

							// Verify the id attribute
							node = elem.getAttributeNode("id");
							if (node && node.value === id) {
								return [elem];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName(id);
							i = 0;
							while (elem = elems[i++]) {
								node = elem.getAttributeNode("id");
								if (node && node.value === id) {
									return [elem];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find["TAG"] = support.getElementsByTagName ? function (tag, context) {
				if (typeof context.getElementsByTagName !== "undefined") {
					return context.getElementsByTagName(tag);

					// DocumentFragment nodes don't have gEBTN
				} else if (support.qsa) {
					return context.querySelectorAll(tag);
				}
			} : function (tag, context) {
				var elem,
				    tmp = [],
				    i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName(tag);

				// Filter out possible comments
				if (tag === "*") {
					while (elem = results[i++]) {
						if (elem.nodeType === 1) {
							tmp.push(elem);
						}
					}

					return tmp;
				}
				return results;
			};

			// Class
			Expr.find["CLASS"] = support.getElementsByClassName && function (className, context) {
				if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
					return context.getElementsByClassName(className);
				}
			};

			/* QSA/matchesSelector
   ---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if (support.qsa = rnative.test(document.querySelectorAll)) {
				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert(function (el) {
					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if (el.querySelectorAll("[msallowcapture^='']").length) {
						rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if (!el.querySelectorAll("[selected]").length) {
						rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
						rbuggyQSA.push("~=");
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if (!el.querySelectorAll(":checked").length) {
						rbuggyQSA.push(":checked");
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if (!el.querySelectorAll("a#" + expando + "+*").length) {
						rbuggyQSA.push(".#.+[+~]");
					}
				});

				assert(function (el) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" + "<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement("input");
					input.setAttribute("type", "hidden");
					el.appendChild(input).setAttribute("name", "D");

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if (el.querySelectorAll("[name=d]").length) {
						rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if (el.querySelectorAll(":enabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild(el).disabled = true;
					if (el.querySelectorAll(":disabled").length !== 2) {
						rbuggyQSA.push(":enabled", ":disabled");
					}

					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll("*,:x");
					rbuggyQSA.push(",.*:");
				});
			}

			if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {

				assert(function (el) {
					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call(el, "*");

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(el, "[s!='']:x");
					rbuggyMatches.push("!=", pseudos);
				});
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
			rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

			/* Contains
   ---------------------------------------------------------------------- */
			hasCompare = rnative.test(docElem.compareDocumentPosition);

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
				    bup = b && b.parentNode;
				return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
			} : function (a, b) {
				if (b) {
					while (b = b.parentNode) {
						if (b === a) {
							return true;
						}
					}
				}
				return false;
			};

			/* Sorting
   ---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ? function (a, b) {

				// Flag for duplicate removal
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if (compare) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) :

				// Otherwise we know they are disconnected
				1;

				// Disconnected nodes
				if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {

					// Choose the first element that is related to our preferred document
					if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
						return -1;
					}
					if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
						return 1;
					}

					// Maintain original order
					return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
				}

				return compare & 4 ? -1 : 1;
			} : function (a, b) {
				// Exit early if the nodes are identical
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
				    i = 0,
				    aup = a.parentNode,
				    bup = b.parentNode,
				    ap = [a],
				    bp = [b];

				// Parentless nodes are either documents or disconnected
				if (!aup || !bup) {
					return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;

					// If the nodes are siblings, we can do a quick check
				} else if (aup === bup) {
					return siblingCheck(a, b);
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while (cur = cur.parentNode) {
					ap.unshift(cur);
				}
				cur = b;
				while (cur = cur.parentNode) {
					bp.unshift(cur);
				}

				// Walk down the tree looking for a discrepancy
				while (ap[i] === bp[i]) {
					i++;
				}

				return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck(ap[i], bp[i]) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
			};

			return document;
		};

		Sizzle.matches = function (expr, elements) {
			return Sizzle(expr, null, null, elements);
		};

		Sizzle.matchesSelector = function (elem, expr) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			// Make sure that attribute selectors are quoted
			expr = expr.replace(rattributeQuotes, "='$1']");

			if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {

				try {
					var ret = matches.call(elem, expr);

					// IE 9's matchesSelector returns false on disconnected nodes
					if (ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11) {
						return ret;
					}
				} catch (e) {}
			}

			return Sizzle(expr, document, null, [elem]).length > 0;
		};

		Sizzle.contains = function (context, elem) {
			// Set document vars if needed
			if ((context.ownerDocument || context) !== document) {
				setDocument(context);
			}
			return contains(context, elem);
		};

		Sizzle.attr = function (elem, name) {
			// Set document vars if needed
			if ((elem.ownerDocument || elem) !== document) {
				setDocument(elem);
			}

			var fn = Expr.attrHandle[name.toLowerCase()],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;

			return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
		};

		Sizzle.escape = function (sel) {
			return (sel + "").replace(rcssescape, fcssescape);
		};

		Sizzle.error = function (msg) {
			throw new Error("Syntax error, unrecognized expression: " + msg);
		};

		/**
   * Document sorting and removing duplicates
   * @param {ArrayLike} results
   */
		Sizzle.uniqueSort = function (results) {
			var elem,
			    duplicates = [],
			    j = 0,
			    i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice(0);
			results.sort(sortOrder);

			if (hasDuplicate) {
				while (elem = results[i++]) {
					if (elem === results[i]) {
						j = duplicates.push(i);
					}
				}
				while (j--) {
					results.splice(duplicates[j], 1);
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
   * Utility function for retrieving the text value of an array of DOM nodes
   * @param {Array|Element} elem
   */
		getText = Sizzle.getText = function (elem) {
			var node,
			    ret = "",
			    i = 0,
			    nodeType = elem.nodeType;

			if (!nodeType) {
				// If no nodeType, this is expected to be an array
				while (node = elem[i++]) {
					// Do not traverse comment nodes
					ret += getText(node);
				}
			} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if (typeof elem.textContent === "string") {
					return elem.textContent;
				} else {
					// Traverse its children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText(elem);
					}
				}
			} else if (nodeType === 3 || nodeType === 4) {
				return elem.nodeValue;
			}
			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function ATTR(match) {
					match[1] = match[1].replace(runescape, funescape);

					// Move the given value to match[3] whether quoted or unquoted
					match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

					if (match[2] === "~=") {
						match[3] = " " + match[3] + " ";
					}

					return match.slice(0, 4);
				},

				"CHILD": function CHILD(match) {
					/* matches from matchExpr["CHILD"]
     	1 type (only|nth|...)
     	2 what (child|of-type)
     	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
     	4 xn-component of xn+y argument ([+-]?\d*n|)
     	5 sign of xn-component
     	6 x of xn-component
     	7 sign of y-component
     	8 y of y-component
     */
					match[1] = match[1].toLowerCase();

					if (match[1].slice(0, 3) === "nth") {
						// nth-* requires argument
						if (!match[3]) {
							Sizzle.error(match[0]);
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
						match[5] = +(match[7] + match[8] || match[3] === "odd");

						// other types prohibit arguments
					} else if (match[3]) {
						Sizzle.error(match[0]);
					}

					return match;
				},

				"PSEUDO": function PSEUDO(match) {
					var excess,
					    unquoted = !match[6] && match[2];

					if (matchExpr["CHILD"].test(match[0])) {
						return null;
					}

					// Accept quoted arguments as-is
					if (match[3]) {
						match[2] = match[4] || match[5] || "";

						// Strip excess characters from unquoted arguments
					} else if (unquoted && rpseudo.test(unquoted) && (
					// Get excess from tokenize (recursively)
					excess = tokenize(unquoted, true)) && (
					// advance to the next closing parenthesis
					excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

						// excess is a negative index
						match[0] = match[0].slice(0, excess);
						match[2] = unquoted.slice(0, excess);
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice(0, 3);
				}
			},

			filter: {

				"TAG": function TAG(nodeNameSelector) {
					var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
					return nodeNameSelector === "*" ? function () {
						return true;
					} : function (elem) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
				},

				"CLASS": function CLASS(className) {
					var pattern = classCache[className + " "];

					return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
						return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
					});
				},

				"ATTR": function ATTR(name, operator, check) {
					return function (elem) {
						var result = Sizzle.attr(elem, name);

						if (result == null) {
							return operator === "!=";
						}
						if (!operator) {
							return true;
						}

						result += "";

						return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
					};
				},

				"CHILD": function CHILD(type, what, argument, first, last) {
					var simple = type.slice(0, 3) !== "nth",
					    forward = type.slice(-4) !== "last",
					    ofType = what === "of-type";

					return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function (elem) {
						return !!elem.parentNode;
					} : function (elem, context, xml) {
						var cache,
						    uniqueCache,
						    outerCache,
						    node,
						    nodeIndex,
						    start,
						    dir = simple !== forward ? "nextSibling" : "previousSibling",
						    parent = elem.parentNode,
						    name = ofType && elem.nodeName.toLowerCase(),
						    useCache = !xml && !ofType,
						    diff = false;

						if (parent) {

							// :(first|last|only)-(child|of-type)
							if (simple) {
								while (dir) {
									node = elem;
									while (node = node[dir]) {
										if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [forward ? parent.firstChild : parent.lastChild];

							// non-xml :nth-child(...) stores cache data on `parent`
							if (forward && useCache) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[expando] || (node[expando] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

								cache = uniqueCache[type] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = nodeIndex && cache[2];
								node = nodeIndex && parent.childNodes[nodeIndex];

								while (node = ++nodeIndex && node && node[dir] || (

								// Fallback to seeking `elem` from the start
								diff = nodeIndex = 0) || start.pop()) {

									// When found, cache indexes on `parent` and break
									if (node.nodeType === 1 && ++diff && node === elem) {
										uniqueCache[type] = [dirruns, nodeIndex, diff];
										break;
									}
								}
							} else {
								// Use previously-cached element index if available
								if (useCache) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[expando] || (node[expando] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

									cache = uniqueCache[type] || [];
									nodeIndex = cache[0] === dirruns && cache[1];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if (diff === false) {
									// Use the same loop as above to seek `elem` from the start
									while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {

										if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {

											// Cache the index of each encountered element
											if (useCache) {
												outerCache = node[expando] || (node[expando] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});

												uniqueCache[type] = [dirruns, diff];
											}

											if (node === elem) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || diff % first === 0 && diff / first >= 0;
						}
					};
				},

				"PSEUDO": function PSEUDO(pseudo, argument) {
					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
					    fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if (fn[expando]) {
						return fn(argument);
					}

					// But maintain support for old signatures
					if (fn.length > 1) {
						args = [pseudo, pseudo, "", argument];
						return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
							var idx,
							    matched = fn(seed, argument),
							    i = matched.length;
							while (i--) {
								idx = indexOf(seed, matched[i]);
								seed[idx] = !(matches[idx] = matched[i]);
							}
						}) : function (elem) {
							return fn(elem, 0, args);
						};
					}

					return fn;
				}
			},

			pseudos: {
				// Potentially complex pseudos
				"not": markFunction(function (selector) {
					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
					    results = [],
					    matcher = compile(selector.replace(rtrim, "$1"));

					return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
						var elem,
						    unmatched = matcher(seed, null, xml, []),
						    i = seed.length;

						// Match elements unmatched by `matcher`
						while (i--) {
							if (elem = unmatched[i]) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) : function (elem, context, xml) {
						input[0] = elem;
						matcher(input, null, xml, results);
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
				}),

				"has": markFunction(function (selector) {
					return function (elem) {
						return Sizzle(selector, elem).length > 0;
					};
				}),

				"contains": markFunction(function (text) {
					text = text.replace(runescape, funescape);
					return function (elem) {
						return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
					};
				}),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction(function (lang) {
					// lang value must be a valid identifier
					if (!ridentifier.test(lang || "")) {
						Sizzle.error("unsupported lang: " + lang);
					}
					lang = lang.replace(runescape, funescape).toLowerCase();
					return function (elem) {
						var elemLang;
						do {
							if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
							}
						} while ((elem = elem.parentNode) && elem.nodeType === 1);
						return false;
					};
				}),

				// Miscellaneous
				"target": function target(elem) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice(1) === elem.id;
				},

				"root": function root(elem) {
					return elem === docElem;
				},

				"focus": function focus(elem) {
					return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
				},

				// Boolean properties
				"enabled": createDisabledPseudo(false),
				"disabled": createDisabledPseudo(true),

				"checked": function checked(elem) {
					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
				},

				"selected": function selected(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function empty(elem) {
					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
						if (elem.nodeType < 6) {
							return false;
						}
					}
					return true;
				},

				"parent": function parent(elem) {
					return !Expr.pseudos["empty"](elem);
				},

				// Element/input types
				"header": function header(elem) {
					return rheader.test(elem.nodeName);
				},

				"input": function input(elem) {
					return rinputs.test(elem.nodeName);
				},

				"button": function button(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function text(elem) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && (

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					(attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
				},

				// Position-in-collection
				"first": createPositionalPseudo(function () {
					return [0];
				}),

				"last": createPositionalPseudo(function (matchIndexes, length) {
					return [length - 1];
				}),

				"eq": createPositionalPseudo(function (matchIndexes, length, argument) {
					return [argument < 0 ? argument + length : argument];
				}),

				"even": createPositionalPseudo(function (matchIndexes, length) {
					var i = 0;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"odd": createPositionalPseudo(function (matchIndexes, length) {
					var i = 1;
					for (; i < length; i += 2) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"lt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; --i >= 0;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				}),

				"gt": createPositionalPseudo(function (matchIndexes, length, argument) {
					var i = argument < 0 ? argument + length : argument;
					for (; ++i < length;) {
						matchIndexes.push(i);
					}
					return matchIndexes;
				})
			}
		};

		Expr.pseudos["nth"] = Expr.pseudos["eq"];

		// Add button/input type pseudos
		for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
			Expr.pseudos[i] = createInputPseudo(i);
		}
		for (i in { submit: true, reset: true }) {
			Expr.pseudos[i] = createButtonPseudo(i);
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function (selector, parseOnly) {
			var matched,
			    match,
			    tokens,
			    type,
			    soFar,
			    groups,
			    preFilters,
			    cached = tokenCache[selector + " "];

			if (cached) {
				return parseOnly ? 0 : cached.slice(0);
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while (soFar) {

				// Comma and first run
				if (!matched || (match = rcomma.exec(soFar))) {
					if (match) {
						// Don't consume trailing commas as valid
						soFar = soFar.slice(match[0].length) || soFar;
					}
					groups.push(tokens = []);
				}

				matched = false;

				// Combinators
				if (match = rcombinators.exec(soFar)) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace(rtrim, " ")
					});
					soFar = soFar.slice(matched.length);
				}

				// Filters
				for (type in Expr.filter) {
					if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice(matched.length);
					}
				}

				if (!matched) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) :
			// Cache the tokens
			tokenCache(selector, groups).slice(0);
		};

		function toSelector(tokens) {
			var i = 0,
			    len = tokens.length,
			    selector = "";
			for (; i < len; i++) {
				selector += tokens[i].value;
			}
			return selector;
		}

		function addCombinator(matcher, combinator, base) {
			var dir = combinator.dir,
			    skip = combinator.next,
			    key = skip || dir,
			    checkNonElements = base && key === "parentNode",
			    doneName = done++;

			return combinator.first ?
			// Check against closest ancestor/preceding element
			function (elem, context, xml) {
				while (elem = elem[dir]) {
					if (elem.nodeType === 1 || checkNonElements) {
						return matcher(elem, context, xml);
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function (elem, context, xml) {
				var oldCache,
				    uniqueCache,
				    outerCache,
				    newCache = [dirruns, doneName];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if (xml) {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							if (matcher(elem, context, xml)) {
								return true;
							}
						}
					}
				} else {
					while (elem = elem[dir]) {
						if (elem.nodeType === 1 || checkNonElements) {
							outerCache = elem[expando] || (elem[expando] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

							if (skip && skip === elem.nodeName.toLowerCase()) {
								elem = elem[dir] || elem;
							} else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {

								// Assign to newCache so results back-propagate to previous elements
								return newCache[2] = oldCache[2];
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[key] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if (newCache[2] = matcher(elem, context, xml)) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
		}

		function elementMatcher(matchers) {
			return matchers.length > 1 ? function (elem, context, xml) {
				var i = matchers.length;
				while (i--) {
					if (!matchers[i](elem, context, xml)) {
						return false;
					}
				}
				return true;
			} : matchers[0];
		}

		function multipleContexts(selector, contexts, results) {
			var i = 0,
			    len = contexts.length;
			for (; i < len; i++) {
				Sizzle(selector, contexts[i], results);
			}
			return results;
		}

		function condense(unmatched, map, filter, context, xml) {
			var elem,
			    newUnmatched = [],
			    i = 0,
			    len = unmatched.length,
			    mapped = map != null;

			for (; i < len; i++) {
				if (elem = unmatched[i]) {
					if (!filter || filter(elem, context, xml)) {
						newUnmatched.push(elem);
						if (mapped) {
							map.push(i);
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
			if (postFilter && !postFilter[expando]) {
				postFilter = setMatcher(postFilter);
			}
			if (postFinder && !postFinder[expando]) {
				postFinder = setMatcher(postFinder, postSelector);
			}
			return markFunction(function (seed, results, context, xml) {
				var temp,
				    i,
				    elem,
				    preMap = [],
				    postMap = [],
				    preexisting = results.length,


				// Get initial elements from seed or context
				elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),


				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
				    matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || (seed ? preFilter : preexisting || postFilter) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results : matcherIn;

				// Find primary matches
				if (matcher) {
					matcher(matcherIn, matcherOut, context, xml);
				}

				// Apply postFilter
				if (postFilter) {
					temp = condense(matcherOut, postMap);
					postFilter(temp, [], context, xml);

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while (i--) {
						if (elem = temp[i]) {
							matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
						}
					}
				}

				if (seed) {
					if (postFinder || preFilter) {
						if (postFinder) {
							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while (i--) {
								if (elem = matcherOut[i]) {
									// Restore matcherIn since elem is not yet a final match
									temp.push(matcherIn[i] = elem);
								}
							}
							postFinder(null, matcherOut = [], temp, xml);
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while (i--) {
							if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

								seed[temp] = !(results[temp] = elem);
							}
						}
					}

					// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
					if (postFinder) {
						postFinder(null, results, matcherOut, xml);
					} else {
						push.apply(results, matcherOut);
					}
				}
			});
		}

		function matcherFromTokens(tokens) {
			var checkContext,
			    matcher,
			    j,
			    len = tokens.length,
			    leadingRelative = Expr.relative[tokens[0].type],
			    implicitRelative = leadingRelative || Expr.relative[" "],
			    i = leadingRelative ? 1 : 0,


			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator(function (elem) {
				return elem === checkContext;
			}, implicitRelative, true),
			    matchAnyContext = addCombinator(function (elem) {
				return indexOf(checkContext, elem) > -1;
			}, implicitRelative, true),
			    matchers = [function (elem, context, xml) {
				var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			}];

			for (; i < len; i++) {
				if (matcher = Expr.relative[tokens[i].type]) {
					matchers = [addCombinator(elementMatcher(matchers), matcher)];
				} else {
					matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

					// Return special upon seeing a positional matcher
					if (matcher[expando]) {
						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for (; j < len; j++) {
							if (Expr.relative[tokens[j].type]) {
								break;
							}
						}
						return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
					}
					matchers.push(matcher);
				}
			}

			return elementMatcher(matchers);
		}

		function matcherFromGroupMatchers(elementMatchers, setMatchers) {
			var bySet = setMatchers.length > 0,
			    byElement = elementMatchers.length > 0,
			    superMatcher = function superMatcher(seed, context, xml, results, outermost) {
				var elem,
				    j,
				    matcher,
				    matchedCount = 0,
				    i = "0",
				    unmatched = seed && [],
				    setMatched = [],
				    contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]("*", outermost),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
				    len = elems.length;

				if (outermost) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for (; i !== len && (elem = elems[i]) != null; i++) {
					if (byElement && elem) {
						j = 0;
						if (!context && elem.ownerDocument !== document) {
							setDocument(elem);
							xml = !documentIsHTML;
						}
						while (matcher = elementMatchers[j++]) {
							if (matcher(elem, context || document, xml)) {
								results.push(elem);
								break;
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if (bySet) {
						// They will have gone through all possible matchers
						if (elem = !matcher && elem) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if (seed) {
							unmatched.push(elem);
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if (bySet && i !== matchedCount) {
					j = 0;
					while (matcher = setMatchers[j++]) {
						matcher(unmatched, setMatched, context, xml);
					}

					if (seed) {
						// Reintegrate element matches to eliminate the need for sorting
						if (matchedCount > 0) {
							while (i--) {
								if (!(unmatched[i] || setMatched[i])) {
									setMatched[i] = pop.call(results);
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense(setMatched);
					}

					// Add matches to results
					push.apply(results, setMatched);

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {

						Sizzle.uniqueSort(results);
					}
				}

				// Override manipulation of globals by nested matchers
				if (outermost) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

			return bySet ? markFunction(superMatcher) : superMatcher;
		}

		compile = Sizzle.compile = function (selector, match /* Internal Use Only */) {
			var i,
			    setMatchers = [],
			    elementMatchers = [],
			    cached = compilerCache[selector + " "];

			if (!cached) {
				// Generate a function of recursive functions that can be used to check each element
				if (!match) {
					match = tokenize(selector);
				}
				i = match.length;
				while (i--) {
					cached = matcherFromTokens(match[i]);
					if (cached[expando]) {
						setMatchers.push(cached);
					} else {
						elementMatchers.push(cached);
					}
				}

				// Cache the compiled function
				cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
   * A low-level selection function that works with Sizzle's compiled
   *  selector functions
   * @param {String|Function} selector A selector or a pre-compiled
   *  selector function built with Sizzle.compile
   * @param {Element} context
   * @param {Array} [results]
   * @param {Array} [seed] A set of elements to match against
   */
		select = Sizzle.select = function (selector, context, results, seed) {
			var i,
			    tokens,
			    token,
			    type,
			    find,
			    compiled = typeof selector === "function" && selector,
			    match = !seed && tokenize(selector = compiled.selector || selector);

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if (match.length === 1) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[0] = match[0].slice(0);
				if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {

					context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
					if (!context) {
						return results;

						// Precompiled matchers will still verify ancestry, so step up a level
					} else if (compiled) {
						context = context.parentNode;
					}

					selector = selector.slice(tokens.shift().value.length);
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
				while (i--) {
					token = tokens[i];

					// Abort if we hit a combinator
					if (Expr.relative[type = token.type]) {
						break;
					}
					if (find = Expr.find[type]) {
						// Search, expanding context for leading sibling combinators
						if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice(i, 1);
							selector = seed.length && toSelector(tokens);
							if (!selector) {
								push.apply(results, seed);
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert(function (el) {
			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
		});

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if (!assert(function (el) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute("href") === "#";
		})) {
			addHandle("type|href|height|width", function (elem, name, isXML) {
				if (!isXML) {
					return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
				}
			});
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if (!support.attributes || !assert(function (el) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute("value", "");
			return el.firstChild.getAttribute("value") === "";
		})) {
			addHandle("value", function (elem, name, isXML) {
				if (!isXML && elem.nodeName.toLowerCase() === "input") {
					return elem.defaultValue;
				}
			});
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if (!assert(function (el) {
			return el.getAttribute("disabled") == null;
		})) {
			addHandle(booleans, function (elem, name, isXML) {
				var val;
				if (!isXML) {
					return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
				}
			});
		}

		return Sizzle;
	}(window);

	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;

	var dir = function dir(elem, _dir, until) {
		var matched = [],
		    truncate = until !== undefined;

		while ((elem = elem[_dir]) && elem.nodeType !== 9) {
			if (elem.nodeType === 1) {
				if (truncate && jQuery(elem).is(until)) {
					break;
				}
				matched.push(elem);
			}
		}
		return matched;
	};

	var _siblings = function _siblings(n, elem) {
		var matched = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				matched.push(n);
			}
		}

		return matched;
	};

	var rneedsContext = jQuery.expr.match.needsContext;

	function nodeName(elem, name) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	};
	var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}

		// Single element
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return elem === qualifier !== not;
			});
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if (typeof qualifier !== "string") {
			return jQuery.grep(elements, function (elem) {
				return indexOf.call(qualifier, elem) > -1 !== not;
			});
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if (risSimple.test(qualifier)) {
			return jQuery.filter(qualifier, elements, not);
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter(qualifier, elements);
		return jQuery.grep(elements, function (elem) {
			return indexOf.call(qualifier, elem) > -1 !== not && elem.nodeType === 1;
		});
	}

	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];

		if (not) {
			expr = ":not(" + expr + ")";
		}

		if (elems.length === 1 && elem.nodeType === 1) {
			return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
		}

		return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
			return elem.nodeType === 1;
		}));
	};

	jQuery.fn.extend({
		find: function find(selector) {
			var i,
			    ret,
			    len = this.length,
			    self = this;

			if (typeof selector !== "string") {
				return this.pushStack(jQuery(selector).filter(function () {
					for (i = 0; i < len; i++) {
						if (jQuery.contains(self[i], this)) {
							return true;
						}
					}
				}));
			}

			ret = this.pushStack([]);

			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}

			return len > 1 ? jQuery.uniqueSort(ret) : ret;
		},
		filter: function filter(selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function not(selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function is(selector) {
			return !!winnow(this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
		}
	});

	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,


	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	    init = jQuery.fn.init = function (selector, context, root) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if (!selector) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if (typeof selector === "string") {
			if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [null, selector, null];
			} else {
				match = rquickExpr.exec(selector);
			}

			// Match html or make sure no context is specified for #id
			if (match && (match[1] || !context)) {

				// HANDLE: $(html) -> $(array)
				if (match[1]) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

					// HANDLE: $(html, props)
					if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
						for (match in context) {

							// Properties of context are called as methods if possible
							if (jQuery.isFunction(this[match])) {
								this[match](context[match]);

								// ...and otherwise set as attributes
							} else {
								this.attr(match, context[match]);
							}
						}
					}

					return this;

					// HANDLE: $(#id)
				} else {
					elem = document.getElementById(match[2]);

					if (elem) {

						// Inject the element directly into the jQuery object
						this[0] = elem;
						this.length = 1;
					}
					return this;
				}

				// HANDLE: $(expr, $(...))
			} else if (!context || context.jquery) {
				return (context || root).find(selector);

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}

			// HANDLE: $(DOMElement)
		} else if (selector.nodeType) {
			this[0] = selector;
			this.length = 1;
			return this;

			// HANDLE: $(function)
			// Shortcut for document ready
		} else if (jQuery.isFunction(selector)) {
			return root.ready !== undefined ? root.ready(selector) :

			// Execute immediately if ready is not present
			selector(jQuery);
		}

		return jQuery.makeArray(selector, this);
	};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery(document);

	var rparentsprev = /^(?:parents|prev(?:Until|All))/,


	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

	jQuery.fn.extend({
		has: function has(target) {
			var targets = jQuery(target, this),
			    l = targets.length;

			return this.filter(function () {
				var i = 0;
				for (; i < l; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},

		closest: function closest(selectors, context) {
			var cur,
			    i = 0,
			    l = this.length,
			    matched = [],
			    targets = typeof selectors !== "string" && jQuery(selectors);

			// Positional selectors never match, since there's no _selection_ context
			if (!rneedsContext.test(selectors)) {
				for (; i < l; i++) {
					for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

						// Always skip document fragments
						if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {

							matched.push(cur);
							break;
						}
					}
				}
			}

			return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
		},

		// Determine the position of an element within the set
		index: function index(elem) {

			// No argument, return index in parent
			if (!elem) {
				return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if (typeof elem === "string") {
				return indexOf.call(jQuery(elem), this[0]);
			}

			// Locate the position of the desired element
			return indexOf.call(this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem);
		},

		add: function add(selector, context) {
			return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
		},

		addBack: function addBack(selector) {
			return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
		}
	});

	function sibling(cur, dir) {
		while ((cur = cur[dir]) && cur.nodeType !== 1) {}
		return cur;
	}

	jQuery.each({
		parent: function parent(elem) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function parents(elem) {
			return dir(elem, "parentNode");
		},
		parentsUntil: function parentsUntil(elem, i, until) {
			return dir(elem, "parentNode", until);
		},
		next: function next(elem) {
			return sibling(elem, "nextSibling");
		},
		prev: function prev(elem) {
			return sibling(elem, "previousSibling");
		},
		nextAll: function nextAll(elem) {
			return dir(elem, "nextSibling");
		},
		prevAll: function prevAll(elem) {
			return dir(elem, "previousSibling");
		},
		nextUntil: function nextUntil(elem, i, until) {
			return dir(elem, "nextSibling", until);
		},
		prevUntil: function prevUntil(elem, i, until) {
			return dir(elem, "previousSibling", until);
		},
		siblings: function siblings(elem) {
			return _siblings((elem.parentNode || {}).firstChild, elem);
		},
		children: function children(elem) {
			return _siblings(elem.firstChild);
		},
		contents: function contents(elem) {
			if (nodeName(elem, "iframe")) {
				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if (nodeName(elem, "template")) {
				elem = elem.content || elem;
			}

			return jQuery.merge([], elem.childNodes);
		}
	}, function (name, fn) {
		jQuery.fn[name] = function (until, selector) {
			var matched = jQuery.map(this, fn, until);

			if (name.slice(-5) !== "Until") {
				selector = until;
			}

			if (selector && typeof selector === "string") {
				matched = jQuery.filter(selector, matched);
			}

			if (this.length > 1) {

				// Remove duplicates
				if (!guaranteedUnique[name]) {
					jQuery.uniqueSort(matched);
				}

				// Reverse order for parents* and prev-derivatives
				if (rparentsprev.test(name)) {
					matched.reverse();
				}
			}

			return this.pushStack(matched);
		};
	});
	var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

	// Convert String-formatted options into Object-formatted ones
	function createOptions(options) {
		var object = {};
		jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}

	/*
  * Create a callback list using the following parameters:
  *
  *	options: an optional list of space-separated options that will change how
  *			the callback list behaves or a more traditional option object
  *
  * By default a callback list will act like an event callback list and can be
  * "fired" multiple times.
  *
  * Possible options:
  *
  *	once:			will ensure the callback list can only be fired once (like a Deferred)
  *
  *	memory:			will keep track of previous values and will call any callback added
  *					after the list has been fired right away with the latest "memorized"
  *					values (like a Deferred)
  *
  *	unique:			will ensure a callback can only be added once (no duplicate in the list)
  *
  *	stopOnFalse:	interrupt callings when a callback returns false
  *
  */
	jQuery.Callbacks = function (options) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);

		var // Flag to know if list is currently firing
		firing,


		// Last fire value for non-forgettable lists
		memory,


		// Flag to know if list was already fired
		_fired,


		// Flag to prevent firing
		_locked,


		// Actual callback list
		list = [],


		// Queue of execution data for repeatable lists
		queue = [],


		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,


		// Fire callbacks
		fire = function fire() {

			// Enforce single-firing
			_locked = _locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			_fired = firing = true;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift();
				while (++firingIndex < list.length) {

					// Run callback and check for early termination
					if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if (!options.memory) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if (_locked) {

				// Keep an empty list if we have data for future add calls
				if (memory) {
					list = [];

					// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},


		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function add() {
				if (list) {

					// If we have memory from a past run, we should fire after adding
					if (memory && !firing) {
						firingIndex = list.length - 1;
						queue.push(memory);
					}

					(function add(args) {
						jQuery.each(args, function (_, arg) {
							if (jQuery.isFunction(arg)) {
								if (!options.unique || !self.has(arg)) {
									list.push(arg);
								}
							} else if (arg && arg.length && jQuery.type(arg) !== "string") {

								// Inspect recursively
								add(arg);
							}
						});
					})(arguments);

					if (memory && !firing) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function remove() {
				jQuery.each(arguments, function (_, arg) {
					var index;
					while ((index = jQuery.inArray(arg, list, index)) > -1) {
						list.splice(index, 1);

						// Handle firing indexes
						if (index <= firingIndex) {
							firingIndex--;
						}
					}
				});
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function has(fn) {
				return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function empty() {
				if (list) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function disable() {
				_locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function disabled() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function lock() {
				_locked = queue = [];
				if (!memory && !firing) {
					list = memory = "";
				}
				return this;
			},
			locked: function locked() {
				return !!_locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function fireWith(context, args) {
				if (!_locked) {
					args = args || [];
					args = [context, args.slice ? args.slice() : args];
					queue.push(args);
					if (!firing) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function fire() {
				self.fireWith(this, arguments);
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function fired() {
				return !!_fired;
			}
		};

		return self;
	};

	function Identity(v) {
		return v;
	}
	function Thrower(ex) {
		throw ex;
	}

	function adoptValue(value, resolve, reject, noValue) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if (value && jQuery.isFunction(method = value.promise)) {
				method.call(value).done(resolve).fail(reject);

				// Other thenables
			} else if (value && jQuery.isFunction(method = value.then)) {
				method.call(value, resolve, reject);

				// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply(undefined, [value].slice(noValue));
			}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
		} catch (value) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply(undefined, [value]);
		}
	}

	jQuery.extend({

		Deferred: function Deferred(func) {
			var tuples = [

			// action, add listener, callbacks,
			// ... .then handlers, argument index, [final state]
			["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
			    _state = "pending",
			    _promise = {
				state: function state() {
					return _state;
				},
				always: function always() {
					deferred.done(arguments).fail(arguments);
					return this;
				},
				"catch": function _catch(fn) {
					return _promise.then(null, fn);
				},

				// Keep pipe for back-compat
				pipe: function pipe() /* fnDone, fnFail, fnProgress */{
					var fns = arguments;

					return jQuery.Deferred(function (newDefer) {
						jQuery.each(tuples, function (i, tuple) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction(fns[tuple[4]]) && fns[tuple[4]];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[tuple[1]](function () {
								var returned = fn && fn.apply(this, arguments);
								if (returned && jQuery.isFunction(returned.promise)) {
									returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
								} else {
									newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
								}
							});
						});
						fns = null;
					}).promise();
				},
				then: function then(onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					function resolve(depth, deferred, handler, special) {
						return function () {
							var that = this,
							    args = arguments,
							    mightThrow = function mightThrow() {
								var returned, then;

								// Support: Promises/A+ section 2.3.3.3.3
								// https://promisesaplus.com/#point-59
								// Ignore double-resolution attempts
								if (depth < maxDepth) {
									return;
								}

								returned = handler.apply(that, args);

								// Support: Promises/A+ section 2.3.1
								// https://promisesaplus.com/#point-48
								if (returned === deferred.promise()) {
									throw new TypeError("Thenable self-resolution");
								}

								// Support: Promises/A+ sections 2.3.3.1, 3.5
								// https://promisesaplus.com/#point-54
								// https://promisesaplus.com/#point-75
								// Retrieve `then` only once
								then = returned && (

								// Support: Promises/A+ section 2.3.4
								// https://promisesaplus.com/#point-64
								// Only check objects and functions for thenability
								(typeof returned === "undefined" ? "undefined" : _typeof(returned)) === "object" || typeof returned === "function") && returned.then;

								// Handle a returned thenable
								if (jQuery.isFunction(then)) {

									// Special processors (notify) just wait for resolution
									if (special) {
										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

										// Normal processors (resolve) also hook into progress
									} else {

										// ...and disregard older resolution values
										maxDepth++;

										then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
									}

									// Handle all other returned values
								} else {

									// Only substitute handlers pass on context
									// and multiple values (non-spec behavior)
									if (handler !== Identity) {
										that = undefined;
										args = [returned];
									}

									// Process the value(s)
									// Default process is resolve
									(special || deferred.resolveWith)(that, args);
								}
							},


							// Only normal processors (resolve) catch and reject exceptions
							process = special ? mightThrow : function () {
								try {
									mightThrow();
								} catch (e) {

									if (jQuery.Deferred.exceptionHook) {
										jQuery.Deferred.exceptionHook(e, process.stackTrace);
									}

									// Support: Promises/A+ section 2.3.3.3.4.1
									// https://promisesaplus.com/#point-61
									// Ignore post-resolution exceptions
									if (depth + 1 >= maxDepth) {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if (handler !== Thrower) {
											that = undefined;
											args = [e];
										}

										deferred.rejectWith(that, args);
									}
								}
							};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if (depth) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout(process);
							}
						};
					}

					return jQuery.Deferred(function (newDefer) {

						// progress_handlers.add( ... )
						tuples[0][3].add(resolve(0, newDefer, jQuery.isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

						// fulfilled_handlers.add( ... )
						tuples[1][3].add(resolve(0, newDefer, jQuery.isFunction(onFulfilled) ? onFulfilled : Identity));

						// rejected_handlers.add( ... )
						tuples[2][3].add(resolve(0, newDefer, jQuery.isFunction(onRejected) ? onRejected : Thrower));
					}).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function promise(obj) {
					return obj != null ? jQuery.extend(obj, _promise) : _promise;
				}
			},
			    deferred = {};

			// Add list-specific methods
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
				    stateString = tuple[5];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				_promise[tuple[1]] = list.add;

				// Handle state
				if (stateString) {
					list.add(function () {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						_state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[3 - i][2].disable,

					// progress_callbacks.lock
					tuples[0][2].lock);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add(tuple[3].fire);

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[tuple[0] + "With"] = list.fireWith;
			});

			// Make the deferred a promise
			_promise.promise(deferred);

			// Call given func if any
			if (func) {
				func.call(deferred, deferred);
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function when(singleValue) {
			var

			// count of uncompleted subordinates
			remaining = arguments.length,


			// count of unprocessed arguments
			i = remaining,


			// subordinate fulfillment data
			resolveContexts = Array(i),
			    resolveValues = _slice.call(arguments),


			// the master Deferred
			master = jQuery.Deferred(),


			// subordinate callback factory
			updateFunc = function updateFunc(i) {
				return function (value) {
					resolveContexts[i] = this;
					resolveValues[i] = arguments.length > 1 ? _slice.call(arguments) : value;
					if (! --remaining) {
						master.resolveWith(resolveContexts, resolveValues);
					}
				};
			};

			// Single- and empty arguments are adopted like Promise.resolve
			if (remaining <= 1) {
				adoptValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining);

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if (master.state() === "pending" || jQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while (i--) {
				adoptValue(resolveValues[i], updateFunc(i), master.reject);
			}

			return master.promise();
		}
	});

	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function (error, stack) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
			window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
		}
	};

	jQuery.readyException = function (error) {
		window.setTimeout(function () {
			throw error;
		});
	};

	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function (fn) {

		readyList.then(fn)

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch(function (error) {
			jQuery.readyException(error);
		});

		return this;
	};

	jQuery.extend({

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function ready(wait) {

			// Abort if there are pending holds or we're already ready
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith(document, [jQuery]);
		}
	});

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener("DOMContentLoaded", completed);
		window.removeEventListener("load", completed);
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout(jQuery.ready);
	} else {

		// Use the handy event callback
		document.addEventListener("DOMContentLoaded", completed);

		// A fallback to window.onload, that will always work
		window.addEventListener("load", completed);
	}

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function access(elems, fn, key, value, chainable, emptyGet, raw) {
		var i = 0,
		    len = elems.length,
		    bulk = key == null;

		// Sets many values
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				access(elems, fn, i, key[i], true, emptyGet, raw);
			}

			// Sets one value
		} else if (value !== undefined) {
			chainable = true;

			if (!jQuery.isFunction(value)) {
				raw = true;
			}

			if (bulk) {

				// Bulk operations run against the entire set
				if (raw) {
					fn.call(elems, value);
					fn = null;

					// ...except when executing function values
				} else {
					bulk = fn;
					fn = function fn(elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}

			if (fn) {
				for (; i < len; i++) {
					fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
				}
			}
		}

		if (chainable) {
			return elems;
		}

		// Gets
		if (bulk) {
			return fn.call(elems);
		}

		return len ? fn(elems[0], key) : emptyGet;
	};
	var acceptData = function acceptData(owner) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
	};

	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function cache(owner) {

			// Check if the owner object already has a cache
			var value = owner[this.expando];

			// If not, create one
			if (!value) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if (acceptData(owner)) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if (owner.nodeType) {
						owner[this.expando] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
					} else {
						Object.defineProperty(owner, this.expando, {
							value: value,
							configurable: true
						});
					}
				}
			}

			return value;
		},
		set: function set(owner, data, value) {
			var prop,
			    cache = this.cache(owner);

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if (typeof data === "string") {
				cache[jQuery.camelCase(data)] = value;

				// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for (prop in data) {
					cache[jQuery.camelCase(prop)] = data[prop];
				}
			}
			return cache;
		},
		get: function get(owner, key) {
			return key === undefined ? this.cache(owner) :

			// Always use camelCase key (gh-2257)
			owner[this.expando] && owner[this.expando][jQuery.camelCase(key)];
		},
		access: function access(owner, key, value) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if (key === undefined || key && typeof key === "string" && value === undefined) {

				return this.get(owner, key);
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set(owner, key, value);

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function remove(owner, key) {
			var i,
			    cache = owner[this.expando];

			if (cache === undefined) {
				return;
			}

			if (key !== undefined) {

				// Support array or space separated string of keys
				if (Array.isArray(key)) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map(jQuery.camelCase);
				} else {
					key = jQuery.camelCase(key);

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
				}

				i = key.length;

				while (i--) {
					delete cache[key[i]];
				}
			}

			// Remove the expando if there's no more data
			if (key === undefined || jQuery.isEmptyObject(cache)) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if (owner.nodeType) {
					owner[this.expando] = undefined;
				} else {
					delete owner[this.expando];
				}
			}
		},
		hasData: function hasData(owner) {
			var cache = owner[this.expando];
			return cache !== undefined && !jQuery.isEmptyObject(cache);
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();

	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	    rmultiDash = /[A-Z]/g;

	function getData(data) {
		if (data === "true") {
			return true;
		}

		if (data === "false") {
			return false;
		}

		if (data === "null") {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if (data === +data + "") {
			return +data;
		}

		if (rbrace.test(data)) {
			return JSON.parse(data);
		}

		return data;
	}

	function dataAttr(elem, key, data) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if (data === undefined && elem.nodeType === 1) {
			name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
			data = elem.getAttribute(name);

			if (typeof data === "string") {
				try {
					data = getData(data);
				} catch (e) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function hasData(elem) {
			return dataUser.hasData(elem) || dataPriv.hasData(elem);
		},

		data: function data(elem, name, _data) {
			return dataUser.access(elem, name, _data);
		},

		removeData: function removeData(elem, name) {
			dataUser.remove(elem, name);
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function _data(elem, name, data) {
			return dataPriv.access(elem, name, data);
		},

		_removeData: function _removeData(elem, name) {
			dataPriv.remove(elem, name);
		}
	});

	jQuery.fn.extend({
		data: function data(key, value) {
			var i,
			    name,
			    data,
			    elem = this[0],
			    attrs = elem && elem.attributes;

			// Gets all values
			if (key === undefined) {
				if (this.length) {
					data = dataUser.get(elem);

					if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
						i = attrs.length;
						while (i--) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if (attrs[i]) {
								name = attrs[i].name;
								if (name.indexOf("data-") === 0) {
									name = jQuery.camelCase(name.slice(5));
									dataAttr(elem, name, data[name]);
								}
							}
						}
						dataPriv.set(elem, "hasDataAttrs", true);
					}
				}

				return data;
			}

			// Sets multiple values
			if ((typeof key === "undefined" ? "undefined" : _typeof(key)) === "object") {
				return this.each(function () {
					dataUser.set(this, key);
				});
			}

			return access(this, function (value) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if (elem && value === undefined) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get(elem, key);
					if (data !== undefined) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr(elem, key);
					if (data !== undefined) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function () {

					// We always store the camelCased key
					dataUser.set(this, key, value);
				});
			}, null, value, arguments.length > 1, null, true);
		},

		removeData: function removeData(key) {
			return this.each(function () {
				dataUser.remove(this, key);
			});
		}
	});

	jQuery.extend({
		queue: function queue(elem, type, data) {
			var queue;

			if (elem) {
				type = (type || "fx") + "queue";
				queue = dataPriv.get(elem, type);

				// Speed up dequeue by getting out quickly if this is just a lookup
				if (data) {
					if (!queue || Array.isArray(data)) {
						queue = dataPriv.access(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},

		dequeue: function dequeue(elem, type) {
			type = type || "fx";

			var queue = jQuery.queue(elem, type),
			    startLength = queue.length,
			    fn = queue.shift(),
			    hooks = jQuery._queueHooks(elem, type),
			    next = function next() {
				jQuery.dequeue(elem, type);
			};

			// If the fx queue is dequeued, always remove the progress sentinel
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}

			if (fn) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if (type === "fx") {
					queue.unshift("inprogress");
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}

			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function _queueHooks(elem, type) {
			var key = type + "queueHooks";
			return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
				empty: jQuery.Callbacks("once memory").add(function () {
					dataPriv.remove(elem, [type + "queue", key]);
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function queue(type, data) {
			var setter = 2;

			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}

			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}

			return data === undefined ? this : this.each(function () {
				var queue = jQuery.queue(this, type, data);

				// Ensure a hooks for this queue
				jQuery._queueHooks(this, type);

				if (type === "fx" && queue[0] !== "inprogress") {
					jQuery.dequeue(this, type);
				}
			});
		},
		dequeue: function dequeue(type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function clearQueue(type) {
			return this.queue(type || "fx", []);
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function promise(type, obj) {
			var tmp,
			    count = 1,
			    defer = jQuery.Deferred(),
			    elements = this,
			    i = this.length,
			    resolve = function resolve() {
				if (! --count) {
					defer.resolveWith(elements, [elements]);
				}
			};

			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while (i--) {
				tmp = dataPriv.get(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		}
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;

	var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");

	var cssExpand = ["Top", "Right", "Bottom", "Left"];

	var isHiddenWithinTree = function isHiddenWithinTree(elem, el) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" || elem.style.display === "" &&

		// Otherwise, check computed style
		// Support: Firefox <=43 - 45
		// Disconnected elements can have computed display: none, so first confirm that elem is
		// in the document.
		jQuery.contains(elem.ownerDocument, elem) && jQuery.css(elem, "display") === "none";
	};

	var swap = function swap(elem, options, callback, args) {
		var ret,
		    name,
		    old = {};

		// Remember the old values, and insert the new ones
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}

		ret = callback.apply(elem, args || []);

		// Revert the old values
		for (name in options) {
			elem.style[name] = old[name];
		}

		return ret;
	};

	function adjustCSS(elem, prop, valueParts, tween) {
		var adjusted,
		    scale = 1,
		    maxIterations = 20,
		    currentValue = tween ? function () {
			return tween.cur();
		} : function () {
			return jQuery.css(elem, prop, "");
		},
		    initial = currentValue(),
		    unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),


		// Starting value computation is required for potential unit mismatches
		initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));

		if (initialInUnit && initialInUnit[3] !== unit) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[3];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style(elem, prop, initialInUnit + unit);

				// Update scale, tolerating zero or NaN from tween.cur()
				// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
		}

		if (valueParts) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
			if (tween) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}

	var defaultDisplayMap = {};

	function getDefaultDisplay(elem) {
		var temp,
		    doc = elem.ownerDocument,
		    nodeName = elem.nodeName,
		    display = defaultDisplayMap[nodeName];

		if (display) {
			return display;
		}

		temp = doc.body.appendChild(doc.createElement(nodeName));
		display = jQuery.css(temp, "display");

		temp.parentNode.removeChild(temp);

		if (display === "none") {
			display = "block";
		}
		defaultDisplayMap[nodeName] = display;

		return display;
	}

	function showHide(elements, show) {
		var display,
		    elem,
		    values = [],
		    index = 0,
		    length = elements.length;

		// Determine new display value for elements that need to change
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}

			display = elem.style.display;
			if (show) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if (display === "none") {
					values[index] = dataPriv.get(elem, "display") || null;
					if (!values[index]) {
						elem.style.display = "";
					}
				}
				if (elem.style.display === "" && isHiddenWithinTree(elem)) {
					values[index] = getDefaultDisplay(elem);
				}
			} else {
				if (display !== "none") {
					values[index] = "none";

					// Remember what we're overwriting
					dataPriv.set(elem, "display", display);
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for (index = 0; index < length; index++) {
			if (values[index] != null) {
				elements[index].style.display = values[index];
			}
		}

		return elements;
	}

	jQuery.fn.extend({
		show: function show() {
			return showHide(this, true);
		},
		hide: function hide() {
			return showHide(this);
		},
		toggle: function toggle(state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}

			return this.each(function () {
				if (isHiddenWithinTree(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		}
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;

	var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;

	var rscriptType = /^$|\/(?:java|ecma)script/i;

	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [1, "<select multiple='multiple'>", "</select>"],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [1, "<table>", "</table>"],
		col: [2, "<table><colgroup>", "</colgroup></table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

		_default: [0, "", ""]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	function getAll(context, tag) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if (typeof context.getElementsByTagName !== "undefined") {
			ret = context.getElementsByTagName(tag || "*");
		} else if (typeof context.querySelectorAll !== "undefined") {
			ret = context.querySelectorAll(tag || "*");
		} else {
			ret = [];
		}

		if (tag === undefined || tag && nodeName(context, tag)) {
			return jQuery.merge([context], ret);
		}

		return ret;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval(elems, refElements) {
		var i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
		}
	}

	var rhtml = /<|&#?\w+;/;

	function buildFragment(elems, context, scripts, selection, ignored) {
		var elem,
		    tmp,
		    tag,
		    wrap,
		    contains,
		    j,
		    fragment = context.createDocumentFragment(),
		    nodes = [],
		    i = 0,
		    l = elems.length;

		for (; i < l; i++) {
			elem = elems[i];

			if (elem || elem === 0) {

				// Add nodes directly
				if (jQuery.type(elem) === "object") {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

					// Convert non-html into a text node
				} else if (!rhtml.test(elem)) {
					nodes.push(context.createTextNode(elem));

					// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild(context.createElement("div"));

					// Deserialize a standard representation
					tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
					wrap = wrapMap[tag] || wrapMap._default;
					tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while (j--) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge(nodes, tmp.childNodes);

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while (elem = nodes[i++]) {

			// Skip elements already in the context collection (trac-4087)
			if (selection && jQuery.inArray(elem, selection) > -1) {
				if (ignored) {
					ignored.push(elem);
				}
				continue;
			}

			contains = jQuery.contains(elem.ownerDocument, elem);

			// Append to fragment
			tmp = getAll(fragment.appendChild(elem), "script");

			// Preserve script evaluation history
			if (contains) {
				setGlobalEval(tmp);
			}

			// Capture executables
			if (scripts) {
				j = 0;
				while (elem = tmp[j++]) {
					if (rscriptType.test(elem.type || "")) {
						scripts.push(elem);
					}
				}
			}
		}

		return fragment;
	}

	(function () {
		var fragment = document.createDocumentFragment(),
		    div = fragment.appendChild(document.createElement("div")),
		    input = document.createElement("input");

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute("type", "radio");
		input.setAttribute("checked", "checked");
		input.setAttribute("name", "t");

		div.appendChild(input);

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
	})();
	var documentElement = document.documentElement;

	var rkeyEvent = /^key/,
	    rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	    rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}

	function _on(elem, types, selector, data, fn, one) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

			// ( types-Object, selector, data )
			if (typeof selector !== "string") {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for (type in types) {
				_on(elem, type, selector, data, types[type], one);
			}
			return elem;
		}

		if (data == null && fn == null) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if (fn == null) {
			if (typeof selector === "string") {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if (fn === false) {
			fn = returnFalse;
		} else if (!fn) {
			return elem;
		}

		if (one === 1) {
			origFn = fn;
			fn = function fn(event) {

				// Can use an empty set, since event contains the info
				jQuery().off(event);
				return origFn.apply(this, arguments);
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
		}
		return elem.each(function () {
			jQuery.event.add(this, types, fn, data, selector);
		});
	}

	/*
  * Helper functions for managing events -- not part of the public interface.
  * Props to Dean Edwards' addEvent library for many of the ideas.
  */
	jQuery.event = {

		global: {},

		add: function add(elem, types, handler, data, selector) {

			var handleObjIn,
			    eventHandle,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.get(elem);

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if (!elemData) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if (selector) {
				jQuery.find.matchesSelector(documentElement, selector);
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// There *must* be a type, no attaching namespace-only handlers
				if (!type) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[type] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = (selector ? special.delegateType : special.bindType) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[type] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test(selector),
					namespace: namespaces.join(".")
				}, handleObjIn);

				// Init the event handler queue if we're the first
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {

						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle);
						}
					}
				}

				if (special.add) {
					special.add.call(elem, handleObj);

					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[type] = true;
			}
		},

		// Detach an event or set of events from an element
		remove: function remove(elem, types, handler, selector, mappedTypes) {

			var j,
			    origCount,
			    tmp,
			    events,
			    t,
			    handleObj,
			    special,
			    handlers,
			    type,
			    namespaces,
			    origType,
			    elemData = dataPriv.hasData(elem) && dataPriv.get(elem);

			if (!elemData || !(events = elemData.events)) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = (types || "").match(rnothtmlwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();

				// Unbind all events (on this namespace, if provided) for the element
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}

				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

				// Remove matching events
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];

					if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
						handlers.splice(j, 1);

						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if (origCount && !handlers.length) {
					if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {

						jQuery.removeEvent(elem, type, elemData.handle);
					}

					delete events[type];
				}
			}

			// Remove data and the expando if it's no longer used
			if (jQuery.isEmptyObject(events)) {
				dataPriv.remove(elem, "handle events");
			}
		},

		dispatch: function dispatch(nativeEvent) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix(nativeEvent);

			var i,
			    j,
			    ret,
			    matched,
			    handleObj,
			    handlerQueue,
			    args = new Array(arguments.length),
			    handlers = (dataPriv.get(this, "events") || {})[event.type] || [],
			    special = jQuery.event.special[event.type] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;

			for (i = 1; i < arguments.length; i++) {
				args[i] = arguments[i];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if (special.preDispatch && special.preDispatch.call(this, event) === false) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;

				j = 0;
				while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);

						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}

			return event.result;
		},

		handlers: function handlers(event, _handlers) {
			var i,
			    handleObj,
			    sel,
			    matchedHandlers,
			    matchedSelectors,
			    handlerQueue = [],
			    delegateCount = _handlers.delegateCount,
			    cur = event.target;

			// Find delegate handlers
			if (delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!(event.type === "click" && event.button >= 1)) {

				for (; cur !== this; cur = cur.parentNode || this) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
						matchedHandlers = [];
						matchedSelectors = {};
						for (i = 0; i < delegateCount; i++) {
							handleObj = _handlers[i];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if (matchedSelectors[sel] === undefined) {
								matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
							}
							if (matchedSelectors[sel]) {
								matchedHandlers.push(handleObj);
							}
						}
						if (matchedHandlers.length) {
							handlerQueue.push({ elem: cur, handlers: matchedHandlers });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if (delegateCount < _handlers.length) {
				handlerQueue.push({ elem: cur, handlers: _handlers.slice(delegateCount) });
			}

			return handlerQueue;
		},

		addProp: function addProp(name, hook) {
			Object.defineProperty(jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction(hook) ? function () {
					if (this.originalEvent) {
						return hook(this.originalEvent);
					}
				} : function () {
					if (this.originalEvent) {
						return this.originalEvent[name];
					}
				},

				set: function set(value) {
					Object.defineProperty(this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					});
				}
			});
		},

		fix: function fix(originalEvent) {
			return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function trigger() {
					if (this !== safeActiveElement() && this.focus) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function trigger() {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function trigger() {
					if (this.type === "checkbox" && this.click && nodeName(this, "input")) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function _default(event) {
					return nodeName(event.target, "a");
				}
			},

			beforeunload: {
				postDispatch: function postDispatch(event) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if (event.result !== undefined && event.originalEvent) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function (elem, type, handle) {

		// This "if" is needed for plain objects
		if (elem.removeEventListener) {
			elem.removeEventListener(type, handle);
		}
	};

	jQuery.Event = function (src, props) {

		// Allow instantiation without the 'new' keyword
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}

		// Event object
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&

			// Support: Android <=2.3 only
			src.returnValue === false ? returnTrue : returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

			// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if (props) {
			jQuery.extend(this, props);
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[jQuery.expando] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function preventDefault() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if (e && !this.isSimulated) {
				e.preventDefault();
			}
		},
		stopPropagation: function stopPropagation() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function stopImmediatePropagation() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if (e && !this.isSimulated) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each({
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function which(event) {
			var button = event.button;

			// Add which for key events
			if (event.which == null && rkeyEvent.test(event.type)) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if (!event.which && button !== undefined && rmouseEvent.test(event.type)) {
				if (button & 1) {
					return 1;
				}

				if (button & 2) {
					return 3;
				}

				if (button & 4) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp);

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (orig, fix) {
		jQuery.event.special[orig] = {
			delegateType: fix,
			bindType: fix,

			handle: function handle(event) {
				var ret,
				    target = this,
				    related = event.relatedTarget,
				    handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if (!related || related !== target && !jQuery.contains(target, related)) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply(this, arguments);
					event.type = fix;
				}
				return ret;
			}
		};
	});

	jQuery.fn.extend({

		on: function on(types, selector, data, fn) {
			return _on(this, types, selector, data, fn);
		},
		one: function one(types, selector, data, fn) {
			return _on(this, types, selector, data, fn, 1);
		},
		off: function off(types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
				return this;
			}
			if ((typeof types === "undefined" ? "undefined" : _typeof(types)) === "object") {

				// ( types-object [, selector] )
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		}
	});

	var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,


	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,


	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	    rscriptTypeMasked = /^true\/(.*)/,
	    rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget(elem, content) {
		if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {

			return jQuery(">tbody", elem)[0] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript(elem) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);

		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	function cloneCopyEvent(src, dest) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if (dest.nodeType !== 1) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if (dataPriv.hasData(src)) {
			pdataOld = dataPriv.access(src);
			pdataCur = dataPriv.set(dest, pdataOld);
			events = pdataOld.events;

			if (events) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for (type in events) {
					for (i = 0, l = events[type].length; i < l; i++) {
						jQuery.event.add(dest, type, events[type][i]);
					}
				}
			}
		}

		// 2. Copy user data
		if (dataUser.hasData(src)) {
			udataOld = dataUser.access(src);
			udataCur = jQuery.extend({}, udataOld);

			dataUser.set(dest, udataCur);
		}
	}

	// Fix IE bugs, see support tests
	function fixInput(src, dest) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip(collection, args, callback, ignored) {

		// Flatten any nested arrays
		args = concat.apply([], args);

		var fragment,
		    first,
		    scripts,
		    hasScripts,
		    node,
		    doc,
		    i = 0,
		    l = collection.length,
		    iNoClone = l - 1,
		    value = args[0],
		    isFunction = jQuery.isFunction(value);

		// We can't cloneNode fragments that contain checked, in WebKit
		if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
			return collection.each(function (index) {
				var self = collection.eq(index);
				if (isFunction) {
					args[0] = value.call(this, index, self.html());
				}
				domManip(self, args, callback, ignored);
			});
		}

		if (l) {
			fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
			first = fragment.firstChild;

			if (fragment.childNodes.length === 1) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if (first || ignored) {
				scripts = jQuery.map(getAll(fragment, "script"), disableScript);
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for (; i < l; i++) {
					node = fragment;

					if (i !== iNoClone) {
						node = jQuery.clone(node, true, true);

						// Keep references to cloned scripts for later restoration
						if (hasScripts) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge(scripts, getAll(node, "script"));
						}
					}

					callback.call(collection[i], node, i);
				}

				if (hasScripts) {
					doc = scripts[scripts.length - 1].ownerDocument;

					// Reenable scripts
					jQuery.map(scripts, restoreScript);

					// Evaluate executable scripts on first document insertion
					for (i = 0; i < hasScripts; i++) {
						node = scripts[i];
						if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {

							if (node.src) {

								// Optional AJAX dependency, but won't run scripts if not present
								if (jQuery._evalUrl) {
									jQuery._evalUrl(node.src);
								}
							} else {
								DOMEval(node.textContent.replace(rcleanScript, ""), doc);
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function _remove(elem, selector, keepData) {
		var node,
		    nodes = selector ? jQuery.filter(selector, elem) : elem,
		    i = 0;

		for (; (node = nodes[i]) != null; i++) {
			if (!keepData && node.nodeType === 1) {
				jQuery.cleanData(getAll(node));
			}

			if (node.parentNode) {
				if (keepData && jQuery.contains(node.ownerDocument, node)) {
					setGlobalEval(getAll(node, "script"));
				}
				node.parentNode.removeChild(node);
			}
		}

		return elem;
	}

	jQuery.extend({
		htmlPrefilter: function htmlPrefilter(html) {
			return html.replace(rxhtmlTag, "<$1></$2>");
		},

		clone: function clone(elem, dataAndEvents, deepDataAndEvents) {
			var i,
			    l,
			    srcElements,
			    destElements,
			    clone = elem.cloneNode(true),
			    inPage = jQuery.contains(elem.ownerDocument, elem);

			// Fix IE cloning issues
			if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll(clone);
				srcElements = getAll(elem);

				for (i = 0, l = srcElements.length; i < l; i++) {
					fixInput(srcElements[i], destElements[i]);
				}
			}

			// Copy the events from the original to the clone
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);

					for (i = 0, l = srcElements.length; i < l; i++) {
						cloneCopyEvent(srcElements[i], destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}

			// Preserve script evaluation history
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function cleanData(elems) {
			var data,
			    elem,
			    type,
			    special = jQuery.event.special,
			    i = 0;

			for (; (elem = elems[i]) !== undefined; i++) {
				if (acceptData(elem)) {
					if (data = elem[dataPriv.expando]) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);

									// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataPriv.expando] = undefined;
					}
					if (elem[dataUser.expando]) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[dataUser.expando] = undefined;
					}
				}
			}
		}
	});

	jQuery.fn.extend({
		detach: function detach(selector) {
			return _remove(this, selector, true);
		},

		remove: function remove(selector) {
			return _remove(this, selector);
		},

		text: function text(value) {
			return access(this, function (value) {
				return value === undefined ? jQuery.text(this) : this.empty().each(function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = value;
					}
				});
			}, null, value, arguments.length);
		},

		append: function append() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},

		prepend: function prepend() {
			return domManip(this, arguments, function (elem) {
				if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},

		before: function before() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},

		after: function after() {
			return domManip(this, arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},

		empty: function empty() {
			var elem,
			    i = 0;

			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {

					// Prevent memory leaks
					jQuery.cleanData(getAll(elem, false));

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function clone(dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},

		html: function html(value) {
			return access(this, function (value) {
				var elem = this[0] || {},
				    i = 0,
				    l = this.length;

				if (value === undefined && elem.nodeType === 1) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

					value = jQuery.htmlPrefilter(value);

					try {
						for (; i < l; i++) {
							elem = this[i] || {};

							// Remove element nodes and prevent memory leaks
							if (elem.nodeType === 1) {
								jQuery.cleanData(getAll(elem, false));
								elem.innerHTML = value;
							}
						}

						elem = 0;

						// If using innerHTML throws an exception, use the fallback method
					} catch (e) {}
				}

				if (elem) {
					this.empty().append(value);
				}
			}, null, value, arguments.length);
		},

		replaceWith: function replaceWith() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip(this, arguments, function (elem) {
				var parent = this.parentNode;

				if (jQuery.inArray(this, ignored) < 0) {
					jQuery.cleanData(getAll(this));
					if (parent) {
						parent.replaceChild(elem, this);
					}
				}

				// Force callback invocation
			}, ignored);
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (name, original) {
		jQuery.fn[name] = function (selector) {
			var elems,
			    ret = [],
			    insert = jQuery(selector),
			    last = insert.length - 1,
			    i = 0;

			for (; i <= last; i++) {
				elems = i === last ? this : this.clone(true);
				jQuery(insert[i])[original](elems);

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply(ret, elems.get());
			}

			return this.pushStack(ret);
		};
	});
	var rmargin = /^margin/;

	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

	var getStyles = function getStyles(elem) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (!view || !view.opener) {
			view = window;
		}

		return view.getComputedStyle(elem);
	};

	(function () {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if (!div) {
				return;
			}

			div.style.cssText = "box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild(container);

			var divStyle = window.getComputedStyle(div);
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild(container);

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal,
		    boxSizingReliableVal,
		    pixelMarginRightVal,
		    reliableMarginLeftVal,
		    container = document.createElement("div"),
		    div = document.createElement("div");

		// Finish early in limited (non-browser) environments
		if (!div.style) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
		container.appendChild(div);

		jQuery.extend(support, {
			pixelPosition: function pixelPosition() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function boxSizingReliable() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function pixelMarginRight() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function reliableMarginLeft() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		});
	})();

	function curCSS(elem, name, computed) {
		var width,
		    minWidth,
		    maxWidth,
		    ret,


		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

		computed = computed || getStyles(elem);

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if (computed) {
			ret = computed.getPropertyValue(name) || computed[name];

			if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
				ret = jQuery.style(elem, name);
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" : ret;
	}

	function addGetHookIf(conditionFn, hookFn) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function get() {
				if (conditionFn()) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply(this, arguments);
			}
		};
	}

	var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	    rcustomProp = /^--/,
	    cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	    cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	    cssPrefixes = ["Webkit", "Moz", "ms"],
	    emptyStyle = document.createElement("div").style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName(name) {

		// Shortcut for names that are not vendor prefixed
		if (name in emptyStyle) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
		    i = cssPrefixes.length;

		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in emptyStyle) {
				return name;
			}
		}
	}

	// Return a property mapped along what jQuery.cssProps suggests or to
	// a vendor prefixed property.
	function finalPropName(name) {
		var ret = jQuery.cssProps[name];
		if (!ret) {
			ret = jQuery.cssProps[name] = vendorPropName(name) || name;
		}
		return ret;
	}

	function setPositiveNumber(elem, value, subtract) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec(value);
		return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
	}

	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i,
		    val = 0;

		// If we already have the right measurement, avoid augmentation
		if (extra === (isBorderBox ? "border" : "content")) {
			i = 4;

			// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for (; i < 4; i += 2) {

			// Both box models exclude margin, so add it if we want it
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}

			if (isBorderBox) {

				// border-box includes padding, so remove it if we want content
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}

				// At this point, extra isn't border nor margin, so remove border
				if (extra !== "margin") {
					val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

				// At this point, extra isn't content nor padding, so add border
				if (extra !== "padding") {
					val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
				}
			}
		}

		return val;
	}

	function getWidthOrHeight(elem, name, extra) {

		// Start with computed style
		var valueIsBorderBox,
		    styles = getStyles(elem),
		    val = curCSS(elem, name, styles),
		    isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

		// Computed unit is not pixels. Stop here and return.
		if (rnumnonpx.test(val)) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);

		// Fall back to offsetWidth/Height when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		if (val === "auto") {
			val = elem["offset" + name[0].toUpperCase() + name.slice(1)];
		}

		// Normalize "", auto, and prepare for extra
		val = parseFloat(val) || 0;

		// Use the active box-sizing model to add/subtract irrelevant styles
		return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function get(elem, computed) {
					if (computed) {

						// We should always get a number back from opacity
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function style(elem, name, value, extra) {

			// Don't set styles on text and comment nodes
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}

			// Make sure that we're working with the right name
			var ret,
			    type,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name),
			    style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// Check if we're setting a value
			if (value !== undefined) {
				type = typeof value === "undefined" ? "undefined" : _typeof(value);

				// Convert "+=" or "-=" to relative numbers (#7345)
				if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
					value = adjustCSS(elem, name, ret);

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if (value == null || value !== value) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if (type === "number") {
					value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
				}

				// background-* props affect original clone's values
				if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
					style[name] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

					if (isCustomProp) {
						style.setProperty(name, value);
					} else {
						style[name] = value;
					}
				}
			} else {

				// If a hook was provided get the non-computed value from there
				if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[name];
			}
		},

		css: function css(elem, name, extra, styles) {
			var val,
			    num,
			    hooks,
			    origName = jQuery.camelCase(name),
			    isCustomProp = rcustomProp.test(name);

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if (!isCustomProp) {
				name = finalPropName(origName);
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

			// If a hook was provided get the computed value from there
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}

			// Otherwise, if a way to get the computed value exists, use that
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}

			// Convert "normal" to computed value
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || isFinite(num) ? num || 0 : val;
			}

			return val;
		}
	});

	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function get(elem, computed, extra) {
				if (computed) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test(jQuery.css(elem, "display")) && (

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
						return getWidthOrHeight(elem, name, extra);
					}) : getWidthOrHeight(elem, name, extra);
				}
			},

			set: function set(elem, value, extra) {
				var matches,
				    styles = extra && getStyles(elem),
				    subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);

				// Convert to pixels if value adjustment is needed
				if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {

					elem.style[name] = value;
					value = jQuery.css(elem, name);
				}

				return setPositiveNumber(elem, value, subtract);
			}
		};
	});

	jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
		if (computed) {
			return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
				return elem.getBoundingClientRect().left;
			})) + "px";
		}
	});

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (prefix, suffix) {
		jQuery.cssHooks[prefix + suffix] = {
			expand: function expand(value) {
				var i = 0,
				    expanded = {},


				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [value];

				for (; i < 4; i++) {
					expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
				}

				return expanded;
			}
		};

		if (!rmargin.test(prefix)) {
			jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function css(name, value) {
			return access(this, function (elem, name, value) {
				var styles,
				    len,
				    map = {},
				    i = 0;

				if (Array.isArray(name)) {
					styles = getStyles(elem);
					len = name.length;

					for (; i < len; i++) {
						map[name[i]] = jQuery.css(elem, name[i], false, styles);
					}

					return map;
				}

				return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
			}, name, value, arguments.length > 1);
		}
	});

	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function init(elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function cur() {
			var hooks = Tween.propHooks[this.prop];

			return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
		},
		run: function run(percent) {
			var eased,
			    hooks = Tween.propHooks[this.prop];

			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;

			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}

			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function get(tween) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
					return tween.elem[tween.prop];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css(tween.elem, tween.prop, "");

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function set(tween) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function set(tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function linear(p) {
			return p;
		},
		swing: function swing(p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};

	var fxNow,
	    inProgress,
	    rfxtypes = /^(?:toggle|show|hide)$/,
	    rrun = /queueHooks$/;

	function schedule() {
		if (inProgress) {
			if (document.hidden === false && window.requestAnimationFrame) {
				window.requestAnimationFrame(schedule);
			} else {
				window.setTimeout(schedule, jQuery.fx.interval);
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout(function () {
			fxNow = undefined;
		});
		return fxNow = jQuery.now();
	}

	// Generate parameters to create a standard animation
	function genFx(type, includeWidth) {
		var which,
		    i = 0,
		    attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}

		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween(value, prop, animation) {
		var tween,
		    collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
		    index = 0,
		    length = collection.length;
		for (; index < length; index++) {
			if (tween = collection[index].call(animation, prop, value)) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter(elem, props, opts) {
		var prop,
		    value,
		    toggle,
		    hooks,
		    oldfire,
		    propTween,
		    restoreDisplay,
		    display,
		    isBox = "width" in props || "height" in props,
		    anim = this,
		    orig = {},
		    style = elem.style,
		    hidden = elem.nodeType && isHiddenWithinTree(elem),
		    dataShow = dataPriv.get(elem, "fxshow");

		// Queue-skipping animations hijack the fx hooks
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function () {

				// Ensure the complete handler is called before this completes
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Detect show/hide animations
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.test(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;

						// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject(props);
		if (!propTween && jQuery.isEmptyObject(orig)) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if (isBox && elem.nodeType === 1) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if (restoreDisplay == null) {
				restoreDisplay = dataPriv.get(elem, "display");
			}
			display = jQuery.css(elem, "display");
			if (display === "none") {
				if (restoreDisplay) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide([elem], true);
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css(elem, "display");
					showHide([elem]);
				}
			}

			// Animate inline elements as inline-block
			if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
				if (jQuery.css(elem, "float") === "none") {

					// Restore the original display value at the end of pure show/hide animations
					if (!propTween) {
						anim.done(function () {
							style.display = restoreDisplay;
						});
						if (restoreDisplay == null) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if (opts.overflow) {
			style.overflow = "hidden";
			anim.always(function () {
				style.overflow = opts.overflow[0];
				style.overflowX = opts.overflow[1];
				style.overflowY = opts.overflow[2];
			});
		}

		// Implement show/hide animations
		propTween = false;
		for (prop in orig) {

			// General show/hide setup for this element animation
			if (!propTween) {
				if (dataShow) {
					if ("hidden" in dataShow) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if (toggle) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if (hidden) {
					showHide([elem], true);
				}

				/* eslint-disable no-loop-func */

				anim.done(function () {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if (!hidden) {
						showHide([elem]);
					}
					dataPriv.remove(elem, "fxshow");
					for (prop in orig) {
						jQuery.style(elem, prop, orig[prop]);
					}
				});
			}

			// Per-property setup
			propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
			if (!(prop in dataShow)) {
				dataShow[prop] = propTween.start;
				if (hidden) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (Array.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}

			if (index !== name) {
				props[name] = value;
				delete props[index];
			}

			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}

	function Animation(elem, properties, options) {
		var result,
		    stopped,
		    index = 0,
		    length = Animation.prefilters.length,
		    deferred = jQuery.Deferred().always(function () {

			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		    tick = function tick() {
			if (stopped) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
			    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),


			// Support: Android 2.3 only
			// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
			temp = remaining / animation.duration || 0,
			    percent = 1 - temp,
			    index = 0,
			    length = animation.tweens.length;

			for (; index < length; index++) {
				animation.tweens[index].run(percent);
			}

			deferred.notifyWith(elem, [animation, percent, remaining]);

			// If there's more to do, yield
			if (percent < 1 && length) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if (!length) {
				deferred.notifyWith(elem, [animation, 1, 0]);
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith(elem, [animation]);
			return false;
		},
		    animation = deferred.promise({
			elem: elem,
			props: jQuery.extend({}, properties),
			opts: jQuery.extend(true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function createTween(prop, end) {
				var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
				animation.tweens.push(tween);
				return tween;
			},
			stop: function stop(gotoEnd) {
				var index = 0,


				// If we are going to the end, we want to run all the tweens
				// otherwise we skip this part
				length = gotoEnd ? animation.tweens.length : 0;
				if (stopped) {
					return this;
				}
				stopped = true;
				for (; index < length; index++) {
					animation.tweens[index].run(1);
				}

				// Resolve when we played the last frame; otherwise, reject
				if (gotoEnd) {
					deferred.notifyWith(elem, [animation, 1, 0]);
					deferred.resolveWith(elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith(elem, [animation, gotoEnd]);
				}
				return this;
			}
		}),
		    props = animation.props;

		propFilter(props, animation.opts.specialEasing);

		for (; index < length; index++) {
			result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
			if (result) {
				if (jQuery.isFunction(result.stop)) {
					jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
				}
				return result;
			}
		}

		jQuery.map(props, createTween, animation);

		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}

		// Attach callbacks from options
		animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);

		jQuery.fx.timer(jQuery.extend(tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		}));

		return animation;
	}

	jQuery.Animation = jQuery.extend(Animation, {

		tweeners: {
			"*": [function (prop, value) {
				var tween = this.createTween(prop, value);
				adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
				return tween;
			}]
		},

		tweener: function tweener(props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.match(rnothtmlwhite);
			}

			var prop,
			    index = 0,
			    length = props.length;

			for (; index < length; index++) {
				prop = props[index];
				Animation.tweeners[prop] = Animation.tweeners[prop] || [];
				Animation.tweeners[prop].unshift(callback);
			}
		},

		prefilters: [defaultPrefilter],

		prefilter: function prefilter(callback, prepend) {
			if (prepend) {
				Animation.prefilters.unshift(callback);
			} else {
				Animation.prefilters.push(callback);
			}
		}
	});

	jQuery.speed = function (speed, easing, fn) {
		var opt = speed && (typeof speed === "undefined" ? "undefined" : _typeof(speed)) === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		// Go to the end state if fx are off
		if (jQuery.fx.off) {
			opt.duration = 0;
		} else {
			if (typeof opt.duration !== "number") {
				if (opt.duration in jQuery.fx.speeds) {
					opt.duration = jQuery.fx.speeds[opt.duration];
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}

			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function fadeTo(speed, to, easing, callback) {

			// Show any hidden elements after setting opacity to 0
			return this.filter(isHiddenWithinTree).css("opacity", 0).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback);
		},
		animate: function animate(prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
			    optall = jQuery.speed(speed, easing, callback),
			    doAnimation = function doAnimation() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation(this, jQuery.extend({}, prop), optall);

				// Empty animations, or finishing resolves immediately
				if (empty || dataPriv.get(this, "finish")) {
					anim.stop(true);
				}
			};
			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
		},
		stop: function stop(type, clearQueue, gotoEnd) {
			var stopQueue = function stopQueue(hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};

			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}

			return this.each(function () {
				var dequeue = true,
				    index = type != null && type + "queueHooks",
				    timers = jQuery.timers,
				    data = dataPriv.get(this);

				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}

				for (index = timers.length; index--;) {
					if (timers[index].elem === this && (type == null || timers[index].queue === type)) {

						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function finish(type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
				    data = dataPriv.get(this),
				    queue = data[type + "queue"],
				    hooks = data[type + "queueHooks"],
				    timers = jQuery.timers,
				    length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue(this, type, []);

				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}

				// Look for any active animations, and finish them
				for (index = timers.length; index--;) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}

				// Look for any animations in the old queue and finish them
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function (name, props) {
		jQuery.fn[name] = function (speed, easing, callback) {
			return this.animate(props, speed, easing, callback);
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
		    i = 0,
		    timers = jQuery.timers;

		fxNow = jQuery.now();

		for (; i < timers.length; i++) {
			timer = timers[i];

			// Run the timer and safely remove it when done (allowing for external removal)
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}

		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (inProgress) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function () {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};

	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue(type, function (next, hooks) {
			var timeout = window.setTimeout(next, time);
			hooks.stop = function () {
				window.clearTimeout(timeout);
			};
		});
	};

	(function () {
		var input = document.createElement("input"),
		    select = document.createElement("select"),
		    opt = select.appendChild(document.createElement("option"));

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement("input");
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();

	var boolHook,
	    attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function attr(name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},

		removeAttr: function removeAttr(name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		}
	});

	jQuery.extend({
		attr: function attr(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if (typeof elem.getAttribute === "undefined") {
				return jQuery.prop(elem, name, value);
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
			}

			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
					return;
				}

				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				elem.setAttribute(name, value + "");
				return value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			ret = jQuery.find.attr(elem, name);

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function set(elem, value) {
					if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function removeAttr(elem, value) {
			var name,
			    i = 0,


			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match(rnothtmlwhite);

			if (attrNames && elem.nodeType === 1) {
				while (name = attrNames[i++]) {
					elem.removeAttribute(name);
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function set(elem, value, name) {
			if (value === false) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr(elem, name);
			} else {
				elem.setAttribute(name, name);
			}
			return name;
		}
	};

	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;

		attrHandle[name] = function (elem, name, isXML) {
			var ret,
			    handle,
			    lowercaseName = name.toLowerCase();

			if (!isXML) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[lowercaseName];
				attrHandle[lowercaseName] = ret;
				ret = getter(elem, name, isXML) != null ? lowercaseName : null;
				attrHandle[lowercaseName] = handle;
			}
			return ret;
		};
	});

	var rfocusable = /^(?:input|select|textarea|button)$/i,
	    rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend({
		prop: function prop(name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},

		removeProp: function removeProp(name) {
			return this.each(function () {
				delete this[jQuery.propFix[name] || name];
			});
		}
	});

	jQuery.extend({
		prop: function prop(elem, name, value) {
			var ret,
			    hooks,
			    nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if (nType === 3 || nType === 8 || nType === 2) {
				return;
			}

			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

				// Fix name and attach hooks
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}

			if (value !== undefined) {
				if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				}

				return elem[name] = value;
			}

			if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			}

			return elem[name];
		},

		propHooks: {
			tabIndex: {
				get: function get(elem) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr(elem, "tabindex");

					if (tabindex) {
						return parseInt(tabindex, 10);
					}

					if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function get(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent && parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function set(elem) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;

					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		jQuery.propFix[this.toLowerCase()] = this;
	});

	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse(value) {
		var tokens = value.match(rnothtmlwhite) || [];
		return tokens.join(" ");
	}

	function getClass(elem) {
		return elem.getAttribute && elem.getAttribute("class") || "";
	}

	jQuery.fn.extend({
		addClass: function addClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, getClass(this)));
				});
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		removeClass: function removeClass(value) {
			var classes,
			    elem,
			    cur,
			    curValue,
			    clazz,
			    j,
			    finalValue,
			    i = 0;

			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, getClass(this)));
				});
			}

			if (!arguments.length) {
				return this.attr("class", "");
			}

			if (typeof value === "string" && value) {
				classes = value.match(rnothtmlwhite) || [];

				while (elem = this[i++]) {
					curValue = getClass(elem);

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";

					if (cur) {
						j = 0;
						while (clazz = classes[j++]) {

							// Remove *all* instances
							while (cur.indexOf(" " + clazz + " ") > -1) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse(cur);
						if (curValue !== finalValue) {
							elem.setAttribute("class", finalValue);
						}
					}
				}
			}

			return this;
		},

		toggleClass: function toggleClass(value, stateVal) {
			var type = typeof value === "undefined" ? "undefined" : _typeof(value);

			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}

			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
				});
			}

			return this.each(function () {
				var className, i, self, classNames;

				if (type === "string") {

					// Toggle individual class names
					i = 0;
					self = jQuery(this);
					classNames = value.match(rnothtmlwhite) || [];

					while (className = classNames[i++]) {

						// Check each className given, space separated list
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}

					// Toggle whole class name
				} else if (value === undefined || type === "boolean") {
					className = getClass(this);
					if (className) {

						// Store className if set
						dataPriv.set(this, "__className__", className);
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if (this.setAttribute) {
						this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
					}
				}
			});
		},

		hasClass: function hasClass(selector) {
			var className,
			    elem,
			    i = 0;

			className = " " + selector + " ";
			while (elem = this[i++]) {
				if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
					return true;
				}
			}

			return false;
		}
	});

	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function val(value) {
			var hooks,
			    ret,
			    isFunction,
			    elem = this[0];

			if (!arguments.length) {
				if (elem) {
					hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];

					if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if (typeof ret === "string") {
						return ret.replace(rreturn, "");
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction(value);

			return this.each(function (i) {
				var val;

				if (this.nodeType !== 1) {
					return;
				}

				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (Array.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

				// If set returns undefined, fall back to normal setting
				if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function get(elem) {

					var val = jQuery.find.attr(elem, "value");
					return val != null ? val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse(jQuery.text(elem));
				}
			},
			select: {
				get: function get(elem) {
					var value,
					    option,
					    i,
					    options = elem.options,
					    index = elem.selectedIndex,
					    one = elem.type === "select-one",
					    values = one ? null : [],
					    max = one ? index + 1 : options.length;

					if (index < 0) {
						i = max;
					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for (; i < max; i++) {
						option = options[i];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ((option.selected || i === index) &&

						// Don't return options that are disabled or in a disabled optgroup
						!option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if (one) {
								return value;
							}

							// Multi-Selects return an array
							values.push(value);
						}
					}

					return values;
				},

				set: function set(elem, value) {
					var optionSet,
					    option,
					    options = elem.options,
					    values = jQuery.makeArray(value),
					    i = options.length;

					while (i--) {
						option = options[i];

						/* eslint-disable no-cond-assign */

						if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function set(elem, value) {
				if (Array.isArray(value)) {
					return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
				}
			}
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});

	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend(jQuery.event, {

		trigger: function trigger(event, data, elem, onlyHandlers) {

			var i,
			    cur,
			    tmp,
			    bubbleType,
			    ontype,
			    handle,
			    special,
			    eventPath = [elem || document],
			    type = hasOwn.call(event, "type") ? event.type : event,
			    namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}

			if (type.indexOf(".") > -1) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[jQuery.expando] ? event : new jQuery.Event(type, (typeof event === "undefined" ? "undefined" : _typeof(event)) === "object" && event);

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ? [event] : jQuery.makeArray(data, [event]);

			// Allow special events to draw outside the lines
			special = jQuery.event.special[type] || {};
			if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

				event.type = i > 1 ? bubbleType : special.bindType || type;

				// jQuery handler
				handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}

				// Native handler
				handle = ontype && cur[ontype];
				if (handle && handle.apply && acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if (!onlyHandlers && !event.isDefaultPrevented()) {

				if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ontype];

						if (tmp) {
							elem[ontype] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[type]();
						jQuery.event.triggered = undefined;

						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function simulate(type, elem, event) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true
			});

			jQuery.event.trigger(e, null, elem);
		}

	});

	jQuery.fn.extend({

		trigger: function trigger(type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function triggerHandler(type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		}
	});

	jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (i, name) {

		// Handle event binding
		jQuery.fn[name] = function (data, fn) {
			return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
		};
	});

	jQuery.fn.extend({
		hover: function hover(fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		}
	});

	support.focusin = "onfocusin" in window;

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if (!support.focusin) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function (orig, fix) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function handler(event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
			};

			jQuery.event.special[fix] = {
				setup: function setup() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix);

					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					dataPriv.access(doc, fix, (attaches || 0) + 1);
				},
				teardown: function teardown() {
					var doc = this.ownerDocument || this,
					    attaches = dataPriv.access(doc, fix) - 1;

					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						dataPriv.remove(doc, fix);
					} else {
						dataPriv.access(doc, fix, attaches);
					}
				}
			};
		});
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = /\?/;

	// Cross-browser xml parsing
	jQuery.parseXML = function (data) {
		var xml;
		if (!data || typeof data !== "string") {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = new window.DOMParser().parseFromString(data, "text/xml");
		} catch (e) {
			xml = undefined;
		}

		if (!xml || xml.getElementsByTagName("parsererror").length) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};

	var rbracket = /\[\]$/,
	    rCRLF = /\r?\n/g,
	    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	    rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams(prefix, obj, traditional, add) {
		var name;

		if (Array.isArray(obj)) {

			// Serialize array item.
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {

					// Treat each array item as a scalar.
					add(prefix, v);
				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(prefix + "[" + ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && v != null ? i : "") + "]", v, traditional, add);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {

			// Serialize object item.
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {

			// Serialize scalar item.
			add(prefix, obj);
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function (a, traditional) {
		var prefix,
		    s = [],
		    add = function add(key, valueOrFunction) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;

			s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
		};

		// If an array was passed in, assume that it is an array of form elements.
		if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {

			// Serialize the form elements
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}

		// Return the resulting serialization
		return s.join("&");
	};

	jQuery.fn.extend({
		serialize: function serialize() {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function serializeArray() {
			return this.map(function () {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			}).filter(function () {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
			}).map(function (i, elem) {
				var val = jQuery(this).val();

				if (val == null) {
					return null;
				}

				if (Array.isArray(val)) {
					return jQuery.map(val, function (val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					});
				}

				return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		}
	});

	var r20 = /%20/g,
	    rhash = /#.*$/,
	    rantiCache = /([?&])_=[^&]*/,
	    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,


	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	    rnoContent = /^(?:GET|HEAD)$/,
	    rprotocol = /^\/\//,


	/* Prefilters
  * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  * 2) These are called:
  *    - BEFORE asking for a transport
  *    - AFTER param serialization (s.data is a string if s.processData is true)
  * 3) key is the dataType
  * 4) the catchall symbol "*" can be used
  * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  */
	prefilters = {},


	/* Transports bindings
  * 1) key is the dataType
  * 2) the catchall symbol "*" can be used
  * 3) selection will start with transport dataType and THEN go to "*" if needed
  */
	transports = {},


	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*"),


	// Anchor tag for parsing the document origin
	originAnchor = document.createElement("a");
	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports(structure) {

		// dataTypeExpression is optional and defaults to "*"
		return function (dataTypeExpression, func) {

			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
			    i = 0,
			    dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];

			if (jQuery.isFunction(func)) {

				// For each dataType in the dataTypeExpression
				while (dataType = dataTypes[i++]) {

					// Prepend if requested
					if (dataType[0] === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);

						// Otherwise append
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

		var inspected = {},
		    seekingTransport = structure === transports;

		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
				if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {

					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}

		return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend(target, src) {
		var key,
		    deep,
		    flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}

		return target;
	}

	/* Handles responses to an ajax request:
  * - finds the right dataType (mediates between content-type and expected dataType)
  * - returns the corresponding response
  */
	function ajaxHandleResponses(s, jqXHR, responses) {

		var ct,
		    type,
		    finalDataType,
		    firstDataType,
		    contents = s.contents,
		    dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {

			// Try convertible dataTypes
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}

	/* Chain conversions given the request and the original response
  * Also sets the responseXXX fields on the jqXHR instance
  */
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
		    current,
		    conv,
		    tmp,
		    prev,
		    converters = {},


		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while (current) {

			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}

			// Apply the dataFilter if provided
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}

			prev = current;
			current = dataTypes.shift();

			if (current) {

				// There's only work to do if current dataType is non-auto
				if (current === "*") {

					current = prev;

					// Convert response if prev dataType is non-auto and differs from current
				} else if (prev !== "*" && prev !== current) {

					// Seek a direct converter
					conv = converters[prev + " " + current] || converters["* " + current];

					// If none found, seek a pair
					if (!conv) {
						for (conv2 in converters) {

							// If conv2 outputs current
							tmp = conv2.split(" ");
							if (tmp[1] === current) {

								// If prev can be converted to accepted input
								conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {

									// Condense equivalence converters
									if (conv === true) {
										conv = converters[conv2];

										// Otherwise, insert the intermediate dataType
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if (conv !== true) {

						// Unless errors are allowed to bubble, catch and return them
						if (conv && s.throws) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test(location.protocol),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
   timeout: 0,
   data: null,
   dataType: null,
   username: null,
   password: null,
   cache: null,
   throws: false,
   traditional: false,
   headers: {},
   */

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function ajaxSetup(target, settings) {
			return settings ?

			// Building a settings object
			ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

			// Extending ajaxSettings
			ajaxExtend(jQuery.ajaxSettings, target);
		},

		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),

		// Main method
		ajax: function ajax(url, options) {

			// If url is an object, simulate pre-1.5 signature
			if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,


			// URL without anti-cache param
			cacheURL,


			// Response headers
			responseHeadersString,
			    responseHeaders,


			// timeout handle
			timeoutTimer,


			// Url cleanup var
			urlAnchor,


			// Request state (becomes false upon send and true upon completion)
			completed,


			// To know if global events are to be dispatched
			fireGlobals,


			// Loop variable
			i,


			// uncached part of the url
			uncached,


			// Create the final options object
			s = jQuery.ajaxSetup({}, options),


			// Callbacks context
			callbackContext = s.context || s,


			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,


			// Deferreds
			deferred = jQuery.Deferred(),
			    completeDeferred = jQuery.Callbacks("once memory"),


			// Status-dependent callbacks
			_statusCode = s.statusCode || {},


			// Headers (they are sent all at once)
			requestHeaders = {},
			    requestHeadersNames = {},


			// Default abort message
			strAbort = "canceled",


			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function getResponseHeader(key) {
					var match;
					if (completed) {
						if (!responseHeaders) {
							responseHeaders = {};
							while (match = rheaders.exec(responseHeadersString)) {
								responseHeaders[match[1].toLowerCase()] = match[2];
							}
						}
						match = responseHeaders[key.toLowerCase()];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function getAllResponseHeaders() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function setRequestHeader(name, value) {
					if (completed == null) {
						name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
						requestHeaders[name] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function overrideMimeType(type) {
					if (completed == null) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function statusCode(map) {
					var code;
					if (map) {
						if (completed) {

							// Execute the appropriate callbacks
							jqXHR.always(map[jqXHR.status]);
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for (code in map) {
								_statusCode[code] = [_statusCode[code], map[code]];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function abort(statusText) {
					var finalText = statusText || strAbort;
					if (transport) {
						transport.abort(finalText);
					}
					done(0, finalText);
					return this;
				}
			};

			// Attach deferreds
			deferred.promise(jqXHR);

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if (s.crossDomain == null) {
				urlAnchor = document.createElement("a");

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
				} catch (e) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}

			// Apply prefilters
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

			// If request was aborted inside a prefilter, stop there
			if (completed) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test(s.type);

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace(rhash, "");

			// More options handling for requests with no content
			if (!s.hasContent) {

				// Remember the hash so we can put it back
				uncached = s.url.slice(cacheURL.length);

				// If data is available, append data to url
				if (s.data) {
					cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if (s.cache === false) {
					cacheURL = cacheURL.replace(rantiCache, "$1");
					uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++ + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
				s.data = s.data.replace(r20, "+");
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}

			// Set the correct header, if data is being sent
			if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

			// Check for headers option
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}

			// Allow custom headers/mimetypes and early abort
			if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add(s.complete);
			jqXHR.done(s.success);
			jqXHR.fail(s.error);

			// Get transport
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

			// If no transport, we auto-abort
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}

				// If request was aborted inside ajaxSend, stop there
				if (completed) {
					return jqXHR;
				}

				// Timeout
				if (s.async && s.timeout > 0) {
					timeoutTimer = window.setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}

				try {
					completed = false;
					transport.send(requestHeaders, done);
				} catch (e) {

					// Rethrow post-completion exceptions
					if (completed) {
						throw e;
					}

					// Propagate others as results
					done(-1, e);
				}
			}

			// Callback for when everything is done
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
				    success,
				    error,
				    response,
				    modified,
				    statusText = nativeStatusText;

				// Ignore repeat invocations
				if (completed) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if (timeoutTimer) {
					window.clearTimeout(timeoutTimer);
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert(s, response, jqXHR, isSuccess);

				// If successful, handle type chaining
				if (isSuccess) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}

					// if no content
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";

						// if not modified
					} else if (status === 304) {
						statusText = "notmodified";

						// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";

				// Success/Error
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}

				// Status-dependent callbacks
				jqXHR.statusCode(_statusCode);
				_statusCode = undefined;

				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
				}

				// Complete
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

					// Handle the global AJAX counter
					if (! --jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function getJSON(url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},

		getScript: function getScript(url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		}
	});

	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {

			// Shift arguments if data argument was omitted
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax(jQuery.extend({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject(url) && url));
		};
	});

	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		});
	};

	jQuery.fn.extend({
		wrapAll: function wrapAll(html) {
			var wrap;

			if (this[0]) {
				if (jQuery.isFunction(html)) {
					html = html.call(this[0]);
				}

				// The elements to wrap the target around
				wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}

				wrap.map(function () {
					var elem = this;

					while (elem.firstElementChild) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append(this);
			}

			return this;
		},

		wrapInner: function wrapInner(html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}

			return this.each(function () {
				var self = jQuery(this),
				    contents = self.contents();

				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},

		wrap: function wrap(html) {
			var isFunction = jQuery.isFunction(html);

			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},

		unwrap: function unwrap(selector) {
			this.parent(selector).not("body").each(function () {
				jQuery(this).replaceWith(this.childNodes);
			});
			return this;
		}
	});

	jQuery.expr.pseudos.hidden = function (elem) {
		return !jQuery.expr.pseudos.visible(elem);
	};
	jQuery.expr.pseudos.visible = function (elem) {
		return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
	};

	jQuery.ajaxSettings.xhr = function () {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	};

	var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	    xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function (options) {
		var _callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if (support.cors || xhrSupported && !options.crossDomain) {
			return {
				send: function send(headers, complete) {
					var i,
					    xhr = options.xhr();

					xhr.open(options.type, options.url, options.async, options.username, options.password);

					// Apply custom fields if provided
					if (options.xhrFields) {
						for (i in options.xhrFields) {
							xhr[i] = options.xhrFields[i];
						}
					}

					// Override mime type if needed
					if (options.mimeType && xhr.overrideMimeType) {
						xhr.overrideMimeType(options.mimeType);
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if (!options.crossDomain && !headers["X-Requested-With"]) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for (i in headers) {
						xhr.setRequestHeader(i, headers[i]);
					}

					// Callback
					_callback = function callback(type) {
						return function () {
							if (_callback) {
								_callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if (type === "abort") {
									xhr.abort();
								} else if (type === "error") {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if (typeof xhr.status !== "number") {
										complete(0, "error");
									} else {
										complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status, xhr.statusText);
									}
								} else {
									complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									(xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText }, xhr.getAllResponseHeaders());
								}
							}
						};
					};

					// Listen to events
					xhr.onload = _callback();
					errorCallback = xhr.onerror = _callback("error");

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if (xhr.onabort !== undefined) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function () {

							// Check readyState before timeout as it changes
							if (xhr.readyState === 4) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout(function () {
									if (_callback) {
										errorCallback();
									}
								});
							}
						};
					}

					// Create the abort callback
					_callback = _callback("abort");

					try {

						// Do send the request (this may raise an exception)
						xhr.send(options.hasContent && options.data || null);
					} catch (e) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if (_callback) {
							throw e;
						}
					}
				},

				abort: function abort() {
					if (_callback) {
						_callback();
					}
				}
			};
		}
	});

	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter(function (s) {
		if (s.crossDomain) {
			s.contents.script = false;
		}
	});

	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function textScript(text) {
				jQuery.globalEval(text);
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport("script", function (s) {

		// This transport only deals with cross domain requests
		if (s.crossDomain) {
			var script, _callback2;
			return {
				send: function send(_, complete) {
					script = jQuery("<script>").prop({
						charset: s.scriptCharset,
						src: s.url
					}).on("load error", _callback2 = function callback(evt) {
						script.remove();
						_callback2 = null;
						if (evt) {
							complete(evt.type === "error" ? 404 : 200, evt.type);
						}
					});

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild(script[0]);
				},
				abort: function abort() {
					if (_callback2) {
						_callback2();
					}
				}
			};
		}
	});

	var oldCallbacks = [],
	    rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function jsonpCallback() {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {

		var callbackName,
		    overwritten,
		    responseContainer,
		    jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if (jsonProp || s.dataTypes[0] === "jsonp") {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

			// Insert callback into url or form data
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};

			// Force json dataType
			s.dataTypes[0] = "json";

			// Install callback
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function () {

				// If previous value didn't exist - remove it
				if (overwritten === undefined) {
					jQuery(window).removeProp(callbackName);

					// Otherwise restore preexisting value
				} else {
					window[callbackName] = overwritten;
				}

				// Save back as free
				if (s[callbackName]) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push(callbackName);
				}

				// Call if it was a function and we have a response
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});

	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = function () {
		var body = document.implementation.createHTMLDocument("").body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	}();

	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (typeof data !== "string") {
			return [];
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if (!context) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if (support.createHTMLDocument) {
				context = document.implementation.createHTMLDocument("");

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement("base");
				base.href = document.location.href;
				context.head.appendChild(base);
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec(data);
		scripts = !keepScripts && [];

		// Single tag
		if (parsed) {
			return [context.createElement(parsed[1])];
		}

		parsed = buildFragment([data], context, scripts);

		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}

		return jQuery.merge([], parsed.childNodes);
	};

	/**
  * Load a url into a page
  */
	jQuery.fn.load = function (url, params, callback) {
		var selector,
		    type,
		    response,
		    self = this,
		    off = url.indexOf(" ");

		if (off > -1) {
			selector = stripAndCollapse(url.slice(off));
			url = url.slice(0, off);
		}

		// If it's a function
		if (jQuery.isFunction(params)) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

			// Otherwise, build a param string
		} else if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object") {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if (self.length > 0) {
			jQuery.ajax({
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			}).done(function (responseText) {

				// Save response for use in complete callback
				response = arguments;

				self.html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
			}).always(callback && function (jqXHR, status) {
				self.each(function () {
					callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
				});
			});
		}

		return this;
	};

	// Attach a bunch of functions for handling common AJAX events
	jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (i, type) {
		jQuery.fn[type] = function (fn) {
			return this.on(type, fn);
		};
	});

	jQuery.expr.pseudos.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};

	jQuery.offset = {
		setOffset: function setOffset(elem, options, i) {
			var curPosition,
			    curLeft,
			    curCSSTop,
			    curTop,
			    curOffset,
			    curCSSLeft,
			    calculatePosition,
			    position = jQuery.css(elem, "position"),
			    curElem = jQuery(elem),
			    props = {};

			// Set position first, in-case top/left are set even on static elem
			if (position === "static") {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}

			if (jQuery.isFunction(options)) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call(elem, i, jQuery.extend({}, curOffset));
			}

			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}

			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		}
	};

	jQuery.fn.extend({
		offset: function offset(options) {

			// Preserve chaining for setter
			if (arguments.length) {
				return options === undefined ? this : this.each(function (i) {
					jQuery.offset.setOffset(this, options, i);
				});
			}

			var doc,
			    docElem,
			    rect,
			    win,
			    elem = this[0];

			if (!elem) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if (!elem.getClientRects().length) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			doc = elem.ownerDocument;
			docElem = doc.documentElement;
			win = doc.defaultView;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function position() {
			if (!this[0]) {
				return;
			}

			var offsetParent,
			    offset,
			    elem = this[0],
			    parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if (jQuery.css(elem, "position") === "fixed") {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if (!nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css(offsetParent[0], "borderTopWidth", true),
					left: parentOffset.left + jQuery.css(offsetParent[0], "borderLeftWidth", true)
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function offsetParent() {
			return this.map(function () {
				var offsetParent = this.offsetParent;

				while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (method, prop) {
		var top = "pageYOffset" === prop;

		jQuery.fn[method] = function (val) {
			return access(this, function (elem, method, val) {

				// Coalesce documents and windows
				var win;
				if (jQuery.isWindow(elem)) {
					win = elem;
				} else if (elem.nodeType === 9) {
					win = elem.defaultView;
				}

				if (val === undefined) {
					return win ? win[prop] : elem[method];
				}

				if (win) {
					win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
				} else {
					elem[method] = val;
				}
			}, method, val, arguments.length);
		};
	});

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
			if (computed) {
				computed = curCSS(elem, prop);

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
			}
		});
	});

	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each({ Height: "height", Width: "width" }, function (name, type) {
		jQuery.each({ padding: "inner" + name, content: type, "": "outer" + name }, function (defaultExtra, funcName) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[funcName] = function (margin, value) {
				var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
				    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

				return access(this, function (elem, type, value) {
					var doc;

					if (jQuery.isWindow(elem)) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
					}

					// Get document width or height
					if (elem.nodeType === 9) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
					}

					return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css(elem, type, extra) :

					// Set width or height on the element
					jQuery.style(elem, type, value, extra);
				}, type, chainable ? margin : undefined, chainable);
			};
		});
	});

	jQuery.fn.extend({

		bind: function bind(types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function unbind(types, fn) {
			return this.off(types, null, fn);
		},

		delegate: function delegate(selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function undelegate(selector, types, fn) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
		}
	});

	jQuery.holdReady = function (hold) {
		if (hold) {
			jQuery.readyWait++;
		} else {
			jQuery.ready(true);
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,


	// Map over the $ in case of overwrite
	_$ = window.$;

	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if (!noGlobal) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module)))

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch (e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires,
            t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
      options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(138);

var _MLogin = __webpack_require__(139);

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

migi.eventBus.on('SET_VOLUME', function (v) {
  var uid = window.$CONFIG ? $CONFIG.uid : '';
  var key = uid + 'volume';
  localStorage[key] = v;
});

migi.eventBus.on('COMMENT', function (type) {
  var parent = window.parent;
  if (parent !== window) {
    parent.comment && parent.comment(type);
  }
});

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by army8735 on 2017/9/20.
 */

var parent = window.parent;

if (parent !== window) {
  var hostname = parent.location.hostname;
  if (hostname.indexOf('circling.cc') === -1) {
    location.href = '//404.html';
  } else {
    var findA = function findA(node) {
      if (node && node !== document.body && node.nodeName === 'A') {
        var href = node.getAttribute('href') || '';
        if (href && href.charAt(0) !== '#') {
          // 外链
          if (/^https?:\/\//.test(href)) {
            if (node.getAttribute('target') === '_blank') {
              return false;
            }
            parent.goto && parent.goto(href);
            return true;
          }
          // 相对/根路径或相对路径
          else if (href.charAt(0) !== '/' || href.indexOf('//') !== 0) {
              parent.setHash && parent.setHash(href);
              return true;
            }
        }
      } else if (node.parentNode) {
        return findA(node.parentNode);
      }
    };

    document.body.addEventListener('click', function (e) {
      if (findA(e.target)) {
        e.preventDefault();
      }
    });
    document.addEventListener('DOMContentLoaded', function () {
      parent.setWidth(document.documentElement.clientWidth);
    });
  }
} else if (location.pathname !== '/' && !/__unembed/.test(location.search)) {
  location.href = '/#' + location.pathname;
}

/***/ }),
/* 139 */
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
      var parent = window.parent;
      if (parent !== window && parent.goto) {
        parent.goto('/oauth/weibo?goto=' + encodeURIComponent(location.href));
      } else {
        location.href = '/oauth/weibo?goto=' + encodeURIComponent(location.href);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return migi.createVd("div", [["class", "cp-mlogin fn-hide"]], [migi.createVd("div", [["class", "c"]], [migi.createVd("h3", [], ["还没有登录哦~"]), migi.createVd("p", [], [new migi.Obj("message", this, function () {
        return this.message || '点击下方微博登录按钮登录或注册~';
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
/* 140 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);