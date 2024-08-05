import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manager',
    redirect: '/home',
    component: () => import('../views/Manager.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '工作台' },
        component: () => import('../views/Manager/Home.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        meta: { title: '设置' },
        component: () => import('../views/Manager/Settings.vue')
      },
      {
        path: 'check',
        name: 'check',
        meta: { title: '审查' },
        component: () => import('../views/Manager/Check.vue')
      },
      {
        path: 'knowledge',
        name: 'knowledge',
        meta: { title: '知识库' },
        component: () => import('../views/Manager/Knowledge.vue')
      },
      {
        path: 'team',
        name: 'team',
        meta: { title: '用户 / 团队' },
        component: () => import('../views/Manager/Team.vue')
      },
      {
        path: 'repositories',
        name: 'repositories',
        redirect: '/repositories/involved',
        meta: { title: '项目' },
        component: () => import('../views/Manager/Repository.vue'),
        children:[
          {
            path: 'involved', // 子路由的路径应为相对路径
            name: 'involved',
            meta: { title: '参与项目' },
            component: () => import('../views/Manager/Project/InvolvedProject.vue')
          },
          {
            path: 'manage', // 子路由的路径应为相对路径
            name: 'imanage',
            meta: { title: '管理项目' },
            component: () => import('../views/Manager/Project/ManageProject.vue')
          },
          {
            path: 'all', // 子路由的路径应为相对路径
            name: 'all',
            meta: { title: '所有项目' },
            component: () => import('../views/Manager/Project/AllProject.vue')
          },
        ]
      },
      {
        path: 'password',
        name: 'password',
        meta: { title: '修改密码' },
        component: () => import('../views/Manager/Password.vue')
      },
      {
        path: 'person',
        name: 'person',
        meta: { title: '个人信息' },
        component: () => import('../views/Manager/Person.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
