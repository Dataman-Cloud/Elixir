import actions from './action'
import mutations from './mutations'

const state = {
  tenants: {
    tenants: [
      {
        name: 'aaaaa',
        manager: 'aaaa',
        createAt: '2010-2-1',
        hosts: [
          {
            ip: ['192.168.1.111']
          }
        ]
      },
      {
        name: 'bbbbb',
        manager: 'bbb',
        createAt: '2010-2-1',
        hosts: [
          {
            ip: ['192.168.1.112']
          }
        ]
      },
      {
        name: 'ccccc',
        manager: 'cccc',
        createAt: '2010-2-1',
        hosts: [
          {
            ip: ['192.168.1.113']
          }
        ]
      },
      {
        name: 'ddddd',
        manager: 'ddd',
        createAt: '2010-2-1',
        hosts: [
          {
            ip: ['192.168.1.1114']
          }
        ]
      }
    ],
    total: 0
  },
  tenant: {

  }
}

export default {
  state,
  actions,
  mutations
}
