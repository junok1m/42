import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileGalleryProps {
  name: string;
  images: string[];
  isNew: boolean;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenLightbox: () => void;
  className?: string;
  compact?: boolean;
}

function ProfileGallery({
  className = "",
  compact = false,
  name,
  images,
  isNew,
  currentIndex,
  onIndexChange,
  onPrevious,
  onNext,
  onOpenLightbox,
}: ProfileGalleryProps) {
  const { t } = useTranslation();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartX.current;
    const deltaY = touchEndY - touchStartY.current;

    // Only treat as horizontal swipe if horizontal movement is dominant
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
      touchStartX.current = null;
      touchStartY.current = null;
      return;
    }

    if (deltaX > 0) {
      // Swipe right → previous
      onPrevious();
    } else {
      // Swipe left → next
      onNext();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className={`
        ${compact ? "space-y-2" : "space-y-6"}
        ${className}
      `}
    >
      {/* Main image */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#0b0b0b] touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {hasImages ? (
          <button
            type="button"
            onClick={onOpenLightbox}
            className="block h-full w-full"
            aria-label={`Open ${name} image full size`}
          >
            <img
              src={images[currentIndex]}
              alt={`${name} - Photo ${currentIndex + 1}`}
              className="h-full w-full cursor-zoom-in object-cover object-top pointer-events-none"
              draggable={false}
            />
          </button>
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-[#a79b7a]">
            {t("common.noImage")}
          </div>
        )}

        {isNew && (
          <span className="absolute right-3 top-3 z-20 bg-[#8b0000] px-2.5 py-1 text-[11px] font-semibold tracking-widest text-[#e8d6a8]">
            {t("badges.new")}
          </span>
        )}

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onPrevious();
              }}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-black/40 p-2 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNext();
              }}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-black/40 p-2 text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onIndexChange(index)}
              className={`
                flex-shrink-0 overflow-hidden transition-opacity
                ${compact ? "h-16 w-12" : "h-24 w-20"}
                ${
                  index === currentIndex
                    ? "opacity-100"
                    : "opacity-45 hover:opacity-80"
                }
              `}
              aria-label={`Thumbnail ${index + 1}`}
            >
              <img
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                className="h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileGallery;
