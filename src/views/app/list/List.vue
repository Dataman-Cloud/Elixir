<template>
  <div>
    <el-tabs type="card" :value="currentView" @tab-click="tabChange">
      <el-tab-pane name="appList">
        <span class="el-tab-label" slot="label"><a></a>应用列表</span>
      </el-tab-pane>
      <el-tab-pane name="composeList">
        <span class="el-tab-label" slot="label"><a></a>编排列表</span>
      </el-tab-pane>

      <transition name="fade" mode="out-in">
        <component v-bind:is="currentView"></component>
      </transition>
    </el-tabs>
  </div>
</template>
<script>
  import { AppList, ComposeList } from './tabs'

  export default {
    components: {
      appList: AppList,
      composeList: ComposeList
    },
    data () {
      return {
        currentView: 'appList'
      }
    },
    methods: {
      tabChange (tab, event) {
        this.currentView = tab.name
      }
    }
  }
</script>

