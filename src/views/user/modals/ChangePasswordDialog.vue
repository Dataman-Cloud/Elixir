<template>
  <el-dialog title="修改密码" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import * as type from '@/store/user/mutations_types'
import * as user from '@/api/user'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      form: {
        password: ''
      },
      id: null,
      rules: {
        password: [
          { required: true, message: '请输入密码' },
          { pattern: /[A-Z][a-z\d]*$/, message: '密码只能包含英文字母或数字且必须包含大写字母' },
          { min: 6, message: '用户名不能少于6个字符' },
          { max: 16, message: '用户名不能超过16个字符' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: type.FETCH_USERS
    }),
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open (id) {
      this.$refs.dialog.open()
      this.id = id
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await user.updatePwd(this.id, this.form)
            this.dialogVisible = false
            this.$notify({ message: '修改成功' })
            this.fetchUsers()
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.el-form-item{
  margin-bottom: 30px;
}
</style>
