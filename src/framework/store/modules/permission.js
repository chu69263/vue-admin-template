import { constantRoutes } from '@/framework/router/routes'
import { asyncRoutes } from '@/app/router'

/**
 * 判断有没有权限
 * @param actionMenu
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(actionMenu, route) {
  if (route.name) {
    return actionMenu.some(menu => route.name === menu)
  } else {
    return true
  }
}

/**
 * 过滤有权限的路由
 * @param routes
 * @param accountMenu
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, accountMenu) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(accountMenu, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, accountMenu)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, accountMenu) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, accountMenu)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
