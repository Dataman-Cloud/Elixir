import Vuex from 'vuex'
import Vue from 'vue'
import app from './app'
import registry from './registry'
import user from './user'
import cicd from './cicd'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    registry,
    user,
    cicd
  }
})
