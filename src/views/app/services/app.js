/**
 * Created by my9074 on 2017/6/9.
 */
import _ from 'lodash'

export function countHealthyState (app) {
  let HealthStatus = {
    HEALTHY: 'healthy',
    UNHEALTHY: 'unhealthy',
    UNKNOWN: 'unknown'
  }
  let healthData = [
    { quantity: app.tasksHealthy || 0, state: HealthStatus.HEALTHY },
    { quantity: app.tasksUnhealthy || 0, state: HealthStatus.UNHEALTHY }
  ]
  if (app.healthChecks && app.healthChecks.length === 0) {
    healthData.push({
      quantity: app.instances,
      state: HealthStatus.UNKNOWN
    })
  }
  return { ...app, healthData }
}

export function transformEnvstoObj (envs = []) {
  return envs.reduce((env, val) => {
    env[val.key] = val.value
    return env
  }, {})
}

export function transformEnvtoArray (env = {}) {
  let res = []
  _.forOwn(env, (v, k) => {
    res.push({ key: k, value: v })
  })
  return res
}

export function transformHealthChecks (healthChecks = [], networkMode = 'bridge') {
  return healthChecks.map(health => _.omit(health, networkMode === 'bridge' ? 'port' : 'portIndex'))
}

export const APP_BASE = {
  name: null,
  runAs: 'admin',
  cpus: 0.01,
  mem: 16,
  instances: '',
  envs: [],
  env: {},
  ips: [],
  subnet: '',
  container: {
    type: 'DOCKER',
    docker: {
      network: 'bridge',
      parameters: [],
      portMappings: []
    },
    volumes: []
  },
  constraints: [
    {
      attribute: 'vcluster',
      operator: '==',
      value: ''
    }
  ],
  healthChecks: [],
  healthCheck: {},
  labels: {
    JBORG_PROLONGATIONTYPE: null,
    JBORG_PROLONGATION4ROOTAPP: null
  },
  proxy: {
    enabled: false,
    alias: null,
    listen: null,
    sticky: false
  },
  cmd: null
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
    port: '',
    portIndex: '',
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

export const APP_FORM_RULES = {
  name: [
    { required: true, message: '应用名不能为空' },
    { pattern: /^[a-zA-Z0-9-]+$/, message: '应用名称只能包含数字、字母、中划线' },
    { max: 48, message: '最大长度48个字符 (汉字占3个字符)' }
  ],
  selectCluster: [
    { required: true, message: '集群不能为空' }
  ],
  'container.docker.image': [
    { required: true, message: '镜像地址不能为空' }
  ],
  subnet: [
    { required: true, message: '请选择子网' }
  ],
  ips: [
    { required: true, message: 'IP 池不能为空' }
  ],
  cpus: [
    { required: true, message: 'cpu不能为空' },
    { type: 'number', min: 0.01, message: 'cpu最小值为0.01' }
  ],
  mem: [
    { required: true, message: '内存不能为空最小值为16' },
    { type: 'number', min: 16, message: '内存不能为空最小值为16' }
  ],
  instances: [
    { required: true, message: '容器个数不能为空' },
    { type: 'number', min: 0, message: '容器个数最小为 0' }
  ]
}
