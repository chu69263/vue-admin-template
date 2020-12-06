<template>
  <div class="main-content">
    从mapState获取 {{ demoValue }} <br /><br />
    从mapGetters获取 {{ getterDemoValue }}
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Demo2',
  computed: {
    ...mapState('demoModule', ['demoValue']),
    ...mapGetters(['getterDemoValue']),
  },
}
</script>

<style>
</style>