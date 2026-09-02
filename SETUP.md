# SETUP — Pangasinan Heritage Guide

## Prerequisites

- Node.js LTS
- npm
- Android Studio + Android SDK for a local emulator/build, or a physical Android phone
- Expo Go for quick device testing
- EAS CLI for APK builds

## Install

From the project folder:

```bash
npm install
```

Do not manually upgrade Expo packages independently. If you need to change an Expo dependency, use `npx expo install`.

## Run on a physical Android device

```bash
npx expo start
```

Install Expo Go, scan the QR code, and keep the phone and computer on the same network.

## Run an Android emulator

Start an Android Virtual Device in Android Studio, then:

```bash
npx expo start --android
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npx expo install --check
npx expo-doctor
```

Fix any reported errors before submission.

## Generate an APK

Login:

```bash
eas login
```

Cloud APK:

```bash
eas build -p android --profile preview
```

Local APK:

```bash
eas build -p android --profile preview --local
```

The `preview` profile is configured with Android `buildType: apk`.

## Submission ZIP

Do not include `node_modules` in the ZIP.

Linux/macOS:

```bash
zip -r PangasinanHeritageGuide.zip PangasinanHeritageGuide \
  -x "PangasinanHeritageGuide/node_modules/*" \
     "PangasinanHeritageGuide/.expo/*" \
     "PangasinanHeritageGuide/dist/*"
```

On Windows, use File Explorer's ZIP option after removing `node_modules` and `.expo`, or use an equivalent archive command.

Submit the complete source ZIP and the installable APK as required by your class.
