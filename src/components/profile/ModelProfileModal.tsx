import { useEffect } from "react";
import { X, Share2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ModelProfileContent from "./ModelProfileContent";

interface ProfileModalLocationState {
  workingTime?: string;
}

const handleShare = async () => {
  await navigator.clipboard.writeText(window.location.href);
  toast.success("Link copied");
};

function ModelProfileModal() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as ProfileModalLocationState | null;
  const workingTime = state?.workingTime;

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Model profile"
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        p-3 sm:p-6
      "
      onClick={closeModal}
    >
      <div
        className="
          flex
          h-[calc(100dvh-24px)]
          w-full
          max-w-[430px]
          flex-col
          overflow-hidden
          rounded-[18px]
          bg-[#0b0b0b]
          sm:h-[calc(100dvh-48px)]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Plain modal header */}
        <div className="relative flex h-12 shrink-0 items-center justify-end px-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share profile"
              className="text-[#d8cfa5]/80 transition-colors hover:text-[#ead9aa]"
            >
              <Share2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close profile"
              className="text-[#d8cfa5]/80 transition-colors hover:text-[#ead9aa]"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Profile content owns its internal information scroll */}
        <div className="min-h-0 flex-1 overflow-hidden [&>section]:!h-full">
          <ModelProfileContent workingTime={workingTime} variant="modal" />
        </div>
      </div>
    </div>
  );
}

export default ModelProfileModal;
