<template>
  <div class="dashboard-container">
    <el-button v-action="'PDController/getSelectType'">权限指令</el-button>
    <div class="dashboard-text">session: {{ session }}</div>
    <div class="dashboard-text">account: {{ account }}</div>
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
    {{ checkedKeys }}
    <br>
    <el-button @click="setMenu">设置菜单</el-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { asyncRoutes } from '../../router'
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
export default {
  name: 'Dashboard',
  data() {
    return {
      treeProps:
        {
          children: 'children',
          label: 'name'
        },
      checkedKeys: [],
      actions: null
    }
  },
  created() {
    this.getActionList()
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
    }
  },
  methods: {
    getActionList() {
      this.$http.post('PDDLController/getRoles')
        .then(res => { this.actions = res.data })
    },
    setMenu() {
      this.checkedKeys = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys(false))
      this.$http.post('admin/AuthController/saveNav', { role_id: 1, menus: this.checkedKeys })
        .then(() => window.location.reload())
      // this.account.accountMenu = this.checkedKeys
      // this.$store.dispatch('permission/generateRoutes', this.checkedKeys)
    }
  }
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
