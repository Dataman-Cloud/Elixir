import * as type from './mutations_types'
import * as api from '../../api/minihost'

export default {
  async [type.FETCH_MINIHOST] (context) {
    let data = await api.listApp()
    context.commit(type.FETCH_MINIHOST, data.data)
    return data.data
  }
}
