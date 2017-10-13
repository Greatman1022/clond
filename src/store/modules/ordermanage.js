// import api from '../../fetch/api'
import * as types from '../types'

const state = {
  isOrderDetail: false,
  orderId: null
}

const actions = {
  setIsOrderDetail: ({commit}, data) => {
    commit(types.ISORDERDETAIL, data)
  },
  setOrderId: ({commit}, id) => {
    commit(types.ORDERID, id)
  }
}

const getters = {
  getIsOrderDetail: state => {
    return state.isOrderDetail
  },
  getOrderId: state => {
    return state.orderId
  }
}

const mutations = {
  [types.ISORDERDETAIL] (state, data) {
    state.isOrderDetail = data
  },
  [types.ORDERID] (state, data) {
    state.orderId = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
