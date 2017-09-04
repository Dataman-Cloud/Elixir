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
