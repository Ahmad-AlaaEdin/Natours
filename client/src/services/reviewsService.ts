import axiosInstance from "./axiosInstance";
import type { CreateReviewData } from "@/types/review";

export async function getTourReviews(tourId: string) {
  try {
    const res = await axiosInstance.get(`/tours/${tourId}/reviews`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function createReview(
  tourId: string,
  reviewData: CreateReviewData
) {
  try {
    const res = await axiosInstance.post(
      `/tours/${tourId}/reviews`,
      reviewData
    );
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create review",
    };
  }
}

export async function updateReview(
  reviewId: string,
  reviewData: Partial<CreateReviewData>
) {
  try {
    const res = await axiosInstance.patch(`/reviews/${reviewId}`, reviewData);
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update review",
    };
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const res = await axiosInstance.delete(`/reviews/${reviewId}`);
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete review",
    };
  }
}
