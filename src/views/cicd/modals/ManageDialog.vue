<template>
  <el-dialog title="仓库认证管理" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="id">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm('form')" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as fetchCicd from '@/api/cicd'
import * as type from '@/store/cicd/mutations_types'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      form: {
        username: '',
        password: '',
        id: ''
      }
    }
  },
  methods: {
    open: function (data = {}) {
      this.$refs.dialog.open()
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    confirm: function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await fetchCicd.manage(this.form)
          this.dialogVisible = false
          this.$store.dispatch(type.FETCH_LISTJENKINS)
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
