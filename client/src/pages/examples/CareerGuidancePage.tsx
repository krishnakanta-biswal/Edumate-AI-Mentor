import { CareerGuidancePage } from "../CareerGuidancePage";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";

export default function CareerGuidancePageExample() {
  return (
    <ThemeProvider>
      <CareerGuidancePage />
      <Toaster />
    </ThemeProvider>
  );
}
