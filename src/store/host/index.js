import actions from './action'
import mutations from './mutations'

const state = {
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
