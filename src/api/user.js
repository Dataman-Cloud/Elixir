import fetch from '@/utils/fetch'

export function login (data) {
  return fetch({
    url: 'v1/accounts/login',
    method: 'post',
    data: data
  })
}

export function logout () {
  return fetch({
    url: 'v1/accounts/logout',
    method: 'post'
  })
}

export function getUserInfo () {
  return fetch({
    url: 'v1/accounts/aboutme',
    method: 'get'
  })
}

export function switchGroup (id) {
  return fetch({
    url: `v1/groups/currentgroup/${id}`,
    method: 'patch'
  })
}

export function createUser (data) {
  return fetch({
    url: 'v1/accounts/create',
    method: 'post',
    data: data
  })
}

export function userAll () {
  return fetch({
    url: 'v1/accounts/getAll',
    method: 'get'
  })
}

export function joinGroup (data) {
  return fetch({
    url: 'v1/accounts/joingroup',
    method: 'post',
    data: data
  })
}

export function removeUser (accountId, groupId) {
  return fetch({
    url: `v1/accounts/${accountId}/groups/${groupId}`,
    method: 'delete'
  })
}

export function delUser (accountId) {
  return fetch({
    url: `v1/accounts/delete/${accountId}`,
    method: 'delete'
  })
}

export function enableUser (accountId) {
  return fetch({
    url: `v1/accounts/${accountId}/enable`,
    method: 'put'
  })
}

export function disableUser (accountId) {
  return fetch({
    url: `v1/accounts/${accountId}/disable`,
    method: 'put'
  })
}

export function updateUser (data) {
  return fetch({
    url: 'v1/accounts/update',
    method: 'put',
    data: data
  })
}

export function getUser (accountId) {
  return fetch({
    url: `v1/accounts/getUser/${accountId}`,
    method: 'get'
  })
}

export function updatePwd (accountId, data) {
  return fetch({
    url: `v1/accounts/${accountId}/resetpassword`,
    method: 'put',
    data: data
  })
}
