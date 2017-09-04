import * as type from './mutations_types'
import * as api from '../../api/host'

export default {
  async [type.FETCH_HOSTS] (context, name) {
    let { data } = await api.hostList()
    context.commit(type.FETCH_HOSTS, data)
    return data
  }
}
