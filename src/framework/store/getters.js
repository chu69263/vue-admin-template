import { getters } from '@/app/store/getters'
export default {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 是否已登录
  isLogin: state => !!state.user.session,
  // 登录用户
  session: state => state.user.session,
  // 登录用户token
  token: state => state.user.session?.token,
  // 是否已经加载了用户数据
  isAccountLoaded: state => !!state.user.account,
  // 用户资料
  accountInfo: state => state.user.account?.accountInfo,
  // 用户权限菜单
  accountMenu: state => state.user.account?.accountMenu,
  // 用户权限接口
  accountAction: state => state.user.account?.accountAction ?? [],
  routes: state => state.permission.routes,
  ...getters
}
