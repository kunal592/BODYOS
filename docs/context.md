Perfect — now we’re thinking like a **system designer**, not just coding features.

You want a **`context.md`** that acts as:

> 📘 “Single Source of Truth for the entire app”

This file should:

* explain product vision
* define architecture
* standardize data structures
* guide all future prompts (phase1, phase2, etc.)

---

# 📄 Here is your **production-ready `context.md`**

# 🧠 APP CONTEXT — Personal Body Optimization System

## 📌 Overview

This application is a **Personal Health Operating System** designed to:

* Identify user problems (physical + lifestyle)
* Convert them into structured actionable plans
* Track execution daily
* Visually represent healing progress
* Increase user consistency and awareness

The system bridges the gap between:
👉 Advice (AI / knowledge)
👉 Execution (daily actions)

---

## 🎯 Core Philosophy

1. Simplicity over complexity
2. Execution over information
3. Visual feedback over abstract tracking
4. Personalization over generic plans

---

## 🧩 Core Modules

### 1. Onboarding / Input Engine

Collects:

* user profile
* goals
* problems
* lifestyle habits

Outputs:
👉 structured user context (JSON)

---

### 2. Context Engine

The app operates entirely on a structured object:

```
UserContext
```

This acts as the **single source of truth**

---

### 3. Task Execution System

Transforms context into:

* daily tasks
* habits
* routines

User interaction:

* check ✔ / ❌
* minimal friction

---

### 4. Body Visualization System

Interactive human body model:

* highlights affected areas
* updates based on user behavior
* shows healing progression

States:

* bad (red)
* moderate (orange)
* good (green)

---

### 5. Motivation System

Includes:

* mystery reward (daily quote)
* shareable quote cards
* user-personalized content

Goal:
👉 increase engagement + virality

---

### 6. Progress Tracking

Tracks:

* habit completion
* streaks
* body improvement
* subjective inputs (energy, digestion)

---

## 📦 Data Model

### UserContext

```
{
  userProfile: {
    age: number,
    gender: string,
    height: string,
    weight: number
  },

  goals: string[],

  problems: string[],

  rootCauses: string[],

  dailyProtocol: {
    morning: string[],
    afternoon: string[],
    evening: string[],
    night: string[]
  },

  habits: string[],

  dietPlan: string[],

  exercisePlan: string[],

  bodyState: {
    head: "bad" | "moderate" | "good",
    neck: "bad" | "moderate" | "good",
    back: "bad" | "moderate" | "good",
    gut: "bad" | "moderate" | "good",
    legs: "bad" | "moderate" | "good"
  }
}
```

---

## 🔄 State Logic

### Healing Progression

Each body part follows:

```
bad → moderate → good
```

Progress is influenced by:

* hydration
* diet adherence
* exercise completion
* sleep consistency

---

## ⚙️ System Flow

1. User completes onboarding
2. Context is generated (via AI/manual)
3. Context is stored locally (MVP)
4. UI renders:

   * tasks
   * habits
   * body state
5. User interacts daily
6. State updates based on actions

---

## 📱 UI Principles

* Minimal inputs
* One-tap actions
* Clear visual feedback
* No clutter
* Fast interactions (<2 sec)

---

## 🧠 Behavior Design

App must:

* reduce thinking
* guide action
* reward consistency
* visualize improvement

---

## 🎁 Motivation Feature

“Mystery Boost”

* daily unlock system
* personalized quote
* shareable card
* includes app branding

---

## 🧍 Body Map System

* SVG-based visual
* clickable regions
* color-coded health state
* updated via logic engine

---

## ⚠️ Constraints

* Not a medical diagnosis tool
* No complex clinical accuracy required
* Focus on user perception + behavior change

---

## 🏗️ Tech Stack

* React Native (Expo)
* Local Storage (AsyncStorage)
* Optional backend (future)

---

## 🚀 Future Scope

* AI auto-generation (no manual GPT step)
* adaptive plans
* reminders
* social features
* gamification

---

## 🎯 Product Positioning

This app is NOT:

* a fitness app
* a habit tracker

This app IS:
👉 A Personal Body Optimization System

---

## 🧠 Guiding Rule for Development

Every feature must answer:

“Does this reduce friction and increase action?”

If not → do not build.

---

# 🧠 How you use this

* `context.md` → reference + system design
* `phase1.md` → onboarding + context creation
* `phase2.md` → dashboard + tasks
* `phase3.md` → body map
* `phase4.md` → motivation system

---
