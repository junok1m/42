import { useTranslation } from "react-i18next";
import type { RosterModel } from "../types";
import type { RosterTab } from "../hooks/useRosterState";
import RosterGrid from "./RosterGrid";

interface RosterContentProps {
  models: RosterModel[];
  activeTab: RosterTab;
  loading: boolean;
  showTomorrowReleaseMessage: boolean;
  onClearFilters: () => void;
}

const RosterContent: React.FC<RosterContentProps> = ({
  models,
  activeTab,
  loading,
  showTomorrowReleaseMessage,
  onClearFilters,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="py-16 text-center">
        <p className="mb-2 font-serif text-lg text-[#a79b7a]">
          {t("roster.loadingTitle")}
        </p>

        <p className="font-sans text-sm text-[#6f674f]">
          {t("roster.loadingSubtitle")}
        </p>
      </div>
    );
  }

  if (showTomorrowReleaseMessage) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block rounded-lg border border-[#bfa663]/30 bg-[#1a1610]/70 px-8 py-5 shadow-[0_0_30px_rgba(0,0,0,0.4)]">
          <p className="mb-1 font-serif text-lg text-[#e3d19b]">
            {t("roster.tomorrowReleaseTitle", {
              time: "7:00 PM",
            })}
          </p>

          <p className="font-sans text-sm text-[#a79b7a]">
            {t("roster.tomorrowReleaseSubtitle")}
          </p>
        </div>
      </div>
    );
  }

  if (models.length > 0) {
    return <RosterGrid models={models} activeTab={activeTab} />;
  }

  return (
    <div className="py-16 text-center">
      <p className="mb-6 font-serif text-lg text-[#a79b7a]">
        {t("roster.emptyTitle")}
      </p>

      <button
        type="button"
        onClick={onClearFilters}
        className="border border-[#bfa663]/50 px-6 py-2 font-sans text-[#e8d6a8] transition-all hover:bg-[#bfa663]/10"
      >
        {t("roster.clearFilters")}
      </button>
    </div>
  );
};

export default RosterContent;