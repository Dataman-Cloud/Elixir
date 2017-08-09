import * as type from './mutations_types'
import * as api from '../../api/compose'

export default {
  async [type.FETCH_COMPOSES] (context) {
    let data = await api.listCompose()
    context.commit(type.FETCH_COMPOSES, data.data)
    return data.data
  },
  async [type.FETCH_COMPOSE] (context, payload) {
    let data = await api.getCompose(payload)
    context.commit(type.FETCH_COMPOSE, data.data)
    return data.data
  }
}
