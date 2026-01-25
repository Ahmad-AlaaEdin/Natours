import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import type { Tour } from "@/types/tour";
import { formatTourDate } from "@/utils/date";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border flex flex-col h-full cursor-pointer"
      style={{
        borderColor: "#b9a779",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(66, 129, 119, 0.25)"
          : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/tour/${tour._id}`)}
    >
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={tour.imageCover}
          alt={tour.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div
          className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 38, 35, 0.9) 0%, rgba(5, 66, 57, 0.4) 50%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(66, 129, 119, 0.3) 10px, rgba(66, 129, 119, 0.3) 20px)`,
          }}
        />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg">
            <Star
              className="h-3.5 w-3.5"
              style={{ fill: "#b9a779", color: "#b9a779" }}
            />
            <span className="text-sm" style={{ color: "#3d3a3b" }}>
              {tour.ratingsAverage.toFixed(1)}
            </span>
            <span
              className="text-xs"
              style={{ color: "#3d3a3b", opacity: 0.7 }}
            >
              ({tour.ratingsQuantity})
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <div
            className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border"
            style={{ borderColor: "rgba(185, 167, 121, 0.5)" }}
          >
            <div className="text-xs" style={{ color: "#6b1f2a" }}>
              From
            </div>
            <div className="font-bold" style={{ color: "#428177" }}>
              ${tour.price}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="mb-3">
          <div
            className="text-xs mb-1 uppercase tracking-wider"
            style={{ color: "#6b1f2a" }}
          >
            {tour.summary}
          </div>
          <h3
            className="text-xl font-bold mb-2 group-hover:transition-colors duration-200"
            style={{
              color: "#3d3a3b",
              ...(isHovered && { color: "#428177" }),
            }}
          >
            {tour.name}
          </h3>
          <p
            className="text-sm line-clamp-2"
            style={{ color: "#3d3a3b", opacity: 0.8 }}
          >
            {tour.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "#3d3a3b" }}
          >
            <MapPin className="h-3.5 w-3.5" style={{ color: "#428177" }} />
            <span>{tour.startLocation.address || "Syria"}</span>
          </div>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "#3d3a3b" }}
          >
            <Calendar className="h-3.5 w-3.5" style={{ color: "#428177" }} />
            <span>{formatTourDate(tour)}</span>
          </div>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "#3d3a3b" }}
          >
            <Clock className="h-3.5 w-3.5" style={{ color: "#428177" }} />
            <span>
              {tour.duration} {tour.duration === 1 ? "day" : "days"}
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "#3d3a3b" }}
          >
            <Users className="h-3.5 w-3.5" style={{ color: "#428177" }} />
            <span>{tour.maxGroupSize} people</span>
          </div>
        </div>

        <Button
          className="w-full text-white shadow-md group-hover:shadow-lg transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #428177 0%, #054239 100%)",
            boxShadow: isHovered
              ? "0 10px 25px -5px rgba(66, 129, 119, 0.4)"
              : undefined,
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/tour/${tour._id}`);
          }}
        >
          <span>Explore Tour</span>
          <ArrowRight
            className={`h-4 w-4 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
          />
        </Button>
      </div>
    </article>
  );
}
