<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <i class="glyphicon glyphicon-repeat"></i>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="ion-ios-plus-outline"></i> 新建用户
        </el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>
    <el-table ref="userTable" :data="filterUsers" border tooltip-effect="dark" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="currentGroupName" label="所属组">
        <template scope="user">
          <p v-for="(group, index) in user.row.accountGroups" :key="index">{{group.group.name}} / {{group.role}}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template scope="scope">
          <span>{{scope.row.createAt | formatTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template scope="scope">
          <el-button size="small">启动</el-button>
          <el-button size="small">停止</el-button>
          <el-dropdown style="margin-left: 10px" trigger="click">
            <el-button size="small" type="primary">
              更多
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>编辑组</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as type from '@/store/user/mutations_types'

export default {
  data () {
    return {
      listLoading: false,
      searchWord: ''
    }
  },
  computed: {
    ...mapState({
      users (state) {
        return state.user.users.users
      }
    }),
    filterUsers: function () {
      return this.searchWord ? this.users.filter(user => user.name.toLowerCase().includes(this.searchWord)) : this.users
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: type.FETCH_USERS
    }),
    listUser () {
      this.listLoading = true
      return this.fetchUsers()
        .then(() => (this.listLoading = false))
        .catch(() => (this.listLoading = false))
    },
    openCreate () {

    },
    openDelete () {

    },
    reload () {

    }
  },
  mounted () {
    this.listUser()
  }
}
</script>
<style scope>
.btn-group {
  justify-content: space-between;
}
</style>

