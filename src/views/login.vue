<template>
  <div>
    <el-card>
      <el-form autoComplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left">
        <h2 class="login-title ">中泰资管港股APP运行后台</h2>
        <el-form-item prop="username">
          <el-input name ="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
            <span slot="perfix"></span>
            <svg-icon icon-class="user" class="c_main"></svg-icon>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {

}
</script>
