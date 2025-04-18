"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoArog from "../publicas/LogoArog";

export default function BarraLateral({ isOpen, setIsOpen }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const pathname = usePathname();

  // Cerrar la barra lateral en móviles cuando se cambia de ruta
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 830) {
      setIsOpen(false);
    }
  }, [pathname, setIsOpen]);

  const toggleSubMenu = (menuName) => {
    setActiveSubMenu((prev) => (prev === menuName ? null : menuName));
  };

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

  // Mostrar overlay en móviles cuando la barra está abierta
  const showOverlay = isOpen && typeof window !== "undefined" && window.innerWidth < 830;

  return (
    <>
      {/* Overlay para dispositivos móviles */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Barra lateral - adaptada para mejor responsive */}
      <div
        className={`sidebar fixed h-full scrollbar bg-white z-50 top-0 transition-all duration-300 ease-in-out border overflow-y-auto
          ${isOpen ? "w-60 left-0" : "w-16 left-0"} 
          ${showOverlay ? "" : "md:w-auto"}`}
      >
        <div>
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
          </div>
          <div className="px-2 py-2">
            <div className="space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`p-2.5 flex items-center justify-center rounded-md px-4 duration-300 cursor-pointer hover:bg-verde-principal text-verde-dos hover:text-white group ${
                    pathname === item.pathname ? "bg-verde text-white" : ""
                  }`}
                  title={!isOpen ? item.text : ""}
                >
                  <div
                    className={`flex items-center ${
                      isOpen ? "w-full pl-2" : "justify-center w-full"
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
          </div>
        </div>
      </div>
    </>
  );
}