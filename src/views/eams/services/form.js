export const octopusForm = {
  serviceName: 'demo',
  instanceMode: 'local',
  containerSizeMode: 'low',
  zookeeperList: [{
    ip: '192.168.31.23',
    port: 2181
  }],
  mysql: {
    ip: '192.168.31.21',
    port: 3306,
    username: 'root',
    password: 'dataman'
  },
  image: {
    Image: '',
    uri: '',
    tag: ''
  },
  imageB: {
    Image: '',
    uri: '',
    tag: ''
  },
  port: 9088
}

export const ipRule = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
export const octopusRules = {
  serviceName: [
    { required: true, message: '服务名不能为空' },
    { pattern: /^[a-zA-Z0-9-]+$/, message: '服务名称只能包含数字、字母、中划线' },
    { max: 48, message: '最大长度48个字符 (汉字占3个字符)' }
  ]
}

export function submitForm () {
  return {
    appName: 'test3',
    cpus: 1,
    mem: 1024,
    // runAs: localStorage.getItem('currentGroupName').toLowerCase(),
    constraints: 'AND (equal vcluster eams) (UNIQUE hostname)',
    ip: [],
    instances: 1,
    container: {
      docker: {
        parameters: [],
        network: 'bridge',
        portMappings: [{
          containerPort: 9088,
          name: 'port0',
          protocol: 'TCP'
        }],
        image: 'sryregistry.service.consul:5002/dev/library/octopus-console'
      },
      volumes: [{
        containerPath: '/apps/saturn/config/nptree.json',
        hostPath: '/home/apps/nptree.json',
        mode: 'RW'
      }]
    },
    uris: [],
    appVersion: '',
    gateway: {
      enabled: false,
      weight: 100
    },
    labels: {},
    env: {
      OCTOPUS_DCOS_PASSWORD: 'Admin123',
      OCTOPUS_DCOS_USERNAME: 'dev',
      REG_CENTER_JSON_PATH: '/apps/saturn/config/nptree.json',
      SATURN_CONSOLE_DB_URL: '',
      SATURN_CONSOLE_DB_USERNAME: '',
      SATURN_CONSOLE_DB_PASSWORD: '',
      VIP_SATURN_DCOS_REGISTRY_URI: 'http://192.168.31.34:5000',
      VIP_SATURN_ZK_CONNECTION: '',
      OCTOPUS_MSG_KAFKA_BROKER_LIST: '192.168.31.23:9092',
      OCTOPUS_SWAN_REST_URI: 'http://192.168.31.31:5016',
      VIP_SATURN_CONTAINER_TYPE: 'SWAN',
      DM_GROUP_ID: localStorage.getItem('currentGroupID'),
      DM_TENANT_ID: localStorage.getItem('currentTenantID'),
      DM_USER_ID: localStorage.getItem('currentAccountID'),
      DM_USER_NAME: localStorage.getItem('currentAccountName'),
      DM_VCLUSTER: 'eams',
      DM_VCLUSTER_ID: '2',
      DM_GROUP_NAME: localStorage.getItem('currentGroupName')
    }
  }
}
