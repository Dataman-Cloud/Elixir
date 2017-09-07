import * as type from './mutations_types'

export default {
  [type.FETCH_TENANTS] (state, tenants = []) {
    state.tenants.tenants = tenants
    state.tenants.total = tenants.length
  }
}
