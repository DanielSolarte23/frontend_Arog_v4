'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyEmailRequest } from '@/api/auth'; // Ajusta la ruta

const EmailVerificationContent = ({ token }) => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const router = useRouter();

  // Ahora usamos useState con un efecto inmediato
  useState(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          await verifyEmailRequest(token);
          setVerificationStatus('success');
        } catch (error) {
          setVerificationStatus('error');
        }
      } else {
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-full">
      <article className="w-full flex justify-center h-full items-center blackBlock">
        <div className="w-2/6 2xl:p-10 h-full rounded-md flex flex-col justify-center">
          <div className="border 2xl:py-5 py-3 px-10 rounded-xl h-[90%] contain shadow-2xl">
            <div className="h-[20%] flex justify-center items-center">
              {/* <Logo className="2xl:w-32 w-24" /> */}
            </div>
            <div className="text-center">
              {verificationStatus === 'verifying' && (
                <h2 className="text-2xl font-bold text-white">
                  Verificando tu correo electrónico...
                </h2>
              )}
              {verificationStatus === 'success' && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    ¡Correo verificado exitosamente!
                  </h2>
                  <button
                    onClick={() => router.push('/login')}
                    className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
                  >
                    Ir al inicio de sesión
                  </button>
                </>
              )}
              {verificationStatus === 'error' && (
                <>
                  <h2 className="text-2xl font-bold text-red-500 mb-4">
                    Error en la verificación
                  </h2>
                  <p className="text-white mb-4">
                    El enlace no es válido o ha expirado.
                  </p>
                  <button
                    onClick={() => router.push('/login')}
                    className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
                  >
                    Volver al inicio
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EmailVerificationContent;
// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // Importa useRouter
// import { verifyEmailRequest } from '@/api/auth'; // Ajusta la ruta

// const EmailVerification = () => {
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const router = useRouter(); 
//   const { query, isReady } = router; 
//   const token = query.token; // Obtén el token de la URL

//   useEffect(() => {
//     // Verifica si el router está listo y si el token está disponible
//     const verifyEmail = async () => {
//       if (isReady && token) {
//         try {
//           await verifyEmailRequest(token);
//           setVerificationStatus('success');
//         } catch (error) {
//           setVerificationStatus('error');
//         }
//       }
//     };

//     verifyEmail();
//   }, [isReady, token]); 

//   return (
//     <div className="flex items-center justify-center h-full">
//       <article className="w-full flex justify-center h-full items-center blackBlock">
//         <div className="w-2/6 2xl:p-10 h-full rounded-md flex flex-col justify-center">
//           <div className="border 2xl:py-5 py-3 px-10 rounded-xl h-[90%] contain shadow-2xl">
//             <div className="h-[20%] flex justify-center items-center">
//               {/* <Logo className="2xl:w-32 w-24" /> */}
//             </div>
//             <div className="text-center">
//               {verificationStatus === 'verifying' && (
//                 <h2 className="text-2xl font-bold text-white">
//                   Verificando tu correo electrónico...
//                 </h2>
//               )}
//               {verificationStatus === 'success' && (
//                 <>
//                   <h2 className="text-2xl font-bold text-white mb-4">
//                     ¡Correo verificado exitosamente!
//                   </h2>
//                   <button
//                     onClick={() => router.push('/login')} // Usa router.push
//                     className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
//                   >
//                     Ir al inicio de sesión
//                   </button>
//                 </>
//               )}
//               {verificationStatus === 'error' && (
//                 <>
//                   <h2 className="text-2xl font-bold text-red-500 mb-4">
//                     Error en la verificación
//                   </h2>
//                   <p className="text-white mb-4">
//                     El enlace no es válido o ha expirado.
//                   </p>
//                   <button
//                     onClick={() => router.push('/login')} // Usa router.push
//                     className="bg-red-700 px-6 py-2 rounded-md hover:bg-red-800 text-xl text-white font-semibold"
//                   >
//                     Volver al inicio
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </article>
//     </div>
//   );
// };

// export default EmailVerification;
