import { Dashboard } from "../Dashboard";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect } from "react";

function DashboardWithMockAuth() {
  useEffect(() => {
    localStorage.setItem("edumate_user", JSON.stringify({ username: "demo", name: "Alex" }));
  }, []);

  return <Dashboard />;
}

export default function DashboardExample() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DashboardWithMockAuth />
      </ThemeProvider>
    </AuthProvider>
  );
}
