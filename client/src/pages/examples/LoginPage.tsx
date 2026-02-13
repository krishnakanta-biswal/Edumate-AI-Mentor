import { LoginPage } from "../LoginPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPageExample() {
  return (
    <AuthProvider>
      <LoginPage />
      <Toaster />
    </AuthProvider>
  );
}
