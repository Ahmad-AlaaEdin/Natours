import { useState, useRef } from "react";
import { Camera, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getUploadSignature,
  uploadImageToCloudinary,
  updateUserAvatar,
} from "@/services/userService";
import { useAuth } from "@/context/AuthContext";

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  userName: string;
  onUploadSuccess?: (newImageUrl: string) => void;
}

export default function ProfileImageUpload({
  currentImageUrl,
  userName,
  onUploadSuccess,
}: ProfileImageUploadProps) {
  const { updateUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file");
      setUploadStatus("error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB");
      setUploadStatus("error");
      return;
    }

    setSelectedFile(file);
    setUploadStatus("idle");
    setErrorMessage("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      setUploadStatus("uploading");
      setUploadProgress(10);

      const signatureData = await getUploadSignature();
      setUploadProgress(30);

      const imageUrl = await uploadImageToCloudinary(
        selectedFile,
        signatureData
      );
      setUploadProgress(70);

      const updatedUser = await updateUserAvatar(imageUrl);
      setUploadProgress(100);

      if (updateUser) {
        updateUser(updatedUser);
      }

      setUploadStatus("success");
      setPreviewUrl(null);
      setSelectedFile(null);

      if (onUploadSuccess) {
        onUploadSuccess(imageUrl);
      }
      setTimeout(() => {
        setUploadStatus("idle");
        setUploadProgress(0);
      }, 2000);
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to upload image. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getImageSrc = () => {
    if (previewUrl) return previewUrl;
    if (
      currentImageUrl &&
      currentImageUrl !== "default.jpg" &&
      currentImageUrl !== "/default.png"
    ) {
      return currentImageUrl.startsWith("http")
        ? currentImageUrl
        : `${
            import.meta.env.VITE_API_URL || "http://localhost:3000"
          }/img/users/${currentImageUrl}`;
    }
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={userName}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            userName.charAt(0).toUpperCase()
          )}
        </div>

        <button
          onClick={handleButtonClick}
          disabled={isUploading}
          className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110 disabled:cursor-not-allowed"
          aria-label="Upload profile picture"
        >
          <Camera className="h-4 w-4" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {selectedFile && uploadStatus === "idle" && (
        <div className="flex gap-3 mb-4">
          <Button
            onClick={handleUpload}
            className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button onClick={handleCancel} variant="outline" size="sm">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="w-full max-w-xs mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Uploading...</span>
            <span className="text-sm font-semibold text-emerald-600">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-emerald-600 to-teal-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm font-medium">
            Profile picture updated successfully!
          </span>
        </div>
      )}

      {uploadStatus === "error" && errorMessage && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg mb-4">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </div>
      )}

      {selectedFile && uploadStatus === "idle" && (
        <div className="text-xs text-slate-500 text-center">
          Selected: {selectedFile.name}
          <br />
          Size: {(selectedFile.size / 1024).toFixed(1)} KB
        </div>
      )}
    </div>
  );
}
