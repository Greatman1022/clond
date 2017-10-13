// import api from '../../fetch/api'
import * as types from '../types'

const state = {
  forgetpassvisible: false
}

const actions = {
}

const getters = {
  getForgetPassVisible: state => state.forgetpassvisible
}

const mutations = {
  [types.FORGETPASSVISIBLE] (state, status) {
    state.forgetpassvisible = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
