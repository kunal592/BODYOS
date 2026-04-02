import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DietMap, addFoods, removeFoods } from '../features/nutrition/nutritionService';
import { NUTRITION_MAP } from '../features/nutrition/nutritionMap';

export type BodyStatus = 'bad' | 'moderate' | 'good';

export interface UserContext {
  userProfile: {
    age: number;
    gender: string;
    height: string;
    weight: number;
  };
  goals: string[];
  problems: string[];
  rootCauses?: string[];
  dailyProtocol: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  };
  habits: string[];
  dietPlan?: string[];
  exercisePlan?: string[];
  bodyState: {
    head: BodyStatus;
    neck: BodyStatus;
    back: BodyStatus;
    gut: BodyStatus;
    legs: BodyStatus;
  };
}

interface HistoryEntry {
  date: string; // ISO format
  completion: number;
  bodyState: Record<string, BodyStatus>;
}

interface AppState {
  userContext: UserContext | null;
  tasks: {
    morning: { id: string; text: string; completed: boolean }[];
    afternoon: { id: string; text: string; completed: boolean }[];
    evening: { id: string; text: string; completed: boolean }[];
    night: { id: string; text: string; completed: boolean }[];
  };
  habits: { id: string; text: string; completed: boolean }[];
  progress: {
    streak: number;
    completion: number;
  };
  optimizationHistory: HistoryEntry[];
  // Nutrition
  enabledNutritionCards: string[];
  dietMap: DietMap;
  consumedFoods: string[];

  // Actions
  setContext: (context: UserContext) => void;
  toggleTask: (section: keyof AppState['tasks'], id: string) => void;
  toggleHabit: (id: string) => void;
  resetDaily: () => void;
  recordDailyComplete: () => void;
  toggleNutritionCard: (problemKey: string) => void;
  toggleFoodConsumed: (food: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userContext: null,
      tasks: {
        morning: [],
        afternoon: [],
        evening: [],
        night: []
      },
      habits: [],
      progress: {
        streak: 0,
        completion: 0
      },
      optimizationHistory: [],
      enabledNutritionCards: [],
      dietMap: {},
      consumedFoods: [],

      setContext: (context) => {
        const createTasks = (list: string[] = []) => list.map((t, index) => ({ id: `${index}-${t}`, text: t, completed: false }));
        
        set({
          userContext: context,
          tasks: {
            morning: createTasks(context.dailyProtocol.morning),
            afternoon: createTasks(context.dailyProtocol.afternoon),
            evening: createTasks(context.dailyProtocol.evening),
            night: createTasks(context.dailyProtocol.night)
          },
          habits: context.habits.map((h, index) => ({ id: `${index}-${h}`, text: h, completed: false }))
        });
      },

      toggleTask: (section, id) => set((state) => {
        const sectionTasks = state.tasks[section].map((t) => 
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        
        // Calculate overall completion
        const allTasks = [...state.tasks.morning, ...state.tasks.afternoon, ...state.tasks.evening, ...state.tasks.night, ...state.habits];
        const completedCount = allTasks.filter(t => t.completed).length;
        const totalCount = allTasks.length;

        return {
          tasks: {
            ...state.tasks,
            [section]: sectionTasks
          },
          progress: {
            ...state.progress,
            completion: totalCount > 0 ? (completedCount / totalCount) * 100 : 0
          }
        };
      }),

      toggleHabit: (id) => set((state) => {
        const updatedHabits = state.habits.map((h) => 
          h.id === id ? { ...h, completed: !h.completed } : h
        );

        const allTasks = [...state.tasks.morning, ...state.tasks.afternoon, ...state.tasks.evening, ...state.tasks.night, ...updatedHabits];
        const completedCount = allTasks.filter(t => t.completed).length;
        const totalCount = allTasks.length;

        return {
          habits: updatedHabits,
          progress: {
            ...state.progress,
            completion: totalCount > 0 ? (completedCount / totalCount) * 100 : 0
          }
        };
      }),

      resetDaily: () => set((state) => {
        // Record today's data before reset if not already recorded
        const today = new Date().toDateString();
        const alreadyRecorded = state.optimizationHistory.some(h => new Date(h.date).toDateString() === today);
        
        if (!alreadyRecorded && state.userContext) {
          state.recordDailyComplete();
        }

        return {
          tasks: {
            morning: state.tasks.morning.map(t => ({ ...t, completed: false })),
            afternoon: state.tasks.afternoon.map(t => ({ ...t, completed: false })),
            evening: state.tasks.evening.map(t => ({ ...t, completed: false })),
            night: state.tasks.night.map(t => ({ ...t, completed: false }))
          },
          habits: state.habits.map(h => ({ ...h, completed: false })),
          progress: {
            ...state.progress,
            completion: 0
          }
        };
      }),

      recordDailyComplete: () => set((state) => {
        if (!state.userContext) return state;

        const entry: HistoryEntry = {
          date: new Date().toISOString(),
          completion: state.progress.completion,
          bodyState: { ...state.userContext.bodyState }
        };

        const newStreak = state.progress.completion >= 70 ? state.progress.streak + 1 : 0;

        return {
          optimizationHistory: [...state.optimizationHistory, entry],
          progress: {
            ...state.progress,
            streak: newStreak
          }
        };
      }),

      toggleNutritionCard: (problemKey) => set((state) => {
        const isEnabled = state.enabledNutritionCards.includes(problemKey);
        const entry = NUTRITION_MAP[problemKey];
        if (!entry) return state;

        const newDietMap = isEnabled
          ? removeFoods(state.dietMap, problemKey)
          : addFoods(state.dietMap, problemKey, entry.foods);

        return {
          enabledNutritionCards: isEnabled
            ? state.enabledNutritionCards.filter(k => k !== problemKey)
            : [...state.enabledNutritionCards, problemKey],
          dietMap: newDietMap,
          consumedFoods: state.consumedFoods.filter(f => Object.keys(newDietMap).includes(f)),
        };
      }),

      toggleFoodConsumed: (food) => set((state) => ({
        consumedFoods: state.consumedFoods.includes(food)
          ? state.consumedFoods.filter(f => f !== food)
          : [...state.consumedFoods, food]
      }))
    }),
    {
      name: 'health-os-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
