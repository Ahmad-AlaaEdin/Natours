import axiosInstance from "./axiosInstance";
import type { Tour } from "@/types/tour";

interface ToursApiResponse {
  status: string;
  results: number;
  data: Tour[];
}

interface TourApiResponse {
  status: string;
  data: Tour;
}

export async function getTours(): Promise<Tour[]> {
  try {
    const res = await axiosInstance.get<ToursApiResponse>("/tours");
    return res.data.data || [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export async function getTourById(id: string): Promise<Tour | null> {
  try {
    const res = await axiosInstance.get<TourApiResponse>(`/tours/${id}`);
    return res.data.data || null;
  } catch (error) {
    console.error(`Error fetching tour ${id}:`, error);
    return null;
  }
}
