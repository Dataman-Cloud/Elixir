import actions from './action'
import mutations from './mutations'

const state = {
  name: '',
  token: '',
  roles: [],
  isCollapse: JSON.parse(localStorage.getItem('isCollapse'))
}

export default {
  state,
  actions,
  mutations
}
