import { Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroProps {
  onCameraClick: () => void;
  onUploadClick: () => void;
}

const Hero = ({ onCameraClick, onUploadClick }: HeroProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-accent/80 to-primary/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">AI-Powered Photo Gallery</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            SmartPix
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
            Let AI organize your memories automatically. Capture, upload, and watch the magic happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onCameraClick}
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 gap-2 px-8"
            >
              <Camera className="w-5 h-5" />
              Capture Photo
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={onUploadClick}
              className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg transition-all duration-300 hover:scale-105 gap-2 px-8"
            >
              <Upload className="w-5 h-5" />
              Upload Images
            </Button>
          </div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </section>
  );
};

export default Hero;