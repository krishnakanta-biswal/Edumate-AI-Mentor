import { CareerCard } from "../CareerCard";
import { Code } from "lucide-react";

export default function CareerCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <CareerCard
          icon={Code}
          title="Software Developer"
          description="Create applications and systems that solve real-world problems using programming languages and frameworks."
          subjects={["Mathematics", "Computer Science", "Logic"]}
        />
      </div>
    </div>
  );
}
