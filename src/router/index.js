import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import { DateTime } from 'luxon'

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
    component: () => import('../views/ScheduleView.vue')
  },
  {
    path: '/:slug:/inscricao',
    name: 'enrollment',
    component: () => import('../views/EnrollmentView.vue')
  },
  {
    path: '/:slug/palestra/:talkid',
    name: 'talkDetails',
    component: () => import('../views/TalkView.vue')
  },
  {
    path: '/:slug/agenda',
    name: 'agenda',
    component: () => import('../views/AgendaView.vue')
  },
  {
    path: '/:slug/mercadorias',
    name: 'merchandise',
    component: () => import('../views/MerchandiseView.vue')
  },
  {
    path: '/certificados',
    name: 'certifications',
    component: () => import('../views/CertificationView.vue')
  },
  {
    path: '/:slug/avisos',
    name: 'notices',
    component: () => import('../views/NoticesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'signup', 'events', 'schedule', 'talkDetails'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = JSON.parse(localStorage.getItem('user'))?.token;
  const exp = JSON.parse(localStorage.getItem('user'))?.exp;

  // trying to access a restricted page + not logged in
  // redirect to login page
  if ((authRequired && !loggedIn) || DateTime.now() >= DateTime.fromISO(exp) && to.name !== 'login') {
    next('/login');
  } else {
    next();
  }
});

export default router
