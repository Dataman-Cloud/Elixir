import * as type from './mutations_types'
import * as api from '../../api/registry'

export default {
  [type.FETCH_REGISTRIES] (context) {
    return api.listRegistry()
      .then(data => {
        context.commit(type.FETCH_REGISTRIES, data.data)
        return data
      })
  }
}
