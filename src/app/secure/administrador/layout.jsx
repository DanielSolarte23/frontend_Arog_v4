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
        <div className="w-1/5">
          <BarraLateral />
        </div>
        <div className="w-4/5 bg-gris-claro">
        <nav className="h-1/10 w-full"><BarraHeader/></nav>
        {children}</div>
      </main>
    </>
  );
}
