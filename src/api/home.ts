import type { ApiNewsItem, ApiProvider, ApiRosterEntry } from "../types/api";

const NEWS_URL = "/api/proxy?path=news/";
const PROVIDERS_URL = "/api/proxy?path=providers/";
const ROSTER_TODAY_URL = "/api/proxy?path=roster/today/";
const ROSTER_TOMORROW_URL = "/api/proxy?path=roster/tomorrow/";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} fetch failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchHomeData() {
  const [providers, today, tomorrow] = await Promise.all([
    fetchJson<ApiProvider[]>(PROVIDERS_URL),
    fetchJson<ApiRosterEntry[]>(ROSTER_TODAY_URL),
    fetchJson<ApiRosterEntry[]>(ROSTER_TOMORROW_URL),
  ]);

  let news: ApiNewsItem[] = [];

  try {
    news = await fetchJson<ApiNewsItem[]>(NEWS_URL);
  } catch {
    // 뉴스가 실패해도 로스터는 보여준다.
  }

  return {
    providers: Array.isArray(providers) ? providers : [],
    today: Array.isArray(today) ? today : [],
    tomorrow: Array.isArray(tomorrow) ? tomorrow : [],
    news: Array.isArray(news)
      ? news.filter((item) => item.is_public !== false).slice(0, 3)
      : [],
  };
}
