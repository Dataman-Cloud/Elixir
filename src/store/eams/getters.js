export default {
  octopusList: (state) => {
    return state.eamsList.filter(eams => {
      return eams.name.indexOf('octopus-') > -1
    })
  }
}
