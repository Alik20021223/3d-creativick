import axios from 'axios';

const isDev = import.meta.env.DEV;

export const APP_API = isDev
  ? '/api/v1' // <-- пойдёт через Vite proxy
  : import.meta.env.VITE_BACKEND_URL; // напр. "http://95.163.228.188/api/v1/"

export const axiosInstance = axios.create({
  baseURL: APP_API,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
