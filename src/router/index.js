import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条 样式
import {Notification} from 'element-ui'
import Layout from '@/views/layout/Layout'
import AppBase from '@/views/app/index'
import AppList from '@/views/app/list/List'

const AppForm = () => import('../views/app/create/Create')
const AppDetail = () => import('../views/app/detail/Detail')

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
          {path: 'update/:id', component: AppForm, name: '更新应用', meta: {update: true}},
          {path: 'detail/:id', component: AppDetail, name: '应用详情'}
        ]
      }
    ]
  },
  {path: '*', redirect: '/app/list', hidden: true}
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断 Iframe 是否传入 userid, projectid
  if (to.query.userid && to.query.projectid) {
    localStorage.setItem('userid', to.query.userid)
    localStorage.setItem('projectid', to.query.projectid)
  }
  if (localStorage.getItem('userid') && localStorage.getItem('projectid')) {
    next()
  } else {
    NProgress.done()
    Notification({
      title: '警告',
      message: '无法获取 userid 或 projectid',
      type: 'error'
    })
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

