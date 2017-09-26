/* eslint-disable */
export const mcForm = {
  serviceName: 'demo1',
  instanceMode: 'local',
  instanceNumber: 1,
  cmd: '',
  network: 'bridge',
  containerSizeMode: 'low',
  gpu: 1,
  disk: 5,
  ssh: [' '],
  image: {
    Image: '',
    uri: '',
    tag: ''
  },
  port: 22,
  containerPath: '',
  hostPath: '',
  volumeMode: 'RW'
}

export const mcRules = {
  serviceName: [
    { required: true, message: '服务名不能为空' },
    { pattern: /^[a-zA-Z0-9-]+$/, message: '服务名称只能包含数字、字母、中划线' },
    { max: 48, message: '最大长度48个字符 (汉字占3个字符)' }
  ],
  gpu: [{ type: 'integer', min: 1, message: 'gpu为正整数' }],
  port: [{ type: 'integer', min: 1, max: 65535, message: '端口号不在 0 - 65535 范围内' }],
  disk: [{ type: 'integer', min: 1, message: '磁盘大小为正整数' }]

}

export function getSubmitForm () {
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
    "name": "minihost-test3",
    "cmd": null,
    "args": null,
    "cpus": 1,
    "gpus": 0,
    "mem": 1024,
    "disk": 0,
    "instances": 1,
    "runAs": "bbk",
    "constraints": [
      {
        "attribute": "vcluster",
        "operator": "==",
        "value": "eams"
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
