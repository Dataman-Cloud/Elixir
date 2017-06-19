import actions from './action'
import mutations from './mutations'

const state = {
  registries: {
    registries: [],
    total: 0
  },
  registry: {}
}

export default {
  state,
  actions,
  mutations
}
