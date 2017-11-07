<template>
  <div class="dm-box">
    <div class="login-bg"></div>
    <div class="dm-con-box">
      <div class="dm-login-top">
        <img src="../../assets/logo.svg" alt="">
        <h2>SIGN IN</h2>
        <h3>Hello! Welcome to Dataman OS.</h3>
      </div>
      <el-form class="dm-login-box" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
        <el-form-item prop="username" class="dm-login-label">
          <el-input class="dm-login-input" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="账号"></el-input>
          <template slot="append">
            <img src="../../assets/user.svg" style="width:32px;height:32px" />
          </template>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="dm-login-input" name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
          <template slot="append">
            <img src="../../assets/lock.svg" style="width:32px;height:32px" />
          </template>
        </el-form-item>
        <el-form-item class="dm-button-box">
          <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin" class="login-btn">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
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

<style rel="stylesheet/scss" lang="scss" scoped>
.dm-box {
  width: 100%;
  height: 100%;
  background-color: #383f47;
  position: relative;
  overflow: hidden;
}

.login-bg {
  width: 62%;
  height: 100%;
  background: url('../../assets/login-bg.svg') no-repeat;
  background-size: cover;
  position: absolute;
  right: 0;
}

.dm-con-box {
  width: 100%;
  min-height: 100%;
  position: absolute;
  z-index: 1000;
}

.login-inner {
  width: 522px;
  height: 634px;
  z-index: 10000;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -261px;
  margin-top: -317px;
}

.dm-con-box img {
  width: 400px;
}

.dm-login-top {
  margin-top: 10%;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-family: pingfontweb, Helvetica Neue, Helvetica, Roboto, Arial, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Microsoft Jhenghei, sans-serif;
}

.dm-login-top>h3 {
  font-size: 18px;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.0);
  font-weight: 100;
  opacity: .7;
  color: #1aa9e0;
}

.dm-login-top>h2 {
  font-weight: 400;
  font-size: 38px;
  color: #fff;
}

.dm-login-box {
  width: 510px;
  border-radius: 6px;
  color: #fff;
  margin: 3% auto 0;
}

.dm-login-box .el-form-item__label {
  color: #fff;
}

.dm-login-box .el-input__inner {
  border: none!important;
  margin-top: 18px!important;
  font-size: 16px;
  background: rgba(0, 0, 0, 0);
  color: #fff;
}

.dm-login-box .el-button--primary {
  color: #fff;
  background-color: #1aa9e0;
  display: block;
  margin: 10% auto;
  height: 64px;
  width: 280px;
  border-radius: 32px;
  border: none;
  box-shadow: 0 0 24px rgba(0, 204, 255, .3);
  font-size: 22px;
}

.dm-login-box .el-button--primary:hover {
  background-color: #1ab2ef;
}

.dm-login-label {
  margin-bottom: 30px;
}

.dm-login-input {
  height: 74px;
  width: 446px;
  border: 1px solid #1aa9e0;
  border-radius: 37px;
  padding: 0 37px;
}

.dm-button-box {
  text-align: center;
}

.dm-login-box .el-button--primary {
  color: #fff;
  background-color: #1aa9e0;
  margin: 39px auto;
  height: 64px;
  width: 280px;
  border-radius: 32px;
  border: none;
  box-shadow: 0 0 24px rgba(0, 204, 255, .3);
}

.el-input-group .el-input__inner {
  border: none!important;
  height: 100%;
}

.dm-login-input .el-input-group__append {
  border: 0;
  background: #fff;
  padding: 8px 0;
}

.dm-login-box .el-form-item__error {
  left: 37px;
  font-size: 14px;
  color: #f76260;
}

.dm-login-box .el-form-item__error:before {
  content: '\E615';
  font-family: element-icons!important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 3px;
}

@media screen and (max-width:1440px) {
  .dm-login-top {
    margin-top: 55px;
  }
  .dm-login-box {
    margin: 40px auto 0;
  }
  .dm-login-box .el-button--primary {
    margin-top: 30px;
  }
}
</style>
