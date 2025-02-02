<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/store/auth"; // Исправленный путь
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);

// Получаем данные пользователя из хранилища
const user = computed(() => authStore.user);

// Когда компонент монтируется, получаем данные пользователя (если нужно)
onMounted(() => {
  authStore.fetchUser(); // Если нужно получать данные при загрузке
});

// Выход пользователя
const logout = async () => {
  isLoading.value = true;
  await authStore.logout(); // Логика для выхода
  isLoading.value = false;
  router.push("/login"); // После выхода перенаправляем на страницу логина
};
</script>

<template>
  <div class="box profile-box">
    <h2 class="title is-4">Личный кабинет</h2>

    <div class="profile-info">
      <figure class="image is-128x128">
        <!-- Использование относительного пути для изображения -->
        <img class="is-rounded" src="@/assets/avatprof.jpg" alt="Аватар" />
      </figure>
      
      <div class="details">
        <p><strong>Email:</strong> {{ user?.email || "Не указано" }}</p>
        <p><strong>Роль:</strong> {{ user?.role || "Неизвестно" }}</p>
      </div>
    </div>

    <button 
      class="button is-danger is-fullwidth mt-4" 
      @click="logout"
      :disabled="isLoading"
    >
      <span v-if="!isLoading">Выйти</span>
      <span v-else class="loader"></span>
    </button>
  </div>
</template>

<style scoped>
.profile-box {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.details p {
  margin: 5px 0;
}

.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
