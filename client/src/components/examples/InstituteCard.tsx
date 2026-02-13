import { InstituteCard } from "../InstituteCard";

export default function InstituteCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <InstituteCard
          name="Bright Future Academy"
          address="123 Education Street, Learning District, City 12345"
          rating={4.5}
          subject="Mathematics"
        />
      </div>
    </div>
  );
}
