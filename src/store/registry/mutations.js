import * as type from './mutations_types'

export default {
  [type.FETCH_REGISTRIES] (state, registries = []) {
    state.registries.registries = registries
    state.registries.total = state.registries.registries.length
  }
}
