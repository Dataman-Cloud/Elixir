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
