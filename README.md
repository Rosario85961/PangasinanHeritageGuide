# Pangasinan Heritage Guide

A modern React Native + Expo TypeScript mobile guide for discovering Pangasinan natural, historical, religious, and cultural heritage sites.

## Features

- Expo Router file-based navigation
- Home, Search, Favorites, and Detail experiences
- 11 seeded Pangasinan heritage destinations
- Local persistent favorites with AsyncStorage
- Instant/debounced search and category filtering
- Optimized image loading with `expo-image`
- Reanimated entrance, heart, and parallax animations
- Google Maps directions deep link
- Native share dialog
- Responsive phone/tablet layouts
- Skeleton loading, empty states, and top-level error boundary
- Strict TypeScript, ESLint, Prettier, and Jest

## Run

1. Install Node.js LTS.
2. Install dependencies:

```bash
npm install
```

3. Start Expo:

```bash
npx expo start
```

4. Scan the QR code with Expo Go or launch an Android emulator.

## Validate

```bash
npm run typecheck
npm run lint
npm test
npx expo-doctor
npx expo install --check
```

## Android APK

Install EAS CLI:

```bash
npm install -g eas-cli
eas login
```

Build an installable APK in the cloud:

```bash
eas build -p android --profile preview
```

For a local build (where the required Android build tooling is installed):

```bash
eas build -p android --profile preview --local
```

## Submission

Before submission, zip the entire project folder while excluding `node_modules`, `.expo`, build output, and secrets. Submit both the `.zip` source project and the generated `.apk` through Google Classroom, according to your instructor's requirements.

## Image licensing

The included image URLs are demo/seed images so the project can run without extra setup. For a final academic submission, replace them with photos you own or have permission to use, preferably bundled under `assets/images/` for offline reliability.
