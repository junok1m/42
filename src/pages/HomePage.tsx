import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Roster from "../components/Roster";
import type { RosterModel } from "../types";
import type { ApiProvider, ApiRosterEntry, ApiNewsItem } from "../types/api";
import {
  pickThumbnailFromProvider,
  hasAnyRealPhoto,
  servicesFromProvider,
} from "../utils/provider";
import { formatWorkingTime } from "../utils/time";
import { fetchHomeData } from "../api/home";

function buildRoster(
  entries: ApiRosterEntry[],
  providerById: Map<number, ApiProvider>
): RosterModel[] {
  return entries.flatMap((entry) => {
    const provider = providerById.get(entry.provider_id);

    if (!provider) return [];

    return [
      {
        id: provider.id,
        slug: provider.slug,
        name: provider.provider_name,
        nationality: provider.country || "Unknown",
        image: pickThumbnailFromProvider(provider),
        profileLink: `/profile/${provider.slug}`,
        startTime: entry.start_time,
        endTime: entry.end_time,
        workingTime: formatWorkingTime(entry.start_time, entry.end_time),
        isNew: provider.is_new === true,
        isRealPhoto: hasAnyRealPhoto(provider),
        services: servicesFromProvider(provider),
      },
    ];
  });
}

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [apiToday, setApiToday] = useState<ApiRosterEntry[]>([]);
  const [apiTomorrow, setApiTomorrow] = useState<ApiRosterEntry[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [news, setNews] = useState<ApiNewsItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        setLoading(true);
        setApiError(null);

        const data = await fetchHomeData();

        if (!cancelled) {
          setProviders(data.providers);
          setApiToday(data.today);
          setApiTomorrow(data.tomorrow);
          setNews(data.news);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "API error";

          setApiError(message);
          setProviders([]);
          setApiToday([]);
          setApiTomorrow([]);
          setNews([]);
          setLoading(false);
        }
      }
    }

    loadAll();

    return () => {
      cancelled = true;
    };
  }, []);

  const providerById = useMemo(() => {
    const map = new Map<number, ApiProvider>();
    for (const provider of providers) {
      map.set(provider.id, provider);
    }
    return map;
  }, [providers]);

  const rosterToday = useMemo(
    () => buildRoster(apiToday, providerById),
    [apiToday, providerById]
  );

  const rosterTomorrow = useMemo(
    () => buildRoster(apiTomorrow, providerById),
    [apiTomorrow, providerById]
  );

  return (
    <Layout>
      {apiError && (
        <div className="mx-6 mt-6 p-3 border border-red-500/40 bg-red-900/20 text-red-300 text-sm">
          API error: {apiError}
        </div>
      )}

      {news.length > 0 && (
        <section className="mx-6 mt-6 mb-0 border border-[#bfa663]/30 bg-[#14120f]/50 p-4">
          <p className="mb-2 font-serif text-md uppercase tracking-[0.2em] text-[#bfa663]">
            News
          </p>
          <div className="space-y-1">
            {news.map((item) => (
              <div key={item.id} className="text-xl text-[#e8d6a8]/90">
                {item.title || "Untitled news"}
              </div>
            ))}
          </div>
        </section>
      )}

      <Roster
        rosterToday={rosterToday}
        rosterTomorrow={rosterTomorrow}
        loading={loading}
      />
    </Layout>
  );
};

export default HomePage;
