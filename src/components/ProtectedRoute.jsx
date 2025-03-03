'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/LoadingScreen'; // Deberás crear este componente

export const ProtectedRoute = ({ 
  children, 
  rolesPermitidos = [], // Array vacío permite a cualquier usuario autenticado
  redirectUrl = '/auth/inicio'
}) => {
  const { isAuthenticated, loading, usuario } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo verificamos cuando ya no está cargando
    if (!loading) {
      // Si no está autenticado, redirigir al login
      if (!isAuthenticated) {
        router.push(redirectUrl);
        console.log('Token Invalido');
      } 
      // Si hay roles permitidos y el usuario no tiene el rol necesario
      else if (
        rolesPermitidos.length > 0 && 
        !rolesPermitidos.includes(usuario?.rol)
      ) {
        router.push('/acceso-denegado'); // O cualquier otra ruta para acceso denegado
      }
    }
  }, [isAuthenticated, loading, usuario, router, rolesPermitidos, redirectUrl]);

  // Mientras está cargando, mostrar pantalla de carga
  if (loading) {
    return <LoadingScreen />;
  }

  // Si no está autenticado o no tiene rol permitido, no renderizar nada
  // (la redirección se manejará en el useEffect)
  if (!isAuthenticated || (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario?.rol))) {
    return null;
  }

  // Si está autenticado y tiene el rol permitido, mostrar el contenido
  return children;
};

export default ProtectedRoute;