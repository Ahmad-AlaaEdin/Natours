export interface Tour {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  location: string;
  date: string;
  duration: string;
  people: number;
  price: number;
  rating: number;
  reviews: number;
  difficulty: "Easy" | "Medium" | "Hard";
  highlights: string[];
  included: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Damascus Old City Explorer",
    subtitle: "Ancient Streets & Souqs",
    description:
      "Walk through the oldest continuously inhabited city in the world, exploring ancient souqs, historic mosques, and traditional Damascus houses",
    image:
      "https://images.unsplash.com/photo-1737275853879-731f24015ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hc2N1cyUyMG9sZCUyMGNpdHklMjBzeXJpYXxlbnwxfHx8fDE3Njc1OTY3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Damascus, Syria",
    date: "March 2026",
    duration: "3 days",
    people: 15,
    price: 299,
    rating: 4.9,
    reviews: 24,
    difficulty: "Easy",
    highlights: [
      "Visit Umayyad Mosque, one of the largest and oldest mosques",
      "Explore the historic Al-Hamidiyah Souq",
      "Walk the Street Called Straight from Biblical times",
      "Traditional Damascus house visit with Arabic coffee",
    ],
    included: [
      "Expert local guide",
      "All entrance fees",
      "Traditional Syrian lunch",
      "Hotel pickup and drop-off",
      "Bottled water",
    ],
    itinerary: [
      {
        day: 1,
        title: "Old Damascus Discovery",
        description:
          "Begin at the magnificent Umayyad Mosque, then wander through the ancient souqs of Damascus. Visit traditional craftsmen workshops.",
      },
      {
        day: 2,
        title: "Historic Quarter Walk",
        description:
          "Explore the Christian Quarter, visit St. Ananias Church, and walk the Street Called Straight. Traditional lunch in a Damascus house.",
      },
      {
        day: 3,
        title: "Cultural Immersion",
        description:
          "Visit Azem Palace, explore textile souqs, and enjoy a farewell dinner with Syrian meze and live traditional music.",
      },
    ],
  },
  {
    id: 2,
    title: "Palmyra Ancient City",
    subtitle: "Desert Rose of Syria",
    description:
      "Journey through time at Palmyra, the magnificent ancient caravan city that once connected Persia, India, and China to the Roman Empire",
    image:
      "https://images.unsplash.com/photo-1622301254919-93fcfbc82ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxteXJhJTIwcnVpbnMlMjBzeXJpYXxlbnwxfHx8fDE3Njc3MDAxODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Palmyra, Syria",
    date: "April 2026",
    duration: "2 days",
    people: 12,
    price: 349,
    rating: 4.8,
    reviews: 18,
    difficulty: "Medium",
    highlights: [
      "Explore the monumental arch and colonnaded streets",
      "Visit the Temple of Bel and Theater",
      "Sunset at the Valley of the Tombs",
      "Palmyra Museum collection",
    ],
    included: [
      "Transportation from Damascus",
      "Accommodation in Palmyra",
      "Archaeological guide",
      "All meals",
      "Site entrance fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Journey to Palmyra",
        description:
          "Drive through Syrian desert. Arrive in Palmyra and explore the main archaeological site with monumental columns and temples.",
      },
      {
        day: 2,
        title: "Tombs and Return",
        description:
          "Morning visit to the Valley of Tombs and Arab Castle. Museum visit before returning to Damascus.",
      },
    ],
  },
  {
    id: 3,
    title: "Aleppo Citadel Experience",
    subtitle: "Medieval Fortress & Souqs",
    description:
      "Discover Aleppo, one of the oldest cities in the world, with its imposing citadel and the famous covered souq",
    image:
      "https://images.unsplash.com/photo-1699951364233-be78eafd6395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGVwcG8lMjBjaXRhZGVsJTIwc3lyaWF8ZW58MXx8fHwxNzY3NzAwMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Aleppo, Syria",
    date: "May 2026",
    duration: "4 days",
    people: 15,
    price: 449,
    rating: 4.9,
    reviews: 21,
    difficulty: "Medium",
    highlights: [
      "Explore the magnificent Aleppo Citadel",
      "Walk through the historic covered souq",
      "Visit the Great Mosque of Aleppo",
      "Traditional hammam experience",
    ],
    included: [
      "Round-trip transport from Damascus",
      "Hotel accommodation",
      "Expert historian guide",
      "Daily breakfast and dinner",
      "All entrance fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Citadel",
        description:
          "Travel to Aleppo. Afternoon exploration of the imposing Citadel with its massive walls and historic mosque.",
      },
      {
        day: 2,
        title: "Souq Discovery",
        description:
          "Full day exploring the UNESCO-listed covered souq, visiting traditional craftsmen and tasting local specialties.",
      },
      {
        day: 3,
        title: "Religious Heritage",
        description:
          "Visit historic mosques and churches, including the Great Mosque and the Cathedral of Saint Elijah.",
      },
      {
        day: 4,
        title: "Hammam & Return",
        description:
          "Morning traditional hammam experience, then return journey to Damascus.",
      },
    ],
  },
  {
    id: 4,
    title: "Krak des Chevaliers",
    subtitle: "Crusader Castle Journey",
    description:
      "Visit the best-preserved medieval castle in the world, perched dramatically on a hilltop overlooking the Syrian countryside",
    image:
      "https://images.unsplash.com/photo-1598177183224-b3cec6da6b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tYW4lMjBydWlucyUyMGNvbHVtbnN8ZW58MXx8fHwxNzY3NzAwMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Homs, Syria",
    date: "March 2026",
    duration: "1 day",
    people: 20,
    price: 149,
    rating: 4.7,
    reviews: 16,
    difficulty: "Easy",
    highlights: [
      "Explore the Crusader fortress interior",
      "Walk the medieval ramparts",
      "Stunning panoramic countryside views",
      "Visit to nearby villages",
    ],
    included: [
      "Day trip transportation",
      "Castle entrance fee",
      "Professional guide",
      "Traditional lunch",
      "All taxes",
    ],
    itinerary: [
      {
        day: 1,
        title: "Castle Exploration",
        description:
          "Morning departure to Krak des Chevaliers. Guided tour of the fortress, lunch in local village, return to Damascus evening.",
      },
    ],
  },
  {
    id: 5,
    title: "Bosra Roman Theater",
    subtitle: "Black Basalt City",
    description:
      "Explore Bosra, the ancient Nabataean city with the best-preserved Roman theater in the world, built entirely of black basalt",
    image:
      "https://images.unsplash.com/photo-1610890747984-82d52456055f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzeXJpYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY3NzAwMTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Bosra, Syria",
    date: "April 2026",
    duration: "1 day",
    people: 18,
    price: 129,
    rating: 4.8,
    reviews: 14,
    difficulty: "Easy",
    highlights: [
      "Roman theater with 15,000 seat capacity",
      "Ancient Nabataean and Roman ruins",
      "Historic mosque and cathedral",
      "Traditional southern Syrian lunch",
    ],
    included: [
      "Round-trip transport",
      "Theater entrance",
      "Archaeological guide",
      "Lunch with local family",
      "Refreshments",
    ],
    itinerary: [
      {
        day: 1,
        title: "Bosra Day Trip",
        description:
          "Travel south to Bosra. Explore the magnificent Roman theater, walk ancient streets, visit historic sites, enjoy traditional lunch.",
      },
    ],
  },
  {
    id: 6,
    title: "Maaloula & Christian Heritage",
    subtitle: "Aramaic Language Village",
    description:
      "Visit the mountain village of Maaloula where Aramaic, the language of Jesus Christ, is still spoken today",
    image:
      "https://images.unsplash.com/photo-1719068741301-8c45e1c7f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBlYXN0JTIwYXJjaGl0ZWN0dXJlJTIwbW9zcXVlfGVufDF8fHx8MTc2NzcwMDE4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Maaloula, Syria",
    date: "Year-round",
    duration: "1 day",
    people: 15,
    price: 119,
    rating: 4.9,
    reviews: 19,
    difficulty: "Medium",
    highlights: [
      "Visit ancient cliff monasteries",
      "Meet Aramaic-speaking locals",
      "Explore the mountain gorge",
      "Visit St. Sergius and St. Bacchus monasteries",
    ],
    included: [
      "Day trip transportation",
      "Monastery entrance fees",
      "Local guide",
      "Traditional meal",
      "Aramaic language demonstration",
    ],
    itinerary: [
      {
        day: 1,
        title: "Mountain Village Discovery",
        description:
          "Drive through Anti-Lebanon mountains. Visit ancient monasteries carved into cliffs, walk the gorge, meet locals, experience Aramaic culture.",
      },
    ],
  },
];

export const getTourById = (id: number): Tour | undefined => {
  return tours.find((tour) => tour.id === id);
};
