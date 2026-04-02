# 🚀 PHASE 5 — NUTRITION SYSTEM + DYNAMIC DIET BUILDER

## 🎯 Goal

Build a nutrition system that:

* shows problem-based nutrition cards
* allows toggling foods into diet plan
* dynamically builds daily diet list
* connects diet to daily tasks

Core idea:
👉 Knowledge → Action → Execution

---

## 📂 Files to Create

/app/(tabs)/nutrition.tsx
/app/(tabs)/diet.tsx

/components/NutritionCard.tsx
/components/DietItem.tsx

/features/nutrition/nutritionMap.ts
/features/nutrition/nutritionService.ts

/store/useAppStore.ts (extend)

---

## 🧠 STEP 1 — Nutrition Screen

### Prompt:

Create a screen:

* title: "Nutrition Support"
* display list of NutritionCard
* cards based on user problems (from context)

---

## 🧩 STEP 2 — Nutrition Map

### Prompt:

Create nutritionMap:

Structure:

```ts
{
  hair_fall: {
    nutrients: [],
    foods: [],
    action: ""
  }
}
```

Include:

* hair
* digestion
* energy
* sleep
* posture
* constipation
* eye

---

## 🎨 STEP 3 — NutritionCard Component

### Prompt:

Create card UI:

Props:

* title
* nutrients
* foods
* action
* enabled (boolean)
* onToggle()

UI:

* clean card
* show:

  * nutrients list
  * foods list
  * action highlight
* toggle switch

---

## 🔁 STEP 4 — Toggle Logic

### Prompt:

When user toggles ON:

* add foods to daily diet

When OFF:

* remove foods

Use nutritionService

---

## ⚙️ STEP 5 — Food Tracking System (IMPORTANT)

### Prompt:

Implement diet as:

```ts
{
  Eggs: ["hair_fall", "energy"],
  Milk: ["hair_fall"],
  Curd: ["digestion"]
}
```

This ensures:

* no duplicate foods
* safe removal

---

## ➕ STEP 6 — Add Food Logic

### Prompt:

Function:

addFoods(problem)

* loop through foods
* add source to each food
* avoid duplicates

---

## ➖ STEP 7 — Remove Food Logic

### Prompt:

Function:

removeFoods(problem)

* remove problem from food source list
* delete food if no sources remain

---

## 🍽️ STEP 8 — Diet Screen

### Prompt:

Create screen:

* title: "Daily Diet"
* show list of foods from diet object

Convert:

```ts
{
  Eggs: ["hair_fall"]
}
```

→ ["Eggs"]

---

## ✅ STEP 9 — DietItem Component

### Prompt:

Create item:

* food name
* checkbox
* toggle consumed/not consumed

---

## 🔗 STEP 10 — Connect to Tasks

### Prompt:

If diet has items:

* generate tasks:

  * "Eat Eggs"
  * "Drink Milk"

Add to daily tasks list

---

## 💾 STEP 11 — Persist Data

### Prompt:

Store in AsyncStorage:

* enabled nutrition cards
* diet object
* consumed foods

Load on app start

---

## 🔔 STEP 12 — Feedback System

### Prompt:

When toggling:

* show toast:

ON:
"Added foods to your diet"

OFF:
"Removed foods from your diet"

---

## ⚠️ Constraints

* Keep UI minimal
* No calories/macros
* No complex diet plans
* Focus on action

---

## 🎯 Expected Output

User can:

✅ view nutrition cards
✅ toggle cards ON/OFF
✅ auto-build diet list
✅ see foods in diet screen
✅ track consumption

---

## 🧠 Behavioral Goal

User should feel:

"I know exactly what to eat today"

---

## 🚀 Completion Criteria

* toggle works correctly
* no duplicate foods
* safe removal works
* diet list updates instantly

---

END OF PHASE 5
