import * as type from './mutations_types'

export default {
  [type.SET_USER_INFO] (state, {userid, projectid, bayname}) {
    state.userid = userid
    state.projectid = projectid
    state.bayname = bayname
  }
}
