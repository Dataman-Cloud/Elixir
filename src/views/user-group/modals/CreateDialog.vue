<template>
  <el-dialog :title="isUpdate ? '更新用户组' : '创建用户组'" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model.number="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">立即{{isUpdate ? '更新' : '创建'}}</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
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
      id: null,
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
    open: function (id) {
      this.id = id
      if (this.isUpdate) {
        userGroup.getGroup(this.id)
          .then(res => this.updateInit(res.data))
      }
      this.$refs.dialog.open()
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          this.isUpdate ? this.form.id = this.id : this.form
          try {
            this.isUpdate ? await userGroup.updateGroup(this.form) : await userGroup.createUserGroup(this.form)
            this.isUpdate ? this.$notify({ message: '更新成功' }) : this.$notify({ message: '创建成功' })
            this.dialogVisible = false
            this.$store.dispatch(type.FETCH_USER_GROUPS)
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
      this.id = null
      this.$refs.form.resetFields()
    },
    updateInit (initFetchData) {
      this.form = initFetchData
      this.form.id = this.id
    }
  }
}
</script>
