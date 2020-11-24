<template>
  <el-form class="main-content">
    <el-form-item>
      <el-select v-model="form.role" placeholder="请选择角色" @change="onRoleChange">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
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
          {{ node.label }} {{ data.meta&&data.meta.title }}
        </span>
      </el-tree>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!btnEnabled" @click="setupMenu">保存配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { asyncRoutes } from '../../router'

export default {
  name: 'SetupMenu',
  data() {
    return {
      treeProps:
        {
          children: 'children',
          label: 'name'
        },
      roles: [],
      form: {
        role: null,
        menus: []
      }
    }
  },
  computed: {
    ...mapState('user', [
      'session',
      'account'
    ]),
    ...mapGetters(['accountMenu']),
    routes() {
      return filterRoutes(asyncRoutes)
    },
    leafNames() {
      return getLeafs(this.routes)
    },
    defaultCheckedKeys() {
      return this.accountMenu.filter(e => this.leafNames.includes(e))
    },
    btnEnabled() {
      return this.form.role != null
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    getRoles() {
      this.$http.post('PDDLController/getRoles')
        .then(res => {
          this.roles = res.data
          // 初始化选中第一个
          this.form.role = this.roles[0].id
          // 第一次不会触发change，所以需要手动触发
          this.onRoleChange(this.form.role)
        })
    },
    onRoleChange(role) {
      window.console.log('切换role', role)
    },
    setupMenu() {
      this.form.menus = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys(false))
      this.$http.post('admin/AuthController/saveNav', this.form)
        .then(() => window.location.reload())
    // this.account.accountMenu = this.checkedKeys
    // this.$store.dispatch('permission/generateRoutes', this.checkedKeys)
    }
  }
}

// 判断是否是叶子
function isLeaf(route) {
  return !route.children || route.children.length === 0
}
// 筛选符合条件的路由
function filterRoutes(routes) {
  return routes.map(e => {
    if (e.hidden) return null
    const node = { name: e.name }
    e.meta && (node.meta = Object.assign({}, e.meta))
    if (!isLeaf(e)) {
      node.children = filterRoutes(e.children)
    }
    return node
  }).filter(e => e != null)
}

// 获取叶子
function getLeafs(routes) {
  return routes.flatMap(e => {
    if (isLeaf(e)) return e.name
    return getLeafs(e.children)
  })
}
</script>

<style lang="scss">

</style>
