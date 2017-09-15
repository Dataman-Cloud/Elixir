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
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="所属用户组" v-if="!isUpdate">
          <el-input v-if="isOwner" type="input" v-model="currentGroupName" disabled></el-input>
          <el-select v-if="isTenant" value-key="id" v-model="selectedGroups" multiple placeholder="请选择">
            <el-option v-for="group in userGroups" :key="group.id" :label="group.name" :value="group">
            </el-option>
          </el-select>
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
import { mapActions, mapGetters } from 'vuex'
import * as type from '@/store/user/mutations_types'
import * as user from '@/api/user'
import * as group from '@/api/user-group'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      userGroups: [],
      selectedGroups: [],
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
    },
    ...mapGetters([
      'isTenant',
      'isOwner',
      'currentGroupName',
      'currentGroupId'
    ])
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
    close () {
      this.resetForm()
      this.id = null
      this.selectedGroups = []
      this.submitLoading = false
    },
    async listGroup () {
      let { data } = await group.userGroupList()
      this.userGroups = data
    },
    async open (id) {
      this.id = id
      if (this.isTenant) {
        this.listGroup()
      }
      if (this.isUpdate) {
        let { data } = await user.getUser(this.id)
        this.updateInit(data)
      }
      this.$refs.dialog.open()
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            this.transformGroupsToAccountGroups()
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
    resetForm () {
      this.$refs.form.resetFields()
    },
    transformGroupsToAccountGroups () {
      if (this.isTenant) {
        this.form.accountGroups = this.selectedGroups.map(group => ({
          groupId: group.id,
          role: 'owner'
        }))
      } else if (this.isOwner) {
        this.form.accountGroups = [{
          groupId: this.currentGroupId,
          role: 'member'
        }]
      }
    },
    updateInit (user) {
      this.form = {
        name: user.name,
        id: user.id,
        email: user.email,
        phone: user.phone,
        title: user.title
      }
    }
  }
}
</script>
