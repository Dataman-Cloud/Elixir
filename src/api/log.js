import fetch from '@/utils/fetch'

export function selectCluster () {
  return fetch({
    url: 'v1/vclusters',
    method: 'get'
  })
}

export function selectApps (cluster = 'dataman') {
  return fetch({
    url: `v1/simple/cluster/${cluster}/apps`,
    method: 'get'
  })
}

export function selectTasks (app) {
  return fetch({
    url: `v2/apps/${app}/tasks`,
    method: 'get'
  })
}

