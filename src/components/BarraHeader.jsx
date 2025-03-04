'use client'
import React, { useState } from "react";
import LogoArog from "./publicas/LogoArog";

function BarraHeader() {
  const [modal, setModal] = useState([]);

  const handleToggleModal = () => {
    setModal((prev) => !prev);
};

  return (
    <>
      <div className={`flex items-center bg-white h-full w-full px-5`}>
        <div className="flex gap-3 w-1/2 text-gray-300">
          <div className="border rounded-lg p-2 flex justify-center items-center">
            <i className="fa-solid fa-bars text-xl  "></i>
          </div>

          <div className="border relative rounded-lg w-full">
            <i className="fa-solid fa-magnifying-glass absolute text-xl top-2 left-2"></i>
            <input
              type="text"
              className="w-full h-full focus:outline-none pl-8"
            />
          </div>
        </div>
        <div className="w-1/2 flex justify-end gap-5 text-gray-300">
          <div className="border rounded-full p-2 flex justify-center items-center">
            <i className="fa-solid fa-moon text-xl  "></i>
          </div>
          <div className="border rounded-full p-2 flex justify-center items-center">
            <i className="fa-solid fa-bell text-xl  "></i>
          </div>
          <div className="flex gap-2 items-center">
            <div className="border rounded-full p-2 flex justify-center items-center bg-verde">
              <i className="fa-solid fa-user text-xl  text-white"></i>
            </div>
            <span className="text-verde-dos">Nombre de usuario</span>
            <div>
              <i className="fa-solid fa-chevron-down text-verde-dos"></i>

              {modal && (
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
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
