<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <span class="svg-container"></span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as type from '@/store/user/mutations_types'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '账号不能为空' }
        ],
        password: [
          { required: true, message: '密码不能为空' }
        ]
      },
      loading: false
    }
  },
  methods: {
    ...mapActions({
      login: type.LOGIN
    }),
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            await this.login(this.loginForm)
            this.$router.push({ path: '/' })
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  height: 100vh;
  background-color: #2d3a4b;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 35px 35px 15px 35px;
    transform:translate(-50%,-50%);
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .forget-pwd {
    color: #fff;
  }
}
</style>
