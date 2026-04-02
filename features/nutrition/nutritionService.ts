// dietMap format: { "Eggs": ["hair_fall", "low_energy"] }
// This ensures no duplicates and safe removal per source

export type DietMap = Record<string, string[]>;

export const addFoods = (dietMap: DietMap, problem: string, foods: string[]): DietMap => {
  const updated = { ...dietMap };
  for (const food of foods) {
    if (!updated[food]) {
      updated[food] = [];
    }
    if (!updated[food].includes(problem)) {
      updated[food] = [...updated[food], problem];
    }
  }
  return updated;
};

export const removeFoods = (dietMap: DietMap, problem: string): DietMap => {
  const updated = { ...dietMap };
  for (const food in updated) {
    updated[food] = updated[food].filter(src => src !== problem);
    if (updated[food].length === 0) {
      delete updated[food];
    }
  }
  return updated;
};

export const dietMapToList = (dietMap: DietMap): string[] => {
  return Object.keys(dietMap);
};
