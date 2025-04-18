"use client";
import BarraAdmin from "@/components/admin/BarraAdmin";
import BarraLateral from "@/components/admin/BarraLateral";
import BarraHeader from "@/components/BarraHeader";
import { useEffect, useState } from "react";

export default function AdministradorLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
      
      handleResize(); 
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <main className="flex h-full">
      {/* Barra lateral */}
      <BarraLateral isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {/* Contenido principal */}
      <div 
        className={`bg-gris-claro min-h-screen transition-all duration-300 ${
          isOpen ? "ml-[16.5rem] w-[calc(100%-16rem)]" : "ml-16 w-[calc(100%-4rem)]"
        }`}
      >
        <div className="h-full">
          {/* Barra superior */}
          <nav className="h-[15%] 2xl:h-1/10 ">
            <BarraHeader handleToggle={handleToggle} isOpen={isOpen} />
          </nav>
          
          {/* Contenido */}
          <div className="h-[85%] 2xl:h-9/10 p-3 pl-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}