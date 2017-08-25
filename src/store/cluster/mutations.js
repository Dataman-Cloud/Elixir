import * as type from './mutations_types'

export default {
  [type.FETCH_CLUSTERS] (state, clusters = []) {
    state.clusters.clusters = clusters
    state.clusters.total = state.clusters.clusters.length
  },
  [type.FETCH_CLUSTER] (state, cluster = {}) {
    state.cluster = cluster
  }
}
