import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import Roster from "./components/Roster";
import type { RosterModel, Service } from "./types";

const NEWS_BASE = "/api/news/";
const PROVIDERS_URL = "/api/providers/";
const ROSTER_TODAY_URL = "/api/roster/today/";
const ROSTER_TOMORROW_URL = "/api/roster/tomorrow/";

type ApiNewsItem = {
  id: number;
  title?: string;
  publish_date?: string;
  is_public?: boolean;
};

type ApiRosterEntry = {
  provider_id: number;
  provider_name: string;
  start_time: string;
  end_time: string;
};

type ApiProviderImage = {
  image: string;
  priority?: number;
  profile?: boolean;
  real?: boolean;
};

type ApiProvider = {
  id: number;
  slug: string;
  provider_name: string;
  country?: string | null;
  images?: ApiProviderImage[];
  is_new?: boolean;

  service_bbbj?: boolean;
  service_cim?: boolean;
  service_dfk?: boolean;
  service_69?: boolean;
  service_rimming?: boolean;
  service_filming?: boolean;
  service_cbj?: boolean;
  service_massage?: boolean;
  service_gfe?: boolean;
  service_pse?: boolean;
  service_double?: boolean;
  service_shower?: boolean;
};

function pickThumbnailFromProvider(p: ApiProvider): string {
  const imgs = (p.images || []).filter((x) => x?.image);

  const profileImg = imgs.find((x) => x.profile === true)?.image;
  if (profileImg) return profileImg;

  const best = imgs
    .slice()
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0]?.image;

  return best || "";
}

function hasAnyRealPhoto(p: ApiProvider): boolean {
  return (p.images || []).some((img) => img.real === true);
}

function servicesFromProvider(p: ApiProvider): Service[] {
  const flags: Array<[string, boolean | undefined]> = [
    ["bbbj", p.service_bbbj],
    ["cim", p.service_cim],
    ["dfk", p.service_dfk],
    ["69", p.service_69],
    ["rimming", p.service_rimming],
    ["filming", p.service_filming],
    ["cbj", p.service_cbj],
    ["massage", p.service_massage],
    ["gfe", p.service_gfe],
    ["pse", p.service_pse],
    ["double", p.service_double],
    ["shower", p.service_shower],
  ];

  return flags.map(([name, v]) => ({ name, available: v === true }));
}

function formatTimeLabel(hhmmss: string) {
  const [hhStr, mmStr] = hhmmss.split(":");
  let hh = Number(hhStr);
  const mm = Number(mmStr);
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  if (hh === 0) hh = 12;
  return `${hh}:${String(mm).padStart(2, "0")} ${ampm}`;
}

function formatWorkingTime(start: string, end: string) {
  return `${formatTimeLabel(start)} - ${formatTimeLabel(end)}`;
}

const Homepage = () => {
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

        const [provRes, todayRes, tomorrowRes, newsRes] = await Promise.all([
          fetch(PROVIDERS_URL),
          fetch(ROSTER_TODAY_URL),
          fetch(ROSTER_TOMORROW_URL),
          fetch(NEWS_BASE),
        ]);

        if (!provRes.ok) throw new Error(`providers fetch failed: ${provRes.status}`);
        if (!todayRes.ok) throw new Error(`today roster fetch failed: ${todayRes.status}`);
        if (!tomorrowRes.ok) throw new Error(`tomorrow roster fetch failed: ${tomorrowRes.status}`);

        const provJson = (await provRes.json()) as ApiProvider[];
        const todayJson = (await todayRes.json()) as ApiRosterEntry[];
        const tomorrowJson = (await tomorrowRes.json()) as ApiRosterEntry[];

        const newsJson = newsRes.ok
          ? ((await newsRes.json()) as ApiNewsItem[])
          : [];

        if (!cancelled) {
          setProviders(Array.isArray(provJson) ? provJson : []);
          setApiToday(Array.isArray(todayJson) ? todayJson : []);
          setApiTomorrow(Array.isArray(tomorrowJson) ? tomorrowJson : []);

          setNews(
            Array.isArray(newsJson)
              ? newsJson.filter((x) => x.is_public !== false).slice(0, 3)
              : []
          );

          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setApiError(e?.message || "API error");
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
    for (const p of providers) map.set(p.id, p);
    return map;
  }, [providers]);

  const rosterToday: RosterModel[] = useMemo(() => {
    return apiToday
      .map((entry) => {
        const p = providerById.get(entry.provider_id);
        if (!p) return null;

        return {
          id: p.id,
          slug: p.slug,
          name: p.provider_name,
          nationality: p.country || "Unknown",
          image: pickThumbnailFromProvider(p),
          profileLink: `/profile/${p.slug}`,
          startTime: entry.start_time,
          endTime: entry.end_time,
          workingTime: formatWorkingTime(entry.start_time, entry.end_time),
          isNew: p.is_new === true,
          isRealPhoto: hasAnyRealPhoto(p),
          services: servicesFromProvider(p),
        };
      })
      .filter(Boolean) as RosterModel[];
  }, [apiToday, providerById]);

  const rosterTomorrow: RosterModel[] = useMemo(() => {
    return apiTomorrow
      .map((entry) => {
        const p = providerById.get(entry.provider_id);
        if (!p) return null;

        return {
          id: p.id,
          slug: p.slug,
          name: p.provider_name,
          nationality: p.country || "Unknown",
          image: pickThumbnailFromProvider(p),
          profileLink: `/profile/${p.slug}`,
          startTime: entry.start_time,
          endTime: entry.end_time,
          workingTime: formatWorkingTime(entry.start_time, entry.end_time),
          isNew: p.is_new === true,
          isRealPhoto: hasAnyRealPhoto(p),
          services: servicesFromProvider(p),
        };
      })
      .filter(Boolean) as RosterModel[];
  }, [apiTomorrow, providerById]);

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
  <div
    key={item.id}
    className="text-xl text-[#e8d6a8]/90"
    dangerouslySetInnerHTML={{
      __html: item.title || "Untitled news",
    }}
  />
))}
          </div>
        </section>
      )}

      <Roster rosterToday={rosterToday} rosterTomorrow={rosterTomorrow} loading={loading} />
    </Layout>
  );
};

export default Homepage;