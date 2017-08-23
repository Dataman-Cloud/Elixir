import * as type from './mutations_types'
import { setToken } from '@/utils/auth'

export default {
  [type.SET_TOKEN] (state, token) {
    state.token = token
    setToken(state.token)
  },
  [type.SET_ROLES] (state, roles) {
    state.roles = roles
  },
  [type.SET_USER_INFO] (state, { name, role }) {
    state.name = name
    state.roles = role
  },
  [type.SET_COLLAPSE] (state, isCollapse = false) {
    state.isCollapse = isCollapse
  }
}
