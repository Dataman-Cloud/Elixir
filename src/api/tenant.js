import fetch from '@/utils/fetch'

export function tenantsList () {
  return fetch({
    url: 'v1/tenants/getAll',
    method: 'get'
  })
}

export function tenantsDetail (tenantid) {
  return fetch({
    url: `v1/tenants/getTenant/${tenantid}`,
    method: 'get'
  })
}

export function createTenant (data) {
  return fetch({
    url: 'v1/tenants/create',
    method: 'post',
    data: data
  })
}

export function updateTenant (tenantid, data) {
  return fetch({
    url: `v1/tenants/updateTenant/${tenantid}`,
    method: 'put',
    data: data
  })
}

export function delTenant (tenantid) {
  return fetch({
    url: `v1/tenants/deleteTenant/${tenantid}`,
    method: 'delete'
  })
}

export function hostList () {
  return fetch({
    url: `v1/clusters/unbinding/nodes/ip`,
    method: 'get'
  })
}

export function addHost (data) {
  return fetch({
    url: 'v1/tenants/addHosts',
    method: 'post',
    data: data
  })
}

export function delHost (data) {
  return fetch({
    url: 'v1/tenants/deleteHost',
    method: 'post',
    data: data
  })
}

export function subnetList () {
  return fetch({
    url: `v1/simple/network`,
    method: 'get'
  })
}

export function getSubnets () {
  return fetch({
    url: 'v1/tenants/getSubnets',
    method: 'get'
  })
}

export function getStaticIp (cidr, vclusterLabel) {
  return fetch({
    url: 'v1/tenants/getStaticIp',
    method: 'get',
    params: {
      cidr: cidr,
      vclusterLabel: vclusterLabel
    }
  })
}
