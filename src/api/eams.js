import fetch from '@/utils/fetch'

export function createCompose (data) {
  return fetch({
    url: `v1/composes`,
    method: 'post',
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

export function listCompose () {
  return fetch({
    url: 'v1/composes-ng',
    method: 'get'
  })
}

export function getCompose (id) {
  return fetch({
    url: `v1/composes/${id}`,
    method: 'get'
  })
}

export function deleteCompose (id) {
  return fetch({
    url: `v1/composes/${id}`,
    method: 'delete'
  })
}

export function createComposeNg (data) {
  return fetch({
    url: 'v1/composes-ng',
    method: 'post',
    data
  })
}

export function deleteComposeNg (name) {
  return fetch({
    url: `v1/composes-ng/${name}`,
    method: 'delete'
  })
}

export function clusterList () {
  return fetch({
    url: 'v1/clusters',
    method: 'get'
  })
}
