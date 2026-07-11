export function toggleSelection<T>(items: T[], value: T): T[] {
    return items.includes(value)
      ? items.filter((item) => item !== value)
      : [...items, value];
  }