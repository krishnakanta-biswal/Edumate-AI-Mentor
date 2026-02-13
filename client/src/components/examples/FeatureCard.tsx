import { FeatureCard } from "../FeatureCard";
import { GraduationCap } from "lucide-react";

export default function FeatureCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <FeatureCard
          icon={GraduationCap}
          title="AI Doubt Solver"
          description="Get instant help with your academic doubts using AI-powered assistance"
          buttonText="Start Learning"
          onClick={() => console.log("Feature card clicked")}
        />
      </div>
    </div>
  );
}
