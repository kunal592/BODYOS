# 🧬 HealthOS — Personal Body Optimization System

> **"Your body, but with a system."**

HealthOS is a production-ready **Personal Health Operating System** built with React Native (Expo). It is designed to bridge the gap between high-level health advice and daily execution through a structured, visual, and behaviorally-optimized interface.

---

## 🎨 Visual Identity

- **Premium Dark Aesthetic**: High-contrast interface designed for focus and low eye strain.
- **Visual Healing Engine**: Interactive body visualization that reflects your real-world progress.
- **Behavioral Loop**: Daily mystery boosts and rewards to drive consistency.

---

## 🚀 Key Features

### 1. **Phase 1: Intelligently Assisted Onboarding**
- Captures deep personal data (Bio, Goals, Current Issues, Lifestyle).
- Generates a **Structured AI Prompt** for users to paste into LLMs (like ChatGPT).
- Accepts a **JSON Protocol Response** to instantly populate the app with a specialized health plan.

### 2. **Phase 2: Protocol Dashboard & Task Engine**
- **Dynamic Tasking**: Morning, Afternoon, Evening, and Night protocols tailored to your body's needs.
- **Real-time Progress**: A persistent progress bar at the top of the dashboard tracks your daily adherence.
- **Persistence**: All progress is saved locally using `AsyncStorage`.

### 3. **Phase 3: Body Map (Visual Health System)**
- **Interactive SVG Anatomy**: Clickable body regions (Head, Neck, Back, Gut, Legs).
- **Dynamic Color States**: 
  - 🔴 **Critical**: Needs immediate attention.
  - 🟠 **Moderate**: Showing improvement.
  - 🟢 **Optimal**: Healthy state.
- **Healing Logic**: Daily consistency shifts your visual body state from red to green.

### 4. **Phase 4: Daily Habits & Motivation**
- **Habit Engine**: High-impact daily rituals visualized with clear achievement states.
- **Mystery Boost**: Every day, unlock a "Daily Boost" card containing powerful quotes on discipline and health.
- **Social Sharing**: Export your progress and motivational cards directly to social media.

---

## ⚙️ Core Architecture

- **Framework**: Expo (React Native) with Expo Router.
- **State Management**: Zustand with persistent middleware.
- **Styling**: Vanilla React Native StyleSheet with standard design tokens.
- **Iconography**: Lucide-React-Native for a modern, semantic look.
- **Anatomy**: Custom SVG-based interactive human body model.

---

## 🛠️ Getting Started

### 1. Installation
Clone the repository and install dependencies:

```bash
npm install
```

### 2. Running Locally

**Start the development server:**
```bash
npx expo start
```

- Press `i` for iOS simulator.
- Press `a` for Android emulator.
- Press `w` for Web.

---

## 📖 How to use the "System"

1. **Onboarding**: Fill in your details.
2. **AI Sync**: Copy the generated prompt, paste it into ChatGPT, and copy the JSON response back into the app.
3. **Execution**: Follow your daily protocol.
4. **Healing**: Check the Body Map every week to see your visual progress as you maintain consistency.

---

## ⚠️ Disclaimer
*HealthOS is a tool for lifestyle optimization and behavioral change. It is not a medical device and does not provide clinical diagnoses. Always consult with a healthcare professional before making significant changes to your health routine.*

---

## 🎯 Product Vision
This app is NOT a simple habit tracker. It is a **Personal Body Optimization System** designed for individuals who want to treat their health with the same rigor they treat their career and engineering projects.

---
© 2026 HealthOS. Built with ❤️ by [KDX Labs](https://www.kdxlabs.cloud).
