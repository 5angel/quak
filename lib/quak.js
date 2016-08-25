(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["quak"] = factory();
	else
		root["quak"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.link = undefined;
	
	var _common = __webpack_require__(1);
	
	var _dom = __webpack_require__(4);
	
	var _check = __webpack_require__(3);
	
	var _view = __webpack_require__(5);
	
	var View = _interopRequireWildcard(_view);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var link = exports.link = function link(tagName, ViewModel) {
	  var tmpl = (0, _dom.removeNode)((0, _dom.getById)(tagName));
	  var list = (0, _dom.getByTagName)(tagName);
	
	  var html = tmpl.innerHTML.trim();
	
	  (0, _common.each)(function (node) {
	    var model = (0, _check.isFunction)(ViewModel) ? new ViewModel() : ViewModel;
	
	    var view = View.factory(node, html);
	
	    View.mount(view, model);
	  }, list);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defineMethods = exports.defineProperty = exports.each = exports.iterateObject = exports.contains = exports.toArray = undefined;
	exports.extend = extend;
	
	var _fp = __webpack_require__(2);
	
	var _check = __webpack_require__(3);
	
	var toArray = exports.toArray = function toArray(collection) {
	  return Array.prototype.slice.call(collection);
	};
	
	function extend() {
	  var target = {};
	
	  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	    rest[_key] = arguments[_key];
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = rest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var obj = _step.value;
	
	      each(function (value, prop) {
	        target[prop] = value;
	      }, obj);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return target;
	}
	
	var contains = exports.contains = (0, _fp.curry)(function (value, collection) {
	  if ((0, _check.isArrayish)(collection)) {
	    return toArray(collection).indexOf(value);
	  }
	
	  return collection && collection.hasOwnProperty(value);
	});
	
	var iterateObject = exports.iterateObject = (0, _fp.curry)(function (onResult, fn, obj) {
	  var index = 0;
	  for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	      var value = obj[prop];
	      onResult(fn(value, prop, index), value, prop, index);
	      index++;
	    }
	  }
	});
	
	var each = exports.each = (0, _fp.curry)(function (fn, collection) {
	  if ((0, _check.isArrayish)(collection)) {
	    for (var i = 0; i < collection.length; ++i) {
	      fn(collection[i], i);
	    }
	  } else {
	    iterateObject(_fp.noop, fn, collection);
	  }
	});
	
	var defineProperty = exports.defineProperty = (0, _fp.curry)(function (obj, name, value) {
	  Object.defineProperty(obj, name, { value: value });
	});
	
	var defineMethods = exports.defineMethods = (0, _fp.curry)(function (obj, config) {
	  var target = extend(obj);
	
	  each(function (value, key) {
	    defineProperty(target, key, (0, _fp.curry)(value, obj));
	  }, config);
	
	  return target;
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var curry = exports.curry = function curry(fn) {
	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments[_key];
	  }
	
	  return fn.length <= rest.length ? fn.apply(undefined, rest) : function () {
	    for (var _len2 = arguments.length, more = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      more[_key2] = arguments[_key2];
	    }
	
	    return curry.apply(undefined, [fn].concat(rest, more));
	  };
	};
	
	var bind = exports.bind = function bind(fn, context) {
	  return fn.bind(context);
	};
	
	var noop = exports.noop = function noop() {};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isArrayish = exports.isUndefined = exports.isFunction = exports.isNumber = exports.isObject = exports.isArray = exports.isInstance = exports.isType = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _fp = __webpack_require__(2);
	
	var isType = exports.isType = (0, _fp.curry)(function (type, value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
	});
	
	var isInstance = exports.isInstance = (0, _fp.curry)(function (Fn, obj) {
	  return obj instanceof Fn;
	});
	
	var isArray = exports.isArray = isInstance(Array);
	
	var isObject = exports.isObject = isType('object');
	
	var isNumber = exports.isNumber = isType('number');
	
	var isFunction = exports.isFunction = isType('function');
	
	var isUndefined = exports.isUndefined = function isUndefined(value) {
	  return value === void 0;
	};
	
	var isArrayish = exports.isArrayish = function isArrayish(obj) {
	  return obj && isObject(obj) && isNumber(obj.length) && obj.length > 0 && obj.hasOwnProperty(obj.length - 1);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.walkNodes = exports.swapNodes = exports.appendNodeTo = exports.insertNodeAt = exports.removeNode = exports.getByTagName = exports.getById = exports.createFrag = exports.createText = exports.createElem = undefined;
	
	var _fp = __webpack_require__(2);
	
	var _common = __webpack_require__(1);
	
	var createElem = exports.createElem = (0, _fp.bind)(document.createElement, document);
	
	var createText = exports.createText = (0, _fp.bind)(document.createTextNode, document);
	
	var createFrag = exports.createFrag = (0, _fp.bind)(document.createDocumentFragment, document);
	
	var getById = exports.getById = (0, _fp.bind)(document.getElementById, document);
	
	var getByTagName = exports.getByTagName = (0, _fp.bind)(document.getElementsByTagName, document);
	
	var removeNode = exports.removeNode = function removeNode(node) {
	  return node.parentNode.removeChild(node);
	};
	
	var insertNodeAt = exports.insertNodeAt = (0, _fp.curry)(function (a, b) {
	  return a.parentNode.insertBefore(b, a);
	});
	
	var appendNodeTo = exports.appendNodeTo = (0, _fp.curry)(function (a, b) {
	  return a.appendChild(b);
	});
	
	var swapNodes = exports.swapNodes = (0, _fp.curry)(function (a, b) {
	  return a.parentNode.replaceChild(b, a);
	});
	
	var walkNodes = exports.walkNodes = (0, _fp.curry)(function (fn, node) {
	  if (fn(node)) {
	    (0, _common.each)(function (child) {
	      return walkNodes(fn, child);
	    }, node.childNodes);
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mount = mount;
	exports.unmount = unmount;
	exports.update = update;
	exports.render = render;
	exports.factory = factory;
	
	var _dom = __webpack_require__(4);
	
	var _check = __webpack_require__(3);
	
	var _common = __webpack_require__(1);
	
	var _parse = __webpack_require__(6);
	
	var _parse2 = _interopRequireDefault(_parse);
	
	var _resolve = __webpack_require__(9);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mount(view, model) {
	  if (view.mounted) {
	    return render(view, model);
	  }
	
	  update(view, model);
	
	  view.mounted = true;
	
	  var container = (0, _dom.createElem)('div');
	  var frag = (0, _dom.createFrag)();
	
	  container.innerHTML = view.template;
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _parse2.default)(container)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _step.value;
	      var handlers = _step$value.handlers;
	      var bindings = _step$value.bindings;
	
	      handlers.length && view.handlers.push(handlers);
	      bindings.length && view.bindings.push(bindings);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = view.handlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var list = _step2.value;
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;
	
	      try {
	        for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var handler = _step3.value;
	
	          (0, _check.isFunction)(handler.mount) && handler.mount(list.node, view);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  view.nodes = (0, _common.toArray)(container.childNodes);
	
	  (0, _common.each)(function (node) {
	    return (0, _dom.appendNodeTo)(frag, node);
	  }, view.nodes);
	  (0, _dom.insertNodeAt)(view.anchor, frag);
	
	  return view.render(model);
	}
	
	function unmount(view) {}
	
	function update(view, model) {
	  if (!(0, _check.isUndefined)(model) && model !== view.model) {
	    view.model = (0, _common.extend)(view.model, model);
	  }
	}
	
	function render(view, model) {
	  update(view, model);
	
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;
	
	  try {
	    for (var _iterator4 = view.bindings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var list = _step4.value;
	
	      var node = list.node;
	      var isTextNode = node.nodeType === 3;
	
	      if (isTextNode) {
	        node.nodeValue = list[0].tmpl;
	      }
	
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;
	
	      try {
	        for (var _iterator5 = list[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var _step5$value = _step5.value;
	          var value = _step5$value.value;
	          var expr = _step5$value.expr;
	
	          if (isTextNode) {
	            node.nodeValue = node.nodeValue.replace(value, (0, _resolve2.default)(expr)(model));
	          }
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }
	
	  return view;
	}
	
	function factory(elem) {
	  var template = arguments.length <= 1 || arguments[1] === undefined ? elem.outerHTML : arguments[1];
	
	  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  var _ref$handlers = _ref.handlers;
	  var handlers = _ref$handlers === undefined ? [] : _ref$handlers;
	  var _ref$bindings = _ref.bindings;
	  var bindings = _ref$bindings === undefined ? [] : _ref$bindings;
	
	  var anchor = (0, _dom.createText)('');
	
	  if (elem) {
	    (0, _dom.swapNodes)(elem, anchor);
	  }
	
	  var view = {
	    template: template,
	    handlers: handlers,
	    bindings: bindings,
	    anchor: anchor,
	    nodes: [],
	    mounted: false,
	    model: {}
	  };
	
	  return (0, _common.defineMethods)(view, { mount: mount, unmount: unmount, render: render });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = parse;
	
	var _dom = __webpack_require__(4);
	
	var _common = __webpack_require__(1);
	
	var _index = __webpack_require__(7);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var RE_EXPR = /{([^{]+)}/g;
	
	var parseExpressions = function parseExpressions(tmpl) {
	  var attr = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	  var list = [];
	  var match = void 0;
	  while (match = RE_EXPR.exec(tmpl)) {
	    var _match = match;
	
	    var _match2 = _slicedToArray(_match, 2);
	
	    var value = _match2[0];
	    var expr = _match2[1];
	
	    list.push({ tmpl: tmpl, value: value, expr: expr, attr: attr });
	  }
	  return list;
	};
	
	var parseAttributes = function parseAttributes() {
	  var attributes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var handlers = [];
	  var bindings = [];
	
	  (0, _common.each)(function (_ref) {
	    var expr = _ref.value;
	    var attr = _ref.name;
	
	    var factory = (0, _index.getHandler)(attr);
	
	    if (factory) {
	      attributes.removeNamedItem(attr);
	      handlers.push(factory(expr));
	    } else {
	      bindings.push(expr, attr);
	    }
	  }, attributes);
	
	  return [handlers, bindings];
	};
	
	function parse(container) {
	  var result = [];
	
	  (0, _dom.walkNodes)(function (node) {
	    var _parseAttributes = parseAttributes(node.attributes);
	
	    var _parseAttributes2 = _slicedToArray(_parseAttributes, 2);
	
	    var handlers = _parseAttributes2[0];
	    var bindings = _parseAttributes2[1];
	
	
	    if (node.nodeType === 3) {
	      // text
	      bindings.push.apply(bindings, _toConsumableArray(parseExpressions(node.nodeValue)));
	    }
	
	    handlers.node = bindings.node = node;
	
	    if (handlers.length + bindings.length > 0) {
	      result.push({ handlers: handlers, bindings: bindings });
	
	      return !handlers.some(function (handle) {
	        return handle.model;
	      });
	    }
	
	    return true;
	  }, container);
	
	  return result;
	}
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addHandler = exports.getHandler = undefined;
	
	var _each = __webpack_require__(8);
	
	var _each2 = _interopRequireDefault(_each);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var REGULAR = [];
	var NAMED = {
	  each: _each2.default
	};
	
	var getHandler = exports.getHandler = function getHandler(name) {
	  var handler = NAMED[name];
	
	  if (handler) {
	    return handler;
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = REGULAR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var item = _step.value;
	
	      if (item.test.test(name)) {
	        return item;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return null;
	};
	
	var addHandler = exports.addHandler = function addHandler(name, handler) {
	  return NAMED[name] = handler;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = each;
	
	var _check = __webpack_require__(3);
	
	var _common = __webpack_require__(1);
	
	var _resolve = __webpack_require__(9);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	var _view = __webpack_require__(5);
	
	var View = _interopRequireWildcard(_view);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var RE_EXPR = /^{(?:(\S+)in)*(\S+)}$/;
	
	function mount(attr, node, parent) {
	  attr.tmpl = node.outerHTML;
	
	  node.parentNode.replaceChild(attr.anchor, node);
	
	  return attr.render(parent);
	}
	
	function unmount(attr) {}
	
	function render(attr, parent) {
	  View.update(attr, parent.model);
	
	  var _attr$expr = attr.expr;
	  var value = _attr$expr.value;
	  var target = _attr$expr.target;
	
	
	  var list = (0, _resolve2.default)(target)(attr.model);
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var item = _step.value;
	
	      var view = View.factory(null, attr.tmpl);
	      var base = (0, _check.isUndefined)(value) ? item : _defineProperty({}, value, item);
	      var model = (0, _common.extend)(base, { parent: parent });
	
	      attr.anchor.parentNode.insertBefore(view.anchor, attr.anchor);
	
	      view.mount(model);
	
	      attr.views.push(view);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}
	
	function each(expr) {
	  var _RE_EXPR$exec = RE_EXPR.exec(expr.replace(/\s/g, ''));
	
	  var _RE_EXPR$exec2 = _slicedToArray(_RE_EXPR$exec, 3);
	
	  var value = _RE_EXPR$exec2[1];
	  var target = _RE_EXPR$exec2[2];
	
	
	  var attr = {
	    expr: { value: value, target: target },
	    model: {},
	    anchor: document.createTextNode(''),
	    tmpl: null,
	    views: []
	  };
	
	  (0, _common.defineMethods)(attr, { mount: mount, unmount: unmount, render: render });
	
	  return attr;
	}
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = resolve;
	
	var _check = __webpack_require__(3);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function resolve(expr, fn) {
	  for (var _len = arguments.length, named = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    named[_key - 2] = arguments[_key];
	  }
	
	  return function (scope) {
	    var _ref;
	
	    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      rest[_key2 - 1] = arguments[_key2];
	    }
	
	    var keys = (0, _check.isObject)(scope) ? Object.keys(scope) : [];
	    var args = keys.map(function (k) {
	      return scope[k];
	    }).concat(rest);
	
	    var result = (_ref = new Function(keys.concat(named).join(','), 'return ' + expr)).call.apply(_ref, [scope].concat(_toConsumableArray(args)));
	
	    (0, _check.isFunction)(fn) && fn(scope);
	
	    return result;
	  };
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=quak.js.map