<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
    <router-view></router-view>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain'
}
</script>
<style lang="less">
  .app-main{
    padding-top: 20px;
  }
</style>
