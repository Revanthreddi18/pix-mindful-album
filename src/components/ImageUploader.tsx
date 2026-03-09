import { useCallback } from "react";
import { Upload, Image as ImageIcon, CloudUpload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative rounded-3xl p-14 text-center cursor-pointer overflow-hidden
        transition-all duration-500
        ${isDragActive
          ? "scale-[1.02] shadow-glow"
          : "shadow-card hover:shadow-lg"
        }
      `}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-3xl gradient-border" />
      <div className={`absolute inset-[1px] rounded-3xl transition-colors duration-300 ${isDragActive ? "bg-primary/5" : "bg-card"}`} />

      <input {...getInputProps()} />

      <div className="relative flex flex-col items-center gap-5">
        <motion.div
          animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
          <div className="relative p-5 rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
            {isDragActive ? (
              <CloudUpload className="w-10 h-10 text-white" />
            ) : (
              <Upload className="w-10 h-10 text-white" />
            )}
          </div>
        </motion.div>

        <div>
          <p className="text-xl font-bold font-display mb-2">
            {isDragActive ? "Drop your photos here!" : "Upload Your Photos"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag & drop images or click to browse
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            PNG, JPG, JPEG, WEBP
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageUploader;
