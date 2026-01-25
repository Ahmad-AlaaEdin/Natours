import axiosInstance from "./axiosInstance";
import type { Tour } from "@/types/tour";

interface ToursApiResponse {
  status: string;
  results: number;
  total: number;
  data: Tour[];
}

interface TourApiResponse {
  status: string;
  data: Tour;
}

export async function getTours(
  page = 1,
  limit = 6,
  sort = "price",
): Promise<{ tours: Tour[]; total: number }> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    if (sort) params.append("sort", sort);

    const res = await axiosInstance.get<ToursApiResponse>(
      `/tours?${params.toString()}`,
    );
    return {
      tours: res.data.data || [],
      total: res.data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching tours:", error);
    return { tours: [], total: 0 };
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
