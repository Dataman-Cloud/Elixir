<template>
  <el-dialog title="编辑用户组" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form :model="form" ref="form" label-width="100px">
      <div style="overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">

        <el-form-item label="添加用户组">
          <el-row :gutter="12">
            <el-col :span="9">
              <el-form-item :rules="[{ required: true, message: '请选择用户组' }]">
                <el-select @visible-change="openUserGroup" v-model="form.groupId">
                  <el-option v-for="(userGroup, index) in userGroups" :key="index" :value="userGroup.id" :label="userGroup.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item :rules="[{ required: true, message: '请选择组角色' }]">
                <el-select v-model="form.role">
                  <el-option value="owner" label="组管理员">组管理员</el-option>
                  <el-option value="member" label="组成员">组成员</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="addGroup(form)">
                <i class="el-icon-plus"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="group" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="group.name" label="用户组">
      </el-table-column>
      <el-table-column prop="role" label="角色">
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template scope="scope">
          <el-button size="small" @click="remoteGroup(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import * as type from '@/store/user/mutations_types'
import * as user from '@/api/user'
import * as group from '@/api/user-group'
export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      listLoading: false,
      group: [],
      userGroups: [],
      id: null,
      form: {
        groupId: '',
        role: ''
      }
    }
  },
  directives: {
    scroll: function (el, bind) {
      if (!bind.value) {
        el.scrollTop = 0
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: type.FETCH_USERS
    }),
    async addGroup (form) {
      form.accountId = this.id
      await user.joinGroup(form)
      let res = await user.getUser(this.id)
      this.group = res.data.accountGroups
    },
    async openUserGroup (flag) {
      if (flag) {
        let { data } = await group.userGroupList()
        this.userGroups = data
      }
    },
    async remoteGroup (row) {
      await user.removeUser(this.id, row.groupId)
      let res = await user.getUser(this.id)
      this.group = res.data.accountGroups
    },
    close () {
      this.resetForm()
      this.submitLoading = false
      this.fetchUsers()
    },
    open (id) {
      this.id = id
      user.getUser(this.id).then(res => this.updateInit(res))
      this.$refs.dialog.open()
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    updateInit (initFetchData) {
      this.group = initFetchData.data.accountGroups
    }
  }
}
</script>
<style scoped>
.el-form-item {
  margin-bottom: 30px;
}
</style>
