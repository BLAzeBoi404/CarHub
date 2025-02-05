import axios from 'axios';

// Определяем базовый URL API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://back-production-cf67.up.railway.app';

// Создаем экземпляр axios с настройками
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Функция для установки токена авторизации
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

// Установка токена, если он есть в localStorage
const token = localStorage.getItem('token');
setAuthToken(token);  // Используем функцию для установки токена

// Экспортируем функции API для работы с объявлениями
export const fetchListings = () => api.get('/api/listings');
export const fetchListingById = (id) => api.get(`/api/listings/${id}`);

// Функция для регистрации пользователя
export function registerUser(userData) {
  return api.post('/api/register', userData);
}

// Функция для логина пользователя
export function loginUser(userData) {
  return api.post('/api/login', userData);
}
