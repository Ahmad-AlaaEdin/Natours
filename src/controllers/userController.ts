import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import User from './../models/userModel';
import AppError from './../utils/appError';
import catchAsync from './../utils/catchAsync';
import * as factory from './../controllers/handlerFactory';
import cloudinary from './../utils/cloudinary';

const filterObj = (
  obj: Record<string, unknown>,
  ...allowedFields: string[]
): Record<string, unknown> => {
  const newObj: Record<string, unknown> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not An Image! Please Upload Only Images ', 400) as any,
      false,
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();
    req.file.filename = `user-${req.user!.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  },
);

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    console.log(req.body);

    if (req.body.password || req.body.passwordConfirm)
      next(
        new AppError(
          'This route is not for password updates, use /updatePassword',
          400,
        ),
      );

    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) filteredBody.photo = req.file.filename;

    const user = Object.assign(req.user!, filteredBody);
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  },
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user!.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

export const createUser = (req: Request, res: Response): void => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export const getMe = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  req.params.id = req.user!.id;
  next();
};

export const test = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Convert the buffer from memory storage into a stream and upload to Cloudinary
    cloudinary.uploader
      .upload_stream(
        { folder: 'users_photos' }, // Cloudinary folder
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res
              .status(500)
              .json({ error: 'Error uploading to Cloudinary' });
          }

          console.log(result);
          res.status(200).json({
            message: 'File uploaded successfully',
          });
        },
      )
      .end(req.file.buffer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
};

export const getUser = factory.getOne(User);
export const getAllUsers = factory.getAll(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
