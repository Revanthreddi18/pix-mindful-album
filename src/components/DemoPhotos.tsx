import demoHappyFamily from "@/assets/demo-happy-family.jpg";
import demoPlaces from "@/assets/demo-places.jpg";
import demoPet from "@/assets/demo-pet.jpg";
import demoEvent from "@/assets/demo-event.jpg";
import demoAngry from "@/assets/demo-angry.jpg";
import demoSad from "@/assets/demo-sad.jpg";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const demoPhotos = [
  { id: "demo-1", url: demoHappyFamily, category: "happy", description: "Happy family enjoying a day in the park" },
  { id: "demo-2", url: demoPlaces, category: "places", description: "Beautiful mountain landscape at sunset" },
  { id: "demo-3", url: demoPet, category: "pets", description: "Adorable golden retriever playing outdoors" },
  { id: "demo-4", url: demoEvent, category: "events", description: "Colorful birthday party celebration" },
  { id: "demo-5", url: demoAngry, category: "angry", description: "Expressive portrait showing frustration" },
  { id: "demo-6", url: demoSad, category: "sad", description: "Melancholic emotional portrait" },
];

const categoryColors: Record<string, string> = {
  happy: "bg-happy/15 text-happy border-happy/30",
  places: "bg-places/15 text-places border-places/30",
  pets: "bg-pets/15 text-pets border-pets/30",
  events: "bg-events/15 text-events border-events/30",
  angry: "bg-angry/15 text-angry border-angry/30",
  sad: "bg-sad/15 text-sad border-sad/30",
};

const DemoPhotos = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Live Demo</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-gradient">
          See SmartPix in Action
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Watch how our AI instantly categorizes different types of photos
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 bg-card">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.description}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <Badge
                  variant="outline"
                  className={`mb-3 capitalize font-medium ${categoryColors[photo.category] || ""}`}
                >
                  {photo.category}
                </Badge>
                <p className="text-sm text-muted-foreground leading-relaxed">{photo.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DemoPhotos;
