<template>
  <div>
    <template v-for="(item, index) in routes">
      <el-menu-item :key="index" v-if="!item.hidden&&!item.hasDropdown&&item.children.length>0" :index="item.path+'/'+item.children[0].path">
        <i :class="item.icon" aria-hidden="true"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>

      <el-submenu :index="item.name" v-if="item.hasDropdown&&!item.hidden" :key="index">
        <template slot="title">
          <i :class="item.icon" aria-hidden="true"></i>
          <span>{{item.name}}</span>
        </template>
        <template v-for="(child, childIndex) in item.children" v-if='!child.hidden'>
          <sidebar-item v-if='child.children&&child.children.length>0' :routes='[child]' :key="childIndex"> </sidebar-item>

          <el-menu-item v-else :index="item.path+'/'+child.path" :key="childIndex">
            <span>{{child.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style scoped>
.el-submenu .el-menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0 45px;
  min-width: 160px;
}
</style>

