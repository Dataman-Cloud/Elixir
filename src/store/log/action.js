import * as type from './mutations_types'
import * as api from '../../api/log'

export default {
  async [type.FETCH_SELECTCLUSTER] (context) {
    let data = await api.selectCluster()
    return data
  },
  async [type.FETCH_SELECTAPPS] (context, cluster) {
    let data = await api.selectApps(cluster)
    return data
  },
  async [type.FETCH_SELECTTASKS] (context, app) {
    let data = await api.selectTasks(app)
    return data
  }
}
