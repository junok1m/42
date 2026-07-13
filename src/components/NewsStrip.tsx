// src/components/NewsStrip.tsx

import type { ApiNewsItem } from "../types/api";

interface NewsStripProps {
  items: ApiNewsItem[];
}

function NewsStrip({ items }: NewsStripProps) {
  const latest = items.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-6">
          <div className="w-20 shrink-0">
            <p className="
text-[11px]
uppercase
tracking-[0.28em]
text-[#d9c07c]
font-medium
drop-shadow-[0_0_3px_rgba(191,166,99,0.25)]
">
              Latest
            </p>
          </div>

          <div className="flex-1">
            {latest.map((item, index) => (
              <div
                key={item.id}
                className={`py-2 ${
                  index !== latest.length - 1
                    ? "border-b border-[#bfa663]/10"
                    : ""
                }`}
              >
                <p className="text-sm text-[#e8d6a8]/90">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}

export default NewsStrip;