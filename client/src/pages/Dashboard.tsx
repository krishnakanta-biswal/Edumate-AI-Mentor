import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { GraduationCap, Compass, MapPin, LogOut, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";

export function Dashboard() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-semibold">EduMate</h1>
              <p className="text-xs text-muted-foreground">Your AI Mentor</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              onClick={logout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-heading font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-muted-foreground text-lg">
            What would you like to learn today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={GraduationCap}
            title="AI Doubt Solver"
            description="Get instant help with your academic doubts using AI-powered assistance with voice support"
            buttonText="Start Learning"
            onClick={() => setLocation("/doubt-solver")}
          />
          <FeatureCard
            icon={Compass}
            title="Career Guidance"
            description="Discover personalized career paths based on your interests and academic strengths"
            buttonText="Explore Careers"
            onClick={() => setLocation("/career-guidance")}
          />
          <FeatureCard
            icon={MapPin}
            title="Local Institutes"
            description="Find nearby coaching centers, colleges, and educational institutes in your area"
            buttonText="Find Institutes"
            onClick={() => setLocation("/institutes")}
          />
        </div>
      </main>
    </div>
  );
}
