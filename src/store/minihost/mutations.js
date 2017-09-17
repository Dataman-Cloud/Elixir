import * as type from './mutations_types'

export default {
  [type.RESET_MINIHOST] (state) {
    state.minihostApps = []
  },
  [type.FETCH_MINIHOST] (state, list = []) {
    state.minihostApps = state.minihostApps.concat(list)
  }
}
