import * as type from './mutations_types'

function transformHost (hosts = []) {
  return hosts.map((item, index) => ({
    key: index,
    label: item
  }))
}

export default {
  [type.FETCH_CLUSTER_HOSTS] (state, clusterHosts = []) {
    state.clusterHosts.clusterHosts = transformHost(clusterHosts)
    state.clusterHosts.total = state.clusterHosts.clusterHosts.length
  },
  [type.FETCH_HOSTS] (state, hosts = []) {
    state.hosts.hosts = hosts
    state.hosts.total = hosts.length
  }
}
