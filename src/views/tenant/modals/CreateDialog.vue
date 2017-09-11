<template>
  <el-dialog :title="isUpdate ? '更新租户' : '创建租户'" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="租户名称">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="管理员名称" prop="description">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员账户" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员邮箱" prop="email">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="name">
        <el-input type="password" v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认管理员密码" prop="description">
        <el-input type="password" v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="镜像仓库名称" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item> -->
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}</el-button>
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
      id: '',
      submitLoading: false,
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
      return !!this.id
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open (id) {
      this.form = {
        name: '',
        desc: ''
      }
      this.id = id
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            this.isUpdate ? await tenant.updateTenant(this.id, this.form) : await tenant.createTenant(this.form)
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
