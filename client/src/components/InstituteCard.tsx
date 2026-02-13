import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

interface InstituteCardProps {
  name: string;
  address: string;
  rating?: number;
  subject?: string;
}

export function InstituteCard({ name, address, rating, subject }: InstituteCardProps) {
  return (
    <Card className="hover-elevate transition-shadow" data-testid={`card-institute-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg font-heading">{name}</CardTitle>
        {subject && (
          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full w-fit">
            {subject}
          </span>
        )}
        <CardDescription className="flex items-start gap-1 mt-2">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{address}</span>
        </CardDescription>
        {rating !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium" data-testid="text-rating">{rating.toFixed(1)}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" data-testid="button-get-directions">
          Get Directions
        </Button>
      </CardContent>
    </Card>
  );
}
