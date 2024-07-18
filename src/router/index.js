import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import { DateTime } from 'luxon'
import EventService from '../services/event.service';
import UserService from '../services/user.service';

const loggedInGuard = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!user || DateTime.now() >= DateTime.fromISO(user.exp) && to.name !== 'login') {
    next('/login');
  } else { next(); }
}

const eventStaffGuard = async (to, from, next) => {
  const isStaffFromEvent = await EventService.isEventStaff(to.params.slug)
  if (isStaffFromEvent) { next(); }
  else { next(`/${to.params.slug}/programacao`); }
}

const adminGuard = async (to, from, next) => {
  const isAdmin = await UserService.isAdmin()
  if (isAdmin) { next(); }
  else { next(from); }
}

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
    path: '/:slug/palestra/:talkid',
    name: 'talkDetails',
    component: () => import('../views/TalkView.vue')
  },
  {
    path: '/:slug:/inscricao',
    name: 'enrollment',
    component: () => import('../views/EnrollmentView.vue'),
    beforeEnter: loggedInGuard,
  },
  {
    path: '/:slug/agenda',
    name: 'agenda',
    component: () => import('../views/AgendaView.vue'),
    beforeEnter: loggedInGuard,
  },
  {
    path: '/:slug/mercadorias',
    name: 'merchandise',
    component: () => import('../views/MerchandiseView.vue'),
    beforeEnter: loggedInGuard,
  },
  {
    path: '/certificados',
    name: 'certifications',
    component: () => import('../views/CertificationView.vue'),
    beforeEnter: loggedInGuard,
  },
  { path: '/:slug/avisos',
    name: 'notices',
    component: () => import('../views/NoticesView.vue'),
    beforeEnter: loggedInGuard,
  },
  {
    path: '/:slug/menu-equipe',
    name: 'teamMenu',
    component: () => import('../views/TeamMenuView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/certificados',
    name: 'teamCertifications',
    component: () => import('../views/CertificationsTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/palestrantes',
    name: 'speakers',
    component: () => import('../views/SpeakersTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/palestras',
    name: 'talks',
    component: () => import('../views/TalksTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/avisos',
    name: 'teamNotices',
    component: () => import('../views/NoticesTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/mercadorias',
    name: 'teamMerchandise',
    component: () => import('../views/MerchandiseTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/reservas',
    name: 'teamReservations',
    component: () => import('../views/ReservationsTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/auditoria',
    name: 'teamAudit',
    component: () => import('../views/AuditTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/palestra/:talkid/lista',
    name: 'talkAttendeeList',
    component: () => import('../views/AttendeeListView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/admin',
    name: 'adminMenu',
    component: () => import('../views/AdminMenuView.vue'),
    beforeEnter: [loggedInGuard, adminGuard]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
