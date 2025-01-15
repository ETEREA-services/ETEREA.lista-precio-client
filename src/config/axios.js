import axios from 'axios';
import BACKEND from '../config';

const axiosInstance = axios.create({
  baseURL: `${BACKEND}/core`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance; 