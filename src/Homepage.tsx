import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import Roster from "./components/Roster";
import type { RosterModel, Service } from "./types"; // adjust path if needed

const PROVIDERS_URL = "/api/providers/";
const ROSTER_TODAY_URL = "/api/roster/today/";
const ROSTER_TOMORROW_URL = "/api/roster/tomorrow/";

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

  // ✅ service flags (from your provider API)
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

  // 1) profile:true wins
  const profileImg = imgs.find((x) => x.profile === true)?.image;
  if (profileImg) return profileImg;

  // 2) fallback to highest priority
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
    ["BBBJ", p.service_bbbj],
    ["CIM", p.service_cim],
    ["DFK", p.service_dfk],
    ["69", p.service_69],
    ["Rimming", p.service_rimming],
    ["Filming", p.service_filming],
    ["CBJ", p.service_cbj],
    ["Massage", p.service_massage],
    ["GFE", p.service_gfe],
    ["PSE", p.service_pse],
    ["Double", p.service_double],
    ["Shower Together", p.service_shower],
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

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        setLoading(true);
        setApiError(null);

        const [provRes, todayRes, tomorrowRes] = await Promise.all([
          fetch(PROVIDERS_URL),
          fetch(ROSTER_TODAY_URL),
          fetch(ROSTER_TOMORROW_URL),
        ]);

        if (!provRes.ok) throw new Error(`providers fetch failed: ${provRes.status}`);
        if (!todayRes.ok) throw new Error(`today roster fetch failed: ${todayRes.status}`);
        if (!tomorrowRes.ok) throw new Error(`tomorrow roster fetch failed: ${tomorrowRes.status}`);

        const provJson = (await provRes.json()) as ApiProvider[];
        const todayJson = (await todayRes.json()) as ApiRosterEntry[];
        const tomorrowJson = (await tomorrowRes.json()) as ApiRosterEntry[];

        if (!cancelled) {
          setProviders(Array.isArray(provJson) ? provJson : []);
          setApiToday(Array.isArray(todayJson) ? todayJson : []);
          setApiTomorrow(Array.isArray(tomorrowJson) ? tomorrowJson : []);
          setLoading(false);
        }
      } catch (e: any) {
        if (!cancelled) {
          setApiError(e?.message || "API error");
          setProviders([]);
          setApiToday([]);
          setApiTomorrow([]);
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

      <Roster rosterToday={rosterToday} rosterTomorrow={rosterTomorrow} loading={loading} />
    </Layout>
  );
};

export default Homepage;
