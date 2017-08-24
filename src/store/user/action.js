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
  async [type.FETCH_USER_INFO] (context) {
    let data = await user.getUserInfo()
    context.commit(type.SET_USER_INFO, data.data)
    return data.data
  },
  [type.SET_COLLAPSE] (context, isCollapse = false) {
    context.commit(type.SET_COLLAPSE, isCollapse)
    localStorage.setItem('isCollapse', isCollapse)
  },
  [type.SWITCH_USER_GROUP] (context) {
    // MOCK
    return new Promise((resolve, reject) => {
      // 切换用户
      resolve()
    }).then(() => {

    })
  }
}
