import * as types from '../types'
import router from "../../router/index.js";
import api from '../../fetch/api'

const state = {
  isEditorPage: 0,
  routeActive: 0,
  /* 登录信息 */
  // userInfo: {},
  loginDialog: false,
  userInfo: '',
  templateFlag: 0,
  templateId: 0,
  agentId: 0
}

const actions = {
  setPageType: ({ commit }, value) => {
    commit(types.ISEDITOR, value)
  },
  setIsActive: ({ commit }, value) => {
    commit(types.ISACTIVE, value)
  },
  /* 登录信息 */
  setUserInfo: ({ commit }, params) => {
    let _userinfo = {
      data: params.user,
      remember: params.remember,
      time: new Date().getTime()
    }
    commit(types.USERINFO, _userinfo)
    localStorage.setItem('userInfo', JSON.stringify(_userinfo))
  },
  setTemplateFlag: ({ commit }, params) => {
    commit(types.TEMPLATEFLAG, params)
  },
  setTemplateId: ({ commit }, params) => {
    commit(types.TEMPLATEID, params)
    localStorage.setItem('templateId', JSON.stringify(params))
  },
  setAgentId: ({ commit }, params) => {
    commit(types.AGENTID, params)
    localStorage.setItem('agentId', JSON.stringify(params))
  }
}

const getters = {
  getPageType: state => state.isEditorPage,
  getIsActive: state => state.isActive,
  getUserInfo: state => {
    if (state.userInfo) {
      return state.userInfo
    } else {
      return JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  getUserMess: state => {
    if (state.userInfo) {
      return state.userInfo.data
    } else {
      let _udata = JSON.parse(localStorage.getItem('userInfo'))
      return _udata.data
    }
  },
  getTemplateId: state => {
    if (state.templateId) {
      return state.templateId
    } else {
      return JSON.parse(localStorage.getItem('templateId'))
    }
  },
  getAgentId: state => {
    if (state.agentId) {
      return state.agentId
    } else {
      return JSON.parse(localStorage.getItem('agentId'))
    }
  }
}

const mutations = {
  [types.ISEDITOR] (state, msg) {
    state.isEditorPage = msg
  },
  [types.ROUTEACTIVE] (state, msg) {
    state.isActive = msg
  },
  [types.USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.LOGINDIALOG] (state, data) {
    state.loginDialog = data
  },
  [types.TEMPLATEFLAG] (state, data) {
    state.templateFlag = data
  },
  [types.TEMPLATEID] (state, data) {
    state.templateId = data
  },
  [types.AGENTID] (state, data) {
    state.agentId = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
