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
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}`,
    method: 'get'
  })
}

export function deleteApp (id) {
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}`,
    method: 'delete'
  })
}

export function deleteApps (appIds = []) {
  return fetch({
    url: `v1/apps/delete`,
    method: 'put',
    data: appIds
  })
}

export function start (id) {
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}/start`,
    method: 'put'
  })
}

export function stop (id) {
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}/stop`,
    method: 'put'
  })
}

export function extend (id, instances) {
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}/scale`,
    method: 'put',
    data: instances
  })
}

export function create (data) {
  return fetch({
    url: `v1/apps`,
    method: 'post',
    data: data
  })
}

export function update (id, data) {
  id = window.btoa(id)
  return fetch({
    url: `v1/apps/${id}`,
    method: 'put',
    data: data
  })
}

export function createCanary (id, data) {
  id = window.btoa(id)
  return fetch({
    url: `/v1/apps/${id}/canary`,
    method: 'put',
    data: data
  })
}

export function changeWeight (id, data) {
  id = window.btoa(id)
  return fetch({
    url: `/v1/apps/${id}/weights`,
    method: 'put',
    data: data
  })
}

