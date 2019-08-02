<template>
  <div class="home">
    <img alt="Vue logo" :src="logo">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import logo from '@/assets/imgs/logo.png'
export default {
  data () {
    return {
      logo
    }
  },
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
