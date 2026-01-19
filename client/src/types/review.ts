import type { User } from "./auth";
import type { Tour } from "./tour";

export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: string | User;
  tour: string | Tour;
  id?: string;
  __v?: number;
}

export interface ReviewWithUser {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: User;
  tour: string | Tour;
  id?: string;
  __v?: number;
}

export interface ReviewPopulated {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: User;
  tour: Tour;
  id?: string;
  __v?: number;
}

export interface CreateReviewData {
  review: string;
  rating: number;
  tour: string;
  user?: string;
}

export interface UpdateReviewData {
  review?: string;
  rating?: number;
}
