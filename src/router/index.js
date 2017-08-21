import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login'
import AppList from '@/views/app/list/List'
import RegistryList from '@/views/registry/list/List'

const AppDetail = () => import('../views/app/detail/Detail')
const AppInstance = () => import('../views/app/instance/Instance')

const CicdList = () => import('../views/cicd/list/List')
const BuildDetail = () => import('../views/cicd/detail/Detail')

const HistoryList = () => import('../views/registry/history/List')
const WareHouse = () => import('../views/registry/detail/Detail')

const ElasticList = () => import('../views/elastic/list/List')
const HistoryDetail = () => import('../views/elastic/detail/Detail')

const LogList = () => import('../views/log/list/List')

const ComposeList = () => import('../views/compose/list/List')
const ComposeDetail = () => import('../views/compose/detail/Detail')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {
    path: '/app',
    redirect: '/app/list',
    name: '应用',
    icon: 'fa fa-cubes',
    component: Layout,
    children: [
      { path: 'list', component: AppList, name: '应用列表' },
      { path: 'detail/:id', component: AppDetail, name: '应用详情' },
      { path: 'instances/:host/:id/:slaveId', component: AppInstance, name: '实例详情' }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/compose',
    redirect: '/compose/list',
    name: '编排',
    icon: 'fa fa-database',
    component: Layout,
    children: [
      { path: 'list', component: ComposeList, name: '编排列表' },
      { path: 'detail/:id', component: ComposeDetail, name: '编排详情' }
    ]
  },
  {
    path: '/registry',
    redirect: '/registry/list',
    name: '镜像',
    icon: 'fa fa-stack-overflow',
    component: Layout,
    hasDropdown: true,
    children: [
      { path: 'list', component: RegistryList, name: '镜像列表' },
      { path: 'histories', component: HistoryList, name: '历史列表' },
      { path: 'detail/:name', component: WareHouse, name: '镜像仓库', hidden: true }
    ]
  },
  {
    path: '/cicd',
    redirect: '/cicd/list',
    name: '镜像构建',
    icon: 'fa fa-building',
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
    icon: 'fa fa-arrows',
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
    icon: 'fa fa-sticky-note',
    component: Layout,
    children: [
      { path: 'list', component: LogList, name: '日志查询' }
    ]
  },
  { path: '*', redirect: '/app', hidden: true }
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

