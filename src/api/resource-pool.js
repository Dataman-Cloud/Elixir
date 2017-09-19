import fetch from '@/utils/fetch'

export function hostList () {
  return fetch({
    url: `v1/host`,
    method: 'get'
  })
}

export function delHost (data) {
  return fetch({
    url: 'v1/tenants/deleteHost',
    method: 'post',
    data: data
  })
}

export function maintain (data) {
  return fetch({
    url: `v1/host/maintain`,
    method: 'post',
    data: data
  })
}
