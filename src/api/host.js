import fetch from '@/utils/fetch'

export function hostList () {
  return fetch({
    url: `v1/tenants/selectHostTenant`,
    method: 'get'
  })
}

export function addHost (vclusterLabel, data) {
  return fetch({
    url: `v1/clusters/${vclusterLabel}/nodes`,
    method: 'put',
    data: data
  })
}

export function delHost (vclusterLabel, slaveNodeIp) {
  return fetch({
    url: `/v1/clusters/${vclusterLabel}/nodes/${slaveNodeIp}`,
    method: 'delete'
  })
}
