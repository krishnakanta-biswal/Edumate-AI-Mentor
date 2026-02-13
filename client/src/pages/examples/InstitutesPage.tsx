import { InstitutesPage } from "../InstitutesPage";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";

export default function InstitutesPageExample() {
  return (
    <ThemeProvider>
      <InstitutesPage />
      <Toaster />
    </ThemeProvider>
  );
}
