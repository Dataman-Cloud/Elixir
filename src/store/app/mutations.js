import * as type from './mutations_types'
import {transformEnvtoArray, APP_BASE, countHealthyState} from '@/utils/app'
import _ from 'lodash'

export default {
  [type.FETCH_APPS] (state, apps = []) {
    state.apps.apps = apps.map(app => countHealthyState(app))
    state.apps.total = state.apps.apps.length
  },
  [type.FETCH_APP] (state, payload = {}) {
    state.app = _.merge({}, APP_BASE, payload)
    state.app.envs = transformEnvtoArray(state.app.env)
  }
}
