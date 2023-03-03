import LoginComponent from "../components/loginPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/login',
    name: 'login',  
    props: true,
    component: () => import('../components/loginPage.vue')
  },
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue'),
    meta: { requiresAuth: true, roles: ['editor']}
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue'),
    meta: { requiresAuth: true, roles: ['editor', 'viewer']}
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue'),
    meta: { requiresAuth: true, roles: ['editor']}
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue'),
    meta: { requiresAuth: true, roles: ['editor']}
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue'),
    meta: { requiresAuth: true, roles: ['editor', 'viewer']}
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue'),
    meta: { requiresAuth: true, roles: ['editor']}
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
