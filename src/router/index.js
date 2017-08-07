import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import RegistryBase from '@/views/registry/index'
import AppList from '@/views/app/list/List'
import CicdList from '@/views/cicd/list/List'
import ElasticList from '@/views/elastic/list/List'
import LogList from '@/views/log/list/List'

const AppDetail = () => import('../views/app/detail/Detail')
const AppInstance = () => import('../views/app/instance/Instance')

const BuildDetail = () => import('../views/cicd/detail/Detail')

const RegistryList = () => import('../views/registry/list/List')
const HistoryList = () => import('../views/registry/history/List')
const WareHouse = () => import('../views/registry/detail/Detail')

const HistoryDetail = () => import('../views/elastic/detail/Detail')

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/app',
    hidden: true
  },
  {
    path: '/app',
    redirect: '/app/list',
    name: '应用',
    component: Layout,
    children: [
      { path: 'list', component: AppList, name: '应用列表' },
      { path: 'detail/:id', component: AppDetail, name: '应用详情' },
      { path: 'instances/:host/:id/:slaveId', component: AppInstance, name: '实例详情' }
    ]
  },
  {
    path: '/registry',
    redirect: '/registry/list',
    name: '镜像',
    hidden: true,
    component: RegistryBase,
    children: [
      { path: 'list', component: RegistryList, name: '镜像列表' },
      { path: 'histories', component: HistoryList, name: '历史列表' },
      { path: 'detail/:name', component: WareHouse, name: '镜像仓库' }
    ]
  },
  {
    path: '/cicd',
    redirect: '/cicd/list',
    name: '镜像构建',
    component: Layout,
    children: [
      { path: 'list', component: CicdList, name: '构建列表' },
      { path: 'detail/:name', component: BuildDetail, name: '构建详情' }
    ]
  },
  {
    path: '/elastic',
    redirect: '/elastic/list',
    name: '弹性扩缩',
    component: Layout,
    children: [
      { path: 'list', component: ElasticList, name: '策略列表' },
      { path: 'detail/:name', component: HistoryDetail, name: '扩缩历史' }
    ]
  },
  {
    path: '/log',
    redirect: '/log/list',
    name: '日志监控',
    component: Layout,
    children: [
      { path: 'list', component: LogList, name: '日志查询' }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

