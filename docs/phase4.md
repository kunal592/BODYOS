# 🚀 PHASE 4 — MOTIVATION SYSTEM + SHAREABLE QUOTE CARDS

## 🎯 Goal

Build a motivation feature that:

* gives users daily “reward” content
* increases engagement
* enables social sharing
* drives organic growth

Core idea:
👉 Motivation + Personalization + Shareability

---

## 📂 Files to Create

/app/(tabs)/motivation.tsx

/components/QuoteCard.tsx
/components/MysteryBox.tsx

/features/motivation/quoteService.ts
/features/motivation/quoteData.ts

/utils/imageGenerator.ts

---

## 🎁 STEP 1 — Motivation Screen

### Prompt:

Create a screen:

* title: "Daily Boost"
* show MysteryBox component
* show last unlocked quote (if exists)

---

## 🎲 STEP 2 — Mystery Box Component

### Prompt:

Create a clickable box UI:

* closed state (mystery box emoji or icon)
* on tap → animate (scale or bounce)
* reveal quote

Add logic:

* only 1 free unlock per day

---

## 🧠 STEP 3 — Quote Data

### Prompt:

Create a file with 100 high-quality quotes:

* short
* powerful
* not generic
* focused on discipline, consistency, growth

Store as array

---

## 🔀 STEP 4 — Random Quote Generator

### Prompt:

Create function:

getRandomQuote()

* returns random quote
* avoid repeating last quote (optional)

---

## 🧾 STEP 5 — QuoteCard Component

### Prompt:

Create a styled card:

Must include:

* quote text (centered)
* user name (from context)
* app name
* tagline: "Your body, but with a system"

Design:

* clean
* modern
* Instagram story friendly

---

## 🖼️ STEP 6 — Convert Card to Image

### Prompt:

Use library:

* react-native-view-shot

Function:
captureQuoteCard()

* converts QuoteCard to image
* returns image URI

---

## 📤 STEP 7 — Share Feature

### Prompt:

Implement sharing:

* use Expo Sharing API

Options:

* share to Instagram story
* share to WhatsApp
* download image

Buttons:

* "Share"
* "Download"

---

## 🔐 STEP 8 — Daily Limit Logic

### Prompt:

Allow:

* 1 free mystery per day

Store:

* lastOpenedDate

If already opened:

* show message:
  "Come back tomorrow or complete tasks to unlock more"

---

## 🔓 STEP 9 — Unlock via Progress

### Prompt:

If user completes:

* ≥70% daily tasks

Then:

* unlock 1 extra mystery box

---

## 💾 STEP 10 — Persist Data

### Prompt:

Store:

* last quote
* last opened date

Use AsyncStorage

---

## 🎯 STEP 11 — Branding

### Prompt:

Ensure every QuoteCard includes:

* app name
* tagline

Design should subtly promote app

---

## ⚠️ Constraints

* Keep UI clean (no clutter)
* Avoid long quotes
* Optimize image generation speed

---

## 🎯 Expected Output

User can:

✅ open motivation screen
✅ tap mystery box
✅ get quote
✅ share quote as image
✅ download quote
✅ unlock extra via progress

---

## 🧠 Behavioral Goal

User should feel:

* rewarded daily
* emotionally connected
* motivated to return

---

## 🚀 Growth Goal

Each shared quote should:

👉 act as organic marketing

---

## 🚀 Completion Criteria

* mystery box works
* quote generates
* image export works
* sharing works

---

END OF PHASE 4
