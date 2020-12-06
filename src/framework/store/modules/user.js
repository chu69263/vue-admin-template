import { getSession, setSession, removeSession } from '../../utils/auth'
import request from '../../utils/request'

const state = {
  session: getSession(),
  account: null
}

const mutations = {
  MERGE_SESSION: function(state, payload) {
    if (payload) {
      const session = state.session || {}
      Object.assign(session, payload)
      state.session = session
      setSession(session)
    } else {
      state.session = null
      state.account = null
      removeSession()
    }
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  }
}

const actions = {
  // user login
  login({ commit }, data) {
    return request.post('/admin/BasicController/adminLogin', data)
      .then(res => {
        commit('MERGE_SESSION', res.data.accountInfo)
      })
  },

  // get user info
  getAccount({ commit, state }) {
    return request.post('/admin/AccountController/accountInfo').then(res => {
      const account = res.data
      commit('SET_ACCOUNT', account)
      return account
    }
    )
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('MERGE_SESSION', null)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

