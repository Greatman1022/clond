import api from '../../fetch/api'
import * as types from '../types'

const state = {
  agentpay: false,
  dealList: {},
  miniList: {
    list: [],
    total: null,
    pageSize: null,
    pageNum: 1
  },
  agetnSubAccount: {
    list: [],
    total: null,
    pageSize: null,
    pageNum: 1
  }
}

const actions = {
  setDealList ({ commit }, params) {
    api.dealDetailList(params).then(res => {
      // console.log('交易明细')
      // console.log(res.pagination)
      commit(types.GETDEALLIST, res.pagination)
    })
  },
  setMiniList ({ commit }, params) {
    api.MiniList(params).then(res => {
      // console.log('小程序action')
      commit(types.GETMINILIST, res.pagination)
    })
  },
  setAgentSubAccount ({ commit }, params) {
    api.agentSubaccount(params).then(res => {
      // console.log('代理商子账号列表')
      // console.log(res)
      commit(types.GETAGENTSUBACCOUNT, res.pagination)
    })
  }
}

const getters = {
  getAgentpay: state => state.agentpay,
  getDealList: state => state.dealList,
  getMiniList: state => state.miniList.list,
  getMiniTotal: state => state.miniList.total,
  getMiniPageSize: state => state.miniList.pageSize,
  getMiniPageNum: state => state.miniList.pageNum,
  getAgentSubAccount: state => state.agetnSubAccount
}

const mutations = {
  [types.GETAGENTPAY] (state, agentpay) {
    state.agentpay = agentpay
  },
  [types.GETDEALLIST] (state, dealList) {
    state.dealList = dealList
  },
  [types.GETMINILIST] (state, miniList) {
    state.miniList.list = miniList.items
    state.miniList.total = miniList.total
    state.miniList.pageSize = miniList.size
    state.miniList.pageNum = miniList.page
  },
  [types.GETAGENTSUBACCOUNT] (state, agetnSubAccount) {
    state.agetnSubAccount.list = agetnSubAccount.items
    state.agetnSubAccount.total = agetnSubAccount.total
    state.agetnSubAccount.pageSize = agetnSubAccount.size
    state.agetnSubAccount.pageNum = agetnSubAccount.page
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
