import * as type from './mutations_types'

export default {
  [type.FETCH_HOST] (state, hosts = []) {
    state.hosts.hosts = hosts
    state.hosts.total = state.hosts.hosts.length
  }
}
