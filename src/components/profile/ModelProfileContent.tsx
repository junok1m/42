// src/components/profile/ModelProfileContent.tsx

import { useEffect, useMemo, useState } from "react";
import { Phone, ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useModelProfile } from "../../hooks/useModelProfile";
import ProfileGallery from "./ProfileGallery";
import ProfileInfo from "./ProfileInfo";
import ProfileLightbox from "./ProfileLightbox";

interface ModelProfileContentProps {
  workingTime?: string;
  variant?: "page" | "modal";
  provider?: any;
  onBookNow?: () => void;
}

function ModelProfileContent({
  workingTime,
  variant = "page",
  onBookNow
}: ModelProfileContentProps) {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const { loading, apiError, model } = useModelProfile(slug);
  const [hasScrolledProfile, setHasScrolledProfile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const imageArray = useMemo(() => {
    if (!model) {
      return [];
    }

    if (model.images && model.images.length > 0) {
      return model.images;
    }

    if (model.profileImage) {
      return [model.profileImage];
    }

    return [];
  }, [model]);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
  }, [model?.id]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen]);

  const nextImage = () => {
    if (imageArray.length <= 1) {
      return;
    }

    setCurrentImageIndex((previousIndex) =>
      previousIndex === imageArray.length - 1 ? 0 : previousIndex + 1
    );
  };

  const previousImage = () => {
    if (imageArray.length <= 1) {
      return;
    }

    setCurrentImageIndex((previousIndex) =>
      previousIndex === 0 ? imageArray.length - 1 : previousIndex - 1
    );
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, imageArray.length]);

  if (loading) {
    return (
      <div className="py-20 text-center font-serif text-xl text-[#bfa663]">
        {t("common.loading")}
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="mx-4 mt-6 border border-red-500/40 bg-red-900/20 p-3 text-sm text-red-300">
        API error: {apiError}
      </div>
    );
  }

  if (!model) {
    return (
      <div className="py-20 text-center font-serif text-xl text-[#bfa663]">
        {t("common.notFound", "Girl not found 😢")}
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <section className="flex h-full min-h-0 flex-col bg-[#0b0b0b]">
        {/* Fixed gallery */}
        <div className="shrink-0 px-3 pb-2 pt-1">
          <ProfileGallery
            name={model.name}
            images={imageArray}
            isNew={model.isNew}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            onPrevious={previousImage}
            onNext={nextImage}
            onOpenLightbox={() => setIsLightboxOpen(true)}
            className="mx-auto w-[90%] max-w-[320px]"
            compact
          />
        </div>

        {/* Only this area scrolls */}
        <div className="relative min-h-0 flex-1">
          <div
            onScroll={(event) => {
              setHasScrolledProfile(event.currentTarget.scrollTop > 16);
            }}
            className="
      h-full overflow-y-auto overscroll-contain
      px-5 pb-10 pt-3
    "
          >
            <ProfileInfo
              model={model}
              workingTime={workingTime}
              onBookNow={onBookNow || undefined}
            />
          </div>

          {!hasScrolledProfile && (
            <div
              className="
        pointer-events-none absolute inset-x-0 bottom-0
        flex justify-center
        bg-gradient-to-t
        from-[#0b0b0b]
        via-[#0b0b0b]/85
        to-transparent
        pb-2 pt-10
      "
            >
              <ChevronDown
                className="
          h-5 w-5
          animate-bounce
          text-[#bfa663]/70
        "
              />
            </div>
          )}
        </div>

        <ProfileLightbox
          open={isLightboxOpen}
          name={model.name}
          images={imageArray}
          currentIndex={currentImageIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={previousImage}
          onNext={nextImage}
        />
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent pb-28 lg:pb-0">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProfileGallery
            name={model.name}
            images={imageArray}
            isNew={model.isNew}
            currentIndex={currentImageIndex}
            onIndexChange={setCurrentImageIndex}
            onPrevious={previousImage}
            onNext={nextImage}
            onOpenLightbox={() => setIsLightboxOpen(true)}
          />

          <ProfileInfo model={model} workingTime={workingTime} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#bfa663]/40 bg-[#0b0b0b] p-4 shadow-[0_-4px_20px_rgba(191,166,99,0.2)] lg:hidden">
        <a
          href="tel:+61498100011"
          className="flex w-full items-center justify-center gap-3 border border-[#bfa663]/50 bg-[#14120f]/80 px-6 py-4 font-serif font-bold tracking-wide text-[#e8d6a8]"
        >
          <Phone className="h-5 w-5" />
          {t("common.bookNow")}
        </a>
      </div>

      <ProfileLightbox
        open={isLightboxOpen}
        name={model.name}
        images={imageArray}
        currentIndex={currentImageIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrevious={previousImage}
        onNext={nextImage}
      />
    </section>
  );
}

export default ModelProfileContent;
