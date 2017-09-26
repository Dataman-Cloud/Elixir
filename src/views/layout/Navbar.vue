<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="navicon">
      <i class="fa fa-bars" aria-hidden="true" @click="toggleSideBar"></i>
    </div>
    <Breadcrumb class="bread-header"></Breadcrumb>
    <el-select class="userGroup" v-model="userGroup" placeholder="请选择" @change="changeGroup">
      <el-option v-for="group in accountGroups" :key="group.id" :label="group.group.name" :value="group.groupId">
      </el-option>
    </el-select>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <i style="font-size:24px;" class="fa fa-user-circle" aria-hidden="true"></i>
        <i class="el-icon-caret-bottom el-icon-caret-center"></i>
        <span class="userName">{{user.name}}</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item v-if="isPlatform" divided>
          <span @click="openDialog" style="display:block;">权限管理</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="exit" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <Rights-Management-Dialog ref="rightsManagement"></Rights-Management-Dialog>

  </el-menu>
</template>

<script>
import Breadcrumb from './Breadcrumb'
import { mapActions, mapState, mapGetters } from 'vuex'
import * as type from '@/store/user/mutations_types'
import RightsManagementDialog from '@/views/layout/modals/RightsManagementDialog'

export default {
  components: {
    Breadcrumb,
    RightsManagementDialog
  },
  data () {
    return {
      userGroup: this.$store.state.user.currentGroupId
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.user.isCollapse,
      accountGroups: state => state.user.accountGroups,
      currentGroupId: state => state.user.currentGroupId,
      user (state) {
        return state.user
      }
    }),
    ...mapGetters([
      'isPlatform'
    ])
  },
  methods: {
    ...mapActions({
      logout: type.LOGOUT,
      setCollapse: type.SET_COLLAPSE,
      switchGroup: type.SWITCH_USER_GROUP
    }),
    async exit () {
      await this.logout()
      location.reload()
    },
    changeGroup (groupId) {
      this.switchGroup(groupId)
    },
    openDialog () {
      this.$refs.rightsManagement.open()
    },
    toggleSideBar () {
      this.setCollapse(!this.isCollapse)
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
  .userGroup {
    width: 180px;
  }
  .userName {
    display: inline-block;
    padding: 0 5px;
    width: 60px;
    overflow: hidden;
    height: 30px;
    line-height: 43px;
    text-overflow: ellipsis;
    white-space: nowrap;
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

