<template>
  <div class="app-container">
    <el-col :span="12">
      <img :src="img404" alt="">
    </el-col>
    <el-col :span="12">

    </el-col>
  </div>
</template>
<script>
import img404 from '@/assets/imgs/gif_404.gif'
export default {
  data () {
    return {
      img404
    }
  }
}
</script>
