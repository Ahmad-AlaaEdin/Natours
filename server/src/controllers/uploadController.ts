import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import cloudinary from '../utils/cloudinary';

/**
 * Generate a signed upload signature for Cloudinary
 * This allows the client to upload directly to Cloudinary securely
 * GET /api/upload/signature
 */
export const getUploadSignature = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'user_avatars';

    // Generate signature using Cloudinary's helper
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      process.env.CLOUDINARY_API_SECRET!,
    );

    res.status(200).json({
      status: 'success',
      data: {
        signature,
        timestamp,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder,
      },
    });
  },
);
