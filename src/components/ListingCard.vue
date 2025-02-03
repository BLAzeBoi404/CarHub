<template>
  <div class="listing-card">
    <div class="image-container">
      <img 
        v-if="listing.images && listing.images.length" 
        :src="listing.images[0]" 
        :alt="listing.title" 
        class="listing-image"
      />
    </div>
    <div class="details">
      <h3 class="title">{{ listing.title }}</h3>
      <p class="description">{{ listing.description }}</p>
      <p class="price">{{ listing.price.toLocaleString() }} грн</p>
      <button class="details-button">Подробнее</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listing: Object
  }
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
  margin-bottom: 5px; /* Разделение изображений */
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
