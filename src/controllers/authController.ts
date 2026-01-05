import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import Email from '../utils/email';

type JwtDecoded = JwtPayload & {
  id: string;
  iat: number;
};

type CookieOptions = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};

// JWT Configuration following Rule 3: readonly for config objects
type JwtConfig = {
  readonly secret: string;
  readonly expiresIn: string;
  readonly cookieExpiresInDays: number;
};

// Validate JWT_SECRET exists at startup
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const jwtConfig: JwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  cookieExpiresInDays: Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90,
};

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

const signToken = (userID: string): string => {
  return jwt.sign(
    { id: userID },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn } as any, // Type workaround for jsonwebtoken compatibility
  );
};

const sendToken = (
  user: typeof User.prototype,
  statusCode: number,
  res: Response,
): void => {
  const token = signToken(user.id);
  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + jwtConfig.cookieExpiresInDays * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const url = `${req.protocol}://${req.get('host')}/me`;
    await new Email(newUser, url).sendWelcome();

    sendToken(newUser, 201, res);
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError('Please Provide Email And Password', 400);

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.checkPassword(password)))
      throw new AppError('Incorrect  Email or Password', 401);

    sendToken(user, 200, res);
  },
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Check Token

    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(new AppError('You are not logged in', 401));
    }

    //Verification Token
    const decoded = jwt.verify(token!, jwtConfig.secret) as JwtDecoded;

    //Check if user still exist
    const user = await User.findById(decoded.id);
    if (!user)
      throw new AppError(
        'The User belonging to this token no longer exists.',
        401,
      );

    //Check if password changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      throw new AppError(
        'User Recently Changed password! please log in again.',
        401,
      );
    }
    req.user = user;
    next();
  },
);

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log(req.originalUrl.split('?')[0]);
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = jwt.verify(
        req.cookies.jwt,
        jwtConfig.secret,
      ) as JwtDecoded;

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user!.role)) {
      next(
        new AppError(
          'You do not have a permission to perform this action',
          403,
        ),
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host',
      )}/api/v1/users/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          'There was an error sending the email. Try again later!',
          500,
        ),
      );
    }
  },
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //Get user based on Token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      // passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    sendToken(user, 200, res);
  },
);

export const logout = (req: Request, res: Response): void => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user!.id).select('+password');

    if (!(await user!.checkPassword(req.body.currentPassword)))
      next(new AppError('Password is Incorrect!', 401));

    user!.password = req.body.password;
    user!.passwordConfirm = req.body.passwordConfirm;

    await user!.save();

    sendToken(user!, 200, res);
  },
);
