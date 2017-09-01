<template>
  <el-dialog :title="isUpdate ? '修改用户' : '创建用户'" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <div style="overflow-y:scroll; overflow-x: hidden;" v-scroll="dialogVisible">
        <el-form-item v-if="!isUpdate" label="用户名" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item v-if="!isUpdate" label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="添加用户组" v-if="!isUpdate">
          <el-row :gutter="5">
            <el-col :span="9">
              <el-button type="primary" size="small" @click="addGroup">添加组</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item v-for="(accountGroup, index) in form.accountGroups" :key="index">
          <el-row :gutter="12" v-if="!isUpdate">
            <el-col :span="9">
              <el-form-item v-if="!isUpdate" :prop="'accountGroups.' + index + '.groupId'" :key="index" :rules="[{ required: true, message: '请选择用户组' }]">
                <el-select @visible-change="openUserGroup" v-model="accountGroup.groupId">
                  <el-option v-for="(userGroup, index) in userGroups" :key="index" :value="userGroup.id" :label="userGroup.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item :prop="'accountGroups.' + index + '.role'" :key="index" :rules="[{ required: true, message: '请选择组中角色' }]">
                <el-select v-model="accountGroup.role">
                  <el-option value="superuser" label="超级管理员">超级管理员</el-option>
                  <el-option value="owner" label="组管理员">组管理员</el-option>
                  <el-option value="member" label="组成员">组成员</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeGroup(index)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}</el-button>
    </div>
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
      userGroups: [],
      id: null,
      form: {
        title: '',
        userName: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        accountGroups: []
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名' },
          { pattern: /^[A-Za-z0-9]+$/, message: '用户名必须为英文或者数字' },
          { max: 255, message: '用户名不能超过255个字符' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { pattern: /^\w{6,16}$/, message: '密码只能包含英文字母、数字、标点符号且必须包含大写字母，长度为6-16位' },
          { max: 16, message: '用户名密码不能超过16个字符' }
        ],
        confirmPsd: [
          { required: true, message: '请确认密码' }
        ],
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, message: '请输入正确的手机号' }
        ]
      }
    }
  },
  computed: {
    isUpdate: function () {
      return !!this.id
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
    async openUserGroup (flag) {
      if (flag) {
        let { data } = await group.userGroupList()
        this.userGroups = data
      }
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open (id) {
      this.id = id
      if (this.isUpdate) {
        user.getUser(this.id)
          .then(res => this.updateInit(res))
      }
      this.$refs.dialog.open()
    },
    addGroup () {
      let groupInfo = {
        groupId: '',
        role: ''
      }
      this.form.accountGroups.push(groupInfo)
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            this.isUpdate ? await user.updateUser(this.form) : await user.createUser(this.form)
            this.dialogVisible = false
            this.fetchUsers()
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeGroup (index) {
      this.form.accountGroups.splice(index, 1)
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    updateInit (initFetchData) {
      this.form = {
        name: initFetchData.data.name,
        id: initFetchData.data.id,
        email: initFetchData.data.email,
        phone: initFetchData.data.phone,
        title: initFetchData.data.title
      }
    }
  }
}
</script>
