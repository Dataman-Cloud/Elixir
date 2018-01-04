/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listRegistry (page, search) {
  return fetch({
    url: 'v1/api/repositories',
    method: 'get',
    params: {
      page: !page ? 1 : page,
      q: !search ? '' : search
    }
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

export function deleteHarbor (projectid, name) {
  return fetch({
    url: 'v1/api/repository',
    method: 'delete',
    params: {
      auth: projectid,
      repositoryName: name
    }
  })
}

export function deleteTags (projectid, name, tagName) {
  return fetch({
    url: 'v1/api/repository/tag',
    method: 'delete',
    params: {
      auth: projectid,
      repositoryName: name,
      tagName: tagName
    }
  })
}

