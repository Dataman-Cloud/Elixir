import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import AppBase from '@/views/app/index'
import AppList from '@/views/app/list/List'

const AppDetail = () => import('../views/app/detail/Detail')
const AppInstance = () => import('../views/app/instance/Instance')

const RegistryList = () => import('../views/registry/list/List')
const HistoryList = () => import('../views/registry/history/List')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/app',
    hidden: true,
    children: [
      {
        path: 'app',
        redirect: '/app/list',
        name: '应用',
        component: AppBase,
        children: [
          {path: 'list', component: AppList, name: '应用列表'},
          {path: 'detail/:id', component: AppDetail, name: '应用详情'},
          {path: 'instances/:host/:id/:slaveId', component: AppInstance, name: '实例详情'}
        ]
      }
    ]
  },
  {
    path: '/registry',
    redirect: '/registry/list',
    name: '镜像',
    component: Layout,
    children: [
      {path: 'list', component: RegistryList, name: '镜像列表'},
      {path: 'histories', component: HistoryList, name: '历史列表'}
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export default router

