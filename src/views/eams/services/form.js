/* eslint-disable */
export const baseForm = {
  serviceName: 'demo',
  instanceMode: 'local',
  containerSizeMode: 'low',
  cluster: '',
  zookeeperList: [{
    ip: '192.168.1.184',
    port: 2181
  }],
  mysql: {
    ip: '192.168.31.35',
    port: 3306,
    username: 'Octopus_Test',
    password: 'Dataman-inc1'
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
  port: 39088,
  LDAP: {
    username: "duffqiu",
    password: 123456
  }
}

export const ipRule = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/
export const formRules = {
  serviceName: [
    { required: true, message: '服务名不能为空' },
    { pattern: /^[a-zA-Z0-9-]+$/, message: '服务名称只能包含数字、字母、中划线' },
    { max: 48, message: '最大长度48个字符 (汉字占3个字符)' }
  ],
  cluster: [
    { required: true, message: '请选择集群' }
  ]
}

export function newComposeForm () {
  return {
    "runas": "bbk",
    "cluster": "eams",
    "name": "octopus-demo2",
    "description": '',
    "envs": {
      "OCTOPUS_CLOUD_CONTAINER": "SWAN",
      "MYSQL_URL": "jdbc:mysql://192.168.1.184:3306/saturn_console",
      "SPRING_DATASOURCE_USERNAME": "root",
      "SPRING_DATASOURCE_PASSWORD": "dataman",
      "USER_ID": "28",
      "VCLUSTER_NAME": "eams",
      "GROUP_ID": "62",
      "SWAN_URI": "http://192.168.31.6:5016",
      "CONSOLE_PORT": "39088"
    },
    "labels": {

    },
    // "yamlText": "version: \"3\"\n\nservices:\n  octopusconsole:\n    image: \"demoregistry.dataman-inc.com/guangzhou/octopus-console:1.2.1\"\n    network_mode: \"macvlan\"\n    deploy:\n      replicas: 1\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - API_URL=http://octopusconsoleswan\n      - API_PORT=9088\n    ports:\n      - \"18080/tcp\"\n    depends_on:\n      - octopusconsoleswan\n  octopusconsoleswan:\n    image: \"demoregistry.dataman-inc.com/guangzhou/octopus-api:1.2.1\"\n    network_mode: \"macvlan\"\n    restart: unless-stopped\n    deploy:\n      replicas: 1\n      wait_delay: 5\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - SPRING_DATASOURCE_URL=${MYSQL_URL}\n      - SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}\n      - SRPING_DATASOURCE_PASSWORD=${SRPING_DATASOURCE_PASSWORD}\n      - OCTOPUS_CLOUD_CONTAINER-TYPE=${OCTOPUS_CLOUD_CONTAINER}\n      - OCTOPUS_CLOUD_SWAN_USER-ID=${USER_ID}\n      - OCTOPUS_CLOUD_SWAN_GROUP-ID=${GROUP_ID}\n      - OCTOPUS_CLOUD_SWAN_REST-URI=${SWAN_URI}\n      - OCTOPUS_CLOUD_SWAN_VCLUSTER=${VCLUSTER_NAME}\n    ports:\n      - 9088\n    resource:\n      cpus: 1\n      mem: 512\n"
    "yamlText": "version: \"3\"\n\nservices:\n  octopusconsole:\n    image: \"sryregistry.service.consul:5002/octopusconsoleimg\"\n    network_mode: \"bridge\"\n    deploy:\n      replicas: 1\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - API_URL=http://octopusconsoleswan\n      - API_PORT=9088\n    ports:\n      - \"18080/tcp\"\n    depends_on:\n      - octopusconsoleswan\n    proxy:\n      enabled: true\n      alias: \"kcccak.cn\"\n      listen: ${CONSOLE_PORT}\n      sticky: false\n\n  octopusconsoleswan:\n    image: \"sryregistry.service.consul:5002/octopusapiimg\"\n    network_mode: \"bridge\"\n    restart: unless-stopped\n    deploy:\n      replicas: 1\n      wait_delay: 5\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - SPRING_DATASOURCE_URL=${MYSQL_URL}\n      - SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}\n      - SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}\n      - OCTOPUS_CLOUD_CONTAINER-TYPE=${OCTOPUS_CLOUD_CONTAINER}\n      - OCTOPUS_CLOUD_SWAN_USER-ID=${USER_ID}\n      - OCTOPUS_CLOUD_SWAN_GROUP-ID=${GROUP_ID}\n      - OCTOPUS_CLOUD_SWAN_REST-URI=${SWAN_URI}\n      - OCTOPUS_CLOUD_SWAN_VCLUSTER=${VCLUSTER_NAME}\n    ports:\n      - 9088\n    proxy:\n      enabled: true\n      alias: \"yddccy.cn\"\n      listen: 9088\n      sticky: false\n    resource:\n      cpus: 1\n      mem: 1024\n"
  }
}
