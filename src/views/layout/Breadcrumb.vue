<template>
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
        <router-link v-else :to="item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
      created () {
        this.getBreadcrumb()
      },
      data () {
        return {
          levelList: null
        }
      },
      methods: {
        getBreadcrumb () {
          this.levelList = this.$route.matched.filter(item => item.name)
        }
      },
      watch: {
        $route () {
          this.getBreadcrumb()
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
