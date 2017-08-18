<template>
  <el-tabs type="card" :value="activeName" @tab-click="onTabClick">
    <el-tab-pane v-for="item in routes" v-if="!item.hidden" :label="item.name" :name="item.name" :key="item.name">
      <span class="el-tab-label" slot="label"><a></a>{{item.name}}</span>
    </el-tab-pane>
    <slot></slot>
  </el-tabs>
</template>
<script>
import router from '@/router'
export default {
  data () {
    return {}
  },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    activeName () {
      return this.$route.matched[0].name
    }
  },
  methods: {
    onTabClick (tab) {
      router.push({ name: tab.name })
    }
  }
}
</script>

