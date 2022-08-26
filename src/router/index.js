import { createRouter, createWebHistory } from 'vue-router';
import { userStore } from '../store/userStore';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/UserLogin.vue'),
  },
  {
    path: '/mainview',
    name: 'MainView',
    component: () => import('../views/MainView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/currentorder',
        name: 'CurrentOrder',
        component: () => import('../views/CurrentOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/editorder',
        name: 'Editorder',
        component: () => import('../views/EditOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/additemorder',
        name: 'AddItemOrder',
        component: () => import('../views/AddItemOrder.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/listitems',
        name: 'ListItems',
        component: () => import('../views/ListItems.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/viewbuyed',
        name: 'ViewBuyed',
        component: () => import('../views/ViewBuyed.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeResolve((to) => {
  const user = userStore();

  if (to.meta.requiresAuth && !user.statusLogin.logded) {
    router.push({ name: 'Login' });
  }
});

export default router;
