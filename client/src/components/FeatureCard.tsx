import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export function FeatureCard({ icon: Icon, title, description, buttonText, onClick }: FeatureCardProps) {
  return (
    <Card className="hover-elevate active-elevate-2 transition-shadow cursor-pointer group" onClick={onClick} data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="space-y-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <CardTitle className="text-xl font-heading">{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="default" className="w-full" data-testid={`button-${buttonText.toLowerCase().replace(/\s+/g, '-')}`}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
