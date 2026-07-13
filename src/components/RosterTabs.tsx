// src/components/RosterTabs.tsx
import { addDays } from "../utils/rosterTime";

export type RosterTab = "today" | "tomorrow";

interface RosterTabsProps {
  activeTab: RosterTab;
  shopToday: Date;
  onChange: (tab: RosterTab) => void;
}

function formatRosterDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function RosterTabs({ activeTab, shopToday, onChange }: RosterTabsProps) {
  const tabs: Array<{
    id: RosterTab;
    date: Date;
  }> = [
    {
      id: "today",
      date: shopToday,
    },
    {
      id: "tomorrow",
      date: addDays(shopToday, 1),
    },
  ];

  return (
    <div className="flex shrink-0 items-center">
      {tabs.map(({ id, date }) => {
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={isActive}
            className={`shrink-0 border px-3 py-2 text-sm font-sans tracking-wide transition-all first:border-r-0 ${
              isActive
                ? "border-[#bfa663] bg-[#bfa663]/15 text-[#f1e3b8] shadow-[0_0_14px_rgba(191,166,99,0.28)]"
                : "border-[#bfa663]/40 bg-[#14120f]/80 text-[#a79b7a] hover:border-[#d9c07c] hover:text-[#e8d6a8]"
            }`}
          >
            {formatRosterDate(date)}
          </button>
        );
      })}
    </div>
  );
}

export default RosterTabs;
