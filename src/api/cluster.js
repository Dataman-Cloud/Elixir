/**
 * Created by my9074 on 2017/6/7.
 */
import fetch from '@/utils/fetch'

export function listCluster () {
  return fetch({
    url: 'services/v1/vclusters',
    method: 'get'
  })
}
