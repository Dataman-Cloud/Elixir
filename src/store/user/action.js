import * as type from './mutations_types'

export default {
  [type.SET_USER_INFO] (context, playload = {}) {
    context.commit(type.SET_USER_INFO, playload)
  }
}
