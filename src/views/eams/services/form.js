/* eslint-disable */
export const baseForm = {
  serviceName: 'demo',
  instanceMode: 'local',
  containerSizeMode: 'low',
  zookeeperList: [{
    ip: '192.168.1.184',
    port: 2181
  }],
  mysql: {
    ip: '192.168.1.184',
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
      "SRPING_DATASOURCE_PASSWORD": "dataman"
    },
    "labels": {

    },
    "yamlText": "version: \"3\"\n\nservices:\n  octopusconsole:\n    image: \"sryregistry.service.consul:5002/library/octopus-console:1.2.0-RC8\"\n    network_mode: \"bridge\"\n    deploy:\n      replicas: 1\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - API_URL=http://octopusconsoleswan\n      - API_PORT=9088\n    ports:\n      - \"80/tcp\"\n    depends_on:\n      - octopusconsoleswan\n    proxy:\n      enabled: true\n      alias: \"kak.cn\"\n      listen: 39088\n      sticky: false\n\n  octopusconsoleswan:\n    image: \"sryregistry.service.consul:5002/library/octopus-api:1.2.0-RC8\"\n    network_mode: \"bridge\"\n    restart: unless-stopped\n    deploy:\n      replicas: 1\n      wait_delay: 5\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - SPRING_DATASOURCE_URL=${MYSQL_URL}\n      - SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}\n      - SRPING_DATASOURCE_PASSWORD=${SRPING_DATASOURCE_PASSWORD}\n      - OCTOPUS_CLOUD_CONTAINER-TYPE=${OCTOPUS_CLOUD_CONTAINER}\n    ports:\n      - 9088\n    proxy:\n      enabled: true\n      alias: \"yy.cn\"\n      listen: 9088\n      sticky: false\n    resource:\n      cpus: 1\n      mem: 512\n"
    // "yamlText": "version: \"3\"\n\nservices:\n  octopusconsole:\n    image: \"sryregistry.service.consul:5002/library/octopus-console:1.2.0-RC8\"\n    network_mode: \"bridge\"\n    deploy:\n      replicas: 1\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - WORDPRESS_DB_HOST=mariadb:3306\n      - WORDPRESS_DB_PASSWORD=Password\n    ports:\n      - \"80/tcp\"\n    depends_on:\n      - octopusconsoleswan\n    proxy:\n      enabled: true\n      alias: \"kak.cn\"\n      listen: 8888\n      sticky: false\n\n  octopusconsoleswan:\n    image: \"sryregistry.service.consul:5002/library/octopus-api:1.2.0-RC8\"\n    network_mode: \"host\"\n    restart: unless-stopped\n    deploy:\n      replicas: 1\n      wait_delay: 20\n      constraints:\n        - attribute: \"vcluster\"\n          operator: \"==\"\n          value: \"eams\"\n    environment:\n      - MYSQL_ROOT_PASSWORD=Password\n    ports:\n      - 9088\n    proxy:\n      enabled: true\n      alias: \"yay.cn\"\n      listen: 9088\n      sticky: false"
  }
}
