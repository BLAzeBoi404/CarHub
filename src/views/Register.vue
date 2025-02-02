<template>
  <div class="auth-container">
    <h2>Реєстрація</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Поля для регистрации -->
      <label for="username">Ім'я користувача</label>
      <input type="text" id="username" v-model="username" required />

      <label for="phone">Номер телефону</label>
      <input type="text" id="phone" v-model="phone" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" :disabled="loading">Зареєструватись</button>

      <div class="alternative-actions">
        <p>
          Вже є акаунт?
          <router-link to="/login" class="login-link">Увійти</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

// Функция для обработки отправки формы
const handleSubmit = async () => {
  loading.value = true;
  try {
    const data = {
      username: username.value,
      phone: phone.value,
      email: email.value,
      password: password.value
    };

    let response = await axios.post("/api/register", data);
    localStorage.setItem("user", JSON.stringify(response.data));
    router.push("/profile"); // Перенаправление на профиль
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 20px;
  background: #026048;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
}

h2 {
  font-size: 1.8rem;
  color: #333;
  text-align: center;
}

form {
  width: 100%;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #ffffff;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #064e9a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #ffffff;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.alternative-actions {
  text-align: center;
  margin-top: 10px;
}

.alternative-actions p {
  color: #8dc4ff;
  cursor: pointer;
}

.login-link {
  color: var(--primary-color);
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 768px) {
  .auth-container {
    padding: 20px;
  }

  h2 {
    font-size: 1.6rem;
  }
}
</style>
