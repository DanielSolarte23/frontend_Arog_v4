"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const LogoArog = ({ className }) => (
  <Image
    src="/ArogV2.png"
    alt="AROG Logo"
    width={80}
    height={80}
    className={className}
  />
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header con animación en scroll */}
      <header
        className={`w-full z-50 flex items-center px-4 md:px-8 justify-between fixed transition-all duration-300 ${
          isScrolled ? "py-2 bg-white shadow-xl" : "py-4 bg-white/5"
        }`}
      >
        {/* Logo y nombre */}
        <Link href="/" className="flex items-center">
          <LogoArog />
        </Link>

        {/* Menú móvil - botón hamburguesa */}
        <button
          className="md:hidden relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="w-6 flex flex-col gap-1">
            <span
              className={`block h-0.5 w-full bg-gray-800 transition-transform ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-800 transition-opacity ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-gray-800 transition-transform ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Menú de navegación - desktop */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-8 font-medium">
            <li>
              <Link
                className={` px-4 py-4 rounded-md  hover:bg-lime-700 transition-colors text-xl ${isScrolled ? "text-white bg-lime-600" : "bg-white text-verde"}`} 
                href="/auth/inicio"
              >
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link
                className={`px-4 py-4  rounded-md  hover:bg-lime-50 transition-colors text-xl border ${isScrolled ? "border-lime-600 text-lime-600" : " border-white text-white"}`}  
                href="/auth/registro"
              >
                Crear cuenta
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menú móvil - overlay */}
        <div
          className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <nav className="flex flex-col items-center">
              <ul className="flex flex-col items-center gap-8 text-xl">
                <li>
                  <a
                    className="text-gray-800 hover:text-lime-600"
                    href="#servicios"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-800 hover:text-lime-600"
                    href="#SobreNosotros"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Nosotros
                  </a>
                </li>
                <li className="mt-4">
                  <Link
                    className="bg-lime-600 px-6 py-3 rounded-md text-white text-lg"
                    href="/auth/inicio"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    className="px-6 py-3 border border-lime-600 rounded-md text-lime-600 text-lg"
                    href="/auth/registro"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Crear cuenta
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Sección Hero */}
      <section
        className="min-h-screen pt-24 md:pt-0 flex items-center hoja-verde"
        id="Inicio"
      >
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center md:mt-20">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-medium text-verde">
                Asociación de
              </p>
              <p className="text-2xl md:text-3xl font-medium">
                Recicladores de oficio
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-verde-dos mb-6">
                GOLEROS
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
                Comprometidos con el medio ambiente y la economía circular para
                un futuro sostenible.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="#servicios"
                  className="bg-lime-600 hover:bg-lime-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Nuestros servicios
                </a>
                <a
                  href="#SobreNosotros"
                  className="border border-verde text-verde hover:bg-lime-50 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Conócenos
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative bg-transparent h-full">
            <div className="relative h-80 md:h-[560px] overflow-hidden">
              <img
                className="hidden md:block absolute top-[53%]  -right-12 transform -translate-y-1/2 h-[40rem] z-10"
                src="/telefono2.png"
                alt="Aplicación AROG"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Servicios */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-verde-dos rounded-full text-sm font-medium mb-3">
              NUESTROS SERVICIOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Soluciones de reciclaje
            </h2>
            <div className="w-24 h-1 bg-lime-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img
                  src="/imagenRecoleccion.jpg"
                  alt="Servicio de recolección"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-verde-dos">
                  Recolección
                </h3>
                <p className="text-gray-600 mb-4">
                  Servicio especializado de recolección de materiales
                  reciclables directamente desde la fuente, asegurando una
                  separación adecuada para maximizar su aprovechamiento.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-lime-600 font-medium hover:text-lime-700"
                >
                  Saber más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img
                  src="/venticas.jpg"
                  alt="Servicio de estudio"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-verde-dos">
                  Estudio
                </h3>
                <p className="text-gray-600 mb-4">
                  Análisis detallado de materiales reciclables y su potencial de
                  aprovechamiento, brindando información valiosa para la toma de
                  decisiones sostenibles.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-lime-600 font-medium hover:text-lime-700"
                >
                  Saber más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img
                  src="/imagenVenta.jpg"
                  alt="Servicio de venta"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-verde-dos">
                  Venta
                </h3>
                <p className="text-gray-600 mb-4">
                  Comercialización directa de materiales reciclados de alta
                  calidad para industrias y empresas comprometidas con la
                  economía circular y la sostenibilidad.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-lime-600 font-medium hover:text-lime-700"
                >
                  Saber más
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section id="SobreNosotros" className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-3">
              QUIÉNES SOMOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">Sobre Nosotros</h2>
            <div className="w-24 h-1 bg-lime-500 mx-auto mt-6"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src="/imagenactividad.jpg"
                  alt="Actividades de reciclaje"
                  className="rounded-xl object-cover w-full shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-lime-500 text-white p-4 rounded-lg hidden md:block">
                  <p className="text-3xl font-bold">10+</p>
                  <p>Años de experiencia</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <span className="text-lime-600 font-semibold text-lg">AROG</span>
              <h3 className="text-3xl font-bold mt-2 mb-6 text-verde-dos">
                Asociación de recicladores de oficio goleros
              </h3>

              <div className="space-y-4 mb-8">
                <p className="text-gray-600">
                  Somos una asociación comprometida con el medio ambiente y la
                  economía circular. Nuestro equipo de recicladores
                  profesionales trabaja diariamente para transformar residuos en
                  recursos valiosos, generando impacto positivo en nuestras
                  comunidades y en el planeta.
                </p>
              </div>

              <div className="flex space-x-4 mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Compromiso ambiental</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Certificados</span>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center text-lime-600 font-medium hover:text-lime-700"
              >
                Conoce más sobre nosotros
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <div className="flex items-center mt-8 p-4 bg-gray-50 rounded-lg shadow-sm">
                <img
                  src="https://s2-oglobo.glbimg.com/-0dni84YWVLwPxS6-f6_Wqkmy-4=/0x0:850x572/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/d/v/kFDwF0T3q2wkwvGH0DjA/whatsapp-image-2022-10-03-at-15.34.37.jpeg"
                  alt="Maria Anaya"
                  className="w-16 h-16 rounded-full object-cover border-2 border-lime-500"
                />
                <div className="ml-4">
                  <p className="font-medium text-lg">Maria Anaya</p>
                  <p className="text-gray-500">Directora Ejecutiva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="py-16 bg-verde-dos text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-white">2500+</div>
              <div className="text-white">Toneladas recicladas</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-white">150+</div>
              <div className="text-white">Clientes activos</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-white">40+</div>
              <div className="text-white">Recicladores</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 text-white">10+</div>
              <div className="text-white">Años de experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">
                  ¿Listo para empezar a reciclar?
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestra comunidad de recicladores y contribuye a crear
                  un futuro más sostenible.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/auth/registro"
                    className="bg-lime-600 hover:bg-lime-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Crear cuenta
                  </Link>
                  <a
                    href="#"
                    className="border border-gray-300 hover:border-lime-600 text-gray-700 hover:text-lime-600 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Contactarnos
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 bg-lime-100 p-8 md:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-verde"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Descarga nuestra app
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Gestiona tus residuos reciclables desde tu teléfono
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="bg-black text-white rounded-lg py-2 px-4 flex items-center gap-2"
                    >
                      <i className="fa-brands fa-app-store-ios"></i>
                      App Store
                    </a>
                    <a
                      href="#"
                      className="bg-black text-white rounded-lg py-2 px-4 flex items-center gap-2"
                    >
                      <i className="fa-brands fa-google-play"></i>
                      Play Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-verde-dos  text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Columna 1 - Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Enlaces</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#Inicio"
                    className="hover:text-green-300 transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="hover:text-green-300 transition-colors"
                  >
                    Nuestros Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#SobreNosotros"
                    className="hover:text-green-300 transition-colors"
                  >
                    Sobre Nosotros
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 2 - Ubicaciones */}
            <div>
              <h4 className="font-bold text-lg mb-4">Ubicaciones</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-300 transition-colors"
                  >
                    Planta de tratamiento
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-300 transition-colors"
                  >
                    Galería Barrio Bolívar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-300 transition-colors"
                  >
                    Galería La Esmeralda
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 3 - Servicios */}
            <div>
              <h4 className="font-bold text-lg mb-4">Servicios</h4>
              <ul className="space-y-2">
                <li className="hover:text-green-300 transition-colors">
                  Recolección
                </li>
                <li className="hover:text-green-300 transition-colors">
                  Tratamiento
                </li>
                <li className="hover:text-green-300 transition-colors">
                  Venta
                </li>
              </ul>
            </div>

            {/* Columna 4 - Contacto */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +57 3145677880
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  arog@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <hr className="my-8 border-verde" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <a href="#">
              <img src="/Arogbl.png" alt="AROG Logo" className="h-16 w-auto" />
            </a>
            <p className="mt-4 md:mt-0 text-sm text-green-200">
              © Copyright 2024. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
