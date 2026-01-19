import { useState, useEffect } from "react";
import { Star, Send, X, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createReview,
  updateReview,
  deleteReview,
} from "@/services/reviewsService";
import type { CreateReviewData, ReviewWithUser } from "@/types/review";

interface AddReviewProps {
  tourId: string;
  existingReview?: ReviewWithUser;
  onReviewAdded?: () => void;
  onReviewUpdated?: () => void;
  onReviewDeleted?: () => void;
}

export default function AddReview({
  tourId,
  existingReview,
  onReviewAdded,
  onReviewUpdated,
  onReviewDeleted,
}: AddReviewProps) {
  const isEditMode = !!existingReview;
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState(existingReview?.review || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.review);
    }
  }, [existingReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);

    const reviewData: CreateReviewData = {
      review: reviewText,
      rating: rating,
      tour: tourId,
    };

    let result;
    if (isEditMode && existingReview) {
      result = await updateReview(existingReview._id, reviewData);
    } else {
      result = await createReview(tourId, reviewData);
    }

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (isEditMode && onReviewUpdated) {
          onReviewUpdated();
        } else if (onReviewAdded) {
          onReviewAdded();
        }
      }, 2000);
    } else {
      setError(
        result.error || `Failed to ${isEditMode ? "update" : "submit"} review`
      );
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!existingReview) return;

    if (
      !confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");

    const result = await deleteReview(existingReview._id);

    if (result.success) {
      if (onReviewDeleted) {
        onReviewDeleted();
      }
    } else {
      setError(result.error || "Failed to delete review");
    }

    setIsDeleting(false);
  };

  const handleReset = () => {
    if (isEditMode && existingReview) {
      setReviewText(existingReview.review);
      setRating(existingReview.rating);
    } else {
      setReviewText("");
      setRating(0);
    }
    setError("");
  };

  return (
    <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        {isEditMode ? (
          <>
            <Edit className="h-5 w-5 text-emerald-600" />
            Edit Your Review
          </>
        ) : (
          <>
            <Star className="h-5 w-5 text-emerald-600" />
            Write a Review
          </>
        )}
      </h3>

      {success ? (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-green-800 mb-2">
            {isEditMode ? "Review Updated!" : "Review Submitted!"}
          </h4>
          <p className="text-green-700">
            {isEditMode
              ? "Your review has been updated successfully."
              : "Thank you for sharing your experience with this tour."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-lg font-semibold text-emerald-700">
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="review-text"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this tour..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
              rows={4}
              disabled={isSubmitting}
            />
            <div className="mt-1 text-xs text-slate-500">
              {reviewText.length} characters (minimum 10)
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <X className="h-5 w-5 text-white" />
              </div>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || isDeleting}
              className="flex-1 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {isEditMode ? "Updating..." : "Submitting..."}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  {isEditMode ? "Update Review" : "Submit Review"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting || isDeleting}
              className="border-slate-300 hover:bg-slate-50"
            >
              <X className="h-4 w-4 mr-2" />
              {isEditMode ? "Reset" : "Clear"}
            </Button>
            {isEditMode && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={isSubmitting || isDeleting}
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
