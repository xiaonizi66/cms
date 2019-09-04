<template>
 <div>
    <el-card class="fiter-container" shadow="never">
      <el-button
        type="primary"
        @click="ShowDialog"
        size="small">
        角色录入
      </el-button>
      <el-button
        type="primary"
        @click="ShowDialog()"
        size="small">
        角色编辑
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="roleTable"
        :data="list"
        class="w100"
        @row-click="clickRow"
        @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="rolecode" label="角色编码" width="80" align="center">
          <template slot-scope="scope">{{scope.row.rolecode}}</template>
        </el-table-column>
        <el-table-column prop="rolename" lable="角色名称" width="80" align="center">
          <template slot-scope="scope">{{scope.row.rolename}}</template>
        </el-table-column>
        <e-table-column prop="operation" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              @click="handleDeleterole(scope.$index,scope.row)">
              [删除]
            </el-button>
            <el-button
              @click="handleDeleterole(scope.$index,scope.row)">
              [用户]
            </el-button>
            <el-button
              @click="handleDeleterole(scope.$index,scope.row)">
              [权限设置]
            </el-button>
          </template>
        </e-table-column>
      </el-table>
    </div>
    <el-dialog title="修改密码" :visible.sync="DialogToggle" :append-to-body="true" width="30%" style="z-index:1000;" @close="cancelDialog">
      <div class="dialog-info">
        <i class="el-icon-info color-oriange mr-5"></i><b>角色范围在2~8位字符,角色编码范围在2~15位字符</b>
      </div>
      <el-form autoComplete="off"
                :model="rolename"
                :rules="rolecode"
                ref="roleForm">
        <!-- <el-form-item label="原密码" label-width="100px" prop="oldPassword">
          <el-input v-model="changePasswordForm.oldPassword" placeholder="请输入原密码" autoComplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px" prop="newPassword">
          <el-input v-model="changePasswordForm.newPassword" placeholder="请输入6-18位新密码" autoComplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" label-width="100px" prop="AgainNewPassword">
          <el-input v-model="changePasswordForm.AgainNewPassword" placeholder="请确认新密码" autoComplete="off" type="password"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>
<script>
import { api } from '@/utils/api'
export default {
  data () {
    return {
      DialogToggle: false,
      rolename: '',
      rolecode: '',
      listLoading: true,
      list: {},
      multipleSelection: []
    }
  },
  mounted () {
    console.log(api.addRole)
  },
  methods: {
    addRole () {
      // Api.addRole({}).then((res) => {
      //   console.log(res)
      // })
    },
    ShowDialog () {
      this.DialogToggle = true
    },
    cancelDialog () {
      this.DialogToggle = false
      this.$refs.roleForm.resetFields()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    clickRow (row) {
      this.$refs.roleTable.toggleRowSelection(row)
    }
  }
}
</script>
