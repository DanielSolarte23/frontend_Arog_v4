'use client';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/publicas/ResetPassword'
import React from 'react';

export const dynamic = 'force-dynamic';

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div className='hoja-dos h-full'>
      <ResetPasswordForm initialToken={token} />
    </div>
  )
}

export default ResetPasswordPage;