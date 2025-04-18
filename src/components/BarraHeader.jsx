"use client";
import React, { useState } from "react";
import LogoArog from "./publicas/LogoArog";
import { useAauth } from "@/context/AauthContext";
import Link from "next/link";

function BarraHeader({ handleToggle }) {
  const { isAuthenticated, logout, user } = useAauth();
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-white h-full max-w-full  w-full border border-l-0 px-5">
      <div className="flex gap-3 w-1/2 text-gray-300">
        <button 
          onClick={handleToggle}
          className="border rounded-lg p-2 flex justify-center items-center hover:bg-gray-100 transition-colors"
          aria-label="Alternar menú"
        >
          <i className="fa-solid fa-bars text-xl text-verde-dos"></i>
        </button>
      </div>
      
      <div className="w-1/2 flex justify-end gap-5 text-gray-300">
        <div className="border rounded-full p-2 flex justify-center items-center hover:bg-gray-100 transition-colors">
          <i className="fa-solid fa-bell text-xl"></i>
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="border rounded-full p-2 flex justify-center items-center bg-verde">
            <i className="fa-solid fa-user text-xl text-white"></i>
          </div>
          <span className="text-verde-dos hidden md:block">
            {user?.nombres}
          </span>
          <div className="relative">
            <button
              onClick={handleToggleModal}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menú de usuario"
            >
              <i className="fa-solid fa-chevron-down text-verde-dos"></i>
            </button>

            {modal && (
              <ul className="bg-white absolute top-6 right-0 md:-left-36 p-5 border rounded-lg text-verde-dos flex flex-col gap-2 shadow-lg z-50">
                <li className="flex justify-between items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  Perfil <i className="fa-solid fa-user"></i>
                </li>
                <hr />
                <li className="whitespace-nowrap flex justify-between items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <Link
                    href="/"
                    className="w-full flex justify-between"
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
  );
}

export default BarraHeader;