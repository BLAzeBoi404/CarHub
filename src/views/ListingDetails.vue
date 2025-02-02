<template>
  <div v-if="listing" class="listing-details-container">
    <div class="image-section">
      <img :src="listing.image" alt="car image" />
    </div>
    <div class="details-section">
      <h1>{{ listing.title }}</h1>
      <p>{{ listing.description }}</p>
      <p>Ціна: {{ formatPrice(listing.price) }}</p>
      <p>Марка: {{ listing.brand }}</p>
      <p>Рік випуску: {{ listing.year }}</p>
      <p>Регіон: {{ listing.region }}</p>

      <h3>Додаткові характеристики</h3>
      <ul>
        <li>Колір: {{ listing.additionalInfo.color }}</li>
        <li>Двигун: {{ listing.additionalInfo.engine }}</li>
        <li>Тип пального: {{ listing.additionalInfo.fuel }}</li>
        <li>Коробка передач: {{ listing.additionalInfo.transmission }}</li>
        <li>Тип кузова: {{ listing.additionalInfo.bodyType }}</li>
        <li>Кількість дверей: {{ listing.additionalInfo.doors }}</li>
        <li>Кількість місць: {{ listing.additionalInfo.seats }}</li>
      </ul>

      <h3>Зв'язок з власником</h3>
      <ul>
        <li>Ім'я: {{ listing.owner.name }}</li>
        <li>Контактний телефон: {{ listing.owner.phone }}</li>
        <li>Email: {{ listing.owner.email }}</li>
        <li>Адреса: {{ listing.owner.address }}</li>
      </ul>

      <button @click="goToContact">Зв'язатися з власником</button>
    </div>
  </div>
  <div v-else>
    <p>Завантаження...</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useListingsStore } from '@/store/listings';
import { ref, onMounted } from 'vue';

const route = useRoute();
const listingsStore = useListingsStore();
const listing = ref(null);

onMounted(() => {
  const foundListing = listingsStore.listings.find(item => item.id === parseInt(route.params.id));
  listing.value = foundListing || null;
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
  }).format(price);
};

const goToContact = () => {
  alert("Переход на страницу для связи с владельцем.");
};
</script>

<style scoped>
.listing-details-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.image-section {
  flex: 1;
  margin-right: 20px;
}

.image-section img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.details-section {
  flex: 1;
  max-width: 600px;
  color: #ddd;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

h3 {
  font-size: 1.4rem;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  background-color: #27ae60;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 20px;
}

button:hover {
  background-color: #219150;
}
</style>
