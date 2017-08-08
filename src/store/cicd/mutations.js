/**
 * Created by lixiaoyan on 2017/7/7.
 */
import * as type from './mutations_types'

export default {
  [type.FETCH_CICDS] (state, cicds = []) {
    state.cicds.cicds = cicds
    state.cicds.total = state.cicds.cicds.length
  },
  [type.FETCH_CICD] (state, cicd = []) {
    state.cicd = cicd
  },
  [type.FETCH_LISTJENKINS] (state, jenkins = []) {
    state.jenkins.jenkins = jenkins
  }
}
