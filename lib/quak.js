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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	      var view = new _view2.default(node, html);

	      view.render(new ViewModel());
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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isUndef = isUndef;
	exports.isFunction = isFunction;
	exports.isView = isView;
	exports.getEvent = getEvent;
	exports.extend = extend;
	exports.resolve = resolve;
	exports.each = each;
	exports.contains = contains;
	exports.toArray = toArray;
	exports.walkDom = walkDom;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var SPECIAL = ['each'];
	var RE_EVENTS = /^on(click)$/;

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

	function isUndef(value) {
	  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === void 0;
	}

	function isFunction(value) {
	  return typeof value === 'function';
	}

	function isView(value) {
	  return contains(SPECIAL, value);
	}

	function getEvent(str) {
	  var _ref = str.match(RE_EVENTS) || [];

	  var _ref2 = _slicedToArray(_ref, 2);

	  var name = _ref2[1];

	  return name;
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

	function resolve(scope, expr, cb) {
	  return function () {
	    try {
	      var _ref3;

	      var keys = !isObject(scope) ? [] : Object.keys(scope);
	      var vals = keys.map(function (k) {
	        return scope[k];
	      });
	      var result = (_ref3 = new Function(keys.join(','), 'return ' + expr)).call.apply(_ref3, [scope].concat(_toConsumableArray(vals)));

	      isFunction(cb) && cb(scope);

	      return result;
	    } catch (error) {}
	  };
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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _parse3 = __webpack_require__(3);

	var _parse4 = _interopRequireDefault(_parse3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
	  function View(elem, tmpl) {
	    _classCallCheck(this, View);

	    this._template = tmpl;
	    this._anchor = document.createTextNode('');
	    this._views = {};
	    this._nodes = [];
	    this._bindings = [];
	    this._attributes = {};
	    this._handlers = {};

	    elem.parentNode.replaceChild(this._anchor, elem);
	  }

	  _createClass(View, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var model = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var container = document.createElement('div');
	      var frag = document.createDocumentFragment();

	      container.innerHTML = this._template;

	      var _parse = (0, _parse4.default)(container);

	      var _parse2 = _slicedToArray(_parse, 2);

	      var attrs = _parse2[0];
	      var binds = _parse2[1];


	      this._attributes = attrs;
	      this._bindings = binds;

	      (0, _utils.each)(attrs, function (value, key) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = attrs[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _step.value;
	            var node = _step$value.node;
	            var expr = _step$value.expr;

	            var event = (0, _utils.getEvent)(key);

	            if ((0, _utils.isView)(key)) {
	              var list = _this._views[key] || [];
	              var Fn = __webpack_require__(4)("./" + key);
	              var view = new Fn(node, node.outerHTML, expr, _this);

	              list.push(view.render(model));

	              _this._views[key] = list;
	            } else if (event) {
	              var handler = (0, _utils.resolve)(model, expr, _this.update.bind(_this));
	              var _list = _this._handlers[event] || [];

	              _list.push({ node: node, handler: handler });
	              node.addEventListener(event, handler);
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
	      });

	      this._nodes = (0, _utils.toArray)(container.childNodes);

	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this._nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

	      this._anchor.parentNode.insertBefore(frag, this._anchor);

	      return this.update(model);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      var model = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this._bindings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _list2 = _step3.value;
	          var node = _list2.node;
	          var tmpl = _list2.tmpl;

	          var result = tmpl;

	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;

	          try {
	            for (var _iterator5 = _list2[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var _step5$value = _step5.value;
	              var value = _step5$value.value;
	              var expr = _step5$value.expr;

	              result = result.replace(value, (0, _utils.resolve)(model, expr));
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

	          node.nodeValue = result;
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

	      var list = !(0, _utils.isArray)(this._views) ? Object.keys(this._views).map(function (key) {
	        return _this2._views[key];
	      }).reduce(function (result, items) {
	        return result.concat(items);
	      }, []) : this._views;

	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var view = _step4.value;

	          view.update(model);
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

	      return this;
	    }
	  }]);

	  return View;
	}();

	exports.default = View;
	module.exports = exports['default'];

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

	var RE_ATTR_EXPR = /^{(.+)}$/;
	var RE_TEXT_EXPR = /{([^{]+)}/g;

	var ELEMENT = 1;
	var TEXT = 3;
	function parse(container) {
	  var attrs = {};
	  var binds = [];

	  (0, _utils.walkDom)(container, function (node) {
	    var viewFound = false;

	    switch (node.nodeType) {
	      case ELEMENT:
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = (0, _utils.toArray)(node.attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = _step.value;
	            var value = _step$value.value;
	            var name = _step$value.name;

	            viewFound = viewFound || (0, _utils.isView)(name);

	            var _list = attrs[name] || [];

	            var _ref = value.match(RE_ATTR_EXPR) || [];

	            var _ref2 = _slicedToArray(_ref, 2);

	            var expr = _ref2[1];


	            if (expr) {
	              node.removeAttribute(name);
	              _list.push({ node: node, expr: expr });

	              attrs[name] = _list;
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

	        break;
	      case TEXT:
	        var match = void 0;
	        var list = [];

	        list.node = node;
	        list.tmpl = node.nodeValue;

	        while (match = RE_TEXT_EXPR.exec(node.nodeValue)) {
	          var _match = match;

	          var _match2 = _slicedToArray(_match, 2);

	          var value = _match2[0];
	          var expr = _match2[1];


	          list.push({ value: value, expr: expr });
	        }

	        binds.push(list);

	        break;
	    }

	    return !viewFound;
	  });

	  return [attrs, binds];
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./each": 5,
		"./each.js": 5,
		"./view": 2,
		"./view.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _view = __webpack_require__(2);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EachView = function (_View) {
	  _inherits(EachView, _View);

	  function EachView(elem, tmpl, expr, parent) {
	    _classCallCheck(this, EachView);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EachView).call(this, elem, tmpl));

	    _this._expr = expr;
	    _this._parent = parent;
	    _this._views = [];
	    return _this;
	  }

	  _createClass(EachView, [{
	    key: 'render',
	    value: function render(model) {
	      return this.update(model);
	    }
	  }, {
	    key: 'update',
	    value: function update(model) {
	      var frag = document.createDocumentFragment();
	      var items = (0, _utils.resolve)(model, this._expr)() || [];

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _model = _step.value;

	          var temp = document.createTextNode('');

	          frag.appendChild(temp);

	          var view = new _view2.default(temp, this._template);

	          this._views.push(view.render(_model));
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

	      this._anchor.parentNode.insertBefore(frag, this._anchor);

	      return this;
	    }
	  }]);

	  return EachView;
	}(_view2.default);

	exports.default = EachView;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;