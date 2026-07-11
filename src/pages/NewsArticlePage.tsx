import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";

type ApiNewsMedia = {
  url?: string;
  image?: string;
  type?: string; // "image" / "video" etc (optional)
};

type ApiNewsItem = {
  id: number;
  title?: string;
  publish_date?: string;
  is_public?: boolean;
  content?: string;
  media?: ApiNewsMedia[];
};

const NEWS_BASE = "/api/gdfkzjgujjaz/news"; // list endpoint
// detail is usually `${NEWS_BASE}/${id}` -> /api/.../news/1

function normalizeMediaUrl(raw?: string): string | null {
  if (!raw) return null;
  if (raw.startsWith("http")) return raw;
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const NewsArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const newsId = Number(id);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [item, setItem] = useState<ApiNewsItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setApiError(null);
        setItem(null);

        if (!Number.isFinite(newsId) || newsId <= 0) {
          throw new Error("Invalid news id");
        }

        // 1) try detail endpoint: /api/.../news/:id
        const detailRes = await fetch(`${NEWS_BASE}/${newsId}`);
        if (detailRes.ok) {
          const detail = (await detailRes.json()) as ApiNewsItem;
          if (!cancelled) setItem(detail);
          return;
        }

        // 2) fallback: fetch list then find by id (works even if backend has no detail endpoint)
        const listRes = await fetch(NEWS_BASE);
        if (!listRes.ok) throw new Error(`news fetch failed: ${listRes.status}`);

        const list = (await listRes.json()) as ApiNewsItem[];
        const found = Array.isArray(list) ? list.find((x) => x.id === newsId) : null;

        if (!found) throw new Error("News not found");
        if (!cancelled) setItem(found);
      } catch (e: any) {
        if (!cancelled) setApiError(e?.message || "News API error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [newsId]);

  const mediaImages = useMemo(() => {
    const m = item?.media || [];
    return m
      .map((x) => normalizeMediaUrl(x.url || x.image))
      .filter(Boolean) as string[];
  }, [item]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center text-[#bfa663] font-serif text-xl">
          Loading…
        </div>
      </Layout>
    );
  }

  if (apiError) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Link
            to="/#roster"
            className="inline-flex items-center gap-2 px-3 py-2 border border-[#bfa663]/40 bg-[#14120f]/60 text-[#e8d6a8] font-serif hover:bg-[#1a1813]/70 hover:border-[#bfa663]/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="mt-6 p-4 border border-red-500/40 bg-red-900/20 text-red-300">
            API error: {apiError}
          </div>
        </div>
      </Layout>
    );
  }

  if (!item || item.is_public === false) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center text-[#bfa663] font-serif text-xl">
          News not found 😢
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <Link
            to="/#roster"
            className="inline-flex items-center gap-2 px-3 py-2 border border-[#bfa663]/40 bg-[#14120f]/60 text-[#e8d6a8] font-serif hover:bg-[#1a1813]/70 hover:border-[#bfa663]/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1 className="mt-8 font-serif text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663]">
            {item.title || "News"}
          </h1>

          {formatDate(item.publish_date) && (
            <p className="mt-2 text-[#a79b7a] tracking-widest uppercase text-sm">
              {formatDate(item.publish_date)}
            </p>
          )}

          {/* Media */}
          {mediaImages.length > 0 && (
            <div className="mt-8 space-y-4">
              {mediaImages.map((src, idx) => (
                <div
                  key={src + idx}
                  className="border border-[#bfa663]/30 bg-[#14120f]/40 overflow-hidden"
                >
                  <img src={src} alt={`media-${idx + 1}`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          {item.content && (
            <div className="mt-8 bg-[#0b0b0b]/20 border border-[#bfa663]/20 p-6">
              <p className="text-[#e8d6a8]/90 leading-relaxed text-lg whitespace-pre-line">
                {item.content}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsArticlePage;
