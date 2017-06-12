/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listApp () {
  return fetch({
    url: 'v1/apps/user/list',
    method: 'get'
  })
}

export function getApp (id) {
  return fetch({
    url: `v1/apps/${id}`,
    method: 'get'
  })
}

export function deleteApp (id) {
  return fetch({
    url: `v1/apps/${id}`,
    method: 'delete'
  })
}

export function start (id) {
  return fetch({
    url: `v1/apps/${id}/start`,
    method: 'put'
  })
}

export function stop (id) {
  return fetch({
    url: `v1/apps/${id}/stop`,
    method: 'put'
  })
}

export function extend (id, instances) {
  return fetch({
    url: `v1/apps/${id}`,
    method: 'put',
    data: instances
  })
}
