import router from './router'
// import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
const whiteList = ['/login'] // 不定性白名单
router.beforeEach(async (to, from, next) => {
  // 需要校验下当前用户是否登录
  const token = await getToken()
  NProgress.start()
  if (token) {
    // 登录过，不能再进入登录页面
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if (store.getters.roles.length === 0) {
      //   store.dispatch('GetInfo').then(res => {
      //     next()
      //   }).catch(err => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {
      // 登录过，其他路由直接跳转
      next()
      // }
    }
  } else {
    // 单独 设置是否需要登录时
    // to.matched.some(item => item.meta.needLogin)
    // 白名单不需要登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
