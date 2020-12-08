import Cookies from 'js-cookie'
import {sessionKey} from '@/settings'
//文档参照 https://github.com/js-cookie/js-cookie

const SessionKey = sessionKey || 'session_key'
const options = {
  domain: process.env.VUE_APP_DOMAIN
}

// 获取session
export function getSession() {
  const session = Cookies.get(SessionKey,options)
  return session && JSON.parse(session)
}

// 保存session
export function setSession(session) {
  return Cookies.set(SessionKey, JSON.stringify(session),options)
}

// 移除session
export function removeSession() {
  return Cookies.remove(SessionKey,options)
}
