import { DoubtSolverPage } from "../DoubtSolverPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

function DoubtSolverWithMockAuth() {
  useEffect(() => {
    localStorage.setItem("edumate_user", JSON.stringify({ username: "demo", name: "Alex" }));
  }, []);

  return <DoubtSolverPage />;
}

export default function DoubtSolverPageExample() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DoubtSolverWithMockAuth />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
