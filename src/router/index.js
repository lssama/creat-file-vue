import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
const info = () => import('@/pages/userInfo')
const repage = () => import('@/pages/common/rePage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/repage',
      name: 'repage',
      component: repage
    }
  ]
})
