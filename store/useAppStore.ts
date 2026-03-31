import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  
  // Actions
  setContext: (context: UserContext) => void;
  toggleTask: (section: keyof AppState['tasks'], id: string) => void;
  toggleHabit: (id: string) => void;
  resetDaily: () => void;
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

      resetDaily: () => set((state) => ({
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
      }))
    }),
    {
      name: 'health-os-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
