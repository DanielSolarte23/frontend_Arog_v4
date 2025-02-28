import Link from "next/link";
import React from "react";
import LogoArog from "../publicas/LogoArog";

function BarraAdmin() {
  return (
    <div
      className={`sidebar shadow-xl h-full scrollbar bottom-0 xl:left-0 px-2 bg-white transition-all duration-700
    md:w-1/5 overflow-y-auto text-center fixed py-4`}
    >
      <div className="h-1/10 flex mx-5 items-center">
        <LogoArog className={`w-16 h-16`} />
      </div>

      <nav className="grid grid-rows-8 h-6/10 gap-2">
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          8
        </Link>
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          7
        </Link>
        <Link href="/" className="border rounded-lg">
          8
        </Link>
        <Link href="/" className="border rounded-lg">
          8
        </Link>
      </nav>
      <hr className="bg-gris-oscuro" />
      <nav className="grid grid-rows-3 h-3/10 gap-2">
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          5
        </Link>
        <Link href="/" className="border rounded-lg">
          5
        </Link>
      </nav>

    </div>
  );
}

export default BarraAdmin;
