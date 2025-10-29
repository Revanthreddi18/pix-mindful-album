import demoHappyFamily from "@/assets/demo-happy-family.jpg";
import demoPlaces from "@/assets/demo-places.jpg";
import demoPet from "@/assets/demo-pet.jpg";
import demoEvent from "@/assets/demo-event.jpg";
import demoAngry from "@/assets/demo-angry.jpg";
import demoSad from "@/assets/demo-sad.jpg";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const demoPhotos = [
  {
    id: "demo-1",
    url: demoHappyFamily,
    category: "happy",
    description: "Happy family enjoying a day in the park",
  },
  {
    id: "demo-2",
    url: demoPlaces,
    category: "places",
    description: "Beautiful mountain landscape at sunset",
  },
  {
    id: "demo-3",
    url: demoPet,
    category: "pets",
    description: "Adorable golden retriever playing outdoors",
  },
  {
    id: "demo-4",
    url: demoEvent,
    category: "events",
    description: "Colorful birthday party celebration",
  },
  {
    id: "demo-5",
    url: demoAngry,
    category: "angry",
    description: "Expressive portrait showing frustration",
  },
  {
    id: "demo-6",
    url: demoSad,
    category: "sad",
    description: "Melancholic emotional portrait",
  },
];

const DemoPhotos = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          See SmartPix in Action
        </h2>
        <p className="text-muted-foreground text-lg">
          Explore how our AI categorizes different types of photos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={photo.url}
                alt={photo.description}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <Badge className="mb-2 capitalize">{photo.category}</Badge>
              <p className="text-sm text-muted-foreground">{photo.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoPhotos;
