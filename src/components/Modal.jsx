'use client'
import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    // Comprobamos si estamos en el cliente antes de acceder a `window`
    if (typeof window !== "undefined") {
      const handleEsc = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleEsc);

      // Limpiar el event listener al desmontar el componente
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [onClose]);


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
