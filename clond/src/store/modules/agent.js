import * as types from '../types'
import axios from 'axios'

// initial state

const state = {
  appidStore: '',
  orderidStore: ''
}
// getters
const getters = {
  appidStore: (state) => {
    return state.appidStore;
  },
  orderidStore: (state) => {
    return state.orderidStore;
  }
}

// actions
const actions = {
  storeAppid: ({ commit }, appid) => {
		commit(types.STOREAPPID, appid);
	},
  storeOrderid: ({commit}, order_id) => {
    commit(types.STOREORRDERID, order_id)
  }
}

// mutations
const mutations = {
  [types.STOREAPPID](state, { appid }) {
    state.appidStore = appid
  },
  [types.STOREORRDERID](state, { order_id }) {
    state.orderidStore = order_id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
