/**
 * Created by lixiaoyan on 2017/7/11.
 */
import fetch from '@/utils/fetch'
import elasticUrl from 'elasticUrl'

export function policyList () {
  return fetch({
    url: `${elasticUrl}/policy/policies`,
    method: 'get'
  })
}

export function getAppName () {
  return fetch({
    url: `${elasticUrl}/app/filterNames`,
    method: 'get'
  })
}

export function historyList (params = {}) {
  return fetch({
    url: `${elasticUrl}/capability/capabilities`,
    method: 'get',
    params: params
  })
}

export function getPolicy (id) {
  return fetch({
    url: `${elasticUrl}/policy/policies/${id}`,
    method: 'get'
  })
}

export function updatePolicy (data) {
  return fetch({
    url: `${elasticUrl}/policy/update`,
    method: 'put',
    data: data
  })
}

export function createPolicy (data) {
  return fetch({
    url: `${elasticUrl}/policy/create`,
    method: 'post',
    data: data
  })
}

export function deletePolicy (id) {
  return fetch({
    url: `${elasticUrl}/policy/${id}`,
    method: 'delete'
  })
}

