import actions from './action'
import mutations from './mutations'
import getters from './getters'

const state = {
  apps: {
    apps: [],
    total: 0
  },
  app: {}
}

export default {
  state,
  actions,
  getters,
  mutations
}
