/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listRegistry () {
  return fetch({
    url: 'v1/registry/repositories/mine',
    method: 'get'
  })
}

export function deleteRegistry (deleteRegistry = {}) {
  let {Namespace, Image, LatestTag} = deleteRegistry
  return fetch({
    url: `v1/registry/manifests/${Namespace}/${Image}`,
    method: 'delete',
    params: {
      tag: LatestTag
    }
  })
}

export function listHistory (data) {
  return fetch({
    url: `v1/registry/audit`,
    method: 'get',
    params: {...data, ...{operation: 'DeleteManifests'}}
  })
}
