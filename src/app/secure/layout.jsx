import ProtectedRoute from "@/components/ProtectedRoute";

export default function SecureLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
