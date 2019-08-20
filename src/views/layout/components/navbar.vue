<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>用户</span>
            <!-- <img class="user-avatar" :src="avatar" alt=""> -->
            <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/" >
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <div @click="editPassword">
            <el-dropdown-item class="inlineBlock">
             修改密码
            </el-dropdown-item>
          </div>
          <router-link class="inlineBlock" to="/about" >
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <div @click="logout">
            <el-dropdown-item divided>
              退出
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog title="修改密码" :visible.sync="dialogPasswordVisible" :append-to-body="true" width="30%" style="z-index:1000;" @close="cancelPassword('changePasswordForm')">
      <div class="dialog-info">
        <i class="el-icon-info color-oriange mr-5"></i><b>密码格式为6-18位字符</b>
      </div>
      <el-form autoComplete="off"
                :model="changePasswordForm"
                :rules="changePasswordRules"
                ref="changePasswordForm">
        <el-form-item label="原密码" label-width="100px" prop="oldPassword">
          <el-input v-model="changePasswordForm.oldPassword" placeholder="请输入原密码" autoComplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newPassword">
          <el-input v-model="changePasswordForm.newPassword" placeholder="请输入6-18位新密码" autoComplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" label-width="100px" prop="AgainNewPassword">
          <el-input v-model="changePasswordForm.AgainNewPassword" placeholder="请确认新密码" autoComplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPassword('changePasswordForm')">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import { mapGetters } from 'vuex'
import { validatePassword } from '@/utils/validate.js'
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (!validatePassword(value)) {
        callback(new Error('密码为6-18位的数字或字母'))
      } else {
        callback()
      }
    }
    const validateAgainPass = (rule, value, callback) => {
      if (value !== this.changePasswordForm.newPassword) {
        callback(new Error('两次密码格式不一致'))
      } else {
        callback()
      }
    }
    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: '',
        AgainNewPassword: ''
      },
      changePasswordRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPassword: [{ required: true, trigger: 'blur', validator: validatePass }],
        AgainNewPassword: [{ required: true, tigger: 'blur', validator: validateAgainPass }]
      },
      dialogPasswordVisible: false

    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('logOut').then(() => {
        location.reload()
      })
    },
    cancelPassword (form) {
      this.$refs[form].resetFields()
      this.dialogPasswordVisible = false
    },
    editPassword () {
      this.dialogPasswordVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top:16px;
      color: red;
    }
    .avatar-container{
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar{
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom{
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .dialog-info{
    position: relative;
    top: -20px;
  }
  .el-form{
    padding-top: 10px;
  }
</style>
