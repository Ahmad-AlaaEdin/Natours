import { useState } from "react";
import type { ReviewWithUser } from "@/types/review";
import { Star, Edit, Trash2, Save, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { updateReview, deleteReview } from "@/services/reviewsService";
import { Button } from "@/components/ui/button";
import type { CreateReviewData } from "@/types/review";

interface ReviewProps {
  review: ReviewWithUser;
  onReviewUpdated?: () => void;
  onReviewDeleted?: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 transition-colors ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function EditableStarRating({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) {
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= (hoveredRating || rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating} / 5
      </span>
    </div>
  );
}

export default function Review({
  review,
  onReviewUpdated,
  onReviewDeleted,
}: ReviewProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [editedText, setEditedText] = useState(review.review);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const isOwnReview =
    user && typeof review.user === "object" && review.user._id === user._id;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedRating(review.rating);
    setEditedText(review.review);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedRating(review.rating);
    setEditedText(review.review);
    setError("");
  };

  const handleSave = async () => {
    if (editedText.trim().length < 10) {
      setError("Review must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const reviewData: Partial<CreateReviewData> = {
      review: editedText,
      rating: editedRating,
    };

    const result = await updateReview(review._id, reviewData);

    if (result.success) {
      setIsEditing(false);
      if (onReviewUpdated) {
        onReviewUpdated();
      }
    } else {
      setError(result.error || "Failed to update review");
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");

    const result = await deleteReview(review._id);

    if (result.success) {
      if (onReviewDeleted) {
        onReviewDeleted();
      }
    } else {
      setError(result.error || "Failed to delete review");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        <div className="shrink-0">
          {typeof review.user === "object" && review.user.photo ? (
            <img
              src={review.user.photo}
              alt={review.user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center ring-2 ring-gray-100">
              <span className="text-white font-semibold text-sm">
                {typeof review.user === "object" &&
                  getUserInitials(review.user.name)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                {typeof review.user === "object" && review.user.name}
              </h3>
              {isEditing ? (
                <EditableStarRating
                  rating={editedRating}
                  onRatingChange={setEditedRating}
                />
              ) : (
                <StarRating rating={review.rating} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <time className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </time>
              {isOwnReview && !isEditing && !isDeleting && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="h-8 px-2 border-gray-300 hover:bg-gray-50"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="h-8 px-2 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    {isDeleting ? (
                      <div className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-3 space-y-3">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
                rows={3}
                placeholder="Share your experience..."
              />
              <div className="text-xs text-gray-500">
                {editedText.length} characters (minimum 10)
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <X className="h-4 w-4 text-red-600 shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5 mr-2" />
                      Save
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <X className="h-3.5 w-3.5 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed mt-3">
              {review.review}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
