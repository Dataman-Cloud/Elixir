import * as type from './mutations_types'
import * as user from '../../api/user'

export default {
  async [type.LOGIN] (context, playload = {}) {
    let { data: { token } } = await user.login(playload)
    context.commit(type.SET_TOKEN, token)
  },
  async [type.LOGOUT] (context, playload = {}) {
    await user.logout()
    context.commit(type.CLEAR_TOKEN)
    context.commit(type.SET_ROLES, [])
  },
  [type.FRONTEND_LOGOUT] (context) {
    context.commit(type.CLEAR_TOKEN)
    context.commit(type.SET_ROLES, [])
  },
  async [type.FETCH_USER_INFO] (context) {
    let data = await user.getUserInfo()
    context.commit(type.SET_USER_INFO, data.data)
    return data.data
  },
  async [type.FETCH_USERS] (context) {
    let { data } = await user.userAll()
    context.commit(type.FETCH_USERS, data)
    return data
  },
  [type.SET_COLLAPSE] (context, isCollapse = false) {
    context.commit(type.SET_COLLAPSE, isCollapse)
    localStorage.setItem('isCollapse', isCollapse)
  },
  async [type.SWITCH_USER_GROUP] ({ dispatch, context }, id) {
    await user.switchGroup(id)
    // 切换成功后 reload 页面, 重新调用全局 beforeEach 校验 权限
    location.reload()
  }
}
