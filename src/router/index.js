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
        component: () => import('../views/Manager/Check.vue'),
        redirect: '/check/person-check',
        children:[
          {
            path: 'person-check',
            name: 'person-check',
            meta: { title: '审查' },
            component: () => import('../views/Manager/Check/Person.vue')
          },
          {
            path: 'intelligence-check',
            name: 'intelligence-check',
            meta: { title: '审查' },
            component: () => import('../views/Manager/Check/Intelligence.vue')
          },
        ]
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
        component: () => import('../views/Manager/Team.vue'),
        redirect: '/team/team-member',
        children:[
          {
            path: 'team-member',
            name: 'team-member',
            meta: { title: '用户 / 团队' },
            component: () => import('../components/team/TeamMember.vue'),
          },
          {
            path: 'team-group',
            name: 'team-group',
            meta: { title: '用户 / 团队' },
            component: () => import('../components/team/TeamGruop.vue'),
          },
          {
            path: 'team-permission',
            name: 'team-permission',
            meta: { title: '用户 / 团队' },
            component: () => import('../components/team/TeamPermission.vue'),
          },
        ]
      },
      {
        path: '/project-details/:address',
        name: 'ProjectDetails',
        meta: { title: '当前项目' },
        redirect: '/project-details/:address/home',
        component: () => import('../components/project/ProjectDetail.vue'),
        props: true,
        children: [
          { 
            path: 'Home', 
            name: 'projectHome',
            meta: { title: '项目概览' },
            props: true,
            component: () => import('../components/projectDetails/Home.vue')
            
          },
          { 
            path: 'QnA', 
            name: 'projectQnA',
            meta: { title: '智能问答' },
            props: true,
            component: () => import('../components/projectDetails/QnA.vue')
          },
          { 
            path: 'Repository', 
            name: 'projectRepository',
            meta: { title: '代码仓库' },
            props: true,
            component: () => import('../components/projectDetails/Repository.vue'),
            children:[
              { 
                path: "/repo/:name", 
                name: "RepoDetails", 
                component:() => import('@/components/repositoryViews/RepoDetails.vue'), 
              },
              { 
                path: "/repo/:name/commit/:hash", 
                name: "CommitDetails", 
                component:() => import('../components/repositoryViews/CommitDetails.vue'), 
              },
            ]
          },
          { 
            path: 'Collaboration', 
            name: 'projectCollaboration',
            meta: { title: '项目协同' },
            props: true,
            component: () => import('../components/projectDetails/Collaboration.vue')
          },
          { 
            path: 'Summary', 
            name: 'projectSummary',
            meta: { title: '项目总结' },
            props: true,
            component: () => import('../components/projectDetails/Summary.vue')
          },
          { 
            path: 'Setting', 
            name: 'projectSetting',
            meta: { title: '项目设置' },
            props: true,
            component: () => import('../components/projectDetails/Setting.vue')
          },
        ]
      },
      {
        path: 'project',
        name: 'project',
        redirect: '/project/involved',
        meta: { title: '项目' },
        component: () => import('../views/Manager/Project.vue'),
        children:[
          {
            path: 'involved', 
            name: 'involved',
            meta: { title: '项目' },
            component: () => import('../views/Manager/Project/InvolvedProject.vue')
          },
          {
            path: 'manage', 
            name: 'imanage',
            meta: { title: '项目' },
            component: () => import('../views/Manager/Project/ManageProject.vue')
          },
          {
            path: 'all', 
            name: 'all',
            meta: { title: '项目' },
            component: () => import('../views/Manager/Project/AllProject.vue')
          },
        ]
      },
      {
        path: 'project-creat',
        name: 'create',
        meta: { title: '项目' },
        component: () => import('../views/Manager/Project/CreateProject.vue')
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


// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token === null || token === '') {
      next('/login')
    }else{
      next()
    }
  }
})

export default router
