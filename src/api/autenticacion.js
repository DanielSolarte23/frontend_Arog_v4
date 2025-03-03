import axios from './axios';

// Función para iniciar el flujo de Auth0 - Google
// Función para iniciar el flujo de Auth0 - Google
export const iniciarSesionConGoogle = () => {
  // Hacer la petición al backend en lugar de redireccionar directamente
  return axios.get('/auth/inicio/google')
    .then(response => {
      window.location.href = response.data.loginUrl;
    })
    .catch(error => console.error("Error en la autenticación:", error));
};


// Función para iniciar sesión
export const inicioRequest = (user) => axios.post('/auth/inicio', user);

// Función para registrar un nuevo usuario
export const registroRequest = (user) => axios.post('/auth/registro', user);

// Función para obtener los datos del usuario actual
export const obtenerUsuarioActualRequest = () => axios.get('/usuario-actual');

// Función para cerrar sesión
export const cerrarSesionRequest = () => axios.post('/cerrar-sesion');

// Función para cambiar contraseña
export const cambiarContraseñaRequest = (passwordData) => axios.post('/cambiar-contrasena', passwordData);

// En tu archivo de API
export const verifyTokenRequest = async (token) => {
  return axios.get('/api/auth/verify-token', {
    headers: {
      Cookie: `token=${token}`
    },
    withCredentials: true 
  });
};