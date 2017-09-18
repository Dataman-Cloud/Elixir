import * as type from './mutations_types'
import * as networks from '../../api/networks'

export default {
  async [type.FETCH_NETWORKS] ({ commit }) {
    let { data } = await networks.networksList()
    commit(type.FETCH_NETWORKS, data)
  }
}
