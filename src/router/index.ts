import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { HOME, TRANSACTION_ENTRY } from './route-names'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: HOME,
      component: HomeView,
    },
    {
      path: '/transaction/entry',
      name: TRANSACTION_ENTRY,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TransactionEntry.vue'),
    },
  ],
})

export default router
