import * as type from './mutations_types'
import * as api from '../../api/elastic'

export default {
  async [type.FETCH_POLICY] (context) {
    let data = await api.policyList()
    context.commit(type.FETCH_POLICY, data.data.obj)
    return data
  },
  async [type.FETCH_APPNAME] (context) {
    let data = await api.getAppName()
    return data
  },
  async [type.FETCH_HISTORY] (context, query = {}) {
    let data = await api.historyList(query)
    context.commit(type.FETCH_HISTORY, data.data)
    return data
  }
}
