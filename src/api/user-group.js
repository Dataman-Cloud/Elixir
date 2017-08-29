import fetch from '@/utils/fetch'

export function userGroupList () {
  return fetch({
    url: 'v1/groups/getAll',
    method: 'get'
  })
}

export function createUserGroup (data) {
  return fetch({
    url: 'v1/groups/create',
    method: 'post',
    data: data
  })
}

export function groupUsersList (groupId) {
  return fetch({
    url: `v1/groups/${groupId}/accounts`,
    method: 'get'
  })
}

