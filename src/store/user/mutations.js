import * as type from './mutations_types'
import { setToken } from '@/utils/auth'

export default {
  [type.SET_TOKEN] (state, payload) {
    state.token = payload.token
    setToken(state.token)
  },
  [type.SET_USER_INFO] (state, { name, role }) {
    state.name = name
    state.roles = role
  }
}
