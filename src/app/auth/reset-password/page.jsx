// app/auth/reset-password/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/ResetPasswordForm'; // Ajusta la ruta
import React, { Suspense } from 'react';
import LoadingScreenIni from '@/components/publicas/LoadingScreenInicio';

export const dynamic = 'force-dynamic';

// Componente de carga mientras se resuelve la suspensión
function Loading() {
  return <LoadingScreenIni />;
}

// Componente que usa useSearchParams dentro de Suspense
function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return <ResetPasswordForm initialToken={token} />;
}

function ResetPasswordPage() {
  return (
    <div className='hoja-dos h-full'>
      <Suspense fallback={<Loading />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}

export default ResetPasswordPage;