# FitTrack Mobile App

React Native + Expo implementation of the FitTrack fitness application.

![App Preview](../../docs/images/app-preview.png)
<!-- Add your screenshot here -->

## Features

- Modern dark theme with purple accents
- Smooth animations and transitions
- Offline-first architecture
- Cross-platform (iOS & Android)

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Expo Go on your mobile device or set up an emulator

3. Configure environment variables:
```bash
cp .env.example .env
```

## Development

Start the development server:
```bash
npx expo start
```

### Running on Devices

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical Device**: Scan QR code with Expo Go app

## Project Structure

```
fittrack-expo/
├── app/                 # App screens
├── assets/             # Images, fonts, etc.
├── components/         # Reusable UI components
├── constants/          # Theme, config, etc.
├── hooks/              # Custom React hooks
├── navigation/         # Navigation setup
├── services/           # API clients
└── utils/              # Helper functions
```

## Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Follow the established project structure

## Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e
```

## Building for Production

1. Configure app.json:
```json
{
  "expo": {
    "name": "FitTrack",
    "version": "1.0.0",
    ...
  }
}
```

2. Build for Android:
```bash
eas build -p android
```

3. Build for iOS:
```bash
eas build -p ios
```

## Troubleshooting

### Common Issues

1. Metro bundler issues:
```bash
expo start --clear
```

2. Dependencies conflicts:
```bash
rm -rf node_modules
npm install
```

3. Android build errors:
```bash
cd android
./gradlew clean
```

## Contributing

Please read the main project's CONTRIBUTING.md for guidelines.

## License

MIT - see the main project's LICENSE file for details.
