import path from 'path';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';

import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import userRoute from './routes/userRoutes';
import tourRoute from './routes/tourRoutes';
import reviewRoute from './routes/reviewRoutes';
import bookingRoute from './routes/bookingRoutes';
import uploadRoute from './routes/uploadRoutes';
import { webhookCheckout } from './controllers/bookingController';

const app: Application = express();
app.set('trust proxy', 1);
//Global Middlewares

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
      'script-src': [
        "'self'",
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
        'https://carto.com/attributions',
        'https://cdn.jsdelivr.net',
        'https://js.stripe.com/v3/',
      ],
      connectSrc: [
        "'self'",
        'http://127.0.0.1:8000',
        'http://192.168.1.38:8000',
        'http://172.18.0.1:8000',
        'https://api.stripe.com/',
        'https://api.cloudinary.com',
        'ws://localhost:56046',
        'ws://127.0.0.1:56046',
        'ws://127.0.0.1:57232/',
        'https://*',
      ],
      'frame-src': ['self', 'https://*.stripe.com'],
      'style-src': [
        "'self'",
        'https://*.googleapis.com',
        'https://unpkg.com',
        'https://carto.com/attributions',
        'https://js.stripe.com/v3/',
      ],
      'img-src': [
        "'self'",
        'data:',
        'https://*.openstreetmap.org',
        'https://unpkg.com',
        'https://server.arcgisonline.com',
        'https://carto.com/attributions',
        'https://*.basemaps.cartocdn.com',
        'https://upload.wikimedia.org',
        'https://res.cloudinary.com',
      ],
    },
  },
} as const;

app.use(helmet(helmetConfig));

// IMPORTANT: Stripe webhook must be BEFORE express.json()
// Stripe needs the raw body to verify webhook signatures
app.post(
  '/api/v1/webhook',
  express.raw({ type: 'application/json' }),
  webhookCheckout,
);

app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));

const limiterConfig = {
  max: 100,
  window: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
} as const;

const limiter = rateLimit(limiterConfig);

app.use(limiter);

app.use(mongoSanitize());

app.use(xss());

const hppConfig = {
  whitelist: [
    'duration',
    'maxGroupSize',
    'difficulty',
    'ratingsAverage',
    'ratingsQuantity',
    'price',
  ],
};

app.use(hpp(hppConfig));

//Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/upload', uploadRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can not find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
