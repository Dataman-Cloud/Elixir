import * as type from './mutations_types'
import { constantRouterMap } from '@/router'

export default {
  [type.SET_ROUTERS] (state, routers) {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}
