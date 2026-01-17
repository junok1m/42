// src/ModelProfilePage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Phone, Check, X, ArrowLeft } from "lucide-react";
import Layout from "./components/Layout";

/* ---------------- API types (match backend exactly) ---------------- */

type ApiProviderImage = {
  image: string;
  file_type?: string;
  profile?: boolean;
  priority?: number;
  real?: boolean;
};

type ApiProvider = {
  id: number;
  slug: string;
  provider_name: string;
  description?: string;
  country?: string | null;

  cup?: string | null;
  weight?: number | null;
  height?: number | null;
  dress_size?: number | null;

  figure?: string | null;
  hair?: string | null;
  skin?: string | null;
  tattoos?: string | null;
  pubes?: string | null;
  requirements?: string | null;

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

  total_30?: number | null;
  total_45?: number | null;
  total_60?: number | null;
};

/* ---------------- UI types ---------------- */

interface Service {
  name: string;
  available: boolean;
}

interface ModelProfile {
  id: number;
  slug: string;
  name: string;
  nationality: string;

  // images
  images: string[]; // full gallery images
  profileImage: string; // chosen thumbnail/hero image

  // badges
  isNew: boolean;
  isRealPhoto: boolean;

  // details
  cup?: string;
  height?: number;
  weight?: number;
  dressSize?: number;
  figure?: string;
  hair?: string;
  skin?: string;
  tattoos?: string;
  pubes?: string;
  requirements?: string;

  // content
  descriptionHtml?: string;

  // rates
  rates: {
    min30?: number;
    min45?: number;
    min60?: number;
  };

  // services list
  services: Service[];
}

/* ---------------- Config ---------------- */

const PROVIDERS_URL = "/api/providers/";

/* ---------------- Helpers ---------------- */

function pickProfileImage(p: ApiProvider): string {
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

function allImages(p: ApiProvider): string[] {
  return (p.images || [])
    // ❌ exclude profile:true from gallery
    .filter((img) => img.image && img.profile !== true)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .map((img) => img.image);
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

function normalizeOptionalText(v: unknown): string | undefined {
  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : undefined;
}

function normalizePositiveRate(v: unknown): number | undefined {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return undefined;
  if (n <= 0) return undefined;
  return n;
}

/* ---------------- Component ---------------- */

const ModelProfilePage: React.FC = () => {
  // IMPORTANT: route param name must match App.tsx
  // <Route path="/profile/:slug" element={<ModelProfilePage />} />
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const workingTimeFromState = (location.state as any)?.workingTime as string | undefined;


  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [model, setModel] = useState<ModelProfile | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!slug) return;

      try {
        setLoading(true);
        setApiError(null);

        const res = await fetch(PROVIDERS_URL);
        if (!res.ok) throw new Error(`providers fetch failed: ${res.status}`);

        const list = (await res.json()) as ApiProvider[];
        const p = Array.isArray(list) ? list.find((x) => x.slug === slug) : undefined;

        if (cancelled) return;

        if (!p) {
          setModel(null);
          setLoading(false);
          return;
        }

        const gallery = allImages(p);
        const hero = pickProfileImage(p) || gallery[0] || "";

        const ui: ModelProfile = {
          id: p.id,
          slug: p.slug,
          name: p.provider_name,
          nationality: p.country || "Unknown",

          images: gallery.length > 0 ? gallery : hero ? [hero] : [],
          profileImage: hero,

          isNew: p.is_new === true,
          isRealPhoto: hasAnyRealPhoto(p),

          cup: normalizeOptionalText(p.cup),
          height: typeof p.height === "number" ? p.height : undefined,
          weight: typeof p.weight === "number" ? p.weight : undefined,
          dressSize:
            typeof p.dress_size === "number" && p.dress_size > 0 ? p.dress_size : undefined,
          figure: normalizeOptionalText(p.figure),
          hair: normalizeOptionalText(p.hair),
          skin: normalizeOptionalText(p.skin),
          tattoos: normalizeOptionalText(p.tattoos),
          pubes: normalizeOptionalText(p.pubes),
          requirements: normalizeOptionalText(p.requirements),

          descriptionHtml: normalizeOptionalText(p.description),

          rates: {
            min30: normalizePositiveRate(p.total_30),
            min45: normalizePositiveRate(p.total_45),
            min60: normalizePositiveRate(p.total_60),
          },

          services: servicesFromProvider(p),
        };

        setModel(ui);
        setCurrentImageIndex(0);
        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        setApiError(e?.message || "API error");
        setModel(null);
        setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const imageArray = useMemo(() => {
    if (!model) return [];
    return model.images && model.images.length > 0
      ? model.images
      : model.profileImage
        ? [model.profileImage]
        : [];
  }, [model]);

  const nextImage = () => {
    if (imageArray.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === imageArray.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (imageArray.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? imageArray.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-[#bfa663] font-serif text-xl">
          Loading…
        </div>
      </Layout>
    );
  }

  if (apiError) {
    return (
      <Layout>
        <div className="mx-6 mt-6 p-3 border border-red-500/40 bg-red-900/20 text-red-300 text-sm">
          API error: {apiError}
        </div>
      </Layout>
    );
  }

  if (!model) {
    return (
      <Layout>
        <div className="text-center py-20 text-[#bfa663] font-serif text-xl">
          Girl not found 😢
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-transparent via-[#0b0b0b]/90 to-transparent">
        {/* Back to roster */}
        <div className="max-w-6xl mx-auto px-4 pt-6 relative z-10">
          <button
            onClick={() => {
              // If we actually came from roster (browser history), go back = keeps tab + filters (via URL)
              if (window.history.state?.idx > 0) {
                navigate(-1);
                return;
              }

              // Otherwise, go to roster section on homepage (no full reload)
              navigate({ pathname: "/", search: window.location.search, hash: "#roster" });
            }}
            className="text-xl inline-flex items-center gap-2 px-3 py-2 border border-[#bfa663]/40 bg-[#14120f]/60 text-[#e8d6a8] font-serif hover:bg-[#1a1813]/70 hover:border-[#bfa663]/60 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>




      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Carousel */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-[#0b0b0b] border border-[#bfa663]/40 overflow-hidden shadow-[0_0_40px_rgba(191,166,99,0.15)]">
              {imageArray.length > 0 ? (
                <img
                  src={imageArray[currentImageIndex]}
                  alt={`${model.name} - Photo ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#a79b7a] font-serif">
                  No image
                </div>
              )}

              {/* REAL badge – gold / premium */}
              {model.isRealPhoto && (
                <span className="absolute top-3 left-3 
  text-[11px] uppercase tracking-[0.25em] 
  text-[#e8d6a8]
  px-2.5 py-1 
  border border-[#bfa663]/50 
  bg-[#14120f]/70 
  backdrop-blur-sm
  font-serif">
                  Real Photo
                </span>
              )}

              {/* NEW badge – subtle / secondary */}
              {model.isNew && (
                <span className="absolute top-4 right-4 bg-[#8b0000] text-[#e8d6a8] text-[12px] px-3 py-1 border border-[#bfa663]/40 font-semibold tracking-widest shadow-md">
                  NEW
                </span>
              )}


              {/* Navigation arrows */}
              {imageArray.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-2 text-[#e8d6a8] bg-[#1a1813]/60 border border-[#bfa663]/20 hover:bg-[#1a1813]/80 hover:border-[#bfa663]/50 transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 text-[#e8d6a8] bg-[#1a1813]/60 border border-[#bfa663]/20 hover:bg-[#1a1813]/80 hover:border-[#bfa663]/50 transition-all duration-300"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots */}
              {imageArray.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageArray.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 transition-all border border-[#bfa663]/40 ${index === currentImageIndex
                        ? "bg-[#bfa663] w-8"
                        : "bg-[#bfa663]/30 w-2 hover:bg-[#bfa663]/50"
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {imageArray.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imageArray.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden transition-all border ${index === currentImageIndex
                      ? "border-[#bfa663] opacity-100 shadow-[0_0_12px_rgba(191,166,99,0.4)]"
                      : "border-[#bfa663]/30 opacity-60 hover:opacity-100 hover:border-[#bfa663]/60"
                      }`}
                    aria-label={`Thumbnail ${index + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}


          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <div className="mt-4 text-center lg:text-left">
              <div className="flex flex-row justify-center lg:flex-row items-baseline lg:gap-4">
                <h1 className="pb-2 px-5 text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663]">
                  {model.name}
                </h1>

              </div>
            </div>
            {/* Working time (from roster click) */}
            {workingTimeFromState && (
              <div className="text-center lg:text-center">
                <p className="px-5 text-3xl font-serif text-[#e8d6a8]/90 tracking-wide">

                  {workingTimeFromState}
                </p>

              </div>
            )}
            {/* Rates (from API totals) */}
            <div className="flex justify-evenly text-center font-serif border-t border-b border-[#bfa663]/20 py-6">
              <div className="px-4">
                <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">30 Min</p>
                <p className="text-3xl font-bold text-[#e8d6a8]">
                  {model.rates.min30 ? `$${model.rates.min30}` : "—"}
                </p>
              </div>
              <div className="px-4">
                <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">45 Min</p>
                <p className="text-3xl font-bold text-[#e8d6a8]">
                  {model.rates.min45 ? `$${model.rates.min45}` : "—"}
                </p>
              </div>
              <div className="px-4">
                <p className="text-lg uppercase tracking-widest text-[#bfa663]/80 mb-2">60 Min</p>
                <p className="text-3xl font-bold text-[#e8d6a8]">
                  {model.rates.min60 ? `$${model.rates.min60}` : "—"}
                </p>
              </div>
            </div>


            {/* Details list */}
            <div className="bg-[#0b0b0b]/20 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.nationality && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">
                      From
                    </span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">
                      {model.nationality}
                    </span>
                  </div>
                )}

                {model.cup && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Cup</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.cup}</span>
                  </div>
                )}
                {typeof model.height === "number" && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Height</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.height} cm</span>
                  </div>
                )}
                {typeof model.weight === "number" && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Weight</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.weight} kg</span>
                  </div>
                )}
                {typeof model.dressSize === "number" && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Dress Size</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.dressSize}</span>
                  </div>
                )}
                {model.figure && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Figure</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.figure}</span>
                  </div>
                )}
                {model.hair && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Hair</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.hair}</span>
                  </div>
                )}
                {model.skin && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Skin</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.skin}</span>
                  </div>
                )}
                {model.tattoos && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Tattoos</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.tattoos}</span>
                  </div>
                )}
                {model.pubes && (
                  <div className="flex justify-between items-center py-2 border-b border-[#bfa663]/20">
                    <span className="text-lg uppercase tracking-widest text-[#bfa663] font-serif">Pubes</span>
                    <span className="text-2xl font-serif font-bold text-[#e8d6a8]">{model.pubes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            {model.requirements && (
              <div className="border-l-2 border-[#8b0000] bg-[#1a0f0f]/60 pl-4 py-3">
                <p className="text-md uppercase tracking-widest text-[#bfa663]/80 mb-1">Requirements</p>
                <p className="text-xl text-[#e8d6a8]">{model.requirements}</p>
              </div>
            )}

            {/* Services */}
            <div className="relative bg-[#14120f]/70 border border-[#bfa663]/30 p-6 shadow-[0_0_30px_rgba(191,166,99,0.12)]">
              <h2 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e8d6a8] to-[#bfa663] mb-4 tracking-wide">
                Available Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {model.services.map((service) => (
                  <div
                    key={service.name}
                    className={`flex items-center gap-2 p-3 border transition-all ${service.available
                      ? "bg-[#0f1b0f]/60 border-[#90ff90]/40 text-[#b8ffb8]"
                      : "bg-[#0b0b0b]/40 border-[#bfa663]/20 text-[#a4976c]/60"
                      }`}
                  >
                    {service.available ? (
                      <Check className="w-4 h-4 text-[#90ff90] flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-[#a4976c]/60 flex-shrink-0" />
                    )}
                    <span
                      className={`text-lg font-serif uppercase tracking-wider ${service.available ? "" : "line-through"
                        }`}
                    >
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optional: description HTML block (if you want to show it) */}
            {model.descriptionHtml && (
              <div className="bg-[#0b0b0b]/20 p-6 border border-[#bfa663]/20">
                <h2 className="text-4xl font-serif text-[#e8d6a8] mb-3">About</h2>
                <div
                  className="text-2xl prose prose-invert max-w-none text-[#d8cfa5]/90"
                  // NOTE: backend provides HTML. If you don't trust it, remove this section.
                  dangerouslySetInnerHTML={{ __html: model.descriptionHtml }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sticky Mobile CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0b0b0b] border-t border-[#bfa663]/40 shadow-[0_-4px_20px_rgba(191,166,99,0.2)] z-50">
          <a
            href="tel:+61498100011"
            className="w-full flex items-center justify-center gap-3 bg-[#14120f]/80 hover:bg-[#1a1813] border border-[#bfa663]/50 text-[#e8d6a8] font-serif font-bold py-4 px-6 tracking-wide transition-all duration-300 hover:shadow-[0_0_12px_rgba(191,166,99,0.6)]"
          >
            <Phone className="w-5 h-5" />
            Book Now
          </a>
        </div>
      </div>
    </section>
    </Layout >
  );
};

export default ModelProfilePage;
