import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import Login from '@/views/login'
import AppList from '@/views/app/list/List'

const AppDetail = () => import('../views/app/detail/Detail')
const AppInstance = () => import('../views/app/instance/Instance')

const CicdList = () => import('../views/cicd/list/List')
const BuildDetail = () => import('../views/cicd/detail/Detail')

const HistoryList = () => import('../views/registry/history/List')
const WareHouse = () => import('../views/registry/detail/Detail')

const ElasticList = () => import('../views/elastic/list/List')
const HistoryDetail = () => import('../views/elastic/detail/Detail')

const LogList = () => import('../views/log/list/List')

const RegistryList = () => import('../views/registry/list/List')

const ClusterLayout = () => import('../views/cluster')
const ClusterList = () => import('../views/cluster/list/List')
const ClusterDetail = () => import('../views/cluster/detail/Detail')

const ComposeLayout = () => import('../views/compose')
const ComposeList = () => import('../views/compose/list/List')
const ComposeDetail = () => import('../views/compose/detail/Detail')

const UserGroupLayout = () => import('../views/user-group')
const UserGroupList = () => import('../views/user-group/list/List')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {
    path: '/application',
    redirect: '/application/list',
    name: '应用',
    icon: 'fa fa-cubes',
    component: Layout,
    hasDropdown: true,
    children: [
      { path: 'list', component: AppList, name: '应用列表', meta: { role: ['get-apps'] } },
      { path: 'detail/:id', component: AppDetail, name: '应用详情', hidden: true, meta: { role: ['get-apps'] } },
      { path: 'instances/:host/:id/:slaveId', component: AppInstance, name: '实例详情', hidden: true, meta: { role: ['get-apps'] } },
      {
        path: 'compose',
        redirect: '/application/compose/list',
        component: ComposeLayout,
        name: '编排',
        hasDropdown: true,
        meta: { role: ['get-compose'] },
        children: [
          { path: 'list', component: ComposeList, name: '编排列表', meta: { role: ['get-compose'] } },
          { path: 'detail/:id', component: ComposeDetail, name: '编排详情', hidden: true, meta: { role: ['get-compose'] } }
        ]
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/resource',
    redirect: '/resource/cluster',
    name: '资源',
    icon: 'fa fa-server',
    component: Layout,
    hasDropdown: true,
    children: [
      {
        path: '/resource/cluster',
        redirect: '/resource/cluster/list',
        name: '集群',
        component: ClusterLayout,
        meta: { role: ['get-cluster'] },
        children: [
          { path: 'list', component: ClusterList, name: '集群列表' },
          { path: 'detail/:name', component: ClusterDetail, name: '集群详情', hidden: true }
        ]
      }
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
      { path: 'list', component: RegistryList, name: '镜像列表', meta: { role: ['get-registry'] } },
      { path: 'histories', component: HistoryList, name: '历史列表', meta: { role: ['get-registry-histry'] } },
      { path: 'detail/:name', component: WareHouse, name: '镜像仓库', hidden: true, meta: { role: ['get-registry'] } }
    ]
  },
  {
    path: '/cicd',
    redirect: '/cicd/list',
    name: '镜像构建',
    icon: 'fa fa-building',
    component: Layout,
    meta: { role: ['get-cicd', 'get-cicd-auth'] },
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
    meta: { role: ['get-policy'] },
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
    meta: { role: ['get-logs'] },
    children: [
      { path: 'list', component: LogList, name: '日志查询' }
    ]
  },
  {
    path: '/system',
    redirect: '/system/usrgroup',
    name: '系统',
    icon: 'fa fa-user-o',
    component: Layout,
    hasDropdown: true,
    children: [
      {
        path: '/system/usrgroup',
        redirect: '/system/usrgroup/list',
        name: '组管理',
        component: UserGroupLayout,
        meta: { role: ['get-usergroup'] },
        children: [
          { path: 'list', component: UserGroupList, name: '用户组列表' }
        ]
      }
    ]
  },
  { path: '*', redirect: '/application', hidden: true }
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

