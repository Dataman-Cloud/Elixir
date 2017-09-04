import Vuex from 'vuex'
import Vue from 'vue'
import app from './app'
import registry from './registry'
import user from './user'
import userGroup from './user-group'
import permissions from './permissions'
import cicd from './cicd'
import elastic from './elastic'
import log from './log'
import compose from './compose'
import cluster from './cluster'
import host from './host'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    registry,
    user,
    userGroup,
    permissions,
    cicd,
    elastic,
    log,
    compose,
    cluster,
    host
  }
})
