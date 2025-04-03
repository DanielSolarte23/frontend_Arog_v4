// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import LoadingScreen from '@/components/LoadingScreen';

// export const ProtectedRoute = ({ 
//   children, 
//   rolesPermitidos = ["administrador"], 
//   redirectUrl = '/auth/inicio'
// }) => {
//   const { isAuthenticated, loading, usuario } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
 
//     if (!loading) {

//       if (!isAuthenticated) {
//         router.push(redirectUrl);
//         console.log('Token Invalido');
//       } 

//       else if (
//         rolesPermitidos.length > 0 && 
//         !rolesPermitidos.includes(usuario?.rol)
//       ) {
//         router.push('/acceso-denegado'); // O cualquier otra ruta para acceso denegado
//       }
//     }
//   }, [isAuthenticated, loading, usuario, router, rolesPermitidos, redirectUrl]);

//   // Mientras está cargando, mostrar pantalla de carga
//   if (loading) {
//     return <LoadingScreen />;
//   }

//   // Si no está autenticado o no tiene rol permitido, no renderizar nada
//   // (la redirección se manejará en el useEffect)
//   if (!isAuthenticated || (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario?.rol))) {
//     return null;
//   }

//   // Si está autenticado y tiene el rol permitido, mostrar el contenido
//   return children;
// };

// export default ProtectedRoute;

// "use client";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function RutasProtegidas({ children }) {
//   const { isAuthenticated, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {

//     if (!loading && isAuthenticated === false) {
//       router.push('/secure/administrador');
//     }
//   }, [isAuthenticated, loading, router]);

//   if (loading) {
//     return (
//       <div className="flex flex-col gap-2 justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-20 w-20 border-2 border-l-4 border-verde"></div>
//         <p className="text-verde text-xl font-medium">Cargando...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return <>{children}</>;
// }

"use client"
import { useAauth } from "@/context/AauthContext";
import { useRouter } from "next/navigation"; // Importar useRouter
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAauth();
  const router = useRouter(); // Usar useRouter

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/acceso-denegado"); // Usar router.push para redireccionar
    }
  }, [loading, isAuthenticated, router]); // Añadir router como dependencia

  if (loading) return <h1>Loading...</h1>;

  // Si no está autenticado y no está cargando, no renderizar nada
  if (!isAuthenticated && !loading) return null;

  return <>{children}</>;
}