// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import lodash from '@/utils/lodash'
import * as filters from '@/filters'
import directives from '@/directives'
import './styles/theme/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/fonts.css'
import './styles/index.css' // 全局自定义的css样式
// import './styles/element-ui.css' // 覆盖 Element-UI 的样式
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条 样式
import { getToken } from '@/utils/auth'
import * as permiType from '@/store/permissions/mutations_types'
import * as userType from '@/store/user/mutations_types'
// import './mock' // Mock 测试, 生产环境需注释

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(lodash)

// 注册全局 Filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局 Directive
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 全局 beforeEach
const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.state.user.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch(userType.FETCH_USER_INFO).then(res => { // 拉取user_info
          const roles = res.role
          store.dispatch(permiType.SET_ROUTERS, roles).then(() => { // 生成可访问的路由表
            router.addRoutes(store.state.permissions.addRouters) // 动态添加可访问路由表
            next()
          })
        }).catch(() => {
          // TODO: 获取信息失败 则返回登录页 store.dispatch('LOGOUT')
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
