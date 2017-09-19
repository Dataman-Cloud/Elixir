import fetch from '@/utils/fetch'

export function ipPoolsList () {
  return fetch({
    url: 'v1/agents/ipam/subnets',
    method: 'get'
  })
}

export function createIpPools (data) {
  return fetch({
    url: 'v1/agents/ipam/subnets',
    method: 'post',
    data: data
  })
}
