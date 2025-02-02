<template>
    <div>
      <h1>Фільтрація товарів</h1>
      <FilterForm />
    </div>
  </template>
  
  <script>
  import FilterForm from "@/components/FilterForm.vue"; // Импорт компонента FilterForm
  
  export default {
    name: "FilterView",
    components: {
      FilterForm, // Регистрация компонента
    },
  };
  </script>
  
  <style scoped>
  /* Стили для страницы */
  </style>
  