import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CareerCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  subjects: string[];
}

export function CareerCard({ icon: Icon, title, description, subjects }: CareerCardProps) {
  return (
    <Card className="hover-elevate transition-shadow" data-testid={`card-career-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mb-3">
          <Icon className="w-6 h-6 text-chart-2" />
        </div>
        <CardTitle className="text-lg font-heading">{title}</CardTitle>
        <CardDescription className="mt-2 leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Relevant Subjects:</p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" className="w-full" data-testid="button-learn-more">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
