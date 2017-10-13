import * as types from './types'

export default {
  /* Editor */
  activeComIndex: ({ commit }, index) => {
    commit(types.ACTIVECOMINDEX, index)
  },
  activeCom: ({ commit }, activeCom) => {
    commit(types.ACTIVECOM, activeCom)
  },
  configCom: ({ commit }, { name, value }) => {
    commit(types.CONFIGCOM, { name, value })
  }
}
