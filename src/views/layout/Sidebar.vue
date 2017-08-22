<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router unique-opened theme="dark" :collapse="isCollapse">
    <sidebar-item :routes="routers"></sidebar-item>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapState({
      routers: state => state.permissions.routers,
      isCollapse: state => state.user.isCollapse
    })
  }
}
</script>
<style>
.el-menu--collapse>div>.el-menu-item span,
.el-menu--collapse>div>.el-submenu>.el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

.el-menu--collapse>div>.el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
  display: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}
</style>

