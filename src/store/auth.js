import { defineStore } from 'pinia';
import { loginUser, registerUser, setAuthToken } from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await loginUser({ email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        setAuthToken(this.token);
      } catch (error) {
        console.error('Ошибка при входе:', error);
      }
    },

    async register(username, phone, email, password) {
      try {
        const response = await registerUser({ username, phone, email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        setAuthToken(this.token);
      } catch (error) {
        console.error('Ошибка при регистрации:', error);
      }
    },

    logout() {
      this.token = '';
      this.user = null;
      setAuthToken(null);
    },

    async fetchUser() {
      // Можно добавить метод для получения данных пользователя
    },
  },
});
