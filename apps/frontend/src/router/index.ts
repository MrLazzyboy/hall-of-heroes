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
      path: '/events',
      name: 'events',
      component: () => import('@/views/Events/EventsPage.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsPage/NewsPage.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsPage/NewsPage.vue'),
    },
    {
      path: '/news-self',
      name: 'news-self',
      component: () => import('@/views/NewsPage/pages/NewsSelfPage.vue'),
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
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/AuthPage/RegistrationPage.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/AuthPage/ResetPasswordPage.vue'),
    },
    {
      path: '/require-password',
      name: 'require-password',
      component: () => import('@/views/AuthPage/RequirePasswordPage.vue'),
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomePage/WelcomePage.vue'),
    },
     
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/UserPage.vue'),
      redirect: { name: 'user-profile' },
      children: [
        {
          path: 'profile/',
          name: 'user-profile',
          component: () => import('@/views/User/pages/profile/ProfilePage.vue')
        },
        {
          path: 'events/',
          name: 'user-events',
          component: () => import('@/views/User/pages/events/EventsPage.vue')
        },
        {
          path: 'notifications/',
          name: 'user-notifications',
          component: () => import('@/views/User/pages/notifications/NotificationsPage.vue')
        },
        {
          path: 'favourites/',
          name: 'user-favourites',
          component: () => import('@/views/User/pages/favourites/FavouritePage.vue')
        },
        {
          path: 'settings/',
          name: 'user-settings',
          component: () => import('@/views/User/pages/settings/SettingPage.vue')
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminPage/AdminPage.vue'),
      redirect: { name: 'admin-profile' },
      children: [
        {
          path: 'profile/',
          name: 'admin-profile',
          component: () => import('@/views/AdminPage/pages/profile/ProfilePage.vue')
        },
        {
          path: 'events/',
          name: 'admin-events',
          component: () => import('@/views/AdminPage/pages/events/EventsPage.vue')
        },
        {
          path: 'notifications/',
          name: 'admin-notifications',
          component: () => import('@/views/AdminPage/pages/notifications/NotificationsPage.vue')
        },
        {
          path: 'favourites/',
          name: 'admin-favourites',
          component: () => import('@/views/AdminPage/pages/favourites/FavouritePage.vue')
        },
        {
          path: 'settings/',
          name: 'admin-settings',
          component: () => import('@/views/AdminPage/pages/settings/SettingPage.vue')
        },
        {
          path: 'admin-base-user/',
          name: 'admin-base-user',
          component: () => import('@/views/AdminPage/pages/baseUsers/BaseUsers.vue')
        },
        {
          path: 'admin-tags/',
          name: 'admin-tags',
          component: () => import('@/views/AdminPage/pages/tags/TagsPage.vue')
        },
      ]
    }
  ],
})

export default router
