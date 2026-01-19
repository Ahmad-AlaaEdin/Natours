import { MapPin, Calendar, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Booking } from "@/types/booking";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all duration-200">
      <div className="flex gap-4">
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-linear-to-br from-emerald-100 to-teal-100">
            {booking.tour.imageCover ? (
              <img
                src={booking.tour.imageCover}
                alt={booking.tour.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-slate-800 mb-2 truncate">
            {booking.tour.name}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>
                Booked on{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {booking.tour.duration && (
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{booking.tour.duration} days</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <DollarSign className="h-4 w-4" />
              <span>${booking.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  booking.paid
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {booking.paid ? "✓ Paid" : "Pending Payment"}
              </span>
            </div>
          </div>

          {booking.tour.startLocation?.address && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">
                {booking.tour.startLocation.address}
              </span>
            </div>
          )}
        </div>

        <div className="shrink-0 flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = `/tour/${booking.tour._id}`)}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            View Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
