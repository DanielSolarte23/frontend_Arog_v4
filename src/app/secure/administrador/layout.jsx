"use client";
import { useState, useEffect } from "react";
import BarraLateral from "@/components/admin/BarraLateral";
import BarraHeader from "@/components/BarraHeader";

export default function AdministradorLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle sidebar toggle
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle responsive behavior
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const smallScreen = window.innerWidth < 830;
        setIsSmallScreen(smallScreen);
        
        if (window.innerWidth >= 830) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      };
      
      // Initial setup
      handleResize();
      
      // Add event listener for window resize
      window.addEventListener("resize", handleResize);
      
      // Clean up event listener when component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      <main className="flex h-full relative">
        {/* Sidebar with overlay behavior on small screens */}
        <div 
          className={`${
            isSmallScreen 
              ? `fixed z-[90] ${isOpen ? 'left-0' : '-left-[280px]'}`
              : `${isOpen ? 'w-2/10 lg:w-2/10' : 'w-[80px]'}`
          } transition-all duration-300 ease-in-out overflow-hidden h-full`}
        >
          <BarraLateral isOpen={isOpen} />
        </div>
        
        {/* Overlay background for small screens when sidebar is open */}
        {isSmallScreen && isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleToggle} // Close sidebar when clicking overlay
          />
        )}
        
        {/* Main content area with dynamic width - full width on small screens */}
        <div 
          className={`${
            isSmallScreen
              ? 'w-full'
              : `${isOpen ? 'w-8/10' : 'w-[calc(100%-80px)]'}`
          } bg-gris-claro min-h-screen transition-all duration-300 ease-in-out`}
        >
          <div className="h-full">
            <nav className="h-[15%] 2xl:h-1/10 w-full">
              <BarraHeader handleToggle={handleToggle} isOpen={isOpen} isSmallScreen={isSmallScreen} />
            </nav>
            <div className="h-[85%] 2xl:h-9/10 p-3">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}