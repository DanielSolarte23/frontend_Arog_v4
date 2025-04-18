"use client";
import React, { useState } from "react";
import LogoArog from "./publicas/LogoArog";
import { useAauth } from "@/context/AauthContext";
import Link from "next/link";

function BarraHeader({ handleToggle, isOpen, isSmallScreen }) {
  const { isAuthenticated, logout, user } = useAauth();
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <div
        className={`flex items-center bg-white h-[15%] 2xl:h-1/10 border border-l-0 px-5 fixed z-40 transition-all duration-300 ease-in-out ${
          isSmallScreen
            ? 'w-full left-0'
            : isOpen
              ? 'w-8/10'
              : 'w-[calc(100%-80px)]'
        }`}
      >
        <div className="flex gap-3 w-1/2 text-gray-300">
          <div
            className="border rounded-lg p-2 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={handleToggle}
            title={isOpen ? "Ocultar menú" : "Mostrar menú"}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </div>
        </div>
        <div className="w-1/2 flex justify-end gap-5 text-gray-300">
          <div className="border rounded-full p-2 flex justify-center items-center hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
            <i className="fa-solid fa-bell text-xl"></i>
          </div>
          <div className="flex gap-2 items-center">
            <div className="border rounded-full p-2 flex justify-center items-center bg-verde">
              <i className="fa-solid fa-user text-xl text-white"></i>
            </div>
            <span className="text-verde-dos hidden md:block whitespace-nowrap overflow-hidden text-ellipsis max-w-32">
              {user?.nombres}
            </span>
            <div className="relative">
              <i
                onClick={handleToggleModal}
                className="fa-solid fa-chevron-down text-verde-dos cursor-pointer"
              ></i>
              {modal && (
                <ul className="bg-white absolute top-6 -left-36 p-5 border rounded-lg text-verde-dos flex flex-col gap-2 shadow-md">
                  <li className="flex justify-between items-center gap-2 cursor-pointer hover:text-verde transition-colors duration-200">
                    Perfil <i className="fa-solid fa-user"></i>
                  </li>
                  <hr />
                  <li className="whitespace-nowrap flex justify-between items-center gap-2 cursor-pointer hover:text-verde transition-colors duration-200">
                    <Link
                      href="/"
                      onClick={() => {
                        setTimeout(() => {
                          logout();
                        }, 500);
                      }}
                    >
                      Cerrar Sesión
                      <i className="fa-solid fa-right-to-bracket"></i>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BarraHeader;