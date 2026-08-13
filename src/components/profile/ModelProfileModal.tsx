import { useState } from "react";
import { X, Share2, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ModelProfileContent from "./ModelProfileContent";
import BookingFlow from "../booking/BookingFlow";

// BookingFlow는 아직 안 만들었으니 일단 주석 처리
// import BookingFlow from "../booking/BookingFlow";

function ModelProfileModal() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as any;

  const workingTime = state?.workingTime;
  const provider = state?.provider;

  // Profile인지 Booking인지 상태 관리
  const [viewMode, setViewMode] = useState<"profile" | "booking">("profile");

  const closeModal = () => {
    navigate(-1);
  };

  const backToProfile = () => {
    setViewMode("profile");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onClick={closeModal}
    >
      <div
        className="flex h-[calc(100dvh-24px)] w-full max-w-[430px] flex-col overflow-hidden rounded-[18px] bg-[#0b0b0b] sm:h-[calc(100dvh-48px)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex h-12 shrink-0 items-center justify-end px-3">
          <div className="flex items-center gap-3">
            {viewMode === "booking" && (
              <button
                onClick={backToProfile}
                className="mr-auto text-[#d8cfa5] hover:text-white text-sm font-medium"
              >
                ← Back
              </button>
            )}

            <a
              href="tel:+61498100011"
              className="p-1 text-[#d8cfa5]/80 hover:text-white"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => toast.success("Link copied")}
              className="p-1 text-[#d8cfa5]/80 hover:text-white"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={closeModal}
              className="p-1 text-[#d8cfa5]/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {viewMode === "profile" ? (
            <ModelProfileContent
              workingTime={workingTime}
              variant="modal"
              provider={provider}
            />
          ) : (
            <BookingFlow provider={provider} onBack={backToProfile} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ModelProfileModal;
