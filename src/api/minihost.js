import fetch from '@/utils/fetch'

export function listApp () {
  return fetch({
    url: 'v1/apps/user/list',
    method: 'get'
  })
}
