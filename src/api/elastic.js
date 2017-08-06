/**
 * Created by lixiaoyan on 2017/7/11.
 */
import fetch from '@/utils/fetch'
import elasticUrl from 'elasticUrl'

export function policyList () {
  return fetch({
    url: `${elasticUrl}/v1/policy/policies`,
    method: 'get'
  })
}

export function getAppName () {
  return fetch({
    url: `${elasticUrl}/v1/policy/filterNames`,
    method: 'get'
  })
}

export function historyList (params = {}) {
  return fetch({
    url: `${elasticUrl}/v1/policy/capabilities`,
    method: 'get',
    params: params
  })
}

export function getPolicy (id) {
  return fetch({
    url: `${elasticUrl}/v1/policy/policies/${id}`,
    method: 'get'
  })
}

export function updatePolicy (data) {
  return fetch({
    url: `${elasticUrl}/v1/policy/update`,
    method: 'put',
    data: data
  })
}

export function createPolicy (data) {
  return fetch({
    url: `${elasticUrl}/v1/policy/create`,
    method: 'post',
    data: data
  })
}

export function deletePolicy (id) {
  return fetch({
    url: `${elasticUrl}/v1/policy/${id}`,
    method: 'delete'
  })
}

