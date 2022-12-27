import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/r/:id',
    name: 'Room',
    component: Room
  },
  {
    path: '/@:username',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
