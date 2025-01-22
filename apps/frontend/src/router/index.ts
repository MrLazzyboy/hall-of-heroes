import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/tariffs',
      name: 'tariffs',
      component: () => import('@/views/TariffsPage/TariffsPage.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsPage/NewsPage.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/CalendarPage/CalendarPage.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/ContactsPage/ContactsPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AuthPage/LoginPage.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/AuthPage/RegistrationPage.vue'),
    },
  ],
})

export default router
