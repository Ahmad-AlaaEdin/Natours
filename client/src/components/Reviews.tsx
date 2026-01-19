import { getTourReviews } from "@/services/reviewsService";
import { getMyBookings } from "@/services/bookingService";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import type { ReviewWithUser } from "@/types/review";
import type { Booking } from "@/types/booking";
import Review from "./Review";
import AddReview from "./AddReview";

interface ReviewsProps {
  tourId: string | undefined;
}

export default function Reviews({ tourId }: ReviewsProps) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [checkingBooking, setCheckingBooking] = useState(true);

  useEffect(() => {
    if (!tourId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await getTourReviews(tourId);
        setReviews(res.data.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tourId]);

  useEffect(() => {
    if (!isAuthenticated || !user || !tourId) {
      setCheckingBooking(false);
      return;
    }

    const checkBookingStatus = async () => {
      try {
        setCheckingBooking(true);
        const bookings: Booking[] = await getMyBookings();
        const bookedTour = bookings.some(
          (booking) => booking.tour._id === tourId
        );
        setHasBooked(bookedTour);
      } catch (error) {
        console.error("Error checking booking status:", error);
      } finally {
        setCheckingBooking(false);
      }
    };

    checkBookingStatus();
  }, [tourId, user, isAuthenticated]);

  useEffect(() => {
    if (!user || !reviews.length) {
      setHasReviewed(false);
      return;
    }

    const userReview = reviews.some(
      (review) =>
        typeof review.user === "object" && review.user._id === user._id
    );
    setHasReviewed(userReview);
  }, [reviews, user]);

  if (!tourId) return null;

  const showAddReview =
    isAuthenticated && hasBooked && !hasReviewed && !checkingBooking;

  const handleReviewAdded = async () => {
    try {
      const res = await getTourReviews(tourId);
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error refreshing reviews:", error);
    }
  };

  const handleReviewUpdated = async () => {
    try {
      const res = await getTourReviews(tourId);
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error refreshing reviews:", error);
    }
  };

  const handleReviewDeleted = async () => {
    try {
      const res = await getTourReviews(tourId);
      setReviews(res.data.data || []);
    } catch (error) {
      console.error("Error refreshing reviews:", error);
    }
  };

  return (
    <section className="my-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tour Reviews</h2>
        <p className="text-gray-600">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      {showAddReview && (
        <AddReview tourId={tourId} onReviewAdded={handleReviewAdded} />
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg h-32 animate-pulse"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">
            No reviews yet. Be the first to review this tour!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Review
              key={review._id}
              review={review}
              onReviewUpdated={handleReviewUpdated}
              onReviewDeleted={handleReviewDeleted}
            />
          ))}
        </div>
      )}
    </section>
  );
}
