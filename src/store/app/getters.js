import _ from 'lodash'
import {countHealthyState} from '@/views/app/services/app'

export default {
  oneContainer: state => checkOneHost(state.app.constraints),
  selectCluster: state => getSelectCluster(state.app.constraints),
  prolongations: state => getProlongations(state.app.prolongation)
}

function checkOneHost (constraints = []) {
  return constraints.some(item => item.attribute === 'hostname')
}

function getSelectCluster (constraints = []) {
  return constraints.find(item => item.attribute === 'vcluster') ? constraints.find(item => item.attribute === 'vcluster').value : ''
}

function getProlongations (topology = {}) {
  return _.toPairs(topology).map(apps => {
    if (Array.isArray(apps[1])) {
      apps[1] = apps[1].map(app => countHealthyState(app))
    }
    return apps
  })
}
