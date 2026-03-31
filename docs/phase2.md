# 🚀 PHASE 2 — DASHBOARD + TASK + HABIT SYSTEM

## 🎯 Goal

Build the main app experience where users:

* See their daily plan
* Complete tasks
* Track habits
* View progress
* Stay engaged daily

This phase focuses on:
👉 simplicity + speed + daily usability

---

## 📂 Files to Create

/app/(tabs)/index.tsx            → Dashboard
/app/(tabs)/habits.tsx           → Habit Screen

/components/TaskCard.tsx
/components/HabitItem.tsx
/components/ProgressBar.tsx

/features/tasks/taskMapper.ts
/features/progress/progressService.ts

/store/useAppStore.ts (extend)

---

## 🧠 STEP 1 — Load Context into Dashboard

### Prompt:

Create a dashboard screen that:

* reads userContext from Zustand
* extracts:

  * dailyProtocol
  * habits
* displays sections:

  * Morning
  * Afternoon
  * Evening
  * Night

Each section should show task list

---

## 🧩 STEP 2 — TaskCard Component

### Prompt:

Create a reusable TaskCard component:

Props:

* task (string)
* completed (boolean)
* onToggle (function)

UI:

* checkbox style
* task text
* visual state change when completed

---

## 🔁 STEP 3 — Task Completion Logic

### Prompt:

Implement:

* toggle task completion
* update Zustand store
* track completion count

Update progress:

* completion % = completed / total

---

## 📊 STEP 4 — Progress Bar

### Prompt:

Create ProgressBar component:

* shows % completion
* simple horizontal bar
* dynamic width

Display at top of dashboard

---

## 🔥 STEP 5 — Habit System

### Prompt:

Create habits screen:

* list habits from context
* toggle ✔ / ❌
* persist state

Use HabitItem component:

* similar to TaskCard
* simpler UI

---

## 🧠 STEP 6 — Progress Engine

### Prompt:

Create progressService:

Track:

* daily completion %
* streak count

Logic:

* if user completes ≥70% tasks → streak +1
* else reset streak

Store in Zustand

---

## 📈 STEP 7 — Dashboard Summary

### Prompt:

Add summary section:

* Today’s completion %
* Current streak
* Motivational line:
  "You’re improving daily"

---

## ⚙️ STEP 8 — Task Mapping

### Prompt:

Create taskMapper:

Input:

* context.dailyProtocol

Output:

* structured task list with completion state

---

## 💾 STEP 9 — Persist State

### Prompt:

Use AsyncStorage to persist:

* tasks
* habits
* progress

Load on app start

---

## 🎯 STEP 10 — UX Improvements

### Prompt:

Add:

* smooth checkbox animation
* slight color feedback
* section spacing
* scrollable layout

Keep minimal UI

---

## ⚠️ Constraints

* No overcomplication
* Max 5–6 tasks per section
* Fast interaction (<1 tap)

---

## 🎯 Expected Output

User can:

✅ open app
✅ see daily tasks
✅ mark tasks complete
✅ track habits
✅ see progress %
✅ build streak

---

## 🧠 Behavioral Goal

User should feel:

"I just need to complete these few things today"

NOT:
"This is overwhelming"

---

## 🚀 Completion Criteria

* Dashboard loads instantly
* Task toggle works
* Progress updates live
* Habits track correctly

---

END OF PHASE 2
