# FitTrack - Exercise Tracking App

A modern, sleek fitness tracking application built with React Native and Expo.

## Overview

FitTrack allows users to:
- Track daily workout activities
- Analyze exercise form
- View workout statistics
- Manage workout routines

## Navigation Structure

The app uses Expo Router for navigation with a stack-based structure:

### Main Screens

1. **Home Screen** (`/app/index.tsx`)
   - Daily statistics (calories, minutes, workouts)
   - Quick action buttons (Add Workout, Analyze Form, Stats)
   - Today's workout plan with exercise details
   - Modern card-based UI with progress indicators

2. **Add Workout Screen** (`/app/add-workout.tsx`)
   - Form to create new workouts
   - Fields for workout name, type, duration, difficulty
   - Dynamic exercise list management
   - Clean, minimalist design

3. **Analyze Form Screen** (`/app/analyze-form.tsx`)
   - Camera interface for exercise form analysis
   - Exercise type selection
   - Real-time feedback visualization
   - Analysis results with strengths and improvement areas

## Key UI Features

### Modern Design Elements

- Dark theme (#121212 base) with teal accents (#00C3A3)
- Card-based content presentation
- Progress indicators for goals
- Clean typography with proper spacing
- Consistent iconography (Ionicons)

### Navigation Components

- Top bar with menu and profile access
- Action buttons section below stats
- Back navigation for secondary screens
- Smooth transitions between screens

## Development Notes

### Dependencies

- `@expo/vector-icons` - For UI icons
- `expo-router` - For navigation

### Code Structure

- Each screen is a separate file in the app directory
- Navigation routes are defined in `_layout.tsx`
- Consistent styling approach using StyleSheet
- Shared components like headers and cards

### Styling Constants

- Primary color: #00C3A3 (teal)
- Background colors: #121212, #1A1A1A, #1D1D1D
- Text colors: #fff (primary), #888 (secondary), #666 (tertiary)
- Border radius: 8-12px for cards and buttons
- Consistent padding and margins for UI spacing

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npx expo start
   ```

3. Run on Android or iOS simulator, or scan the QR code with Expo Go app

## Screenshots

(Screenshots will be added here)
