import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage/MainPage.vue'
import { stringify, parse } from 'qs'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  stringifyQuery: (query) => {
    console.log(query)
    const str =  stringify(query, { arrayFormat: 'indices',     strictNullHandling: true

    })
    console.log(str)
    return str
  },
  parseQuery: (query) => parse(query),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: '/tariffs',
      name: 'tariffs',
      component: () => import('@/views/TariffsPage/TariffsPage.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('@/views/Events/EventsPage.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/NewsPage/NewsPage.vue')
    },
    {
      path: '/news-self/:id',
      name: 'news-self',
      component: () => import('@/views/NewsPage/pages/NewsSelfPage.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/views/CalendarPage/CalendarPage.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('@/views/ContactsPage/ContactsPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/AuthPage/RegistrationPage.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/AuthPage/ResetPasswordPage.vue')
    },
    {
      path: '/require-password',
      name: 'require-password',
      component: () => import('@/views/AuthPage/RequirePasswordPage.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomePage/WelcomePage.vue')
    },

    {
      path: '/event/:id',
      name: 'event',
      component: () => import('@/views/Events/EventDetailsPage.vue')
    },
    {
      path: '/event-add/:id?',
      name: 'event-add',
      component: () => import('@/views/Events/EventAdd.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/UserPage.vue'),
      redirect: { name: 'user-profile' },
      meta: {
        auth: true
      },
      children:  [
        {
          path: 'profile/',
          name: 'user-profile',
          meta: {
            auth: true
          },
          component: () => import('@/views/User/pages/profile/ProfilePage.vue')
        },
        {
          path: 'events/',
          name: 'user-events',
          meta: {
            auth: true
          },
          component: () => import('@/views/User/pages/events/EventsPage.vue')
        },
        {
          path: 'notifications/',
          name: 'user-notifications',
          meta: {
            auth: true
          },
          component: () => import('@/views/User/pages/notifications/NotificationsPage.vue')
        },
        {
          path: 'favourites/',
          name: 'user-favourites',
          meta: {
            auth: true
          },
          component: () => import('@/views/User/pages/favourites/FavouritePage.vue')
        },
        {
          path: 'settings/',
          name: 'user-settings',
          meta: {
            auth: true
          },
          component: () => import('@/views/User/pages/settings/SettingPage.vue')
        }
      ]
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminPage/AdminPage.vue'),
      redirect: { name: 'admin-profile' },
      meta: {
        auth: true
      },
      children: [
        {
          path: 'profile/',
          name: 'admin-profile',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/profile/ProfilePage.vue')
        },
        {
          path: 'events/',
          name: 'admin-events',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/events/EventsPage.vue')
        },
        {
          path: 'notifications/',
          name: 'admin-notifications',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/notifications/NotificationsPage.vue')
        },
        {
          path: 'favourites/',
          name: 'admin-favourites',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/favourites/FavouritePage.vue')
        },
        {
          path: 'settings/',
          name: 'admin-settings',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/settings/SettingPage.vue')
        },
        {
          path: 'admin-base-user/',
          name: 'admin-base-user',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/baseUsers/BaseUsers.vue')
        },
        {
          path: 'admin-tags/',
          name: 'admin-tags',
          meta: {
            auth: true
          },
          component: () => import('@/views/AdminPage/pages/tags/TagsPage.vue')
        }
      ]
    }
  ]
})

export default router
