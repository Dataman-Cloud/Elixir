<template>
  <div>
    <div style="margin-bottom: 20px;">
      <h3>
        {{jobName}}
      </h3>
    </div>

    <el-tabs type="card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane name="version">
        <span class="el-tab-label" slot="label"><a></a>版本</span>
      </el-tab-pane>
      <!--<el-tab-pane name="event">-->
        <!--<span class="el-tab-label" slot="label"><a></a>事件</span>-->
      <!--</el-tab-pane>-->

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
  import {Version, Event} from './tabs'
  import store from '@/store'
  import * as type from '@/store/cicd/mutations_types'

  export default {
    beforeRouteEnter (to, from, next) {
      store.dispatch(type.FETCH_CICD, to.params.name)
        .then(() => next())
    },
    components: {
      Version: Version,
      Event: Event
    },
    data () {
      return {
        jobName: this.$route.params.name,
        currentView: 'version'
      }
    },
    methods: {
      tabChange (tab, event) {
        this.currentView = tab.name
      }
    },
    watch: {
      $route (to) {
        this.$store.dispatch(type.FETCH_CICD, this.$route.params.name)
      }
    }
  }
</script>
<style scoped>

</style>
