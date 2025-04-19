"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LogoArog from "../publicas/LogoArog";

export default function BarraLateral({ isOpen }) {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [showText, setShowText] = useState(isOpen);
  const pathname = usePathname();

  // Control text visibility with timing for both opening and closing
  useEffect(() => {
    let timeout;
    if (isOpen) {
      // Delay showing text until sidebar is fully open
      timeout = setTimeout(() => {
        setShowText(true);
      }, 150); // 150ms delay for opening
    } else {
      // Hide text immediately when closing begins
      setShowText(false);
      // No delay needed for hiding text
    }
    
    return () => clearTimeout(timeout);
  }, [isOpen]);

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

  return (
    <div className="w-full h-full">
      {/* Barra lateral */}
      <div
        className={`sidebar h-full scrollbar bottom-0 bg-white transition-all duration-300 ease-in-out border fixed overflow-hidden ${
          isOpen ? 'w-2/10 min-w-[250px]' : 'w-[80px]'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 h-[15%]">
          <div
            className={`flex items-center ${
              isOpen ? "justify-start" : "justify-center w-full"
            } transition-all duration-300`}
          >
            <LogoArog
              className={`${
                isOpen
                  ? "w-12 h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20"
                  : "w-10 h-10"
              } transition-all duration-300`}
            />
          </div>
        </div>

        <div className="px-2 py-2">
          {/* Menú principal */}
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-verde-principal text-verde-dos hover:text-white group ${
                  pathname === item.pathname ? "bg-verde text-white" : ""
                }`}
              >
                <div
                  className={`flex items-center ${
                    isOpen ? "w-full" : "justify-center"
                  } transition-all duration-300`}
                >
                  <i
                    className={`fa-solid ${item.icon} text-lg xl:text-xl 2xl:text-2xl transition-all duration-300 ${
                      isOpen ? "" : "mx-auto"
                    }`}
                  ></i>
                  <span
                    className={`text-sm xl:text-base 2xl:text-lg whitespace-nowrap overflow-hidden transition-all duration-200 ${
                      showText 
                        ? "opacity-100 ml-3 max-w-40" 
                        : "opacity-0 max-w-0 ml-0"
                    }`}
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
  );
}