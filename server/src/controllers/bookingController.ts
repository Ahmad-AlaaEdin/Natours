import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import Tour from '../models/tourModel';
import Booking from '../models/bookingModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import * as factory from './handlerFactory';

// Stripe configuration following Rule 3: readonly for config objects
type StripeConfig = {
  readonly secretKey: string;
};

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripeConfig: StripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
};

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: '2024-06-20',
});

export const getCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tour = await Tour.findById(req.params.tourId);

    if (!tour) {
      return next(new AppError('Tour not found', 404));
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],

      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/tour/${tour._id}`,
      mode: 'payment',
      customer_email: req.user!.email,
      client_reference_id: req.params.tourId,

      metadata: {
        userId: req.user!.id,
        tourId: req.params.tourId,
        tourPrice: tour.price.toString(),
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tour.name} Tour`,
              description: tour.summary,
              images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            },
            unit_amount: tour.price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
    });

    res.status(200).json({
      message: 'success',
      session,
    });
  },
);

export const webhookCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers['stripe-signature'] as string;

    if (!signature) {
      return next(new AppError('No stripe signature found', 400));
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return next(new AppError('STRIPE_WEBHOOK_SECRET is not configured', 500));
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err: any) {
      return next(
        new AppError(
          `Webhook signature verification failed: ${err.message}`,
          400,
        ),
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      const tourId = session.metadata?.tourId || session.client_reference_id;
      const userId = session.metadata?.userId;
      const price = session.metadata?.tourPrice || session.amount_total / 100;

      if (tourId && userId && price) {
        await Booking.create({
          tour: tourId,
          user: userId,
          price: Number(price),
        });
      }
    }

    res.status(200).json({ received: true });
  },
);

export const getMyBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookings = await Booking.find({ user: req.user!.id });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: bookings,
    });
  },
);

export const getBooking = factory.getOne(Booking);
export const getAllBooking = factory.getAll(Booking);
export const updateBooking = factory.updateOne(Booking);
export const createBooking = factory.createOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);
