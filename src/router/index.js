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

const CmpList = () => import('../views/compose-template/list/List')

const UserGroupLayout = () => import('../views/user-group')
const UserGroupList = () => import('../views/user-group/list/List')

const TenantLayout = () => import('../views/tenant')
const TenantList = () => import('../views/tenant/list/List')

const UserLayout = () => import('../views/user')
const UserList = () => import('../views/user/list/List')

const OctCreate = () => import('../views/eams/octopus/Create')
const SqdCreate = () => import('../views/eams/squid/Create')
const OctList = () => import('../views/eams/octopus/List')
const SqdList = () => import('../views/eams/squid/List')
const MinihostCreate = () => import('../views/minihost/Create')
const MinihostList = () => import('../views/minihost/list/List')

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  {
    path: '/',
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
          { path: 'detail/:name', component: ClusterDetail, name: '集群详情', hidden: true, meta: { role: ['get-clusters-details'] } }
        ]
      }
    ]
  }
]

export const asyncRouterMap = [
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
        path: '/application/compose',
        redirect: '/application/compose/list',
        component: ComposeLayout,
        name: '编排',
        hasDropdown: true,
        meta: { role: ['get-compose'] },
        children: [
          { path: 'list', component: ComposeList, name: '编排列表', meta: { role: ['get-compose'] } },
          { path: 'detail/:id', component: ComposeDetail, name: '编排详情', hidden: true, meta: { role: ['get-compose'] } },
          { path: 'template-list', component: CmpList, name: '模板列表', meta: { role: ['get-compose'] } }
        ]
      }
    ]
  },
  {
    path: '/eams',
    name: 'EAMS',
    redirect: '/eams/oct-up',
    icon: 'fa fa-cubes',
    component: Layout,
    hasDropdown: true,
    children: [
      { path: 'oct-up', component: OctCreate, name: 'octopus创建', meta: { role: ['get-apps'] }, hidden: true },
      { path: 'squid-up', component: SqdCreate, name: 'squid创建', meta: { role: ['get-apps'] }, hidden: true },
      { path: 'oct-list', component: OctList, name: 'octopus', icon: 'iconfont icon-octopus-menu', meta: { role: ['get-apps'] } },
      { path: 'squid-list', component: SqdList, name: 'squid', icon: 'iconfont icon-squid-menu', meta: { role: ['get-apps'] } }
    ]
  },
  {
    path: '/mh',
    name: '迷你主机',
    redirect: '/mh/mh-up',
    icon: 'iconfont icon-minihost-menu',
    component: Layout,
    hasDropdown: true,
    children: [
      { path: 'mh-up', component: MinihostCreate, name: '胶囊主机创建', meta: { role: ['get-apps'] }, hidden: true },
      { path: 'mh-list', component: MinihostList, name: '迷你主机列表', meta: { role: ['get-apps'] } }
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
        path: '/system/user',
        redirect: '/system/user/list',
        name: '用户管理',
        component: UserLayout,
        meta: { role: ['get-user'] },
        children: [
          { path: 'list', component: UserList, name: '用户列表' }
        ]
      },
      {
        path: '/system/usrgroup',
        redirect: '/system/usrgroup/list',
        name: '组管理',
        component: UserGroupLayout,
        meta: { role: ['get-usergroup'] },
        children: [
          { path: 'list', component: UserGroupList, name: '用户组列表' }
        ]
      },
      {
        path: '/system/tenant',
        redirect: '/system/tenant/list',
        name: '租户管理',
        component: TenantLayout,
        meta: { role: ['tenant-manager'] },
        children: [
          { path: 'list', component: TenantList, name: '租户列表' }
        ]
      }
    ]
  },
  { path: '*', redirect: '/', hidden: true }
]

const router = new Router({
  mode: 'history',
  base: '/ui/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router
