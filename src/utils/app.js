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
  envs: [],
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

export const DYNAMIC_CONFIG = {
  envs: {
    key: '',
    value: ''
  },
  parameters: {
    key: '',
    value: ''
  },
  healthChecks: {
    protocol: 'TCP',
    gracePeriodSeconds: '',
    intervalSeconds: '',
    timeoutSeconds: '',
    maxConsecutiveFailures: '',
    ifPortIndex: null,
    ignoreHttp1xx: false
  },
  portMappings: {
    containerPort: '',
    protocol: 'tcp'
  },
  volumes: {
    containerPath: '',
    hostPath: '',
    mode: 'RW'
  }
}
