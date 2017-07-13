/**
 * Created by lixiaoyan on 2017/7/11.
 */
import * as type from './mutations_types'
import * as api from '../../api/elastic'

export default {
  [type.FETCH_POLICY] (context) {
    return api.policyList()
      .then(data => {
        context.commit(type.FETCH_POLICY, data.data.obj)
        return data
      })
  },
  [type.FETCH_APPNAME] (context) {
    return api.getAppName()
      .then(data => {
        return data
      })
  },
  [type.FETCH_HISTORY] (context, query = {}) {
    return api.historyList(query)
      .then(data => {
        context.commit(type.FETCH_HISTORY, data.data)
        return data
      })
  }
}
