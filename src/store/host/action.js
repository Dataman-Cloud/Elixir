import * as type from './mutations_types'
import * as api from '../../api/host'

export default {
  async [type.FETCH_HOST] (context, name) {
    let data = await api.hostList()
    context.commit(type.FETCH_HOST, data.data)
    return data.data
  }
}
