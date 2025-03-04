import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3002/api',
  withCredentials: true, // Importante para que las cookies sean enviadas con las solicitudes
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de autenticación (401)
    if (error.response && error.response.status === 401) {
      // Redirigir a la página de login o mostrar mensaje
      console.error('Sesión expirada o no autenticado');
      // Si estamos usando React Router, podríamos redirigir:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;