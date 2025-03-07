import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { RutasProvider } from "@/context/RutasContext";

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
            <main className="h-full">{children}</main>
          </RutasProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
