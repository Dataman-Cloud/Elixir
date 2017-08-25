import axios from 'axios'
import { Notification } from 'element-ui'
import baseUrl from 'baseUrl'
import { getToken } from '../utils/auth'
import store from '@/store'
import * as type from '@/store/user/mutations_types'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 10000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    console.log('err' + error)// for debug
    Notification({
      title: '错误信息',
      message: error.message,
      type: 'error'
    })
    if (error.response.status === 401) {
      store.dispatch(type.FRONTEND_LOGOUT)
      location.reload()
    }
    return Promise.reject(error)
  }
)

export default service
