import _ from 'lodash'
import {countHealthyState} from '@/views/app/services/app'

export default {
  oneContainer: state => checkOneHost(state.app.constraints),
  selectCluster: state => getSelectCluster(state.app.constraints),
  prolongations: state => getProlongations(state.app.PROLONGATION)
}

function checkOneHost (constraints = []) {
  return constraints.some(item => item[0] === 'hostname')
}

function getSelectCluster (constraints = []) {
  return constraints.find(item => item[0] === 'vcluster') ? constraints.find(item => item[0] === 'vcluster')[2] : ''
}

function getProlongations (topology = {}) {
  return _.toPairs(topology).map(apps => {
    if (Array.isArray(apps[1])) {
      apps[1] = apps[1].map(app => countHealthyState(app))
    }
    return apps
  })
}
