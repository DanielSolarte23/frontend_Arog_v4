import ProtectedRoute from "@/components/ProtectedRoute";
import { TareaProvider } from "@/context/TareasContext";

export default function SecureLayout({ children }) {
  return (
    <ProtectedRoute>
      <TareaProvider>
        {children}
      </TareaProvider>
    </ProtectedRoute>
  );
}
