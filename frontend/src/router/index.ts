import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TelescopeMap from "@/views/TelescopeMap.vue";
import ExampleView from '@/views/ExampleView.vue'
import LoginView from '@/views/User/LoginView.vue'
import RegisterView from '@/views/User/RegisterView.vue'
import AddMeetingView from '@/views/Meetings/AddMeetingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/meeting/add',
      name: 'meeting-add',
      component: AddMeetingView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: TelescopeMap,
    },
    {
      path: '/example',
      name: 'example',
      component: ExampleView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ],
})

export default router
