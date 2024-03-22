import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const isAuthenticated = () => {
  return localStorage.getItem('jwtToken') !== null;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Добавляем мета-свойство для защищенного маршрута
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('../views/CabinetView.vue'),
      meta: { requiresAuth: true } // Добавляем мета-свойство для защищенного маршрута
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamsView.vue'),
      meta: { requiresAuth: true } // Добавляем мета-свойство для защищенного маршрута
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () => import('../views/TeamView.vue'),
      props: true,
      meta: { requiresAuth: true } // Добавляем мета-свойство для защищенного маршрута
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Если маршрут защищен и пользователь не авторизован, перенаправляем на страницу входа
    next({ name: 'login' });
  } else if (to.name === 'login' && isAuthenticated()) {
    // Если пользователь уже авторизован и пытается зайти на страницу входа, перенаправляем на главную страницу
    next({ name: 'home' });
  } else {
    next(); // В противном случае продолжаем навигацию
  }
})


export default router
