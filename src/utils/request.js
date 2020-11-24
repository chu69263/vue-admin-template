import axios from 'axios'
import { Message } from 'element-ui'
import Vue from 'vue'
import store from '../store/index'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
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
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
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
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

Vue.prototype.$http = request

export default request
