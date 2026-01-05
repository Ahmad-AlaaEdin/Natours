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

import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import userRoute from './routes/userRoutes';
import tourRoute from './routes/tourRoutes';
import reviewRoute from './routes/reviewRoutes';
import viewRoutes from './routes/viewRoutes';
import bookingRoute from './routes/bookingRoutes';

const app: Application = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Global Middlewares
app.use(express.static(path.join(__dirname, 'public')));

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
        //'ws://127.0.0.1:56046',
      ],
      connectSrc: [
        "'self'",
        'http://127.0.0.1:8000',
        'https://api.stripe.com/',
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
      ],
    },
  },
} as const;

app.use(helmet(helmetConfig));
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
app.use('/', viewRoutes);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can not find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
