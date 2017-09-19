import actions from './action'
import mutations from './mutations'

const state = {
  ipPools: {
    ipPools: [],
    total: 0
  },
  ipPool: {}
}

export default {
  state,
  actions,
  mutations
}
