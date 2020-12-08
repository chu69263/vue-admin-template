import router from './router'
import {permissionRoutes, lastRoutes} from './router/routes'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getPageTitle} from '@/framework/utils/common'
import {superRole} from "@/settings";

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  // 判断是否已经登录
  if (store.getters.isLogin) {
    if (to.path === '/login') {
      // 如果已经登录并且在登录页面，就跳转到主页面
      next({path: '/'})
      NProgress.done()
    } else {
      // 判断是否已经加载了登录用户数据
      const accountLoaded = store.getters.isAccountLoaded
      if (accountLoaded) {
        next()
      } else {
        try {
          // 获取登录用户数据
          const {accountInfo, accountMenu} = await store.dispatch('user/getAccount')
          // 生成当前用户可访问的页面
          let accessRoutes = await store.dispatch('permission/generateRoutes', accountMenu)
          // 判断超级管理员权限（默认role = 1）
          if (accountInfo.role_id && accountInfo.role_id.split(',').includes(superRole || '1')) {
            // 加入超级管理员权限配置页面
            accessRoutes = accessRoutes.concat(permissionRoutes)
          }
          // 一些通配符路由必须加载最后
          accessRoutes = accessRoutes.concat(lastRoutes)
          // 设置页面路由数据
          store.commit('permission/SET_ROUTES', accessRoutes)
          router.addRoutes(accessRoutes)
          //跳转页面
          next({...to, replace: true})
        } catch (error) {
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录时候
    // 白名单通过（如登录页面不需要权限）
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 跳转到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
