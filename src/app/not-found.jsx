import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center p-6 max-w-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          href="/"
          className="bg-lime-600 hover:bg-lime-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}