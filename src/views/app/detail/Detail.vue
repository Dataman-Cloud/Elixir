<template>
  <div>
    <el-tabs type="border-card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane label="实例" name="instance"></el-tab-pane>
      <el-tab-pane label="配置" name="config"></el-tab-pane>
      <el-tab-pane label="其他" name="other"></el-tab-pane>

      <component v-bind:is="currentView"></component>
    </el-tabs>
  </div>
</template>
<script>
  import {Instance, Config, Other} from './tabs'
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

