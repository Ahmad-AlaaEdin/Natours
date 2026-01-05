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
      success_url: `${req.protocol}://${req.get('host')}/?tour=${
        req.params.tourId
      }&user=${req.user!.id}&price=${tour.price}`,
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
      mode: 'payment',
      customer_email: req.user!.email,
      client_reference_id: req.params.tourId,
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

export const createBookingCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tour, user, price } = req.query as {
      tour?: string;
      user?: string;
      price?: string;
    };

    if (!tour || !user || !price) return next();

    await Booking.create({ tour, user, price: Number(price) });
    res.redirect(req.originalUrl.split('?')[0]);
  },
);

export const getBooking = factory.getOne(Booking);
export const getAllBooking = factory.getAll(Booking);
export const updateBooking = factory.updateOne(Booking);
export const createBooking = factory.createOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);
