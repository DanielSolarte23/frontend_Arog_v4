'use client';
import Cookies from "js-cookie";
import { createContext, useState, useEffect, useContext } from 'react';
import {
  inicioRequest,
  registroRequest,
  cerrarSesionRequest,
  obtenerUsuarioActualRequest,
  cambiarContraseñaRequest,
  verifyTokenRequest,
} from '@/api/autenticacion';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUsuario(null)
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return
        }

        setIsAuthenticated(true);
        setUsuario(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false);
        setUsuario(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  // Función para manejar el registro
  const registro = async (userData) => {
    try {
      setErrors(null);
      const res = await registroRequest(userData);

      if (res.data.success) {
        setUsuario(res.data.user);
        setIsAuthenticated(true);
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setErrors(error.response?.data?.message || 'Error al registrar usuario');
      return { success: false, message: error.response?.data?.message || 'Error al registrar usuario' };
    }
  };

  // Función para iniciar sesión
  const inicio = async (credentials) => {
    try {
      setErrors(null);
      const res = await inicioRequest(credentials);

      if (res.data.success) {
        setUsuario(res.data.user);
        setIsAuthenticated(true);
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      setErrors(error.response?.data?.message || 'Credenciales inválidas');
      return { success: false, message: error.response?.data?.message || 'Credenciales inválidas' };
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      const res = await cerrarSesionRequest();

      if (res.data.success) {
        setUsuario(null);
        setIsAuthenticated(false);
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { success: false, message: error.response?.data?.message || 'Error al cerrar sesión' };
    }
  };

  // Función para cambiar contraseña
  const cambiarContraseña = async (passwordData) => {
    try {
      setErrors(null);
      const res = await cambiarContraseñaRequest(passwordData);

      if (res.data.success) {
        return { success: true, message: res.data.message };
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      setErrors(error.response?.data?.message || 'Error al cambiar contraseña');
      return { success: false, message: error.response?.data?.message || 'Error al cambiar contraseña' };
    }
  };

  const googleLogin = () => {
    window.location.href = 'https://backend-arog-v4.onrender.com/api/auth/google';
  }

  // Limpieza de errores
  const clearErrors = () => {
    setErrors(null);
  };

  const contextValue = {
    usuario,
    isAuthenticated,
    loading,
    errors,
    registro,
    inicio,
    cerrarSesion,
    cambiarContraseña,
    clearErrors,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;