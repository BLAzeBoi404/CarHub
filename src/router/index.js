import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

import Home from '@/views/Home.vue';
import Listings from '@/views/Listings.vue';
import ListingDetails from '@/views/ListingDetails.vue';
import Sell from '@/views/Sell.vue';
import Profile from '@/views/Profile.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import AdminProfile from '@/views/AdminProfile.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/listings', component: Listings },
  { path: '/listings/:id', name: 'listing-details', component: ListingDetails },
  { path: '/sell', component: Sell },

  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.token) {
        next('/login');
      } else {
        next();
      }
    },
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.token) {
        next('/profile');
      } else {
        next();
      }
    },
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.token) {
        next('/profile');
      } else {
        next();
      }
    },
  },

  {
    path: '/admin',
    name: 'admin',
    component: AdminProfile,
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.user && authStore.user.role === 'admin') {
        next();
      } else {
        next('/login');
      }
    },
  },

  { path: '/:catchAll(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
