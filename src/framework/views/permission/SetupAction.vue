<template>
  <setup-layout @role-change="onRoleChange" @setup="setupAction">
    <el-form-item>
      <el-tree
        ref="tree"
        :data="actions"
        :default-checked-keys="defaultCheckedKeys"
        :props="treeProps"
        node-key="path"
        show-checkbox
        default-expand-all
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          {{ node.label }} {{ data.desc }}
        </span>
      </el-tree>
    </el-form-item>
  </setup-layout>
</template>

<script>
import SetupLayout from './SetupLayout.vue'
export default {
  components: { SetupLayout },
  name: 'SetupAction',
  data() {
    return {
      treeProps: {
        children: 'children',
        label: 'path',
      },
      actions: [],
      form: {
        role_id: null,
        actions: [],
      },
    }
  },
  computed: {
    actionNames() {
      return this.actions.map((e) => e.path)
    },
    defaultCheckedKeys() {
      return this.form.actions.filter((e) => this.actionNames.includes(e))
    },
  },
  created() {
    this.getActions()
  },
  methods: {
    getActions() {
      this.$http
        .post('/admin/AuthController/getActionList')
        .then((res) => (this.actions = res.data))
    },
    onRoleChange(role_id) {
      // 获取指定角色的菜单
      this.$http
        .post('/admin/AuthController/getActionRoleList', { role_id })
        .then((res) => {
          this.form.actions = res.data
          // element bug,需要手动重置默认选中
          this.$nextTick(() =>
            this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
          )
        })
    },
    setupAction(role_id) {
      this.form.role_id = role_id
      this.form.actions = this.$refs.tree
        .getHalfCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys(false))
      this.$http.post('/admin/AuthController/saveRoleAction', this.form)
      .then(() => window.location.reload())
    },
  },
}
</script>

<style lang="scss">
</style>
