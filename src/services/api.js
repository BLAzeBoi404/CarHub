import axios from 'axios';

const API_BASE_URL = 'https://back-production-cf67.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = (userData) => api.post('/register', userData);
export const loginUser = (userData) => api.post('/login', userData);
export const fetchListings = () => api.get('/listings');
export const fetchListingById = (id) => api.get(`/listing/${id}`);
