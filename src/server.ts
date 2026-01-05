import dotenv from 'dotenv';

// Load environment variables FIRST before importing anything that uses them
dotenv.config({ path: './src/config.env' });

import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';

const db = process.env.DATABASE!;

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

const port = 3000;
const server: Server = app.listen(port, () => {
  console.log('app running');
});
