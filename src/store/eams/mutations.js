import * as type from './mutations_types'

export default {
  [type.FETCH_EAMS] (state, composes = []) {
    state.eamsList = composes
  }
}
