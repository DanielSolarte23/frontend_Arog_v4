import BarraAdmin from "@/components/admin/BarraAdmin";
import BarraLateral from "@/components/admin/BarraLateral";
import BarraHeader from "@/components/BarraHeader";

export const metadata = {
  title: "Administrador",
  description: "Sitio Administrador",
};

export default function AdministradorLayout({ children }) {
  return (
    <>
      <main className="flex h-full">
        <div className="w-2/10 lg:w-2/10 bg-red-600">
          <BarraLateral />
        </div>
        <div className="w-8/10 bg-gris-claro min-h-screen">
          <div className="h-full">
            {/* <div className="h-[15%] 2xl:h-1/10"></div> */}
            <nav className="h-[15%] 2xl:h-1/10 w-full">
              <BarraHeader />
            </nav>
            <div className="h-[85%] 2xl:h-9/10 p-3">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
