// Импортируем необходимые компоненты и модули
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Listings from '@/views/Listings.vue';
import ListingDetails from '@/views/ListingDetails.vue'; // Страница деталей
import Sell from '@/views/Sell.vue';
import Profile from '@/views/Profile.vue'; // Профиль
import Login from '@/views/Login.vue'; // Страница для логина
import Register from '@/views/Register.vue'; // Страница регистрации
import AdminProfile from '@/views/AdminProfile.vue'; // Страница админ-панели
import NotFound from '@/views/NotFound.vue'; // Страница 404

const routes = [
  // Главная страница
  { path: '/', component: Home },

  // Страница списка объявлений
  { path: '/listings', component: Listings },

  // Страница деталей объявления
  { path: '/listings/:id', name: 'listing-details', component: ListingDetails },

  // Страница для добавления объявления
  { path: '/sell', component: Sell },

  // Страница профиля с проверкой авторизации
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (!user) {
        next('/login'); // Если пользователь не авторизован, перенаправляем на страницу входа
      } else {
        next();
      }
    },
  },

  // Страница входа (если не авторизован)
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (user) {
        next('/profile'); // Если пользователь уже авторизован, перенаправляем на профиль
      } else {
        next();
      }
    },
  },

  // Страница регистрации (если не авторизован)
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: (to, from, next) => {
      const user = localStorage.getItem('user');
      if (user) {
        next('/profile'); // Если пользователь уже авторизован, перенаправляем на профиль
      } else {
        next();
      }
    },
  },

  // Страница админ-панели с проверкой роли администратора
  {
    path: '/admin',
    name: 'admin',
    component: AdminProfile,
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.role === 'admin') {
        next(); // Если пользователь администратор, разрешаем доступ
      } else {
        next('/login'); // Перенаправляем на страницу логина, если нет прав
      }
    },
  },

  // Страница для несуществующих маршрутов (404)
  { path: '/:catchAll(.*)', component: NotFound },
];

// Создаем и экспортируем объект роутера
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
