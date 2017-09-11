<template>
  <el-dialog :title="isUpdate ? '更新租户' : '创建租户'" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="租户名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as tenant from '@/api/tenant'
export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      tenant: {},
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          { pattern: /^[^\u4e00-\u9fa5]*$/, message: '名称不能包含中文' }
        ]
      }
    }
  },
  computed: {
    isUpdate: function () {
      return !!this.tenant
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open (tenant) {
      this.form = tenant ? {
        name: tenant.name,
        desc: tenant.desc
      } : {
        name: '',
        desc: ''
      }
      this.tenant = tenant
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            this.isUpdate ? await tenant.updateTenant(this.tenant.id, this.form) : await tenant.createTenant(this.form)
            this.dialogVisible = false
            this.$notify({ message: this.isUpdate ? '更新成功' : '创建成功' })
            this.$emit('close')
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
