import { Request, Response, NextFunction } from 'express';
import AppError from './../utils/appError';

type MongooseCastError = {
  name: string;
  path: string;
  value: string | number;
  code?: number;
};

type MongooseDuplicateError = {
  name: string;
  code: number;
  keyValue: Record<string, string>;
};

type MongooseValidationError = {
  name: string;
  errors: Record<string, { message: string }>;
};

const handleCastErrorDB = (err: MongooseCastError): AppError => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const [field, value] = Object.entries(err.keyValue)[0];

  const message = `Duplicate field value: "${value}". Please use another ${field}!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: MongooseValidationError): AppError => {
  const errors = Object.values(err.errors).map((elm) => elm.message);

  const message = `Invalid Input Data .${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (): AppError =>
  new AppError('Invalid Token, Please log in again.', 401);

const handleJWTExpiredError = (): AppError =>
  new AppError('Token Expired, Please log in again.', 401);

const sendDevError = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error', err);
    res.status(500).json({
      status: 'fail',
      message: 'Somthing Went Wrong!',
    });
  }
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV == 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error: AppError = { ...err } as AppError;
    if ((error as unknown as MongooseCastError).name === 'CastError')
      error = handleCastErrorDB(error as unknown as MongooseCastError);
    if ((error as unknown as MongooseDuplicateError).code === 11000)
      error = handleDuplicateFieldsDB(
        error as unknown as MongooseDuplicateError,
      );
    if (
      (error as unknown as MongooseValidationError).name === 'ValidationError'
    )
      error = handleValidationErrorDB(
        error as unknown as MongooseValidationError,
      );
    if ((error as unknown as { name: string }).name === 'JsonWebTokenError')
      error = handleJWTError();
    if ((error as unknown as { name: string }).name === 'TokenExpiredError')
      error = handleJWTExpiredError();
    sendProdError(error, res);
  }
};

export default globalErrorHandler;
