<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link class="navbar-logo" to="/">Автосалон</router-link>
      <div class="navbar-menu">
        <router-link class="navbar-item" :class="{ active: $route.path === '/' }" to="/">
          Головна
        </router-link>
        <router-link class="navbar-item" :class="{ active: $route.path === '/listings' }" to="/listings">
          Оголошення
        </router-link>
        <router-link class="navbar-item" :class="{ active: $route.path === '/sell' }" to="/sell">
          Продати авто
        </router-link>
        <!-- Проверка на логин пользователя -->
        <router-link v-if="!isUserLoggedIn" class="navbar-item" to="/login">
          Вхід
        </router-link>
        <router-link v-else class="navbar-item" to="/profile">
          Особистий кабінет
        </router-link>
        <router-link v-if="isAdmin" class="navbar-item" to="/admin">
          Адмін панель
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    isUserLoggedIn: Boolean,
    isAdmin: Boolean,
  },
};
</script>

<style scoped>
.navbar {
  background-color: #008080;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
}

.navbar-item {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  margin-left: 1rem;
  transition: color 0.3s;
  text-decoration: none;
}

.navbar-item:hover {
  color: #00d1b2;
}

.navbar-item.active {
  border-bottom: 2px solid white;
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    flex-direction: column;
  }
  .navbar-item {
    margin-left: 0;
    padding: 10px 0;
  }

  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-logo {
    margin-bottom: 10px;
  }
}
</style>
