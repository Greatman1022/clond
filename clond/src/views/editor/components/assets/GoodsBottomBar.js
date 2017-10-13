(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("GoodsBottomBar", [], factory);
	else if(typeof exports === 'object')
		exports["GoodsBottomBar"] = factory();
	else
		root["GoodsBottomBar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(13)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNodeNaNpxoveChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNodeNaNpxoveChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElementNaNpxoveChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElementNaNpxoveChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SkuSelector_SkuSelector_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SkuSelector_SkuSelector_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SkuSelector_SkuSelector_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


let _GoodsBottomBar = {
  editorConfig: {
    color: {
      el: ['text', 'color'],
      label: '选择颜色',
      type: 'String',
      value: 'rgb(255, 62, 120)',
      director : 'ColorPicker'
    },
    fixed:{
      label:'位置',
      type:'String',
      value:'bottom',
      director:'radio2'
    }
  },
    components: {
        skuSelector: __WEBPACK_IMPORTED_MODULE_0__SkuSelector_SkuSelector_vue___default.a
    },
    comName:"购买",
    props: {
      fixed: {
        default: 'bottom',
        type: String
      },
      color: {
        default: '#ff3e78',
        type: String
      },
      goodsName :{
        default :'',
        type:String
      }
    },
    data () {
        return {
            isCar: 0,
            display: 'display:none',
            name: '',
            status: 1,
            productSkus: []
        }
    },
    methods: {
      onLoad (options) {
        var app = this.$root
        var that = this
        this.version = app.globalData.appName
        wx.request({
          url: this.$root.apiServer+ this.$root.appid + '/basic/api/product/uuid',
          data: {
            uuid: options.id
          },
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success (res) {
            if (res.data.code == '100') {
              that.name = res.data.data.name
              that.productSkus = res.data.data.productSkus
              that.status = res.data.data.status
            } else {
              that.$root.redirectError('很遗憾，商品不存在')
            }
          },
          fail (e) {
            that.$root.redirectError('很遗憾，商品不存在')
          }
        })
      },
        displayChangeHandler (val) {
            this.display = val
        },
        joinCar () {
            if (this.status == '1') {
                this.num = 1
                this.minusStatus = 'disabled'
                this.display = 'display:block'
                this.isCar = 1 // 默认为0，1：加入购物车，2：立即购买
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },
        onceBuy () {
            if (this.status == '1') {
                this.num = 1
                this.minusStatus = 'disabled'
                this.display = 'display:block'
                this.isCar = 2
            } else {
                wx.showModal({
                    title: '提示',
                    content: '商品已下架'
                })
            }
        },
        //购物车跳转
        carBtn () {
            wx.navigateTo({
                url: '../car/car'
            })
        },
        // 订单列表跳转
        orderBtn () {
            wx.navigateTo({
                url: '../orderList/orderList'
            })
        },
        phone () {
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (((obj) => {
  let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
    if (lifeCycles.indexOf(name) > -1) {
      obj.methods[name] = obj[name]
    }
  })
  obj.methods['onLoad'] = function (...args) {
    wx.setNavigationBarTitle(obj.config && {
      title: obj.config.navigationBarTitleText
    })
    obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_GoodsBottomBar));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wx-view', [_c('wx-view', {
    staticClass: "main-btn clear"
  }, [_c('wx-view', {
    staticClass: "btn-left"
  }, [_c('wx-view', {
    staticClass: "phoneBtn btn-left-view",
    nativeOn: {
      "click": function($event) {
        _vm.phone($event)
      }
    }
  }, [_c('wx-image', {
    staticClass: "phoneBtn-image",
    attrs: {
      "src": "data:image/png;base64,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"
    }
  })], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "orderBtn btn-left-view",
    nativeOn: {
      "click": function($event) {
        _vm.orderBtn($event)
      }
    }
  }, [_c('wx-image', {
    staticClass: "orderBtn-image",
    attrs: {
      "src": "data:image/png;base64,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"
    }
  })], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "carBtn btn-left-view",
    nativeOn: {
      "click": function($event) {
        _vm.carBtn($event)
      }
    }
  }, [_c('wx-image', {
    staticClass: "carBtn-image",
    attrs: {
      "src": "data:image/png;base64,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"
    }
  })], 1)], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "btn-right"
  }, [_c('wx-view', {
    staticClass: "btn-right-view joinBtn",
    style: ('border:1px solid ' + _vm.color + '; color:' + _vm.color),
    nativeOn: {
      "click": function($event) {
        _vm.joinCar($event)
      }
    }
  }, [_vm._v("加入购物车")]), _vm._v(" "), _c('wx-view', {
    staticClass: "btn-right-view buyBtn",
    style: ('background:' + _vm.color),
    nativeOn: {
      "click": function($event) {
        _vm.onceBuy($event)
      }
    }
  }, [_vm._v("立即购买")])], 1)], 1), _vm._v(" "), _c('sku-selector', {
    attrs: {
      "display": _vm.display,
      "is-car": _vm.isCar,
      "product-skus": _vm.productSkus,
      "goods-name": _vm.goodsName
    },
    on: {
      "displayChange": _vm.displayChangeHandler
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-79ecb590", module.exports)
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("714c2de3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-79ecb590\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GoodsBottomBar.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-79ecb590\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./GoodsBottomBar.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.clear[data-v-2460aff3]::after{display: block;height: 0;clear: both;content: \"\";overflow: hidden;visibility: hidden\n}\n.left[data-v-2460aff3]{float: left\n}\n.right[data-v-2460aff3]{float: right\n}\n.auto[data-v-2460aff3]{width: 354.5px;margin-left: auto;margin-right: auto\n}\n.pageback[data-v-2460aff3]{position: fixed;top: 0;bottom: 0;width: 100%;z-index: 998;background: rgba(0,0,0,0.5);\n}\n.cont-box[data-v-2460aff3]{width: 100%;position:absolute;bottom: 0;top:109.5px;z-index: 1000;\n}\n.contant[data-v-2460aff3]{width: 100%;height: 100px;border-bottom:solid #e3e3e3 0.5px;background: #fff;\n}\n.cont-back[data-v-2460aff3]{width: 100%;height: 100px;\n}\n.good-img[data-v-2460aff3]{width: 105px;height: 105px;position: absolute;left: 14.5px;top:-5px;border-radius: 4px;overflow: hidden;line-height: 105px;text-align: center\n}\n.empty[data-v-2460aff3]{border:solid 0.5px #e3e3e3;background: #fff\n}\n.good-img .good-img-image[data-v-2460aff3]{width: 105px;height: 105px;background: red\n}\n.good-other[data-v-2460aff3]{margin-left: 134.5px;padding-top: 12px;font-size: 12px;\n}\n.good-price[data-v-2460aff3]{font-size: 13.5px;\n}\n.good-store[data-v-2460aff3]{margin-top: 10px;\n}\n.good-norm[data-v-2460aff3]{margin-top: 10px;\n}\n.good-norms[data-v-2460aff3]{background: #fff;\n}\n.norms-top[data-v-2460aff3]{font-size: 12px; color: #999999;line-height: 39.5px;\n}\n.norms-main[data-v-2460aff3]{padding-bottom:10px;border-bottom: #e3e3e3 0.5px solid;\n}\n.norms-bottom .option[data-v-2460aff3]{ float: left;font-size: 13.5px; padding: 6.5px 17px; margin-right: 10px;border-radius: 2.5px;margin-bottom:10px;\n}\n.b6[data-v-2460aff3]{border:solid 0.5px #b6b6b6;\n}\n.f3[data-v-2460aff3]{border:0.5px solid #ff3e78\n}\n.norms-bottom .sub[data-v-2460aff3],.norms-bottom .nub[data-v-2460aff3],.norms-bottom .add[data-v-2460aff3]{float: left;text-align: center;\n}\n.norms-bottom .sub[data-v-2460aff3],.norms-bottom .add[data-v-2460aff3]{width: 44px;height: 30px;line-height: 30px;border:solid 0.5px #b6b6b6;\n}\n.norms-bottom .sub[data-v-2460aff3]{border-top-left-radius: 2.5px;border-bottom-left-radius: 2.5px;border-right: none\n}\n.norms-bottom .add[data-v-2460aff3]{border-top-right-radius: 2.5px;border-bottom-right-radius: 2.5px;border-left: none\n}\n.norms-bottom .nub[data-v-2460aff3]{width: 49px;height: 30px;border:solid 0.5px #b6b6b6;line-height: 30px\n}\n.stepper[data-v-2460aff3] {width: 141.5px;height: 31px;border: 1px solid #ccc;border-radius: 1.5px;\n}\n.stepper .stepper-text[data-v-2460aff3] {width: 44.5px;line-height: 31px;text-align: center;float: left;font-size: 13.5px;\n}\n.stepper .stepper-input[data-v-2460aff3] {width: 50px;height: 31px;float: left;text-align: center;font-size: 11px;border-left: 1px solid #ccc;border-right: 1px solid #ccc;\n}\n.stepper .normal[data-v-2460aff3]{color: black;background: #ffffff\n}\n.stepper .disabled[data-v-2460aff3]{color: #ccc;background: #f6f6f6\n}\n.btn[data-v-2460aff3]{position: fixed;width: 100%;height: 50px;bottom: 0;font-size: 16px;color: #ffffff;text-align: center;line-height: 50px;\n}\n.good-cont[data-v-2460aff3]{position: absolute;width: 100%;height: 399.5px;background: #fff;bottom:0;left: 0;z-index: -9\n}\r\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\npage[data-v-79ecb590]{padding-bottom:49px;\n}\n.main-btn[data-v-79ecb590]{display: flex;background: #ffffff;position:absolute;bottom: 0;border-top: #e3e3e3 solid 0.5px;width: 100%;\r\njustify-content:space-between;height:50px;align-items:center;\n}\n.btn-left[data-v-79ecb590]{display: flex;margin-left:10px;\n}\n.btn-left-view[data-v-79ecb590]{margin-right: 19.5px;\n}\n.phoneBtn[data-v-79ecb590]{width: 20.5px;height: 20.5px;\n}\n.phoneBtn .phoneBtn-image[data-v-79ecb590]{width: 20.5px;height: 20.5px;\n}\n.orderBtn[data-v-79ecb590]{width: 19.5px;height: 20.5px;\n}\n.orderBtn .orderBtn-image[data-v-79ecb590]{width: 19.5px;height: 20.5px;\n}\n.carBtn[data-v-79ecb590]{width: 20.5px;height: 20.5px;\n}\n.carBtn .carBtn-image[data-v-79ecb590]{width: 20.5px;height: 20.5px;\n}\n.btn-right[data-v-79ecb590]{display: flex;\n}\n.btn-right .btn-right-view[data-v-79ecb590] {text-align: center;line-height: 37px;height: 37px;border-radius: 4px;font-size: 16px;flex: 1;margin-right: 10px;padding: 0 5px;\n}\n.joinBtn[data-v-79ecb590]{\n}\n.buyBtn[data-v-79ecb590]{color: #ffffff\n}\r\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(3),
  /* template */
  __webpack_require__(4),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-79ecb590",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\pro\\vueify\\src\\GoodsBottomBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GoodsBottomBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79ecb590", Component.options)
  } else {
    hotAPI.reload("data-v-79ecb590", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(11),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2460aff3",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\pro\\vueify\\src\\SkuSelector\\SkuSelector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SkuSelector.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2460aff3", Component.options)
  } else {
    hotAPI.reload("data-v-2460aff3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

let _SkuSelector = {
    props: {
        display: {
            type: String,
            default: 'display: none'
        },
        isCar: {
            type: Number,
            default: 0
        },
        productSkus: Array,
        goodsName: String
    },
    data () {
        return {
            num: 1,
            minusStatus: 'disabled',
            currentItem: 0,
            product: {
                id: '',
                price: 0,
                stockNum: 0,
                skuSpec: '',
                num: 0,
                url: ''
            },
            conDisplay: this.display
        }
    },
    watch: {
        display (newVal) {
            this.conDisplay = newVal
        },
        productSkus (newVal) {
            if (newVal && newVal.length) {
                this.itemValue(newVal[0].id)
            }
        }
    },
    methods: {
        bindMinus () {
            var num = this.num
            // 如果大于1时，才可以减
            if (num > 1) {
                num--
            }
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        bindPlus () {
            var num = this.num
            num++
            // 大于一件的时，normal状态，否则disable状态
            var minusStatus = num < 1 ? 'disabled' : 'normal'
            // 数值与状态写回
            this.num = num
            this.minusStatus = minusStatus
        },
        /* 输入框事件 */
        bindManual (e) {
            var num = e.detail.value
            // 数值与状态写回
            this.num = num
        },
        clickBack () {
            this.conDisplay = 'display:none'
            this.$emit('displayChange', this.conDisplay)
        },
        itemValue (id) {
            console.log(id)
            var index = this.findItemIndexByUserId(id) // 对应产品在数组中的index
            var productSkus = this.productSkus[index] // 对应产品
            var old_product = {}
            old_product.name = this.goodsName
            old_product.price = productSkus.salePrice
            old_product.stockNum = productSkus.stockNum
            old_product.num = this.num
            old_product.id = productSkus.productId
            old_product.skuId = productSkus.id
            old_product.skuSpec = productSkus.skuSpec
            if (productSkus.thumbnail !== null) {
                old_product.url = productSkus.thumbnail.url
            } else {
                old_product.url = ''
            }
            this.product = old_product
            this.currentItem = id
        },
        findItemIndexByUserId (id) {
            if (id >= 0) {
                for (var i = 0, len = this.productSkus.length; i < len; i++) {
                    if (this.productSkus[i].id == id)
                    return i
                }
            }
        },
        //确认商品
        subm () {
            if (this.product.id) {
                this.product.num = this.num
                if (this.isCar == 1) {
                    var servsers = getApp().globalData.servsers
                    var that = this
                    wx.request({
                        url: servsers + '/api/cart/addProduct',
                        data: {
                            token: getApp().globalData.token,
                            skuId: that.product.skuId,
                            buyNum: that.num
                        },
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        success (res) {
                            if (res.data.code == '100') {
                                wx.navigateTo({
                                    url: '../car/car'
                                })
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.msg,
                                })
                            }
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '../order/order' + '?product=' + JSON.stringify(this.product)
                    })
                }
            } else {
                wx.showModal({
                    title: '提示',
                    content: '请选择规格'
                })
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (((obj) => {
  let lifeCycles = ['onLaunch', 'onReady', 'onShow', 'onHide', 'onUnload']
  obj.methods = obj.methods || {}
  Object.keys(obj || {}).forEach(name => {
    if (lifeCycles.indexOf(name) > -1) {
      obj.methods[name] = obj[name]
    }
  })
  obj.methods['onLoad'] = function (...args) {
    wx.setNavigationBarTitle(obj.config && {
      title: obj.config.navigationBarTitleText
    })
    obj['onLoad'] && obj['onLoad'].apply(this, args)
  }
  return obj
})(_SkuSelector));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wx-view', {
    style: (_vm.conDisplay)
  }, [_c('wx-view', {
    staticClass: "pageback",
    nativeOn: {
      "click": function($event) {
        _vm.clickBack($event)
      }
    }
  }), _vm._v(" "), _c('wx-view', {
    staticClass: "cont-box"
  }, [_c('wx-view', {
    staticClass: "contant"
  }, [_c('wx-view', {
    staticClass: "cont-back"
  }, [(_vm.product.url) ? _c('wx-view', {
    staticClass: "good-img"
  }, [_c('wx-image', {
    staticClass: "good-img-image",
    attrs: {
      "src": _vm.product.url
    }
  })], 1) : _c('wx-view', {
    staticClass: "empty good-img"
  }, [_vm._v("暂无图片")]), _vm._v(" "), _c('wx-view', {
    staticClass: "good-other"
  }, [_c('wx-view', {
    staticClass: "good-price"
  }, [_vm._v("￥" + _vm._s(_vm.product.price))]), _vm._v(" "), _c('wx-view', {
    staticClass: "good-store"
  }, [_vm._v("库存：" + _vm._s(_vm.product.stockNum) + "件")]), _vm._v(" "), _c('wx-view', {
    staticClass: "good-norm"
  }, [_vm._v("已选择："), _c('wx-text', {
    staticClass: "main-color"
  }, [_vm._v(_vm._s(_vm.product.skuSpec))])], 1)], 1)], 1)], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "good-norms"
  }, [_c('wx-view', {
    staticClass: "auto"
  }, [_c('wx-view', {
    staticClass: "norms-main"
  }, [_c('wx-view', {
    staticClass: "norms-top"
  }, [_vm._v("规格选择")]), _vm._v(" "), _c('wx-view', {
    staticClass: "norms-bottom clear"
  }, _vm._l((_vm.productSkus), function(item, index) {
    return _c('wx-view', {
      key: item,
      class: _vm.currentItem == item.id ? 'option f3' : 'option b6',
      nativeOn: {
        "click": function($event) {
          _vm.itemValue(item.id)
        }
      }
    }, [_vm._v(_vm._s(item.skuSpec))])
  }))], 1)], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "auto"
  }, [_c('wx-view', {
    staticClass: "norms-main"
  }, [_c('wx-view', {
    staticClass: "norms-top"
  }, [_vm._v("数量")]), _vm._v(" "), _c('wx-view', {
    staticClass: "stepper"
  }, [_c('wx-text', {
    class: _vm.minusStatus + ' stepper-text',
    nativeOn: {
      "click": function($event) {
        _vm.bindMinus($event)
      }
    }
  }, [_vm._v("-")]), _vm._v(" "), _c('wx-input', {
    staticClass: "stepper-text",
    attrs: {
      "type": "number",
      "value": _vm.num
    },
    on: {
      "change": _vm.bindManual
    }
  }), _vm._v(" "), _c('wx-text', {
    staticClass: "normal stepper-text",
    nativeOn: {
      "click": function($event) {
        _vm.bindPlus($event)
      }
    }
  }, [_vm._v("+")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('wx-view', {
    staticClass: "good-cont"
  }), _vm._v(" "), _c('wx-view', {
    staticClass: "btn main-back",
    nativeOn: {
      "click": function($event) {
        _vm.subm(_vm.currentItem)
      }
    }
  }, [_vm._v("确认")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2460aff3", module.exports)
  }
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d0c17a2c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2460aff3\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SkuSelector.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2460aff3\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SkuSelector.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});