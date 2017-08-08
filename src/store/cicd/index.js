/**
 * Created by lixiaoyan on 2017/7/7.
 */
import actions from './action'
import mutations from './mutations'

const state = {
  cicds: {
    cicds: [],
    total: 0
  },
  cicd: {
    cicds: []
  },
  jenkins: {
    jenkins: []
  }
}

export default {
  state,
  actions,
  mutations
}
