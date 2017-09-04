import * as type from './mutations_types'

function transformHost (hosts = []) {
  return hosts.map((item, index) => ({
    key: index,
    label: item
  }))
}
export default {
  [type.FETCH_HOSTS] (state, hosts = []) {
    state.hosts.hosts = transformHost(hosts)
    state.hosts.total = state.hosts.hosts.length
  }
}
