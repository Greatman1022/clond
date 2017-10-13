import api from '../../fetch/api'
import * as types from '../types'

const state = {
  categorys: {
    scene: '',
    industry: ''
  }, // 类别
  carousels: [] // 轮播
}

const actions = {
  setCarousels ({ commit }) {
    api.Carousels().then(res => {
      // console.log(res.list)
      commit(types.GETCAROUSELS, res.list)
    })
  },
  setCategorys ({ commit }) {
    api.TypeScene().then(res => {
      commit(types.GETSCENE, res.scene[0])
    })
    api.TypeIndustry().then(res => {
      commit(types.GETINDUSTRY, res.industry[0])
    })
  }
}

const getters = {
  getCarousels: state => state.carousels,
  getScene: state => state.categorys.scene,
  getIndustry: state => state.categorys.industry
}

const mutations = {
  [types.GETCAROUSELS] (state, res) {
    // console.log(res)
    state.carousels = res
  },
  [types.GETSCENE] (state, res) {
    state.categorys.scene = res
  },
  [types.GETINDUSTRY] (state, res) {
    state.categorys.industry = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
