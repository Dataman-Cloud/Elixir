import * as type from './mutations_types'
import * as api from '../../api/registry'

export default {
  [type.FETCH_REGISTRIES] (context) {
    return api.listRegistry()
      .then(data => {
        context.commit(type.FETCH_REGISTRIES, data.data)
        return data
      })
  },
  [type.FETCH_HISTORIES] (context, playload = {}) {
    return api.listHistory(playload)
      .then(data => {
        context.commit(type.FETCH_HISTORIES, data.data)
        return data
      })
  }
}
