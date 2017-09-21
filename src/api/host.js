import fetch from '@/utils/fetch'

export function addHost (vclusterLabel, data) {
  return fetch({
    url: `v1/clusters/${vclusterLabel}/nodes`,
    method: 'put',
    data: data
  })
}

export function clusterHostList () {
  return fetch({
    url: `v1/clusters/unbinding/nodes/ip/tenant`,
    method: 'get'
  })
}

export function delHost (vclusterLabel, slaveNodeIp) {
  return fetch({
    url: `/v1/clusters/${vclusterLabel}/nodes/${slaveNodeIp}`,
    method: 'delete'
  })
}

export function hostList () {
  return fetch({
    url: `v1/tenants/selectHostTenant`,
    method: 'get'
  })
}

export function removeHost (data) {
  return fetch({
    url: 'v1/tenants/giveupHost',
    method: 'post',
    data: data
  })
}
