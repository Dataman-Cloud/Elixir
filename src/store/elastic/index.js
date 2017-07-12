/**
 * Created by lixiaoyan on 2017/7/11.
 */
import actions from './action'
import mutations from './mutations'

const state = {
  policies: {
    policies: [],
    total: 0
  },
  histories: {
    histories: [],
    total: 0,
    page: 1,
    size: 100
  }
}

export default {
  state,
  actions,
  mutations
}
