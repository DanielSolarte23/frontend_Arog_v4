"use client";
import React, { useState } from "react";
import LogoArog from "./publicas/LogoArog";
import { useAauth } from "@/context/AauthContext";
import Link from "next/link";

function BarraHeader() {
  const { isAuthenticated, logout, user } = useAauth();
  const [modal, setModal] = useState(false);

  const handleToggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <>
      <div
        className={`flex items-center bg-white h-[15%] 2xl:h-1/10 w-8/10 border border-l-0 px-5 fixed z-50`}
      >
        {/* <div className="h-full border">
          <LogoArog
            className={`h-7/10`}
          />
          </div> */}
        <div className="flex gap-3 w-1/2 text-gray-300">
          <div className="border rounded-lg p-2 flex justify-center items-center">
            <i className="fa-solid fa-bars text-xl  "></i>
          </div>

          {/* <div className="border relative rounded-lg w-full">
            <i className="fa-solid fa-magnifying-glass absolute text-xl top-2 left-2"></i>
            <input
              type="text"
              className="w-full h-full focus:outline-none pl-8 rounded-lg"
            />
          </div> */}
        </div>
        <div className="w-1/2 flex justify-end gap-5 text-gray-300">
          {/* <div className="border rounded-full p-2 flex justify-center items-center">
            <i className="fa-solid fa-moon text-xl  "></i>
          </div> */}
          <div className="border rounded-full p-2 flex justify-center items-center">
            <i className="fa-solid fa-bell text-xl  "></i>
          </div>
          <div className="flex gap-2 items-center">
            <div className="border rounded-full p-2 flex justify-center items-center bg-verde">
              <i className="fa-solid fa-user text-xl  text-white"></i>
            </div>
            <span className="text-verde-dos hidden md:block">
              Nombre de usuario
            </span>
            <div className="relative">
              <i
                onClick={() => {
                  handleToggleModal();
                }}
                className="fa-solid fa-chevron-down text-verde-dos"
              ></i>

              {modal && (
                <ul className="bg-white absolute top-6 -left-36 p-5 border rounded-lg text-verde-dos flex flex-col gap-2">
                  <li className="flex justify-between items-center gap-2">
                    Perfil <i className="fa-solid fa-user"></i>
                  </li>
                  <hr />
                  <li className=" whitespace-nowrap flex justify-between items-center gap-2">
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
                  {/* <li></li> */}
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
