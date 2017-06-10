<template>
  <el-dialog title="扩展应用" v-model="dialogVisible" size="tiny" ref="dialog">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="容器个数" prop="instance">
        <el-input v-model:number="form.instances" auto-complete="off"></el-input>
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
        rules: {
          instance: [
            { message: '不能为空', trigger: 'blur' }
          ]
        },
        form: {
          instances: null
        }
      }
    },
    methods: {
      open: function (data = {}) {
        this.form.instances = data.instances
        this.$refs.dialog.open()
      },
      confirm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
