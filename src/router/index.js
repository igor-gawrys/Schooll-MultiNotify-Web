import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Auth/Login'
import Grade from '@/components/Grade'
import Notification from '@/components/Notification'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/grade/:grade',
      name: 'Grade',
      component: Grade
    },
    {
      path: '/notification/:notifcation',
      name: 'Notification',
      component: Notification
    }
  ]
})
