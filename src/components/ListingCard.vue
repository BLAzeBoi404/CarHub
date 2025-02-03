<template>
  <div class="listing-card" @click="goToDetails">
    <div class="image-container">
      <img :src="listing.image" alt="listing.title" />
    </div>
    <div class="details">
      <h3>{{ listing.title }}</h3>
      <p>{{ listing.description }}</p>
      <p class="price">{{ formatPrice(listing.price) }}</p>
      <button class="detail-button">Подробнее</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Получаем данные о listing через props
const props = defineProps({
  listing: Object, // Убедитесь, что передаете объект listing
});

const router = useRouter();

// Переход на страницу с полным описанием
const goToDetails = () => {
  router.push({ name: 'listing-details', params: { id: props.listing.id } });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
  }).format(price);
};
</script>

<style scoped>
.listing-card {
  background: linear-gradient(135deg, #1d4b33, #27ae60);
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-container {
  height: 200px;
  overflow: hidden;
  border-bottom: 2px solid #fff;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}

h3 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffab00;
}
</style>
