import { createRouter, createWebHistory } from 'vue-router'
import EventsView from '../views/EventsView.vue'
import { DateTime } from 'luxon'
import EventService from '../services/event.service';
import UserService from '../services/user.service';

const loggedInGuard = (to, from, next) => {
  const token = localStorage.getItem('token');
  const exp = localStorage.getItem('exp');
  if (!token) { next('/login'); }
  else {
    if (DateTime.now() >= DateTime.fromISO(exp)) {
      localStorage.removeItem('token');
      localStorage.removeItem('exp');
    }

    if (['login', 'signup'].includes(to.name)) {
      next('/login');
    } else { next(); }
  }
}

const eventStaffGuard = async (to, from, next) => {
  const isStaffFromEvent = await EventService.isEventStaff(to.params.slug)
  const isAdmin = await UserService.isAdmin()
  if (isStaffFromEvent || isAdmin) { next(); }
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
    path: '/:slug/menu-equipe/categorias',
    name: 'teamCategories',
    component: () => import('../views/CategoriesTeamView.vue'),
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
    path: '/:slug/menu-equipe/equipe',
    name: 'teamEdit',
    component: () => import('../views/PeopleTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/presencas',
    name: 'teamPresence',
    component: () => import('../views/PresenceTeamView.vue'),
    beforeEnter: [loggedInGuard, eventStaffGuard]
  },
  {
    path: '/:slug/menu-equipe/presencas/:talkid',
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
  {
    path: '/admin/eventos',
    name: 'adminEvents',
    component: () => import('../views/AdminEventView.vue'),
    beforeEnter: [loggedInGuard, adminGuard]
  },
  {
    path: '/admin/tipos',
    name: 'adminTypes',
    component: () => import('../views/AdminTypeView.vue'),
    beforeEnter: [loggedInGuard, adminGuard]
  },
  {
    path: '/perfil',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: [loggedInGuard]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
