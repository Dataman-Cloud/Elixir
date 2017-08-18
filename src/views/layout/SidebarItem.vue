<template>
  <div class='menu-wrapper'>
    <template v-for="(item, index) in routes">
      <router-link v-if="!item.hidden&&!item.hasDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="index">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-hasDropdown'>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="item.name" v-if="item.hasDropdown&&!item.hidden" :key="index">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>
        <template v-for="(child, childIndex) in item.children" v-if='!child.hidden'>
          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="childIndex"> </sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="childIndex">
            <el-menu-item :index="item.path+'/'+child.path">
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>
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

</style>

