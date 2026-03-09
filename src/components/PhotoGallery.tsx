import { Trash2, Loader2, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  id: string;
  file_url: string;
  category: string;
  ai_analysis?: {
    description?: string;
  };
  created_at: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onDelete: (photoId: string) => void;
  isLoading: boolean;
}

const PhotoGallery = ({ photos, onDelete, isLoading }: PhotoGalleryProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm mx-auto"
        >
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: "var(--gradient-primary)", opacity: 0.15 }}>
            <ImageOff className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-2xl font-bold font-display mb-2">No Photos Yet</h3>
          <p className="text-muted-foreground">
            Upload or capture your first photo to get started!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-card hover:shadow-lg transition-shadow duration-300 bg-card"
            >
              <img
                src={photo.file_url}
                alt={photo.ai_analysis?.description || `Photo ${photo.id}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <Badge variant="secondary" className="capitalize mb-2 bg-white/20 text-white border-0 backdrop-blur-sm">
                    {photo.category}
                  </Badge>
                  {photo.ai_analysis?.description && (
                    <p className="text-xs opacity-90 line-clamp-2 leading-relaxed">
                      {photo.ai_analysis.description}
                    </p>
                  )}
                </div>

                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl w-9 h-9"
                  onClick={() => onDelete(photo.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotoGallery;
