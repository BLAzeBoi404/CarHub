import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),

  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('/api/login', { username, password });
        this.token = response.data.token;
        localStorage.setItem('token', this.token); // TODO: Перенести токен в secure storage
        axios.defaults.headers['Authorization'] = `Bearer ${this.token}`;
      } catch (error) {
        // TODO: Добавить обработку ошибок (например, вывести уведомление)
        console.error('Login failed', error);
      }
    },

    async logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers['Authorization'];
    },

    async getUserInfo() {
      // TODO: Реализовать запрос для получения информации о пользователе
      try {
        const response = await axios.get('/api/me');  // Эндпоинт, который возвращает данные пользователя
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    }
  }
});
