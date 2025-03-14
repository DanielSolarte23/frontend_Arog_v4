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
        <BarraLateral />
        <div className="w-1/5"></div>
        <div className="w-4/5 bg-gris-claro">
          <div className="h-full ">
            <nav className="h-[15%] 2xl:h-1/10 border border-l-0 bg-white sticky"><BarraHeader /></nav>
            <div className="h-[85%] 2xl:h-9/10 p-3">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
