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
