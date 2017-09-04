import * as type from './mutations_types'

export default {
  [type.FETCH_COMPOSE_TEMPLATES] (state, cmpTemplates = []) {
    state.cmpTemplates.cmpTemplates = cmpTemplates
    state.cmpTemplates.total = state.cmpTemplates.cmpTemplates.length
  },
  [type.FETCH_COMPOSE_TEMPLATE] (state, cmpTemplate = {}) {
    state.cmpTemplate = cmpTemplate
  }
}
