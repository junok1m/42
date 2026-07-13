import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProfileLightboxProps {
  open: boolean;
  name: string;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

function ProfileLightbox({
  open,
  name,
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}: ProfileLightboxProps) {
  if (!open || images.length === 0) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} photo viewer`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 z-10 bg-black/60 p-2 text-white"
        aria-label="Close full image"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrevious();
            }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-[#1a1813]/80 p-3 text-[#e8d6a8]"
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
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-[#1a1813]/80 p-3 text-[#e8d6a8]"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <img
        src={images[currentIndex]}
        alt={`${name} - Full photo ${currentIndex + 1}`}
        className="max-h-[90dvh] max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-widest text-[#e8d6a8]">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

export default ProfileLightbox;