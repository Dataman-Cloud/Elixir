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
  cpus: 0.01,
  mem: 16,
  env: {},
  container: {
    docker: {
      network: 'BRIDGE',
      parameters: [],
      portMappings: []
    },
    volumes: []
  },
  constraints: [
    [
      'vcluster',
      'LIKE'
    ]
  ],
  healthChecks: [],
  labels: {},
  tasks: []
}
