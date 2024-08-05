import Vue from 'vue'
import VueRouter from 'vue-router'
import Repository from '@/components/Repository.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    component: () => import( '../views/Manager.vue'),
    redirect: '/home',
    children: [
      {path: 'home', 
        name: 'home', 
        component: () => import( '../views/Home.vue')
      },
      {path: 'user', 
        name: 'user', 
        component: () => import( '../views/User.vue')
      },
      { path: '/repositories',
      name: 'Repositories',
      component: Repository,},
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
