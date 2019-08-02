import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/layout.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', component: () => import('@/views/login/login'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "Home" */ './views/home/Home'),
        meta: { title: '首页' }
      }]
    },
    {
      path: '/about',
      component: Layout,
      redirect: '/about/info',
      name: 'about',
      meta: { title: '关于' },
      children: [{
        path: 'info',
        name: 'info',
        component: () => import('./views/about/info'),
        meta: { title: '个人信息' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('./views/about/list'),
        meta: { title: '产品列表' }
      },
      {
        path: '*', redirect: '/404', hidden: true
      }]
    }
  ]
})
