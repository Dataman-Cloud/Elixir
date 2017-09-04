/* eslint-disable */
export const mcForm = {
  serviceName: 'demo1',
  instanceMode: 'local',
  instanceNumber: 1,
  containerSizeMode: 'low',
  gpu: 1,
  disk: 50,
  ssh: [' '],
  image: {
    Image: '',
    uri: '',
    tag: ''
  },
  ports: [9088]
}

export const mcRules = {
  serviceName: [
    { required: true, message: '服务名不能为空' },
    { pattern: /^[a-zA-Z0-9-]+$/, message: '服务名称只能包含数字、字母、中划线' },
    { max: 48, message: '最大长度48个字符 (汉字占3个字符)' }
  ]
}

export function submitForm () {
  // return {
  //   name: 'ggg',
  //   cmd: null,
  //   args: null,
  //   cpus: 0.1,
  //   mem: 32,
  //   gpus: 0,
  //   disk: 0,
  //   runAs: 'bbk',
  //   instance: 1,
  //   constraints: [
  //     {
  //       attribute: 'vcluster',
  //       operator: '==',
  //       value: 'clusterest5555'
  //     }
  //   ],
  //   container: {
  //     type: 'DOCKER',
  //     docker: {
  //       image: 'sryregistry.service.consul:5002/library/centos-ssh:v1',
  //       network: 'bridge',
  //       forcePullImage: false,
  //       privileged: true,
  //       // parameters: [
  //       //   {
  //       //     key: 'network',
  //       //     value: 'mynet'
  //       //   }
  //       // ],
  //       portMappings: [
  //         {
  //           containerPort: 22,
  //           name: 'http',
  //           protocol: 'tcp',
  //           hostPort: 220
  //         }
  //       ]
  //     }
  //   },
  //   env: {
  //     RSA_KEY: ''
  //   }
  // }
  return {
    "name": "esdat22377g21",
    "cmd": null,
    "args": null,
    "cpus": 0.01,
    "gpus": 0,
    "mem": 32,
    "disk": 0,
    "instances": 2,
    "runAs": "bbk",
    "constraints": [
        {
      "attribute": "vcluster",
      "operator": "==",
      "value": "clusterest5555"
    }
    ],
    "container": {
      "type": "DOCKER",
      "docker": {
        "image": "sryregistry.service.consul:5002/library/centos-ssh:v1",
        "network": "bridge",
        "forcePullImage": false,
        "privileged": true,
        "portMappings": [
          {
            "name": "http",
            "protocol": "tcp",
            "containerPort": 22,
            "hostPort": 2201
          }
        ]
      }
    },
    "env": {
      "PORT": "Port 45",
      "RSA_KEY": "1231231"
    }
  }
}
