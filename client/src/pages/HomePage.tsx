import { useState, useEffect } from "react";
import TourCard from "@/components/TourCard";
import type { Tour } from "@/types/tour";
import { getTours } from "@/services/toursService";
import PageHero from "@/components/home/PageHero";
import TourLoadingSkeleton from "@/components/home/TourLoadingSkeleton";
import ToursEmptyState from "@/components/home/ToursEmptyState";
export default function HomePage() {
  const [selectedFilter] = useState<string>("All Tours");
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

  const getBackendDifficulty = (
    displayDifficulty: string,
  ): Tour["difficulty"] | null => {
    const map: Record<string, Tour["difficulty"]> = {
      Easy: "easy",
      Medium: "medium",
      Difficult: "difficult",
    };
    return map[displayDifficulty] || null;
  };

  const filteredTours =
    selectedFilter === "All Tours"
      ? tours
      : tours.filter((tour) => {
          const backendDifficulty = getBackendDifficulty(selectedFilter);
          return backendDifficulty && tour.difficulty === backendDifficulty;
        });

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHero />

      {/* <FilterBar
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      /> */}
      <div className="min-h-[600px]">
        {loading ? (
          <TourLoadingSkeleton />
        ) : filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTours.map((tour) => (
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
    </main>
  );
}
