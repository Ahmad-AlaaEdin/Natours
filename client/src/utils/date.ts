import type { Tour } from "@/types/tour";

export const formatTourDate = (tour: Tour): string => {
  if (tour.startDates && tour.startDates.length > 0) {
    const date = new Date(tour.startDates[0]);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  return "TBA";
};
