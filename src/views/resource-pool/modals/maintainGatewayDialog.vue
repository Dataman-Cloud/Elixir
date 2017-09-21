<template>
  <el-dialog title="维护网卡" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="80px" style="padding-right:15px">
      <el-form-item label="网卡名称" prop="networkCard">
        <el-input v-model="form.networkCard"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as resourcePool from '@/api/resource-pool'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      form: {
        networkCard: '',
        ip: ''
      },
      rules: {
        networkCard: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open (ip) {
      this.form.ip = ip
      this.$refs.dialog.open()
    },
    resetForm () {
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await resourcePool.maintain(this.form)
            this.dialogVisible = false
            this.$emit('close')
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
