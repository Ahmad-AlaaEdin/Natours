import { Request, Response, NextFunction } from 'express';
import Tour from '../models/tourModel';
import User from '../models/userModel';
import Booking from '../models/bookingModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getOverview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get tour data from collection
    console.log('Fetching tours...');
    const tours = await Tour.find(); // Wait, I need to make sure Tour is imported correctly. It is.
    console.log(`Fetched ${tours.length} tours`);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
      title: 'All Tours',
      tours,
    });
  },
);

export const getTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({
      path: 'reviews',
      select: 'review rating user',
    });

    if (!tour) {
      return next(new AppError('There is no tour with that name.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
  },
);

export const getLoginForm = (req: Request, res: Response): void => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

export const getSignupForm = (req: Request, res: Response): void => {
  res.status(200).render('signup', {
    title: 'Create Account',
  });
};

export const getAccount = (req: Request, res: Response): void => {
  console.log('account');
  res.status(200).render('account', {
    title: 'Your account',
    user: req.user,
  });
};

export const getMyTours = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user!.id);

    const bookings = await Booking.find({ user: req.user!.id });
    console.log('2');

    const tourIDs = bookings.map((el) => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });
    console.log('3');
    res.status(200).render('overview', {
      title: 'My Tours',
      tours,
    });
  },
);

export const updateUserData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user!.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser,
    });
  },
);
