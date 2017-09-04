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
    url: `v1/composeTemplates/${id}`,
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
