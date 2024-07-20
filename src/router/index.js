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
  },
  {
    path: '/:slug/menu-equipe',
    name: 'teamMenu',
    component: () => import('../views/TeamMenuView.vue')
  },
  {
    path: '/:slug/menu-equipe/certificados',
    name: 'teamCertifications',
    component: () => import('../views/CertificationsTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/palestrantes',
    name: 'speakers',
    component: () => import('../views/SpeakersTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/palestras',
    name: 'talks',
    component: () => import('../views/TalksTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/avisos',
    name: 'teamNotices',
    component: () => import('../views/NoticesTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/mercadorias',
    name: 'teamMerchandise',
    component: () => import('../views/MerchandiseTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/reservas',
    name: 'teamReservations',
    component: () => import('../views/ReservationsTeamView.vue')
  },
  {
    path: '/:slug/menu-equipe/auditoria',
    name: 'teamAudit',
    component: () => import('../views/AuditTeamView.vue')
  },
  {
    path: '/:slug/palestra/:talkid/lista',
    name: 'talkAttendeeList',
    component: () => import('../views/AttendeeListView.vue')
  },
  {
    path: '/:slug/menu-equipe/categorias',
    name: 'categories',
    component: () => import('../views/CategoriesTeamView.vue')
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
