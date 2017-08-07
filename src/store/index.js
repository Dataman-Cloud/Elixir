import Vuex from 'vuex'
import Vue from 'vue'
import app from './app'
import registry from './registry'
import user from './user'
import cicd from './cicd'
import elastic from './elastic'
import log from './log'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    registry,
    user,
    cicd,
    elastic,
    log
  }
})
