import api from '../../fetch/api'
import * as types from '../types'

const state = {
  userlist: {
    list: [],
    total: null,
    pageSize: null,
    pageNum: 1
  },
  userGroup: []
}

const actions = {
  setUserList ({ commit }, params) {
    api.UserList(params).then(res => {
      commit(types.GETUSERLIST, res.data)
    })
  },
  setDelUser ({ commit }, params, pageNum) {
    api.DelUser(params).then(res => {
      commit(types.GETDELUSER, params.ids)
      api.UserList(pageNum).then(res => {
        commit(types.GETUSERLIST, res.data)
      })
    })
  },
  setUserGroup ({ commit }) {
    api.UserGroup().then(res => {
      commit(types.GETUSERGROUP, res.data)
    })
  },
  setDelUserGroup ({ commit }, params) {
    api.DelUserGroup(params).then(res => {
      commit(types.GETDELUSERGROUP, params.id)
    })
  },
  setModifyUserGroup ({ commit }, params) {
    api.ModifyUserGroup(params).then(res => {
      commit(types.GETMODIFYUSERGROUP, params)
    })
  },
  setAddUserGroup ({ commit }, params) {
    api.AddUserGroup(params).then(res => {
      console.log(params)
      console.log(res)
      commit(types.GETADDUSERGRUOP, params)
      api.UserGroup().then(res => {
        commit(types.GETUSERGROUP, res.data)
      })
    })
  },
  setMoveBatchUserGroup ({ commit }, params) {
    api.MoveBatchUserGroup(params).then(res => {
      commit(types.GETMOVEBATCHUSERGROUP, params)
      api.UserList(params).then(res => {
        commit(types.GETUSERLIST, res.data)
      })
    })
  }
}

const getters = {
  getUserList: state => state.userlist.list,
  getTotal: state => state.userlist.total,
  getPageSize: state => state.userlist.pageSize,
  getPageNum: state => state.userlist.pageNum,
  getUserGroup: state => state.userGroup
}

const mutations = {
  [types.GETUSERLIST] (state, userlist) {
    state.userlist.list = userlist.list
    state.userlist.total = userlist.total
    state.userlist.pageSize = userlist.pageSize
    state.userlist.pageNum = userlist.pageNum
    state.userlist.list.forEach(function () {
    })
  },
  [types.GETDELUSER] (state, params) {
    state.userlist.list = state.userlist.list.filter((item) => {
      return params.indexOf(item.id) < 0
    })
  },
  [types.GETUSERGROUP] (state, res) {
    state.userGroup = res
  },
  [types.GETDELUSERGROUP] (state, params) {
    state.userGroup = state.userGroup.filter((item) => { return item.id !== params })
  },
  [types.GETMODIFYUSERGROUP] (state, params) {
    for (var i = 0; i < state.userGroup.length; i++) {
      if (state.userGroup[i].id === params.id) {
        state.userGroup[i].name = params.name
        break
      }
    }
    return state.userGroup
  },
  [types.GETADDUSERGRUOP] (state, params) {
    state.userGroup.push(params)
  },
  [types.GETMOVEBATCHUSERGROUP] (state, params) {
    /* state.userlist.list.forEach(function (i) {
      params.userIds.forEach(function (j) {
        if (state.userlist.list[i].id === params.userIds[j]) {
          state.userlist.list[i].groupId = params.userGroupId
        }
      })
    }) */
    for (var i = 0; i < state.userlist.list.length; i++) {
      for (var j = 0; j < params.userIds.length; j++) {
        if (state.userlist.list[i].id === params.userIds[j]) {
          state.userlist.list[i].groupId = params.userGroupId
        }
      }
    }
    console.log(params.userGroupId + '方法')
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
