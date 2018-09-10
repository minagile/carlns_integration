import axios from 'axios'
import router from '../../router'
// import { Message } from 'element-ui'

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.1.131:8080'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': token
    }
    // if (token) {
    //   config.params = { 'token': token }
    // }
    return config
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.code === 101) {
      router.push({
        path: '/Login',
        querry: { redirect: router.currentRoute.fullPath }
        // 从哪个页面跳转
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const Req = axios.defaults.baseURL
