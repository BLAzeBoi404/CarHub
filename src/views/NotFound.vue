<template>
  <div id="app" class="error-page">
    <!-- Страница ошибки 404 -->
    <h1>404</h1>
    <p>Сторінка не знайдена</p>
    <p>Перевірте правильність посилання або поверніться на головну.</p>
    <router-link to="/" class="button">Повернутися на головну</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
/* Стиль страницы ошибки */
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  text-align: center;
}

.error-page h1 {
  font-size: 100px;
  color: #ff3333;
}

.error-page p {
  font-size: 18px;
  color: #aaa;
}

.error-page .button {
  margin-top: 20px;
  background-color: #74a9c4;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.error-page .button:hover {
  background-color: #0088cc;
}
</style>
