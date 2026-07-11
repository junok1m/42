import { addDays } from "../utils/rosterTime";

type RosterTab = "today" | "tomorrow";

interface RosterTabsProps {
  activeTab: RosterTab;
  shopToday: Date;
  onChange: (tab: RosterTab) => void;
}

function formatRosterDate(date: Date): string {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  })
    .format(date)
    .replace(",", "");
}

function RosterTabs({
  activeTab,
  shopToday,
  onChange,
}: RosterTabsProps) {
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
    <div className="mb-10 flex flex-col items-center px-3">
      <div className="flex w-full max-w-[520px] flex-nowrap items-center justify-center gap-4 text-center sm:gap-8">
        {tabs.map(({ id, date }) => {
          const isActive = activeTab === id;

          return (
            <div
              key={id}
              className="relative min-w-[140px] flex-1"
            >
              <button
                type="button"
                onClick={() => onChange(id)}
                className={`relative w-full font-serif text-lg tracking-wide transition-all sm:text-2xl ${
                  isActive
                    ? "bg-gradient-to-r from-[#e3d19b] to-[#bfa663] bg-clip-text font-bold text-transparent"
                    : "text-[#a79b7a] hover:text-[#d8bf7a]"
                }`}
              >
                {formatRosterDate(date)}
              </button>

              {isActive && (
                <span className="absolute -bottom-1 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8bf7a] to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RosterTabs;
