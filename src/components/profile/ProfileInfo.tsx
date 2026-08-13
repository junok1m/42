import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ModelProfile } from "../../hooks/useModelProfile";

interface ProfileInfoProps {
  model: ModelProfile;
  workingTime?: string;
}

function ProfileInfo({ model, workingTime }: ProfileInfoProps) {
  const { t } = useTranslation();
  const profileDetails = [
    model.nationality
      ? {
          label: t("profile.from"),
          value: model.nationality,
        }
      : null,

    model.cup
      ? {
          label: t("profile.cup"),
          value: model.cup,
        }
      : null,

    typeof model.height === "number"
      ? {
          label: t("profile.height"),
          value: `${model.height} cm`,
        }
      : null,

    typeof model.weight === "number"
      ? {
          label: t("profile.weight"),
          value: `${model.weight} kg`,
        }
      : null,

    typeof model.dressSize === "number"
      ? {
          label: t("profile.dressSize"),
          value: String(model.dressSize),
        }
      : null,

    model.figure
      ? {
          label: t("profile.figure"),
          value: model.figure,
        }
      : null,

    model.hair
      ? {
          label: t("profile.hair"),
          value: model.hair,
        }
      : null,

    model.skin
      ? {
          label: t("profile.skin"),
          value: model.skin,
        }
      : null,

    model.tattoos
      ? {
          label: t("profile.tattoos"),
          value: model.tattoos,
        }
      : null,

    model.pubes
      ? {
          label: t("profile.pubes"),
          value: model.pubes,
        }
      : null,
  ].filter(
    (
      detail
    ): detail is {
      label: string;
      value: string;
    } => Boolean(detail)
  );

  const availableServices = model.services.filter(
    (service) => service.available
  );

  const rates = [
    {
      label: t("rates.min30"),
      value: model.rates.min30,
    },
    {
      label: t("rates.min45"),
      value: model.rates.min45,
    },
    {
      label: t("rates.min60"),
      value: model.rates.min60,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <header className="pt-2 text-center">
        <h1 className="bg-gradient-to-r from-[#f0dfb5] via-[#d9c083] to-[#a98c48] bg-clip-text font-serif text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {model.name}
        </h1>

        {workingTime && (
          <p className="mt-2 text-sm tracking-[0.16em] text-[#d8cfa5]/70 sm:text-base">
            {workingTime}
          </p>
        )}

        {/* Book Now Button - currently unused
        {onBookNow && (
          <button
            onClick={onBookNow}
            className="
              mt-8 w-full max-w-[260px] mx-auto
              bg-[#d4af37] hover:bg-[#e8c14a]
              text-black font-medium text-[17px]
              py-3.5 px-8
              border border-[#f0d070]/30
              transition-all duration-200
              active:scale-[0.985]
              flex items-center justify-center gap-2
            "
          >
            Book Now with {model.name}
          </button>
        )}
        */}
      </header>

      {/* Rates */}
      <section className="grid grid-cols-3 divide-x divide-[#bfa663]/20 py-4">
        {rates.map((rate) => (
          <div key={rate.label} className="px-2 text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#bfa663]/70 sm:text-xs">
              {rate.label}
            </p>

            <p className="mt-1 font-serif text-2xl font-bold text-[#ead9aa] sm:text-3xl">
              {rate.value ? `$${rate.value}` : "—"}
            </p>
          </div>
        ))}
      </section>
      {/* Profile details */}
      {profileDetails.length > 0 && (
        <section className="bg-[#0b0b0b]/25 px-4 py-3 sm:px-5">
          <div className="grid grid-cols-2 gap-x-6">
            {profileDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex min-w-0 items-center justify-between gap-3 border-b border-[#bfa663]/15 py-2.5"
              >
                <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-[#bfa663]/65">
                  {detail.label}
                </span>

                <span className="truncate text-right font-sans text-sm font-semibold text-[#ead9aa] sm:text-lg">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Requirements need API update
      {model.requirements && (
        <section className="border-l-2 border-[#8b2424] bg-[#1a0f0f]/60 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#bfa663]/70">
            Requirements
          </p>

          <p className="mt-1 text-base leading-6 text-[#ead9aa]">
            {model.requirements}
          </p>
        </section>
      )}
       */}

      {/* Services */}
      {availableServices.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-sans text-xl font-semibold text-[#ead9aa]">
              {t("profile.availableServices")}
            </h2>

            <span className="text-xs tracking-wider text-[#bfa663]/60">
              {availableServices.length}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableServices.map((service) => (
              <span
                key={service.name}
                className="
        inline-flex items-center gap-1
        rounded-full
        px-3 py-1
        text-sm
        text-[#e8d6a8]
      "
              >
                <Check className="h-3 w-3 text-[#bfa663]" />
                {t(`services.${service.name}`)}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* About */}
      {model.descriptionHtml && (
        <section className="border-t border-[#bfa663]/20 pt-5">
          <h2 className="mb-3 font-sans text-xl text-[#ead9aa]">
            {t("profile.about")}
          </h2>

          <div
            className="
              prose prose-invert max-w-none
              prose-headings:font-serif
              prose-headings:text-[#ead9aa]
              prose-p:my-3
              prose-p:text-base
              prose-p:leading-7
              prose-p:text-[#d8cfa5]/85
              prose-strong:text-[#ead9aa]
              prose-a:text-[#cdb572]
            "
            dangerouslySetInnerHTML={{
              __html: model.descriptionHtml,
            }}
          />
        </section>
      )}
    </div>
  );
}

export default ProfileInfo;
