import express, { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

// Protect all routes - user must be authenticated
router.use(authController.protect);

// GET /api/upload/signature - Get signed upload parameters for Cloudinary
router.get('/signature', uploadController.getUploadSignature);

export default router;
