import * as type from './mutations_types'
import * as api from '../../api/compose-template'

export default {
  async [type.FETCH_COMPOSE_TEMPLATES] (context) {
    let { data } = await api.listTemplate()
    context.commit(type.FETCH_COMPOSE_TEMPLATES, data)
    return data
  },
  async [type.FETCH_COMPOSE_TEMPLATE] (context, payload) {
    let { data } = await api.getTemplate(payload)
    context.commit(type.FETCH_COMPOSE_TEMPLATE, data)
    return data
  }
}
