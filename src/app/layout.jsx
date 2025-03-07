import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
<<<<<<< HEAD
import { RutasProvider } from "@/context/RutasContext";
=======

const geistSans = Lexend({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
>>>>>>> origin/Estebxn

export const metadata = {
  title: "Arog App",
  description: "Asociasion de recicladores de oficio goleros",
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    <html lang="es">
      <body className="h-screen">
        <AuthProvider>
          <RutasProvider>
            <main className="h-full">{children}</main>
          </RutasProvider>
        </AuthProvider>
      </body>
=======
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
>>>>>>> origin/Estebxn
    </html>
  );
}
