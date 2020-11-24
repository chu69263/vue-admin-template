import Cookies from 'js-cookie'

const SessionKey = 'session_key'

export function getSession() {
  const session = Cookies.get(SessionKey)
  return session && JSON.parse(session)
}

export function setSession(session) {
  return Cookies.set(SessionKey, JSON.stringify(session))
}

export function removeSession() {
  return Cookies.remove(SessionKey)
}
