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
      meta: { requiresAuth: true }
    },
    {
      path: '/accesses/create',
      name: 'accessCreate',
      component: () => import('../views/AccessCreate.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/accesses/:id',
      name: 'access',
      component: () => import('../views/Access.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/accesses/:id/edit',
      name: 'accessEdit',
      component: () => import('../views/AccessEdit.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: () => import('../views/CabinetView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () => import('../views/TeamView.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
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
