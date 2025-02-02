<script setup>
import { ref, computed } from "vue";
import { useListingsStore } from "@/store/listings";
import { useRouter } from "vue-router";

const store = useListingsStore();
const router = useRouter();

// Поля для заполнения объявления
const title = ref("");
const brand = ref("");
const price = ref("");
const description = ref("");
const image = ref(null); // Для загрузки изображения
const allModels = ref(["Model S", "Model X", "Civic", "Corolla"]); // Список существующих моделей

// Фильтрация моделей для автозаполнения
const filteredModels = computed(() => {
  return allModels.value.filter((model) =>
    model.toLowerCase().includes(title.value.toLowerCase())
  );
});

// Проверка авторизации
const isLoggedIn = computed(() => {
  return !!localStorage.getItem("user"); // Проверка авторизации через localStorage
});

// Добавление нового объявления
const submitListing = () => {
  // Валидация полей
  if (!title.value || !brand.value || !price.value || !description.value || !image.value) {
    alert("Заполните все поля!");
    return;
  }

  if (!isLoggedIn.value) {
    alert("Для добавления объявления необходимо войти!");
    return;
  }

  store.addListing({
    title: title.value,
    brand: brand.value,
    price: parseInt(price.value),
    description: description.value,
    image: URL.createObjectURL(image.value), // Преобразуем файл в URL
  });

  alert("Объявление добавлено!");
  title.value = "";
  brand.value = "";
  price.value = "";
  description.value = "";
  image.value = null;
};

// Возврат в профиль
const goBack = () => {
  router.push("/profile");
};
</script>

<template>
  <div class="sell-form">
    <h1 class="form-title">Продать авто</h1>

    <!-- Поле "Модель" с автозаполнением -->
    <div class="form-group">
      <input
        v-model="title"
        @input="filteredModels"
        placeholder="Модель"
        list="models"
        required
      />
      <datalist id="models">
        <option v-for="model in filteredModels" :key="model" :value="model" />
      </datalist>
    </div>

    <!-- Поле "Марка" -->
    <div class="form-group">
      <input v-model="brand" placeholder="Марка" required />
    </div>

    <!-- Поле "Цена" с ограничением только на числа -->
    <div class="form-group">
      <input
        v-model="price"
        type="number"
        placeholder="Цена"
        min="0"
        required
      />
    </div>

    <!-- Поле "Описание" -->
    <div class="form-group">
      <textarea v-model="description" placeholder="Описание" required></textarea>
    </div>

    <!-- Загрузка изображения -->
    <div class="form-group">
      <label for="image-upload" class="upload-label">Добавить изображение:</label>
      <input
        id="image-upload"
        type="file"
        @change="(e) => (image.value = e.target.files[0])"
        accept="image/*"
        required
      />
    </div>

    <!-- Кнопки -->
    <div class="form-actions">
      <button @click="submitListing" class="button submit">Опубликовать</button>
      <button @click="goBack" class="button back">Назад</button>
    </div>
  </div>
</template>

<style scoped>
.sell-form {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #028a68;;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  height: 100px;
  resize: none;
}

.upload-label {
  display: block;
  margin-bottom: 5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit {
  background: #007bff;
  color: white;
}

.submit:hover {
  background: #0056b3;
}

.back {
  background: gray;
  color: white;
}

.back:hover {
  background: darkgray;
}
</style>
