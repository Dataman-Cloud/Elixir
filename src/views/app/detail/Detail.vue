<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>
        {{appId}}
      </h3>
    </div>

    <el-tabs type="border-card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane label="实例" name="instances"></el-tab-pane>
      <el-tab-pane label="配置" name="config"></el-tab-pane>
      <el-tab-pane label="调试" name="debug"></el-tab-pane>

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
  import {Instances, Config, Debug} from './tabs'
  import {mapState} from 'vuex'
  import store from '@/store'
  import * as type from '@/store/app/mutations_types'

  export default {
    components: {
      instances: Instances,
      config: Config,
      debug: Debug
    },
    data () {
      return {
        currentView: 'instances'
      }
    },
    computed: {
      ...mapState({
        appId (state) {
          return state.app.app.id
        }
      })
    },
    methods: {
      tabChange (tab, event) {
        this.currentView = tab.name
      }
    },
    beforeRouteEnter (to, from, next) {
      store.dispatch(type.FETCH_APP, to.params.id)
        .then(() => next())
    },
    watch: {
      $route (to) {
        this.$store.dispatch(type.FETCH_APP, this.$route.params.id)
      }
    }
  }
</script>

