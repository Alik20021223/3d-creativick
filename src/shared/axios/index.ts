import axios from 'axios';
import { useAppStore } from '@/app/store';

// const isDev = import.meta.env.DEV;

// export const APP_API = isDev
//   ? '/api/v1' // <-- пойдёт через Vite proxy
//   : import.meta.env.VITE_BACKEND_URL; // напр. "http://95.163.228.188/api/v1/"

export const APP_API = import.meta.env.VITE_BACKEND_URL;
// ? '/api/v1' // <-- пойдёт через Vite proxy
// : import.meta.env.VITE_BACKEND_URL; // напр. "http://95.163.228.188/api/v1/"

console.log(import.meta.env.VITE_BACKEND_URL);

export const axiosInstance = axios.create({
  baseURL: APP_API,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: false,
  timeout: 10000,
  paramsSerializer: (params) => {
    const searchParams = new URLSearchParams();
    
    Object.keys(params).forEach((key) => {
      const value = params[key];
      
      if (value === undefined || value === null) {
        return;
      }
      
      if (Array.isArray(value)) {
        // Для массивов используем формат key[]=value1&key[]=value2
        value.forEach((item) => {
          searchParams.append(`${key}[]`, String(item));
        });
      } else {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor для обработки ошибок авторизации
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Проверяем, является ли это ошибкой 401 Unauthorized
    if (error.response?.status === 401) {
      const responseData = error.response?.data;
      
      // Проверяем код ошибки или сообщение
      const isUnauthorizedError =
        responseData?.statusCode === 'ERROR_100' ||
        responseData?.message === 'User is not logged in.';
      
      if (isUnauthorizedError) {
        // Удаляем токен из localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        
        // Устанавливаем isAuth в false через store
        const { setIsAuth } = useAppStore.getState();
        if (setIsAuth) {
          setIsAuth(false);
        }
      }
    }
    
    return Promise.reject(error);
  },
);
