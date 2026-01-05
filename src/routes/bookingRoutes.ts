import express, { Router } from 'express';
import * as authController from './../controllers/authController';
import * as bookingController from './../controllers/bookingController';

const router: Router = express.Router();

router.use(authController.protect);
router.get(
  '/checkout-session/:tourId',

  bookingController.getCheckoutSession,
);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingController.getAllBooking)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .delete(bookingController.deleteBooking)
  .put(bookingController.updateBooking);

export default router;
