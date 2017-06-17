import fetch from '@/utils/fetch'

export function getAppOther (id) {
  return fetch({
    url: `/apps/${id}/other`,
    method: 'get'
  })
}

export function mockOthers () {
  return fetch({
    url: `/apps/others`,
    method: 'get'
  })
}
