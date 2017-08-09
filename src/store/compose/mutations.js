import * as type from './mutations_types'

export default {
  [type.FETCH_COMPOSES] (state, composes = []) {
    state.composes.composes = composes
    state.composes.total = state.composes.composes.length
  },
  [type.FETCH_COMPOSE] (state, compose = {}) {
    state.compose = compose
  }
}
