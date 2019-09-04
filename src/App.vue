<template>
  <div id="app" :class="theme">
    <router-view/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'theme'
    ])
  }
}
</script>
