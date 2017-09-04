/* eslint-disable */
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

export function getYmlForm () {
  // return {
  //   'name': 'dddddd',
  //   'desc': '',
  //   'yaml_raw': "version: '3'\nservices:\n  octopusconsole:\n    network_mode: 'bridge'\n    image: sryregistry.service.consul:5002/library/octopus-console:1.2.0-RC8\n    stdin_open: true\n    restart: unless-stopped\n    ports:\n      - 8090:80/tcp\n    environment:\n      API_URL: http://octopusconsoleswan\n      API_PORT: 9088\n    depends_on:\n      - octopusconsoleswan\n    deploy:\n      mode: replicated\n      replicas: 1\n    dns:\n      - 192.168.31.31\n      - 192.168.31.33\n      \n\n  octopusconsoleswan:\n    network_mode: 'host'\n    deploy:\n      mode: replicated\n      replicas: 1\n    image: sryregistry.service.consul:5002/library/octopus-api:1.2.0-RC8\n    stdin_open: true\n    restart: unless-stopped\n    dns:\n      - 192.168.31.31\n      - 192.168.31.33\n    expose:\n      - 9099\n    volumes: \n      - /home/apps/nptree.json:/apps/saturn/config/nptree.json\n    environment:\n      REG_CENTER_JSON_PATH: /apps/saturn/config/nptree.json\n      SATURN_CONSOLE_DB_URL: jdbc:mysql://192.168.31.21:3306/saturn_console\n      SATURN_CONSOLE_DB_USERNAME: root\n      SATURN_CONSOLE_DB_PASSWORD: dataman\n      VIP_SATURN_CONTAINER_TYPE: SWAN\n      VIP_SATURN_DCOS_REGISTRY_URI: http://192.168.31.34:5000\n      OCTOPUS_DASHBOARD_REFRESH_INTERVAL_MINUTE: 1440\n      OCTOPUS_SWAN_REST_URI: http://192.168.31.31:5016\n      OCTOPUS_DCOS_USERNAME: dev\n      OCTOPUS_DCOS_PASSWORD: Admin123\n      DM_GROUP_ID: 3\n      DM_TENANT_ID: 1\n      DM_USER_ID: 2\n      DM_USER_NAME: dev\n      DM_VCLUSTER: clusterest5555\n      DM_VCLUSTER_ID: 2\n      DM_GROUP_NAME: eams",
  //   'yaml_extra': {
  //     'octopusconsole': {
  //       'selectImageType': 'local',
  //       'wait_delay': 1,
  //       'pull_always': false,
  //       'constraints': 'AND (equal vcluster clusterest5555) (UNIQUE hostname)',
  //       // uris: [registries.default[0].Uri],
  //       'resource': {
  //         'cpu': 1,
  //         'mem': 300
  //       }
  //     },
  //     'octopusconsoleswan': {
  //       'selectImageType': 'local',
  //       'wait_delay': 1,
  //       'pull_always': false,
  //       'constraints': 'AND (equal vcluster clusterest5555) (UNIQUE hostname)',
  //       // uris: [registries.default[0].Uri],
  //       'resource': {
  //         'cpu': 1,
  //         'mem': 1024
  //       }
  //     }
  //   },
  //   'yaml_env': {}
  // }
  return {
    "name": "octopus-demo",
    "desc": "wordpressbp",
    "yaml_raw": "version: '3'\nservices:\n  octopusconsole:\n    network_mode: 'bridge'\n    image: sryregistry.service.consul:5002/library/octopus-console:1.2.0-RC8\n    stdin_open: true\n    restart: unless-stopped\n    ports:\n      - 8090:80/tcp\n    environment:\n      API_URL: http://octopusconsoleswan\n      API_PORT: 9088\n    depends_on:\n      - octopusconsoleswan\n    deploy:\n      mode: replicated\n      replicas: 1\n    dns:\n      - 192.168.1.184\n      - 192.168.1.181\n      \n\n  octopusconsoleswan:\n    network_mode: 'host'\n    deploy:\n      mode: replicated\n      replicas: 1\n    image: sryregistry.service.consul:5002/library/octopus-api:1.2.0-RC8\n    stdin_open: true\n    restart: unless-stopped\n    dns:\n      - 192.168.1.184\n      - 192.168.1.181\n    expose:\n      - 9099\n    environment:\n      REG_CENTER_JSON_PATH: /apps/saturn/config/nptree.json\n      SPRING_DATASOURCE_URL: jdbc:mysql://192.168.31.21:3306/saturn_console?useUnicode=true&characterEncoding=utf-8&allowMultiQueries=true\n      SATURN_CONSOLE_DB_USERNAME: root\n      SATURN_CONSOLE_DB_PASSWORD: dataman\n      OCTOPUS_CLOUD_CONTAINER-TYPE: SWAN\n      OCTOPUS_CLOUD_REGISTRY-URI: https://offlineregistry.dataman-inc.com:5000\n      OCTOPUS_DASHBOARD_REFRESH_INTERVAL_MINUTE: 1440\n      OCTOPUS_CLOUD_SWAN_REST-URI: http://192.168.31.31:5016\n      SPRING_DATASOURCE_USERNAME: root\n      SPRING_DATASOURCE_PASSWORD: dataman123\n      OCTOPUS_CLOUD_SWAN_GROUP-ID: 3\n      OCTOPUS_CLOUD_SWAN_TENANT-ID: 1\n      OCTOPUS_CLOUD_SWAN_USER-ID: 2\n      OCTOPUS_CLOUD_SWAN_USER-NAME: dev\n      OCTOPUS_CLOUD_SWAN_VCLUSTER: clusterest5555\n      OCTOPUS_CLOUD_SWAN_VCLUSTER-ID: 2\n      OCTOPUS_CLOUD_SWAN_GROUP-NAME: eams",
    "yarn_env": {
      "WORRRRRR": "fffffff"
    },
    "yaml_extra": {
      "octopusconsole": {
        "runas": "bbk",
        "cluster": "test",
        "wait_delay": 180,
        "pull_always": false,
        "constraints": [
          {
            "attribute": "vcluster",
            "operator": "==",
            "value": "test"
          }
        ],
        "uris": null,
        "ips": null,
        "resource": {
          "cpus": 0.01,
          "mem": 64
        },
        "proxy": {
         "enabled": true,
         "alias": "ocotpus.cn",
         "listen": 999,
         "sticky": false
       }
      },
      "octopusconsoleswan": {
        "runas": "bbk",
        "cluster": "test",
        "wait_delay": 10,
        "pull_always": false,
        "constraints": [
          {
            "attribute": "vcluster",
            "operator": "==",
            "value": "test"
          }
        ],
        "uris": null,
        "ips": null,
        "resource": {
          "cpus": 0.01,
          "mem": 64
        }
      }
    }
  }
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
