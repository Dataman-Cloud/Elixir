/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listRegistry () {
  return fetch({
    url: 'v1/api/repositories',
    method: 'get'
  })
}

export function tagDetail (name) {
  return fetch({
    url: 'v1/api/tags',
    method: 'get',
    params: {
      repositoryName: name
    }
  })
}

export function listLogs () {
  return fetch({
    url: 'v1/api/logs',
    method: 'get'
  })
}

export function deleteHarbor (name) {
  return fetch({
    url: 'v1/api/repository',
    method: 'delete',
    params: {
      repositoryName: name
    }
  })
}

export function deleteTags (name, tagName) {
  return fetch({
    url: 'v1/api/repository/tag',
    method: 'delete',
    params: {
      repositoryName: name,
      tagName: tagName
    }
  })
}

