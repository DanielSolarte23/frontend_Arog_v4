"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoArog from "../publicas/LogoArog";

export default function BarraLateral() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubMenu = (menuName) => {
    setActiveSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 830) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      };
  
      // Configuración inicial
      handleResize(); // Llamar inmediatamente para establecer el estado
  
      // Agregar el event listener para manejar el cambio de tamaño
      window.addEventListener("resize", handleResize);
  
      // Limpiar el event listener cuando el componente se desmonte
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  

  const menuItems = [
    {
      icon: "fa-location-arrow",
      text: "Gestión de rutas",
      href: "/secure/administrador/rutas",
      pathname: "/secure/administrador/rutas",
    },
    {
      icon: "fa-list-check",
      text: "Asignación de tareas",
      href: "/secure/administrador/tareas",
      pathname: "/secure/administrador/tareas",
    },
    {
      icon: "fa-user",
      text: "Gestión de usuarios",
      href: "/secure/administrador/usuarios",
      pathname: "/secure/administrador/usuarios",
    },
    {
      icon: "fa-sack-dollar",
      text: "Pagos",
      href: "/secure/administrador/pagos",
      pathname: "/secure/administrador/pagos",
    },
    {
      icon: "fa-circle-exclamation",
      text: "Registro incidencias",
      href: "/secure/administrador/incidentes",
      pathname: "/secure/administrador/incidentes",
    },
    {
      icon: "fa-image",
      text: "Registro fotográfico",
      href: "/secure/administrador/galeria",
      pathname: "/secure/administrador/galeria",
    },
    {
      icon: "fa-circle-question",
      text: "Encuestas",
      href: "/secure/administrador/encuestas",
      pathname: "/secure/administrador/encuestas",
    },
    {
      icon: "fa-file-lines",
      text: "Formatos",
      href: "/secure/administrador/registros",
      pathname: "/secure/administrador/registros",
    },
    {
      icon: "fa-chart-simple",
      text: "Estadisticas",
      href: "/secure/administrador/estadisticas",
      pathname: "/secure/administrador/estadisticas",
    },
    {
      icon: "fa-circle-check",
      text: "Informes y certificados",
      href: "/secure/administrador/archivo",
      pathname: "/secure/administrador/archivo",
    },
  ];

  const subMenus = {
    // formatos: {
    //     icon: "fa-file-lines",
    //     text: "Formatos de registro",
    //     href: "/secure/administrador/registros",
    //     pathname: "/secure/administrador/registros",
    //     items: [
    //         { text: "Registro de recolección en fuentes", href: "/secure/administrador/recoleccion-fuentes", pathname: "/secure/administrador/recoleccion-fuentes" },
    //         { text: "Formato registro operativo en ruta", href: "/secure/administrador/registro-operativo-ruta", pathname: "/secure/administrador/registro-operativo-ruta" }
    //     ]
    // },
    // estadisticas: {
    //   icon: "fa-chart-simple",
    //   text: "Estadísticas y métricas",
    //   href: "",
    //   items: [
    //     {
    //       text: "Estadísticas",
    //       href: "/secure/administrador/estadisticas",
    //       pathname: "/secure/administrador/estadisticas",
    //     },
    //     {
    //       text: "Métricas",
    //       href: "/secure/administrador/metricas",
    //       pathname: "/secure/administrador/metricas",
    //     },
    //   ],
    // },
    // informes: {
    //   icon: "fa-circle-check",
    //   text: "Informes y Certificados",
    //   href: "/secure/administrador/archivo",
    //   pathname: "/secure/administrador/archivo",
    //   items: [
    //     {
    //       text: "Informes",
    //       href: "/secure/administrador/informes",
    //       pathname: "/secure/administrador/informes",
    //     },
    //     {
    //       text: "Certificados",
    //       href: "/secure/administrador/certificados",
    //       pathname: "/secure/administrador/certificados",
    //     },
    //   ],
    // },
  };

  return (
    <div className="w-full h-full">
      {/* Barra lateral */}
      <div
    //   className="sidebar h-full  scrollbar bottom-0 xl:left-0 bg-white transition-all duration-300 ease-in-out border"
        className={`sidebar h-full  scrollbar bottom-0 xl:left-0 bg-white transition-all duration-300 ease-in-out border w-2/10 fixed`}
      >
        <div className="flex justify-between items-center px-4 py-4 h-[15%] ">
          <div
            className={`flex items-center ${
              isOpen ? "justify-start" : "justify-center w-full"
            }`}
          >
            <LogoArog
              className={`${
                isOpen
                  ? "w-12 h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20"
                  : "w-10 h-10"
              }`}
            />
          </div>
          {/* <button
                            className="p-2 rounded-lg text-gray-500 hover:bg-verde-principal hover:text-white transition-colors"
                            onClick={handleToggle}
                        >
                            {isOpen ? (
                                <i className="fa-solid fa-chevron-left"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-right"></i>
                            )}
                        </button> */}
        </div>

        {/* <hr className="my-2 border-gray-200" /> */}

        <div className="px-2 py-2">
          {/* Menú principal */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`p-2.5  flex items-center justify-center rounded-md px-4 duration-300 cursor-pointer hover:bg-verde-principal text-verde-dos hover:text-white group ${
                  pathname === item.pathname ? "bg-verde text-white" : ""
                }`}
              >
                <div
                  className={`flex items-center ${
                    isOpen ? "w-full" : "justify-center "
                  }`}
                >
                  <i
                    className={`fa-solid ${item.icon} text-lg xl:text-xl 2xl:text-2xl`}
                  ></i>
                  <span
                    className={`ml-3 text-sm xl:text-base 2xl:text-lg ${
                      isOpen ? "block" : "hidden"
                    } whitespace-nowrap`}
                  >
                    {item.text}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Submenús desplegables */}
          {Object.entries(subMenus).map(([key, submenu]) => (
            <div key={key}>
              <Link
                className={`p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-verde-principal text-verde-dos hover:text-white ${
                  isOpen ? "justify-between" : "justify-center"
                } group ${
                  pathname === submenu.pathname ? "bg-verde text-white" : ""
                }`}
                onClick={() => isOpen && toggleSubMenu(key)}
                href={submenu.href}
              >
                <div className="flex items-center">
                  <i
                    className={`fa-solid ${submenu.icon} text-lg xl:text-xl 2xl:text-2xl`}
                  ></i>
                  <span
                    className={`ml-3 text-sm xl:text-base 2xl:text-lg ${
                      isOpen ? "block" : "hidden"
                    }`}
                  >
                    {submenu.text}
                  </span>
                </div>
                <span
                  className={`${
                    isOpen ? "block" : "hidden"
                  } transition-transform duration-300 ${
                    activeSubMenu === key ? "rotate-180" : ""
                  }`}
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </Link>

              <div
                className={`text-left font-normal mt-1 mx-auto text-gray-700 overflow-hidden transition-all duration-300 
                                    ${
                                      activeSubMenu === key && isOpen
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"
                                    }`}
              >
                <div className="pl-10 pr-4 py-1 space-y-1">
                  {submenu.items.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <div
                        className={`p-2 rounded-md hover:bg-gray-100 text-sm xl:text-base 2xl:text-lg cursor-pointer ${
                          pathname === item.pathname ? "bg-gray-200" : ""
                        }`}
                      >
                        {item.text}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante para mostrar/ocultar en móvil (solo visible en pantallas pequeñas) */}
      {!isOpen && (
        <div className="md:hidden fixed bottom-4 left-4 z-20">
          <button
            onClick={handleToggle}
            className="p-3 bg-verde-principal text-white rounded-full shadow-lg"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      )}
    </div>
  );
}
