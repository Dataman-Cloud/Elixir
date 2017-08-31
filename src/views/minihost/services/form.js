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
