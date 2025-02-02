<template>
  <div class="admin-profile">
    <h1>Панель администратора</h1>
    <p>Добро пожаловать, <strong>{{ user?.email || 'Администратор' }}</strong>!</p>

    <!-- Список пользователей -->
    <div class="user-list">
      <h2>Управление пользователями</h2>
      <ul>
        <li v-for="user in users" :key="user.email">
          {{ user.email }} - <strong>{{ user.role }}</strong>
          <button @click="changeRole(user.email)" class="button is-small is-primary">
            Сменить роль
          </button>
        </li>
      </ul>
    </div>

    <!-- Кнопки управления -->
    <div class="actions">
      <button class="button is-warning" @click="updateAdminData">Обновить данные</button>
      <button class="button is-secondary" @click="goBack">Вернуться назад</button>
      <button class="button is-danger" @click="logout">Выйти</button>
    </div>

    <!-- Тестовая кнопка: "Войти как админ" -->
    <div v-if="showAdminTestButton" class="admin-test">
      <button @click="loginAsAdmin" class="button is-success">Войти как администратор</button>
    </div>

    <!-- Строка для настройки бэкенда -->
    <div v-if="isBackendConfigured" class="backend-config">
      <p><strong>Настройка бэкенда:</strong> Возможности изменять роли через сервер включены.</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";

export default {
  data() {
    return {
      // Список пользователей для демонстрации
      users: [
        { email: "user@example.com", role: "user" },
        { email: "admin@example.com", role: "admin" },
      ],
      isBackendConfigured: true, // Переключатель для бэкенда (будет использоваться в будущем)
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    // Условие для отображения кнопки "Войти как админ" (можно отключить)
    showAdminTestButton() {
      return !this.user || this.user.role !== "admin";
    },
  },
  methods: {
    updateAdminData() {
      console.log("Данные администратора обновлены");
      if (this.isBackendConfigured) {
        // Здесь будет код для обращения к бэкенду для обновления данных
        alert("Обновление данных через сервер (заглушка).");
      }
    },
    goBack() {
      this.$router.push("/profile");
    },
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    },
    changeRole(email) {
      // Для бэкенда это будет запрос, но для текущего примера — просто изменение данных локально
      if (this.isBackendConfigured) {
        alert("Изменение роли через сервер");
        // Заглушка для работы с сервером
        // Здесь будет отправка данных на сервер, чтобы изменить роль
      } else {
        const user = this.users.find((u) => u.email === email);
        if (user) {
          user.role = user.role === "user" ? "admin" : "user";
          alert(`Роль пользователя ${email} изменена на ${user.role}`);
        }
      }
    },
    loginAsAdmin() {
      // Функция для тестирования входа как администратор
      const adminUser = {
        email: "admin@example.com",
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(adminUser));
      this.$router.push("/admin");
    },
  },
};
</script>

<style scoped>
.admin-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
}

.user-list {
  width: 100%;
  max-width: 600px;
  text-align: left;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  margin-left: 10px;
}

.actions {
  display: flex;
  gap: 10px;
}

.admin-test {
  margin-top: 20px;
}

.backend-config {
  margin-top: 20px;
  background: #eef2f7;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
