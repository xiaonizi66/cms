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
          <div @click="showUpdatePasswordDialog">
            <el-dropdown-item class="inlineBlock">
             修改密码
            </el-dropdown-item>
          </div>
          <router-link class="inlineBlock" to="/about" >
            <el-dropdown-item>
              个人信息
            </el-dropdown-item>
          </router-link>
          <div @click="showSelectThemeDialog">
            <el-dropdown-item>
              修改主题
            </el-dropdown-item>
          </div>
          <div @click="logout">
            <el-dropdown-item divided>
              退出
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <ChangePassword v-if="updatePasswordDialogVisible" @updatePasswordDialogToggle = "updatePasswordDialogToggle"></ChangePassword>
    <SelectTheme v-if="selectThemeDialogVisible" @selectThemeDialogToggle = "selectThemeDialogToggle"></SelectTheme>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
import ChangePassword from '@/components/changePassword'
import SelectTheme from '@/components/selectTheme'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      updatePasswordDialogVisible: false,
      selectThemeDialogVisible: false
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ChangePassword,
    SelectTheme
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$confirm('确认退出？').then(() => {
        this.$store.dispatch('logOut').then(() => {
          location.reload()
        })
      }).catch(() => {

      })
    },
    /**
     * 修改密码-弹窗显示隐藏
     */
    updatePasswordDialogToggle (value) {
      this.updatePasswordDialogVisible = value
    },
    showUpdatePasswordDialog () {
      this.updatePasswordDialogToggle(true)
    },
    /**
     * 修改主题-弹窗显示隐藏
     */
    selectThemeDialogToggle (value) {
      this.selectThemeDialogVisible = value
    },
    showSelectThemeDialog () {
      this.selectThemeDialogToggle(true)
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
