Perfect — let’s design your **complete Expo (React Native) folder structure + state architecture** in a way that scales cleanly with your phases.

No chaos later. Everything structured from day 1.

---

# 📁 📱 Project Structure (Production Ready for Expo)

```
/app
  /(tabs)
    index.tsx              → Dashboard
    body.tsx               → Body Map Screen
    habits.tsx             → Habit Tracker
    profile.tsx            → User Profile

  /onboarding
    index.tsx              → Entry
    steps/
      BasicInfo.tsx
      Goals.tsx
      Problems.tsx
      Lifestyle.tsx
      Review.tsx

/components
  BodyMap.tsx
  TaskCard.tsx
  HabitItem.tsx
  QuoteCard.tsx
  ProgressBar.tsx

/features
  /context
    contextService.ts      → parse + manage context
    contextTypes.ts        → types/interfaces

  /tasks
    taskService.ts
    taskMapper.ts          → map JSON → UI tasks

  /body
    bodyService.ts         → healing logic
    bodyMapConfig.ts       → body parts config

  /motivation
    quoteService.ts
    quoteData.ts

  /progress
    progressService.ts

/store
  useAppStore.ts           → global state (Zustand)

/utils
  storage.ts               → AsyncStorage wrapper
  helpers.ts

/constants
  colors.ts
  config.ts

/assets
  images/
  icons/

/docs
  context.md
  phase1.md
  phase2.md
```

---

# 🧠 State Management (VERY IMPORTANT)

Use **Zustand** (simple + scalable)

---

## 🧩 Global Store Structure

```ts
type AppState = {
  userContext: any;

  tasks: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  };

  habits: string[];

  bodyState: {
    head: string;
    neck: string;
    back: string;
    gut: string;
    legs: string;
  };

  progress: {
    streak: number;
    completion: number;
  };

  setContext: (context: any) => void;
  updateTask: (task: string) => void;
  updateBody: (part: string) => void;
};
```

---

## 🏪 Zustand Store Example

```ts
import { create } from "zustand";

export const useAppStore = create((set) => ({
  userContext: null,

  tasks: {
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  },

  habits: [],

  bodyState: {
    head: "moderate",
    neck: "bad",
    back: "bad",
    gut: "moderate",
    legs: "good"
  },

  progress: {
    streak: 0,
    completion: 0
  },

  setContext: (context) =>
    set(() => ({
      userContext: context,
      tasks: context.dailyProtocol,
      habits: context.habits,
      bodyState: context.bodyState
    })),

  updateTask: (task) =>
    set((state) => ({
      progress: {
        ...state.progress,
        completion: state.progress.completion + 1
      }
    }))
}));
```

---

# ⚙️ Core Logic Layers (Clean Architecture)

---

## 🧾 1. Context Service

```ts
export const parseContext = (json) => {
  try {
    return JSON.parse(json);
  } catch {
    throw new Error("Invalid JSON");
  }
};
```

---

## 🔄 2. Task Mapper

```ts
export const mapTasks = (context) => {
  return context.dailyProtocol;
};
```

---

## 🧍 3. Body Service (HEALING ENGINE)

```ts
const order = ["bad", "moderate", "good"];

export const improvePart = (current) => {
  const index = order.indexOf(current);
  return order[Math.min(index + 1, 2)];
};
```

---

## 🎁 4. Quote Service

```ts
export const getRandomQuote = (quotes) => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
```

---

# 📦 Storage Layer (AsyncStorage)

```ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const loadData = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
```

---

# 🔁 App Flow (End-to-End)

## Phase 1:

* onboarding → generate context → store

## Phase 2:

* load context → show tasks

## Phase 3:

* body map → reflect problems

## Phase 4:

* motivation + sharing

---

# 🧠 Key Engineering Principles

### 1. Single Source of Truth

👉 `userContext`

---

### 2. Derived State Only

* tasks from context
* bodyState from context

---

### 3. No duplicate logic

Keep logic inside `/features`

---

# ⚠️ Common Mistakes (avoid)

* putting logic inside UI ❌
* mixing context + UI state ❌
* overusing Redux (too heavy) ❌

---

# 🚀 Scaling Plan

Later you can add:

* backend sync
* auth
* AI auto-generation

WITHOUT changing structure

---

# 🎯 What you now have

You now have:

* clean folder structure ✅
* scalable architecture ✅
* clear separation of concerns ✅
