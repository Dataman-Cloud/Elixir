export default {
  minihostList: (state) => {
    return state.minihostApps.filter(mh => {
      return mh.name.indexOf('minihost-') > -1
    })
  }
}
