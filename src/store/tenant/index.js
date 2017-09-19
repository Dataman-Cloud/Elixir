import actions from './action'
import mutations from './mutations'

const state = {
  tenants: {
    tenants: [],
    total: 0
  },
  tenant: {

  },
  hosts: {
    hosts: [],
    total: 0
  },
  subnets: {
    subnets: [],
    total: 0
  }
}

export default {
  state,
  actions,
  mutations
}
