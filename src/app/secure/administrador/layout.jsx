import BarraLateral from "@/components/admin/BarraLateral";

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
        <div className="w-4/5">{children}</div>
      </main>
    </>
  );
}
