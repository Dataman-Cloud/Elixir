// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import lodash from '@/utils/lodash'
import * as filters from '@/filters'
import './styles/theme/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './styles/index.css' // 全局自定义的css样式
import './styles/element-ui.css' // 覆盖 Element-UI 的样式
// import './mock' // Mock 测试, 生产环境需注释

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(lodash)

// 注册全局 Filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
