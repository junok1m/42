import type { RosterModel } from "../types";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function orderRosterModels(
  models: RosterModel[],
  activeTab: "today" | "tomorrow"
): RosterModel[] {
  if (models.length === 0) return [];

  const cacheKey = `roster-shuffle:42g::${activeTab}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    try {
      const ids = JSON.parse(cached) as number[];
      const modelById = new Map(
        models.map((model) => [model.id, model])
      );

      const ordered = ids
        .map((id) => modelById.get(id))
        .filter(
          (model): model is RosterModel => Boolean(model)
        );

      const cachedIds = new Set(
        ordered.map((model) => model.id)
      );

      const missingModels = models.filter(
        (model) => !cachedIds.has(model.id)
      );

      const mergedModels = [...ordered, ...missingModels];

      const newModels = mergedModels.filter(
        (model) => model.isNew
      );

      const existingModels = mergedModels.filter(
        (model) => !model.isNew
      );

      const result = [...newModels, ...existingModels];

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify(result.map((model) => model.id))
      );

      return result;
    } catch {
      sessionStorage.removeItem(cacheKey);
    }
  }

  const newModels = models.filter((model) => model.isNew);
  const existingModels = models.filter(
    (model) => !model.isNew
  );

  const ordered = [
    ...newModels,
    ...shuffle(existingModels),
  ];

  sessionStorage.setItem(
    cacheKey,
    JSON.stringify(ordered.map((model) => model.id))
  );

  return ordered;
}