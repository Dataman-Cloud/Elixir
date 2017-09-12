import fetch from '@/utils/fetch'

export function selectCluster () {
  return fetch({
    url: 'v1/clusters',
    method: 'get'
  })
}

export function selectApps (cluster) {
  return fetch({
    url: `v1/simple/cluster/${cluster}/apps`,
    method: 'get'
  })
}

export function selectTasks (app) {
  return fetch({
    url: `v1/apps/${app}/tasks`,
    method: 'get'
  })
}

export function query (data) {
  return fetch({
    url: 'v1/logger/eslogger',
    method: 'post',
    data: data
  })
}

export function download (data) {
  return fetch({
    url: 'v1/logger/downloadESLogger',
    method: 'get',
    params: {
      json: data
    }
  })
}

