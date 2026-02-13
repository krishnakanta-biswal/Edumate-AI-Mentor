import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { InstituteCard } from "@/components/InstituteCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, MapPin, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const SUBJECTS = ["All", "Mathematics", "Science", "English", "Coding", "Arts"];

const DEMO_INSTITUTES = [
  {
    name: "Bright Future Academy",
    address: "123 Education Street, Learning District",
    rating: 4.5,
    subject: "Mathematics",
  },
  {
    name: "Science Excellence Center",
    address: "456 Knowledge Avenue, Study Town",
    rating: 4.8,
    subject: "Science",
  },
  {
    name: "Creative Arts Institute",
    address: "789 Creativity Lane, Art City",
    rating: 4.3,
    subject: "Arts",
  },
  {
    name: "Tech Coding Bootcamp",
    address: "321 Innovation Road, Tech Valley",
    rating: 4.7,
    subject: "Coding",
  },
  {
    name: "Global English Academy",
    address: "654 Language Boulevard, Word City",
    rating: 4.6,
    subject: "English",
  },
  {
    name: "Premier Coaching Center",
    address: "987 Success Street, Achievement Town",
    rating: 4.4,
    subject: "Mathematics",
  },
];

export function InstitutesPage() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [location, setLocationState] = useState("Detecting location...");
  const [hasDetected, setHasDetected] = useState(false);
  const { toast } = useToast();

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationState(`Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`);
          setHasDetected(true);
          toast({
            title: "Location Detected",
            description: "Showing institutes near you",
          });
        },
        () => {
          setLocationState("Location access denied");
          toast({
            title: "Location Error",
            description: "Please enable location access",
            variant: "destructive",
          });
        }
      );
    } else {
      setLocationState("Geolocation not supported");
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support geolocation",
        variant: "destructive",
      });
    }
  };

  const filteredInstitutes = selectedSubject === "All"
    ? DEMO_INSTITUTES
    : DEMO_INSTITUTES.filter(inst => inst.subject === selectedSubject);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold">Local Institutes</h1>
                <p className="text-xs text-muted-foreground">Find nearby centers</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground" data-testid="text-location">
                {location}
              </span>
            </div>
            {!hasDetected && (
              <Button onClick={detectLocation} data-testid="button-detect-location">
                Detect My Location
              </Button>
            )}
          </div>
        </Card>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">Filter by Subject:</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subject) => (
              <Badge
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                className="cursor-pointer hover-elevate active-elevate-2"
                onClick={() => setSelectedSubject(subject)}
                data-testid={`badge-subject-${subject.toLowerCase()}`}
              >
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {filteredInstitutes.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-heading font-semibold mb-2">No Institutes Found</h2>
            <p className="text-muted-foreground">
              Try selecting a different subject filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutes.map((institute, idx) => (
              <InstituteCard key={idx} {...institute} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
