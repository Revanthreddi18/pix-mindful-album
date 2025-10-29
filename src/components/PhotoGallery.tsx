import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Photos Yet</h3>
          <p className="text-muted-foreground">
            Upload or capture your first photo to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={photo.file_url}
                alt={photo.ai_analysis?.description || `Photo ${photo.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="text-sm font-medium capitalize mb-1">{photo.category}</p>
                {photo.ai_analysis?.description && (
                  <p className="text-xs opacity-90 line-clamp-2">
                    {photo.ai_analysis.description}
                  </p>
                )}
              </div>

              <Button
                size="icon"
                variant="destructive"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(photo.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;