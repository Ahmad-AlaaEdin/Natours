import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';

const db = process.env.DATABASE!;
if (!db) throw new Error('DATABASE env var not defined!');

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

mongoose.connect(db).then(() => {
  console.log('Connect success');
});

const port = Number(process.env.PORT) || 3000;
const server: Server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
