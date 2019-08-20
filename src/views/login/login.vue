<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-form autoComplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left">
        <h2 class="login-title ">中泰资管港股APP业务后台</h2>
        <el-form-item prop="username">
          <el-input name ="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名"
                    clearable>
            <span slot="perfix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    v-model="loginForm.password"
                    autoComplete="on"
                    @keyup.enter.native="handleLogin"
                    placeholder="请输入密码"
                    clearable>
            <span slot="perfix"></span>
            <span slot="suffix" @click="showPwd"></span>
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-switch v-model="rememberUser"
                     active-color="#409EFF"
                     inactive-color="#DCDFE6"
                     class="float-l">
          </el-switch>
          <span class="float-l line-h20 ml-5">是否记住密码</span>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin" class="w100">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { isvalidateUsername } from '@/utils/validate'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidateUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, tigger: 'blur', validator: validateUsername }],
        password: [{ required: true, tigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      rememberUser: false
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((error) => {
            console.log(error)
            this.loading = false
          })
        } else {
          this.$message.error('参数验证不合法!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

  .login-card{
    margin: 0 auto;
    width: 400px;
  }
  .login-title {
    text-align: center;
    font-size: 22px;
  }
  .login-center-layout{
    width: 100%;
    min-height: 100%;
  }
</style>
