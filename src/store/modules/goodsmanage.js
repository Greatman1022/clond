import api from '../../fetch/api'
import * as types from '../types'

const state = {
  catalogs: [],
  product: [],
  contentUsertype: 'goods',
  goodsId: null

  // /* 订单管理 */
  // isOrderDetail: false,

  // /* 用户管理 */
  // userlist: [],
  // total: '',
  // pageSize: '',
  // userGroup: []
}

const actions = {
  setCatalogs: ({commit}, params) => {
    api.getCatalogs(params).then(res => {
      commit(types.CATALOGS, res.data)
    })
  },
  setProductByCatalogId: ({commit}, params) => {
    api.productByCatalogId(params).then(res => {
      console.log(params, res)
      commit(types.PRODUCTBYCATALOGID, res.data)
    })
  },
  setContextUserType: ({commit}, data) => {
    commit(types.CONTEXTUSERTYPE, data)
  },
  setGoodsId: ({commit}, id) => {
    commit(types.GOODSID, id)
  }

  /* 订单管理 */

  /* 用户管理 */
  // setUserList ({ commit }, params) {
  //   api.UserList(params).then(res => {
  //     console.log(params)
  //     commit(types.GETUSERLIST, res.data)
  //     commit(types.GETTOTAL, res.data.total)
  //     commit(types.GETPAGESIZE, res.data.pageSize)
  //   })
  // },
  // setUserGroup ({ commit }) {
  //   api.UserGroup().then(res => {
  //     commit(types.GETUSERGROUP, res.data)
  //   })
  // }
}

const getters = {
  getCatalogsList: state => {
    return state.catalogs
  },
  getProductList: state => {
    return state.product
  },
  getContentUsertype: state => {
    return state.contentUsertype
  },
  getGoodsId: state => {
    return state.goodsId
  }

  /* 订单管理 */
  // getIsOrderDetail: state => state.isOrderDetail,

  /* 用户管理 */
  // getUserList: state => state.userlist,
  // getTotal: state => state.total,
  // getPageSize: state => state.pageSize,
  // getUserGroup: state => state.userGroup
}

const mutations = {
  [types.CATALOGS] (state, data) {
    state.catalogs = data
  },
  [types.PRODUCTBYCATALOGID] (state, data) {
    state.product = data
  },
  [types.CONTEXTUSERTYPE] (state, data) {
    state.contentUsertype = data
  },
  [types.GOODSID] (state, data) {
    state.goodsId = data
  }

  /* 订单管理 */
  // [types.ISORDERDETAIL] (state, msg) {
  //   state.isOrderDetail = msg
  // },

  /* 用户管理 */
  // [types.GETUSERLIST] (state, res) {
  //   state.userlist = res
  // },
  // [types.GETTOTAL] (state, res) {
  //   state.total = res
  // },
  // [types.GETPAGESIZE] (state, res) {
  //   state.pageSize = res
  // },
  // [types.GETUSERGROUP] (state, res) {
  //   state.userGroup = res
  // }
}

export default {
  state,
  actions,
  getters,
  mutations
}
