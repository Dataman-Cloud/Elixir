import * as type from './mutations_types'
import * as tenant from '../../api/tenant'

export default {
  async [type.FETCH_TENANTS] ({ commit }, playload = {}) {
    const { data } = await tenant.tenantsList()
    commit(type.FETCH_TENANTS, data)
  }
}
