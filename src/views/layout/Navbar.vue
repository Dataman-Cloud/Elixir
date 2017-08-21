<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="navicon">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <Breadcrumb class="bread-header"></Breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <i style="font-size:24px;" class="fa fa-user-circle" aria-hidden="true"></i>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="exit" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import { mapActions } from 'vuex'
import * as type from '@/store/user/mutations_types'

export default {
  components: {
    Breadcrumb
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      logout: type.LOGOUT
    }),
    toggleSideBar () {
      // TODO
    },
    async exit () {
      await this.logout()
      location.reload()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .bread-header {
    height: 50px;
    line-height: 50px;
    display: inline-block;
    position: absolute;
    margin-left: 15px;
  }
  .navicon {
    display: inline-block;
    margin-left: 15px;
    cursor: pointer;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

