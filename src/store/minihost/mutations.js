import * as type from './mutations_types'

export default {
  [type.FETCH_MINIHOST] (state, list = []) {
    state.minihostApps = list
  }
}
