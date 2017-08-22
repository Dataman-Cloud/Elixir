import * as type from './mutations_types'
import { removeToken } from '@/utils/auth'

export default {
  [type.LOGIN] (context, playload = {}) {
    // MOCK
    return new Promise((resolve, reject) => {
      const data = {
        token: 'asdadwe2q4123'
      }
      context.commit(type.SET_TOKEN, data.token)
      resolve(data)
    })
  },
  [type.LOGOUT] (context, playload = {}) {
    // MOCK
    return new Promise((resolve, reject) => {
      context.commit(type.SET_TOKEN, '')
      context.commit(type.SET_ROLES, [])
      removeToken()
      resolve()
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
      context.commit(type.SET_TOKEN, data.token)
      resolve(data)
    })
  },
  [type.SET_COLLAPSE] (context) {
    context.commit(type.SET_COLLAPSE)
  }
}
