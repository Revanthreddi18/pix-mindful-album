import { Smile, Frown, Users, MapPin, PartyPopper, PawPrint, Grid3x3, Angry } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

const categories = [
  { id: "all", label: "All Photos", icon: Grid3x3, color: "text-primary" },
  { id: "happy", label: "Happy", icon: Smile, color: "text-[hsl(var(--happy))]" },
  { id: "sad", label: "Sad", icon: Frown, color: "text-[hsl(var(--sad))]" },
  { id: "angry", label: "Angry", icon: Angry, color: "text-[hsl(var(--angry))]" },
  { id: "family", label: "Family", icon: Users, color: "text-[hsl(var(--family))]" },
  { id: "places", label: "Places", icon: MapPin, color: "text-[hsl(var(--places))]" },
  { id: "events", label: "Events", icon: PartyPopper, color: "text-[hsl(var(--events))]" },
  { id: "pets", label: "Pets", icon: PawPrint, color: "text-[hsl(var(--pets))]" },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory, categoryCounts }: CategoryFilterProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = category.id === "all" 
            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
            : categoryCounts[category.id] || 0;
          const isSelected = selectedCategory === category.id;

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              size="lg"
              onClick={() => onSelectCategory(category.id)}
              className={`
                relative gap-2 transition-all duration-300 hover:scale-105
                ${isSelected ? 'shadow-lg' : ''}
              `}
            >
              <Icon className={`w-5 h-5 ${isSelected ? '' : category.color}`} />
              <span>{category.label}</span>
              {count > 0 && (
                <Badge 
                  variant={isSelected ? "secondary" : "outline"}
                  className="ml-1"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;