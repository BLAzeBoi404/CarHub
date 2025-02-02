<template>
  <div class="home">
    <!-- Видео с фоном -->
    <div class="video-container">
      <video autoplay muted loop playsinline>
        <source src="/video/bgcar.mp4" type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
      <div class="video-overlay">
        <h1 class="title">Вітаємо на нашому сайті!</h1>
        <router-link to="/listings" class="button">Переглянути оголошення</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Listings from "@/views/Listings.vue";  // Подключаем Listings.vue
</script>

<style scoped>
/* Контейнер для видео */
.video-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
}

.title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.button {
  background-color: #00aaff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0088cc;
}
</style>
