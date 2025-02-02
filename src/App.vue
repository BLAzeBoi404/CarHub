<template>
  <div id="app">
    <!-- Шапка -->
    <Navbar :isUserLoggedIn="isUserLoggedIn" /> <!-- Используем компонент Navbar -->
    
    <!-- Основной контент -->
    <main class="content">
      <div v-if="isUserLoggedIn">
        <h2>Ласкаво просимо до вашого кабінету, {{ user.name }}!</h2>
        <router-link to="/profile">Перейти до профілю</router-link>
      </div>
      <div v-else>
      </div>
      <router-view /> <!-- Компоненты отображаются тут -->
    </main>

    <!-- Футер -->
    <Footer /> <!-- Используем компонент Footer -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Импортируем компоненты Navbar и Footer
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const router = useRouter();

// Заглушка для проверки входа пользователя
const user = JSON.parse(localStorage.getItem('user'));
const isUserLoggedIn = ref(!!user); // Если пользователь существует, считаем, что он вошел
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
