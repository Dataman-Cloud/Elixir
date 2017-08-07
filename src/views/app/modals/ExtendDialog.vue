<template>
  <el-dialog title="扩展应用" v-model="dialogVisible" size="tiny" ref="dialog">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="容器个数" prop="instances">
        <el-input v-model.number="form.instances" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      instancesTemp: null,
      form: {
        instances: null
      },
      rules: {
        instances: [
          { required: true, message: '实例数不能为空' },
          { type: 'number', message: '只能输入数字' }
        ]
      }
    }
  },
  methods: {
    open: function (data = {}) {
      this.form.instances = data.task_count
      this.instancesTemp = data.task_count
      this.$refs.dialog.open()
    },
    confirm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.instances === this.instancesTemp) {
            this.$notify({
              message: '容器个数未变化'
            })
            return false
          }
          this.$emit('ok', this.form)
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
