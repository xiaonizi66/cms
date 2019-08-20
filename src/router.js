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
        component: () => import('./views/home/Home'),
        meta: { title: '首页', icon: 'icon-shouye' }
      }]
    },
    {
      path: '/order',
      component: Layout,
      redirect: '/order/list',
      name: 'order',
      meta: { title: '关于', icon: 'icon-dingdan' },
      children: [{
        path: 'list',
        name: 'list',
        component: () => import('./views/order/list'),
        meta: { title: '订单列表', icon: 'icon-dingdan' }
      }]
    },
    {
      path: '/systemController',
      component: Layout,
      redirect: '/systemController/userController',
      name: 'systemController',
      meta: { title: '系统管理', icon: 'icon-xitongguanli' },
      children: [{
        path: 'userController',
        name: 'userController',
        component: () => import('./views/systemController/userController'),
        meta: { title: '用户管理' }
      },
      {
        path: 'roleController',
        name: 'roleController',
        component: () => import('./views/systemController/roleController'),
        meta: { title: '角色管理' }
      }]
    },
    {
      path: '/product',
      component: Layout,
      redirect: '/product/fundOpenDay',
      name: 'product',
      meta: { title: '产品配置', icon: 'icon-chanpinguanli' },
      children: [{
        path: 'fundOpenDay',
        name: 'fundOpenDay',
        component: () => import('./views/product/fundOpenDay'),
        meta: { title: '产品开放日' }
      },
      {
        path: 'fundSeries',
        name: 'fundSeries',
        component: () => import('./views/product/fundSeries'),
        meta: { title: '产品系列' }
      },
      {
        path: 'appHotSale',
        name: 'appHotSale',
        component: () => import('./views/product/appHotSale'),
        meta: { title: 'app热销配置' }
      }]
    },
    {
      path: '*', redirect: '/404', hidden: true
    }
  ]
})
