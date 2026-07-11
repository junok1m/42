import type { ApiProvider } from "../types/api";
import type { Service } from "../types";

export function pickThumbnailFromProvider(provider: ApiProvider): string {
  const images = (provider.images || []).filter((image) => image.image);

  const profileImage = images.find((image) => image.profile)?.image;
  if (profileImage) return profileImage;

  return (
    images
      .slice()
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0]?.image || ""
  );
}

export function hasAnyRealPhoto(provider: ApiProvider): boolean {
  return (provider.images || []).some((image) => image.real === true);
}

export function servicesFromProvider(provider: ApiProvider): Service[] {
  return [
    { name: "bbbj", available: provider.service_bbbj === true },
    { name: "cim", available: provider.service_cim === true },
    { name: "dfk", available: provider.service_dfk === true },
    { name: "69", available: provider.service_69 === true },
    { name: "rimming", available: provider.service_rimming === true },
    { name: "filming", available: provider.service_filming === true },
    { name: "cbj", available: provider.service_cbj === true },
    { name: "massage", available: provider.service_massage === true },
    { name: "gfe", available: provider.service_gfe === true },
    { name: "pse", available: provider.service_pse === true },
    { name: "double", available: provider.service_double === true },
    { name: "shower", available: provider.service_shower === true },
  ];
}