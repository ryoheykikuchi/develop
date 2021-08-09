import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Top from '../views/Top.vue'
import MembershipRegistration from '../views/MembershipRegistration.vue'
import Error from '../views/Error.vue'
import UserList from '../views/UserList.vue'
import Products from '../views/Products.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import PurchaseProcedure from '../views/PurchaseProcedure.vue'
import Master from '../views/Master.vue'
import Login from '../views/Login.vue'
import store from '@/store'

Vue.use(VueRouter)

// export default new VueRouter({
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/membership-registration',
      name: 'MembershipRegistration',
      component: MembershipRegistration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/master',
      name: 'Master',
      component: Master
    },
    {
      path: '/user-list',
      name: 'UserList',
      meta: {
        requiresAuth: true
      },
      component: UserList
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/shopping-cart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/purchase-procedure',
      name: 'PurchaseProcedure',
      component: PurchaseProcedure
    },
    {
      path: '/top',
      name: 'TOP',
      component: Top
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/',
      name: 'Top',
      component: Top
    },
    {
      path: '/*',
      name: 'Error',
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLogin) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
