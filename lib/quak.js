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
	exports.link = link;
	
	var _utils = __webpack_require__(1);
	
	var _view = __webpack_require__(2);
	
	var View = _interopRequireWildcard(_view);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function link(tagName, ViewModel) {
	  var tmpl = document.getElementById(tagName);
	  var list = document.getElementsByTagName(tagName);
	
	  tmpl.parentNode.removeChild(tmpl);
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _utils.toArray)(list)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var node = _step.value;
	
	      var html = tmpl.innerHTML.trim();
	      var view = View.factory(node, html);
	      var model = (0, _utils.isFunction)(ViewModel) ? new ViewModel() : ViewModel;
	
	      View.mount(view, model);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isUndefined = isUndefined;
	exports.isFunction = isFunction;
	exports.extend = extend;
	exports.each = each;
	exports.contains = contains;
	exports.toArray = toArray;
	exports.walkDom = walkDom;
	function isArray(value) {
	  return value instanceof Array;
	}
	
	function isObject(value) {
	  var allowNull = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var result = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	
	  if (result && !value) {
	    return allowNull;
	  }
	
	  return result;
	}
	
	function isUndefined(value) {
	  return value === void 0;
	}
	
	function isFunction(value) {
	  return typeof value === 'function';
	}
	
	function extend(target) {
	  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    rest[_key - 1] = arguments[_key];
	  }
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = rest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var obj = _step.value;
	
	      for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) {
	          target[prop] = obj[prop];
	        }
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
	
	  return target;
	}
	
	function each(collection, cb) {
	  for (var key in collection) {
	    if (collection.hasOwnProperty(key)) {
	      cb(collection[key], key);
	    }
	  }
	}
	
	function contains(collection, value) {
	  return collection.indexOf(value) !== -1;
	}
	
	function toArray(collection) {
	  return Array.prototype.slice.call(collection);
	}
	
	function walkDom(node, cb) {
	  if (!node) {
	    return;
	  }
	
	  if (cb(node)) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	      for (var _iterator2 = toArray(node.childNodes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var child = _step2.value;
	
	        walkDom(child, cb);
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
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.factory = factory;
	exports.mount = mount;
	exports.render = render;
	
	var _utils = __webpack_require__(1);
	
	var _parse = __webpack_require__(3);
	
	var _parse2 = _interopRequireDefault(_parse);
	
	var _resolve = __webpack_require__(6);
	
	var _resolve2 = _interopRequireDefault(_resolve);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function factory(elem) {
	  var template = arguments.length <= 1 || arguments[1] === undefined ? elem.outerHTML : arguments[1];
	
	  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  var _ref$handlers = _ref.handlers;
	  var handlers = _ref$handlers === undefined ? [] : _ref$handlers;
	  var _ref$bindings = _ref.bindings;
	  var bindings = _ref$bindings === undefined ? [] : _ref$bindings;
	
	  var anchor = document.createTextNode('');
	
	  elem.parentNode.replaceChild(anchor, elem);
	
	  return {
	    template: template,
	    handlers: handlers,
	    bindings: bindings,
	    anchor: anchor,
	    nodes: [],
	    mounted: false,
	    model: null
	  };
	}
	
	function mount(view, model) {
	  if (view.mounted) {
	    return render(view, model);
	  }
	
	  view.mounted = true;
	  view.model = model;
	
	  var container = document.createElement('div');
	  var frag = document.createDocumentFragment();
	
	  container.innerHTML = view.template;
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _parse2.default)(container)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _step.value;
	      var handlers = _step$value.handlers;
	      var bindings = _step$value.bindings;
	
	      view.handlers.push(handlers);
	      view.bindings.push(bindings);
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
	
	  view.nodes = (0, _utils.toArray)(container.childNodes);
	
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = view.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var node = _step2.value;
	
	      frag.appendChild(node);
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
	
	  view.anchor.parentNode.insertBefore(frag, view.anchor);
	
	  return render(view);
	}
	
	function render(view) {
	  var model = arguments.length <= 1 || arguments[1] === undefined ? view.model : arguments[1];
	
	  if (model !== view.model) {
	    (0, _utils.extend)(view.model, model);
	  }
	
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = view.bindings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var list = _step3.value;
	
	      var node = list.node;
	      var isTextNode = node.nodeType === 3;
	
	      if (isTextNode) {
	        node.nodeValue = list[0].tmpl;
	      }
	
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;
	
	      try {
	        for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var _step4$value = _step4.value;
	          var value = _step4$value.value;
	          var expr = _step4$value.expr;
	
	          if (isTextNode) {
	            node.nodeValue = node.nodeValue.replace(value, (0, _resolve2.default)(expr)(model));
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
	
	  return view;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.default = parse;
	
	var _utils = __webpack_require__(1);
	
	var _index = __webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var RE_EXPR = /{([^{]+)}/g;
	
	function parseExpressions(tmpl) {
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
	}
	
	function parseAttributes() {
	  var attributes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  var handlers = [];
	  var bindings = [];
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _utils.toArray)(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = _step.value;
	      var value = _step$value.value;
	      var attr = _step$value.name;
	
	      var handle = (0, _index.getHandler)(attr);
	
	      if (handle) {
	        attributes.removeNamedItem(attr);
	        handlers.push({ value: value, handle: handle });
	      } else {
	        bindings.push(value, attr);
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
	
	  return [handlers, bindings];
	}
	
	function parse(container) {
	  var result = [];
	
	  (0, _utils.walkDom)(container, function (node) {
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
	        return handle.scope;
	      });
	    }
	
	    return true;
	  });
	
	  return result;
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getHandler = getHandler;
	exports.addHandler = addHandler;
	
	var _each = __webpack_require__(5);
	
	var _each2 = _interopRequireDefault(_each);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HANDLERS = {
	  each: _each2.default
	};
	
	function getHandler(name, value) {
	  return HANDLERS[name] || null;
	}
	
	function addHandler(name, fn) {
	  return HANDLERS[name] = fn;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = each;
	function each() {}
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = resolve;
	
	var _utils = __webpack_require__(1);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function resolve(expr, cb) {
	  return function (scope, $event) {
	    var _ref;
	
	    var keys = (0, _utils.isObject)(scope) ? Object.keys(scope) : [];
	
	    var args = keys.map(function (k) {
	      return scope[k];
	    }).concat($event);
	
	    keys.push('$event');
	
	    var result = (_ref = new Function(keys.join(','), 'return ' + expr)).call.apply(_ref, [scope].concat(_toConsumableArray(args)));
	
	    (0, _utils.isFunction)(cb) && cb(scope);
	
	    return result;
	  };
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=quak.js.map