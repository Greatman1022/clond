(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("newProlists", [], factory);
	else if(typeof exports === 'object')
		exports["newProlists"] = factory();
	else
		root["newProlists"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
//
//
//

let _ProductList = {
  editorConfig: {   //该编辑器所有配置项
    model:{
      label: '布局',
      type: 'Number',
      value: 1,
      director : 'radio'
    },
    // isShow:{
    //   label: '',
    //   type:Object,
    //   value:{
    //     show: 1,
    //     ewidth: 141,
    //     eheight: 174
    //   },
    //   director : 'isShow'
    // },
    ewidth:{
      el: ['number'],
      label: '列表图片宽度',
      labelshow:"",
      type: 'Number',
      value: 141,
      director: 'isShow'
    },
    eheight: {
      el: ['number'],
      label: '列表图片高度',
      labelshow:"",
      type: 'Number',
      value: 174,
      director: 'isShow'
    },
    tshow: {
      label :'分类导航显示状态',
      type: Object,
      value:{
        show: 1,
        cId: 1,
        showIcon: 0,
        iconSize: 40,
        spacing: 0,
        tabIds:[]
      },
      director: 'goods'
    },
    shopcartShow: {
      label : '购物车图标显示状态',
      type : Object,
      value : {
        open: true,
        pic: 'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'
      },
      tip: '建议尺寸50*50',
      director : 'shopcartSwitch'
    },
    bgColor: {
      el: ['text', 'color'],
      label: '背景色',
      type: 'String',
      value: '#fff',
      director : 'ColorPicker'
    },
    color: {
      el: ['text', 'color'],
      label: '文本初始颜色',
      type: 'String',
      value: '#3a3a3a',
      director : 'ColorPicker'
    },
    activeColor: {
      el: ['text', 'color'],
      label: '文本选中颜色',
      type: 'String',
      value: '#38adff',
      director : 'ColorPicker'
    },
    fontSize: {
      el: ['number'],
      label: '文字大小',
      type: 'Number',
      value: '14',
      director: 'Fsize'
    },
    pt: {
      el: ['number'],
      label: '分类栏顶部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    marginlr:{
      el: ['number'],
      label: '分类栏左右间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    pb: {
      el: ['number'],
      label: '分类栏底部间距',
      type: 'Number',
      value: '10',
      director: 'Fsize'
    },
    fontSizeName:{
      el: ['number'],
      label: '商品名称文字大小',
      type: 'Number',
      value: '13',
      director: 'Fsize'
    },
    fontSizeMark:{
      el: ['number'],
      label: '商品价格符号大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontSizePrice:{
      el: ['number'],
      label: '商品价格文字大小',
      type: 'Number',
      value: '11',
      director: 'Fsize'
    },
    fontWeightName:{
      el: ['number'],
      label: '商品名称文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightMark:{
      el: ['number'],
      label: '商品价格符号粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    fontWeightPrice:{
      el: ['number'],
      label: '商品价格文字粗细',
      type: 'Number',
      value: '100',
      director: 'fontWeightSelect'
    },
    colorName:{
      el: ['text', 'color'],
      label: '商品名称文字颜色',
      type: 'String',
      value: '#333333',
      director : 'ColorPicker'
    },
    colorMark:{
      el: ['text', 'color'],
      label: '商品价格符号颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    },
    colorPrice:{
      el: ['text', 'color'],
      label: '商品价格文字颜色',
      type: 'String',
      value: '#b4282d',
      director : 'ColorPicker'
    }
  },
  comName:"新商品列表",
  props: {
    model: {
      default: 3,
      type: Number
    },
    // isShow: {
    //   default:function(){
    //     return {
    //       show: 3,
    //       ewidth: 141,
    //       eheight: 174
    //     }
    //     },
    //    type: Object
    // },
    ewidth: {
    label: '列表图片宽度',
      default: 141,
      type:Number
    },
    eheight: {
      label: '列表图片高度',
      default: 174,
      type:Number
    },
    tshow:{
      default:function(){
        return {
          show:1,
          cId:1,
          showIcon: 0,
          iconSize: 40,
          spacing: 0,
          tabIds:[]
        }
      },
      type:Object
    },
    shopcartShow: {
      type: Object,
      default: function(){
        return {open:true,pic:'http://image.vdongchina.com/M00/01/17/ZSUkmVmnc72EcSKxAAAAAFkCQJQ691.png'}
      }
    },
    bgColor: {
      default: '#fff',
      type: String
    },
    color: {
      default: '#3a3a3a',
      type: String
    },
    activeColor: {
      default: '#38adff',
      type: String
    },
    fontSize: {
      default: '14',
      type:String
    },
    pt: {
      default: '10',
      type:String
    },
    pb: {
      default: '10',
      type:String
    },
    marginlr: {
      default: '10',
      type:String
    },
    fontSizeName:{
      default: '13',
      type:String
    },
    fontSizeMark:{
      default: '11',
      type:String
    },
    fontSizePrice:{
      default: '11',
      type:String
    },
    fontWeightName:{
      default: '100',
      type:String
    },
    fontWeightMark:{
      default: '100',
      type:String
    },
    fontWeightPrice:{
      default: '100',
      type:String
    },
    colorName:{
      default: '#333333',
      type: String
    },
    colorMark:{
      default: '#b4282d',
      type: String
    },
    colorPrice:{
      default: '#b4282d',
      type: String
    }
  },
  data () {
    return {
      products: [],
      items: [],
      active: 0,
      catCid:null,    //切换栏目要用到,
      isFirst: true
    }
  },
  methods: {
      handler (cid,index) {
        this.active = index
        var that = this
        wx.request({
            url: this.$root.apiServer+this.$root.appid+'/basic/api/product/productByCatalogId',
            data: {
                catalogId : cid
            },
            method: 'GET',
            header: {
                'content-type': 'application/json'
            },
            success (res) {
              var productList = res.data.data.filter(item => {
		              return item.status == 1
		          })
              that.products = productList
            }
        })
      },
      productItem (id){
        wx.navigateTo({
            url: '../goods/goods' + '?id=' + id
        })
      },
      addCar (id) {
        //
      }
  },
  onLoad () {
    var that = this
    // 获取商品分类
    wx.request({
        url: this.$root.apiServer+this.$root.appid+'/basic/api/product/catalogs',
        method: 'GET',
        header: {
            'content-type': 'application/json'
        },
        success (res) {
          if(res.statusCode==200 && res.data.data.length){
              var result = res.data.data
              var resArr = []
              result.forEach(function(item,idx){
                resArr.push({id:item.id,name:item.name,thumbnail:item.thumbnail})
              })
              that.items = resArr
              that.catCid = resArr[0].id

            if(that.tshow.show&&that.tshow.tabIds){
              if(that.tshow.tabIds.length==0){
                  that.handler(that.catCid,0)
              }else{
                  that.handler(that.tshow.tabIds[0].id,0)
              }

            }else{
              that.handler(that.tshow.cId,0)
            }
            // that.handler(typeof that.tshow.cId !='object'&&that.tshow.cId&&cids.indexOf(that.tshow.cId)!==-1?that.tshow.cId:res.data.data[0].id,0)
            that.isFirst = false
            if(that.tshow.tabIds.length==0){
              that.tshow.tabIds=that.items
            }
          }
        }
    })
  },
  watch:{
    tshow(e){
      if(this.isFirst){
        return
      }
      if(e.show !=1){
        this.handler(e.cId,0)
      }else{
        // this.handler(this.catCid,0)
        if(this.tshow.tabIds.length==0){
          this.handler(this.catCid,0)
        }else{
          this.handler(this.tshow.tabIds[0].id,0)
        }
      }
    },
    // model(e){
    //   this.isShow.show=e
    //   // console.log(this.isShow.show)
    // }
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
})(_ProductList));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('wx-view', [(_vm.tshow.show == 1) ? _c('wx-scroll-view', {
    staticClass: "navs",
    style: ('background:' + _vm.bgColor),
    attrs: {
      "scroll-x": true
    }
  }, [_c('wx-view', {
    staticClass: "item-box",
    style: ('padding-top:' + _vm.pt + 'px;')
  }, _vm._l((_vm.tshow.tabIds), function(item, index) {
    return _c('wx-view', {
      key: item.id,
      staticClass: "nav",
      on: {
        "click": function($event) {
          _vm.handler(item.id, index)
        }
      }
    }, [(_vm.active == index) ? _c('wx-view', {
      staticClass: "_item"
    }, [(_vm.tshow.showIcon == 1) ? _c('wx-image', {
      staticClass: "nav-icon",
      style: ('width:' + _vm.tshow.iconSize + 'px;height:' + _vm.tshow.iconSize + 'px;margin-bottom:' + _vm.tshow.spacing + 'px;'),
      attrs: {
        "src": 'http://image.vdongchina.com/' + item.thumbnail
      }
    }) : _vm._e(), _vm._v(" "), _c('wx-text', {
      staticClass: "text",
      style: ('margin-left:' + _vm.marginlr + 'px;margin-right:' + _vm.marginlr + 'px;fontSize:' + _vm.fontSize + 'px;color:' + _vm.activeColor + ';padding-bottom:' + _vm.pb + 'px;border-bottom-color:' + _vm.activeColor)
    }, [_vm._v(_vm._s(item.name))])], 1) : _c('wx-view', {
      staticClass: "_item"
    }, [(_vm.tshow.showIcon == 1) ? _c('wx-image', {
      staticClass: "nav-icon",
      style: ('width:' + _vm.tshow.iconSize + 'px;height:' + _vm.tshow.iconSize + 'px;margin-bottom:' + _vm.tshow.spacing + 'px;'),
      attrs: {
        "src": 'http://image.vdongchina.com/' + item.thumbnail
      }
    }) : _vm._e(), _vm._v(" "), _c('wx-text', {
      staticClass: "text",
      style: ('margin-left:' + _vm.marginlr + 'px;margin-right:' + _vm.marginlr + 'px;fontSize:' + _vm.fontSize + 'px;color:' + _vm.color + ';padding-bottom:' + _vm.pb + 'px')
    }, [_vm._v(_vm._s(item.name))])], 1)], 1)
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.model == 1 && _vm.products.length > 0) ? _c('wx-view', {
    staticClass: "product-list clear"
  }, _vm._l((_vm.products), function(item, index) {
    return _c('wx-view', {
      key: item.gg,
      staticClass: "product-item"
    }, [_c('wx-view', {
      staticClass: "classname rowclass",
      nativeOn: {
        "click": function($event) {
          _vm.productItem(item.uuid)
        }
      }
    }, [_c('wx-view', {
      staticClass: "product-img"
    }, [_c('wx-image', {
      staticClass: "product-img-image",
      style: ('width:' + _vm.ewidth + 'px;height:' + _vm.eheight + 'px;'),
      attrs: {
        "mode": "aspectFill",
        "src": item.cover == '' ? item.thumbUrl : 'http://image.vdongchina.com/' + item.cover
      }
    })], 1)], 1), _vm._v(" "), _c('wx-view', {
      staticStyle: {
        "width": "100%"
      }
    }, [_c('wx-view', {
      staticClass: "product-name",
      style: ('fontSize:' + _vm.fontSizeName + 'px;fontWeight:' + _vm.fontWeightName + ';color:' + _vm.colorName + ';')
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('wx-view', {
      staticClass: "clear product-price"
    }, [_c('wx-view', {
      staticClass: "left main-color",
      style: ('fontSize:' + _vm.fontSizeMark + 'px;fontWeight:' + _vm.fontWeightMark + ';color:' + _vm.colorMark + ';')
    }, [_vm._v("￥"), _c('wx-text', {
      staticClass: "product-price-text",
      style: ('fontSize:' + _vm.fontSizePrice + 'px;fontWeight:' + _vm.fontWeightPrice + ';color:' + _vm.colorPrice + ';')
    }, [_vm._v(_vm._s(item.salePrice))])], 1), _vm._v(" "), (item.isShowMarkerPrice) ? _c('wx-view', {
      staticClass: "left oldPrice"
    }, [_vm._v("￥" + _vm._s(item.marketPrice))]) : _vm._e(), _vm._v(" "), _c('wx-view', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.shopcartShow.open),
        expression: "shopcartShow.open"
      }],
      staticClass: "right shopcart",
      on: {
        "click": function($event) {
          _vm.addCar(item.uuid)
        }
      }
    }, [_c('wx-image', {
      staticClass: "shopImg",
      attrs: {
        "src": _vm.shopcartShow.pic
      }
    })], 1)], 1)], 1)], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.model == 2 && _vm.products.length > 0) ? _c('wx-scroll-view', {
    staticClass: "uploadWrap",
    attrs: {
      "scroll-x": true
    }
  }, _vm._l((_vm.products), function(item, index) {
    return _c('wx-view', {
      key: item.gg,
      staticClass: "upload_Item",
      style: ('width:' + _vm.ewidth + 'px;height:' + _vm.eheight + 'px;'),
      nativeOn: {
        "click": function($event) {
          _vm.productItem(item.uuid)
        }
      }
    }, [_c('wx-view', {
      staticClass: "classname columnclass"
    }, [_c('wx-image', {
      staticClass: "upload_Item_img",
      attrs: {
        "src": item.cover == '' ? item.thumbUrl : 'http://image.vdongchina.com/' + item.cover,
        "mode": "aspectFill"
      }
    }), _vm._v(" "), _c('wx-view', {
      staticClass: "itemTxt"
    }, [_c('wx-view', {
      staticClass: "product-name upload_name",
      style: ('fontSize:' + _vm.fontSizeName + 'px;font-weight:' + _vm.fontWeightName + ';color:' + _vm.colorName + ';')
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('wx-view', {
      staticClass: "clear product-price"
    }, [_c('wx-view', {
      staticClass: "left main-color",
      style: ('fontSize:' + _vm.fontSizeMark + 'px;fontWeight:' + _vm.fontWeightMark + ';color:' + _vm.colorMark + ';')
    }, [_vm._v("￥"), _c('wx-text', {
      staticClass: "product-price-text",
      style: ('fontSize:' + _vm.fontSizePrice + 'px;fontWeight:' + _vm.fontWeightPrice + ';color:' + _vm.colorPrice + ';')
    }, [_vm._v(_vm._s(item.salePrice))])], 1), _vm._v(" "), (item.isShowMarkerPrice) ? _c('wx-view', {
      staticClass: "left oldPrice"
    }, [_vm._v("￥" + _vm._s(item.marketPrice))]) : _vm._e(), _vm._v(" "), _c('wx-view', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.shopcartShow.open),
        expression: "shopcartShow.open"
      }],
      staticClass: "right shopcart",
      on: {
        "click": function($event) {
          _vm.addCar(item.uuid)
        }
      }
    }, [_c('wx-image', {
      staticClass: "shopImg",
      attrs: {
        "src": _vm.shopcartShow.pic
      }
    })], 1)], 1)], 1)], 1)], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.model == 3 && _vm.products.length > 0) ? _c('wx-view', {
    staticClass: "product-list clear"
  }, _vm._l((_vm.products), function(item, index) {
    return _c('wx-view', {
      key: item.gg,
      staticClass: "large"
    }, [_c('wx-view', {
      nativeOn: {
        "click": function($event) {
          _vm.productItem(item.uuid)
        }
      }
    }, [_c('wx-view', {
      staticClass: "product-img"
    }, [_c('wx-image', {
      staticClass: "product-img-image",
      attrs: {
        "mode": "aspectFill",
        "src": item.cover == '' ? item.thumbUrl : 'http://image.vdongchina.com/' + item.cover
      }
    })], 1), _vm._v(" "), _c('wx-view', {
      staticClass: "product-name",
      style: ('fontSize:' + _vm.fontSizeName + 'px;fontWeight:' + _vm.fontWeightName + ';color:' + _vm.colorName + ';')
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('wx-view', {
      staticClass: "clear product-price"
    }, [_c('wx-view', {
      staticClass: "left main-color",
      style: ('fontSize:' + _vm.fontSizeMark + 'px;fontWeight:' + _vm.fontWeightMark + ';color:' + _vm.colorMark + ';')
    }, [_vm._v("￥"), _c('wx-text', {
      staticClass: "product-price-text",
      style: ('fontSize:' + _vm.fontSizePrice + 'px;fontWeight:' + _vm.fontWeightPrice + ';color:' + _vm.colorPrice + ';')
    }, [_vm._v(_vm._s(item.salePrice))])], 1), _vm._v(" "), (item.isShowMarkerPrice) ? _c('wx-view', {
      staticClass: "left oldPrice"
    }, [_vm._v("￥" + _vm._s(item.marketPrice))]) : _vm._e(), _vm._v(" "), _c('wx-view', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.shopcartShow.open),
        expression: "shopcartShow.open"
      }],
      staticClass: "right shopcart",
      on: {
        "click": function($event) {
          _vm.addCar(item.uuid)
        }
      }
    }, [_c('wx-image', {
      staticClass: "shopImg",
      attrs: {
        "src": _vm.shopcartShow.pic
      }
    })], 1)], 1)], 1)], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.model == 4 && _vm.products.length > 0) ? _c('wx-view', {
    staticClass: "product-list clear"
  }, _vm._l((_vm.products), function(item, index) {
    return _c('wx-view', {
      key: item.gg,
      staticClass: "small sitem"
    }, [_c('wx-view', {
      staticClass: "item-media"
    }, [_c('wx-image', {
      staticClass: "img",
      attrs: {
        "mode": "aspectFill",
        "src": item.cover == '' ? item.thumbUrl : 'http://image.vdongchina.com/' + item.cover
      }
    })], 1), _vm._v(" "), _c('wx-view', {
      staticClass: "item-main"
    }, [_c('wx-view', {
      staticClass: "item-desc",
      style: ('fontSize:' + _vm.fontSizeName + 'px;fontWeight:' + _vm.fontWeightName + ';color:' + _vm.colorName + ';width:100%;')
    }, [_vm._v("\n             " + _vm._s(item.name) + "\n         ")]), _vm._v(" "), _c('wx-view', {
      staticClass: "item-title-row"
    }, [_c('wx-view', {
      staticClass: "left main-color",
      style: ('fontSize:' + _vm.fontSizeMark + 'px;fontWeight:' + _vm.fontWeightMark + ';color:' + _vm.colorMark + ';')
    }, [_vm._v("￥"), _c('wx-text', {
      staticClass: "product-price-text",
      style: ('fontSize:' + _vm.fontSizePrice + 'px;fontWeight:' + _vm.fontWeightPrice + ';color:' + _vm.colorPrice + ';')
    }, [_vm._v(_vm._s(item.salePrice))])], 1), _vm._v(" "), (item.isShowMarkerPrice) ? _c('wx-view', {
      staticClass: "left oldPrice"
    }, [_vm._v("￥" + _vm._s(item.marketPrice))]) : _vm._e(), _vm._v(" "), _c('wx-view', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.shopcartShow.open),
        expression: "shopcartShow.open"
      }],
      staticClass: "right shopcart",
      on: {
        "click": function($event) {
          _vm.addCar(item.uuid)
        }
      }
    }, [_c('wx-image', {
      staticClass: "shopImg",
      attrs: {
        "src": _vm.shopcartShow.pic
      }
    })], 1)], 1)], 1)], 1)
  })) : _vm._e(), _vm._v(" "), (_vm.products.length == 0) ? _c('wx-view', {
    staticClass: "nonePro"
  }, [_vm._v("\n\t     暂无商品\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("0c6ee419", content, true);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".product-cant[data-v-c6f5385c]{height:50px;line-height:50px;position:relative;background:#fff}.product-line[data-v-c6f5385c]{position:absolute;width:120px;height:1.5px;background:#000;top:23px;left:50%;margin-left:-59.5px}.product-title[data-v-c6f5385c]{position:absolute;width:89.5px;left:50%;margin-left:-44.5px;top:0;text-align:center;background:#fff}.clear[data-v-c6f5385c]:after{display:block;height:0;clear:both;content:\"\";overflow:hidden;visibility:hidden}.left[data-v-c6f5385c]{float:left}.right[data-v-c6f5385c]{float:right}.product-list[data-v-c6f5385c]{background:#f9f9f9;padding-top:4px}.product-item[data-v-c6f5385c]{width:49%;height:auto;background:#fff;margin-bottom:5px;float:left;overflow:hidden;display:flex;display:-webkit-flex;align-items:center;justify-content:center;-webkit-align-items:center;-webkit-justify-content:center;flex-direction:column;-webkit-flex-direction:column}.product-item[data-v-c6f5385c]:nth-child(2n){margin-left:5px}.product-img .product-img-image[data-v-c6f5385c]{width:100%;height:100%}.product-img[data-v-c6f5385c]{text-align:center}.product-name[data-v-c6f5385c]{font-size:13.5px;line-height:25px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-left:5px;padding-right:5px}.product-price[data-v-c6f5385c]{font-size:11px;line-height:19.5px;margin-left:5px;color:#999}.product-price text[data-v-c6f5385c]{font-size:14.5px}.oldPrice[data-v-c6f5385c]{text-decoration:line-through;margin-left:5px;line-height:21.5px}.upload_title[data-v-c6f5385c]{height:39.5px;line-height:39.5px;padding-left:10px;font-size:12.5px;border-top:0.5px solid #e3e3e3}.uploadWrap[data-v-c6f5385c]{width:100%;white-space:nowrap}.upload_Item[data-v-c6f5385c]{width:149px;height:202.5px;margin-right:5px;margin-bottom:5px;border:0.5px solid rgba(0,0,0,.1);display:inline-flex;display:-webkit-inline-flex;-webkit-align-items:center;-webkit-justify-content:center;align-items:center;justify-content:center;overflow:hidden}.upload_Item_img[data-v-c6f5385c]{width:100%;height:100%;display:flex;display:-webkit-flex}.nonePro[data-v-c6f5385c]{height:200px;line-height:200px;text-align:center;position:relative}.navs[data-v-c6f5385c]{margin-bottom:10px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5}.nav[data-v-c6f5385c]{display:inline-block}.text[data-v-c6f5385c]{display:block;padding:0 10px;border-bottom:4px solid transparent;margin:0 9px;box-sizing:border-box}.item-box[data-v-c6f5385c]{white-space:nowrap}._item[data-v-c6f5385c]{text-align:center}.nav-icon[data-v-c6f5385c]{vertical-align:top;height:40px;width:40px;margin-bottom:0}.classname[data-v-c6f5385c]{align-self:center}.columnclass[data-v-c6f5385c]{width:100%;align-self:flex-start;height:100%;flex:1;flex-direction:column;-webkit-align-self:flex-start;-webkit-flex:1;-webkit-flex-direction:column;display:-webkit-flex}.shopcart[data-v-c6f5385c]{margin-right:5px}.product-list .large[data-v-c6f5385c]{padding:10px;margin-bottom:10px;background:#fff}.product-list .large .product-img[data-v-c6f5385c]{width:100%;height:170px;margin:0 auto}.product-list .large .product-name[data-v-c6f5385c]{font-size:15px;height:20px;line-height:20px;margin-top:10px}.product-price[data-v-c6f5385c]{height:25px;line-height:25px}.product-list .large .product-price[data-v-c6f5385c]{margin-top:9px}.product-list .large .main-color[data-v-c6f5385c]{font-size:14px}.product-list .large .product-price-text[data-v-c6f5385c]{font-size:18px}.product-list .oldPrice[data-v-c6f5385c]{font-size:13px}.product-price .shopImg[data-v-c6f5385c]{height:25px;width:25px;vertical-align:top}.product-price .oldPrice[data-v-c6f5385c]{line-height:25px}.item-main[data-v-c6f5385c],.sitem[data-v-c6f5385c]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.sitem[data-v-c6f5385c]{background-color:#fff;position:relative;padding:17px}.sitem[data-v-c6f5385c]:before{top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.sitem[data-v-c6f5385c]:after,.sitem[data-v-c6f5385c]:before{content:\" \";position:absolute;left:0;right:0;height:1px;color:#e5e5e5;z-index:2}.sitem[data-v-c6f5385c]:after{bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.sitem .img[data-v-c6f5385c]{width:90px;height:90px;background-color:#f2f5f6;border-radius:5px;overflow:hidden}.item-media+.item-main[data-v-c6f5385c]{margin-left:10px}.item-main[data-v-c6f5385c]{height:90px;flex-direction:column;-webkit-box-flex:1;-ms-flex:1;flex:1}.item-desc[data-v-c6f5385c]{position:relative;top:6px}.item-title-row[data-v-c6f5385c]{position:relative;bottom:6px;width:100%}.item-desc[data-v-c6f5385c]{font-size:15px;color:#111;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;letter-spacing:.62px;line-height:1.5;max-height:42px}.right .shopImg[data-v-c6f5385c]{width:25px;height:25px;vertical-align:top}.sitem .main-color[data-v-c6f5385c],.sitem .oldPrice[data-v-c6f5385c]{height:25px;line-height:25px}", ""]);

// exports


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(3)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(2),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-c6f5385c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
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

var listToStyles = __webpack_require__(8)

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
/* 8 */
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