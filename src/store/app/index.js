/**
 * Created by my9074 on 2017/4/8.
 */
import actions from './action'
import mutations from './mutations'
import getters from './getters'

const state = {
  apps: {
    apps: [],
    total: 0
  },
  app: {
    tasks: [],
    versions: [],
    curVersionObj: {}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
