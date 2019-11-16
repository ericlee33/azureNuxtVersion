import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {
        requireAuth: true,
      },
      component: () => import('./AdminHello.vue')
    },
    {
      path: '/adminwebarticle',
      name: 'adminwebarticle',
      meta: {
        requireAuth: true,
      },
      component: () => import('./AdminWebArticle.vue')
    },
    {
      path: '/addwebarticle',
      name: 'addwebarticle',
      meta: {
        requireAuth: true,
      },
      component: () => import('./AddWebAtricle.vue')
    },
    {
      path: '/editwebarticle/:id',
      name: 'editwebarticle',
      meta: {
        requireAuth: true,
      },
      component: () => import('./EditWebArticle.vue')
    },
    {
      path: '/accountpermission',
      name: 'accountpermission',
      meta: {
        requireAuth: true,
      },
      component: () => import('./AccountPermission.vue')
    },
    {
      path: '/messageboard',
      name: 'messageboard',
      meta: {
        requireAuth: true,
      },
      component: () => import('./MessageAdmin.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./404.vue')
    }
  ]
})
