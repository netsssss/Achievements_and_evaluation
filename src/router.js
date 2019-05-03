import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/index',
      alias: '/',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '/',
          redirect: '/center'
        },
        {
          path: 'center',
          component: () => import('./components/Index/main/Center.vue')
        },
        {
          path: 'user',
          component: () => import('./components/Index/main/User.vue')
        },
        {
          path: 'info',
          component: () => import('./components/Index/main/Info.vue')
        },
        {
          path: 'score',
          component: () => import('./components/Index/main/Score.vue')
        },
        {
          path: 'select',
          component: () => import('./components/Index/main/Select.vue')
        },
        {
          path: 'teach',
          component: () => import('./components/Index/main/Teach.vue')
        },
        {
          path: 'set',
          component: () => import('./components/Index/main/Set.vue')
        },
      ]
    },
    {
      path: '*',
      name: 'other',
      redirect: '/'
    }
  ]
})
