import * as type from './mutations_types'
import * as api from '../../api/minihost'

export default {
  async [type.FETCH_MINIHOST] ({commit}) {
    commit(type.RESET_MINIHOST)
    let data = await api.listApp()
    if (Array.isArray(data)) {
      data.forEach(async app => {
        if (app.name.indexOf('minihost-') > -1) {
          await api.listTasks(app.id).then((task) => {
            commit(type.FETCH_MINIHOST, task)
          })
        }
      })
    }
  }
}
