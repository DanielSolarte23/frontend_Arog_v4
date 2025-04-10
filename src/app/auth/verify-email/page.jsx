'use client';
import EmailVerificationContent from '@/components/publicas/EmailVerification';
import LoadingScreenIni from '@/components/publicas/LoadingScreenInicio';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

// Componente de carga
function Loading() {
  return <LoadingScreenIni />;
}

// Componente que extrae el token de searchParams
function VerifyEmailWithParams() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return <EmailVerificationContent token={token} />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailWithParams />
    </Suspense>
  );
}