import BarraHeader from "../components/publicas/BarraHeader";
import "./globals.css";
// import {lexend} from 

export const metadata = {
  title: "Arog App",
  description: "Asociasion de recicladores de oficio goleros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="h-screen">
        <main className="h-full">
          {children}
        </main>

      </body>
    </html>
  );
}