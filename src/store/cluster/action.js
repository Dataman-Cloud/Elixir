import * as type from './mutations_types'
import * as api from '../../api/cluster'

export default {
  async [type.FETCH_CLUSTERS] (context) {
    let { data } = await api.clusterList()
    context.commit(type.FETCH_CLUSTERS, data)
    return data
  },
  async [type.FETCH_CLUSTER] (context, name) {
    let { data } = await api.clusterDetail(name)
    context.commit(type.FETCH_CLUSTER, data)
    return data
  },
  async [type.FETCH_DEL_CLUSTER] (context, vclusterLabel) {
    let { data } = await api.delCluster(vclusterLabel)
    return data
  }
}
