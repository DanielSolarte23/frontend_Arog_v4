import Link from "next/link";
import React from "react";
import LogoArog from "../publicas/LogoArog";

function BarraAdmin() {
  return (
    <div
      className={`sidebar shadow-xl h-full scrollbar bottom-0 xl:left-0 px-2 bg-white transition-all duration-700
    md:w-1/5 overflow-y-auto text-center fixed py-4`}
    >
      <div className="h-16 flex mx-5 items-center">
        <LogoArog className={`w-16 h-16`} />
      </div>

      <nav className="flex flex-col h-full gap-2">
        <div className="flex flex-col gap-1 flex-grow">
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            8
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            7
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            8
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            8
          </Link>
        </div>

        <hr className="bg-gris-oscuro my-2" />

        <div className="flex flex-col gap-2">
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
          <Link href="/" className="border rounded-lg p-3 flex items-center justify-center h-12 sm:h-8 md:h-12 xl:h-14">
            5
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BarraAdmin;