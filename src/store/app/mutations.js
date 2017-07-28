import * as type from './mutations_types'
import {transformEnvtoArray} from '@/views/app/services/app'
// import {transformEnvtoArray, APP_BASE} from '@/views/app/services/app'
// import _ from 'lodash'

export default {
  [type.FETCH_APPS] (state, apps = []) {
    // state.apps.apps = apps.map(app => countHealthyState(app))
    state.apps.apps = apps
    state.apps.total = state.apps.apps.length
  },
  [type.FETCH_APP] (state, payload = {}) {
    // let app = _.merge({}, APP_BASE, payload)
    state.app = {...state.app, ...payload}
    // state.app.envs = transformEnvtoArray(state.app.env)
  },
  [type.FETCH_APP_INSTANCES] (state, payload = []) {
    state.app.tasks = payload
  },
  [type.FETCH_APP_VERSIONS] (state, payload = []) {
    state.app.versions = payload.map(version => {
      version.envs = transformEnvtoArray(version.env)
      version.healthChecks = version.healthCheck ? [].concat(state.app.curVersionObj.healthCheck) : []
      return version
    })
  },
  [type.FETCH_APP_CUR_VERSION] (state, payload = {}) {
    // let curVersionObj = _.merge({}, APP_BASE, payload)
    state.app.curVersionObj = payload
    state.app.curVersionObj.envs = transformEnvtoArray(state.app.curVersionObj.env)
    state.app.curVersionObj.healthChecks = state.app.curVersionObj.healthCheck ? [].concat(state.app.curVersionObj.healthCheck) : []
  },
  [type.FETCH_COMPOSES] (state, composes = []) {
    state.composes.composes = composes
    state.composes.total = state.composes.composes.length
  }
}
