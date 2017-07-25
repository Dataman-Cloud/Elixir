/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listApp () {
  return fetch({
    url: 'esborg/apps',
    method: 'get'
  })
}

export function getApp (id) {
  return fetch({
    url: `esborg/apps/${id}`,
    method: 'get'
  })
}

export function deleteApp (id) {
  return fetch({
    url: `esborg/apps/${id}`,
    method: 'delete'
  })
}

// export function deleteApps (appIds = []) {
//   return fetch({
//     url: `v1/apps/delete`,
//     method: 'put',
//     data: appIds
//   })
// }

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

export function extend (id, taskCount) {
  return fetch({
    url: `esborg/apps/${id}/scale`,
    method: 'post',
    data: {scale: taskCount}
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
  return fetch({
    url: `v1/apps/${id}`,
    method: 'put',
    data: data
  })
}

export function instances (appId) {
  return fetch({
    url: `esborg/apps/${appId}/tasks`,
    method: 'get'
  })
}

export function versions (appId) {
  return fetch({
    url: `esborg/apps/${appId}/versions`,
    method: 'get'
  })
}

export function curVersion (appId) {
  return fetch({
    url: `esborg/apps/${appId}/currentversion`,
    method: 'get'
  })
}
