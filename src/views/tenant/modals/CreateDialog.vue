<template>
  <el-dialog :title="isUpdate ? '更新租户' : '创建租户'" v-model="dialogVisible" size="tiny" ref="dialog" @close="close">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="租户名称" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="管理员名称" prop="username" v-if="!isUpdate">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!isUpdate">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" v-if="!isUpdate">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="子网">
        <el-select v-model="checkedSubnet" multiple placeholder="请选择子网">
          <el-option v-for="item in subnetList" :key="item.netname" :value="item.id" :label="item.netname">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      checkedSubnet: [],
      dialogVisible: false,
      form: {
        desc: '',
        email: '',
        name: '',
        password: '',
        username: '',
        network: []
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '名称不能为空' },
          { pattern: /^[^\u4e00-\u9fa5]*$/, message: '名称不能包含中文' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { pattern: /^\w{6,16}$/, message: '密码只能包含英文字母、数字且必须包含大写字母，长度为6-16位', trigger: 'blur' },
          { min: 6, max: 16, message: '密码为6-16个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名' },
          { pattern: /^[A-Za-z0-9]+$/, message: '用户名必须为英文或者数字' },
          { max: 255, message: '用户名不能超过255个字符' }
        ]
      },
      submitLoading: false,
      tenant: {}
    }
  },
  computed: {
    ...mapState({
      subnetList (state) {
        return state.tenant.subnets.subnets
      }
    }),
    isUpdate: function () {
      return !!this.tenant
    }
  },
  methods: {
    async open (tenant) {
      this.form = tenant ? {
        name: tenant.name,
        desc: tenant.desc
      } : {
        name: '',
        desc: ''
      }
      this.checkedSubnet = tenant ? tenant.mapper : []
      this.tenant = tenant
      this.$refs.dialog.open()
    },
    close () {
      this.resetForm()
      this.submitLoading = false
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            this.form.network = this.checkedSubnet
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
