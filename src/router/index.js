import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../components/Home.vue'),
    children: [{
        path: '/welcome',
        component: () => import('../components/Welcome.vue')
      }, {
        path: '/studentMessage',
        component: () => import('../components/student/StudentMessage.vue')
      },
      {
        path: '/classSelection',
        component: () => import('../components/course/CourseMessage.vue')
      },
      {
        path: '/achievementRanking',
        component: () => import('../components/grade/AchievementRanking.vue')
      }, {
        path: '/scoreEntry',
        component: () => import('../components/grade/ScoreEntry.vue')

      },
      {
        path: '/courseSelectionManagement',
        component: () => import('../components/course/CourseSelectionManagement.vue')
      },
      {
        path: '/courseManagement',
        component: () => import('../components/course/courseManagement.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载导航守卫
router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path === '/') {
    if (tokenStr != "")
      return next("/welcome")
    else
    return next()
  }
  if (tokenStr === "") return next('/')
  next()
})

export default router
