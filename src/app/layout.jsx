import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { RutasProvider } from "@/context/RutasContext";
import { VehiculoProvider } from "@/context/VehiculoContext";
import { UsuarioProvider } from "@/context/UsuarioContext";
import { UbicacionProvider } from "@/context/UbicacionContext";
import { FormularioTipoProvider } from "@/context/FormularioTipoContext";
import { PagoProvider } from "@/context/PagosContext";
import { ClienteProvider } from "@/context/ClienteContext";

export const metadata = {
  title: "Arog App",
  description: "Asociasion de recicladores de oficio goleros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="h-screen">
        <AuthProvider>
          <RutasProvider>
            <VehiculoProvider>
              <UsuarioProvider>
                <UbicacionProvider>
                  <FormularioTipoProvider>
                    <PagoProvider>
                      <ClienteProvider>
                        <main className="h-full">{children}</main>
                      </ClienteProvider>
                    </PagoProvider>
                  </FormularioTipoProvider>
                </UbicacionProvider>
              </UsuarioProvider>
            </VehiculoProvider>
          </RutasProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
