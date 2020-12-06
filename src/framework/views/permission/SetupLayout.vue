<template>
  <el-form class="main-content">
    <el-form-item>
      <el-select
        v-model="role_id"
        placeholder="请选择角色"
        @change="onRoleChange"
      >
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <slot></slot>
    <el-form-item>
      <el-button type="primary" :disabled="!btnEnabled" @click="onSetup"
        >保存配置</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SetupLayout',
  data() {
    return {
      roles: [],
      role_id: null,
    }
  },
  computed: {
    btnEnabled() {
      return this.role_id != null
    },
  },
  created() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      this.$http.post('PDDLController/getRoles').then((res) => {
        this.roles = res.data
        // 初始化选中第一个
        this.role_id = this.roles[0].id
        // 第一次不会触发change，所以需要手动触发
        this.onRoleChange(this.role_id)
      })
    },
    onRoleChange(role_id) {
      this.$emit('role-change', role_id)
    },
    onSetup() {
      this.$emit('setup', this.role_id)
    },
  },
}
</script>

<style lang="scss">
</style>
