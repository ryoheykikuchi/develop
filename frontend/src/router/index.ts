import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Top from '../views/Top.vue'
import Sample from '../views/Sample.vue'
import Error from '../views/Error.vue'
import UserList from '../views/UserList.vue'
import Products from '../views/Products.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/sample',
      name: 'Sample',
      component: Sample
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
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
