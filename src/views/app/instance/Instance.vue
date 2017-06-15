<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>
        {{instanceId}}
      </h3>
    </div>

    <el-tabs type="border-card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane label="监控" name="monitor"></el-tab-pane>

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
  import {Monitor} from './tabs'

  export default {
    components: {
      monitor: Monitor
    },
    data () {
      return {
        instanceId: this.$route.params.id,
        currentView: 'monitor'
      }
    },
    computed: {},
    methods: {
      tabChange (tab, event) {
        this.currentView = tab.name
      }
    },
    beforeRouteEnter (to, from, next) {
      next()
    },
    watch: {
      $route (to) {
      }
    }
  }
</script>

