import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import Tour from '../models/tourModel';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../config.env') });

// Tour data from client
const toursData = [
  {
    name: 'Damascus Old City Explorer',
    duration: 3,
    maxGroupSize: 15,
    difficulty: 'easy' as const,
    price: 299,
    summary: 'Ancient Streets & Souqs',
    description:
      'Walk through the oldest continuously inhabited city in the world, exploring ancient souqs, historic mosques, and traditional Damascus houses',
    imageCover:
      'https://images.unsplash.com/photo-1737275853879-731f24015ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hc2N1cyUyMG9sZCUyMGNpdHklMjBzeXJpYXxlbnwxfHx8fDE3Njc1OTY3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.9,
    ratingsQuantity: 24,
    startDates: [
      new Date('2026-03-01'),
      new Date('2026-03-15'),
      new Date('2026-03-29'),
    ],
    startLocation: {
      type: 'Point',
      coordinates: [36.2765, 33.5138], // Damascus coordinates [longitude, latitude]
      address: 'Damascus, Syria',
      description: 'Damascus Old City',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [36.3063, 33.5117],
        description: 'Umayyad Mosque',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [36.3046, 33.5102],
        description: 'Al-Hamidiyah Souq',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [36.3128, 33.5119],
        description: 'Street Called Straight',
        day: 2,
      },
    ],
  },
  {
    name: 'Palmyra Ancient City',
    duration: 2,
    maxGroupSize: 12,
    difficulty: 'medium' as const,
    price: 349,
    summary: 'Desert Rose of Syria',
    description:
      'Journey through time at Palmyra, the magnificent ancient caravan city that once connected Persia, India, and China to the Roman Empire',
    imageCover:
      'https://images.unsplash.com/photo-1622301254919-93fcfbc82ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxteXJhJTIwcnVpbnMlMjBzeXJpYXxlbnwxfHx8fDE3Njc3MDAxODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.8,
    ratingsQuantity: 18,
    startDates: [new Date('2026-04-05'), new Date('2026-04-19')],
    startLocation: {
      type: 'Point',
      coordinates: [38.2699, 34.5548], // Palmyra coordinates
      address: 'Palmyra, Syria',
      description: 'Ancient Palmyra',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [38.2699, 34.5548],
        description: 'Monumental Arch and Colonnaded Streets',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [38.2725, 34.5563],
        description: 'Temple of Bel',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [38.2652, 34.5521],
        description: 'Valley of the Tombs',
        day: 2,
      },
    ],
  },
  {
    name: 'Aleppo Citadel Experience',
    duration: 4,
    maxGroupSize: 15,
    difficulty: 'medium' as const,
    price: 449,
    summary: 'Medieval Fortress & Souqs',
    description:
      'Discover Aleppo, one of the oldest cities in the world, with its imposing citadel and the famous covered souq',
    imageCover:
      'https://images.unsplash.com/photo-1699951364233-be78eafd6395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGVwcG8lMjBjaXRhZGVsJTIwc3lyaWF8ZW58MXx8fHwxNzY3NzAwMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.9,
    ratingsQuantity: 21,
    startDates: [new Date('2026-05-01'), new Date('2026-05-15')],
    startLocation: {
      type: 'Point',
      coordinates: [37.1622, 36.2012], // Aleppo coordinates
      address: 'Aleppo, Syria',
      description: 'Aleppo Citadel',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [37.1622, 36.2012],
        description: 'Aleppo Citadel',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [37.1595, 36.1988],
        description: 'Historic Covered Souq',
        day: 2,
      },
      {
        type: 'Point',
        coordinates: [37.1606, 36.1985],
        description: 'Great Mosque of Aleppo',
        day: 3,
      },
    ],
  },
  {
    name: 'Krak des Chevaliers Castle',
    duration: 1,
    maxGroupSize: 20,
    difficulty: 'easy' as const,
    price: 149,
    summary: 'Crusader Castle Journey',
    description:
      'Visit the best-preserved medieval castle in the world, perched dramatically on a hilltop overlooking the Syrian countryside',
    imageCover:
      'https://images.unsplash.com/photo-1598177183224-b3cec6da6b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tYW4lMjBydWlucyUyMGNvbHVtbnN8ZW58MXx8fHwxNzY3NzAwMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.7,
    ratingsQuantity: 16,
    startDates: [
      new Date('2026-03-10'),
      new Date('2026-03-24'),
      new Date('2026-04-07'),
    ],
    startLocation: {
      type: 'Point',
      coordinates: [36.2943, 34.7567], // Krak des Chevaliers coordinates
      address: 'Homs, Syria',
      description: 'Krak des Chevaliers',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [36.2943, 34.7567],
        description: 'Crusader Fortress',
        day: 1,
      },
    ],
  },
  {
    name: 'Bosra Roman Theater',
    duration: 1,
    maxGroupSize: 18,
    difficulty: 'easy' as const,
    price: 129,
    summary: 'Black Basalt City',
    description:
      'Explore Bosra, the ancient Nabataean city with the best-preserved Roman theater in the world, built entirely of black basalt',
    imageCover:
      'https://images.unsplash.com/photo-1610890747984-82d52456055f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeXJpYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY3NzAwMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.8,
    ratingsQuantity: 14,
    startDates: [new Date('2026-04-12'), new Date('2026-04-26')],
    startLocation: {
      type: 'Point',
      coordinates: [36.4822, 32.5197], // Bosra coordinates
      address: 'Bosra, Syria',
      description: 'Ancient Bosra',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [36.4822, 32.5197],
        description: 'Roman Theater with 15,000 seat capacity',
        day: 1,
      },
    ],
  },
  {
    name: 'Maaloula Christian Heritage',
    duration: 1,
    maxGroupSize: 15,
    difficulty: 'medium' as const,
    price: 119,
    summary: 'Aramaic Language Village',
    description:
      'Visit the mountain village of Maaloula where Aramaic, the language of Jesus Christ, is still spoken today',
    imageCover:
      'https://images.unsplash.com/photo-1719068741301-8c45e1c7f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0JTIwYXJjaGl0ZWN0dXJlJTIwbW9zcXVlfGVufDF8fHx8MTc2NzcwMDE4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ratingsAverage: 4.9,
    ratingsQuantity: 19,
    startDates: [
      new Date('2026-03-08'),
      new Date('2026-04-05'),
      new Date('2026-05-03'),
      new Date('2026-06-07'),
    ],
    startLocation: {
      type: 'Point',
      coordinates: [36.5431, 33.8461], // Maaloula coordinates
      address: 'Maaloula, Syria',
      description: 'Mountain Village of Maaloula',
    },
    locations: [
      {
        type: 'Point',
        coordinates: [36.5431, 33.8461],
        description: 'St. Sergius Monastery',
        day: 1,
      },
      {
        type: 'Point',
        coordinates: [36.5445, 33.8475],
        description: 'St. Bacchus Monastery',
        day: 1,
      },
    ],
  },
];

// Database connection
const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || '',
);

if (!DB) {
  console.error('❌ DATABASE environment variable is not defined!');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('✅ Database connection successful!');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
};

// Import data into database
const importData = async () => {
  try {
    await Tour.create(toursData);
    console.log('✅ Data successfully loaded!');
    console.log(`📦 Imported ${toursData.length} tours`);
  } catch (err) {
    console.error('❌ Error loading data:', err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('✅ Data successfully deleted!');
  } catch (err) {
    console.error('❌ Error deleting data:', err);
  }
  process.exit();
};

// Main function
const main = async () => {
  await connectDB();

  const args = process.argv[2];

  if (args === '--import' || args === '-i') {
    await importData();
  } else if (args === '--delete' || args === '-d') {
    await deleteData();
  } else if (args === '--refresh' || args === '-r') {
    console.log('🔄 Refreshing data...');
    await deleteData();
    await connectDB();
    await importData();
  } else {
    console.log(`
📚 Tour Data Seed Script
========================

Usage:
  npm run seed -- [option]

Options:
  --import, -i     Import tour data into database
  --delete, -d     Delete all tours from database
  --refresh, -r    Delete all tours and re-import fresh data

Examples:
  npm run seed -- --import
  npm run seed -- --delete
  npm run seed -- --refresh
    `);
    process.exit();
  }
};

// Run the script
main();
