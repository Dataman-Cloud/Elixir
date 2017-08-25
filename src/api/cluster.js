import fetch from '@/utils/fetch'

export function clusterList () {
  return fetch({
    url: 'v1/clusters',
    method: 'get'
  })
}

export function clusterDetail (vclusterLabel) {
  return fetch({
    url: `v1/clusters/${vclusterLabel}`,
    method: 'get'
  })
}
