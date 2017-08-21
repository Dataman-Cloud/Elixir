import * as type from './mutations_types'

export default {
  [type.LOGIN] (context, playload = {}) {
    // MOCK
    return new Promise((resolve, reject) => {
      const data = {
        token: 'asdadwe2q4123'
      }
      context.commit(type.SET_TOKEN, data)
      resolve(data)
    })
  },
  [type.FETCH_USER_INFO] (context) {
    // MOCK
    return new Promise((resolve, reject) => {
      const data = {
        name: 'myu',
        token: 'asdadwe2q4123',
        role: ['admin']
      }
      context.commit(type.SET_USER_INFO, data)
      context.commit(type.SET_TOKEN, data)
      resolve(data)
    })
  }
}
