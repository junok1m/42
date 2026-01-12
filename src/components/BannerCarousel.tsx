import React, { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type ApiNewsMedia = {
  url?: string; // adapt if backend uses "image" instead
  image?: string;
  type?: string;
};

export type ApiNewsItem = {
  id: number;
  title?: string;
  publish_date?: string;
  is_public?: boolean;
  content?: string;
  media?: ApiNewsMedia[];
};

interface BannerCarouselProps {
  newsItems: ApiNewsItem[];
}

function pickBannerImage(item: ApiNewsItem): string | null {
  const m = item.media || [];
  const first = m.find((x) => x?.url || x?.image);
  const raw = first?.url || first?.image;
  if (!raw) return null;

  // if backend returns "/media/..." keep it
  // if it returns "media/..." ensure leading slash
  if (raw.startsWith("http")) return raw;
  return raw.startsWith("/") ? raw : `/${raw}`;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ newsItems }) => {
  const slides = useMemo(() => {
    return (newsItems || [])
      .filter((x) => x && x.is_public !== false)
      .map((item) => {
        const img = pickBannerImage(item);
        return img ? { item, img } : null;
      })
      .filter(Boolean) as Array<{ item: ApiNewsItem; img: string }>;
  }, [newsItems]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handleNavigation = (direction: "next" | "prev") => {
    setIsAutoPlaying(false);
    if (slides.length <= 1) return;

    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      handleNavigation(diff > 0 ? "next" : "prev");
    }
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative w-full bg-black">
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map(({ item, img }) => (
            <div key={item.id} className="w-full flex-shrink-0 relative">
              <Link to={`/news/${item.id}`} className="block h-full">
                <img
                  src={img}
                  alt={item.title || `News ${item.id}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => handleNavigation("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleNavigation("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all text-white"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerCarousel;
