import * as type from './mutations_types'

export default {
  [type.FETCH_USER_GROUPS] (state, groups = []) {
    state.groups.groups = groups
    state.groups.total = groups.length
  }
}
