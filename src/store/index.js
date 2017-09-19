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
import cmpTemplate from './compose-template'
import cluster from './cluster'
import eams from './eams'
import tenant from './tenant'
import minihost from './minihost'
import host from './host'
import ipPools from './ip-pools'
import networks from './networks'

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
    cmpTemplate,
    cluster,
    eams,
    tenant,
    minihost,
    host,
    ipPools,
    networks
  }
})
