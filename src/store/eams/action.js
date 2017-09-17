import * as type from './mutations_types'
import * as api from '../../api/eams'

export default {
  async [type.FETCH_EAMS] (context) {
    let data = await api.listCompose()
    context.commit(type.FETCH_EAMS, data.data)
    return data.data
  }
}
