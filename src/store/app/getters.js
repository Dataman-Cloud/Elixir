export default {
  isOneHost: state => checkOneHost(state.app.constraints)
}

function checkOneHost (constraints = []) {
  return constraints.some(item => item[0] === 'hostname')
}
