// import api from '../../fetch/api'
import * as types from '../types'

const state = {
  isNav: true,
  isReg: 1,
  shownav: true,
  typeNum: 0
}

const actions = {
  // setSignOut ({ commit }) {
  //   commit(types.CHANGENAV, false)
  //   commit(types.CHANGEREG, 0)
  // },
  // getUserData ({ commit }) {
  //   commit(types.CHANGENAV, true)
  //   commit(types.CHANGEREG, 1)
  // }
}

const getters = {
  /* 测试 getNav (state) {
    console.log('nav出现')
    return state.isNav
  },
  getReg (state) {
    console.log('reg出现')
    return state.isReg
  } */
  getNav: state => state.isNav,
  getReg: state => state.isReg,
  getShowNav: state => state.shownav,
  getTypeNum: state => state.typeNum
}

const mutations = {
  [types.CHANGENAV] (state, msg) {
    state.isNav = msg
  },
  [types.CHANGEREG] (state, msg) {
    state.isReg = msg
  },
  [types.SHOWNAV] (state, msg) {
    state.shownav = msg
  },
  [types.TYPENUM] (state, data) {
    state.typeNum = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
