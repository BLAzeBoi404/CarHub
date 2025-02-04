import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://back-production-cf67.up.railway.app';

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

// Экспорты функций API
export const fetchListings = () => api.get('/api/listings');

export function registerUser(userData) {
  return api.post('/api/register', userData);
}

export function loginUser(userData) {
  return api.post('/api/login', userData);
}

export function fetchListingById(id) {
  return api.get(`/api/listings/${id}`);
}
