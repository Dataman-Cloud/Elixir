import fetch from '@/utils/fetch'
import _fetch from '@/utils/swanFetch'

export function listApp () {
  return _fetch({
    url: 'v1/apps',
    method: 'get'
  })
}

export function listTasks (appId) {
  return _fetch({
    url: `/v1/apps/${appId}/tasks`,
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

export function deleteApps (appIds = []) {
  return fetch({
    url: `v1/apps/delete`,
    method: 'put',
    data: appIds
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
    url: `v1/apps/${id}/scale`,
    method: 'put',
    data: instances
  })
}

export function create (data) {
  return _fetch({
    url: `v1/apps`,
    method: 'post',
    data: data
  })
}

export function update (id, data) {
  return fetch({
    url: `v1/apps/${id}`,
    method: 'put',
    data: data
  })
}

export function createCanary (id, data) {
  return fetch({
    url: `/v1/apps/${id}/canary`,
    method: 'put',
    data: data
  })
}

export function changeWeight (id, data) {
  return fetch({
    url: `/v1/apps/${id}/weights`,
    method: 'put',
    data: data
  })
}

export function listRegistry () {
  return fetch({
    url: 'v1/api/repositories',
    method: 'get'
  })
}

export function tagDetail (name) {
  return fetch({
    url: 'v1/api/tags',
    method: 'get',
    params: {
      repositoryName: name
    }
  })
}
