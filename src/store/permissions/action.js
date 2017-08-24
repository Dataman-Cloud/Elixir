import * as type from './mutations_types'
import { asyncRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
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
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, currentPerms) {
  const accessedRouters = asyncRouterMap.filter(route => {
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
      if (currentPerms.indexOf('admin') >= 0) {
        accessedRouters = asyncRouterMap
      } else {
        accessedRouters = filterAsyncRouter(asyncRouterMap, currentPerms)
      }
      commit(type.SET_ROUTERS, accessedRouters)
      resolve()
    })
  }
}
