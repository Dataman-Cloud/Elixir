import axios from 'axios'
import {Notification} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.params = Object.assign({}, config.params, {
      userid: localStorage.getItem('userid'),
      projectid: localStorage.getItem('projectid'),
      bayname: localStorage.getItem('bayname')
    })
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
    return Promise.reject(error)
  }
)

export default service
