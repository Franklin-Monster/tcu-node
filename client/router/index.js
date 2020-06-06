import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/home/home'
import Vpn from '@/views/vpn/vpn'
import TeacherLogin from '@/views/login/teacherLogin'
import StudentLogin from '@/views/login/studentLogin'
import NextLogin from '@/views/login/nextLogin'
import SystemLogin from '@/views/login/systemLogin'
import UserInformation from '@/views/login/nextLoginChildViews/userInformation'
import ConnectManage from '@/views/login/nextLoginChildViews/connectManage'
import ErrorPage from '@/components/404Error.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/vpn',
    name: 'vpn',
    component: Vpn
  },
  {
    path: '/login/teacher',
    name: 'teacherlogin',
    component: TeacherLogin
  },
  {
    path: '/login/student',
    name: 'studentlogin',
    component: StudentLogin
  },
  {
    path: '/login/next',
    name: 'nextlogin',
    component: NextLogin
  },
  {
    path: '/login/system',
    name: 'systemlogin',
    component: SystemLogin
  },
  {
    path: '/login/next/user',
    name: 'userInformation',
    component: UserInformation
  },
  {
    path: '/login/next/connect-manage',
    name: 'connectManage',
    component: ConnectManage
  },
  {
    path:'/404.html',
    name: '404',
    component:ErrorPage
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
