<template>
  <div>
    <el-dialog title="修改密码" :visible="true" :append-to-body="true" width="30%" style="z-index:1000;" @close="cancelPassword('changePasswordForm')">
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
import { validatePassword } from '@/utils/validate.js'

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
export default {
  data () {
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
      }
    }
  },
  methods: {
    cancelPassword (form) {
      this.$refs[form].resetFields()
      this.$emit('updatePasswordDialogToggle', false)
    }
  }
}
</script>
