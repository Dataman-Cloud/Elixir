<template>
  <el-dialog title="创建用户组" v-model="dialogVisible" size="small" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model.number="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as userGroup from '@/api/user-group'
import * as type from '@/store/user-group/mutations_types'
export default {
  data () {
    return {
      loading: false,
      dialogVisible: false,
      submitLoading: false,
      groupId: '',
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          { pattern: /^[^\u4e00-\u9fa5]*$/, message: '名称不能包含中文' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    open: function () {
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            await userGroup.createUserGroup(this.form)
            this.$notify({ message: '创建成功' })
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_USER_GROUPS)
            this.loading = false
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
