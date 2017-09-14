<template>
  <el-dialog title="添加成员" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="60px">
      <el-form-item label="用户" prop="accountId">
        <el-select v-model="form.accountId" @visible-change="listAllUser" v-loading="loading">
          <el-option v-for="(user, index) in users" :key="index" :value="user.id" :label="user.userName">{{user.userName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="role">
        <el-select v-model="form.role">
          <el-option value="owner" label="组管理员">组管理员</el-option>
          <el-option value="member" label="组成员">组成员</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as userGroup from '@/api/user-group'
import * as user from '@/api/user'
// import * as type from '@/store/user-group/mutations_types'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      submitLoading: false,
      group: {},
      users: [],
      form: {
        accountId: '',
        role: '',
        groupId: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          { pattern: /^[^\u4e00-\u9fa5]*$/, message: '名称不能包含中文' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function (group) {
      this.form.groupId = group.id
      this.group = group
      this.$refs.dialog.open()
    },
    async listAllUser (flag) {
      if (flag) {
        let { data } = await user.userAll()
        this.users = data
      }
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await user.joinGroup(this.form)
            this.$notify({ message: '添加成功' })
            this.dialogVisible = false
            this.loading = false
            //  添加完成更新用户组下面用户列表
            let { data } = await userGroup.groupUsersList(this.form.groupId)
            this.group.users = data
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
