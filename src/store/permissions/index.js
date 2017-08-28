import actions from './action'
import mutations from './mutations'
import getters from './getters'
import { constantRouterMap } from '@/router'

const state = {
  routers: constantRouterMap,
  addRouters: []
}

export default {
  state,
  actions,
  getters,
  mutations
}
