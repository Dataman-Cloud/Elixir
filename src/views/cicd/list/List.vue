<template>
  <div>
    <el-tabs type="card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane name="jobs">
        <span class="el-tab-label" slot="label">
          <a></a>项目列表</span>
      </el-tab-pane>
      <el-tab-pane name="jenkins">
        <span class="el-tab-label" slot="label">
          <a></a>认证列表</span>
      </el-tab-pane>
      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
import { Jobs, Jenkins } from './tabs'

export default {
  components: {
    jobs: Jobs,
    jenkins: Jenkins
  },
  data () {
    return {
      currentView: 'jobs'
    }
  },
  methods: {
    tabChange (tab, event) {
      this.currentView = tab.name
    }
  }
}
</script>
<style scoped>

</style>
