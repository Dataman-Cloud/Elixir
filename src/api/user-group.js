import fetch from '@/utils/fetch'

export function userGroupList () {
  return fetch({
    url: 'v1/groups/getAll',
    method: 'get'
  })
}
