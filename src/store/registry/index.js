import actions from './action'
import mutations from './mutations'

const state = {
  registries: {
    registries: [],
    total: 0
  },
  registry: {},
  audits: {
    audits: [],
    count: 0
  }
}

export default {
  state,
  actions,
  mutations
}
