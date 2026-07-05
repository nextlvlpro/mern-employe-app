import axios from 'axios';

const defaultApiUrl = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';
const apiUrl = import.meta.env.VITE_API_URL || defaultApiUrl;
const baseURL = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl.replace(/\/$/, '')}/api`;

export const api = axios.create({
  baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ems_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
