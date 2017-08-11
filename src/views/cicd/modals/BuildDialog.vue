<template>
  <el-dialog title="构建" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="镜像名称" prop="imageName" required>
        <el-input v-model="form.imageName"></el-input>
      </el-form-item>
      <el-form-item label="镜像 Tag" prop="tagName" required>
        <el-input v-model="form.tagName"></el-input>
      </el-form-item>
      <el-form-item label="分支名称">
        <el-input v-model="form.branch"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm('form')" :loading="submitLoading">立即构建</el-button>
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
        imageName: '',
        branch: '',
        jobid: '',
        tagName: ''
      },
      rules: {
        tagName: [
          { required: true, message: '镜像 Tag 不能为空' },
          { pattern: /^[a-z0-9]+$/, message: '镜像 Tag 只能包含数字、小写字母' }
        ],
        imageName: [
          { required: true, message: '镜像名称不能为空' },
          { pattern: /^[a-z0-9]+$/, message: '镜像只能包含数字、小写字母' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function ({ imageName, name } = {}) {
      this.form.imageName = imageName
      this.form.jobid = name
      this.$refs.dialog.open()
    },
    confirm: function (formName) {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await fetchCicd.build(this.form, this.form.jobid)
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_CICDS)
          } catch (error) {
            this.submitLoading = false
          }
        } else {
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
