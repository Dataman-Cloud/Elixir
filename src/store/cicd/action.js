/**
 * Created by lixiaoyan on 2017/7/7.
 */
import * as type from './mutations_types'
import * as api from '../../api/cicd'

export default {
  async [type.FETCH_CICDS] (context) {
    let data = await api.cicdList()
    context.commit(type.FETCH_CICDS, data.data)
    return data.data
  },
  async [type.FETCH_CICD] (context, name) {
    let data = await api.cicdDetails(name)
    context.commit(type.FETCH_CICD, data.data)
    return data.data
  },
  async [type.FETCH_JENKINS] (context) {
    let data = await api.jenkins()
    return data.data
  },
  async [type.FETCH_LISTJENKINS] (context, name) {
    let data = await api.listJenkins()
    context.commit(type.FETCH_LISTJENKINS, data.data)
    return data.data
  }
}
