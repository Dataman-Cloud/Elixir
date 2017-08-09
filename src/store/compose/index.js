import actions from './action'
import mutations from './mutations'

const state = {
  composes: {
    composes: [],
    total: 0
  },
  compose: {}
}

export default {
  state,
  actions,
  mutations
}
