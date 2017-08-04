import * as type from './mutations_types'

export default {
  [type.FETCH_REGISTRIES] (state, registries = []) {
    state.registries.registries = registries
    state.registries.total = state.registries.registries.length
  },
  [type.FETCH_LOGS] (state, logs = []) {
    state.logs.logs = logs
    state.logs.count = state.logs.logs.length
  },
  [type.FETCH_TAGDETAIL] (state, tags = []) {
    state.tags.tags = tags
    state.tags.count = state.tags.tags.length
  }
}
