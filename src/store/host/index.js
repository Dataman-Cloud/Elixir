import actions from './action'
import mutations from './mutations'

const state = {
  clusterHosts: {
    clusterHosts: [],
    total: 0
  },
  hosts: {
    hosts: [],
    total: 0
  },
  host: {}
}

export default {
  state,
  actions,
  mutations
}
