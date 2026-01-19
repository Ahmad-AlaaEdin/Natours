# Tour Database Seeding Script

This script allows you to populate your MongoDB database with initial tour data.

## 📋 Prerequisites

- MongoDB connection must be configured in `src/config.env`
- Server dependencies must be installed (`npm install`)

## 🚀 Usage

### Import Tours

Add all tours to the database:

```bash
npm run seed -- --import
# or
npm run seed -- -i
```

### Delete Tours

Remove all tours from the database:

```bash
npm run seed -- --delete
# or
npm run seed -- -d
```

### Refresh Tours

Delete all existing tours and import fresh data:

```bash
npm run seed -- --refresh
# or
npm run seed -- -r
```

### Show Help

Display available commands:

```bash
npm run seed
```

## 📊 Data Overview

The script seeds 6 tours:

1. **Damascus Old City Explorer** - 3 days, Easy, $299
2. **Palmyra Ancient City** - 2 days, Medium, $349
3. **Aleppo Citadel Experience** - 4 days, Medium, $449
4. **Krak des Chevaliers Castle** - 1 day, Easy, $149
5. **Bosra Roman Theater** - 1 day, Easy, $129
6. **Maaloula Christian Heritage** - 1 day, Medium, $119

## 🗺️ Geographic Data

Each tour includes:

- Start location with coordinates (GeoJSON Point)
- Multiple location waypoints for the tour route
- Full address and descriptions

## ⚙️ Schema Mapping

The script maps client-side tour data to the server schema:

| Client Field                                               | Server Field      | Notes                 |
| ---------------------------------------------------------- | ----------------- | --------------------- |
| `title`                                                    | `name`            | Tour name             |
| `subtitle`                                                 | `summary`         | Short description     |
| `description`                                              | `description`     | Full description      |
| `image`                                                    | `imageCover`      | Main tour image       |
| `rating`                                                   | `ratingsAverage`  | Average rating (1-5)  |
| `reviews`                                                  | `ratingsQuantity` | Number of reviews     |
| `people`                                                   | `maxGroupSize`    | Maximum group size    |
| `difficulty`                                               | `difficulty`      | easy/medium/difficult |
| Duration strings converted to numbers (e.g., "3 days" → 3) |

## 🔍 Script Location

`/home/ahmad/Natours/server/src/scripts/seedTours.ts`

## 💡 Tips

- Run with `--refresh` to reset your tour data during development
- The script automatically connects to MongoDB and exits after completion
- Check console output for success/error messages
