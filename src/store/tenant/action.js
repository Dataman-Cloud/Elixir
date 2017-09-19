import * as type from './mutations_types'
import * as api from '../../api/tenant'

export default {
  async [type.FETCH_TENANTS] ({ commit }) {
    const { data } = await api.tenantsList()
    commit(type.FETCH_TENANTS, data)
  },
  async [type.FETCH_TENANT_HOSTS] ({ commit }) {
    let { data } = await api.hostList()
    commit(type.FETCH_TENANT_HOSTS, data)
    return data
  },
  async [type.FETCH_SUBNETLIST] ({ commit }) {
    let { data } = await api.subnetList()
    commit(type.FETCH_SUBNETLIST, data)
  }
}
