import actions from './action'
import mutations from './mutations'

const state = {
  clusters: {
    clusters: [],
    total: 0
  },
  cluster: {}
}

export default {
  state,
  actions,
  mutations
}
