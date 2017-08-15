<template>
  <el-dialog title="灰度发布" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="镜像地址" prop="version.container.docker.image">
        <el-input v-model="form.version.container.docker.image"></el-input>
      </el-form-item>
      <el-form-item label="实例个数" prop="instances">
        <el-input v-model.number="form.instances"></el-input>
      </el-form-item>
      <el-form-item label="权重" prop="value">
        <el-slider v-model.number="form.value" :max="1" :step="0.1"></el-slider>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as fetch from '@/api/app'
import * as type from '@/store/app/mutations_types'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false,
      submitLoading: false,
      id: null,
      form: {
        instances: null,
        value: 0,
        version: {
          container: {
            docker: {}
          }
        }
      },
      rules: {
        instances: [
          { required: true, message: '实例数不能为空' },
          { type: 'number', message: '只能输入数字' }
        ],
        'container.docker.image': [
          { required: true, message: '镜像地址不能为空' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      fetchApps: type.FETCH_APPS
    }),
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function (app = {}) {
      this.form.version = app.version
      this.id = app.id
      this.$refs.dialog.open()
    },
    onSubmit: function () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await fetch.createCanary(this.id, this.form)
            this.dialogVisible = false
            this.fetchApps()
          } catch (error) {
            this.submitLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm: function () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
