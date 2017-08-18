<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened theme="dark">
    <sidebar-item :routes='routes'></sidebar-item>
  </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  methods: {}
}
</script>

