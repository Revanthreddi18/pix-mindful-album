import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import Hero from "@/components/Hero";
import CameraCapture from "@/components/CameraCapture";
import ImageUploader from "@/components/ImageUploader";
import CategoryFilter from "@/components/CategoryFilter";
import PhotoGallery from "@/components/PhotoGallery";
import AuthForm from "@/components/AuthForm";
import DemoPhotos from "@/components/DemoPhotos";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchPhotos();
    }
  }, [user]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
      
      // Calculate category counts
      const counts: Record<string, number> = {};
      data?.forEach((photo) => {
        counts[photo.category] = (counts[photo.category] || 0) + 1;
      });
      setCategoryCounts(counts);
    } catch (error: any) {
      toast.error("Failed to load photos");
      console.error(error);
    }
  };

  const analyzeAndUploadImage = async (file: File | Blob, fileName: string) => {
    if (!user) return;

    try {
      // Upload to storage
      const filePath = `${user.id}/${Date.now()}-${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("photos")
        .getPublicUrl(filePath);

      // Analyze image with AI
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke(
        "analyze-image",
        {
          body: { imageUrl: publicUrl },
        }
      );

      if (analysisError) throw analysisError;

      // Save to database
      const { error: dbError } = await supabase.from("photos").insert({
        user_id: user.id,
        file_path: filePath,
        file_url: publicUrl,
        category: analysisData.category || "happy",
        ai_analysis: analysisData,
      });

      if (dbError) throw dbError;

      toast.success(`Photo categorized as "${analysisData.category}"!`);
      fetchPhotos();
    } catch (error: any) {
      toast.error("Failed to upload photo");
      console.error(error);
    }
  };

  const handleCameraCapture = async (blob: Blob) => {
    setUploading(true);
    await analyzeAndUploadImage(blob, "camera-capture.jpg");
    setUploading(false);
  };

  const handleFileUpload = async (files: File[]) => {
    setUploading(true);
    for (const file of files) {
      await analyzeAndUploadImage(file, file.name);
    }
    setUploading(false);
  };

  const handleDeletePhoto = async (photoId: string) => {
    try {
      const photo = photos.find((p) => p.id === photoId);
      if (!photo) return;

      // Delete from storage
      await supabase.storage.from("photos").remove([photo.file_path]);

      // Delete from database
      const { error } = await supabase.from("photos").delete().eq("id", photoId);

      if (error) throw error;

      toast.success("Photo deleted");
      fetchPhotos();
    } catch (error: any) {
      toast.error("Failed to delete photo");
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <AuthForm />
        <DemoPhotos />
      </>
    );
  }

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <Button variant="outline" onClick={handleSignOut} className="gap-2">
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      <Hero
        onCameraClick={() => setCameraOpen(true)}
        onUploadClick={() => document.getElementById("file-upload")?.click()}
      />

      <div className="hidden">
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length > 0) {
              handleFileUpload(files);
            }
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <ImageUploader onUpload={handleFileUpload} />
      </div>

      {uploading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-2xl shadow-2xl text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-medium">Analyzing photos with AI...</p>
          </div>
        </div>
      )}

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      <PhotoGallery
        photos={filteredPhotos}
        onDelete={handleDeletePhoto}
        isLoading={false}
      />

      <CameraCapture
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default Index;