/**
 * Created by my9074 on 2017/4/8.
 */
import * as type from './mutations_types'
import * as api from '../../api/app-swan'

export default {
  [type.FETCH_APPS] (context) {
    return api.listApp()
      .then(data => {
        context.commit(type.FETCH_APPS, data.data)
        return data
      })
  },
  [type.FETCH_APP] (context, id) {
    return api.getApp(id)
      .then(data => {
        context.commit(type.FETCH_APP, data.data)
        return Promise.all(
          [context.dispatch(type.FETCH_APP_INSTANCES, id),
            context.dispatch(type.FETCH_APP_VERSIONS, id),
            context.dispatch(type.FETCH_APP_CUR_VERSION, id)
          ])
      })
  },
  [type.FETCH_APP_INSTANCES] (context, id) {
    return api.instances(id)
      .then(data => {
        context.commit(type.FETCH_APP_INSTANCES, data.data)
        return data
      })
  },
  [type.FETCH_APP_VERSIONS] (context, id) {
    return api.versions(id)
      .then(data => {
        context.commit(type.FETCH_APP_VERSIONS, data.data)
        return data
      })
  },
  [type.FETCH_APP_CUR_VERSION] (context, id) {
    return api.curVersion(id)
      .then(data => {
        context.commit(type.FETCH_APP_CUR_VERSION, data.data)
        return data
      })
  },
  [type.FETCH_COMPOSES] (context) {
    return api.listComposes()
      .then(data => {
        context.commit(type.FETCH_COMPOSES, data.data)
        return data
      })
  }
}
