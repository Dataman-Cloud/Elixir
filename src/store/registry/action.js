import * as type from './mutations_types'
import * as api from '../../api/registry'

export default {
  async [type.FETCH_REGISTRIES] (context) {
    let data = await api.listRegistry()
    context.commit(type.FETCH_REGISTRIES, data.data)
    return data
  },
  async [type.FETCH_TAGDETAIL] (context, name) {
    let data = await api.tagDetail(name)
    context.commit(type.FETCH_TAGDETAIL, data.data)
    return data
  },
  async [type.FETCH_LOGS] (context) {
    let data = await api.listLogs()
    context.commit(type.FETCH_LOGS, data.data)
    return data
  }
}
