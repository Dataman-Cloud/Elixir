export default {
  oneContainer: state => checkOneHost(state.app.constraints),
  selectCluster: state => getSelectCluster(state.app.constraints)
}

function checkOneHost (constraints = []) {
  return constraints.some(item => item[0] === 'hostname')
}

function getSelectCluster (constraints = []) {
  return constraints.find(item => item[0] === 'vcluster') ? constraints.find(item => item[0] === 'vcluster')[2] : ''
}
