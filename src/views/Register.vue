<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Имя пользователя" />
      <input v-model="password" type="password" placeholder="Пароль" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleRegister = async () => {
  await authStore.register({ username: username.value, password: password.value });
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
