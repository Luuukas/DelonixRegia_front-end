import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import PostPage from '@/components/PostPage'
import HirePage from '@/components/HirePage'
import ViewProfile from '@/components/ViewProfile'
import ViewResume from '@/components/ViewResume'
import EditProfile from '@/components/EditProfile'
import login from '@/components/login'
import register from '@/components/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/PostPage',
          name: 'PostPage',
          component: PostPage
        },
        {
          path: '/HirePage',
          name: 'HirePage',
          component: HirePage
        },
        {
          path: '/ViewProfile',
          name: 'ViewProfile',
          component: ViewProfile
        },
        {
          path: '/ViewResume',
          name: 'ViewResume',
          component: ViewResume
        },
        {
          path: '/EditProfile',
          name: 'EditProfile',
          component: EditProfile
        }
      ]
    }
  ]
})