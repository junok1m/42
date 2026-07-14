import { useEffect, useState } from "react";

type ApiProviderImage = {
  image: string;
  file_type?: string;
  profile?: boolean;
  priority?: number;
};

type ApiProvider = {
  id: number;
  slug: string;
  provider_name: string;
  description?: string;
  country?: string | null;

  last_checkup?: string | null;

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

export interface ProfileService {
  name: string;
  available: boolean;
}

export interface ModelProfile {
  id: number;
  slug: string;
  name: string;
  nationality: string;

  lastCheckup?: string | null;

  images: string[];
  profileImage: string;

  isNew: boolean;

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

  descriptionHtml?: string;

  rates: {
    min30?: number;
    min45?: number;
    min60?: number;
  };

  services: ProfileService[];
}

const PROVIDERS_URL = "/api/proxy?path=providers/";

function pickProfileImage(provider: ApiProvider): string {
  const images = (provider.images || []).filter((image) => image?.image);

  const profileImage = images.find(
    (image) => image.profile === true
  )?.image;

  if (profileImage) {
    return profileImage;
  }

  const highestPriorityImage = images
    .slice()
    .sort(
      (first, second) =>
        (second.priority ?? 0) - (first.priority ?? 0)
    )[0]?.image;

  return highestPriorityImage || "";
}

function getGalleryImages(provider: ApiProvider): string[] {
  return (provider.images || [])
    .filter((image) => image.image && image.profile !== true)
    .sort(
      (first, second) =>
        (second.priority ?? 0) - (first.priority ?? 0)
    )
    .map((image) => image.image);
}

function getServices(provider: ApiProvider): ProfileService[] {
  const flags: Array<[string, boolean | undefined]> = [
    ["bbbj", provider.service_bbbj],
    ["cim", provider.service_cim],
    ["dfk", provider.service_dfk],
    ["69", provider.service_69],
    ["rimming", provider.service_rimming],
    ["filming", provider.service_filming],
    ["cbj", provider.service_cbj],
    ["massage", provider.service_massage],
    ["gfe", provider.service_gfe],
    ["pse", provider.service_pse],
    ["double", provider.service_double],
    ["shower", provider.service_shower],
  ];

  return flags.map(([name, available]) => ({
    name,
    available: available === true,
  }));
}

function normalizeOptionalText(value: unknown): string | undefined {
  const normalized =
    typeof value === "string" ? value.trim() : "";

  return normalized || undefined;
}

function normalizePositiveRate(value: unknown): number | undefined {
  const normalized =
    typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(normalized) || normalized <= 0) {
    return undefined;
  }

  return normalized;
}

function mapProviderToModel(provider: ApiProvider): ModelProfile {
  const galleryImages = getGalleryImages(provider);
  const profileImage =
    pickProfileImage(provider) || galleryImages[0] || "";

  return {
    id: provider.id,
    slug: provider.slug,
    name: provider.provider_name,
    nationality: provider.country || "Unknown",

    lastCheckup: provider.last_checkup ?? null,

    images:
      galleryImages.length > 0
        ? galleryImages
        : profileImage
          ? [profileImage]
          : [],

    profileImage,
    isNew: provider.is_new === true,

    cup: normalizeOptionalText(provider.cup),

    height:
      typeof provider.height === "number"
        ? provider.height
        : undefined,

    weight:
      typeof provider.weight === "number"
        ? provider.weight
        : undefined,

    dressSize:
      typeof provider.dress_size === "number" &&
      provider.dress_size > 0
        ? provider.dress_size
        : undefined,

    figure: normalizeOptionalText(provider.figure),
    hair: normalizeOptionalText(provider.hair),
    skin: normalizeOptionalText(provider.skin),
    tattoos: normalizeOptionalText(provider.tattoos),
    pubes: normalizeOptionalText(provider.pubes),
    requirements: normalizeOptionalText(provider.requirements),

    descriptionHtml: normalizeOptionalText(provider.description),

    rates: {
      min30: normalizePositiveRate(provider.total_30),
      min45: normalizePositiveRate(provider.total_45),
      min60: normalizePositiveRate(provider.total_60),
    },

    services: getServices(provider),
  };
}

export function useModelProfile(slug?: string) {
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [model, setModel] = useState<ModelProfile | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!slug) {
        setModel(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setApiError(null);

        const response = await fetch(PROVIDERS_URL);

        if (!response.ok) {
          throw new Error(
            `providers fetch failed: ${response.status}`
          );
        }

        const providers = (await response.json()) as ApiProvider[];

        const provider = Array.isArray(providers)
          ? providers.find((item) => item.slug === slug)
          : undefined;

        if (cancelled) {
          return;
        }

        setModel(provider ? mapProviderToModel(provider) : null);
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "API error";

        setApiError(message);
        setModel(null);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return {
    loading,
    apiError,
    model,
  };
}