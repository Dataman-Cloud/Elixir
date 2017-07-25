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
import './styles/element-ui.css' // 覆盖 Element-UI 的样式
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条 样式
// import * as userType from '@/store/user/mutations_types'
// import {saveUserToLocal, hasFieldsInLocal} from '@/utils/handleStorage'
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

// // 全局 beforeEach, 每次路由前检查 userid, projectid 及 bayname
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // // 判断 Iframe 是否传入 userid, projectid, bayname
  // if (to.query.userid && to.query.projectid && to.query.bayname) {
  //   saveUserToLocal(to.query)
  //   store.dispatch(userType.SET_USER_INFO, {
  //     userid: to.query.userid,
  //     projectid: to.query.projectid,
  //     bayname: to.query.bayname
  //   })
  //   next()
  // } else if (hasFieldsInLocal('userid', 'projectid', 'projectid')) {
  //   store.dispatch(userType.SET_USER_INFO, {
  //     userid: localStorage.getItem('userid'),
  //     projectid: localStorage.getItem('projectid'),
  //     bayname: localStorage.getItem('bayname')
  //   })
  //   next()
  // } else {
  //   NProgress.done()
  //   ElementUI.Notification({
  //     title: '警告',
  //     message: '无法获取 userid、projectid 或 bayname',
  //     type: 'error'
  //   })
  // }
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
