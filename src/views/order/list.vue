list<template>
 <div class="app-container">
    <el-card class="fiter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          type="primary"
          class="float-r"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
            class="float-r mr-15"
            @click="handleResetSearch()"
            size="small">
          重置
        </el-button>
      </div>
      <div class="mt-15">
        <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
          <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单编号"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input v-model="listQuery.receiverKeyword" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
          </el-form-item>
           <el-form-item label="提交时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="订单分类：">
            <el-select v-model="listQuery.orderType" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select v-model="listQuery.sourceType" class="input-width" placeholder="全部" clearable>
              <el-option
                v-for="item in sourceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="orderTable"
        :data="list"
        class="w100"
        @row-click="clickRow"
        @selection-change="handleSelectionChange"
        v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
           <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column  prop="orderSn" label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column prop="memberUsername" label="用户账号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.memberUsername}}</template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="订单金额" width="120" align="center">
           <template slot-scope="scope">{{scope.row.totalAmount}}</template>
        </el-table-column>
        <el-table-column prop="payType" label="支付方式" width="120" align="center">
           <template slot-scope="scope">{{scope.row.payType | formatPayType}}</template>
        </el-table-column>
        <el-table-column prop="sourceType" label="订单来源" width="120" align="center">
           <template slot-scope="scope">{{scope.row.sourceType | formatStatus}}</template>
        </el-table-column>
        <el-table-column prop="status" label="订单状态" width="120" align="center">
           <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.status === 4">删除订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total">
      </el-pagination>
    </div>
 </div>
</template>
<script>
import { api } from '@/utils/api'
import { formatDate } from '@/utils/date'
const { orderList, orderDelete } = api
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  orderSn: null,
  receiverKeyword: null,
  status: null,
  orderType: null,
  sourceType: null,
  createTime: null
}
export default {
  name: 'orderList',
  data () {
    return {
      listLoading: true,
      total: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      statusOptions: [
        {
          label: '待付款',
          value: 0
        },
        {
          label: '待发货',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '已关闭',
          value: 4
        }],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0
        },
        {
          label: '秒杀订单',
          value: 1
        }
      ],
      sourceTypeOptions: [
        {
          label: 'PC订单',
          value: 0
        },
        {
          label: 'APP订单',
          value: 1
        }
      ],
      multipleSelection: []

    }
  },
  created () {
    this.getList()
  },
  filters: {
    // 过滤器
    // date
    formatCreateTime (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    // 支付方式
    formatPayType (value) {
      const array = ['未支付', '支付宝', '未支付']
      return array[value] || array[0]
    },
    formatSourceType (value) {
      const array = ['PC订单', '待付款']
      return array[value] || array[0]
    },
    formatStatus (value) {
      const array = ['待付款', '待发货', '已发货', '已完成', '已关闭', '无效订单']
      return array[value] || array[0]
    }
  },
  methods: {
    // 查询
    handleSearchList () {
      this.listQuery.pageNum = 1
      this.getList()
    },
    // 重置
    handleResetSearch () {
      this.listQuery = Object.assign({}, defaultListQuery)
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    clickRow (row) {
      this.$refs.orderTable.toggleRowSelection(row)
    },
    // 删除订单
    handleDeleteOrder (index, row) {
      let ids = []
      ids.push(row.id)
      this.deleteOrder(ids)
    },
    // 修改pageSize
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    // 分页
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    // 获取数据列表
    getList () {
      this.listLoading = true
      orderList(this.listQuery).then(res => {
        this.listLoading = false
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    deleteOrder (ids) {
      this.$confirm('是否要进行改删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        orderDelete({ 'dis': ids }).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          })
          this.getList()
        })
      })
    }
  }
}
</script>
