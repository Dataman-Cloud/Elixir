import actions from './action'
import mutations from './mutations'

const state = {
  registries: {
    registries: [],
    total: 0
  },
  registry: {},
  logs: {
    logs: [],
    count: 0
  },
  tags: {
    tags: [],
    count: 0
  }
}

export default {
  state,
  actions,
  mutations
}
