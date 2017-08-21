<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened theme="dark">
    <sidebar-item :routes='routers'></sidebar-item>
  </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'
import { mapState } from 'vuex'

export default {
  components: { SidebarItem },
  computed: {
    ...mapState({
      routers: state => state.permissions.routers
    })
  },
  methods: {}
}
</script>
<style>
.sidebar-container .el-menu-item {
  width: 100%!important;
  min-height: 100%;
}

.sidebar-container .el-submenu__title i,
.sidebar-container .el-menu-item i {
  margin-right: 16px;
}
</style>

