import * as type from './mutations_types'
import * as api from '../../api/cluster'

export default {
  async [type.FETCH_CLUSTERS] (context) {
    let data = await api.clusterList()
    context.commit(type.FETCH_CLUSTERS, data.data)
    return data.data
  },
  async [type.FETCH_CLUSTER] (context, name) {
    let data = await api.clusterDetail(name)
    context.commit(type.FETCH_CLUSTER, data.data)
    return data.data
  }
}
