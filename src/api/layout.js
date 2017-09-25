import fetch from '@/utils/fetch'

export function limitsList (roleName) {
  return fetch({
    url: `v1/roles/getRoles/${roleName}`,
    method: 'get'
  })
}

export function updateLimits (data) {
  return fetch({
    url: 'v1/roles/updateRoleByResourceIds',
    method: 'post',
    data: data
  })
}
