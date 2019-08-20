import service from '@/utils/request'
import apiProxy from '@/utils/apiProxy'
const ApiGet = apiProxy.get
const ApiPost = apiProxy.post
let api = {}

/**
 * get请求图片验证码
 * @param {*} url
 * @param {*} data
 */
export function getValidate (url, data = {}) {
  return service({
    url: url + '?' + Math.random(),
    method: 'get',
    data: data,
    responseType: 'arraybuffer'
  })
}
/**
 * post请求
 * @param {*} id url额外参数   post.login
 * @param {*} data   参数
 */

Object.keys(ApiPost).forEach(key => {
  api[key] = (data = {}, id) => {
    id = id ? '/' + id : ''
    return service({
      url: ApiPost[key] + id,
      method: 'post',
      data: data
    })
  }
})
/**
 * get请求
 * @param {*} id url额外参数   post.login
 * @param {*} data   参数
 */
Object.keys(ApiGet).forEach(key => {
  api[key] = (params = {}, id) => {
    console.log(params)
    id = id ? '/' + id : ''
    return service({
      url: ApiGet[key] + id,
      method: 'get',
      params: params
    })
  }
})
export { api }
