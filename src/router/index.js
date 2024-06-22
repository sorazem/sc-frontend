import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'

const routes = [
  {
    path: '/',
    name: 'events',
    component: EventsView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/:slug/programacao',
    name: 'schedule',
    component: () => import('../views/ProgramacaoView.vue')
  },
  {
    path: '/:slug:/inscricao',
    name: 'enrollment',
    component: () => import('../views/EnrollmentView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/', '/programacao'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
