import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue';
import Home from '@/components/homePage.vue';
// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  {
    path: '/services',
    name: 'services',
    props: true,
    component: () => import('../components/services.vue')
  },
  {
    path: '/servicesedit',
    name: 'servicesedit',
    component: () => import('../components/servicesEdit.vue')
  },
  {
    path: '/servicesCreate',
    name: 'servicesCreate',
    component: () => import('../components/servicesCreate.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    props: true,
    component: () => import('../components/serviceDetails.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_ROOT_API),
  routes,
})
export default router
