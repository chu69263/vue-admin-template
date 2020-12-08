import axios from 'axios'
import { Message } from 'element-ui'
import Vue from 'vue'
import store from '../store'

//文档参照 https://github.com/axios/axios

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    config.headers['tp_timestamp'] = new Date().getTime()
    config.headers['tp_source'] = '1'
    config.headers['tp_uuid'] = 'login'
    config.headers['tp_accessToken'] = 'login'
    if (store.getters.session) {
      config.headers['tp_uuid'] = store.getters.session.uuid
      config.headers['tp_accessToken'] = store.getters.session.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 00000, it is judged as an error.
    if (res.code === '10102' || res.code === '10103') {
      // 退出
      store.dispatch('user/logout')
    } else if (res.code !== '00000') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      res.append = JSON.parse(res.append)
      res.data = JSON.parse(res.data)
      if (store.getters.token !== res.accesstoken) {
        store.commit('user/MERGE_SESSION', { token: res.accesstoken })
      }
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

Vue.prototype.$http = request
Vue.http = request

export default request
