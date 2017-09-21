import * as type from './mutations_types'
import * as api from '../../api/host'

export default {
  async [type.FETCH_HOSTS] ({ commit }, name) {
    let { data } = await api.hostList()
    commit(type.FETCH_HOSTS, data)
    return data
  },
  async [type.FETCH_CLUSTER_HOSTS] ({ commit }, name) {
    let { data } = await api.clusterHostList()
    commit(type.FETCH_CLUSTER_HOSTS, data)
    return data
  }
}
