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
