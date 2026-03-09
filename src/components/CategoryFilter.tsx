import { Smile, Frown, Users, MapPin, PartyPopper, PawPrint, Grid3x3, Angry } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

const categories = [
  { id: "all", label: "All", icon: Grid3x3, color: "primary" },
  { id: "happy", label: "Happy", icon: Smile, color: "happy" },
  { id: "sad", label: "Sad", icon: Frown, color: "sad" },
  { id: "angry", label: "Angry", icon: Angry, color: "angry" },
  { id: "family", label: "Family", icon: Users, color: "family" },
  { id: "places", label: "Places", icon: MapPin, color: "places" },
  { id: "events", label: "Events", icon: PartyPopper, color: "events" },
  { id: "pets", label: "Pets", icon: PawPrint, color: "pets" },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory, categoryCounts }: CategoryFilterProps) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const count = category.id === "all"
            ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
            : categoryCounts[category.id] || 0;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectCategory(category.id)}
              className={`
                relative flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium
                transition-all duration-300 hover:scale-105
                ${isSelected
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass hover:bg-card/90 text-foreground"
                }
              `}
            >
              <Icon className={`w-4 h-4 ${!isSelected ? `text-${category.color}` : ""}`} />
              <span>{category.label}</span>
              {count > 0 && (
                <Badge
                  variant="secondary"
                  className={`ml-1 text-xs px-1.5 py-0 h-5 ${
                    isSelected ? "bg-white/20 text-white border-0" : ""
                  }`}
                >
                  {count}
                </Badge>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
