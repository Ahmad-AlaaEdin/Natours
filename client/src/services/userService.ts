import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getUploadSignature = async () => {
  const response = await axiosInstance.get("/upload/signature");
  return response.data.data;
};

export const uploadImageToCloudinary = async (
  file: File,
  signatureData: {
    signature: string;
    timestamp: number;
    cloudName: string;
    apiKey: string;
    folder: string;
  }
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signatureData.signature);
  formData.append("timestamp", signatureData.timestamp.toString());
  formData.append("api_key", signatureData.apiKey);
  formData.append("folder", signatureData.folder);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.secure_url;
};

export const updateUserAvatar = async (imageUrl: string) => {
  const response = await axiosInstance.post("/users/update-avatar", {
    imageUrl,
  });
  return response.data.data.user;
};
