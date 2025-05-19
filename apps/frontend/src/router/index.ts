import { createRouter, createWebHistory } from 'vue-router'
import UnderConstruction from '@/views/UnderConstruction.vue'
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
      path: '/:pathMatch(.*)*',
      name: 'under-construction',
      component: UnderConstruction
    }
  ]
})

export default router
