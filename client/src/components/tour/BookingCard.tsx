import { useState } from "react";
import { Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/types/tour";

interface BookingCardProps {
  tour: Tour;
  onBook: () => void;
  bookingLoading: boolean;
}

export default function BookingCard({
  tour,
  onBook,
  bookingLoading,
}: BookingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border"
      style={{ borderColor: "#b9a779" }}
    >
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span style={{ color: "#3d3a3b", opacity: 0.7 }}>From</span>
          <span className="text-3xl font-bold" style={{ color: "#428177" }}>
            ${tour.price}
          </span>
          <span style={{ color: "#3d3a3b", opacity: 0.7 }}>per person</span>
        </div>
        {tour.priceDiscount && tour.priceDiscount > 0 && (
          <p className="text-sm" style={{ color: "#6b1f2a" }}>
            Save ${tour.priceDiscount}!
          </p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <Button
          className="w-full text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #428177 0%, #054239 100%)",
          }}
          size="lg"
          onClick={onBook}
          disabled={bookingLoading}
        >
          {bookingLoading ? "Processing..." : "Book Now"}
        </Button>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full"
            style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-4 w-4 mr-2`}
              style={
                isFavorite
                  ? { fill: "#6b1f2a", color: "#6b1f2a" }
                  : { color: "#3d3a3b" }
              }
            />
            Save
          </Button>
          <Button
            variant="outline"
            className="w-full"
            style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="pt-6 border-t" style={{ borderColor: "#b9a779" }}>
        <h3 className="font-semibold mb-3" style={{ color: "#3d3a3b" }}>
          Need Help?
        </h3>
        <p className="text-sm mb-4" style={{ color: "#3d3a3b", opacity: 0.7 }}>
          Our travel experts are here to help you plan your perfect adventure.
        </p>
        <Button
          variant="outline"
          className="w-full"
          style={{ borderColor: "#b9a779", color: "#3d3a3b" }}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}
