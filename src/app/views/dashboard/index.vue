<template>
  <div class="dashboard-container">
    <el-button v-action="'PDController/getSelectType'">权限指令</el-button>
    <div class="dashboard-text">session: {{ session }}</div>
    <div class="dashboard-text">account: {{ account }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DashboardContent',
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['session', 'account']),
  },
}
</script>

<style lang="scss"
       scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
