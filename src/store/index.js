import Vuex from 'vuex'
import Vue from 'vue'
import app from './app'
import registry from './registry'
import user from './user'
import permissions from './permissions'
import cicd from './cicd'
import elastic from './elastic'
import log from './log'
import compose from './compose'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    registry,
    user,
    permissions,
    cicd,
    elastic,
    log,
    compose
  }
})
