import actions from './action'
import mutations from './mutations'

const state = {
  id: null,
  name: '',
  email: '',
  phone: '',
  title: '',
  userName: '',
  currentPerms: [],
  currentGroupId: null,
  accountGroups: [],
  isCollapse: JSON.parse(localStorage.getItem('isCollapse'))
}

export default {
  state,
  actions,
  mutations
}
