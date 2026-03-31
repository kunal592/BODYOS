# 🚀 PHASE 1 — ONBOARDING + CONTEXT GENERATION

## 🎯 Goal

Build a complete onboarding flow that:

1. Collects user data
2. Generates structured prompt
3. Allows user to paste JSON context
4. Stores context locally
5. Navigates to dashboard

---

## 🧱 Tech Constraints

* Framework: Expo (React Native)
* Navigation: Expo Router
* State: Zustand
* Storage: AsyncStorage
* UI: Clean, minimal, mobile-first

---

## 📂 Files to Create

/app/onboarding/index.tsx
/app/onboarding/steps/BasicInfo.tsx
/app/onboarding/steps/Goals.tsx
/app/onboarding/steps/Problems.tsx
/app/onboarding/steps/Lifestyle.tsx
/app/onboarding/steps/Review.tsx

/features/context/contextService.ts
/store/useAppStore.ts
/utils/storage.ts

---

## 🧠 STEP 1 — Basic Info Screen

### Prompt to Antigravity:

Create a React Native screen with inputs:

* Age (number input)
* Gender (dropdown: male/female/other)
* Height (text input)
* Weight (number input)

Requirements:

* Use functional components
* Store values in local state
* Add "Next" button
* Validate required fields

---

## 🎯 STEP 2 — Goals Screen

### Prompt:

Create a multi-select screen with options:

* Gain weight
* Lose fat
* Build muscle
* Improve posture
* Fix digestion
* Increase energy
* Improve sleep
* Improve focus
* Hair health
* Skin health

Requirements:

* Allow multiple selections
* Highlight selected items
* Store in state
* Next button

---

## ⚠️ STEP 3 — Problems Screen

### Prompt:

Create a multi-select screen for current issues:

* Low energy
* Hair fall
* Weak digestion
* Constipation
* Poor sleep
* Back/neck pain
* Bad posture
* Brain fog
* Low appetite
* Eye strain

Same behavior as Goals screen

---

## 🍽️ STEP 4 — Lifestyle Screen

### Prompt:

Create inputs:

* Meals per day (1 / 2 / 3 / 4+)
* Water intake (<1L / 1–2L / 2–3L / 3L+)
* Sleep time (time picker)
* Wake time (time picker)
* Activity level:

  * No exercise
  * Sometimes
  * Regular

Store all inputs in state

---

## 🧾 STEP 5 — Review Screen

### Prompt:

Create a screen that:

* Displays all collected user data
* Shows "Generate Plan Prompt" button

On click:

* generate a structured prompt string

---

## 🧠 STEP 6 — Prompt Generator

### Prompt:

Create a function:

generatePrompt(userData)

It should return a string like:

"You are a health optimization expert...

USER DATA:
{...}

OUTPUT FORMAT:
{ JSON structure }"

Make it clean and copyable

---

## 📋 STEP 7 — Copy Prompt UI

### Prompt:

On Review screen:

* show generated prompt in scrollable box
* add "Copy to Clipboard" button

---

## 🔁 STEP 8 — JSON Input Screen

### Prompt:

Create a screen where user can:

* paste JSON response from ChatGPT
* validate JSON
* show error if invalid
* on success → save to state

---

## 💾 STEP 9 — Store Context

### Prompt:

* Use Zustand store

* Save:

  * userContext
  * tasks (from dailyProtocol)
  * habits
  * bodyState

* Persist using AsyncStorage

---

## 🔄 STEP 10 — Navigation

### Prompt:

After saving context:

* navigate to main dashboard (/app/(tabs)/index.tsx)

---

## ⚠️ Validation Rules

* No empty required fields
* JSON must be valid
* Handle errors gracefully

---

## 🎯 Expected Output

At the end of Phase 1, app should:

✅ collect user data
✅ generate AI prompt
✅ accept JSON response
✅ store structured context
✅ navigate to dashboard

---

## 🧠 Dev Notes

* Keep UI minimal
* Avoid over-design
* Focus on flow completion
* No backend required

---

## 🚀 Completion Criteria

User should be able to:

1. Open app
2. Complete onboarding
3. Copy prompt
4. Use ChatGPT
5. Paste JSON
6. Enter main app

WITHOUT confusion

---

END OF PHASE 1
