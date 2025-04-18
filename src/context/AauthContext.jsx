'use client'
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAauth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El useAauth debe estar dentro de AauthProvider");
  }
  return context;
};

export const AauthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      // No establecemos isAuthenticated como true hasta que verifique el email
      setIsAuthenticated(false);
      // Mostrar mensaje de verificación
      setErrors([res.data.message]);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
      console.log(res.data, "este es el usuario");

    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUser(null);
      }
      // console.log(cookies.token);
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false)
      }
    }
    checkLogin();
  }, []);

  const requestPasswordReset = async (email) => {
    try {
      const res = await requestPasswordResetRequest(email);
      setErrors([res.data.message]);  // Mensaje de éxito
    } catch (error) {
      setErrors([error.response.data.message || 'Hubo un error al solicitar el restablecimiento']);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const res = await resetPasswordRequest(token, password);
      setErrors([res.data.message]);  // Mensaje de éxito
    } catch (error) {
      setErrors([error.response.data.message || 'Hubo un error al restablecer la contraseña']);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
        isEmailVerified,
        setIsEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};