import Vue from 'vue'
import Router from 'vue-router'
import {Notification} from 'element-ui'
import Layout from '@/views/layout/Layout'
import AppBase from '@/views/app/index'
import AppList from '@/views/app/list/List'
import AppForm from '@/views/app/create/Create'
import AppDetail from '@/views/app/detail/Detail'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/app',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'app',
        redirect: '/list',
        name: '应用',
        component: AppBase,
        children: [
          {path: 'list', component: AppList, name: '应用列表'},
          {path: 'create', component: AppForm, name: '创建应用'},
          {path: 'detail/:id', component: AppDetail, name: '应用详情'}
        ]
      }
    ]
  },
  {path: '*', redirect: '/app/list', hidden: true}
]

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  // 判断 Iframe 是否传入 userid, projectid
  if (to.query.userid && to.query.projectid) {
    localStorage.setItem('userid', to.query.userid)
    localStorage.setItem('projectid', to.query.projectid)
  }
  if (localStorage.getItem('userid') && localStorage.getItem('projectid')) {
    next()
  } else {
    Notification({
      title: '警告',
      message: '无法获取 userid 或 projectid',
      type: 'error'
    })
  }
})

export default router

