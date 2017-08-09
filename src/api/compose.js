import fetch from '@/utils/fetch'

export function listCompose () {
  return fetch({
    url: 'v1/composes',
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

export function createCompose (data) {
  return fetch({
    url: `v1/composes`,
    method: 'post',
    data: data
  })
}
