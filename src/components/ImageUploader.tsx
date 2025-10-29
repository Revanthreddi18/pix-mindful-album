import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
}

const ImageUploader = ({ onUpload }: ImageUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-all duration-300 hover:border-primary hover:bg-primary/5
        ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-border'}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative bg-gradient-to-br from-primary to-accent p-6 rounded-2xl">
            {isDragActive ? (
              <ImageIcon className="w-12 h-12 text-white animate-bounce" />
            ) : (
              <Upload className="w-12 h-12 text-white" />
            )}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-2">
            {isDragActive ? "Drop your photos here!" : "Upload Your Photos"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag & drop images or click to browse
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Supports PNG, JPG, JPEG, WEBP
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;