import * as type from './mutations_types'

function transformHost (hosts = []) {
  return hosts.map((item, index) => ({
    key: index,
    label: item
  }))
}

export default {
  [type.FETCH_TENANTS] (state, tenants = []) {
    state.tenants.tenants = tenants
    state.tenants.total = tenants.length
  },
  [type.FETCH_TENANT_HOSTS] (state, hosts = []) {
    state.hosts.hosts = transformHost(hosts)
    state.hosts.total = state.hosts.hosts.length
  },
  [type.FETCH_SUBNETLIST] (state, subnets = []) {
    state.subnets.subnets = subnets
    state.subnets.total = subnets.length
  }
}
