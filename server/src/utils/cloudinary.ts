import { v2 as cloudinary } from 'cloudinary';

console.log('cloudinary here');
console.log(process.env.CLOUDINARY_API_KEY);

type CloudinaryConfig = {
  readonly cloud_name: string;
  readonly api_key: string;
  readonly api_secret: string;
};

const config: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
};

cloudinary.config(config);

export default cloudinary;
