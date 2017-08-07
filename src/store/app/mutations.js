import * as type from './mutations_types'
import {transformEnvtoArray, APP_BASE, countHealthyState} from '@/views/app/services/app'
import _ from 'lodash'

export default {
  [type.FETCH_APPS] (state, apps = []) {
    state.apps.apps = apps.map(app => countHealthyState(app))
    state.apps.total = state.apps.apps.length
  },
  [type.FETCH_APP] (state, payload = {}) {
    state.app = payload
  },
  [type.TRANSFORM_APP_VERSION] (state, payload = {}) {
    let version = _.merge({}, APP_BASE, payload)
    state.app.version = countHealthyState(version)
    state.app.version.envs = transformEnvtoArray(state.app.version.env)
  }
}
