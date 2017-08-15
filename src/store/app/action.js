/**
 * Created by my9074 on 2017/4/8.
 */
import * as type from './mutations_types'
import * as api from '../../api/app'

export default {
  async [type.FETCH_APPS] (context) {
    let data = await api.listApp()
    context.commit(type.FETCH_APPS, data.data)
    return data
  },
  async [type.FETCH_APP] (context, id) {
    let data = await api.getApp(id)
    context.commit(type.FETCH_APP, data.data)
    context.commit(type.TRANSFORM_APP_VERSION, data.data.version)
    return data
  }
}
