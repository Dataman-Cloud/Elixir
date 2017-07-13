/**
 * Created by lixiaoyan on 2017/7/11.
 */
import * as type from './mutations_types'

export default {
  [type.FETCH_POLICY] (state, policies = []) {
    state.policies.policies = policies
    state.policies.total = state.policies.policies.length
  },
  [type.FETCH_HISTORY] (state, histories = []) {
    state.histories.histories = histories.obj
    state.histories.total = histories.totalCount
    state.histories.page = histories.pageNum
    state.histories.size = histories.numPerPage
  }
}
