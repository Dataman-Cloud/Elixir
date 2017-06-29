import * as type from './mutations_types'
import {transformEnvtoArray, APP_BASE, countHealthyState} from '@/views/app/services/app'
import _ from 'lodash'

export default {
  [type.FETCH_APPS] (state, apps = []) {
    state.apps.apps = apps.map(app => countHealthyState(app))
    state.apps.total = state.apps.apps.length
  },
  [type.FETCH_APP] (state, payload = {}) {
    let app = _.merge({}, APP_BASE, payload)
    state.app = countHealthyState(app)
    state.app.envs = transformEnvtoArray(state.app.env)
  }
}
