import * as type from './mutations_types'
import * as ipPools from '../../api/ip-pools'

export default {
  async [type.FETCH_IPPOOLS] ({ commit }) {
    let { data } = await ipPools.ipPoolsList()
    commit(type.FETCH_IPPOOLS, data)
  }
}
