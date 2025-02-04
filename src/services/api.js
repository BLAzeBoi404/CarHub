import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://back-production-cf67.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchListings = () => api.get('/api/listings'); // Должно быть /api/listings

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }


export function registerUser(userData) {
  return api.post('/api/register', userData);
}

export function loginUser(userData) {
  return api.post('/api/login', userData);
}

export function fetchListings() {
  return api.get('/api/listings');
}

export function fetchListingById(id) {
  return api.get(`/api/listings/${id}`);
}
