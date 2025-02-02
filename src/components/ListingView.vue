<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Оголошення</h1>

    <!-- 🔍 Поиск и сортировка -->
    <div class="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
      <!-- Поле для поиска -->
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Пошук за заголовком..." 
        class="border p-2 rounded w-full md:w-1/3"
      />
      
      <!-- Поле для сортировки -->
      <select v-model="sortBy" class="border p-2 rounded w-full md:w-1/4 mt-2 md:mt-0">
        <option value="newest">Спочатку нові</option>
        <option value="cheapest">Спочатку дешеві</option>
        <option value="expensive">Спочатку дорогі</option>
      </select>
    </div>

    <!-- 🔄 Загрузка / ошибки -->
    <div v-if="store.loading" class="text-center text-gray-500">Завантаження...</div>
    <div v-if="store.error" class="text-center text-red-500">{{ store.error }}</div>
    <p v-if="filteredListings.length === 0" class="text-center text-gray-500">Немає оголошень.</p>

    <!-- Список объявлений -->
    <div v-if="filteredListings.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="listing in filteredListings" 
        :key="listing.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
      >
        <!-- Избранное -->
        <button 
          @click="store.toggleFavorite(listing.id)" 
          class="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <svg v-if="!store.favorites.includes(listing.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 text-gray-500">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>

        <!-- Фото -->
        <img :src="listing.image || 'https://via.placeholder.com/300x200'" alt="listing.title" class="w-full h-48 object-cover">

        <!-- Описание -->
        <div class="p-4">
          <h3 class="text-lg font-bold">{{ listing.title }} ({{ listing.brand }})</h3>
          <p class="text-gray-600 text-sm truncate">{{ listing.description }}</p>
          
          <!-- Цена и кнопка -->
          <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-semibold text-green-600">{{ listing.price }} ₴</span>
            <button @click="goToListing(listing.id)" class="text-white bg-blue-500 px-3 py-1 rounded">
              Докладніше
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useListingsStore } from "@/store/listings";
import { useRoute, useRouter } from "vue-router";

const store = useListingsStore();
const route = useRoute();
const router = useRouter();

const searchQuery = ref(""); // Поле поиска
const sortBy = ref("newest"); // Поле сортировки

// Загружаем объявления
onMounted(() => {
  store.fetchListings();
});

// Фильтрация объявлений
const filteredListings = computed(() => {
  const user = JSON.parse(localStorage.getItem("user")); // Авторизованный пользователь
  let filtered = store.listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  // Фильтрация "Мои объявления"
  if (route.query.user && user) {
    filtered = filtered.filter(listing => listing.owner === user.email);
  }

  // Сортировка
  if (sortBy.value === "cheapest") {
    return filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "expensive") {
    return filtered.sort((a, b) => b.price - a.price);
  }

  return filtered; // По умолчанию — сначала новые
});

// Переход к объявлению
const goToListing = (id) => {
  router.push(`/listing/${id}`);
};
</script>

<style scoped>
/* Стили */
</style>
