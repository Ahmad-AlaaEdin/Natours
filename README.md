# DamasGo - Syrian Tourism Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Express-4.21-000000?logo=express" alt="Express">
</p>

## 📖 Description

**DamasGo** is a comprehensive full-stack web application for exploring and booking tours in Syria. The platform showcases Syria's rich cultural heritage, from Damascus' ancient souqs to Palmyra's desert ruins, making it easy for travelers to discover and book authentic Syrian experiences.

### Frontend (Client)

A modern, responsive React SPA built with TypeScript and Vite, featuring:

- 🎨 Beautiful UI with custom design system and color palette
- 🗺️ Interactive tour maps with Leaflet integration
- 💳 Secure Stripe payment integration
- 📸 Cloudinary image upload for user profiles
- ⭐ Review and rating system with CRUD operations
- 🔐 JWT-based authentication with protected routes
- 📱 Fully responsive design optimized for all devices
- ⚡ Fast performance with code splitting and lazy loading

### Backend (Server)

A robust RESTful API built with Node.js, Express, and MongoDB, providing:

- 🔒 Secure authentication & authorization with JWT
- 👥 Role-based access control (User, Lead-Guide, Guide, Admin)
- 🎫 Complete tour management system
- 💰 Stripe payment processing with webhook integration
- ☁️ Cloudinary integration for image management
- ✉️ Email notifications (Brevo/Mailtrap)
- 📝 Review and rating management
- 🛡️ Advanced security (rate limiting, sanitization, helmet)
- 🐛 Comprehensive error handling

## 🛠️ Technologies

### Frontend Stack

- **React 18.3** - UI library
- **TypeScript 5.6** - Type safety
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS
- **Shadcn/UI** - Component library
- **Leaflet** - Interactive maps
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **Embla Carousel** - Image carousels

### Backend Stack

- **Node.js** - Runtime environment
- **Express.js 4.21** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing
- **Express-rate-limit** - Rate limiting
- **Helmet** - Security headers
- **Express-mongo-sanitize** - NoSQL injection prevention

## 🚀 Installation & Setup

### Prerequisites

- Node.js 20+ installed
- MongoDB installed and running (local or Atlas)
- Stripe account for payments
- Cloudinary account for image uploads
- Email service account (Brevo for production, Mailtrap for development)

### 1. Clone the Repository

```bash
git clone https://github.com/Ahmad-AlaaEdin/DamasGo.git
cd DamasGo
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/damasgo?retryWrites=true&w=majority
DATABASE_PASSWORD=your_mongodb_password

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration - Development (Mailtrap)
DEV_EMAIL_HOST=smtp.mailtrap.io
DEV_EMAIL_PORT=2525
DEV_EMAIL_USERNAME=your_mailtrap_username
DEV_EMAIL_PASSWORD=your_mailtrap_password

# Email Configuration - Production (Brevo)
EMAIL_FROM=noreply@damasgo.com
BREVO_HOST=smtp-relay.brevo.com
BREVO_PORT=587
BREVO_LOGIN=your_brevo_login
BREVO_PASSWORD=your_brevo_password

# Client URL
CLIENT_URL=http://localhost:5173
```

#### Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run at `http://localhost:3000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd client
npm install
```

#### Environment Configuration

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Cloudinary (for direct uploads from client)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset

# Stripe (Public Key)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

#### Start Frontend Development Server

```bash
npm run dev
```

The client will run at `http://localhost:5173`

## 📁 Project Structure

```
DamasGo/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── auth/     # Authentication components
│   │   │   ├── home/     # Home page components
│   │   │   ├── profile/  # Profile components
│   │   │   ├── tour/     # Tour-related components
│   │   │   ├── layout/   # Layout components (Header, Footer)
│   │   │   └── ui/       # Base UI components (shadcn)
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service layer
│   │   ├── context/      # React context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── types/        # TypeScript type definitions
│   │   ├── utils/        # Utility functions
│   │   └── lib/          # Third-party library configurations
│   ├── public/           # Static assets
│   └── package.json
│
└── server/               # Backend API application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Mongoose models
    │   ├── routes/       # Express routes
    │   ├── middleware/   # Custom middleware
    │   ├── utils/        # Utility functions
    │   ├── scripts/      # Database seeding scripts
    │   └── server.ts     # Entry point
    ├── public/           # Static files
    └── package.json
```

## 🔑 Key Features

### User Features

- ✅ User registration and login with JWT authentication
- ✅ Profile management with avatar upload
- ✅ Browse and filter tours
- ✅ View detailed tour information with interactive maps
- ✅ Book tours with secure Stripe checkout
- ✅ View booking history
- ✅ Write, edit, and delete reviews
- ✅ Rate tours (1-5 stars)

### Tour Features

- ✅ Rich tour details (duration, group size, difficulty)
- ✅ Multiple images with gallery carousel
- ✅ Start location and route visualization
- ✅ Tour guides information
- ✅ Reviews and ratings display
- ✅ Dynamic pricing with discounts

### Admin Features

- ✅ Create, update, and delete tours
- ✅ Manage user accounts and roles
- ✅ View all bookings
- ✅ Moderate reviews

## 🔐 Security Features

- JWT token-based authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Rate limiting on API endpoints
- NoSQL injection prevention
- XSS protection
- Security headers with Helmet
- CORS configuration
- Input validation and sanitization

## 📊 API Endpoints

### Authentication

- `POST /api/v1/users/signup` - Register new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/logout` - User logout
- `POST /api/v1/users/forgotPassword` - Request password reset
- `PATCH /api/v1/users/resetPassword/:token` - Reset password

### Tours

- `GET /api/v1/tours` - Get all tours
- `GET /api/v1/tours/:id` - Get single tour
- `POST /api/v1/tours` - Create tour (admin/lead-guide)
- `PATCH /api/v1/tours/:id` - Update tour (admin/lead-guide)
- `DELETE /api/v1/tours/:id` - Delete tour (admin/lead-guide)

### Reviews

- `GET /api/v1/reviews` - Get all reviews
- `GET /api/v1/tours/:tourId/reviews` - Get reviews for a tour
- `POST /api/v1/tours/:tourId/reviews` - Create review
- `PATCH /api/v1/reviews/:id` - Update own review
- `DELETE /api/v1/reviews/:id` - Delete own review

### Bookings

- `POST /api/v1/bookings/checkout-session/:tourId` - Create Stripe checkout
- `GET /api/v1/bookings/my-bookings` - Get user's bookings
- `POST /api/v1/bookings/webhook` - Stripe webhook handler

### Users

- `GET /api/v1/users/me` - Get current user
- `PATCH /api/v1/users/updateMe` - Update current user
- `DELETE /api/v1/users/deleteMe` - Deactivate account
- `PATCH /api/v1/users/updateMyPassword` - Change password
