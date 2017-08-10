<template>
  <el-dialog title="构建" v-model="dialogVisible" size="tiny" ref="dialog">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="镜像名称">
        <el-input v-model="form.imageName"></el-input>
      </el-form-item>
      <el-form-item label="镜像 Tag">
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
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
