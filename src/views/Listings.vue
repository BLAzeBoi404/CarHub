<template>
  <div class="listings-page">
    <div class="filter-sidebar-container">
      <FilterSidebar @filter="applyFilters" />
    </div>

    <div class="listings-container">
      <div v-if="filteredListings.length > 0" class="listings-grid">
        <ListingCard v-for="listing in filteredListings" :key="listing.id" :listing="listing" />
      </div>
      <div v-else>
        <p>Немає оголошень за вашим запитом.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useListingsStore } from "@/store/listings";
import FilterSidebar from "@/components/FilterSidebar.vue";
import ListingCard from "@/components/ListingCard.vue";

const listingsStore = useListingsStore();
const filteredListings = ref([]);

onMounted(() => {
  listingsStore.fetchListings();
  filteredListings.value = listingsStore.filteredListings;
});

const applyFilters = (filters) => {
  listingsStore.filterListings(filters);
  filteredListings.value = listingsStore.filteredListings;
};
</script>

<style scoped>
.listings-page {
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  gap: 20px;
}

.listings-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
}

p {
  text-align: center;
  font-size: 1.2rem;
  color: var(--secondary-color);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .listings-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .listings-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .listings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
