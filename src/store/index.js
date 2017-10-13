import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import header from './modules/header'
import newmake from './modules/newmake'
import goodsmanage from './modules/goodsmanage'
import ordermanage from './modules/ordermanage'
import usermanage from './modules/usermanage'
import user from './modules/user'
import miniprograms from './modules/miniprograms'
import baseconf from './modules/baseconf'
import agent from './modules/agent'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    common,
    header,
    newmake,
    goodsmanage,
    ordermanage,
    usermanage,
    user,
    miniprograms,
    baseconf,
    agent
  }
  // strict: process.env.NODE_ENV !== 'production' // 是否开启严格模式
})
