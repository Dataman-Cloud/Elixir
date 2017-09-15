<template>
  <div>
    <div class="btn-group">
      <span>
        <el-button type="primary" @click="reload">
          <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
        </el-button>
        <el-button type="primary" @click="openCreate">
          <i class="el-icon-plus"></i> 新建用户组</el-button>
      </span>
      <el-button-group style="display: flex">
        <el-input class="el-input-search" icon="search" v-model="searchWord" placeholder="请输入内容"></el-input>
      </el-button-group>
    </div>

    <create-dialog ref="createDialog"></create-dialog>
    <add-user-dialog ref="addUserDialog"></add-user-dialog>

    <el-table :data="groups" style="width: 100%" @expand="expand" v-loading="listLoading">
      <el-table-column type="expand">
        <template scope="group">
          <div class="btn-group">
            <span></span>
            <span>
              <el-button type="primary" @click="editorGroup(group.row)">
                <i class="el-icon-edit"></i> 修改用户组
              </el-button>

              <el-button type="danger" @click="delGroup(group.row)">
                <i class="el-icon-delete"></i> 删除用户组
              </el-button>
            </span>
          </div>
          <!-- <el-badge>集群列表</el-badge>
            <el-row>
              <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <div style="padding: 14px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                      <span class="time">正常主机 <i>1</i></span>
                    </div>
                    <div class="bottom clearfix">
                      <span class="time">异常主机 <i>2</i></span>
                      <el-button type="danger" class="button" icon="delete"></el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row> -->
          <el-badge>用户列表</el-badge>
          <div class="btn-group">
            <span>
              <el-button type="primary" @click="addUser(group.row)">
                <i class="el-icon-plus"></i> 添加新用户
              </el-button>

              <el-button type="danger" :disabled="!currentRow" @click="delUser(group.row)">
                <i class="el-icon-minus"></i> 移除用户
              </el-button>
            </span>
          </div>
          <el-table ref="multipleTable" :data="group.row.users" @selection-change="handleCurrentChange" border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" width="130">
            </el-table-column>
            <el-table-column prop="currentPerms" label="权限" width="120">
            </el-table-column>
            <el-table-column prop="createAt" label="创建时间" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="组名称" prop="name">
      </el-table-column>
      <el-table-column label="描述" prop="description">
      </el-table-column>
      <el-table-column label="创建时间" prop="createAt">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import * as user from '@/api/user'
import { mapState, mapActions } from 'vuex'
import * as userGroups from '@/api/user-group'
import Confirm from '@/utils/confirm'
import CreateDialog from '@/views/user-group/modals/CreateDialog'
import AddUserDialog from '@/views/user-group/modals/AddUserDialog'
import * as type from '@/store/user-group/mutations_types'

export default {
  components: {
    CreateDialog,
    AddUserDialog
  },
  data () {
    return {
      listLoading: false,
      searchWord: '',
      groupId: '',
      currentRows: []
    }
  },
  computed: {
    ...mapState({
      groups (state) {
        return state.userGroup.groups.groups
      },
      currentRow: function () {
        return this.currentRows.length === 1 ? this.currentRows[0] : null
      }
    })
  },
  methods: {
    ...mapActions({
      fetchUserGroups: type.FETCH_USER_GROUPS
    }),
    addUser (groupId) {
      this.$refs.addUserDialog.open(groupId)
    },
    async delUser (group) {
      await Confirm.open(`确认移除改用户?`)
      await user.removeUser(this.currentRows.map(user => user.id), group.id)
      this.$notify({ message: '删除成功' })
      let { data } = await userGroups.groupUsersList(group.id)
      group.users = data
    },
    async expand (row, expanded) {
      if (expanded) {
        let { data } = await userGroups.groupUsersList(row.id)
        this.$set(row, 'users', data)
      }
    },
    async delGroup (group) {
      await Confirm.open(`确认删除改组?`)
      await userGroups.delGroup(group.id)
      this.$notify({ message: '删除成功' })
      this.$store.dispatch(type.FETCH_USER_GROUPS)
    },
    editorGroup (group) {
      this.$refs.createDialog.open(group.id)
    },
    handleCurrentChange (val) {
      this.currentRows = val
    },
    async listGroup () {
      this.listLoading = true
      await this.fetchUserGroups().catch(() => { })
      this.listLoading = false
    },
    reload () {
      this.listGroup()
    },
    openCreate () {
      this.$refs.createDialog.open()
    }
  },
  created () {
    this.listGroup()
  }
}

</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
