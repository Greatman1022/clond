import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueClipboards from 'vue-clipboards'
import util from '../static/js/util.js'
import Resource from 'vue-resource'
import axios from 'axios'
import {wxcoms} from './weichen-weapp-coms/index'
import {wxapi} from './weichen-weapp-jsapi/index'
import {wccoms} from '@/assets/js/index'
import VueHtml5Editor from '@/vue-html5-editor/dist2/vue-html5-editor'
import options from '@/assets/js/editorOptions'
import vdPrefix from '../static/js/common_prefix.js'
Vue.use(VueHtml5Editor,options.options)
Vue.prototype.$http = axios
Vue.prototype.$vdPrefix = vdPrefix
// window.prototype.$http  =axios.
// Vue.prototype.$wccoms = wccoms
Vue.use(wxcoms.default)
Vue.use(wxapi.default)
Vue.use(Resource)
Vue.use(Vuex)
Vue.use(VueClipboards)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(wccoms.default)
Vue.config.productionTip = false
Vue.mixin({
  created () {
    this.onLaunch && (() => {
      this.onLaunch()
    })()
    this.onLoad && this.onLoad()
  },
  mounted () {
    this.onReady && this.onReady()
    this.onShow && this.onShow()
  },
  destroyed () {
    this.onHide && this.onHide()
    this.onUnload && this.onUnload()
  }
})


new Vue({
  el: '#app',
  router,
  store,
  util,
  template: '<App/>',
  components: {App}
})
