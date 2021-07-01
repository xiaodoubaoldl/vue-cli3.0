import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const base = `${process.env.BASE_URL}`
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Earth/*',
    name: 'Earth',
    component: () => import(/* webpackChunkName: "Earth" */ '../views/Earth.vue')
  },
  {
    path: '/Map/*',
    name: 'Map',
    component: () => import(/* webpackChunkName: "Map" */ '../views/Map.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base
})

export default router
