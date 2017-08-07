import * as type from './mutations_types'
import * as api from '../../api/log'

export default {
  async [type.FETCH_SELECTCLUSTER] (context) {
    let data = await api.selectCluster()
    context.commit(type.FETCH_SELECTCLUSTER, data.data)
    return data
  },
  async [type.FETCH_SELECTAPPS] (context) {
    let data = await api.selectApps()
    context.commit(type.FETCH_SELECTAPPS, data.data)
    return data
  },
  async [type.FETCH_SELECTTASKS] (context, app) {
    let data = await api.selectTasks(app)
    context.commit(type.FETCH_SELECTTASKS, data.data)
    return data
  }
}
