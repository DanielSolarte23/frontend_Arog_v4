import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Arog App",
  description: "Asociasion de recicladores de oficio goleros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="h-screen">
        <AuthProvider>
          <main className="h-full">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}