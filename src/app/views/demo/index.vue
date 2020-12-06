<template>
  <div class="main-content">
    从mapState获取 {{ demoValue }} <br /><br />
    从mapGetters获取 {{ getterDemoValue }} <br /><br />
    <el-button type="primary" @click="commit">使用commit设置</el-button>
    <el-button type="info" @click="action" :loading="loading"
      >使用action设置</el-button
    >
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Demo',
  data() {
    return { loading: false }
  },
  computed: {
    ...mapState('demoModule', ['demoValue']),
    ...mapGetters(['getterDemoValue']),
  },
  methods: {
    commit() {
      this.$store.commit(
        'demoModule/CHANGE_VALUE',
        'commit value ' + Math.floor(Math.random() * 10)
      )
    },
    action() {
      this.loading = true
      this.$store
        .dispatch(
          'demoModule/changeValue',
          'action value ' + Math.floor(Math.random() * 10)
        )
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style>
</style>