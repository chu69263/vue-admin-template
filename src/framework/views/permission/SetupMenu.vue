<template>
  <setup-layout @role-change="onRoleChange" @setup="setupMenu">
    <el-form-item>
      <el-tree
        ref="tree"
        :data="routes"
        :default-checked-keys="defaultCheckedKeys"
        :props="treeProps"
        node-key="name"
        show-checkbox
        default-expand-all
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          {{ node.label }} {{ data.meta && data.meta.title }}
        </span>
      </el-tree>
    </el-form-item>
  </setup-layout>
</template>

<script>
import { asyncRoutes } from '@/app/router'
import SetupLayout from './SetupLayout.vue'

export default {
  components: { SetupLayout },
  name: 'SetupMenu',
  data() {
    return {
      treeProps: {
        children: 'children',
        label: 'name',
      },
      roles: [],
      form: {
        role_id: null,
        menus: [],
      },
    }
  },
  computed: {
    routes() {
      return filterRoutes(asyncRoutes)
    },
    leafNames() {
      return getLeafs(this.routes)
    },
    defaultCheckedKeys() {
      return this.form.menus.filter((e) => this.leafNames.includes(e))
    },
    btnEnabled() {
      return this.form.role_id != null
    },
  },
  methods: {
    onRoleChange(role_id) {
      // 获取指定角色的菜单
      this.$http
        .post('/admin/AuthController/getMenuRoleList', { role_id })
        .then((res) => {
          this.form.menus = res.data
          // element bug,需要手动重置默认选中
          this.$nextTick(() =>
            this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
          )
        })
    },
    setupMenu(role_id) {
      this.form.role_id = role_id
      this.form.menus = this.$refs.tree
        .getHalfCheckedKeys()
        .concat(this.$refs.tree.getCheckedKeys(false))
      this.$http
        .post('admin/AuthController/saveNav', this.form)
        .then(() => window.location.reload())
    },
  },
}

// 判断是否是叶子
function isLeaf(route) {
  return !route.children || route.children.length === 0
}
// 筛选符合条件的路由
function filterRoutes(routes) {
  return routes
    .map((e) => {
      if (e.hidden) return null
      const node = { name: e.name }
      e.meta && (node.meta = Object.assign({}, e.meta))
      if (!isLeaf(e)) {
        node.children = filterRoutes(e.children)
      }
      return node
    })
    .filter((e) => e != null)
}

// 获取叶子
function getLeafs(routes) {
  return routes.flatMap((e) => {
    if (isLeaf(e)) return e.name
    return getLeafs(e.children)
  })
}
</script>

<style lang="scss">
</style>
