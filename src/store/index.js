import Vuex from 'vuex'
import Vue from 'vue'
import app from './app'
import registry from './registry'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    registry
  }
})
