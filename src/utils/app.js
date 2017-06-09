/**
 * Created by my9074 on 2017/6/9.
 */
import _ from 'lodash'

export function transformEnvstoObj (envs = []) {
}

export function transformEnvtoArray (env = {}) {
  let res = []
  _.forOwn(env, (v, k) => {
    res.push({key: k, value: v})
  })
  return res
}

export const APP_BASE = {
  env: {},
  container: {
    docker: {
      parameters: [],
      portMappings: []
    },
    volumes: []
  },
  constraints: [],
  healthChecks: [],
  labels: {},
  tasks: []
}
