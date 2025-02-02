<template>
  <div class="filter-sidebar">
    <!-- Категорія -->
    <div class="filter-group">
      <label>Категорія:</label>
      <select v-model="filters.category">
        <option value="">Будь-яка</option>
        <option value="Легкові">Легкові</option>
        <option value="Вантажні">Вантажні</option>
        <option value="Пікапи">Пікапи</option>
      </select>
    </div>

    <!-- Марка -->
    <div class="filter-group">
      <label>Марка:</label>
      <select v-model="filters.brand">
        <option value="">Будь-яка</option>
        <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
    </div>

    <!-- Модель -->
    <div class="filter-group">
      <label>Модель:</label>
      <select v-model="filters.model">
        <option value="">Будь-яка</option>
        <option v-for="model in uniqueModels" :key="model" :value="model">{{ model }}</option>
      </select>
    </div>

    <!-- Рік випуску -->
    <div class="filter-group">
      <label>Рік випуску:</label>
      <div class="range-container">
        <input type="number" v-model="filters.yearFrom" placeholder="від" min="1900" />
        <input type="number" v-model="filters.yearTo" placeholder="до" min="1900" />
      </div>
    </div>

    <!-- Ціна -->
    <div class="filter-group">
      <label>Ціна (грн):</label>
      <div class="range-container">
        <input type="number" v-model="filters.priceFrom" placeholder="від" min="0" />
        <input type="number" v-model="filters.priceTo" placeholder="до" min="0" />
      </div>
    </div>

    <!-- Пошук -->
    <div class="filter-group">
      <label>Пошук:</label>
      <input type="text" v-model="filters.search" placeholder="Наприклад, Київ або Camry" />
    </div>

    <!-- Кнопки поиска и сброса -->
    <div class="button-container">
      <button @click="applyFilters">Пошук</button>
      <button @click="resetFilters">Очистити</button>
    </div>
  </div>
</template>

<script>
import { useListingsStore } from "@/store/listings";

export default {
  data() {
    return {
      filters: {
        category: "",
        brand: "",
        model: "",
        yearFrom: null,
        yearTo: null,
        priceFrom: null,
        priceTo: null,
        search: "",
      },
    };
  },
  computed: {
    uniqueBrands() {
      const store = useListingsStore();
      return [...new Set(store.listings.map((listing) => listing.brand))];
    },
    uniqueModels() {
      const store = useListingsStore();
      return [...new Set(store.listings.map((listing) => listing.model))];
    },
  },
  methods: {
    applyFilters() {
      this.$emit("filter", this.filters); // Передаем фильтры родительскому компоненту
    },
    resetFilters() {
      this.filters = {
        category: "",
        brand: "",
        model: "",
        yearFrom: null,
        yearTo: null,
        priceFrom: null,
        priceTo: null,
        search: "",
      };
    },
  },
};
</script>

<style scoped>
/* Стили для бокового фильтра */
.filter-sidebar {
  width: 320px;
  padding: 20px;
  background-color: #2c3e50;
  color: #fff;
  border-radius: 10px;
  position: fixed;
  top: 80px;
  right: 0;
  height: calc(100vh - 80px); /* Устанавливаем высоту фильтра на всю страницу */
  overflow-y: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.filter-group select,
.filter-group input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
}

.range-container {
  display: flex;
  gap: 10px;
}

.range-container input {
  width: 48%;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 48%;
}

button:hover {
  background-color: #2980b9;
}

button:active {
  background-color: #1c6390;
}
</style>
  