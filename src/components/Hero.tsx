import { Camera, Upload, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

interface HeroProps {
  onCameraClick: () => void;
  onUploadClick: () => void;
}

const Hero = ({ onCameraClick, onUploadClick }: HeroProps) => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(270_95%_20%/0.92)] via-[hsl(290_80%_25%/0.88)] to-[hsl(320_85%_30%/0.92)]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-glow-pulse" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-lg"
          >
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white/95 tracking-wide">AI-Powered Photo Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 tracking-tight font-display"
          >
            Smart
            <span className="relative">
              Pix
              <motion.span
                className="absolute -top-2 -right-4 text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-xl mx-auto font-light leading-relaxed"
          >
            Upload your photos and let AI organize your memories into beautiful, smart collections.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={onCameraClick}
              className="bg-white text-foreground hover:bg-white/90 shadow-xl hover:shadow-glow transition-all duration-300 hover:scale-105 gap-3 px-10 py-6 text-base font-semibold rounded-2xl"
            >
              <Camera className="w-5 h-5" />
              Capture Photo
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onUploadClick}
              className="border-2 border-white/30 text-white hover:bg-white/15 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105 gap-3 px-10 py-6 text-base font-semibold rounded-2xl bg-white/5"
            >
              <Upload className="w-5 h-5" />
              Upload Images
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
