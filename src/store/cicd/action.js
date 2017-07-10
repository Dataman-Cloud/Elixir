/**
 * Created by lixiaoyan on 2017/7/7.
 */
import * as type from './mutations_types'
import * as api from '../../api/cicd'

export default {
  [type.FETCH_CICDS] (context) {
    return api.cicdList()
      .then(data => {
        context.commit(type.FETCH_CICDS, data.data)
        return data
      })
  },
  [type.FETCH_CICD] (context, name) {
    return api.cicdDetails(name)
      .then(data => {
        context.commit(type.FETCH_CICD, data.data)
        return data
      })
  }
}
