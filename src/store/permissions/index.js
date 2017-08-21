import actions from './action'
import mutations from './mutations'
import { constantRouterMap } from '@/router'

const state = {
  routers: constantRouterMap,
  addRouters: []
}

export default {
  state,
  actions,
  mutations
}
