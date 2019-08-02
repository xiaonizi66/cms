import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import apiPath from '@/utils/api'
import store from '../store'
import { getToken } from '@/utils/auth'

const ApiGet = apiPath.get
const ApiPost = apiPath.post
// 创建axios实例
const service = axios.create({
  baseURL: '/api/', // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
  }
})

// request 拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  })

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      if (res.code === 401 || res.code === 403) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 重新实例化vue-router对象
          })
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  })

/**
 * get请求
 * @param {*} url
 * @param {*} data
 */
export function get (url, data = {}, id) {
  return service({
    url: ApiGet[url] + id ? '/' + id : '',
    method: 'get',
    data: data
  })
}
/**
 * get请求图片验证码
 * @param {*} url
 * @param {*} data
 */
export function getImg (url, data = {}) {
  return service({
    url: ApiGet[url] + '?' + Math.random(),
    method: 'get',
    data: data,
    responseType: 'arraybuffer'
  })
}
/**
 * post请求
 * @param {*} url
 * @param {*} data
 */
// export function post (url, data = {}, id) {
//   return service({
//     url: api[url] + id ? '/' + id : '',
//     method: 'post',
//     data: data
//   })
// }

let post = {}
Object.keys(ApiPost).forEach(key => {
  post[key] = (data = {}, id) => {
    id = id ? '/' + id : ''
    console.log(ApiPost[key] + id)
    return service({
      url: ApiPost[key] + id,
      method: 'post',
      data: data
    })
  }
})

export default post
