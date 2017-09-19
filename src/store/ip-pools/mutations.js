import * as type from './mutations_types'

export default {
  [type.FETCH_IPPOOLS] (state, ipPools = []) {
    state.ipPools.ipPools = ipPools
    state.ipPools.total = ipPools.length
  }
}
