import { useEffect, useMemo, useState } from "react";
import type { RosterModel } from "../types";
import type {
  ApiProvider,
  ApiRosterEntry,
  ApiNewsItem,
} from "../types/api";
import { fetchHomeData } from "../api/home";
import {
  pickThumbnailFromProvider,
  hasAnyRealPhoto,
  servicesFromProvider,
} from "../utils/provider";
import { formatWorkingTime } from "../utils/time";

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
        workingTime: formatWorkingTime(
          entry.start_time,
          entry.end_time
        ),
        isNew: provider.is_new === true,
        isRealPhoto: hasAnyRealPhoto(provider),
        services: servicesFromProvider(provider),
      },
    ];
  });
}

export function useHomeData() {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<ApiProvider[]>([]);
  const [todayEntries, setTodayEntries] = useState<ApiRosterEntry[]>([]);
  const [tomorrowEntries, setTomorrowEntries] = useState<ApiRosterEntry[]>([]);
  const [news, setNews] = useState<ApiNewsItem[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHomeData() {
      try {
        setLoading(true);
        setApiError(null);

        const data = await fetchHomeData();

        if (cancelled) return;

        setProviders(data.providers);
        setTodayEntries(data.today);
        setTomorrowEntries(data.tomorrow);
        setNews(data.news);
      } catch (error: unknown) {
        if (cancelled) return;

        const message =
          error instanceof Error ? error.message : "API error";

        setApiError(message);
        setProviders([]);
        setTodayEntries([]);
        setTomorrowEntries([]);
        setNews([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      cancelled = true;
    };
  }, []);

  const providerById = useMemo(() => {
    return new Map(
      providers.map((provider) => [provider.id, provider])
    );
  }, [providers]);

  const rosterToday = useMemo(
    () => buildRoster(todayEntries, providerById),
    [todayEntries, providerById]
  );

  const rosterTomorrow = useMemo(
    () => buildRoster(tomorrowEntries, providerById),
    [tomorrowEntries, providerById]
  );

  return {
    loading,
    apiError,
    news,
    rosterToday,
    rosterTomorrow,
  };
}