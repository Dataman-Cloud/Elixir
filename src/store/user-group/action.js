import * as type from './mutations_types'
import * as userGroup from '../../api/user-group'

export default {
  async [type.FETCH_USER_GROUPS] (context) {
    let res = await userGroup.userGroupList()
    context.commit(type.FETCH_USER_GROUPS, res)
    return res
  }
}