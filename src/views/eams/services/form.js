export const octopusForm = {
  serviceName: '12',
  instanceMode: 'local',
  containerSizeMode: 'low',
  zookeeperList: [{
    ip: '192.168.31.23',
    port: '2181'
  }],
  mysql: {
    ip: '192.168.31.21',
    port: '3306',
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
