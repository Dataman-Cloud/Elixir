<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>
        {{appId}}
      </h3>
    </div>

    <el-tabs type="border-card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane label="实例" name="instance"></el-tab-pane>
      <el-tab-pane label="配置" name="config"></el-tab-pane>
      <el-tab-pane label="其他" name="other"></el-tab-pane>

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
  import {Instance, Config, Other} from './tabs'
  import {mapState} from 'vuex'
  import store from '@/store'
  import * as type from '@/store/app/mutations_types'

  export default {
    components: {
      instance: Instance,
      config: Config,
      other: Other
    },
    data () {
      return {
        currentView: 'instance'
      }
    },
    computed: {
      ...mapState({
        appId (state) {
          return state.app.app.id.substr(1)
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

