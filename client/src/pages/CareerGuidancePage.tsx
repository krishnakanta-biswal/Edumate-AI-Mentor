import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { CareerCard } from "@/components/CareerCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, Code, Palette, TrendingUp, Stethoscope, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const INTERESTS = ["Technology", "Arts", "Business", "Science", "Healthcare", "Education"];
const SUBJECTS = ["Mathematics", "Science", "English", "Arts", "History", "Physical Education"];

const DEMO_CAREERS = [
  {
    icon: Code,
    title: "Software Developer",
    description: "Create applications and systems that solve real-world problems using programming languages and frameworks.",
    subjects: ["Mathematics", "Computer Science", "Logic"],
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    description: "Design beautiful and intuitive user interfaces that enhance user experience across digital products.",
    subjects: ["Arts", "Psychology", "Computer Science"],
  },
  {
    icon: TrendingUp,
    title: "Data Analyst",
    description: "Analyze complex datasets to extract meaningful insights that drive business decisions.",
    subjects: ["Mathematics", "Statistics", "Business"],
  },
  {
    icon: Stethoscope,
    title: "Healthcare Professional",
    description: "Provide medical care and support to patients, improving health outcomes in the community.",
    subjects: ["Biology", "Chemistry", "Health Science"],
  },
];

export function CareerGuidancePage() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const { toast } = useToast();

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0 || selectedSubjects.length === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please select at least one interest and one subject",
        variant: "destructive",
      });
      return;
    }

    setStep("loading");
    setTimeout(() => {
      setStep("results");
    }, 2000);
  };

  const resetForm = () => {
    setStep("form");
    setSelectedInterests([]);
    setSelectedSubjects([]);
    setGoals("");
  };

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
              <div className="w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold">Career Guidance</h1>
                <p className="text-xs text-muted-foreground">Discover your path</p>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === "form" && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold mb-2">
                Let's Find Your Perfect Career
              </h2>
              <p className="text-muted-foreground">
                Answer a few questions to get personalized career suggestions
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Your Interests</CardTitle>
                <CardDescription>Select areas that interest you the most</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer hover-elevate active-elevate-2"
                      onClick={() => toggleInterest(interest)}
                      data-testid={`badge-interest-${interest.toLowerCase()}`}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div>
                  <Label className="text-base font-heading mb-3 block">Favorite Subjects</Label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((subject) => (
                      <Badge
                        key={subject}
                        variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                        className="cursor-pointer hover-elevate active-elevate-2"
                        onClick={() => toggleSubject(subject)}
                        data-testid={`badge-subject-${subject.toLowerCase()}`}
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="goals" className="text-base font-heading">
                    Your Goals (Optional)
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tell us about your aspirations and what you'd like to achieve
                  </p>
                  <Textarea
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="I want to make a positive impact on society..."
                    className="min-h-[100px]"
                    data-testid="input-goals"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                  data-testid="button-get-suggestions"
                >
                  Get Career Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "loading" && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-chart-2/20 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-chart-2 animate-pulse" />
            </div>
            <h2 className="text-2xl font-heading font-semibold mb-2">
              Analyzing Your Profile...
            </h2>
            <p className="text-muted-foreground">
              We're generating personalized career suggestions just for you
            </p>
          </div>
        )}

        {step === "results" && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-2">
                  Your Personalized Career Paths
                </h2>
                <p className="text-muted-foreground">
                  Based on your interests in {selectedInterests.join(", ")}
                </p>
              </div>
              <Button variant="outline" onClick={resetForm} data-testid="button-retake">
                Retake Quiz
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEMO_CAREERS.map((career, idx) => (
                <CareerCard key={idx} {...career} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
