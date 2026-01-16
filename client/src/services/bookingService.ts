import axiosInstance from "./axiosInstance";

export interface CheckoutSessionResponse {
  message: string;
  session: {
    id: string;
    url: string;
  };
}

export async function bookTour(tourId: string): Promise<void> {
  try {
    const response = await axiosInstance.get<CheckoutSessionResponse>(
      `/booking/checkout-session/${tourId}`
    );

    const sessionUrl = response.data.session.url;

    if (!sessionUrl) {
      throw new Error("No checkout URL received from server");
    }

    window.location.href = sessionUrl;
  } catch (error: any) {
    console.error("Error booking tour:", error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to process booking"
    );
  }
}

export async function getMyBookings() {
  try {
    const response = await axiosInstance.get("/booking/my-bookings");
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch bookings"
    );
  }
}
