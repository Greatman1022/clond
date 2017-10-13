import api from '../../fetch/api'
import * as types from '../types'

const state = {
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

  saveSuccessVisible: false,
  websocket: null,
  obj: '',
  loadFailVisible: false,
  bindAppletVisible: false,
  secondSaveVisible: false,
  // tempwindow: '',
  // tab: 0
  serverStatus: {
    currVersion: null,
    isUpdate: false,
    status: null,
    updateVersion: null
  }
}

const actions = {
  setWxBind({
    dispatch,
    commit
  }) {
    // 判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
      // 新建WebSocket
      state.websocket = new WebSocket('ws://cloud.vdongchina.com/websocket')
      // 连接发生错误的回调方法
      state.websocket.onerror = function () {
        console.log('错误')
      }
      // 连接成功建立的回调方法
      state.websocket.onopen = function (event) {}
      // 接收到消息的回调方法，返回消息皆为json格式字符串
      state.websocket.onmessage = function (event) {
        state.obj = new Function('return ' + '(' + event.data + ')')()
        if (state.obj.sessionId !== undefined) {
          // state.tempwindow = window.open()
          // 获取到链接后传来的sessionId，开始跳转至授权页面
          window.open('http://cloud.vdongchina.com/guard/location/' + state.obj.sessionId + '/' + state.appDetail.appid, '_blank')
        } else if (state.obj.success) {
          // 授权成功，关闭WebSocket连接
          state.websocket.close()
          console.log(state.obj)
          if (state.obj.authorizeType === 2) {
            state.loadFailVisible = true
            console.log('必须授权公众号绑定！')
          }
          // 开始后续处理
          // this.$router.push({name: 'backstagemanage', params: { appid: state.appDetail.appid, tab: this.tab }})
          dispatch('setAppDetail', {
            appid: state.appDetail.appid
          })
        }
      }
    } else {
      alert('Not support websocket')
    }
  },
  saveBindApplet({
    dispatch,
    commit
  }, params) {
    console.log(params.miniAppid, state.appDetail.miniAppid, state.appDetail.updateTime)
    if (params.miniAppid != state.appDetail.miniAppid && state.appDetail.miniAppid && state.appDetail.modifyMiniAppid === true) {
      state.bindAppletVisible = true
      return false
    }
    if (params.miniAppid != state.appDetail.miniAppid && state.appDetail.modifyMiniAppid === false) {
      state.secondSaveVisible = true
      dispatch('setAppDetail', {
        appid: state.appDetail.appid
      })
      return false
    }
    dispatch('setBindApplet', params)
  },
  setBindApplet({
    dispatch,
    commit
  }, params) {
    api.BindApplet(params).then(res => {
      console.log(res)
      state.bindAppletVisible = false
      state.saveSuccessVisible = true
      dispatch('setAppDetail', {
        appid: state.appDetail.appid
      })
    })
  },
  setMiniConfigModify({
    commit
  }, params) {
    api.modifyConfig(params).then(res => {
      state.saveSuccessVisible = true
    })
  },
  setWxConfigModify({
    commit
  }, params) {
    api.modifyConfig(params).then(res => {
      state.saveSuccessVisible = true
    })
  },
  setAppSituation({
    commit
  }, params) {
    api.appSituation(params).then(res => {
      // console.log(res)
      commit(types.GETSERVERSTATUS, res)
    })
  },
  setAppDetail({
    dispatch,
    commit
  }, params) {
    api.getConfig(params).then(res => {
      commit(types.GETAPPDETAIL, res.customerApp)
      dispatch('setAppSituation', Object.assign({
        pid: state.appDetail.temp.identify
      }, params))
      // 判断选择框是否禁用
      if (!res.customerApp.wxApp || !res.customerApp.miniApp) {
        state.checkDisabled = true
      } else {
        state.checkDisabled = false
      }

      // 微信配置返回值&&判断是否禁用
      if (res.customerApp.wxApp) {
        //console.log('有微信')
        if (!res.customerApp.wxApp.appid) {
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
        //console.log('无微信')
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
  getServerStatus: state => state.serverStatus,
  getSecondSaveVisible: state => state.secondSaveVisible,
  getBindAppletVisible: state => state.bindAppletVisible,
  getLoadFailVisible: state => state.loadFailVisible,
  getSaveSuccessVisible: state => state.saveSuccessVisible,
  getAppDetail: state => state.appDetail,
  getWxApp: state => state.appDetail.wxApp,
  getMiniApp: state => state.appDetail.miniApp,
  getIsChoosed: state => {
    // console.log(state.isChoosed)
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
  getBtnMDisabled: state => state.btnMDisabled,

  getWxMDisabled: state => state.wxMDisabled,
  getWxPDisabled: state => state.wxPDisabled,
  getWxADisabled: state => state.wxADisabled,
  getBtnWDisabled: state => state.btnWDisabled
}

const mutations = {
  [types.GETSERVERSTATUS](state, obj) {
    state.serverStatus = {
      currVersion: obj.currVersion.split(':')[1],
      isUpdate: obj.isUpdate,
      status: obj.status,
      updateVersion: obj.updateVersion.split(':')[1]
    }
  },
  [types.GETSECONDSAVEVISIBLE](state, status) {
    state.secondSaveVisible = status
  },
  [types.GETBINDAPPLETVISIBLE](state, status) {
    state.bindAppletVisible = status
  },
  [types.GETLOADFAILVISIBLE](state, status) {
    state.loadFailVisible = status
  },
  [types.GETSAVESUCCESSVISIBLE](state, status) {
    state.saveSuccessVisible = status
  },
  [types.GETAPPDETAIL](state, res) {
    state.appDetail = res
  },
  [types.UPDATEMCHID](state, mchId) {
    state.appDetail.miniApp.mchId = mchId
  },
  [types.UPDATEPAYKEY](state, payKey) {
    state.appDetail.miniApp.payKey = payKey
  },
  [types.UPDATECLIENT](state, miniClient) {
    state.appDetail.miniApp.apiclientCertFileName = miniClient
  },
  [types.GETWXAPP](state, wxapp) {
    state.appDetail.wxApp = wxapp
  },
  [types.GETMINIAPP](state, miniapp) {
    state.appDetail.miniApp = miniapp
  },
  [types.GETISCHOOSED](state, isChoosed) {
    state.isChoosed = isChoosed
    // console.log(state.isChoosed)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
