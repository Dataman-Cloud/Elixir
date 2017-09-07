import * as type from './mutations_types'
import { setToken, removeToken } from '@/utils/auth'

export default {
  [type.SET_TOKEN] (state, token) {
    state.token = token
    setToken(state.token)
  },
  [type.CLEAR_TOKEN] (state, token) {
    state.token = ''
    removeToken()
  },
  [type.SET_ROLES] (state, currentPerms) {
    state.currentPerms = currentPerms
  },
  [type.SET_USER_INFO] (state, { id, name, email, phone, title, userName, currentPerms, currentGroupId, currentGroupName, accountGroups } = {}) {
    state.id = id
    state.name = name
    state.email = email
    state.phone = phone
    state.title = title
    state.userName = userName
    state.currentPerms = currentPerms
    state.currentGroupId = currentGroupId
    state.currentGroupName = currentGroupName
    state.accountGroups = accountGroups
  },
  [type.SET_COLLAPSE] (state, isCollapse = false) {
    state.isCollapse = isCollapse
  },
  [type.FETCH_USERS] (state, users = []) {
    state.users.users = users
    state.users.total = users.length
  }
}
