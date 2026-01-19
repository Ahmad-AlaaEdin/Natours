export interface Location {
  type: "Point";
  coordinates: number[];
  address?: string;
  description?: string;
  day?: number;
}

export interface Tour {
  _id: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: "easy" | "medium" | "difficult";
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description?: string;
  imageCover: string;
  images?: string[];
  createdAt: string;
  startDates?: string[];
  secretTour?: boolean;
  startLocation: Location;
  locations?: Location[];
  guides?: string[];
  id?: string;
  __v?: number;
}

export type DifficultyDisplay = "Easy" | "Medium" | "Difficult";
