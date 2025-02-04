<template>
  <div class="auth-container">
    <h2>Вхід в кабінет</h2>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit" :disabled="loading">Вхід</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "@/services/api";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await loginUser({ email: email.value, password: password.value });
    localStorage.setItem("user", JSON.stringify(response.data));
    router.push("/profile");
  } catch (err) {
    errorMessage.value = "Ошибка входа: " + (err.response?.data?.message || "Невідомо");
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

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
}

.alternative-actions {
  text-align: center;
  margin-top: 10px;
}

.alternative-actions p {
  color: #8dc4ff;
  cursor: pointer;
}

.register-link {
  color: var(--primary-color);
  text-decoration: none;
}

.register-link:hover {
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
