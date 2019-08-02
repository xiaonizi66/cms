<template>
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
        <router-link class="inlineBlock" to="/" >
          <el-dropdown-item>
            修改密码
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/about" >
          <el-dropdown-item>
            个人信息
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" class="display_b">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/breadcrumb'
import Hamburger from '@/components/hamburger'
export default {
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
</style>
