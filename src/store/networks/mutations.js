import * as type from './mutations_types'

export default {
  [type.FETCH_NETWORKS] (state, networks = []) {
    state.networks.networks = networks
    state.networks.total = networks.length
  }
}
