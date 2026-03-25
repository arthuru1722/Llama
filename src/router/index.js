import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '@/views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:category+/article/:id(\\d+)',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/:category+',
      name: 'category',
      component: HomeView,
    },
  ],
})

export default router
