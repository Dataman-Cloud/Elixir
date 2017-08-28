import * as type from './mutations_types'
import { asyncRouterMap } from '@/router'
import _ from 'lodash'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param currentPerms
 * @param route
 */
function hasPermission (currentPerms, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.every(role => currentPerms.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routers
 * @param currentPerms
 */
function filterAsyncRouter (routers, currentPerms) {
  const accessedRouters = routers.filter(route => {
    if (hasPermission(currentPerms, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, currentPerms)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export default {
  [type.SET_ROUTERS] ({ commit }, currentPerms) {
    return new Promise(resolve => {
      let accessedRouters
      // 深度复制 asyncRouterMap, 避免直接修改 asyncRouterMap
      let tempAsyncRouterMap = _.merge([], asyncRouterMap)
      if (currentPerms.indexOf('admin') >= 0) {
        accessedRouters = tempAsyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(tempAsyncRouterMap, currentPerms)
      }
      commit(type.SET_ROUTERS, accessedRouters)
      resolve(accessedRouters)
    })
  }
}
