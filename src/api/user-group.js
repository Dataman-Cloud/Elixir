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

export function getGroup (groupId) {
  return fetch({
    url: `v1/groups/getGroup/${groupId}`,
    method: 'get'
  })
}

export function updateGroup (data) {
  return fetch({
    url: 'v1/groups/update',
    method: 'put',
    data: data
  })
}

export function delGroup (groupId) {
  return fetch({
    url: `v1/groups/delete/${groupId}`,
    method: 'delete'
  })
}
