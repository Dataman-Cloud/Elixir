/**
 * Created by lixiaoyan on 2017/7/7.
 */
import fetch from '@/utils/fetch'

export function cicdList () {
  return fetch({
    url: 'v1/cicd/jenkins/jobs',
    method: 'get'
  })
}

export function cicdDetails (name) {
  return fetch({
    url: `v1/cicd/jenkins/jobs/${name}/details`,
    method: 'get'
  })
}

export function cicdBuild (name) {
  return fetch({
    url: `v1/cicd/jenkins/jobs/${name}/build`,
    method: 'get'
  })
}

export function logDetail (jobName, buildNum) {
  return fetch({
    url: `v1/cicd/jenkins/jobs/${jobName}/log/${buildNum}`,
    method: 'get'
  })
}

export function cicdDelete (name) {
  return fetch({
    url: `v1/cicd/jenkins/jobs/${name}`,
    method: 'DELETE'
  })
}

export function create (data) {
  return fetch({
    url: `v1/cicd/jenkins/jobs`,
    method: 'post',
    data: data
  })
}

export function build (data, jobid) {
  return fetch({
    url: `/v1/cicd/jenkins/jobs/${jobid}/build`,
    method: 'post',
    params: data
  })
}

export function jenkins () {
  return fetch({
    url: 'v1/cicd/jenkins/credential/git',
    method: 'get'
  })
}

export function manage (data) {
  return fetch({
    url: 'v1/cicd/jenkins/credential',
    method: 'post',
    params: data
  })
}

export function manageDel (id) {
  return fetch({
    url: `v1/cicd/jenkins/credential/${id}`,
    method: 'delete'
  })
}

export function listJenkins () {
  return fetch({
    url: 'v1/cicd/jenkins/credential',
    method: 'get'
  })
}

