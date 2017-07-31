/**
 * Created by my9074 on 2017/4/8.
 */
import * as type from './mutations_types'
import * as api from '../../api/app-swan'

export default {
  async [type.FETCH_APPS] (context) {
    let data = await api.listApp()
    context.commit(type.FETCH_APPS, data.data)
    return data
  },
  async [type.FETCH_APP] (context, id) {
    let data = await api.getApp(id)
    context.commit(type.FETCH_APP, data.data)
    await Promise.all(
      [
        context.dispatch(type.FETCH_APP_INSTANCES, id),
        context.dispatch(type.FETCH_APP_VERSIONS, id),
        context.dispatch(type.FETCH_APP_CUR_VERSION, id)
      ])
  },
  async [type.FETCH_APP_INSTANCES] (context, id) {
    let data = await api.instances(id)
    context.commit(type.FETCH_APP_INSTANCES, data.data)
    return data
  },
  async [type.FETCH_APP_VERSIONS] (context, id) {
    let data = await api.versions(id)
    context.commit(type.FETCH_APP_VERSIONS, data.data)
    return data
  },
  async [type.FETCH_APP_CUR_VERSION] (context, id) {
    let data = await api.curVersion(id)
    context.commit(type.FETCH_APP_CUR_VERSION, data.data)
    return data
  },
  async [type.FETCH_COMPOSES] (context) {
    let data = await api.listComposes()
    context.commit(type.FETCH_COMPOSES, data.data)
    return data
  }
}
