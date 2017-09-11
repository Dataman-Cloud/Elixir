import actions from './action'
import getters from './getters'
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
  currentGroupName: null,
  accountGroups: [],
  isCollapse: JSON.parse(localStorage.getItem('isCollapse')),
  users: {
    users: [],
    total: 0
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
