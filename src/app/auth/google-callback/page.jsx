'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function GoogleCallback() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // El token ya estará en las cookies, solo necesitamos esperar a que checkLogin() termine
    if (!loading) {
      if (isAuthenticated) {
        router.push('/secure/administrador');
      } else {
        router.push('/auth/login?error=authentication_failed');
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Procesando autenticación...</p>
    </div>
  );
}