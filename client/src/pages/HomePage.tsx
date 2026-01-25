import { useState, useEffect } from "react";
import TourCard from "@/components/TourCard";
import type { Tour } from "@/types/tour";
import { getTours } from "@/services/toursService";
import PageHero from "@/components/home/PageHero";
import TourLoadingSkeleton from "@/components/home/TourLoadingSkeleton";
import ToursEmptyState from "@/components/home/ToursEmptyState";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  const [sortOption, setSortOption] = useState<string>("price-asc");
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      const tours = await getTours();
      if (tours.length > 0) {
        setTours(tours);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const sortedTours = [...tours].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "ratingsAverage-desc":
        return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
      case "ratingsAverage-asc":
        return (a.ratingsAverage || 0) - (b.ratingsAverage || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHero />

      <FilterBar sortOption={sortOption} onSortChange={setSortOption} />

      <div className="min-h-[600px] py-4">
        {loading ? (
          <TourLoadingSkeleton />
        ) : sortedTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-4">
            {sortedTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        ) : (
          <ToursEmptyState />
        )}
      </div>

      <div className="mt-16 text-center">
        <div
          className="inline-flex items-center gap-3 text-sm"
          style={{ color: "#3d3a3b", opacity: 0.6 }}
        >
          <div
            className="h-px w-12"
            style={{ backgroundColor: "#b9a779" }}
          ></div>
          <span>Preserving Syria's Heritage</span>
          <div
            className="h-px w-12"
            style={{ backgroundColor: "#b9a779" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
