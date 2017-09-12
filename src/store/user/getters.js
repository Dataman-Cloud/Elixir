function findCurGroup (groups = [], curGroupId) {
  return groups.find(group => group.groupId === curGroupId)
}

export default {
  currentGroupId: state => state.currentGroupId,
  currentGroupName: state => state.currentGroupName,
  isCollapse: state => state.isCollapse,
  // 平台管理员
  isPlatform: state => {
    let curGroup = findCurGroup(state.accountGroups, state.currentGroupId)
    return curGroup ? curGroup.role === 'platform' : false
  },
  // 组管理员
  isOwner: state => {
    let curGroup = findCurGroup(state.accountGroups, state.currentGroupId)
    return curGroup ? curGroup.role === 'owner' : false
  },
  // 租户
  isTenant: state => {
    let curGroup = findCurGroup(state.accountGroups, state.currentGroupId)
    return curGroup ? curGroup.role === 'superuser' : false
  },
  // 普通成员
  isMember: state => {
    let curGroup = findCurGroup(state.accountGroups, state.currentGroupId)
    return curGroup ? curGroup.role === 'member' : false
  }
}
