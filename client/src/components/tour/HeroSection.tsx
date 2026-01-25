import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tour } from "@/types/tour";
import { formatTourDate } from "@/utils/date";

interface HeroSectionProps {
  tour: Tour;
}

export default function HeroSection({ tour }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-[60vh]" style={{ backgroundColor: "#002623" }}>
      <img
        src={tour.imageCover}
        alt={tour.name}
        className="w-full h-full object-cover opacity-80"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 38, 35, 0.9) 0%, rgba(5, 66, 57, 0.5) 50%, transparent 100%)",
        }}
      />

      <div className="absolute top-8 left-4 sm:left-8">
        <Button
          variant="outline"
          className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 py-4 container-page w-full ">
        <div className=" sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star
                className="h-4 w-4"
                style={{ fill: "#b9a779", color: "#b9a779" }}
              />
              <span style={{ color: "#3d3a3b" }}>
                {tour.ratingsAverage.toFixed(1)}
              </span>
              <span style={{ color: "#3d3a3b", opacity: 0.7 }}>
                ({tour.ratingsQuantity} reviews)
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{tour.name}</h1>
          <p className="text-white/90 text-lg mb-4">{tour.summary}</p>
          <div className="flex flex-wrap gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" style={{ color: "#b9a779" }} />
              <span>{tour.startLocation.address || "Syria"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" style={{ color: "#b9a779" }} />
              <span>{formatTourDate(tour)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" style={{ color: "#b9a779" }} />
              <span>
                {tour.duration} {tour.duration === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" style={{ color: "#b9a779" }} />
              <span>{tour.maxGroupSize} people</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
