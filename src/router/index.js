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
    path:'/welcome',
    component:() => import('../components/Welcome.vue')
  },{
    path: '/studentMessage',
    component: () => import('../components/student/StudentMessage.vue')
  },
  {
    path: '/messageManagement',
    component: () => import('../components/student/MessageManagement.vue')
  },
  {
    path: '/classSelection',
    component: () => import('../components/course/CourseMessage.vue')
  },
  {
    path: '/achievementStatistics',
    component: () => import('../components/grade/AchievementStatistics.vue')
  },
  {
    path: '/achievementRanking',
    component: () => import('../components/grade/AchievementRanking.vue')
  },{
    path:'/scoreEntry',
    component: () => import('../components/grade/ScoreEntry.vue')

  },
  {
    path:'/courseSelectionManagement',
    component: () => import('../components/course/CourseSelectionManagement.vue')
  },
  {
    path:'/courseManagement',
    component: () => import('../components/course/courseManagement.vue')
  }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
