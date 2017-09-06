import fetch from '@/utils/fetch'

export function listTemplate () {
  return fetch({
    url: 'v1/composeTemplates',
    method: 'get'
  })
}

export function getTemplate (id) {
  return fetch({
    url: `v1/composeTemplates/${id}`,
    method: 'get'
  })
}

export function deleteTemplate (id) {
  return fetch({
    url: `v1/composeTemplate/${id}`,
    method: 'delete'
  })
}

export function createTemplate (data) {
  return fetch({
    url: `v1/composeTemplate`,
    method: 'post',
    data: data
  })
}

export function updateTemplate (data) {
  return fetch({
    url: 'v1/composeTemplate',
    method: 'put',
    data: data
  })
}

export function deployTemplate (data) {
  return fetch({
    url: 'v1/deploy/composes-ng',
    method: 'post',
    data: data
  })
}
