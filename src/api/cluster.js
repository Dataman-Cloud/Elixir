import fetch from '@/utils/fetch'

export function clusterList () {
  return fetch({
    url: 'v1/clusters',
    method: 'get'
  })
}

export function clusterDetail (vclusterLabel) {
  return fetch({
    url: `v1/clusters/${vclusterLabel}/details`,
    method: 'get'
  })
}

export function create (data) {
  return fetch({
    url: 'v1/clusters',
    method: 'post',
    data: data
  })
}

export function delCluster (vclusterLabel) {
  return fetch({
    url: `/v1/clusters/${vclusterLabel}`,
    method: 'delete'
  })
}

export function hostrList (vclusterLabel) {
  return fetch({
    url: `/v1/clusters/${vclusterLabel}`,
    method: 'delete'
  })
}
