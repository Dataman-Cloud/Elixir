import fetch from '@/utils/fetch'

export function networksList () {
  return fetch({
    url: 'v1/network',
    method: 'get'
  })
}

export function addNetworks (data) {
  return fetch({
    url: 'v1/network',
    method: 'post',
    data: data
  })
}
