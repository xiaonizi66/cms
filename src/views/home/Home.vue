<template>
  <div class="home">
    <div class="overview-layout padding-40">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">订单统计</div>
            <div class="padding-40">
              <el-row class="color-red">
                <el-col :span ="6" class="overview-item-value">400</el-col>
                <el-col :span="6" class="overview-item-value">200</el-col>
                <el-col :span="6" class="overview-item-value">100</el-col>
                <el-col :span="6" class="overview-item-value">50</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">本月订单总数</el-col>
                <el-col :span="6" class="overview-item-title">本周订单总数</el-col>
                <el-col :span="6" class="overview-item-title">今日订单总数</el-col>
                <el-col :span="6" class="overview-item-title">在途订单</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div class="padding-40">
              <el-row class="color-red">
                <el-col :span ="6" class="overview-item-value">100</el-col>
                <el-col :span="6" class="overview-item-value">400</el-col>
                <el-col :span="6" class="overview-item-value">50</el-col>
                <el-col :span="6" class="overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">用户总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data () {
    return {

    }
  },
  name: 'home',
  components: {

  }
}
</script>
<style lang="less" scoped>
@import '../../styles/variables.less';
.layout-title{
  color: @color-6;
  padding: 15px 20px;
  background: @lightBuleBg;
  font-weight: bold;
}
.overview-item-value{
  font-size: 24px;
  text-align: center;
}
.overview-item-title{
  margin-top: 10px;
  text-align: center;
}
</style>
