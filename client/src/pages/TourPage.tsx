import { getTourById } from "@/services/toursService";
import { bookTour } from "@/services/bookingService";
import type { Tour, DifficultyDisplay } from "@/types/tour";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { MapPin, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourMap from "@/components/TourMap";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Reviews from "@/components/Reviews";
import HeroSection from "@/components/tour/HeroSection";
import BookingCard from "@/components/tour/BookingCard";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

function LazyImage({
  src,
  alt,
  className = "",
  placeholderColor = "#f0f0f0",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading when image is 50px away from viewport
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
        />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

interface ThumbnailGalleryProps {
  images: string[];
  tourName: string;
}

function ThumbnailGallery({ images, tourName }: ThumbnailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8" style={{ color: "#3d3a3b" }}>
        Tour Gallery
      </h2>

      <div className="overflow-hidden rounded-xl mb-4" ref={mainViewportRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div
                className="relative w-full aspect-video rounded-xl overflow-hidden "
                style={{
                  borderColor: "#b9a779",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <LazyImage
                  src={image}
                  alt={`${tourName} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  placeholderColor="rgba(66, 129, 119, 0.1)"
                />

                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: "rgba(66, 129, 119, 0.9)",
                    color: "#ffffff",
                  }}
                >
                  {index + 1} / {images.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={thumbViewportRef}>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className="flex-[0_0_20%] min-w-0 sm:flex-[0_0_15%] lg:flex-[0_0_12%] relative group cursor-pointer transition-all duration-300"
              type="button"
            >
              <div
                className={`relative w-full aspect-video rounded-lg overflow-hidden border-3 transition-all duration-300 ${
                  index === selectedIndex
                    ? " shadow-xl"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{}}
              >
                <LazyImage
                  src={image}
                  alt={`${tourName} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  placeholderColor="rgba(66, 129, 119, 0.1)"
                />
                {index !== selectedIndex && (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TourPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      if (id) {
        const tour = await getTourById(id);
        if (tour) {
          setTour(tour);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };
    fetchTour();
  }, [id]);

  const getDifficultyDisplay = (
    difficulty: Tour["difficulty"],
  ): DifficultyDisplay => {
    const map: Record<Tour["difficulty"], DifficultyDisplay> = {
      easy: "Easy",
      medium: "Medium",
      difficult: "Difficult",
    };
    return map[difficulty];
  };

  const getDifficultyColor = (difficulty: DifficultyDisplay) => {
    switch (difficulty) {
      case "Easy":
        return { bg: "#428177", text: "#ffffff", border: "#054239" };
      case "Medium":
        return { bg: "#b9a779", text: "#ffffff", border: "#988561" };
      case "Difficult":
        return { bg: "#6b1f2a", text: "#ffffff", border: "#4a151e" };
      default:
        return { bg: "#3d3a3b", text: "#ffffff", border: "#161616" };
    }
  };

  const getFormattedDate = (tour: Tour) => {
    if (tour.startDates && tour.startDates.length > 0) {
      const date = new Date(tour.startDates[0]);
      return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }
    return "TBA";
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a tour", {
        description: "You need to be logged in to make a booking.",
      });
      navigate("/login");
      return;
    }

    if (!id) {
      toast.error("Invalid tour", {
        description: "Tour ID is missing.",
      });
      return;
    }

    try {
      setBookingLoading(true);
      toast.loading("Redirecting to checkout...");
      await bookTour(id);
    } catch (error: any) {
      toast.dismiss();
      toast.error("Booking failed", {
        description:
          error.message || "Failed to initiate booking. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: "#428177", borderTopColor: "transparent" }}
          />
          <p style={{ color: "#3d3a3b" }}>Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center shrink">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#3d3a3b" }}>
          Tour not found
        </h1>
        <p className="mb-6" style={{ color: "#3d3a3b", opacity: 0.7 }}>
          The tour you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => navigate("/")}
          style={{
            background: "linear-gradient(135deg, #428177 0%, #054239 100%)",
            color: "#ffffff",
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tours
        </Button>
      </div>
    );
  }

  const difficultyDisplay = getDifficultyDisplay(tour.difficulty);
  const diffColor = getDifficultyColor(difficultyDisplay);

  return (
    <div className="min-h-screen pb-16">
      <HeroSection
        tour={tour}
        difficultyDisplay={difficultyDisplay}
        diffColor={diffColor}
        getFormattedDate={getFormattedDate}
      />

      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-24 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3  -mt-16 relative">
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-2xl  sm:p-8 mb-8 "
              style={{ borderColor: "#b9a779" }}
            >
              <div className="space-y-8">
                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#3d3a3b" }}
                  >
                    About This Tour
                  </h2>
                  <p
                    className="mb-6 text-base leading-relaxed"
                    style={{ color: "#3d3a3b", opacity: 0.8 }}
                  >
                    {tour.description || tour.summary}
                  </p>

                  {tour.locations && tour.locations.length > 0 && (
                    <>
                      <h3
                        className="text-xl font-semibold mb-3"
                        style={{ color: "#3d3a3b" }}
                      >
                        Tour Highlights
                      </h3>
                      <ul className="grid grid-cols-1 gap-3">
                        {tour.locations.map((location, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check
                              className="h-5 w-5 shrink-0 mt-0.5"
                              style={{ color: "#428177" }}
                            />
                            <span style={{ color: "#3d3a3b", opacity: 0.8 }}>
                              {location.description}
                              {location.day && ` (Day ${location.day})`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {tour.images && tour.images.length > 0 && (
                  <ThumbnailGallery images={tour.images} tourName={tour.name} />
                )}

                {tour.locations && tour.locations.length > 0 && (
                  <div>
                    <h2
                      className="text-2xl font-bold mb-4"
                      style={{ color: "#3d3a3b" }}
                    >
                      Tour Locations
                    </h2>
                    <div className="space-y-6">
                      {tour.locations.map((location, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="shrink-0">
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                              style={{
                                background:
                                  "linear-gradient(135deg, #428177 0%, #054239 100%)",
                              }}
                            >
                              {location.day || index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3
                              className="text-lg font-semibold mb-2"
                              style={{ color: "#3d3a3b" }}
                            >
                              {location.description || `Stop ${index + 1}`}
                            </h3>
                            {location.address && (
                              <p
                                className="flex items-center gap-2"
                                style={{ color: "#3d3a3b", opacity: 0.7 }}
                              >
                                <MapPin
                                  className="h-4 w-4"
                                  style={{ color: "#428177" }}
                                />
                                {location.address}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: "#3d3a3b" }}
                  >
                    Tour Map
                  </h2>
                  <p
                    className="mb-4 text-sm"
                    style={{ color: "#3d3a3b", opacity: 0.7 }}
                  >
                    Explore the route and locations for this tour. Click on the
                    markers to see more details about each stop.
                  </p>
                  <TourMap
                    locations={tour.locations || []}
                    tourName={tour.name}
                  />
                </div>
              </div>
              <Reviews tourId={id} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <BookingCard
              tour={tour}
              onBook={handleBooking}
              bookingLoading={bookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
