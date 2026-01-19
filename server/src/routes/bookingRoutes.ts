import express, { Router } from 'express';
import * as authController from './../controllers/authController';
import * as bookingController from './../controllers/bookingController';

const router: Router = express.Router();

// Note: Webhook route is mounted in app.ts BEFORE express.json() middleware
// This is required for Stripe signature verification which needs the raw body

router.use(authController.protect);
router.get(
  '/checkout-session/:tourId',

  bookingController.getCheckoutSession,
);

router.get('/my-bookings', bookingController.getMyBookings);

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
