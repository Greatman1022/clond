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
  appDetail: {
    temp: {},
    wxApp: {},
    miniApp: {}
  },
  isChoosed: false,
  checkDisabled: false,

  miniMDisabled: false,
  miniPDisabled: false,
  miniADisabled: false,
  btnMDisabled: false,

  wxMDisabled: false,
  wxPDisabled: false,
  wxADisabled: false,
  btnWDisabled: false,

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
      console.log(res.pagination)
      commit(types.GETDEALLIST, res.pagination)
    })
  },
  setMiniList ({ commit }, params) {
    api.MiniList(params).then(res => {
      commit(types.GETMINILIST, res.pagination)
    })
  },
  setAgentSubAccountList ({ commit }, params) {
    api.subAccountQuery(params).then(res => {
      commit(types.GETAGENTSUBACCOUNT, res.pagination)
    })
  },
  setAppDetail ({ commit }, params) {
    api.getConfig(params).then(res => {
      commit(types.GETAPPDETAIL, res.customerApp)

      // 判断选择框是否禁用
      if (!res.customerApp.wxApp || !res.customerApp.miniApp) {
        state.checkDisabled = true
      } else {
        state.checkDisabled = false
      }

      // 微信配置返回值&&判断是否禁用
      if (res.customerApp.wxApp) {
        console.log('有微信')
        if(!res.customerApp.wxApp.appid) {
          state.btnWDisabled = true
          state.wxMDisabled = true
          state.wxPDisabled = true
          state.wxADisabled = true
        } else {
          state.btnWDisabled = false
          state.wxMDisabled = false
          state.wxPDisabled = false
          state.wxADisabled = false
        }
        commit(types.GETWXAPP, res.customerApp.wxApp)
      } else {
        state.btnWDisabled = true
        state.wxMDisabled = true
        state.wxPDisabled = true
        state.wxADisabled = true
        console.log('无微信')
        commit(types.GETWXAPP, {})
      }

      // 小程序配置返回值&&判断是否禁用
      if (res.customerApp.miniApp) {
        if (!res.customerApp.miniApp.appid) {
          state.btnMDisabled = true
          state.miniMDisabled = true
          state.miniPDisabled = true
          state.miniADisabled = true
        } else {
          state.btnMDisabled = false
          state.miniMDisabled = false
          state.miniPDisabled = false
          state.miniADisabled = false
        }
        commit(types.GETMINIAPP, res.customerApp.miniApp)
      } else {
        state.btnMDisabled = true
        state.miniMDisabled = true
        state.miniPDisabled = true
        state.miniADisabled = true
        commit(types.GETMINIAPP, {})
      }

      // 小程序配置 支付账户号
      if (state.isChoosed || !res.customerApp.miniApp.appid) {
        state.miniMDisabled = true
        
      }
      if (state.isChoosed && res.customerApp.miniApp.appid) {
        console.log('选中2')
        commit(types.UPDATEMCHID, res.customerApp.wxApp.mchId)
      }
      if (!state.isChoosed && res.customerApp.miniApp.appid) {
        state.miniMDisabled = false
        commit(types.UPDATEMCHID, res.customerApp.miniApp.mchId)
      }

      // 小程序配置 支付API秘钥
      if (state.isChoosed || !res.customerApp.miniApp.appid) {
        state.miniPDisabled = true
      }
      if (state.isChoosed && res.customerApp.miniApp.appid) {
        commit(types.UPDATEPAYKEY, res.customerApp.wxApp.payKey)
      }
      if (!state.isChoosed && res.customerApp.miniApp.appid) {
        state.miniPDisabled = false
        commit(types.UPDATEPAYKEY, res.customerApp.miniApp.payKey)
      }

      // 小程序配置 支付证书
      if (state.isChoosed || !res.customerApp.miniApp.appid) {
        state.miniADisabled = true
      }
      if (state.isChoosed && res.customerApp.miniApp.appid) {
        state.btnMDisabled = true
        commit(types.UPDATECLIENT, res.customerApp.wxApp.apiclientCertFileName)
      }
      if (!state.isChoosed && res.customerApp.miniApp.appid) {
        state.miniADisabled = false
        state.btnMDisabled = false
        commit(types.UPDATECLIENT, res.customerApp.miniApp.apiclientCertFileName)
      }

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
  getAppDetail: state => state.appDetail,
  getWxApp: state => state.appDetail.wxApp,
  getMiniApp: state => state.appDetail.miniApp,
  getIsChoosed: state => {
    console.log(state.isChoosed)
    return state.isChoosed
  }, 
  getCheckDisabled: state => state.checkDisabled,
  getMiniMchId: state => {
    state.appDetail.miniApp = state.appDetail.miniApp || {}
    if (state.isChoosed || !state.appDetail.miniApp.appid) {
      state.miniMDisabled = true
    }
    if (state.isChoosed && state.appDetail.miniApp.appid) {
      return state.appDetail.wxApp.mchId
    }
    if (!state.isChoosed && state.appDetail.miniApp.appid) {
      state.miniMDisabled = false
      return state.appDetail.miniApp.mchId
    }
  },
  getMiniPayKey: state => {
    state.appDetail.miniApp = state.appDetail.miniApp || {}
    if (state.isChoosed || !state.appDetail.miniApp.appid) {
      state.miniPDisabled = true
    }
    if (state.isChoosed && state.appDetail.miniApp.appid) {
      return state.appDetail.wxApp.payKey
    }
    if (!state.isChoosed && state.appDetail.miniApp.appid) {
      state.miniPDisabled = false
      return state.appDetail.miniApp.payKey
    }
  },
  getMiniClient: state => {
    state.appDetail.miniApp = state.appDetail.miniApp || {}
    if (state.isChoosed || !state.appDetail.miniApp.appid) {
      state.miniADisabled = true
    }
    if (state.isChoosed && state.appDetail.miniApp.appid) {
      state.btnMDisabled = true
      return state.appDetail.wxApp.apiclientCertFileName
    }
    if (!state.isChoosed && state.appDetail.miniApp.appid) {
      state.miniADisabled = false
      state.btnMDisabled = false
      return state.appDetail.miniApp.apiclientCertFileName
    }
  },
  getMiniMDisabled: state => state.miniMDisabled,
  getMiniPDisabled: state => state.miniPDisabled,
  getMiniADisabled: state => state.miniADisabled,
  getBtnMDisabled:state => state.btnMDisabled,

  getWxMDisabled: state => state.wxMDisabled,
  getWxPDisabled: state => state.wxPDisabled,
  getWxADisabled: state => state.wxADisabled,
  getBtnWDisabled: state => state.btnWDisabled,

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
  [types.GETAPPDETAIL] (state, res) {
    state.appDetail = res
  },
  [types.GETAGENTSUBACCOUNT] (state, agetnSubAccount) {
    state.agetnSubAccount.list = agetnSubAccount.items
    state.agetnSubAccount.total = agetnSubAccount.total
    state.agetnSubAccount.pageSize = agetnSubAccount.size
    state.agetnSubAccount.pageNum = agetnSubAccount.page
  },
  [types.UPDATEMCHID] (state, mchId) {
    state.appDetail.miniApp.mchId = mchId
  },
  [types.UPDATEPAYKEY] (state, payKey) {
    state.appDetail.miniApp.payKey = payKey
  },
  [types.UPDATECLIENT] (state, miniClient) {
    state.appDetail.miniApp.apiclientCertFileName = miniClient
  },
  [types.GETWXAPP] (state, wxapp) {
    state.appDetail.wxApp = wxapp
  },
  [types.GETMINIAPP] (state, miniapp) {
    state.appDetail.miniApp = miniapp
  },
  [types.GETISCHOOSED] (state, isChoosed) {
    state.isChoosed = isChoosed
    console.log(state.isChoosed)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
